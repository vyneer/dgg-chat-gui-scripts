// ==UserScript==
// @name         d.gg utilities
// @namespace    https://www.destiny.gg/
// @version      1.0.1
// @description  small, but useful tools for both regular dggers and newbies alike
// @author       vyneer
// @match        www.destiny.gg/embed/chat*
// @grant        GM.xmlHttpRequest
// @connect      vyneer.me
// ==/UserScript==

const timeOptions = {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
};

var phrases = [];
var lastEmbeds = window.localStorage.getItem("vyneer-util.lastEmbeds")
  ? JSON.parse(window.localStorage.getItem("vyneer-util.lastEmbeds"))
  : false;
var embedTime = window.localStorage.getItem("vyneer-util.embedTime")
  ? JSON.parse(window.localStorage.getItem("vyneer-util.embedTime"))
  : 30;
var customPhrases = window.localStorage.getItem("vyneer-util.customPhrases")
  ? JSON.parse(window.localStorage.getItem("vyneer-util.customPhrases"))
  : [];

var chatlines = document.querySelector(".chat-lines");
var textarea = document.querySelector("#chat-input-control");

// making a button for embeds
let chatToolsArea = document.querySelectorAll(".chat-tools-group")[1];
let embedsButton = document.createElement("a");
embedsButton.id = "embeds-btn";
embedsButton.className = "chat-tool-btn";
embedsButton.title = "Embeds";
let embedsButton_i = document.createElement("i");
embedsButton_i.className = "btn-icon";
embedsButton_i.innerHTML = "🎬";
embedsButton_i.style.fontStyle = "normal";
embedsButton_i.style.fontSize = "larger";

// appending that button to the right area on screen
embedsButton.appendChild(embedsButton_i);
chatToolsArea.prepend(embedsButton);

// creating a settings title
let settingsArea = document.querySelector("#chat-settings-form");
let title = document.createElement("h4");
title.innerHTML = "d.gg utilities";
// appending it to the settings menu
settingsArea.appendChild(title);

// creating a latest embeds value setting
let lastEmbedsGroup = document.createElement("div");
lastEmbedsGroup.className = "form-group checkbox";
let lastEmbedsLabel = document.createElement("label");
lastEmbedsLabel.innerHTML = "Show 5 latest embeds, instead of top 5";
lastEmbedsGroup.appendChild(lastEmbedsLabel);
let lastEmbedsCheck = document.createElement("input");
lastEmbedsCheck.type = "checkbox";
lastEmbedsCheck.checked = lastEmbeds;
lastEmbedsCheck.addEventListener("change", () => {
  lastEmbeds = lastEmbedsCheck.checked;
  window.localStorage.setItem(
    "vyneer-util.lastEmbeds",
    lastEmbedsCheck.checked
  );
});
lastEmbedsLabel.prepend(lastEmbedsCheck);

// creating an embed time value setting
let embedTimeGroup = document.createElement("div");
embedTimeGroup.className = "form-group row";
let embedTimeLabel = document.createElement("label");
embedTimeLabel.innerHTML = "Embed Time Span";
embedTimeGroup.appendChild(embedTimeLabel);
let embedTimeArea = document.createElement("textarea");
embedTimeArea.style.resize = "vertical";
embedTimeArea.className = "form-control";
embedTimeArea.placeholder = "5 to 60 minutes";
embedTimeArea.value = embedTime;
embedTimeArea.addEventListener("change", () => {
  embedTime = embedTimeArea.value;
  window.localStorage.setItem("vyneer-util.embedTime", embedTimeArea.value);
});
embedTimeGroup.appendChild(embedTimeArea);

// creating a custom phrases setting
let customPhrasesGroup = document.createElement("div");
customPhrasesGroup.className = "form-group row";
let customPhrasesLabel = document.createElement("label");
customPhrasesLabel.innerHTML = "Custom Alert Phrases";
customPhrasesGroup.appendChild(customPhrasesLabel);
let customPhrasesArea = document.createElement("textarea");
customPhrasesArea.style.resize = "vertical";
customPhrasesArea.className = "form-control";
customPhrasesArea.placeholder = "Comma separated ... (regex not supported)";
customPhrasesArea.value = customPhrases == "[]" ? "" : customPhrases;
customPhrasesArea.addEventListener("change", () => {
  let val = customPhrasesArea.value.split(",");
  if (customPhrasesArea.value.length > 0) {
    customPhrases = val;
    window.localStorage.setItem(
      "vyneer-util.customPhrases",
      JSON.stringify(val)
    );
  } else {
    customPhrases = [];
    window.localStorage.setItem(
      "vyneer-util.customPhrases",
      JSON.stringify(customPhrases)
    );
  }
});
customPhrasesGroup.appendChild(customPhrasesArea);

// appending all the settings to our area
settingsArea.appendChild(lastEmbedsGroup);
settingsArea.appendChild(embedTimeGroup);
settingsArea.appendChild(customPhrasesGroup);

// small function to escape icky characters
function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

// formatter for embed links
// https://github.com/destinygg/chat-gui/blob/master/assets/chat/js/formatters.js
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

let embedForm = new EmbedUrlFormatter();

// a lidl class to make it easier to append messages to chat
class DGGMsg {
  constructor(str, type, stamp) {
    let msg = document.createElement("div");
    msg.className = `msg-chat ${type}`;
    let time;
    if (stamp != "") {
      time = new Date(stamp * 1000);
    } else {
      time = new Date();
    }
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

// download the ban/mute phrases to an array
GM.xmlHttpRequest({
  url: "https://vyneer.me/tools/phrases",
  onload: (response) => {
    var data = JSON.parse(response.response);
    data.forEach((entry) => {
      phrases.push(entry);
    });
  },
});

const matchStringOrRegex = (message, phrase) => {
  const cleanMessage = message.trim();
  const cleanPhrase = phrase.trim().toLowerCase();
  if (/^\/.*\/$/.test(cleanPhrase)) {
    const regexString = cleanPhrase.slice(1, cleanPhrase.length - 1);
    if (cleanPhrase.length <= 2) return false;
    const regex = new RegExp(regexString, "i");
    return regex.test(cleanMessage);
  }
  return message.includes(cleanPhrase);
};

// adding an event listener to chat's input box
// every time you press a key it checks whether your text has spooky phrases in it
textarea.addEventListener("keyup", () => {
  let text = textarea.value.toLowerCase();
  let resultCustom;
  let result;

  if (phrases.length > 0) {
    result = phrases.find((entry) => {
      if (matchStringOrRegex(text, entry.phrase)) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (customPhrases.length > 0) {
    resultCustom = customPhrases.find((entry) => {
      if (text.includes(entry)) {
        return true;
      } else {
        return false;
      }
    });
  }

  if (result != undefined || resultCustom != undefined) {
    textarea.style.backgroundColor = "#1F0000";
  } else {
    if (textarea.style.backgroundColor != "") {
      textarea.style.backgroundColor = "";
    }
  }
});

// function to simplify appending embeds
function serveEmbeds(data, emb) {
  if (data.length > 0) {
    data.forEach((entry) => {
      if (!emb) {
        new DGGMsg(
          `${embedForm.format(entry.link)} (${entry.count} ${
            entry.count == 1 ? "embed" : "embeds"
          })`,
          "msg-status msg-historical",
          ""
        );
      } else {
        new DGGMsg(
          embedForm.format(entry.link),
          "msg-status msg-historical",
          entry.timestamp
        );
      }

      chatlines.scrollTop = chatlines.scrollHeight;
    });
  } else {
    if (!emb) {
      new DGGMsg(
        `Looks like nobody embedded anything in the last ${embedTime} minutes.`,
        "msg-status msg-error",
        ""
      );
    } else {
      new DGGMsg(
        `Looks like there's no data regarding the last embeds.`,
        "msg-status msg-error",
        ""
      );
    }
    chatlines.scrollTop = chatlines.scrollHeight;
  }
}

// adding an event listener to the new embeds button
// once you press it it fetches embeds from vyneer.me and displays them in chat
embedsButton.addEventListener("click", () => {
  let embedUrl;

  if (!lastEmbeds) {
    new DGGMsg(
      `Getting top 5 embeds in the last ${embedTime} minutes...`,
      "msg-info",
      ""
    );
    embedUrl = `https://vyneer.me/tools/embeds?t=${embedTime}`;
  } else {
    new DGGMsg(`Getting last 5 embeds...`, "msg-info", "");
    embedUrl = `https://vyneer.me/tools/embeds/last`;
  }

  chatlines.scrollTop = chatlines.scrollHeight;

  GM.xmlHttpRequest({
    url: embedUrl,
    onload: (response) => {
      let data = JSON.parse(response.response);
      if (lastEmbeds) {
        data = data.reverse();
      }
      serveEmbeds(data, lastEmbeds);
    },
  });
});

setTimeout(() => {
  // checking the scripts version
  GM.xmlHttpRequest({
    url: "https://vyneer.me/tools/script",
    onload: (response) => {
      var data = JSON.parse(response.response);
      if ("link" in data && "version" in data) {
        if (GM_info.script.version < data.version) {
          new DGGMsg(
            `Hey! Looks like you're using an older version of d.gg utilities (v${GM_info.script.version}). You can download the latest version v${data.version} here - <a href="${data.link}">${data.link}</a>`,
            "msg-info msg-historical",
            ""
          );
        }
      }
    },
  });
}, 2000);
