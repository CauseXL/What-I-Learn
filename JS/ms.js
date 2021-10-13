// 数据内容
let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]

// 输出结果
[
  {
      "id": 1,
      "name": "部门1",
      "pid": 0,
      "children": [
          {
              "id": 2,
              "name": "部门2",
              "pid": 1,
              "children": []
          },
          {
              "id": 3,
              "name": "部门3",
              "pid": 1,
              "children": [
                  // 结果 ,,,
              ]
          }
      ]
  }
]

const arr1 = [1, 3, 5, 9];
const arr2 = [2, 8, 40, 60];

try {
Promise.resolve().then(() => {
  throw new Error('error in Promise.then');
});
} catch (err) {
console.error('catch error', err);
}

// JSON.stringify(func)

// ### Promise中的then第二个参数和catch有什么区别

// - reject后的东西，一定会进入then中的第二个回调，如果then中没有写第二个回调，则进入catch
// - 网络异常（比如断网），会直接进入catch而不会进入then的第二个回调
// - 多个 Promise 对象，它们之中任何一个抛出的错误，都会被最后一个catch捕获。

// ### try-catch 不能捕获哪些错误
// - 跨域的错误
// - 异步错误


/**
* 递归查找，获取children
*/
const getChildren = (data, result, pid) => {
for (const item of data) {
  if (item.pid === pid) {
    const newItem = {...item, children: []};
    result.push(newItem);
    getChildren(data, newItem.children, item.id);
  }
}
}

/**
* 转换方法
*/
const arrayToTree = (data, pid) => {
const result = [];
getChildren(data, result, pid)
return result;
}

function arrayToTree(items) {
const result = [];   // 存放结果集
const itemMap = {};  // 

// 先转成map存储
for (const item of items) {
  itemMap[item.id] = {...item, children: []}
}

for (const item of items) {
  const id = item.id;
  const pid = item.pid;
  const treeItem =  itemMap[id];
  if (pid === 0) {
    result.push(treeItem);
  } else {
    if (!itemMap[pid]) {
      itemMap[pid] = {
        children: [],
      }
    }
    itemMap[pid].children.push(treeItem)
  }

}
return result;
}


Promise.all = function(iterators) {
return new Promise((resolve, reject) => {
  if (!iterators || iterators.length === 0) {
    resolve([]);
  } else {
    let count = 0;
    let result = [];
    for (let i = 0; i < iterators.length; i++) {
      Promise.resolve(iterators[i]).then((data) => {
        result[i] = data;
        if (++count === iterators.length) {
          resolve(result);
        }
      }, err => {
        reject(err);
        return;
      })
    }
  }
})
}

// 实现一个iterator迭代器

const ss = createIterator([1,2,3]);
ss.next(); // {value: 1, done: false}
ss.next(); // {value: 2, done: false}
...

function createIterator(items) {
  let i = 0;

  return {
      next: () => {
          const done = i >= items.length;
          const value = done ? 'undefined' : items[i++];

          return {
              done,
              value,
          }
      }
  };
}

function curry(fn) {
  if (fn.length <= 1) return fn;
  const generator = (...args) => {
      if (fn.length === args.length) {
          return fn(...args);
      } else {
          return (...args2) => {
              return generator(...args, ...args2);
          }
      }
  }
  return generator;
}

const sleep = (time) => {
return new Promise(resolve => setTimeout(resolve, time))
};


// 实现以下方法

let add = (a, b, c, d) => a + b + c + d;
const curryAdd = curry(add);
curryAdd(5)(6)(7)(8);

// 实现以下方法： 过一秒后，输出22

sleep(1000).then(() => {
console.log(22)
}).then

// ### 队列和盏互相实现

// - 两个盏实现队列

const stack1 = [];
const stack2 = [];

function push(node)
{
  stack1.push(node);
}
function shift() {
  while (stack1.length) {
      stack2.push(stack1.pop());
  }
  return stack2.pop();
}

const event2 = {
listeners: [],
on: () => {},
notify: () => {},
remove: () => {}
}

let event = {
list: {},
on(key, fn) {
    if (!this.list[key]) {
        this.list[key] = [];
    }
    this.list[key].push(fn);
},
emit() {
    let key = [].shift.call(arguments),
        fns = this.list[key];

    if (!fns || fns.length === 0) {
        return false;
    }
    fns.forEach(fn => {
        fn.apply(this, arguments);
    });
},
remove(key, fn) {
    // 这回我们加入了取消订阅的方法
    let fns = this.list[key];
    // 如果缓存列表中没有函数，返回false
    if (!fns) return false;
    // 如果没有传对应函数的话
    // 就会将key值对应缓存列表中的函数都清空掉
    if (!fn) {
        fns && (fns.length = 0);
    } else {
        // 遍历缓存列表，看看传入的fn与哪个函数相同
        // 如果相同就直接从缓存列表中删掉即可
        fns.forEach((cb, i) => {
            if (cb === fn) {
                fns.splice(i, 1);
            }
        });
    }
}
};


function cat() {
console.log('一起喵喵喵');
}
function dog() {
console.log('一起旺旺旺');
}

event.on('pet', data => {
console.log('接收数据');
console.log(data);
});
event.on('pet', cat);
event.on('pet', dog);
// 取消dog方法的订阅
event.remove('pet', dog);
// 发布
event.emit('pet', ['二哈', '波斯猫']);
/*
接收数据
[ '二哈', '波斯猫' ]
一起喵喵喵
*/

const curry = (fn, ...args) => {
const len = args.length; // fn.length?
const args = args || [];
return () => {
  let newArgs = args.concat(Array.prototype.slice.call(arguments));
  if (newArgs.length < length) {
    return curry.call(this, fn, newArgs);
  } else {
    return fn.apply(this, newArgs)
  }
}
}

const getSum = (arr, fn) => {
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += fn(arr[i]);
}
return sum;
};

// 实现两个方法 1. 求数组和 2.求数组平方和
const arr = [1, 2, 3, 4, 5];

const sumCurry = (arr, fn) => getSum(arr, fn);

const calSum = sumCurry(arr, x => x);

const calSqrSum = sumCurry(arr, x => x * x);

console.log(calSum, calSqrSum);

const getLis = (arr) => {
let len = arr.length;
if (len == 0) return 0;
let dp = new Array(len).fill(1);
let max = 0;
for (let i = 0; i < len; i++) {
  for (let j = 0; j < i; j++) {
    if (nums[j] < nums[i]) {
      dp[i] =  Math.max(dp[j] + 1,dp[i]);
    }
  }
  max = Math.max(max,dp[i]);
}
return max;
}





