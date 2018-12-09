/**
 * Project 1
 */

// for (let i = 1; i < 101; ++i) {
//   const div3 = !(i % 3) ? 'Fizz' : '';
//   const div5 = !(i % 5) ? 'Buzz' : '';

//   const combine = `${div3}${div5}`;

//   console.log(combine || i);
// }

Array.prototype.swap = function(x, y) {
  const temp = this[x];
  this[x] = this[y];
  this[y] = temp;
  return this;
};

let bubbleArray = [4, 3, 2, 1];

// bubbleArray.forEach(_ =>
//   bubbleArray.forEach((_, i) => bubbleArray[i] < bubbleArray[i + 1] || bubbleArray.swap(i, i + 1))
// );

let sorted = true;

do {
  sorted = true;
  for (i = 0; i < bubbleArray.length - 1; i++) {
    if (bubbleArray[i] > bubbleArray[i + 1]) {
      bubbleArray.swap(i, i + 1);
      sorted = false;
    }
  }
} while (!sorted);

console.log(bubbleArray);
