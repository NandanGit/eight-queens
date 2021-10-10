const DOM = {
	// DOM Elements
	boardElement: document.getElementById('board'),
};

const Utils = {
	// Utility methods
};

const State = {
	// State variables
	board: [],
};

const UI = {
	// UI methods
	renderBoard(board, boardElement = DOM.boardElement) {
		boardElement.innerHTML = '';
		for (let i = 0; i < board.length; i++) {
			let row = document.createElement('div');
			row.classList.add('row');
			for (let j = 0; j < board[i].length; j++) {
				let cell = document.createElement('div');
				cell.classList.add('cell');
				cell.id = `${j + 1}-${i + 1}`;
				const cellState = board[j][i];
				if (cellState.isQueen) {
					cell.classList.add('queen');
				} else {
					cell.classList.remove('queen');
				}

				if (cellState.blockages) {
					cell.classList.add('blocked');
				} else {
					cell.classList.remove('blocked');
				}
				// cell.setAttribute('blockages', 0);
				cell.innerHTML = `${cellState.blockages}`;
				row.appendChild(cell);
			}
			boardElement.appendChild(row);
		}
	},
};

const Logic = {
	// Logic methods
	generateBoard(length) {
		let board = [];
		for (let i = 1; i <= length; i++) {
			board[i - 1] = [];
			for (let j = 1; j <= length; j++) {
				board[i - 1][j - 1] = {
					isQueen: false,
					blockages: 0,
				};
			}
		}
		// State.board = board;
		return board;
	},

	blockCells(board, origin) {
		const [row, column] = origin;
		board[row - 1][column - 1].isQueen = true;
		// Block the row
		for (i = 0; i < board.length; i++) {
			board[row - 1][i].blockages++;
		}
		// Block the column
		for (i = 0; i < board.length; i++) {
			board[i][column - 1].blockages++;
		}
		// Block the diagonal 1
		if (row > column) {
			let startRow = row - column;
			let startColumn = 0;
			while (startRow < board.length && startColumn < board.length) {
				board[startRow][startColumn].blockages++;
				startRow++;
				startColumn++;
			}
		} else {
			let startRow = 0;
			let startColumn = column - row;
			while (startRow < board.length && startColumn < board.length) {
				board[startRow][startColumn].blockages++;
				startRow++;
				startColumn++;
			}
		}

		// Block the diagonal 2
		if (row + column > board.length) {
			let startRow = board.length - 1;
			let startColumn = row + column - board.length - 1;
			while (startRow >= 0 && startColumn < board.length) {
				board[startRow][startColumn].blockages++;
				startRow--;
				startColumn++;
			}
		} else {
			let startRow = row + column - 2;
			let startColumn = 0;
			while (startRow >= 0 && startColumn < board.length) {
				console.log(startRow, startColumn);
				board[startRow][startColumn].blockages++;
				startRow--;
				startColumn++;
			}
		}
	},

	unblockCells(board, origin) {
		const [row, column] = origin;
		board[row - 1][column - 1].isQueen = false;
		// Unblock the row
		for (i = 0; i < board.length; i++) {
			board[row - 1][i].blockages--;
		}
		// Unblock the column
		for (i = 0; i < board.length; i++) {
			board[i][column - 1].blockages--;
		}
		// Unblock the diagonal 1
		if (row > column) {
			let startRow = row - column;
			let startColumn = 0;
			while (startRow < board.length && startColumn < board.length) {
				board[startRow][startColumn].blockages--;
				startRow++;
				startColumn++;
			}
		} else {
			let startRow = 0;
			let startColumn = column - row;
			while (startRow < board.length && startColumn < board.length) {
				board[startRow][startColumn].blockages--;
				startRow++;
				startColumn++;
			}
		}

		// Unblock the diagonal 2
		if (row + column > board.length) {
			let startRow = board.length - 1;
			let startColumn = row + column - board.length - 1;
			while (startRow >= 0 && startColumn < board.length) {
				board[startRow][startColumn].blockages--;
				startRow--;
				startColumn++;
			}
		} else {
			let startRow = row + column - 2;
			let startColumn = 0;
			while (startRow >= 0 && startColumn < board.length) {
				board[startRow][startColumn].blockages--;
				startRow--;
				startColumn++;
			}
		}
	},

	handleCellClick(event) {
		if (!event.target.classList.contains('cell'))
			return console.log('cell not clicked');
		const cell = event.target;
		const [row, column] = cell.id.split('-').map(Number);
		if (cell.classList.contains('queen')) {
			// Unblock cells
			console.log(`Unblocking... ${row},${column}`);
			Logic.unblockCells(State.board, [row, column]);
		} else {
			if (event.target.classList.contains('blocked'))
				return console.log('cell is blocked');

			// Block cells
			console.log(`Blocking... ${row},${column}`);
			Logic.blockCells(State.board, [row, column]);
		}

		// Render the Board
		UI.renderBoard(State.board);
	},

	init() {
		State.board = Logic.generateBoard(8);
		console.log(board);
		UI.renderBoard(State.board);
	},
};

// Running code
Logic.init();

// Events
DOM.boardElement.addEventListener('click', Logic.handleCellClick);
