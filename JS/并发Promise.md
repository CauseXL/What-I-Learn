``` js
function asyncPool(poolLimit, array, iteratorFn) {
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
```

- Promise.all
- Promise.race

``` js
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

Promise.race = function (iterators) {
  return new Promise((resolve, reject) => {
    for (const iter of iterators) {
      Promise.resolve(iter)
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
};

Promise.prototype.catch = function(fn){
  return this.then(null,fn);
}
```

### Promise中的then第二个参数和catch有什么区别

- reject后的东西，一定会进入then中的第二个回调，如果then中没有写第二个回调，则进入catch
- 网络异常（比如断网），会直接进入catch而不会进入then的第二个回调
- 多个 Promise 对象，它们之中任何一个抛出的错误，都会被最后一个catch捕获。

### try-catch 不能捕获哪些错误
- 跨域的错误
- 异步错误

``` js
try {
  Promise.resolve().then(() => {
    throw new Error('error in Promise.then');
  });
} catch (err) {
  console.error('catch error', err);
}
// 报错 Uncaught Error
```

- how? -> 答案就是把 try-catch 放到异步代码的里面

``` js
// 将try-catch放到then内部
Promise.resolve().then(() => {
  try {
    throw new Error('error in Promise.then');
  } catch (err) {
    console.error('catch error', err);
  }
});

const request = async () => {
  try {
    const { code, data } = await somethingThatReturnsAPromise();
  } catch (err) {
    console.error('request error', err);
  }
};
```

### 并发上传
- https://mp.weixin.qq.com/s/-iSpCMaLruerHv7717P0Wg

``` js
// 主要流程
async function uploadFile(file) {
  if (!file.length) return;
  const fileMd5 = await calcFileMD5(file); // 计算文件的MD5
  const fileStatus = await checkFileExist(
    '/exists',
    file.name, fileMd5
  );
  if (fileStatus.data?.isExists) {
    alert('文件已上传[秒传]');
    return;
  } else {
    await upload({
      url: '/xx',
      file,
      fileMd5,
      fileSize: file.size,
      chunkSize: 1 * 1024 * 1024,  // 分块大小
      chunkIds: fileStatus.data.chunkIds, // 已上传的分块列表
      poolLimit: 3, // 限制的并发数
    })
  }
  await concatFiles('/concatFiles', file.name, fileMd5); // 上传成功后调取文件合并接口
}
```
