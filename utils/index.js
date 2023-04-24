export const FULFILLED = "fulfilled"
export const REJECTED = "rejected"
export const PENDING = "pending"


export function isFunction(func) {
  if (typeof func === 'function') {
    return true
  }

  return false
}

export function isThenable(obj) {
  if (obj && typeof obj === 'object' && 'then' in obj) {
    return true
  }

  false
}

export function isPromise(promise) {
  if ('state' in promise) {
    return promise.state === PENDING || FULFILLED || REJECTED
  }

  return false
}

export function isIterator(iterator) {
  if (iterator && typeof iterator[Symbol.iterator] === 'function') {
    return true
  }

  return false
}