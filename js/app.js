
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
		} else if (guessArray.indexOf(guessNum) >= 0) {
			alert("You already guessed that!");
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
	} else if ((currentCount == 1 || absComp) && winStatus) {
		firstComparison(guessNum, finalNum);
	} else {
		nextComparison(guessNum, guessArray.slice(-2)[0],finalNum);
	}
}

var temperatureDict = {
	10: "You're VERY hot!",
	20: "You're hot!",
	30: "You're pretty warm.",
	50: "You're cold.",
	100: "You're freezing cold!"
}

var temperatureKeys = Object.keys(temperatureDict).map(function(item){
	return parseInt(item);
}).sort(function(a, b){return a-b});

var vhotMax = 10;
var hotMax = 20;
var warmMax = 30;
var coldMax = 50;

tempArray = [
	2,
	3,
	5,
	7,
	11,
	13,
	17,
	19,
	23,
	29,
	31,
	37,
	41,
	43,
	47,
	53,
	59,
	61,
	67,
	71
];

// low starts at 0, high starts at array.length, num is the target.
// i spent an embarrassingly lengthy amount of time working on this tangent.

// test the "high" value input - currently as length, probably should be highest index, which is length - 1.
// test inputting value above max values in the array, below min as well.

function binaryLowestGreater(array, iMin, iMax, num) {
	// note that this method will always return a value, even if you go above or below the array range.

	// Create midpoint index number. This will be the primary comparison point.
	var mid = Math.floor((iMin + iMax) / 2);

	//console.log("iMin, iMax, num, mid, array: ", iMin, iMax, num, array[mid], array.slice(iMin, iMax + 1));
	console.log(iMin, iMax, num);
	debug("Mid num: " + array[mid]);
	debug(array.slice(iMin, iMax + 1));
	debug("Break");

	// this allows us to stop when done, and thus find the lowest greater than value.
	if (iMin == iMax) {
		// index values are equal - found our match.
		return array[iMin];
	} 

	// this one works if you want to find perfect matches.
/*	if (iMin > iMax) {
		return "not found";
	}
*/
	if (array[mid] < num) {
		// midpoint num is less than the target - check top half.
		return binaryLowestGreater(array, mid + 1, iMax, num);
	} else if (array[mid] == num) {
		// found a perfect match.
		return array[mid];
	} else {
		// midpoint num is greater than the target.  Check bottom half.
		return binaryLowestGreater(array, iMin, mid - 1, num);
	}
}

function firstComparison(guessNum, rightNum) {
	rightDiff = Math.abs(guessNum - rightNum);
	debug(rightDiff);

	feedbackUpdate(temperatureDict[binaryLowestGreater(temperatureKeys, 0, temperatureKeys.length - 1, rightDiff)]);

/*	if (rightDiff > 0 && rightDiff <= vhotMax) {
		feedbackUpdate("You're VERY Hot!");
	} else if (rightDiff > vhotMax && rightDiff <= hotMax) {
		feedbackUpdate("You're hot!"); 
	} else if (rightDiff > hotMax && rightDiff <= warmMax) {
		feedbackUpdate("You're pretty warm!");
	} else if (rightDiff > warmMax && rightDiff <= coldMax) {
		feedbackUpdate("You're cold.");
	} else {
		feedbackUpdate("You're very cold!");
	}*/
}

function nextComparison(guessNum, lastNum, rightNum) {
	var rightDiff = Math.abs(guessNum - rightNum);
	var oldDiff = Math.abs(lastNum - rightNum);

	debug(rightDiff + ", " + oldDiff);
	debug("on next comparison");

	if (oldDiff >= Object.keys(temperatureDict)[0]) {
		feedbackUpdate(temperatureDict[binaryLowestGreater(temperatureKeys, 0, temperatureKeys.length - 1, rightDiff)]);
	} else {
		if (rightDiff < oldDiff) {
			feedbackUpdate("Hotter!");
		} else if (rightDiff == oldDiff) {
			feedbackUpdate("Still hot!");
		} else {
			feedbackUpdate("Getting colder!");
		}
	}
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