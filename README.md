# 手写 Promise 基本功能

下载：`git clone https://github.com/xiaochengzi6/Promise.git` 

国内加速 url：`https://gh.con.sh/https://github.com/xiaochengzi6/Promise.git`

## 功能

### `promise`
遵守 promsie A+ 规范实现的具有异步特性功能 异步特性使用 `queueMicrotask`

关于 `queueMicrotash` 介绍: 将微任务加入队列以在控制返回浏览器的事件循环之前的安全时间执行 具体查看 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/queueMicrotask)

`promise.resolve`: 返回一个状态 `FulFilled` 状态的 `promise`（已决 promise）

`promise.reject`: 返回一个状态 `rejected` 状态的 `promise` （已决 promise）

`promise.all`: 用于处理多 promise （由于是并发执行所以每个 promise 不存在联系）的方法

**参数要求**
1. `promise.all(iterators)` 参数 `iterators` 是一个可迭代对象，数组、Set等，通常是一个数组类型
2. 没有参数会抛错
3. 参数为空返回 `promsie.resolve()`

**特点**
1. 可迭代对象内所有的 `promise` 全部执行成功也就是状态都为 `resolve` 的结果，`promise.all` 返回 `状态: Fulfilled` 的 promise
2. 存在失败，就会返回首个状态为 `rejected` 的 promise

### `promise.race(iterators)`
用于判断最先执行完的 `promise`

**参数要求**
和 promise.all 类似

**特点**
返回最先解决或者是最先拒绝的那个

### `promise.finally(callback)`
不管状态不处于 `pending` ,就会会执行



### `promise.catch(callback)` 
处理 `rejected` 状态的 promise 