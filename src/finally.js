const { isFunction } = require("../utils")

/**
 * promise.finally()
 * 功能：不管状态如何都会执行
 * 参数要求：接收一个回调函数。
 */
Promise.prototype.finally = function (callback) {
  if (isFunction(callback)) {
    throw TypeError('param is no function')
  }

  let p = this.constructor

  const onResolve = value => p.resolve(callback()).then(() => value)

  // 这里比较有意的是 我的then 取的是第一个参数 而不是then(null,()=>err) 
  // 因为promise.then会将接收错误当成一个成功的处理。所以then会使用第一个参数
  const onReject = reason => p.resolve(callback()).then(() => reason)

  return this.then(onResolve, onReject)
}

module.exports = Promise 
