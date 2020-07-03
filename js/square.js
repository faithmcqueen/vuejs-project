//This file holds our constructor for our Square class, 
//which creates a new instance for all of our game baord squares.

class Square {

	constructor() {

		//The default value for each square should be nothing. This will change on the click of the square.
		this.value = null;

		//This will change to true if a winning combination has been met. This will bind to the class "highlight" and turn the winning value green
		this.winningSquare = false;

	}//end constructor
}//end square class