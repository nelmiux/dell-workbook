'use strict';

document.addEventListener('DOMContentLoaded', () => {
  let ops = {
    '=': () => eval(document.querySelector('#results').value),
    '+/-': () => -1 * parseInt(eval(document.querySelector('#results').value), 10),
    Delete: () => document.querySelector('#results').value.slice(0, -1),
    Clear: () => ''
  };
  document.querySelectorAll('.button').forEach(numb => {
    numb.addEventListener('click', ev => {
      const text = ev.target.innerHTML;
      document.querySelector('#results').value += text;
    });
  });

  document.querySelectorAll('.operator').forEach(oper => {
    oper.addEventListener('click', ev => {
      const op = ev.target.innerHTML;
      document.querySelector('#results').value = ops[op]();
      console.log(op);
    });
  });
});
