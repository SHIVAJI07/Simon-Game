var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(".btn").on("click", function() {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();

            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");

        $("h1").text("GAME OVER, Press Start To PLAY AGAIN");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }

}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}


function nextSequence() {
    userClickedPattern = [];
    level++;

    $("h1").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChooseColor = buttonColours[randomNumber];

    gamePattern.push(randomChooseColor);

    $("#" + randomChooseColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChooseColor);
}

$(".sec1 ").on("click ", function() {

    var userChoosenColor = $(this).attr("id");

    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor);

    animatePress(userChoosenColor);

    checkAnswer(userClickedPattern.length - 1);
});


function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(() => {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}