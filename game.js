var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var counter = 0;

$(document).on("keydown", function(event){
    if(gamePattern.length === 0){
        nextSequence();
    }
});

function nextSequence(){
    var color = buttonColours[Math.floor(Math.random() * 4)];
    gamePattern.push(color);
    $("h1").text("Level " + gamePattern.length);
    buttonClick(color);
    console.log(color);
    return color;
}


function buttonClick(color){
    $("#"+ color).addClass("pressed");
    setTimeout(function(){
        $("#" + color).removeClass("pressed");   
    }, 100);
    playSound(color);
}


function gameOver(){
   $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
   setTimeout(function(){
        $("body").removeClass("game-over");
   }, 100);
   var audio = new Audio("sounds/wrong.mp3");
   audio.play();
}

function playSound(color){
    console.log (color);
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}


$(".btn").on("click", function(){
    buttonClick($(this).attr("id"));
    if(counter < gamePattern.length){
        if($(this).attr("id") === gamePattern[counter]){
            counter++;
            if(counter == gamePattern.length){
                counter = 0;
                setTimeout(nextSequence, 1000);
            }
        }
        else{
            gamePattern.length = 0;
            counter = 0;
            console.clear();
            gameOver();
        }
    }
});