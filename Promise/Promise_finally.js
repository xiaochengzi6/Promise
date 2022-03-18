/**
 * promise.finally()
 * 功能：不管状态如何都会执行
 * 参数要求：接收一个回调函数。
 */

const Promise = require('./Promise')
module.exports = Promise;

Promise.prototype.finally = function(callback){
  
  let p = this.constructor;

  return this.then(
    (value)=>{p.resolve(callback()).then(()=>value)},
    (err)=>{p.resolve(callback()).then(()=>err)}
    // 这里比较有意的是 我的then 取的是第一个参数 而不是then(null,()=>err) 
    // 因为promise.then会将接收错误当成一个成功的处理。所以then会使用第一个参数
  )
}