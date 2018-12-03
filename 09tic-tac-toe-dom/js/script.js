'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let player = true;
  let count = 0;
  const players = {
    false: '🛸',
    true: '🛵'
  };
  const winningMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];

  document.querySelectorAll('[data-cell]').forEach(cell => {
    cell.addEventListener('click', ev => {
      player = !player;
      ev.target.innerHTML = players[player];
      ev.target.classList.add('selected');
      ++count;
      checkWin();
    });
  });

  document.querySelector('#clear').addEventListener('click', () => {
    newGame();
  });

  function newGame() {
    count = 0;
    document.querySelectorAll('[data-cell]').forEach(cell => {
      cell.innerHTML = '';
      cell.classList.remove('selected');
    });
  }

  function checkWin() {
    const isWin = winningMoves.some(move =>
      move.every(
        cell =>
          document.querySelector(`[data-cell="${cell}"]`).innerHTML ===
          players[player]
      )
    );
    if (isWin) {
      endGame(`${players[player]} Wins!`);
      return;
    }
    if (count > 8) {
      endGame(`✌🏻 Draw`);
    }
  }

  function endGame(message) {
    let announceWinner = document.createElement('div');
    announceWinner.classList.add('announce-winner');
    announceWinner.innerHTML = `<h5>${message}</h5>`;
    document.body.appendChild(announceWinner);
    announceWinner.addEventListener('click', () => {
      document.body.removeChild(announceWinner);
      newGame();
    });
  }
});
