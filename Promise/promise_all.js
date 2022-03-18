/**
 * promise.all()
 * 功能：其中所有promise都返回 fulfilled 状态那么全部是 fulfilled 否则 Rejected 状态
 * 用法 let a = Promise.all(iterable);
 * 则 all 是一个静态方法
 * 参数要求：
 * 1.传入一个可迭代对象 
 * 2.没有参数会报错 
 * 3.参数为空的可迭代对象就是 promsie.resolve();
 * 4.全部成功就返回所有成功的值
 * 5.有一个失败就返回第一个失败的值。
 */
const Promise  = require('./Promise');
module.exports = Promise;

Promise.all =  function (promises){
    let fulfillarr = [];
    let rejectarr = [];

    if(promises == null && promises.length){
      throw Error('不存在')
    }
    let length = promises.length;
    
    let p =  new Promise((resolve,reject)=>{
      if(length == 0){resolve()};
      
      for(let promise of promises){
        promise.then((x)=>{
          let value = x || "undefined";
          fulfillarr.push(value);
          if(fulfillarr.length == length){
            resolve(fulfillarr)
          }
        }, (err)=>{
          let value = err || undefined;
          value && rejectarr.push(value);
          if(rejectarr.length > 0){
            reject(rejectarr[0])
          }
        })
     }
    })
    return p
   }