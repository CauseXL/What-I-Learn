const getSum = (arr, fn) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += fn(arr[i]);
  }
  return sum;
};

const arr = [1, 2, 3, 4, 5];

const sumCurry = (arr, fn) => getSum(arr, fn);

const calSum = sumCurry(arr, x => x);

const calMultiSum = sumCurry(arr, x => x * x);

console.log(calSum, calMultiSum);


