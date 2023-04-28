const { isIterator } = require('../utils')
const Promise = require('./promise')


module.exports = Promise

// 参考 https://es6.ruanyifeng.com/#docs/promise#Promise-any 
/**
 * 接收一个 iterate 任何一个 为 resolve 那返回 promise 状态为 resolve 
 * 全部的 promise 状态为 rected 时 返回 rejected(AggreagateError(errors)) 
 * @param {*} iterator 
 * @returns 
 */
Promise.prototype.any = function (iterator) {
  const rejecteds = []

  return Promise((resolve, reject) => {
    if (!isIterator(iterator)) {
      const result = new TypeError('iterator is no Iterator type')
      return reject(result)
    }
    const length = iterator.length
    const onFulfilled = value => {
      return resolve(value)
    }

    const onRejected = reason => {
      rejecteds.push(reason)

      if (rejecteds.length === length) {
        // @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AggregateError
        if(AggregateError){
          return reject(new AggregateError(rejecteds))
        }
        return reject(rejecteds)
      }
    }

    for (const promise of iterator) {
      if (promise instanceof Promise) {
        promise.then(onFulfilled, onRejected)
      }
    }
  })
}
