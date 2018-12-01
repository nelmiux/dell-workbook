'use strict';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#results').value = 0;
  let ops = {
    '=': () => eval(document.querySelector('#results').value),
    '+/-': () => -1 * parseInt(eval(document.querySelector('#results').value, 10)),
    Delete: () => document.querySelector('#results').value.slice(0, -1),
    Clear: () => '0'
  };
  document.querySelectorAll('.button').forEach(numb => {
    numb.addEventListener('click', ev => {
      const text = ev.target.innerHTML;
      const previous = document.querySelector('#results').value;
      if (previous === '0') {
        document.querySelector('#results').value = text;
        return;
      }
      const lastCh = previous[previous.length - 1];
      if (parseInt(text) || parseInt(lastCh, 10)) {
        document.querySelector('#results').value += text;
      }
    });
  });

  document.querySelectorAll('.operator').forEach(oper => {
    oper.addEventListener('click', ev => {
      const op = ev.target.innerHTML;
      document.querySelector('#results').value = ops[op]();
    });
  });
});
