const Promise = require('./promise')

module.exports = Promise

// 参考：https://es6.ruanyifeng.com/#docs/promise#Promise-try
// 相关 polyfill https://github.com/tc39/proposal-promise-try/blob/main/polyfill.js

/**
 * 不清楚 回调函数 是异步还是同步的化使用这样的方式
 * @param {*} func 
 * @returns 
 */
Promise.prototype.try = function (func) {
  return new Promsie((resolve, reject) => {
    try {
      resolve(func())
    } catch (e) {
      reject(e)
    }
  })
}

// or 
// func: 异步或者同步函数
const func = () => { }

(async () => func())()
  .then(() => { })
  .catch(() => { })

// or 

(() => {
  new Promise(resolve => resolve(func))
})()