var colors = [];
var pickedColor = "";
var numSquares = 6;
var messageDisplay = document.querySelector("#message");
var heading = document.querySelector("h1");
var colorDisplay = document.getElementById("colorDisplay");
var squares = document.querySelectorAll(".square");
var resetButton = document.querySelector("#reset");

var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	setUpButtons();
	setUpSquares();
	reset();
}

function setUpButtons(){
	//add event listener to the reset/play again button.
	resetButton.addEventListener("click", function(){
		reset();
	});
	//add event listeners to the easy/hard buttons
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			for(var i = 0; i < modeButtons.length; i++){
				modeButtons[i].classList.remove("selected");
			}
			this.classList.add("selected");
			if(this.textContent === "Easy"){
				numSquares = 3;
			}else{
				numSquares = 6;
			}
			reset();
			});	
	}
}

function setUpSquares(){
	//add event listeners for squares
	for (var i = 0; i < squares.length; i++){
		//add click listeners
		squares[i].addEventListener("click", function(){
			//grab color of picked square and compare to winning color.
			var clickedColor = this.style.backgroundColor;
		
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				resetButton.textContent = "Play Again?"
			}else{
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}



/* reset function resets the game by choosing new colors based on how many squares are
visible. Sets the background and header colors back to default and chooses a new winning
color. Reset also changes the level by showing either six or three squares.
*/
function reset(){
	colors = generateColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	heading.style.backgroundColor = "steelblue";
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	for (var i = 0; i <squares.length; i++){
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		}else{
			squares[i].style.display = "none";
		}
	}
}

//Generates the list of either 6 or 3 colors.
function generateColors(number){
	var colorList = [];
	for(var i = 0; i < number; i++){
		colorList.push(randomColor());
	}
	return colorList;
}

//Returns a random rgb color string
function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

//changes the color of header and all squares when the game is won.
function changeColors(color){
	heading.style.backgroundColor = color;
	for (var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

//picks the winning color from the list of colors.
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}