const { isFunction } = require("../utils")
const Promise  = require('./promise')
/**
 * promise.catch()
 * 功能：用于给期约添加拒绝处理程序
 * 参数要求：只接受一个参数。
 */
Promise.prototype.catch = function (callback) {
  if (isFunction(callback)) {
    throw TypeError('param is no function')
  }

  return this.then(null, callback)
}

module.exports = Promise 
