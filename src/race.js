const { isIterator, isThenable } = require('../utils/index.js')
const Promise = require('./promise.js')


/**
 * promise.catch()
 * 功能：返回最先解决或者是最先拒绝的那个
 * 参数要求：可迭代对象
 */
Promise.prototype.race = function (promises) {
  if (!isIterator(promises)) {
    throw TypeError('promises is no Iterator')
  }

  const length = promises.length

  return new Promise((resolve, reject) => {
    if (length == 0) return resolve()

    for (let promise of promises) {
      if (!isThenable(promise)) {
        throw TypeError('params is no Promise type')
      }

      const onResolve = (value) => resolve(value)
      const onReject = (reason) => reject(reason)

      promise.then(onResolve, onReject)
    }
  })
}

module.exports = Promise 
