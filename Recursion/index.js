// Build a function mergeSort that takes in an array and returns a sorted array,
// using a recursive merge sort methodology.

function mergeArrays(left_array, right_array) {
  let resultArray = [];
  let leftArrayPointer = 0;
  let rightArrayPointer = 0;
  while (
    leftArrayPointer < left_array.length &&
    rightArrayPointer < right_array.length
  ) {
    if (left_array[leftArrayPointer] < right_array[rightArrayPointer]) {
      resultArray.push(left_array[leftArrayPointer]);

      leftArrayPointer++;
    } else if (right_array[rightArrayPointer] <= left_array[leftArrayPointer]) {
      resultArray.push(right_array[rightArrayPointer]);
      rightArrayPointer++;
    }
  }

  if (leftArrayPointer < left_array.length) {
    resultArray.push(...left_array.slice(leftArrayPointer));
  } else if (rightArrayPointer < right_array.length) {
    resultArray.push(...right_array.slice(rightArrayPointer));
  }

  return resultArray;
}

function splitArray(array) {
  const mid = Math.ceil(array.length / 2);
  const leftArray = array.slice(0, mid);
  const rightArray = array.slice(mid);
  return [leftArray, rightArray];
}

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  } else if (array.length === 2) {
    if (array[0] < array[1]) return array;
    else return array.reverse();
  } else {
    const [leftArray, rightArray] = splitArray(array);

    return mergeArrays(mergeSort(leftArray), mergeSort(rightArray));
  }
}

const testArray1 = [
  8, 19, 6, 2, 13, 10, 1, 18, 5, 15, 16, 11, 9, 12, 7, 14, 4, 20, 3, 17,
];

console.log("This is the rest array, not sorted: " + testArray1);

console.log("Sorted: " + mergeSort(testArray1));
