'use strict';

const assert = require('assert');

Array.prototype.swap = function(x, y) {
  const temp = this[x];
  this[x] = this[y];
  this[y] = temp;
  return this;
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let arr = [];
let sorted = false;

for (let i = 0; i < 10; i++) {
  arr.push(getRandomInt(0, 10));
}

function bubbleSort(arr) {
  do {
    sorted = true;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        arr.swap(i, i + 1);
        sorted = false;
      }
    }
  } while (!sorted);
  return arr;
}

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const midIdx = Math.floor(arr.length / 2);
  const arr1 = mergeSort(arr.slice(0, midIdx));
  const arr2 = mergeSort(arr.slice(midIdx));

  let sortedArr = [];
  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) sortedArr.push(arr1.shift());
    else sortedArr.push(arr2.shift());
  }

  if (arr1.length) sortedArr = sortedArr.concat(arr1);
  else sortedArr = sortedArr.concat(arr2);

  return sortedArr;
}

function binarySearch(arr, item) {
  let minIndex = 0;
  let maxIndex = arr.length - 1;
  let currentIndex;
  let currentElement;

  while (minIndex <= maxIndex) {
    currentIndex = Math.floor((minIndex + maxIndex) / 2);
    currentElement = arr[currentIndex];

    if (currentElement < item) {
      minIndex = currentIndex + 1;
    } else if (currentElement > item) {
      maxIndex = currentIndex - 1;
    } else {
      return currentIndex;
    }
  }

  return false;
}

// Tests

if (typeof describe === 'function') {
  function comparator(a, b) {
    if (Number(a) < Number(b)) return -1;
    if (Number(a) > Number(b)) return 1;
    return 0;
  }

  describe('#bubbleSort()', () => {
    it('should sort array', () => {
      const sorted = bubbleSort(arr);
      assert.deepEqual(sorted, arr.sort(comparator));
    });
  });

  describe('#mergeSort()', () => {
    it('should sort array', () => {
      const sorted = mergeSort(arr);
      assert.deepEqual(sorted, arr.sort(comparator));
    });
  });

  describe('#binarySearch()', () => {
    it('should return the index of given item if sorted array contains it', () => {
      const idx = binarySearch([1, 2, 3, 4], 3);
      assert.equal(idx, 2);
    });
    it('should return false if item not in sorted array', () => {
      const idx = binarySearch([1, 2, 3, 4], 5);
      assert.equal(idx, false);
    });
  });
} else {
  console.log('Run the tests!');
  //bubbleSort(arr);
}
