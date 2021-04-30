// ==UserScript==
// @name         d.gg embeds
// @namespace    https://www.destiny.gg/
// @version      0.1
// @description  shows embeds in dgg
// @author       vyneer
// @match        www.destiny.gg/embed/chat*
// @grant        GM.xmlHttpRequest
// @connect      vyneer.me
// ==/UserScript==

var phrases = [];
var chatlines = document.querySelector(".chat-lines");

const timeOptions = {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
};

let chatToolsArea = document.querySelectorAll(".chat-tools-group")[1];
let embedsButton = document.createElement("a");
embedsButton.id = "embeds-btn";
embedsButton.className = "chat-tool-btn";
embedsButton.title = "Embeds";
let embedsButton_i = document.createElement("i");
embedsButton_i.className = "btn-icon";
embedsButton_i.innerHTML = "🎬";
embedsButton_i.style.fontStyle = "normal";

embedsButton.appendChild(embedsButton_i);
chatToolsArea.prepend(embedsButton);

class EmbedUrlFormatter {
  constructor() {
    this.bigscreenPath = "/bigscreen";
    this.bigscreenregex = new RegExp(
      /(^|\s)((#twitch|#twitch-vod|#twitch-clip|#youtube)\/(?:[A-z0-9_\-]{3,64}))\b/,
      "g"
    );

    try {
      const location = (window.top || window.parent || window).location;
      this.currentPath = location.pathname;
      this.url = (
        location.protocol +
        "//" +
        location.host +
        this.bigscreenPath +
        (location.search ? location.search : "")
      ).replace(/\/$/, "");
    } catch (e) {
      console.error(e);
    }
  }

  format(str) {
    // Open embed links in a new tab when in embedded/popout chat.
    const target = this.currentPath === this.bigscreenPath ? "_top" : "_blank";
    return str.replace(
      this.bigscreenregex,
      '$1<a class="externallink bookmarklink" href="' +
        this.url +
        '$2" target="' +
        target +
        '">$2</a>'
    );
  }
}

class DGGMsg {
  constructor(str, type) {
    let msg = document.createElement("div");
    msg.className = `msg-chat ${type}`;
    let time = new Date();
    let msgInnerTime = document.createElement("time");
    msgInnerTime.className = "time";
    msgInnerTime.innerHTML = time.toLocaleTimeString("en-US", timeOptions);
    let msgInnerText = document.createElement("span");
    msgInnerText.className = "text";
    msgInnerText.innerHTML = str;
    msg.appendChild(msgInnerTime);
    msg.appendChild(msgInnerText);
    chatlines.appendChild(msg);
  }
}

let embedForm = new EmbedUrlFormatter();

embedsButton.addEventListener("click", () => {
  new DGGMsg("Getting top 5 embeds in the last 30 minutes...", "msg-info");
  chatlines.scrollTop = chatlines.scrollHeight;

  GM.xmlHttpRequest({
    url: "https://vyneer.me/tools/embeds30",
    onload: (response) => {
      var data = JSON.parse(response.response);
      data.forEach((entry) => {
        new DGGMsg(
          `${embedForm.format(entry[0])} (${entry[1]} ${
            entry[1] == 1 ? "embed" : "embeds"
          })`,
          "msg-status msg-historical"
        );
        chatlines.scrollTop = chatlines.scrollHeight;
      });
    },
  });
});
