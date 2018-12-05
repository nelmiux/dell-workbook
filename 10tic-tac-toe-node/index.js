'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];

let player = '';

const players = {
  false: 'O',
  true: 'X'
};

let count = 0;

let finish = false;

function init() {
  console.clear();
  board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
  player = !((Math.random() + 0.5) | 0);
}

function printBoard() {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

function horizontalWin() {
  return board.some(row => row.every(column => column === players[player]));
}

function verticalWin() {
  return Object.keys(board[0])
    .map(column => board.map(row => row[column]))
    .some(newRow => newRow.every(newColumn => newColumn === players[player]));
}

function diagonalWin() {
  return board.every(
    (_, rowIndex) =>
      board[rowIndex][rowIndex] === players[player] ||
      board[rowIndex][2 - rowIndex] === players[player]
  );
}

function checkForWin() {
  return horizontalWin() || verticalWin() || diagonalWin();
}

function ticTacToe(row, column) {
  try {
    if (board[row][column] !== ' ') {
      console.log('This cell is already taken, please try again');
      return;
    }
    board[row][column] = players[player];
  } catch (e) {
    console.log('Invalid entry, please try again');
    return;
  }

  ++count;
  const message = checkForWin() ? 'Player ' + players[player] + ' Win!' : count > 8 ? 'Draw!' : '';
  finish = message;
  if (finish) {
    printBoard();
    console.log(message);
    newGamePrompt();
    return;
  }

  player = !player;
}

function getPrompt() {
  if (count === 0) {
    init();
  }
  printBoard();
  console.log("It's Player " + players[player] + "'s turn.");
  rl.question('row: ', row => {
    rl.question('column: ', column => {
      ticTacToe(row, column);
      finish || getPrompt();
    });
  });
}

function newGamePrompt() {
  rl.question('Do you want to play again (Y/N)? ', isNewGame => {
    const ng = isNewGame.toLowerCase();
    return ng === 'y' ? ((count = 0), getPrompt()) : ng === 'n' ? process.exit(0) : newGamePrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [[' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' ']]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' ']]);
    });
    it('should check for vertical wins', () => {
      board = [[' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' ']];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' ']];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X']];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      assert.equal(checkForWin(), true);
    });
  });
} else {
  getPrompt();
}
