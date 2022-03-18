/**
 * promise.catch()
 * 功能：用于给期约添加拒绝处理程序
 * 参数要求：只接受一个参数。
 * 作用：promise.catch(callback) === promise.then(null, callback)
 * 使用： 
 * let p1 = new Promise((resolve,reject)=>{
 *   reject()
 * })
 * let p = p1.catch(callback)
 */
let Promise = require('./Promise');
module.exports = Promise;

Promise.prototype.catch =  function (...arr){
    let callback = arr[0];
    console.log(callback)
    if(typeof callback !== 'function'){
      throw Error('catch 不是函数')
    }
    console.log(this.then)
    let value = this.then(null, callback)
    return value;
  }