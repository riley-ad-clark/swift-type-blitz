'use strict';

import { Score } from './Score.js';

document.addEventListener('DOMContentLoaded', function () {
  // DOM Elements
  const startRestartButton = document.querySelector('button.start-restart');
  const scoreBox = document.querySelector('.score-box');
  const scoreCounter = document.querySelector('.score-counter');
  const timeBox = document.querySelector('.time-box');
  const timeCounter = document.querySelector('.time-counter');
  const userInput = document.querySelector('.user-input input');
  const arrayWord = document.querySelector('.array-word');
  const lowerSection = document.querySelector('.lower');
  const title = document.querySelector('h1');

  // Audio Elements
  const menuMusic = new Audio('./assets/audio/waiting-music.mp3');
  menuMusic.loop = true;
  menuMusic.play();

  const backgroundMusic = new Audio('./assets/audio/game-music.mp3');

  const endMusic = new Audio('./assets/audio/end-music.mp3');

  // Game State Variables
  let currentWord;
  let timerDuration = 99;
  let score = 0;
  let timer;
  let isGameRunning = false;

    // Functions
function getRandomWord() {
    let wordList = [
        'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
        'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
        'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
        'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
        'philosophy', 'database', 'periodic', 'capitalism', 'abominable',
        'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
        'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'promise',
        'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
        'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
        'management', 'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess',
        'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library',
        'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy',
        'interview', 'awesome', 'challenge', 'science', 'mystery', 'famous',
        'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
        'keyboard', 'window', 'beans', 'truck', 'sheep', 'band', 'level', 'hope',
        'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil', 'mask',
        'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
        'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort', 'escape'
    ];
    let usedWords = [];

    if (wordList.length === 0) {
        // Resets the used words array if the original array is empty
        wordList = usedWords.slice();
        usedWords = [];
    }

    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWord = wordList[randomIndex];

    // Remove picked word from the original array, and add it to used words.
    wordList.splice(randomIndex, 1);
    usedWords.push(randomWord);

    return randomWord;
}

  function showNewWord() {
        currentWord = getRandomWord();
        arrayWord.textContent = currentWord;
        userInput.value = ''; // Clear the input field
  }

  function startGame() {
    score = 0;
    scoreCounter.textContent = score;

    // Update the timer duration if needed
    timerDuration = 90;
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
    startRestartButton.textContent = 'restart';

    // Pause the menu music and play the background music
    menuMusic.pause();
    backgroundMusic.play();
  }

  function restartGame() {
    // Clear any existing interval for the countdown
    clearInterval(timer);
    
    // Reset timer duration and display "Get ready!"
    timeCounter.textContent = timerDuration;

    // Reset the current word display
    arrayWord.textContent = '';

    // Reset the score and hide display
    score = 0;
    scoreCounter.textContent = score;
    scoreCounter.classList.add('invisible'); // Hide score

    // Reset timer duration and display "Get ready!"
    timerDuration = 90;
    timeCounter.textContent = timerDuration;
    timeCounter.classList.add('invisible'); // Hide time

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
    startRestartButton.textContent = 'restart';

    // Pause and reset the menu music
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    // Play the background music
    backgroundMusic.play();
  }

  function showCountdownScreen(callback) {
    // Hide other elements
    scoreBox.classList.add('invisible');
    timeBox.classList.add('invisible');
    userInput.classList.add('invisible');
    startRestartButton.classList.add('invisible');
    title.classList.add('invisible');

    // Display countdown screen with 2 seconds of free time
    const countdownScreen = document.createElement('div');
    countdownScreen.classList.add('countdown-screen');

    const countDownText = document.createElement('h2');
    countDownText.textContent = 'get ready!'; // Initial text content
    countDownText.classList.add('fade-in'); // Add fade-in class to the h2 element
    countdownScreen.appendChild(countDownText);

    document.body.appendChild(countdownScreen);

    let countdown = 7; // Total countdown duration is 7 seconds
    const countdownInterval = setInterval(function () {
        if (countdown === 7) {
            // Show "Get ready!" at the beginning and after 5 seconds
            countDownText.textContent = 'get ready!';
            countDownText.classList.add('fade-out');
        } else if (countdown > 1) {
            // During the next 5 seconds, display the countdown from 5 to 1
            countDownText.classList.remove('fade-out');
            countDownText.style.opacity = '1'
            countDownText.textContent = countdown - 1; // Adjusted to start from 5
        } else {
            clearInterval(countdownInterval);
            document.body.removeChild(countdownScreen);
            callback(); // Execute the callback function after the countdown
        }

        countdown--;
    }, 1000);
  }

  function hideCountdownScreen() {
            // Show all elements
            scoreBox.classList.remove('invisible');
            scoreBox.classList.add('visible', 'fade-in');
            timeBox.classList.remove('invisible');
            timeBox.classList.add('visible', 'fade-in');
            lowerSection.classList.remove('invisible');
            lowerSection.classList.add('visible', 'fade-in');
            userInput.classList.remove('invisible');
            userInput.classList.add('visible', 'fade-in')
            startRestartButton.classList.remove('invisible');
            startRestartButton.classList.add('visible', 'fade-in');
            title.classList.remove('invisible');
            title.classList.add('visible', 'fade-in');
            scoreCounter.classList.remove('invisible');
            timeCounter.classList.remove('invisible');
  }

  function endGame() {
    clearInterval(timer);

        // Get the current date
        const currentDate = new Date().toLocaleDateString();
    
        // Calculate the percentage directly
        const percentage = calculatePercentage(score);

        const gameScore = new Score(currentDate, score, percentage);
    
        // Display the game over screen
        const gameOverScreen = document.createElement('div');
        gameOverScreen.classList.add('game-over-screen', 'fade-in');

        const gameOverInnerDiv = document.createElement('div');
        gameOverInnerDiv.classList.add('game-over-inner-div', 'fade-in');
        gameOverScreen.appendChild(gameOverInnerDiv);
    
        const holyMoly = document.createElement('h2');
        holyMoly.classList.add('holy-moly');
        holyMoly.textContent = "Holy Moly... You're good!";
        gameOverInnerDiv.appendChild(holyMoly);
    
        const resultsHeading = document.createElement('h3');
        resultsHeading.textContent = 'Here are your results:';
        gameOverInnerDiv.appendChild(resultsHeading);
    
        const dateAchieved = document.createElement('p');
        dateAchieved.textContent = 'Date Achieved: ' + gameScore.date;
        gameOverInnerDiv.appendChild(dateAchieved);
    
        const finalScore = document.createElement('p');
        finalScore.textContent = 'Final Score: ' + gameScore.points;
        gameOverInnerDiv.appendChild(finalScore);

        const finalPercentage = document.createElement('p');
        finalPercentage.textContent = 'Final Percentage (out of 120): ' + percentage;
        gameOverInnerDiv.appendChild(finalPercentage);

        const retryButton = document.createElement('button');
        retryButton.innerText= 'restart';
        retryButton.classList.add('start-restart', 'again-button');
        gameOverInnerDiv.appendChild(retryButton);
    
        // Append the gameOverScreen to the document body
        document.body.appendChild(gameOverScreen);
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        endMusic.play();
  }

  function calculatePercentage(score) {
    const maximumPossibleScore = 120;
        return (score / maximumPossibleScore * 100).toFixed(1) + '%';
  }

  function handleButtonClick(event) {
    const gameOverScreen = document.querySelector('.game-over-screen');
    if (event.target.classList.contains('start-restart')) {
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

      document.addEventListener('click', handleButtonClick);
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
  document.addEventListener('click', handleButtonClick);
  userInput.addEventListener('input', handleInput);
});
