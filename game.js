//Global Variables

let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
}

$(".btn").click(function(){
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    let audioPlayed = new Audio("./sounds/" + name + ".mp3");
    audioPlayed.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);;
    }, 100);
}

$(document).keypress(function(){
    if(started != true){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

//Develop by Alejandro Nishiky
