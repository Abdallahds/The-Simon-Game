let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStart = false;
let level = 0;

function NextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  level++;
  $("h1").html("level " + level);
}


$(".btn").click(function() {
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer((userClickedPattern.length) - 1);
})


function playSound(name) {
  var audio = new Audio('sounds/' + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$("body").keypress(function() {
  if (!gameStart) {
    NextSequence();
    gameStart = true;
    $("h1").html("level " + level);
  }
})

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        NextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  }
  else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    restart();
  }

}

function restart(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
  gameStart=false;
}
