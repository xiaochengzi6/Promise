const FULFILLED = "fulfilled";
const REJECTED = "rejected";
const PENDING = "pending";
class Mypromise {
  // 这里之所以这么做是为了保存那些待定的状态时机成熟就会挨个运行。
  onFulfilledarr = []; // 成功状态
  onRejectedarr = []; // 失败状态
  constructor(executor) {
    this.State = PENDING;
    this.value = undefined;
    this.reason = undefined;
    let resolve = (value) => {
      if (this.State === PENDING) {
        this.State = FULFILLED;
        this.value = value;
        this.onFulfilledarr.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.State === PENDING) {
        this.State = REJECTED;
        this.reason = reason;
        this.onRejectedarr.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === "function"  ? onRejected : (err) => {throw err;};

    const thenPromise = new Mypromise((resolve, reject) => {
      switch (this.State) {
        case PENDING:
            // 可能存在成功状态，也可能存在失败状态
            this.onFulfilledarr.push(() => {
              queueMicrotask(()=>{
                try{
                  let x = onFulfilled(this.value);
                  resolvePromise(x, thenPromise, resolve, reject);
                }catch(err){
                  reject(err)
                }
              })
            });
            this.onRejectedarr.push(() => {
              queueMicrotask(()=>{
                try{
                  let x = onRejected(this.reason);
                  resolvePromise(x, thenPromise, resolve, reject);
                }catch(err){
                  reject(err)
                }
              })
            });
          break;
        case FULFILLED:
          queueMicrotask(() => {
            try{
              let x = onFulfilled(this.value);
              resolvePromise(x, thenPromise, resolve, reject);
            }catch(err){
              reject(err)
            }
          });
          break;
        case REJECTED:
          queueMicrotask(() => {
            try{
              let x = onRejected(this.reason);
              resolvePromise(x, thenPromise, resolve, reject);
            }catch(err){
              reject(err)
            }
          });
          break;
        default:
          break;
      }
    });
    return thenPromise;
  }
}

function resolvePromise(x, promise, resolve, reject) {
  if (x === promise) {
    reject(new TypeError("引用了同一个promise"));
  }
  // Promise 是一个对象或者是一个函数 具有 then 方法的就是 pormise
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let called;
    try {
      let then = x.then;
      if (typeof then === "function") {
        // 为了避免属性访问器的干扰 还是取那个原来的定义的 then
        then.call(
          x,
          (value) => {
            if(called){return}
            called = true;
            resolvePromise(value, promise, resolve, reject);
          },
          (reason) => {
            if(called){return}
            called = true;
            reject(reason)
          }
        );
      } else {
        resolve(x);
      }
    } catch (err) {
      if(called){return}
      called = true;
      reject(err);
    }
  } else {
    resolve(x);
  }
}

module.exports = Mypromise;
