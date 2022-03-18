const FULFILLED = "fulfilled";
const REJECTED = "rejected";
const PENDING = "pending";
class Promise {
  constructor(executor){
    this.onFulfilledarr = [];
    this.onRejectedarr = [];
    this.State = PENDING;
    this.value = undefined;
    this.reason = undefined;
    
    let resolve = (value) => {
      if(this.State === PENDING){
        this.State = FULFILLED;
        this.value = value;
        this.onFulfilledarr.forEach((fn)=>fn());
      }
    }
    let reject = (reason) => {
      if(this.State === PENDING){
        this.State = REJECTED;
        this.reason = reason;
        this.onRejectedarr.forEach((fn)=>fn());
      }
    }
    try{
      executor(resolve, reject);
    }catch(e){
      reject(e)
    }
  }
  then(onFulfulled, onRejected){
    onFulfulled = typeof onFulfulled === 'function' ? onFulfulled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (err) => {throw err};

    let thenPromise =  new Promise((resolve, reject)=>{
      switch(this.State){
          case PENDING:
            this.onFulfilledarr.push(()=>{
              queueMicrotask(()=>{
                try{
                  let x = onFulfulled(this.value)
                  resolvePromise(x, thenPromise, resolve, reject);
                }catch(err){
                  reject(err)
                }
              })
            });
            this.onRejectedarr.push(()=>{
              queueMicrotask(()=>{
                try{
                  let x = onRejected(this.reason)
                  resolvePromise(x, thenPromise, resolve, reject);
                }catch(err){
                  reject(err)
                }
              })
            })
          break;
          case FULFILLED:
            queueMicrotask(()=>{
              try{
                let x = onFulfulled(this.value)
              resolvePromise(x, thenPromise, resolve, reject);
              }catch(err){
                reject(err)
              }
            })
          break;
          case REJECTED:
            queueMicrotask(()=>{
              try{
                let x = onRejected(this.reason);
              resolvePromise(x, thenPromise, resolve, reject);
              }catch(err){
                reject(err);
              }
            })
          break;
          default:
            break
      }
    })
    return thenPromise;
  }
}

function resolvePromise (x, promise, resolve, reject){
  if(x === promise) {
    reject( new TypeError('不能引用同一个值'));
  }
  let curren;
  if(typeof x === 'object' && x !== null || typeof x === "function"){
    try{
      let then = x.then;
      if(typeof then === 'function'){
        then.call(x, (value)=>{
          if(curren){return};
          curren = true;
          resolvePromise(value, promise, resolve, reject);
        },
        (reason)=>{
          if(curren){return};
          curren = true;
          reject(reason);
        }
        )
      }else{
        if(curren){return};
          curren = true;
        resolve(x);
      }
    }catch(err){
      if(curren){return};
          curren = true;
      reject(err);
    }
  }else{
    resolve(x)
  }
}
module.exports = Promise;