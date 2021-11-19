// ==UserScript==
// @name        Jigex Coom Extractor
// @namespace   https://www.jigsawexplorer.com/
// @include     /https?:\/\/www\.jigsawexplorer\.com\/online-jigsaw-puzzle-player\.html/
// @grant       none
// @version     1.0
// @author      vyneer
// @homepageURL https://github.com/vyneer/dgg-chat-gui-scripts
// @description little script that allows you to get the source image of jigex puzzles
// ==/UserScript==

// to get the link to the source image the script needs to connect to the game (for less than half a second),
// which is why you can set a username, leave empty for the default (which is coomer%random_number_from_1_to_100%)
const OVERRIDE_USERNAME = "";
// if set to true, opens the source in a new tab
const NEW_TAB = true;
// if set to true, runs the script automatically on jigex open
const AUTOSTART = false;
// if set to true, prints logs to the console
const DEBUG = false;

let dataMainServer = {};
let dataMainServerAuth = "";
let dataFirstSubServer = {};
let dataFirstSubServerAuth = "";
let progress = 0;

// getting all the necessary info to connect to the game
const params = new URLSearchParams(window.location.search);
const room = params.get("gid");
const region = params.get("rgn");
const username =
  OVERRIDE_USERNAME.length !== 0
    ? OVERRIDE_USERNAME
    : `coomer${Math.floor(Math.random() * 100 + 1)}`;

// getting the join panel to add stuff to it
const joinPanel = document.querySelector("#jigex-join-panel");

// creating and appending a button to the panel
const startButton = document.createElement("button");
startButton.id = "coom-extractor-start-button";
startButton.className = "slide-panel-btn";
startButton.textContent = "Extract the Coom";
AUTOSTART ? (startButton.style.display = "none") : {};
joinPanel.append(startButton);

startButton.addEventListener("click", extractCoom);

// creating and appending progress text to the panel
const progressText = document.createElement("p");
progressText.id = "coom-extractor-progress";
progressText.className = "jigex-slide-panel-text";
progressText.style.textAlign = "center";
joinPanel.append(progressText);

function extractCoom() {
  progressText.textContent = "";
  progressText.style.display = "";

  if (room === null || region === null) {
    return;
  }

  // creating a websocket connection to the game's main server
  const socketMainServer = new WebSocket(
    "wss://ns.exitgames.com:19093/a0a94d7b-d90a-4161-ab65-91e8e3752c8c?libversion=4.1.0.0",
    "Json"
  );

  socketMainServer.onmessage = function (event) {
    const split = event.data.split("~");
    // the initial message on connection is always split into 5 parts
    // this is a way to distinguish the initial message that doesn't contain a json object
    // and later ones that do
    if (split.length === 5) {
      // on the initial message we send back our room's data
      DEBUG
        ? console.log(`[coom extractor] [main server] data 1: ${event.data}`)
        : {};
      const data = {
        req: 230,
        vals: [
          224,
          "a0a94d7b-d90a-4161-ab65-91e8e3752c8c",
          220,
          "1.0",
          225,
          `${room}-${username}`,
          210,
          region,
        ],
      };
      const string = JSON.stringify(data);
      socketMainServer.send(`~m~${string.length + 3}~m~~j~${string}`);
      progress += 12.5;
      progressText.textContent = `${progress}% of Coom extracted`;
    } else {
      // we receive back a message with auth data and next server's url, need to store that
      DEBUG
        ? console.log(`[coom extractor] [main server] data 2: ${event.data}`)
        : {};
      dataMainServer = JSON.parse(split[6]);
      dataMainServer["vals"].forEach((element, index) => {
        if (element === 221) {
          dataMainServerAuth = dataMainServer["vals"][index + 1];
        }
      });
      // closing the connection, so that we may continue
      socketMainServer.close(1000);
      progress += 12.5;
      progressText.textContent = `${progress}% of Coom extracted`;
    }
  };

  socketMainServer.onclose = function (event) {
    if (event.wasClean) {
      DEBUG
        ? console.log(
            `[coom extractor] [main server] connection closed normally with code=${event.code}`
          )
        : {};
    } else {
      DEBUG
        ? console.log(
            "[coom extractor] [main server] connection closed abruptly"
          )
        : {};
    }
    let url = "";
    // getting the url from the main server data we received before
    dataMainServer["vals"].forEach((element, index) => {
      if (element === 230) {
        url = dataMainServer["vals"][index + 1];
      }
    });
    let socketFirstSubServer = new WebSocket(
      `${url}/a0a94d7b-d90a-4161-ab65-91e8e3752c8c?libversion=4.1.0.0`,
      "Json"
    );

    socketFirstSubServer.onmessage = function (event) {
      let split = event.data.split("~");
      // same split distinction we did before
      if (split.length === 5) {
        DEBUG
          ? console.log(
              `[coom extractor] [first sub server] data 1: ${event.data}`
            )
          : {};
        const data = {
          req: 230,
          vals: [221, dataMainServerAuth],
        };
        const string = JSON.stringify(data);
        // sending the main server auth stuff
        socketFirstSubServer.send(`~m~${string.length + 3}~m~~j~${string}`);
        progress += 12.5;
        progressText.textContent = `${progress}% of Coom extracted`;
      } else {
        const msgData = JSON.parse(split[6]);
        // here we start distinguishing the server's responses based on a "res" field in an object it sends with most of the messages
        if ("res" in msgData) {
          switch (msgData["res"]) {
            // saving the first sub server's auth data
            case 230:
              {
                DEBUG
                  ? console.log(
                      `[coom extractor] [first sub server] data 2: ${event.data}`
                    )
                  : {};
                msgData["vals"].forEach((element, index) => {
                  if (element === 221) {
                    dataFirstSubServerAuth = msgData["vals"][index + 1];
                  }
                });
                const dataSend = {
                  req: 229,
                  vals: [],
                };
                const string = JSON.stringify(dataSend);
                socketFirstSubServer.send(
                  `~m~${string.length + 3}~m~~j~${string}`
                );
                progress += 12.5;
                progressText.textContent = `${progress}% of Coom extracted`;
              }
              break;
            // sending some room data
            case 229:
              {
                DEBUG
                  ? console.log(
                      `[coom extractor] [first sub server] data 3: ${event.data}`
                    )
                  : {};
                const data = {
                  req: 226,
                  vals: [255, room],
                };
                const string = JSON.stringify(data);
                socketFirstSubServer.send(
                  `~m~${string.length + 3}~m~~j~${string}`
                );
                progress += 12.5;
                progressText.textContent = `${progress}% of Coom extracted`;
              }
              break;
            // getting the next server's url
            case 226:
              {
                DEBUG
                  ? console.log(
                      `[coom extractor] [first sub server] data 4: ${event.data}`
                    )
                  : {};
                dataFirstSubServer = JSON.parse(split[6]);
                socketFirstSubServer.close(1000);
                progress += 12.5;
                progressText.textContent = `${progress}% of Coom extracted`;
              }
              break;
          }
        }
      }
    };

    socketFirstSubServer.onclose = function (event) {
      if (event.wasClean) {
        DEBUG
          ? console.log(
              `[coom extractor] [first sub server] connection closed normally with code=${event.code}`
            )
          : {};
      } else {
        DEBUG
          ? console.log(
              "[coom extractor] [first sub server] connection closed abruptly"
            )
          : {};
      }
      let url = "";
      // same url stuff as before
      dataFirstSubServer["vals"].forEach((element, index) => {
        if (element === 230) {
          url = dataFirstSubServer["vals"][index + 1];
        }
      });
      let socketSecondSubServer = new WebSocket(
        `${url}/a0a94d7b-d90a-4161-ab65-91e8e3752c8c?libversion=4.1.0.0`,
        "Json"
      );

      socketSecondSubServer.onmessage = function (event) {
        let split = event.data.split("~");
        // same split stuff as before
        if (split.length === 5) {
          DEBUG
            ? console.log(
                `[coom extractor] [second sub server] data 1: ${event.data}`
              )
            : {};
          const data = {
            req: 230,
            vals: [
              224,
              "a0a94d7b-d90a-4161-ab65-91e8e3752c8c",
              220,
              "1.0",
              221,
              dataFirstSubServerAuth,
              225,
              `${room}-${username}`,
            ],
          };
          const string = JSON.stringify(data);
          // once again, sending more room data + auth stuff
          socketSecondSubServer.send(`~m~${string.length + 3}~m~~j~${string}`);
          progress += 12.5;
          progressText.textContent = `${progress}% of Coom extracted`;
        } else {
          let msgData = JSON.parse(split[6]);
          // same deal as before
          if ("res" in msgData) {
            switch (msgData["res"]) {
              // sending our username again, i guess?
              case 230:
                {
                  DEBUG
                    ? console.log(
                        `[coom extractor] [second sub server] data 2: ${event.data}`
                      )
                    : {};
                  const data = {
                    req: 226,
                    vals: [
                      255,
                      room,
                      250,
                      true,
                      249,
                      {
                        255: username,
                      },
                    ],
                  };
                  const string = JSON.stringify(data);
                  socketSecondSubServer.send(
                    `~m~${string.length + 3}~m~~j~${string}`
                  );
                  progress += 12.5;
                  progressText.textContent = `${progress}% of Coom extracted`;
                }
                break;
              // FINALLY getting our source link here
              case 226:
                {
                  DEBUG
                    ? console.log(
                        `[coom extractor] [second sub server] data 3: ${event.data}`
                      )
                    : {};
                  const data = JSON.parse(split[6]);
                  let url = "";
                  data["vals"].forEach((element, index) => {
                    if (element === 248) {
                      url = data["vals"][index + 1]["url"];
                    }
                  });
                  socketSecondSubServer.close(1000);
                  progressText.textContent = `Opening the source image`;
                  const urlRegexp = url.match(/(.+)(_\(no_preview)/);
                  if (urlRegexp !== null) {
                    url = urlRegexp[1];
                  }
                  if (NEW_TAB) {
                    window.open(url);
                  } else {
                    window.location.href = url;
                  }
                  progress = 0;
                  if (!NEW_TAB) {
                    setTimeout(() => {
                      progressText.style.display = "none";
                    }, 1500);
                  } else {
                    startButton.style.display = "";
                    progressText.style.display = "none";
                  }
                }
                break;
            }
          }
        }
      };

      socketSecondSubServer.onclose = function (event) {
        if (event.wasClean) {
          DEBUG
            ? console.log(
                `[coom extractor] [second sub server] connection closed normally with code=${event.code}`
              )
            : {};
        } else {
          DEBUG
            ? console.log(
                "[coom extractor] [second sub server] connection closed abruptly"
              )
            : {};
        }
      };

      socketSecondSubServer.onerror = function (error) {
        console.log(`[coom extractor] [second sub server] ${error.message}`);
      };
    };

    socketFirstSubServer.onerror = function (error) {
      console.log(`[coom extractor] [first sub server] ${error.message}`);
    };
  };

  socketMainServer.onerror = function (error) {
    console.log(`[coom extractor] [main server] ${error.message}`);
  };
}

AUTOSTART ? extractCoom() : {};
