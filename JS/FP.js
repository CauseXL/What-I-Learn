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

// Based on Ramada
// 练习 1
// ==============
// 通过局部调用（partial apply）移除所有参数

var words = function(str) {
  return split(' ', str);
};

var spaceSplit = split(' ');
var splitWordsBySpace = map(spaceSplit);

var testStr = 'Jingle bells Batman smells';
var test1 = splitWordsBySpace(testStr);

// 练习 2
// ==============
// 通过局部调用（partial apply）移除所有参数

var rule = match(/q/i);
var filterRule = filter(rule);

var test2 = filterRule(['quick', 'camels', 'quarry', 'over', 'quails']);
console.log(test2, 111)

var filterQs = filter(match(/q/gi));
var test22 = filterQs(['quick', 'camels', 'quarry', 'over', 'quails']);
console.log(test22, 222)

var _keepHighest = function(x,y){ return x >= y ? x : y; };

var max2 = reduce(_keepHighest, -Infinity);

console.log(max2([1,2,3,4,5]), 333)

var CARS = [
  {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
  {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
  {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
  {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
  {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
];

var underscore = replace(/\W+/g, '_');
var test4 = map(compose(underscore, toLower, props('name')))

console.log(test4(CARS), 444);


