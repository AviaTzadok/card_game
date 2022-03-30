let $person = document.querySelector(".scoreboard");
let scores = document.querySelector(".scores");
let $img = document.querySelector("img");
let $next_level = document.querySelector(".next_level");
let $play = document.querySelector(".play_again");
let $home = document.querySelector(".home");
let $volume = document.querySelector(".volume");

$next_level.onclick = function () {
  window.location.href = "/levels/level_4/level4.html";
};
$play.onclick = function () {
  window.location.href = "/levels/level_3/level3.html";
};
$home.onclick = function () {
  window.location.href = "/Transitions/open/enterpage.html";
};

const scoresList = JSON.parse(window.sessionStorage.getItem("scoresArr"));

function compare(a, b) {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
}
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

// document.getElementById("scores").innerHTML = str;

// $scars.setAttribute(c);

// scores.innerHTML = localScores;

// https://static.turbosquid.com/Preview/2019/04/01__23_17_02/Walk_0.jpg5C58DDA7-3D63-4D23-99F9-153116AA4600DefaultHQ-39.jpg
$img.setAttribute("src", `pexels-photo-1213918.jpg`);

const j = JSON.parse(window.localStorage.getItem("volume"));
let v = (document.getElementById("my_audio").muted = j);
function mute() {
  const j = JSON.parse(window.localStorage.getItem("volume"));
  let v = (document.getElementById("my_audio").muted = !j);
  window.localStorage.setItem("volume", JSON.stringify(v));
}
$volume.onclick = function () {
  mute();
};
