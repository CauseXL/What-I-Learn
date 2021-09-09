async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = []; // 存储所有的异步任务
  const executing = []; // 存储正在执行的异步任务
  for (const item of array) {
    // 调用iteratorFn函数创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p); // 保存新的异步任务

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e); // 保存正在执行的异步任务
      if (executing.length >= poolLimit) {
        await Promise.race(executing); // 等待较快的任务执行完成
      }
    }
  }
  return Promise.all(ret);
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

Promise.race = function(iterators) {
  return new Promise((resolve, reject) => {
    for (const iter of iterators) {
      Promise.resolve(iter).then(res => {
        resolve(res);
      }).catch(e => {
        reject(e);
      })
    }
  })
}

@decorateClass
class Test {

}

const decorateClass = (targetClass) => {
  targetClass.test = 123;
}

var test = new Test();

console.log(test.test);

















