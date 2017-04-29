// myEach
Array.prototype.myEach = function(cb) {
  for(let i = 0; i < this.length; i++){
    cb(this[i]);
  }
  return this;
};

const multByTwo = function(x) {
  return (x * 2);
};

// console.log([1,2,3,4].myEach(multByTwo));

// myMap
Array.prototype.myMap = function(cb) {
  let myNewArr = [];
  this.myEach(function (x) {
    myNewArr.push(cb(x));
  });
  return myNewArr;
};

// console.log([1,2,3,4].myMap(multByTwo));

const iterFib = function(n) {
  let fib = [0, 1];
  if (n <= 2){
    return fib.slice(0, n);
  }
  while (fib.length < n){
    fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
  }
  return fib;
};

// console.log(iterFib(5));

const recFib = function(n) {
  if (n <= 2){
    return [0, 1].slice(0, n);
  } else {
    const prevFib = recFib(n - 1);
    prevFib.push(prevFib[prevFib.length - 1] + prevFib[prevFib.length - 2]);
    return prevFib;
  }

  // console.log(prevFib);

};

// console.log(recFib(6));

Array.prototype.mySelect = function(cb) {
  var selected = [];
  this.myEach(function(x){
    if (cb(x)){
      selected.push(x);
    }
  });
  return selected;
};

function isEven(x) {
  if (x % 2 === 0){
    return true;
  } else {
    return false;
  }
}

// console.log([1,2,3,4,5,6].mySelect(isEven));

Array.prototype.myReject = function(cb){
  let myReject = [];
  this.myEach(function(x) {
    if(cb(x) === false){
      myReject.push(x);
    }
  });

  return myReject;
};

// console.log([1,2,3,4,5,6].myReject(isEven));

Array.prototype.myUniq = function() {
  let uniq = [];
  this.myEach(function(x) {
    if(!uniq.includes(x)){
      uniq.push(x);
    }
  });
  return uniq;
};

// console.log([1,1,1,2,3,3,3,4,5,6,6].myUniq());

Array.prototype.twoSum = function() {
  let indexPairs = [];
  for(let i = 0; i < this.length - 1; i++){
    for(let j = i + 1; j < this.length; j++){
      if (this[i] + this[j] === 0){
        indexPairs.push([i, j]);
      }
    }
  }
  return indexPairs;
};

// console.log([1,2,3,4,0,-4,-3].twoSum());

// 0. pass in accumulator - Can get to the point where if accumulator is not passed - can use first element
//   0a. will also take a callback function
// 1. Iterate through Array
// 2. pass each element into the callback
// 3. add the result of the callback call to the sum
// 4. return sum

Array.prototype.myInject = function(cb) {
  let accum = this[0];
  this.slice(1).myEach(function(x){
    accum += cb(x);
  });
  return accum;
};

// console.log([1,2,3].myInject(multByTwo));


// Transpose - we have a sq matrix
//  We will turn the columns into rows
// 0. Create a nested loop
// 1. 'i' and 'j' will be used to access one element in each nested
//  array and reassign them to the row of the new array
//   1a. because the array is sq, we don't need to worry about

const myTranspose = function(arr) {
  let transposed = [];

  for(var i = 0; i < arr[0].length; i++){
    let arrRow = [];
    for(var j = 0; j < arr.length; j++){
      arrRow.push(arr[j][i]);
    }
    transposed.push(arrRow);
  }
  return transposed;
};

// console.log(myTranspose([ [1, 5], [2, 6], [3, 7], [4, 8] ]));

// Bubblesort
//  We will move through the array two elements at a time
// Comparing each element to determine if they should be switched
// if the item on the left is greater than that on the right
// we swap.
//   a. if a switch is made, it means that the array was not sorted
//      we will set sorted to false - if at the end of the iteration
//      sorted is false, we will need to loop through again - passing the updated array

Array.prototype.bubbleSort = function(cb){
  let sorted = true;
  for(let i = 0; i < this.length - 1; i++){
    if (cb(this[i], this[i + 1])){
      let temp = this[i];
      this[i] = this[i + 1];
      this[i + 1] = temp;
      sorted = false;
    }
  }

  if(!sorted){
    this.bubbleSort(cb);
  }
  return this;
};

function xGreater(x, y) {
  if (x > y){
    return true;
  } else {
    return false;
  }
}

// console.log([2,6,4,1,4,8,9].bubbleSort(xGreater));



// Create a new function on the Array prototype
// We will need a base case that returns [this] if this.lenght <= 1
// this is necessary because merge sort will split the array until
// it reaches this base case.
// Once the base case is reached, the left and right halves will be
// input into a merge function that will examine the values passed in
// and sort them -- returning a merged array once either the left or right
// array is empty.
// 0. Set base case to return [] if this.length === 0
//   0a. Set base case to return this if this.length === 1
// 1. Split the array in half by dividing length by 2 - remember JS uses FP nums
// 2. Merge sort each half
//  2a. This will put frames on the call stack until a base case is reached
// 3. Merge the left and right sides
// 4. Return the merged Array

Array.prototype.myMergeSort = function() {
  if (this.length === 0){
    return [];
  } else if (this.length === 1){
    return this;
  }

  let mid = Math.floor(this.length / 2);
  let leftHalf = this.slice(0, mid);
  let rightHalf = this.slice(mid);

  let sortedLeft = leftHalf.myMergeSort();
  let sortedRight = rightHalf.myMergeSort();

  return merge(sortedLeft, sortedRight);
};

function merge(left, right) {
  let merged = [];
  while (left.length >= 1 && right.length >= 1){
    if (left[0] < right[0]){
      merged.push(left.shift());
    } else {
      merged.push(right.shift());
    }
  }
  return merged.concat(left).concat(right);
}

// console.log([3,6,5,7].myMergeSort());

// Binary Search
// Takes in a target value to search for in the array
// Split the array into two pieces - removing the middle element
// and comparing it to the target.
// If the target element is less than the middle -- Perform binary search
// on the left side -- If it is greater, perform BS on the right
// Return the index of the element if the middle el matches the target
// If a binary search is performed on the right side, add mid + 1 to the index of the el
// This is to account for the fact that the length of the original array has been reduced to
// properly search
// 0. Implement base case - return mid if this[mid] === target
// 1. Find middle index (remember FP)
// 2. split this one before and one after index -- yielding the middle el
//   make comparison between the middle index and the target
// 3. depending on result of comparison - BS right or left half
// 4. If b searching left half return mid if obj is found
//    - if right half, return mid + i + 1
//          [1,2,3,4,| 5 |,6,7,8,9]  => 8 target
//              i === (4  +    2  + 1) === 7
//    - return null if the item was not found

Array.prototype.binarySearch = function(target) {
  let midI = Math.floor(this.length / 2);
  // console.log(midI);
  // console.log(this);
  let midNum = this[midI];
  // console.log(midNum);
  if(target === midNum){
    // console.log('I made it');
    return midI;
  } else if(this.length <= 1 && midNum !== target) {
    return null;
  }

  let leftHalf = this.slice(0, midI);
  let rightHalf = this.slice(midI + 1);

  if(target < midNum) {
    return leftHalf.binarySearch(target);
  } else {
    if (rightHalf.binarySearch(target) !== null){
      return midI + rightHalf.binarySearch(target) + 1;
    } else {
      // console.log(this);
      return null;
    }
  }
};

console.log([1,2,3,4,5].binarySearch(12));


// Implement subsets
// For the array [1, 2, 3] there are two types of subets
// - those that contain 3, and those that do not.
// Take subsets of numbers without the last number.
// Map over the resulting values and add back the number that was removed.
// Add the resulting nested array to the pre-mapped subsets.
// 0. Will define on Array Prototype
// 1. Base case - return [[]] if this[0].length === 0
// 2. Find subsets of this with last element removed
// 3. map over the resulting subsets and add back the last element
// 4. Add back the subsets with the item removed

Array.prototype.subsets = function(){
  if(this.length === 0){
    return [[]];
  }

  let el = this[0];
  let subs = this.slice(1).subsets();

  let otherSubs = subs.map(function(arr){
    let arrCopy = Object.assign([], arr);
    arrCopy.push(el);
    return arrCopy;
  });
  return otherSubs.concat(subs);
};

// console.log([1,2,3].subsets());

// [1,2]
// [1]
//[[]]
//[[1]] + [[]]
//[[1],[]]
//[[1,2], [2]] + [[], [1]]


// Make change
// - will take two arguments.. The first being the amount of change to receive
//   the second argument is an array of the possible coins
// First I will try to solve this problem iteratively by creating a new array to
// hold the coins used to fulfill the requirement
// I will continue to take a coin of a particular value until that coin
// is larger than the amount of change remaining - at which point I will
// move on to the next coin until the value is once again less than or equal to
// the remaining amount
//   req - there are an unlimited amount of coins available from the array at each value
//       = there will always be 1 cent coins.
// 0. store the amount of change required in a variable
//   0a. create a variable pointing to an empty array called changeInCoins
//       this will hold the coins will be returned to the client.
// 1. use a for loop to select the first coin in the coins array
// 2. check to see if the coin is less than the amount of change remaining
// 3. if it is smaller - begin a loop that adds the coin to a new array once and
//    decrements the value of the coin from the remaining change
// 4. When the coin is larger than the remaining change, increment i
// 5. continue this process until the amount of remaining change === 0
// 6. return the changeInCoins array

function makeChange(change, coinsAvail) {
  let changeRemaining = change;
  let changeInCoins = [];

  for(let i = 0; i < coinsAvail.length; i++){
    if(coinsAvail[i] <= changeRemaining){
      while(coinsAvail[i] <= changeRemaining){
        changeInCoins.push(coinsAvail[i]);
        changeRemaining -= coinsAvail[i];
      }
    }
  }

  return changeInCoins;
}

// console.log(makeChange(15, [10, 5, 1]));


// Recursive makeChange
// To implement recursive makeChange, I will not have to use for or
// while loops - all I will have to do is create a condition that checks
// to see if the first coin in the coins array is less than the change remaining
// if it is less than, I will decrement change by that amount and call makeChange
// with the updates amount and the coins list. If the first coin is not longer
// smaller than the amount remaining, I will slice the first coin from the conis list
// and call the function with that update list aswell.
// 0. recMakeChange takes in required change, the coins returned thus far, and the coins list
// 1. if statement will check to see if change is > than coins[0]
//    if true - decrement change by coins[0] and call recMakeChange with change and coins
// 2. if change is < coins[0], call recMakeChange with change and coins.slice(1)
// 3. base case will be return coinsReturned if change required === 0

function recMakeChange(change, coinsThusFar, coins) {
  if (change === 0){
    return coinsThusFar;
  }

  if (change >= coins[0]){
    // console.log('hello');
    coinsThusFar.push(coins[0]);
    change -= coins[0];
    // console.log(change);
    recMakeChange(change, coinsThusFar, coins);
  } else {
    recMakeChange(change, coinsThusFar, coins.slice(1));
  }
  return coinsThusFar;
}

// console.log(recMakeChange(21, [], [10, 5, 1]));


Array.prototype.countOfCondition = function(cb) {
  let count = 0;
  this.myEach(function(el) {
    if (cb(el)) {
      count += 1;
    }
  });

  return count;
};

console.log([1,2,3,4].countOfCondition(isEven));

Array.prototype.include = function(el) {
  let doesInclude = false;
  this.forEach(function(x){
    if (x === el){
      doesInclude = true;
    }
  });

  return doesInclude;
};

console.log([1,2,3].include(5));
