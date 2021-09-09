const console = require("console");

/**** 订阅者 */
function Watcher(data, exp, cb) {
  this.data = data;
  this.exp = exp; // 如 v-model="name"，exp 就是name
  this.cb = cb; // Watcher 绑定的更新函数
  this.value = this.get();
  this.deps = []             // 存放上次求值时存储自己的dep
  this.depIds = new Set()    // 存放上次求值时存储自己的dep的id
  this.newDeps = []          // 存放本次求值时存储自己的dep
  this.newDepIds = new Set() // 存放本次求值时存储自己的dep的id
}

Watcher.prototype = {
  update() {
    this.run();
  },
  run() {
    var value = this.data[this.exp];
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.data, value, oldVal);
    }
  },
  get() {
    Dep.target = this;
    var value = this.data[this.exp];
    Dep.target = null;
    return value;
  }
}

/**** 订阅器 */
function Dep() {
  this.listeners = [];
}

Dep.prototype = {
  addListener: function(listener) {
    console.log('add listeners in dep')
    this.listeners.push(listener)
  },
  notify: function() {
    console.log('notify listeners')
    this.listeners.forEach(listener => listener.update())
  }
}

Dep.target = null;

function observable(obj) {
  if (!obj || typeof obj !== 'object') {
      return;
  }
  let keys = Object.keys(obj);
  keys.forEach((key) => {
      defineReactive(obj, key, obj[key])
  })
  return obj;
}

function defineReactive(obj, key, val) {
  var dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
		configurable: true,
    get() {
      if (Dep.target) {
        dep.addListener(Dep.target);
        console.log('add listeners in get')
      }
      console.log(`${key}属性被读取了...`);
      return val;
    },
    set(newVal) {
      if (newVal === val) {
				return;
			}
      console.log(`${key}属性被修改了...`);
      val = newVal;
      dep.notify();
    }
  })
}

let person = observable({
  name: 'tom',
  age: 15
});

let a = {
  name: "a"
}

console.log(person.name)

new Watcher(person, "name", function(value) {
  a.name = value;
  console.log(value);
  console.log(person.name, 'watch')
  console.log(a)
})

person.name




