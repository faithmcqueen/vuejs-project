//This file holds our constructor for our Game class, 
//which creates a new instance for the game itself

class Game {

	// Here we construct the game, so we need to consider what will make the game actually run
	constructor () {

		//We need to get our squares, and map out our new instance of our Square class to our new array of 9 squares, so each one has a .value and .winningSquare variable associated with it
		this.squares = new Array(9).fill().map(s => new Square());

		//Now we need to check on the game. Is the game in progress? This is a true or false variable
		this.inProgress = true;

		//Who is the winner of the game? the default here is no one, because the game hasn't started yet
		this.winner = null; // eventually, when we check for the winner, this var will be 'O' or 'X'

		//Who's turn is it? we'll start with player X. This will change every turn, bouncing between X and O
		this.currentTurn = Game.X; 

		//How many moves have been made? We need to track this so we can see if the game has been won 
		//If there have been 9 moves and no winning combination has been matched, it's a tie game
		this.movesMade = 0; 

	} //end constructor()


	//Here we need to create a function for what happens on the click of a square, which is considered a "move" in the game.
	//When we make a move, we need to pass through the index of where that move is, so we know where to add the value
	makeMove(i) {
			//We need to run an if statement to determine whether a move can be made
			//A move can only be made IF the game is in progress currently, and if the square's value is null - players can't change a square's value
			if (this.inProgress && this.squares[i].value === null) {

				//If a move can be made, we need to increase the number of total moves
				this.movesMade++;

				//Then, update the value of the square, by passing through our index and setting the value as our currentTurn value - either X or O
				this.squares[i].value = this.currentTurn;

				//We need to check for a winner - is there a winning combination on the board? This calls the checkWinner function
				this.checkWinner();

				//Now we need to swap turns - we do this using a conditional (ternary) operator
				//Syntax of this operator: condition ? exprIfTrue : exprIfFalse
				//Source for this syntax: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator#:~:text=The%20conditional%20(ternary)%20operator%20is,if%20the%20condition%20is%20falsy.
				this.currentTurn = (this.currentTurn === Game.X) ? Game.O : Game.X;

			} //end if
		} //end this.makeMove

	// Create a function to check for a winner. This function is called every turn. The function will check for a winner OR for a tie
	checkWinner() {
		
		//create an array of all of the combinations of selected squares that would result in a winner
		const winningCombos = [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			[0,3,6],
			[1,4,7],
			[2,5,8],
			[0,4,8],
			[2,4,6]
		];

		//Check for the winner by looping through winning combinations
		winningCombos.forEach((win) => {
			//defining a win by creating an array which will compare the values to our winningCombos array
			const [a,b,c] = win; 

			//that comparison is done by splitting everything up - we check our squares to see if any of them match the numbers in our arrays
			const squareA = this.squares[a];
			const squareB = this.squares[b];
			const squareC = this.squares[c];

			//Now we need an if statement to handle what happens when a match is found. We look for the value of these squares - if they all have the same value (X or O) this is a winning game
			if (squareA.value && squareA.value === squareB.value && squareA.value === squareC.value) {

				//end the inProgress status of the game, so no more moves can be made
				this.inProgress = false;

				//set the winner as the value of our winning squares (either X or O)
				this.winner = squareA.value; 

				//set squares A B and C as winning squares by changing the winningSquare variable to true
				squareA.winningSquare = squareB.winningSquare = squareC.winningSquare = true;

			}//end if
		}); //end winningCominations.forEach

		//Check for a cats game/tie game/game without winner - if 9 moves have been made without a winning combination
		if (this.movesMade === this.squares.length) {
			//inProgress turns false, so the game ends
			//winner stays at a null value, because there is no winner
			this.inProgress = false; 
		} //end if

	} //end checkWinner

} //end class


//declare global vars
Game.O = 'O';
Game.X = 'X';