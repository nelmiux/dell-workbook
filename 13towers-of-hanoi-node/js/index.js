'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const winPos = [4, 3, 2, 1];

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log('a: ' + stacks.a);
  console.log('b: ' + stacks.b);
  console.log('c: ' + stacks.c);
}

function movePiece(startStack, endStack) {
  const last = stacks[startStack].pop();
  stacks[endStack].push(last);
}

function isLegal(startStack, endStack) {
  const startArr = stacks[startStack];
  const endArr = stacks[endStack];
  return (
    startArr.length > 0 &&
    (endArr.length < 1 || startArr[startArr.length - 1] < endArr[endArr.length - 1])
  );
}

function checkForWin() {
  return Object.keys(stacks)
    .filter(stack => stack !== 'a')
    .some(stack => JSON.stringify(stacks[stack]) === JSON.stringify(winPos));
}

function towersOfHanoi(startStack, endStack) {
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
    return;
  }
  console.log('\nNo a legal move, please try again\n');
}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', startStack => {
    rl.question('end stack: ', endStack => {
      towersOfHanoi(startStack, endStack);
      if (checkForWin()) {
        console.log('\nYou Win!\n');
        return;
      }
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {
  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
} else {
  getPrompt();
}
