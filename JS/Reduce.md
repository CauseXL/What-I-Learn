- https://juejin.cn/post/6844904063729926152

``` js
var arr = [1,2,3,4,5];
var scores = [
  { score: 45, subject: "chinese" },
  { score: 90, subject: "math" },
  { score: 60, subject: "english" }
];

// push 会改变原数组 返回的是数组的长度
/* 
 * 逗号运算符
 * x = (2, 3);
 * console.log(x);
 * expected output: 3
 */
arr.reduceRight((t, v) => {
  return (t.push(v), t)
}, [])

// concat 不会改变原数组
arr.reduceRight((t, v) => {
  return t.concat(v)
}, [])

arr.reduce((t, v) => {
  return v > 2 ? (t.push(v), t) : t;
}, [])

arr.reduce((t, v) => {
  return v > 2 ? [...t, v * 2] : t;
}, [])

// every
scores.reduce((t, v) => {
  return t && v.score < 70
}, true)

function Chunk(arr = [], size = 1) {
  return arr.reduce((t, v) => {
    return t[t.length - 1].length === size ? [...t, [v]] : (t[t.length - 1].push(v), t)
  }, [[]])
}

var arr2 = [2, 3, 6];

arr.reduce((t, v) => {
  return !arr2.includes(v) ? [...t, v] : t
}, [])

function Flat(arr = []) {
  return arr.reduce((t, v) => t.concat(Array.isArray(v) ? (Flat(v)) : v), [])
}

// MAX
arr.reduce((t, v) => t > v ? t : v)

// 对象每个属性出现次数
arr.reduce((t, v) => (t[v] = (t[v] || 0) + 1, t), {});
```
