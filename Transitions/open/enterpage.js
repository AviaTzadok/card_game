let $img = document.querySelector("img");
let $volume = document.querySelector(".volume");

let scores = document.querySelector(".scores");
const scoresList = JSON.parse(window.localStorage.getItem("scoreslocal"));

// const scoresList = JSON.parse(window.sessionStorage.getItem("scoresArr"));
console.log(scoresList);

// localStorage.clear();

function getInput() {
  playerName = document.getElementById("namecontainar").value;
  sessionStorage.setItem("playerName", JSON.stringify(playerName));

  console.log(playerName);
}
const button = document.querySelector("#bname");
button.addEventListener("click", setName);

function setName() {
  getInput();
}

let i = 1;

let interval = setInterval(() => {
  i++;
  if (i == 38) {
    i = 1;
  }

  $img.setAttribute("src", `animation/DHQ-${i}.png`);
}, 40);

// `https://static.turbosquid.com/Preview/001163/190/6V/DHQ-${i}.jpg`

function compare(a, b) {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
}
if (scoresList) {
  let sortScores = scoresList.sort(compare);
  let str = "";
  for (let i = 0; i <= 10; i++) {
    if (sortScores[i].name) {
      if (sortScores[i].name == "") {
        editTextArea(
          "player" +
            "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;" +
            sortScores[i].score
        );
      } else {
        editTextArea(
          sortScores[i].name +
            "&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;" +
            sortScores[i].score
        );
      }
    } else {
      break;
    }
  }
  function editTextArea(element) {
    str += `<button type="button">${element}</button>`;
  }
  scores.innerHTML = str;
}

if (JSON.parse(window.localStorage.getItem("volume")) == true) {
  let v = (document.getElementById("my_audio").muted = true);
  window.localStorage.setItem("volume", JSON.stringify(v));
} else {
  let j = (document.getElementById("my_audio").muted = false);
  let v = (document.getElementById("my_audio").muted = j);
  window.localStorage.setItem("volume", JSON.stringify(v));
}

function mute() {
  const j = JSON.parse(window.localStorage.getItem("volume"));
  let v = (document.getElementById("my_audio").muted = !j);
  window.localStorage.setItem("volume", JSON.stringify(v));
}

$volume.onclick = function () {
  mute();
};
