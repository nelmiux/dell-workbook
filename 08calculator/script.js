'use strict';

let accumulator = null;
let pendingBinaryOperation = null;

let ops = {
  '=': equals,
  '+/-': unaryOperation(x => -x),
  '+': binaryOperation(a, b, '+'),
  '-': binaryOperation(a, b, '-'),
  '*': binaryOperation(a, b, '*'),
  '/': binaryOperation(a, b, '/')
};

const equals = () =>
  (document.querySelector('#results').value = eval(document.querySelector('#results').value));

function unaryOperation(operator) {
  if (accumulator) {
    accumulator = operator(accumulator);
  }
}

function binaryOperation(a, b, op) {
  if (accumulator) {
    pendingBinaryOperation = eval(`${accumulator}${op}${b}`);
    accumulator = null;
    return;
  }
  if (pendingBinaryOperation) {
    eval(`${pendingBinaryOperation}${op}${b}`);
  }
}

function constant(a) {
  accumulator = parseInt(a, 10);
}

function performOperation(op) {
  ops[op];
}

function doOp(num) {
  const b = parseInt(num, 10);
  let a = parseInt(document.querySelector('#results').value, 10);
  a = a ? a : 0;
  document.querySelector('#results').value = ops[op](a, b);
}

function binaryOp(o) {
  operation(o);
  setResult(o);
}

function unaryOp(o, num) {
  operation(o);
  doOp(num);
}

function operation(o) {
  op = o;
}

function setResult(o) {
  document.querySelector('#results').value += o;
}

function deleteLast() {
  let current = document.querySelector('#results').value;
  document.querySelector('#results').value = current.slice(0, -1);
}

function clearResults() {
  document.querySelector('#results').value = '';
}
