"use strict";

import { Score } from "./Score.js";
import { append, element, addClass, removeClass, removeChild } from "./utility.js";

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const startRestartButton = document.querySelector("button.start-restart");
  const scoreBox = document.querySelector(".score-box");
  const scoreCounter = document.querySelector(".score-counter");
  const timeBox = document.querySelector(".time-box");
  const timeCounter = document.querySelector(".time-counter");
  const userInput = document.querySelector(".user-input input");
  const arrayWord = document.querySelector(".array-word");
  const lowerSection = document.querySelector(".lower");
  const title = document.querySelector("h1");
  const titleSpan = document.querySelector(".title-span")
  
  let wordList = [
    "dinosaur",
    "love",
    "pineapple",
    "calendar",
    "robot",
    "building",
    "population",
    "weather",
    "bottle",
    "history",
    "dream",
    "character",
    "money",
    "absolute",
    "discipline",
    "machine",
    "accurate",
    "connection",
    "rainbow",
    "bicycle",
    "eclipse",
    "calculator",
    "trouble",
    "watermelon",
    "developer",
    "philosophy",
    "database",
    "periodic",
    "capitalism",
    "abominable",
    "component",
    "future",
    "pasta",
    "microwave",
    "jungle",
    "wallet",
    "canada",
    "coffee",
    "beauty",
    "agency",
    "chocolate",
    "eleven",
    "technology",
    "promise",
    "alphabet",
    "knowledge",
    "magician",
    "professor",
    "triangle",
    "earthquake",
    "baseball",
    "beyond",
    "evolution",
    "banana",
    "perfume",
    "computer",
    "management",
    "discovery",
    "ambition",
    "music",
    "eagle",
    "crown",
    "chess",
    "laptop",
    "bedroom",
    "delivery",
    "enemy",
    "button",
    "superman",
    "library",
    "unboxing",
    "bookstore",
    "language",
    "homework",
    "fantastic",
    "economy",
    "interview",
    "awesome",
    "challenge",
    "science",
    "mystery",
    "famous",
    "league",
    "memory",
    "leather",
    "planet",
    "software",
    "update",
    "yellow",
    "keyboard",
    "window",
    "beans",
    "truck",
    "sheep",
    "band",
    "level",
    "hope",
    "download",
    "blue",
    "actor",
    "desk",
    "watch",
    "giraffe",
    "brazil",
    "mask",
    "audio",
    "school",
    "detective",
    "hero",
    "progress",
    "winter",
    "passion",
    "rebel",
    "amber",
    "jacket",
    "article",
    "paradox",
    "social",
    "resort",
    "escape",
  ];

  // Audio Elements
  const menuMusic = new Audio("./assets/audio/waiting-music.mp3");
  menuMusic.loop = true;
  menuMusic.play();
  const backgroundMusic = new Audio("./assets/audio/game-music.mp3");
  const endMusic = new Audio("./assets/audio/end-music.mp3");

  // Game State Variables
  let currentWord;
  let timerDuration = 99;
  let score = 0;
  let timer;
  let isGameRunning = false;

  // Functions
  function getRandomWord() {
    let newArray = []
    newArray = wordList;
    const randomIndex = Math.floor(Math.random() * newArray.length);
    const randomWord = wordList[randomIndex];
    return randomWord;
  }

  function showNewWord() {
    currentWord = getRandomWord();
    arrayWord.textContent = currentWord;
    userInput.value = ""; // Clear the input field
  }

  function stylizeOnAllStarts() {
    title.style.fontSize = '40px'
    titleSpan.style.fontSize = '40px'
    arrayWord.style.fontSize = '60px'
  }

  function startGame() {
    stylizeOnAllStarts();
    score = 0;
    scoreCounter.textContent = score;

    // Update the timer duration if needed
    timerDuration = 1;
    timeCounter.textContent = timerDuration;

    // Show countdown screen
    showCountdownScreen(() => {
      // Hide countdown screen and start the game
      hideCountdownScreen();
      showNewWord();
      timer = setInterval(function () {
        timerDuration--;
        timeCounter.textContent = timerDuration;
        if (timerDuration <= 0) {
          endGame();
        }
      }, 1000);
    });

    // Update the flag to indicate that the game is running
    isGameRunning = true;

    // Change the button text to "Restart"
    startRestartButton.textContent = "restart";

    // Pause the menu music and play the background music
    menuMusic.pause();
    backgroundMusic.play();
  }

  function restartGame() {
    // Clear any existing interval for the countdown
    clearInterval(timer);

    arrayWord.textContent = "";

    score = 0;
    scoreCounter.textContent = score;
    addClass(scoreCounter, "invisible"); // Hide score

    // Reset timer duration and display "Get ready!"
    timerDuration = 1;
    timeCounter.textContent = timerDuration;
    addClass(timeCounter, "invisible"); // Hide time

    // Show countdown screen
    showCountdownScreen(() => {
      // Hide countdown screen and start the game
      hideCountdownScreen();
      showNewWord();
      timer = setInterval(function () {
        timerDuration--;
        timeCounter.textContent = timerDuration;
        if (timerDuration <= 0) {
          endGame();
        }
      }, 1000);
    });

    // Change the button text to "restart"
    startRestartButton.textContent = "restart";

    // Pause and reset the menu music
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    // Play the background music
    backgroundMusic.play();
  }

  function showCountdownScreen(callback) {
    // Hide other elements
    addClass(scoreBox, "invisible");
    addClass(timeBox, "invisible");
    addClass(userInput, "invisible");
    addClass(startRestartButton, "invisible");
    addClass(title, "invisible");

    // Display countdown screen with 2 seconds of free time
    const countdownScreen = element("div");
    addClass(countdownScreen, "countdown-screen");

    const countDownText = element("h2");
    countDownText.textContent = "get ready!"; // Initial text content
    addClass(countDownText, "fade-in"); // Add fade-in class to the h2 element
    append(countdownScreen, countDownText);

    append(document.body, countdownScreen);

    let countdown = 7; // Total countdown duration is 7 seconds
    const countdownInterval = setInterval(function () {
      if (countdown === 7) {
        // Show "Get ready!" at the beginning and after 5 seconds
        countDownText.textContent = "get ready!";
        addClass(countDownText, "fade-out");
      } else if (countdown > 1) {
        // During the next 5 seconds, display the countdown from 5 to 1
        removeClass(countDownText, "fade-out");
        countDownText.style.opacity = "1";
        countDownText.textContent = countdown - 1; // Adjusted to start from 5
      } else {
        clearInterval(countdownInterval);
        removeChild(document.body, countdownScreen);
        callback(); // Execute the callback function after the countdown
      }
      countdown--;
    }, 1000);
  }

  function hideCountdownScreen() {
    removeClass(scoreBox, "invisible");
    addClass(scoreBox, "visible", "fade-in");
    removeClass(timeBox, "invisible");
    addClass(timeBox, "visible", "fade-in");
    removeClass(lowerSection, "invisible");
    addClass(lowerSection, "visible", "fade-in");
    removeClass(userInput, "invisible");
    addClass(userInput, "visible", "fade-in");
    removeClass(startRestartButton, "invisible");
    addClass(startRestartButton, "visible", "fade-in");
    removeClass(title, "invisible");
    addClass(title, "visible", "fade-in");
    removeClass(scoreCounter, "invisible");
    removeClass(timeCounter, "invisible");
  }

  function createEndScreen() {
    const currentDate = new Date().toLocaleDateString();
    const percentage = calculatePercentage(score);
    const gameScore = new Score(currentDate, score, percentage);

    const gameOverScreen = element("div");
    addClass(gameOverScreen, "game-over-screen", "fade-in");

    const gameOverInnerDiv = element("div");
    addClass(gameOverInnerDiv, "game-over-inner-div", "fade-in");
    append(gameOverScreen, gameOverInnerDiv);

    const holyMoly = document.createElement("h2");
    addClass(holyMoly, "holy-moly");
    holyMoly.textContent = "Holy Moly... You're good!";
    append(gameOverInnerDiv, holyMoly);

    const resultsHeading = element("h3");
    resultsHeading.textContent = "Here are your results:";
    append(gameOverInnerDiv, resultsHeading);

    const dateAchieved = element("p");
    dateAchieved.textContent = "Date Achieved: " + gameScore.date;
    append(gameOverInnerDiv, dateAchieved);

    const finalScore = element("p");
    finalScore.textContent = "Final Score: " + gameScore.points;
    append(gameOverInnerDiv, finalScore);

    const finalPercentage = element("p");
    finalPercentage.textContent = "Final Percentage (out of 120): " + percentage;
    append(gameOverInnerDiv, finalPercentage);

    const retryButton = document.createElement("button");
    retryButton.innerText = "restart";
    addClass(retryButton, "start-restart", "again-button");

    append(gameOverInnerDiv, retryButton);
    append(document.body, gameOverScreen);
  }

  function endGame() {
    clearInterval(timer);
    createEndScreen();
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    endMusic.play();
  }

  function calculatePercentage(score) {
    const maximumPossibleScore = 120;
    return ((score / maximumPossibleScore) * 100).toFixed(1) + "%";
  }

  function handleButtonClick(event) {
    const gameOverScreen = document.querySelector(".game-over-screen");
    if (event.target.classList.contains("start-restart")) {
      if (isGameRunning) {
        endMusic.pause();
        endMusic.currentTime = 0;
        restartGame();
        if (gameOverScreen !== null && gameOverScreen !== undefined) {
          document.body.removeChild(gameOverScreen);
        }
      } else {
        startGame();
      }

      document.addEventListener("click", handleButtonClick);
    }
  }

  function handleInput() {
    const typedWord = userInput.value.trim().toLowerCase();
    if (typedWord === currentWord) {
      score++;
      scoreCounter.textContent = score;
      showNewWord();
    }
  }

  // Event Listeners
  document.addEventListener("click", handleButtonClick);
  userInput.addEventListener("input", handleInput);
});
