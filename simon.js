var colors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var gameStart = false;

function nextSequence() {
    var randomNum = Math.floor(Math.random() * 4);
    var randomColor = colors[randomNum];
    gamePattern.push(randomColor);
    playSound(randomColor);
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
    $("#level-title").text("Level " + level);
    userPattern = [];
}

$(".btn").on("click", function() {
    if(gameStart) {
        var clickedColor = $(this).attr("id");
        userPattern.push(clickedColor);
        playSound(clickedColor);
        animatePressed(clickedColor);
        if(checkAnswer(userPattern.length - 1)) {
            if(gamePattern.length === userPattern.length) {
                setTimeout(function() {
                    nextSequence();
                }, 1000);
            }
        }
        else {
            gameOver();
        }
    }
});

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePressed(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}

$(document).on("keydown", function() {
    if(!gameStart) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStart = true;
    }
});

function checkAnswer(inputIndex) {
    return gamePattern[inputIndex] === userPattern[inputIndex];
}

function gameOver() {
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    gamePattern = [];
    userPattern = [];
    level = 0;
    gameStart = false;
}