// ==UserScript==
// @name         d.gg utilities
// @namespace    https://www.destiny.gg/
// @version      1.1.4
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
var nukes = [];
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

// make an observer to show an update message after the "connected" alert in chat
let updateObserver = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    for (let node of mutation.addedNodes) {
      if (node.matches('div[class="msg-chat msg-status "]')) {
        if (
          node
            .querySelector('span[class="text"]')
            .innerHTML.includes("Connected.")
        ) {
          // checking the scripts version
          // we check the difference between the current install's version and the API
          // if the API shows there's an update, show a message
          GM.xmlHttpRequest({
            url: "https://vyneer.me/tools/script",
            onload: (response) => {
              var data = JSON.parse(response.response);
              if ("link" in data && "version" in data) {
                if (GM_info.script.version < data.version) {
                  new DGGMsg(
                    `Hey! Looks like you're using an older version of d.gg utilities (v${GM_info.script.version}). You can download the latest version v${data.version} here - <a href="${data.link}" target="_blank">${data.link}</a>`,
                    "msg-info msg-historical",
                    ""
                  );
                  chatlines.scrollTop = chatlines.scrollHeight;
                }
              }
            },
          });
          updateObserver.disconnect();
        }
      }
    }
  }
});
updateObserver.observe(chatlines, { childList: true });

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
embedsButton_i.style.textAlign = "center";

// making a button for the nuke alert
let chatWhispersArea = document.querySelectorAll(".chat-tools-group")[0];
let nukeAlertButton = document.createElement("a");
nukeAlertButton.id = "nukes-btn";
nukeAlertButton.className = "chat-tool-btn";
nukeAlertButton.title = "Nukes";
nukeAlertButton.style.display = "none";
let nukeAlertButton_i = document.createElement("i");
nukeAlertButton_i.className = "btn-icon";
nukeAlertButton_i.innerHTML = "☢";
nukeAlertButton_i.style.fontStyle = "normal";
nukeAlertButton_i.style.fontSize = "larger";
nukeAlertButton_i.style.textAlign = "center";
nukeAlertButton_i.style.color = "yellow";
nukeAlertButton_i.style.opacity = 1;

// making a button for the mutelinks alert
let linksAlertButton = document.createElement("a");
linksAlertButton.id = "mutelinks-btn";
linksAlertButton.className = "chat-tool-btn";
linksAlertButton.title = "Mutelinks";
linksAlertButton.style.display = "none";
linksAlertButton.style.justifyContent = "center";
linksAlertButton.style.width = "auto";
linksAlertButton.style.cursor = "unset";
let linksAlertButton_i = document.createElement("i");
linksAlertButton_i.className = "btn-icon";
linksAlertButton_i.innerHTML = "🔗";
linksAlertButton_i.style.fontStyle = "normal";
linksAlertButton_i.style.fontSize = "larger";
linksAlertButton_i.style.textAlign = "center";
linksAlertButton_i.style.opacity = 1;
let linksAlertButton_span = document.createElement("span");
linksAlertButton_span.className = "btn-icon";
linksAlertButton_span.innerHTML = "";
linksAlertButton_span.style.opacity = 1;
linksAlertButton_span.style.left = "100%";
linksAlertButton_span.style.color = "#FFF7F9";
linksAlertButton_span.style.fontSize = "0.75em";
linksAlertButton_span.style.position = "absolute";
linksAlertButton_span.style.verticalAlign = "text-button";
linksAlertButton_span.style.marginLeft = "0.25em";
linksAlertButton_span.style.top = "4px";

// appending buttons to the right area on screen
embedsButton.appendChild(embedsButton_i);
nukeAlertButton.appendChild(nukeAlertButton_i);
linksAlertButton.appendChild(linksAlertButton_i);
linksAlertButton.appendChild(linksAlertButton_span);
chatToolsArea.prepend(embedsButton);
chatWhispersArea.appendChild(nukeAlertButton);
chatWhispersArea.appendChild(linksAlertButton);

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
embedTimeLabel.title = "Show embeds from the last amount of minutes that this is set to"
embedTimeGroup.appendChild(embedTimeLabel);
let embedTimeArea = document.createElement("input");
embedTimeArea.type = "number";
embedTimeArea.className = "form-control";
embedTimeArea.max = 60;
embedTimeArea.min = 5;
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
customPhrasesLabel.title = "Phrases that will color the input area red if you type them in"
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
    let source;
    switch (str.replace(this.bigscreenregex, '$3').slice(1)) {
      case "twitch":
        source = "https://twitch.tv/" + str.split("/")[1]
        break;
      case "twitch-vod":
        source = "https://twitch.tv/videos/" + str.split("/")[1]
        break;
      case "twitch-clip":
        source = "https://clips.twitch.tv/" + str.split("/")[1]
        break;
      case "youtube":
        source = "https://youtu.be/" + str.split("/")[1]
        break;
    }
    return str.replace(
      this.bigscreenregex,
      '$1<a class="externallink bookmarklink" href="' +
        this.url +
        '$2" target="' +
        target +
        '">$2</a> <a class="externallink bookmarklink" href="' +
        source +
        '" target ="_blank">(source)</a>'
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

// function to check nukes and mutelinks
function nukesAndLinks() {
  GM.xmlHttpRequest({
    url: "https://vyneer.me/tools/nukes",
    onload: (response) => {
      var data = JSON.parse(response.response);
      nukes = [];
      if (data.length > 0) {
        nukeAlertButton.style.display = "";
      } else {
        if (nukeAlertButton.style.display != "none") {
          nukeAlertButton.style.display = "none";
        }
      }
      data.forEach((entry) => {
        nukes.push(entry);
      });
    },
  });

  GM.xmlHttpRequest({
    url: "https://vyneer.me/tools/mutelinks",
    onload: (response) => {
      var data = JSON.parse(response.response);
      if (data[0].status == "on") {
        linksAlertButton.style.display = "inline-flex";
        linksAlertButton_span.innerHTML = "on";
      } else if (data[0].status == "all") {
        linksAlertButton.style.display = "inline-flex";
        linksAlertButton_span.innerHTML = "all";
      } else if (data[0].status == "off") {
        if (linksAlertButton.style.display != "none") {
          linksAlertButton.style.display = "none";
        }
      }
    },
  });
}

nukesAndLinks();

setInterval(() => {
  nukesAndLinks();
}, 15000);

// adding an event listener to the nukes button
// once you press it it fetches nukes from vyneer.me and displays them in chat
nukeAlertButton.addEventListener("click", () => {
  new DGGMsg(`Showing current nukes...`, "msg-info", "");

  chatlines.scrollTop = chatlines.scrollHeight;

  if (nukes.length > 0) {
    nukes.forEach((result) => {
      new DGGMsg(
        `${result.word} (${result.type.toString().toLowerCase()}d for ${
          result.duration
        })`,
        "msg-status msg-historical",
        ""
      );
      chatlines.scrollTop = chatlines.scrollHeight;
    });
  } else {
    new DGGMsg(
      `Looks like there's no data regarding the nukes.`,
      "msg-status msg-error",
      ""
    );
    chatlines.scrollTop = chatlines.scrollHeight;
  }
});
