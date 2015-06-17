
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	$('.new').click(newGame);

  	$('#userGuess').keypress(function(e){
		var keycode = (e.keyCode ? e.keyCode : e.which);
		if (keycode == '13') {
			event.preventDefault();
			$('#guessButton').click();
		}
  	});

  	$('#guessButton').click(function(){
		var guessNum = $('#userGuess').val();
		guessNum = parseInt(guessNum);

		if (winStatus != true) {
			alert("Start a new game!");
		} else if (guessNum) {
			guessArray.push(guessNum);
			currentCount +=1;
			playerGuess(guessArray, currentCount);
			pageUpdate(currentCount, guessNum);
		} else {
			alert("Need to input a number between " + minNum + " and" + maxNum);
		}

		document.getElementById('userGuess').value = "";  		
  	});

});

var absComp = false;

var DEBUG_MODE = true;

var winStatus = true;

var minNum = 1;
var maxNum = 100;

var vhotMax = 10;
var hotMax = 20;
var warmMax = 30;
var coldMax = 50;

var debug = function(msg) {
    if (DEBUG_MODE == true) {
        console.log("DEBUG:", msg);
    }
}

var finalNum = randNum(minNum, maxNum);
debug(finalNum);

var currentCount = 0;
countUpdate(currentCount);

var guessArray = [];

var newGame = function(){
	currentCount = 0;
	countUpdate(currentCount);
	guessArray = [];
	winStatus = true;
	feedbackUpdate("Make your Guess!");

	$('#guessList').empty();
	finalNum = randNum(1, 100);
	debug(finalNum);
	// need to delete guesses.
};

var playerGuess = function(guessArray, currentCount) {
	var guessNum = guessArray.slice(-1)[0];

	if (guessNum == finalNum) {
		feedbackUpdate("Correct, it was " + finalNum + "! You won in " + currentCount + ((currentCount == 1) ? " try. Start another game?" : " tries. Start another game?" ));
		winStatus = false;
	}

	if ((currentCount == 1 || absComp) && winStatus) {
		firstComparison(guessNum, finalNum);
	} else {
		nextComparison(guessNum, guessArray.slice(-2)[0],finalNum);
	}
}

function firstComparison(guessNum, rightNum) {
	rightDiff = Math.abs(guessNum - rightNum);
	debug(rightDiff);

	// need to finish this.  would prefer not to just do if statements.

	if (rightDiff > 0 && rightDiff <= vhotMax) {
		feedbackUpdate("You're VERY Hot!");
	} else if (rightDiff > vhotMax && rightDiff <= hotMax) {
		feedbackUpdate("You're hot!"); 
	} else if (rightDiff > hotMax && rightDiff <= warmMax) {
		feedbackUpdate("You're pretty warm!");
	} else if (rightDiff > warmMax && rightDiff <= coldMax) {
		feedbackUpdate("You're cold.");
	} else {
		feedbackUpdate("You're very cold!");
	}
}

function nextComparison(guessNum, lastNum, rightNum) {

}

var pageUpdate = function(currentCount, guessNum) {
	$('#guessList').append('<li>' + guessNum + '</li>');
	countUpdate(currentCount);
}

function countUpdate(newCount) {
  	$("#count").html(newCount);
}

function feedbackUpdate(newText) {
	$("#feedback").html(newText);
}

function randNum(minNum, maxNum) {
	return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}

// Reqs:
/*
1. Rand num function, named.  Selects a num between 1 and 100.
2. new game starts without reloading.
3. feedback on guesses
	a. use absolute range feedback for first guess.
	b. use relative feedback (compared to previous guess) for subsequent guesses.
4. count of guesses.
5. list current guesses.

Functions and checks
- randbetween 1 to 100 function - the number to reach.
- player guess function - takes input, compares against correct number.
- 


*/