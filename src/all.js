const { isIterator, isThenable } = require('../utils/index.js')
const Promise = require('./promise.js')

/**
 * promise.all()
 * 功能：其中所有promise都返回 fulfilled 状态那么全部是 fulfilled 否则 Rejected 状态
 * 用法 let a = Promise.all(iterable);
 * 
 * 参数要求：
 *  1.传入一个可迭代对象 
 *  2.没有参数会报错 
 *  3.参数为空的可迭代对象就是 promsie.resolve();
 *  4.全部成功就返回所有成功的值
 *  5.有一个失败就返回第一个失败的值。
 */
Promise.prototype.all = function (promises) {
  const resolves = []
  const reasons = []

  if (!isIterator(promises)) {
    throw Error('param is no array')
  }

  let length = promises.length;

  return new Promise((resolve, reject) => {
    if (length === 0) return resolve()

    const onResolve = (value) => {
      resolves.push(value)

      if (resolves.length === length && reasons.length === 0) {
        resolve(resolves)
      }
    }

    const onRejected = (reason) => {
      reasons.push(reason)

      if (reasons.length > 0) {
        reject(reasons[0])
      }
    }

    promises.forEach(promise => {
      if (!isThenable(promise)) {
        throw TypeError('params is no promise type')
      }
      promise.then(onResolve, onRejected)
    })

  })
}

module.exports = Promise 
