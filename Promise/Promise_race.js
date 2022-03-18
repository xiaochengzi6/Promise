/**
 * promise.catch()
 * 功能：返回最先解决或者是最先拒绝的那个
 * 参数要求：可迭代对象
 * 使用： Promise.race();
 * 类似于 all 
 */
const Promise = require('./Promise');
module.exports = Promise;

Promise.race =  function (promises){
    if(!promises || typeof promises !== 'object' ||  !promises.length   ){
      throw TypeError('不是可迭代对象')
    }
    let length = promises.length;

    let p = new Promise((resolve, reject)=>{
      if(length == 0){
        resolve();
      }
      for(let promise of promises){
        if(typeof promise.then !== "function"){
          reject(typeof Error("then 不是函数"))
          return void 0;
        }
        promise.then(
          (value)=>{
            resolve(value)
          },
          (err)=>{
            reject(err);
          }
          )
      }
    })
    return p
  }

// 测试

// const p1 = new Promise((resolve, reject)=>{
//   setTimeout(resolve, 400, '1')
// })
// const p2 = new Promise((resolve, reject)=>{
//   setTimeout(resolve, 200, '2')
// })
// const p3 = new Promise((resolve, reject)=>{
//   setTimeout(reject, 100, '3')
// })
// const p4 = new Promise((resolve, reject)=>{
//   setTimeout(reject, 200, '4')
// })

// const p = Promise_race.race([p1,p2,p3,p4])
// setTimeout(console.log, 1000, p)