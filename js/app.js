
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

		if (guessNum) {
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
	$('#guessList').empty();
	finalNum = randNum(1, 100);
	debug(finalNum);
	// need to delete guesses.
};

var playerGuess = function(guessArray, currentCount) {
	debug("player guessed: " + guessArray.slice(-1)[0]);

	if (currentCount == 1) {

	} else {

	}
}

var pageUpdate = function(currentCount, guessNum) {
	$('#guessList').append('<li>' + guessNum + '</li>');
	countUpdate(currentCount);
}

function countUpdate(newCount) {
  	$("#count").html(newCount);
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