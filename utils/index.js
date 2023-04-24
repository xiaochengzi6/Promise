const FULFILLED = "fulfilled"
const REJECTED = "rejected"
const PENDING = "pending"


const isFunction = obj => typeof obj === 'function'
const isObject = obj => !!(obj && typeof obj === 'object')
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj


const isIterator = (iterator) => {
  if (iterator && isFunction(iterator[Symbol.iterator])) {
    return true
  }

  return false
}

module.exports = {
  FULFILLED,
  REJECTED,
  PENDING,

  isFunction,
  isThenable,
  isIterator,
}