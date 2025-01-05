var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var gamePattern=[];
var level=0;
var started= false;

$(document).keypress(function(){
  if(!started){
    nextSequence();
    $("#level-title").text("level " + level);
    started = true;
  }
})

function nextSequence(){
  level++;
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  console.log(randomChosenColour);
  animatePress(randomChosenColour);
}

function checkAnswer(level){
    if(gamePattern[level]===userClickedPattern[level]){
      console.log("Right")
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
    }else{
      console.log("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

$(".btn").click(
  function(){
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
  }
)

function animatePress(color){
  $("#"+ color).addClass("pressed");
  setTimeout(function(){
    $("#"+ color).removeClass("pressed");
  }, 90);
}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started=false;
}