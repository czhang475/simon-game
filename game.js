var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(".btn").on("click", function() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer((userClickedPattern.length - 1));
})

var level = 0;
$("body").on("keypress", function() {
    if (level === 0) {
        $("#level-title").html("Get ready!");
        setTimeout(nextSequence, 1500);
    }
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    for (var i=0; i<gamePattern.length; i++){
        playSequence(i);
    }

    function playSequence(i) {
        setTimeout(function () {
            $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]); }, 700 * i);
    }

    level++;
    $("#level-title").html("Level " + level);
}

function playSound(name) {
    var colorSound = new Audio("sounds/" + name + ".mp3");
    colorSound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {$("#" + currentColor).removeClass("pressed")}, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(nextSequence, 1000);
            userClickedPattern = [];
        }
    } else {
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function() {$("body").removeClass("game-over")}, 200);
        $("#level-title").html("Game Over! Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
}
