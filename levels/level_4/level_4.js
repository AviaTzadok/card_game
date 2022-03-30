let level4Musical_Instruments = [
  { name: "classic_guitar", img: "Musical_Instruments_img/3428498.jpg" },
  { name: "classic_guitar", img: "Musical_Instruments_img/3428498.jpg" },
  { name: "xylophone", img: "Musical_Instruments_img/6637619.jpg" },
  { name: "xylophone", img: "Musical_Instruments_img/6637619.jpg" },
  { name: "Drums", img: "Musical_Instruments_img/6332012.jpg" },
  { name: "Drums", img: "Musical_Instruments_img/6332012.jpg" },
  { name: "Cymbals", img: "Musical_Instruments_img/3927581.jpg" },
  { name: "Cymbals", img: "Musical_Instruments_img/3927581.jpg" },
  { name: "flute", img: "Musical_Instruments_img/221563.jpg" },
  { name: "flute", img: "Musical_Instruments_img/221563.jpg" },
  { name: "Flute", img: "Musical_Instruments_img/8678157.jpg" },
  { name: "Flute", img: "Musical_Instruments_img/8678157.jpg" },
  { name: "trumpet", img: "Musical_Instruments_img/164936.jpg" },
  { name: "trumpet", img: "Musical_Instruments_img/164936.jpg" },
  { name: "Electric_Guitar", img: "Musical_Instruments_img/2156327.jpg" },
  { name: "Electric_Guitar", img: "Musical_Instruments_img/2156327.jpg" },
  { name: "oud", img: "Musical_Instruments_img/2257558.jpg" },
  { name: "oud", img: "Musical_Instruments_img/2257558.jpg" },
  { name: "harp", img: "Musical_Instruments_img/8519628.jpg" },
  { name: "harp", img: "Musical_Instruments_img/8519628.jpg" },
  { name: "Violin", img: "Musical_Instruments_img/7097776.jpg" },
  { name: "Violin", img: "Musical_Instruments_img/7097776.jpg" },
  { name: "Grand_piano", img: "Musical_Instruments_img/6902921.jpg" },
  { name: "Grand_piano", img: "Musical_Instruments_img/6902921.jpg" },
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
let $previous_level = document.querySelector(".previous_level");
let $play = document.querySelector(".play_again");
let $home = document.querySelector(".home");
let $volume = document.querySelector(".volume");

$previous_level.onclick = function () {
  window.location.href = "/levels/level_3/level3.html";
};
$play.onclick = function () {
  window.location.href = "/levels/level_4/level4.html";
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

  createBoard(grid, level4Musical_Instruments);
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
  shuffle(level4Musical_Instruments);
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
    let clicked = level4Musical_Instruments[selected].name;
    cardsSelected.push(clicked);

    cardsId.push(selected);
    this.classList.add("flip");
    this.setAttribute("src", level4Musical_Instruments[selected].img);
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
  if (cardsWon == level4Musical_Instruments.length / 2) {
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
  let overallScore = 10000 - clicks * 20 - time * 10;
  let p = newPerson(playerName, overallScore);
  scores.push(p);
  saveToDB();
  window.location.href = "/Transitions/win/win4.html";
}

let interval = setInterval(() => {
  time++;
  $time.innerHTML = `Time: ${time}`;
  if (time > 20 * 60) {
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
