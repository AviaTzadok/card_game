let level1Animals = [
  { name: "butterfly", img: "Animals_img/1321524.jpg" },
  { name: "butterfly", img: "Animals_img/1321524.jpg" },
  { name: "monkey", img: "Animals_img/3493730.jpg" },
  { name: "monkey", img: "Animals_img/3493730.jpg" },
  { name: "horse", img: "Animals_img/2313396.jpg" },
  { name: "horse", img: "Animals_img/2313396.jpg" },
  { name: "fox", img: "Animals_img/4934920.jpg" },
  { name: "fox", img: "Animals_img/4934920.jpg" },
  { name: "Hedgehog", img: "Animals_img/2923830.jpg" },
  { name: "Hedgehog", img: "Animals_img/2923830.jpg" },
  { name: "dolphin", img: "Animals_img/4886378.jpg" },
  { name: "dolphin", img: "Animals_img/4886378.jpg" },
  { name: "tiger", img: "Animals_img/162203.jpg" },
  { name: "tiger", img: "Animals_img/162203.jpg" },
  { name: "dog", img: "Animals_img/1805164.jpg" },
  { name: "dog", img: "Animals_img/1805164.jpg" },
];

let grid = document.querySelector(".grid");
let audio = document.querySelector("audio");
let source = document.querySelector("#source");
let scoreBoard = document.querySelector(".scoreBoard");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let $time = document.querySelector(".time");
let hover = document.querySelector("#b_c");
let container = document.querySelector(".container");
let jsonScores = document.querySelector(".jsonScores");
let $name = document.querySelector(".name");
let $next_level = document.querySelector(".next_level");
let $previous_level = document.querySelector(".previous_level");
let $play = document.querySelector(".play_again");
let $home = document.querySelector(".home");
let $volume = document.querySelector(".volume");

$next_level.onclick = function () {
  window.location.href = "/levels/level_3/level3.html";
};
$previous_level.onclick = function () {
  window.location.href = "/levels/level_1/level1.html";
};
$play.onclick = function () {
  window.location.href = "/levels/level_2/level2.html";
};
$home.onclick = function () {
  window.location.href = "/Transitions/open/enterpage.html";
};

// let body = document.querySelector("body");
// document.onload = toggleFullScreen(body);
let playerName = sessionStorage.getItem("playerName");
playerName = JSON.parse(playerName);
if (playerName == null) {
  playerName = "player";
}
function Person(name, score) {
  this.name = name;
  this.score = score;
}

let person = {
  name: "Avia",
  score: 0,
};

function addPerson(name, score) {
  let p = newPerson(name, score);
  newE(p);
}

function newPerson(name, score) {
  let p = new Person(name, score);
  return p;
}

let scores = [
  {
    name: "",
    score: "",
  },
];

// localStorage.clear();
if (window.localStorage.scoreslocal) {
  getFromDB();
}
let imgs;
let cardsId = [];
let cardsSelected = [];
let cardsWon = 0;
let clicks = 0;
let time = 0;
document.addEventListener("DOMContentLoaded", function () {
  //define functions

  createBoard(grid, level1Animals);
  arrangeCard();
  playAgain.addEventListener("click", won);

  //add a click functions for images

  imgs = document.querySelectorAll("img");
  Array.from(imgs).forEach((img) => img.addEventListener("click", flipCard));
});
//createBoard function

function createBoard(grid, array) {
  popup.style.display = "none";
  array.forEach((arr, index) => {
    let img = document.createElement("img");
    img.setAttribute("src", "general_img/background_card.jpg");
    img.setAttribute("data-id", index);
    img.setAttribute("id", "b_c");

    grid.appendChild(img);
  });
}
// arrangeCard function

function arrangeCard() {
  shuffle(level1Animals);
}

function shuffle(arr) {
  for (i = 0; i < 100; i++) {
    let a1 = random(0, arr.length);
    let a2 = random(0, arr.length);
    if (a1 == a2) {
      i--;
      continue;
    }
    swap(arr, a1, a2);
  }
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function random(a, b) {
  return Math.floor(a + Math.random() * (b - a));
}

// flip Card function

function flipCard() {
  if (cardsSelected.length < 2) {
    let selected = this.dataset.id;
    let clicked = level1Animals[selected].name;
    cardsSelected.push(clicked);

    cardsId.push(selected);
    this.classList.add("flip");
    this.setAttribute("src", level1Animals[selected].img);
    // document.querySelectorAll("img").disable = true;
  }
  if (cardsId.length === 2) {
    setTimeout(checkForMatch, 1500);
  }
}
// checkForMatch function

function checkForMatch() {
  // document.querySelectorAll("img").disable = true;
  let imgs = document.querySelectorAll("img");
  let firstCard = cardsId[0];
  let secondCard = cardsId[1];
  if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
    imgs[firstCard].setAttribute(
      "src",
      "https://www.animatedimages.org/data/media/180/animated-monkey-image-0231.gif"
    );
    imgs[secondCard].setAttribute(
      "src",
      "https://www.animatedimages.org/data/media/180/animated-monkey-image-0231.gif"
    );
    source.src = "sound/monkey.wav";
    if (!JSON.parse(window.localStorage.getItem("volume"))) {
      audio.load();
      audio.play();
    }

    cardsWon += 1;
    scoreBoard.innerHTML = cardsWon;
    setTimeout(checkWon, 200);
  } else {
    imgs[firstCard].setAttribute("src", "general_img/background_card.jpg");
    imgs[secondCard].setAttribute("src", "general_img/background_card.jpg");
    source.src = "sound/lose.wav";
    if (!JSON.parse(window.localStorage.getItem("volume"))) {
      audio.load();
      audio.play();
    }
    imgs[firstCard].classList.remove("flip");
    imgs[secondCard].classList.remove("flip");
  }
  cardsSelected = [];
  cardsId = [];
  clicks += 1;
  // clickBoard.innerHTML = clicks;
}

function checkWon() {
  if (cardsWon == level1Animals.length / 2) {
    container.style.opacity = 0.2;
    won();
  }
}
// The replay function
function saveToDB() {
  window.localStorage.setItem("scoreslocal", JSON.stringify(scores));
  sessionStorage.setItem("scoresArr", JSON.stringify(scores));
}

function getFromDB() {
  const c = JSON.parse(window.sessionStorage.getItem("scoresArr"));
  const j = JSON.parse(window.localStorage.getItem("scoreslocal"));

  scores = j;
}

function won() {
  let overallScore = 10000 - clicks * 60 - time * 30;
  let p = newPerson(playerName, overallScore);
  scores.push(p);
  saveToDB();
  window.location.href = "/Transitions/win/win2.html";
}

let interval = setInterval(() => {
  time++;
  $time.innerHTML = `Time: ${time}`;
  if (time > 12 * 60) {
    window.location.href = "/Transitions/open/enterpage.html";
  }
}, 1000);
$name.innerHTML = playerName;

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
