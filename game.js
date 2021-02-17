// Variables

var gamePattern = [];
var userclickedPattern = [];
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var level = 0;
var start = false;

function nextSequence() {
  userclickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  // level increment
  level++;

  gamePattern.push(randomChosenColor);
  $('#level-title').text('Level ' + level);
  // button animation at random
  setTimeout(function () {
    $('.' + buttonColors[randomNumber])
      .fadeOut(100)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    // clling playSouond();
    playSound(randomChosenColor);
  }, 1000);
}

// As the user choose one of four button, get the ID of th button to match the audio.
$('.btn').click(function () {
  var userChosenColor = $(this).attr('id');
  userclickedPattern.push(userChosenColor);
  // calling playSound();
  playSound(userChosenColor);
  // calling animatePress();
  animatePress(userChosenColor);
  checkAnswer(userclickedPattern);
});

// Play Sound function

function playSound(name) {
  var audio = new Audio('./sounds/' + name + '.mp3');
  audio.play();
}

// Animate during press function

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');

  setTimeout(function () {
    //your code to be executed after 100 milisecond
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}

// Detecting the first Keypress on the document
$(document).keypress(function () {
  if (start === false) {
    nextSequence();
    start = true;
  }
});

// Checking the gamePattern vs the userPatern

function checkAnswer(currentLevel) {
  console.log(userclickedPattern);
  console.log(gamePattern);
  if (
    gamePattern[currentLevel.length - 1] ===
    currentLevel[currentLevel.length - 1]
  ) {
    console.log('success');
    if (gamePattern.length === currentLevel.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log('wrong');
    $('#level-title').text('Game Over, Press Any Key To Restart');
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    startOver();
  }
}

//  if the user get the wrong answer. Restart the page.

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}
