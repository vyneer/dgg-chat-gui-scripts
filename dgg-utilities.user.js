// ==UserScript==
// @name         d.gg utilities
// @namespace    https://www.destiny.gg/
// @version      1.4
// @description  small, but useful tools for both regular dggers and newbies alike
// @author       vyneer
// @include      /https?:\/\/www\.destiny\.gg\/embed\/chat/
// @grant        GM.xmlHttpRequest
// @connect      vyneer.me
// @homepageURL  https://github.com/vyneer/dgg-chat-gui-scripts
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEg3pUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjarVZr0hwnDPzPKXIE9IbjAIKq3CDHTzP77Tp24qpUYth5MYyQ1K1my/7j91N+QyNWLmrRvLtXNO3aeeCm1VdTHBMHP7+nya7vRs97ej0U/jb83Yv3ODFG5Nv4+2pfBn378XQqLiFcORn+3AEPN9wvP2GY9DyJ8BYSf84hVfp17Tk+i5SX2c9q/Fev2jtE/n5c1/P0aedkK+fsV7hDHTnyryDpZd3fE5EplSd7jh44DPfx9I7eSh11kdasC2mduO/EJPWQUtKgQ/u5LlpwS3lz4Mq8WJ6xJsGdl9SCqPV2OhzSJaUJy0I2BKP88YWedfuz3KKGhZMwkwnGCF9wuadf0X9q6Jx100WXU/yiA/zi55ZuDuWeMQtpp/NCjZA4+kv/sV0sBTjZk+aGAEedLxPT6IUqFUyRB1zBRMP1BSxFfhlAirC2wRkSIFCdxMipBnMQIY8N+AwYaizKExCQGSe8ZBVwL7jxXRvfBD1z2fg1jDICECaXyw0ADWClqDXwJ7SBQ8PE1Mzcwpp1Gy6ubu7g963HERIaFh4RLXqMJk2bNW/RWmm9jc5dUK/WvUdvvfcxsOiA5YGvByaMMXnK1GnTZ8w2+xwL9Fm6bPmK1crqaySnpKalZ2TLnmPTBpW2btu+Y7fd9zig2pGjxw4K8bTTz/igRuWr9H7s/x41eqPGD1J3YnxQw6cRbxN05cUuZkCMlYB4XARAaL6Y1UYKYbvQXcxqZ1SFMby0C07SRQwI6ia2Qx/sviH3HW5F9X/hxm/kyoXuVyBXLnQ/Qe7vuP0Dank1flUpD0K3DG9Sq6D8IEJ1xqa229wSp2bmhnPd0s4ykDpG+h7TE8KEYUiJZ+kyez3SQ85A8KhnGB4Si+7CZ9a42j7u+fBc+0yBF1hMZOFRYud1dJaQ5THch57s8Hyreuo8e/G4Rg9worEb3vicdyQXbOE6Q7TSrjYymhaArweBLWjqSqB9EtjLSuTHM9URoiPOlg0Qel0rZ4NIgnLSUOknZkWNaznNEgqON+KTYdwoN2g1ba3dgYTjGyjzBBE7zRxaAV9fDVphE8bbWBOiUXSlxUKoMhukXbofFIAik2oA0DTBgLUCe9CY0chm3YEc5eh9AUksYjkC25FsxraEzPYIG3IaAANhCWHpqbaA1QIpCbkNXShchE4zAsa7XzmMIR5cCGyrAyyTYf8h3bYNlMHkwtCl3AC5bssNsl5yD7nZto1E8bSBvXMN0hWwV/cOEzCYNqYjv5ABBkdLtWsbIneeo/rIL8r0MzUSfwjOWg9Vpvs+iBqOgECgDLa5gw2RUBFUFEzAfZ0LPFUwT3dP/G24/2amMISc1glW7EqBC4BpdFwnlpFAlvddpAO1Iwk+58ygjBG2ecIOKgHGkeCYYzsEY7a7MS85Dh4NEESr8+F+9kHxoyywZaP01qibAkKz4FJrKGgbagkE3SdN7s0hjZAtPEHLrqhKw9MtV1jtydBs2DDolIHIZDwViTZqy+beByWF+u7lTyjmcQULXXVFAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEwUlEQVRYha2WS4wUVRSGv1uvbu159AATu6onkTiAo8wMGRNiYBKJxsdSiUuNccHShQuDhoUxLiYkLsUwS3GLcSNGY2QhRhaSsCGIJDMIjHbDECcwzADdVXWPi+pqbldX9yByk0rduo/z/3XuOf+5yvd9AVBKISKYfRFBKUXePND+7jW/pVLFD6qcOX2KYrHYsT5tllKqA8TsW5bVNWa2dC5vf71+jfLmzZz84TuKxWLX+vRxuii1/iwLZoL2a0oplO2xZ+8synOxbBvLsjD/XQFa66Tv+74opajVaoRh2AVikskSExG01lSrVTzPA2Drawc4/dVnvPzKS9wNQwZdh59P/8YLh0+2jjVGdMzvh99IjPi+L604EK21aK0lbb365pjWWsIwlEqlIr7vS6VSEUAc1xZAXn39TRkobxERkVBE4jgWsMR13QTX930JgqCDgPmY4OY7+0RRJKVSSRRKAAGkUChKeWSTnDl7Ti4uXBJAzl+6LLUbK3JhYVGCIBCr71kakU3r3OI47jimKIqYnt7FzdvrXK1fY6Fe5+LVvzl/+Qrvf3SIe6vrvPvOWxz/+hvqN28xODREDDw1/lSCYcZANvWyaTU6OoqIsLy8jGVZxHHM1NQUa7fXWPprqU20GvgMl8t8e+J7vIFyEnUkQWcJaKUI7zWYmdxBlwdMDTCDDcDzPAqFQodn9u/fD5J4xWsl1YWFP/ni6DxOaQCUboMD6FYMP1YscOvWaqIDWYHopw0mIdu2mZub4/o/Nyh7NkVP47ouhw5+wIv79mFZ6f91p65yHUqQeCCb2/0UL7t+fHycrY7NmHIouAUsNEeOHMnAGXEURSCCHTVQAwNYpruzMZAHmB1bXFykYcH8J+9RGhzGwe5aa+7xHIe9M5Psmp5maGgoPwZMMnmeMb/n5+e5wj0mN4+wdHeVUMB2MwIryTEHm4aZnNhObJjpyIK2PPaIi7GxMUSEpaWlNtFms8nIyAhhM8J1bJrAs0/v4Hr9Bmf/uIBojYfmidEt+L7fZdPJA+snv+bmdK7RaCSyHMZs27adt8ef5OjdO5Qch5HhAarVKkEQdNkAcHqV3GxpziMK4LouWmtO/fIrtm3RuNNk06DLh8/vZeczOwiCAK11l50U0zHB8gCyNT89JtOI1ro9ns6JCNVqNddrHR7ILsiCb1R+0322bedWS1NHTIx0LlcHehEyx/MU80H3m3MdaZgnv3nZYOpFLxFL+/0IQp8j6HUNS8f6iVOv7w0JQH4gZo3lZch/aeaejmKUjfiNvJAXdBu5PGvvf+tAtnCl6yYmJtr7nJs1dn76E2ghFo3SMec+P5AQMI1spAPr6+vtG1HexSVts7OzrK2toZSiWaux+9gioBEBW8cQh/c90Ms1WRCAlZWV3HXm98zMDMvLy4gIUb3O7LFFtGjQOnmLQHw/i5w8g70IZaM/78pWKBSSOTz2fLmA1jFax9CKD9EC6IfTgWypzgZqCo77OLvnfkTrCB1HJA5IwEU0Or4v2w+tA9nvdrWzPZ77+AQ61gl5SUBT0slYhoCIEARBT83u15RS7TovEjN18DiN9VWQlADJ2ZOQ0QISR23bKggC6Vf/80roo2oiktwJH6RoPGrw1Oa/KHllCRWO8awAAAAASUVORK5CYII=
// ==/UserScript==

// ==Changelog==
// v1.4 - 2021-09-24
// * added strims.gg/angelthump to the list of embeds (i know it's technically not an embed but i figured it's still worth adding it)
// * better update system (you can just left click now pog) (technically a server side change)
// v1.3.2 - 2021-08-30
// * fix phrases autorefresh not clearing the array
// v1.3.1 - 2021-08-29
// * phrases autorefresh now too
// * add an icon :)
// v1.3 - 2021-08-12
// * added an option to show last embeds if no one embedded anything in x minutes
// * nuked phrases will now color the text area if typed
// * you can now set custom colors for text area alerts
// * some bug fixes
// v1.2.2 - 2021-08-11
// * fix whisper count being over the nuke/mutelinks buttons
// * add a lidl debug mode (see const DEBUG)

// set to true if you wanna see nuke/mutelinks buttons all the time
const DEBUG = false;

const timeOptions = {
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
};

var phrases = [];
var nukes = [];
var embedsOnLaunch = window.localStorage.getItem("vyneer-util.embedsOnLaunch")
  ? JSON.parse(window.localStorage.getItem("vyneer-util.embedsOnLaunch"))
  : false;
var lastEmbeds = window.localStorage.getItem("vyneer-util.lastEmbeds")
  ? JSON.parse(window.localStorage.getItem("vyneer-util.lastEmbeds"))
  : false;
var lastIfNone = window.localStorage.getItem("vyneer-util.lastIfNone")
  ? JSON.parse(window.localStorage.getItem("vyneer-util.lastIfNone"))
  : false;
var embedTime = window.localStorage.getItem("vyneer-util.embedTime")
  ? JSON.parse(window.localStorage.getItem("vyneer-util.embedTime"))
  : 30;
var phraseColor = window.localStorage.getItem("vyneer-util.phraseColor")
  ? JSON.parse(window.localStorage.getItem("vyneer-util.phraseColor"))
  : "1f0000";
var nukeColor = window.localStorage.getItem("vyneer-util.nukeColor")
  ? JSON.parse(window.localStorage.getItem("vyneer-util.nukeColor"))
  : "1f1500";
var customPhrases = window.localStorage.getItem("vyneer-util.customPhrases")
  ? JSON.parse(window.localStorage.getItem("vyneer-util.customPhrases"))
  : [];
var customColor = window.localStorage.getItem("vyneer-util.customColor")
  ? JSON.parse(window.localStorage.getItem("vyneer-util.customColor"))
  : "1f0000";

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

          // show embeds on launch
          if (embedsOnLaunch) {
            embeds();
          }

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
if (DEBUG) {
  nukeAlertButton.style.display = "";
}
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
if (DEBUG) {
  linksAlertButton.style.display = "inline-flex";
}
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
title.innerHTML = `d.gg utilities v${GM_info.script.version}`;
// appending it to the settings menu
settingsArea.appendChild(title);

// creating a show embeds on connect setting
let embedsOnLaunchGroup = document.createElement("div");
embedsOnLaunchGroup.className = "form-group checkbox";
let embedsOnLaunchLabel = document.createElement("label");
embedsOnLaunchLabel.innerHTML = "Automatically show embeds on chat connect";
embedsOnLaunchGroup.appendChild(embedsOnLaunchLabel);
let embedsOnLaunchCheck = document.createElement("input");
embedsOnLaunchCheck.name = "embedsOnLaunch";
embedsOnLaunchCheck.type = "checkbox";
embedsOnLaunchCheck.checked = embedsOnLaunch;
embedsOnLaunchCheck.addEventListener("change", () => {
  embedsOnLaunch = embedsOnLaunchCheck.checked;
  window.localStorage.setItem(
    "vyneer-util.embedsOnLaunch",
    embedsOnLaunchCheck.checked
  );
});
embedsOnLaunchLabel.prepend(embedsOnLaunchCheck);

// creating a latest embeds value setting
let lastEmbedsGroup = document.createElement("div");
lastEmbedsGroup.className = "form-group checkbox";
let lastEmbedsLabel = document.createElement("label");
lastEmbedsLabel.innerHTML = "Show 5 latest embeds, instead of top 5";
lastEmbedsGroup.appendChild(lastEmbedsLabel);
let lastEmbedsCheck = document.createElement("input");
lastEmbedsCheck.name = "lastEmbeds";
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

// creating a show last embeds if none in x minutes setting
let lastIfNoneGroup = document.createElement("div");
lastIfNoneGroup.className = "form-group checkbox";
let lastIfNoneLabel = document.createElement("label");
lastIfNoneLabel.innerHTML =
  "Show 5 latest embeds if no one embedded anything recently";
lastIfNoneGroup.appendChild(lastIfNoneLabel);
let lastIfNoneCheck = document.createElement("input");
lastIfNoneCheck.name = "lastIfNone";
lastIfNoneCheck.type = "checkbox";
lastIfNoneCheck.checked = lastIfNone;
lastIfNoneCheck.addEventListener("change", () => {
  lastIfNone = lastIfNoneCheck.checked;
  window.localStorage.setItem(
    "vyneer-util.lastIfNone",
    lastIfNoneCheck.checked
  );
});
lastIfNoneLabel.prepend(lastIfNoneCheck);

// creating an embed time value setting
let embedTimeGroup = document.createElement("div");
embedTimeGroup.className = "form-group row";
let embedTimeLabel = document.createElement("label");
embedTimeLabel.innerHTML = "Embed Time Span";
embedTimeLabel.title =
  "Show embeds from the last amount of minutes that this is set to";
embedTimeLabel.style.marginBottom = 0;
embedTimeGroup.appendChild(embedTimeLabel);
let embedTimeArea = document.createElement("input");
embedTimeArea.name = "embedTimeArea";
embedTimeArea.type = "number";
embedTimeArea.className = "form-control";
embedTimeArea.max = 60;
embedTimeArea.min = 5;
embedTimeArea.placeholder = "5 to 60 minutes";
embedTimeArea.value = embedTime;
embedTimeArea.style.marginLeft = ".6em";
embedTimeArea.addEventListener("change", () => {
  embedTime = embedTimeArea.value;
  window.localStorage.setItem("vyneer-util.embedTime", embedTimeArea.value);
});
embedTimeGroup.appendChild(embedTimeArea);

// creating an phrase textarea color setting
let phraseColorGroup = document.createElement("div");
phraseColorGroup.className = "form-group row";
let phraseColorLabel = document.createElement("label");
phraseColorLabel.innerHTML = "Text area color on banned phrase";
phraseColorLabel.title =
  "The color that text area changes when you type a banned phrase";
phraseColorLabel.style.marginBottom = 0;
phraseColorGroup.appendChild(phraseColorLabel);
let phraseColorArea = document.createElement("input");
phraseColorArea.name = "phraseColorArea";
phraseColorArea.type = "text";
phraseColorArea.className = "form-control";
phraseColorArea.placeholder = "1f0000";
phraseColorArea.value = phraseColor;
phraseColorArea.style.marginLeft = ".6em";
phraseColorArea.style.width = "60px";
phraseColorArea.addEventListener("change", () => {
  if (phraseColorArea.value.length > 0) {
    phraseColor = phraseColorArea.value;
    window.localStorage.setItem(
      "vyneer-util.phraseColor",
      JSON.stringify(phraseColorArea.value)
    );
  } else {
    phraseColor = "1f0000";
    window.localStorage.setItem(
      "vyneer-util.phraseColor",
      JSON.stringify("1f0000")
    );
  }
});
phraseColorGroup.appendChild(phraseColorArea);

// creating an nuke textarea color setting
let nukeColorGroup = document.createElement("div");
nukeColorGroup.className = "form-group row";
let nukeColorLabel = document.createElement("label");
nukeColorLabel.innerHTML = "Text area color on nuked phrase";
nukeColorLabel.title =
  "The color that text area changes when you type a nuked phrase";
nukeColorLabel.style.marginBottom = 0;
nukeColorGroup.appendChild(nukeColorLabel);
let nukeColorArea = document.createElement("input");
nukeColorArea.name = "nukeColorArea";
nukeColorArea.type = "text";
nukeColorArea.className = "form-control";
nukeColorArea.placeholder = "1f1500";
nukeColorArea.value = nukeColor;
nukeColorArea.style.marginLeft = ".6em";
nukeColorArea.style.width = "60px";
nukeColorArea.addEventListener("change", () => {
  if (nukeColorArea.value.length > 0) {
    nukeColor = nukeColorArea.value;
    window.localStorage.setItem(
      "vyneer-util.nukeColor",
      JSON.stringify(nukeColorArea.value)
    );
  } else {
    nukeColor = "1f1500";
    window.localStorage.setItem(
      "vyneer-util.nukeColor",
      JSON.stringify("1f1500")
    );
  }
});
nukeColorGroup.appendChild(nukeColorArea);

// creating a custom phrases setting
let customPhrasesGroup = document.createElement("div");
customPhrasesGroup.className = "form-group row";
let customPhrasesLabel = document.createElement("label");
customPhrasesLabel.innerHTML = "Custom Alert Phrases";
customPhrasesLabel.title =
  "Phrases that will color the input area red if you type them in";
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

// creating an custom phrase textarea color setting
let customColorGroup = document.createElement("div");
customColorGroup.className = "form-group row";
let customColorLabel = document.createElement("label");
customColorLabel.innerHTML = "Text area color on custom phrase";
customColorLabel.title =
  "The color that text area changes when you type a custom phrase";
customColorLabel.style.marginBottom = 0;
customColorGroup.appendChild(customColorLabel);
let customColorArea = document.createElement("input");
customColorArea.name = "customColorArea";
customColorArea.type = "text";
customColorArea.className = "form-control";
customColorArea.placeholder = "1f0000";
customColorArea.value = customColor;
customColorArea.style.marginLeft = ".6em";
customColorArea.style.width = "60px";
customColorArea.addEventListener("change", () => {
  if (customColorArea.value.length > 0) {
    customColor = customColorArea.value;
    window.localStorage.setItem(
      "vyneer-util.customColor",
      JSON.stringify(customColorArea.value)
    );
  } else {
    customColor = "1f0000";
    window.localStorage.setItem(
      "vyneer-util.customColor",
      JSON.stringify("1f0000")
    );
  }
});
customColorGroup.appendChild(customColorArea);

// appending all the settings to our area
settingsArea.appendChild(embedsOnLaunchGroup);
settingsArea.appendChild(lastEmbedsGroup);
settingsArea.appendChild(lastIfNoneGroup);
settingsArea.appendChild(embedTimeGroup);
settingsArea.appendChild(phraseColorGroup);
settingsArea.appendChild(nukeColorGroup);
settingsArea.appendChild(customPhrasesGroup);
settingsArea.appendChild(customColorGroup);

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
      /(^|\s)((#twitch|#twitch-vod|#twitch-clip|#youtube|(?:https:\/\/|http:\/\/|)strims\.gg\/angelthump)\/(?:[A-z0-9_\-]{3,64}))\b/,
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
    switch (str.replace(this.bigscreenregex, "$3")) {
      case "#twitch":
        source = "https://twitch.tv/" + str.split("/")[1];
        break;
      case "#twitch-vod":
        source = "https://twitch.tv/videos/" + str.split("/")[1];
        break;
      case "#twitch-clip":
        source = "https://clips.twitch.tv/" + str.split("/")[1];
        break;
      case "#youtube":
        source = "https://youtu.be/" + str.split("/")[1];
        break;
      case "strims.gg/angelthump":
        return str.replace(
          this.bigscreenregex,
          '$1<a class="externallink bookmarklink" href="https://$2" target="_blank">$2</a>'
        );
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

// function to get phrases
function getPhrases() {
  // download the ban/mute phrases to an array
  GM.xmlHttpRequest({
    url: "https://vyneer.me/tools/phrases",
    onload: (response) => {
      var data = JSON.parse(response.response);
      phrases = [];
      data.forEach((entry) => {
        phrases.push(entry);
      });
    },
  });
}

getPhrases();

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
  let resultNukes;
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

  if (nukes.length > 0) {
    resultNukes = nukes.find((entry) => {
      if (matchStringOrRegex(text, entry.word)) {
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

  if (result != undefined) {
    textarea.style.backgroundColor = `#${phraseColor}`;
  } else if (resultCustom != undefined) {
    textarea.style.backgroundColor = `#${customColor}`;
  } else if (resultNukes != undefined) {
    textarea.style.backgroundColor = `#${nukeColor}`;
  } else {
    if (textarea.style.backgroundColor != "") {
      textarea.style.backgroundColor = "";
    }
  }
});

// function to simplify appending embeds
function serveEmbeds(data, emb, ifnone) {
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
      if (!ifnone) {
        new DGGMsg(
          `Looks like nobody embedded anything in the last ${embedTime} minutes.`,
          "msg-status msg-error",
          ""
        );
      } else {
        new DGGMsg(
          `Looks like nobody embedded anything in the last ${embedTime} minutes, showing you the last embeds instead.`,
          "msg-status msg-error",
          ""
        );
        GM.xmlHttpRequest({
          url: `https://vyneer.me/tools/embeds/last`,
          onload: (response) => {
            let data = JSON.parse(response.response);
            if (lastEmbeds) {
              data = data.reverse();
            }
            serveEmbeds(data, true, false);
          },
        });
      }
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
  embeds();
});

// function to show embeds
function embeds() {
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
      serveEmbeds(data, lastEmbeds, lastIfNone);
    },
  });
}

// function to check nukes and mutelinks
function getNukesAndLinks() {
  GM.xmlHttpRequest({
    url: "https://vyneer.me/tools/nukes",
    onload: (response) => {
      var data = JSON.parse(response.response);
      if (DEBUG) {
        data = [
          {
            time: "2020-03-20T14:28:23.382748",
            type: "meganuke",
            duration: "10m",
            word: "test",
          },
        ];
      }
      nukes = [];
      if (response.status == 200) {
        if (data.length > 0) {
          nukeAlertButton.style.display = "";
        } else {
          if (nukeAlertButton.style.display != "none") {
            nukeAlertButton.style.display = "none";
            if (DEBUG) {
              nukeAlertButton.style.display = "";
            }
          }
        }
        data.forEach((entry) => {
          nukes.push(entry);
        });
      } else {
        console.log(`dgg-utils error, can't get nukes - ${response.status}`);
      }
    },
  });

  GM.xmlHttpRequest({
    url: "https://vyneer.me/tools/mutelinks",
    onload: (response) => {
      var data = JSON.parse(response.response);
      if (response.status == 200) {
        if (data[0].status == "on") {
          linksAlertButton.style.display = "inline-flex";
          linksAlertButton_span.innerHTML = "on";
        } else if (data[0].status == "all") {
          linksAlertButton.style.display = "inline-flex";
          linksAlertButton_span.innerHTML = "all";
        } else if (data[0].status == "off") {
          if (linksAlertButton.style.display != "none") {
            linksAlertButton.style.display = "none";
            if (DEBUG) {
              linksAlertButton.style.display = "inline-flex";
            }
          }
        }
      } else {
        console.log(
          `dgg-utils error, can't get mutelinks - ${response.status}`
        );
      }
    },
  });
}

getNukesAndLinks();

setInterval(() => {
  getNukesAndLinks();
  getPhrases();
}, 15000);

// make an observer move nuke/mutelinks buttons based on amount of whispers
let marginObserver = new MutationObserver((mutations) => {
  nukeAlertButton.style.marginLeft = `${mutations[0].target.offsetWidth}px`;
});
marginObserver.observe(
  document.querySelector("#chat-whisper-unread-indicator"),
  { characterData: false, attributes: false, childList: true, subtree: false }
);

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
