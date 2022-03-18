// yarn run test 
// 检测promise 是否符合规范但不包括其他功能。
const Promise = require("./Promise/Promise");

var promisesAplusTests = require("promises-aplus-tests");

Promise.deferred = function() {
  let deferred = {};
  deferred.promise = new Promise((resolve,reject)=>{
    deferred.resolve = resolve;
    deferred.reject = reject;
  })
  return deferred;
}

promisesAplusTests (Promise ,  function(err){ 
  console.log('测试失败',err);
})