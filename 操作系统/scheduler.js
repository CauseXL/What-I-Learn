// * ---------

const queue = [];
/** 阔值 16ms 一帧 */
const thresHold = 1000 / 60;
const unit = [];
let deadline = 0;

// * ---------

const schedule = (cb) => unit.push(cb) === 1 && postMessage();

/** 对外暴露的入口，进行任务收集 */
export const scheduleWork = (callback, time) => {
  const job = { callback, time };
  queue.push(job);
  /** 通过触发一个宏任务来开始调度执行 */
  schedule(flushWork);
}

/** 清空任务方法，即将任务队列中的任务执行后然后移除 */
const flushWork = () => {
  const currentTime = getTime();
  deadline = currentTime + threshold;
  /** 还有任务一直递归执行 */
  flush(currentTime) && schedule(flushWork);
}

const flush = (initTime) => {
  let currentTime = initTime;
  let job = peek(queue);
  while (job) {
    const timeout = job.time + 3000 <= currentTime;
    /** 超时就终止 --- 中断 && 挂起 以保证任务不至于饿死 */
    if (!timeout && shouldYield()) break;
    const callback = job.callback;
    job.callback = null;

    /**
     * next 还存在则继续执行 next，证明 cpu 拥挤, 组件没有渲染完成
     * 如果 next 没有了证明这个任务渲染完成要出队
     * 然后再去取最小时间的任务继续执行
     */
    const next = callback(timeout);
    if (next) {
      job.callback = next;
    } else {
      queue.shift();
    }
    job = peek(queue);
    currentTime = getTime();
  }

  return !!job;
}


// * ---------

const postMessage = (() => {
  const cb = () => unit.splice(0, unit.length).forEach((c) => c())
  if (typeof MessageChannel !== 'undefined') {
    const { port1, port2 } = new MessageChannel()
    port1.onmessage = cb
    return () => port2.postMessage(null)
  }
  return () => setTimeout(cb)
})()

/** 最短剩余时间优先执行 */
const peek = (queue) => {
  queue.sort((a, b) => a.time - b.time);
  return queue[0];
}

/** 是否过期 */
const shouldYield = () => getTime() >= deadline;

const getTime = () => performance.now();

// * ---------
