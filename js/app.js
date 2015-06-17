
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
			alert("Need to input a number");
		}

		document.getElementById('userGuess').value = "";  		
  	});

});

var DEBUG_MODE = true;

var winStatus = true;

var debug = function(msg) {
    if (DEBUG_MODE == true) {
        console.log("DEBUG:", msg);
    }
}

var finalNum = randNum(1, 100);
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
	debug("player guessed: " + guessArray.slice(-1)[0]);

	var guessNum = guessArray.slice(-1)[0];

	if (guessNum == finalNum) {
		feedbackUpdate("You won in " + currentCount + ((currentCount == 1) ? " try! Start another game?" : " tries! Start another game?" ));
		winStatus = false;
	}

	if (currentCount == 1) {
		firstComparison(guessArray.slice(-1)[0], finalNum);
	} else {
		 
	}
}

function firstComparison(guessNum, rightNum) {
	rightDiff = Math.abs(guessNum - rightNum);

	var hotMax = 10;
	var warmMax = 20;
	var coolMax = 40;

	// need to finish this.  would prefer not to just do if statements.

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