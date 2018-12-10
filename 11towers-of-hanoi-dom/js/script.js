'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let block = '';

  let offset = [0, 0];
  let isMove = false;

  document.querySelectorAll('[data-stack]').forEach(stack => {
    stack.addEventListener('click', ev => {
      if (block) {
        if (isLegal(stack)) {
          putBlock(stack);
          if (checkWin(stack)) endGame();
        } else {
          alert('No a Legal Move, Please try again');
        }
        resetBlock();
        return;
      }
      getBlock(stack, ev);
    });
  });

  document.addEventListener('mousemove', event => {
    event.preventDefault();
    if (isMove) {
      block.style.left = event.clientX + offset[0] + 'px';
      block.style.top = event.clientY + offset[1] + 'px';
    }
  });

  function resetBlock() {
    isMove = false;
    block.style.position = 'unset';
    block = '';
  }

  function getBlock(stack, ev) {
    block = stack.querySelector('[data-block]:last-child');
    block.style.position = 'absolute';
    offset = [-25, (-1 * block.clientHeight) / 2];
    block.style.left = ev.clientX + offset[0] + 'px';
    block.style.top = ev.clientY + offset[1] + 'px';
    isMove = true;
  }

  function putBlock(stack) {
    stack.appendChild(block);
  }

  function newGame(stack) {
    stack.querySelectorAll('[data-block]').forEach(b => {
      document.querySelector('[data-stack="1"]').appendChild(b);
    });
  }

  function isLegal(stack) {
    const lastBlock = stack.querySelector('[data-block]:last-child');
    return !lastBlock || parseInt(block.dataset.block) <= parseInt(lastBlock.dataset.block);
  }

  function checkWin(stack) {
    if (stack.dataset.stack !== '1' && stack.querySelectorAll('[data-block]').length > 3)
      endGame(stack);
  }

  function endGame(stack) {
    let announceWinner = document.createElement('div');
    announceWinner.classList.add('announce-winner');
    announceWinner.innerHTML = `<h5>You Win!</h5>`;
    document.body.appendChild(announceWinner);
    announceWinner.addEventListener('click', () => {
      document.body.removeChild(announceWinner);
      newGame(stack);
    });
  }
});
