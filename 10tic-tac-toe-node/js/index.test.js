let index = require('index.js');
const assert = require('assert');

describe('#ticTacToe()', () => {
  it('should place mark on the board', () => {
    ticTacToe(1, 1);
    chai.expect(index.board.to.equal([[' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' ']]));
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