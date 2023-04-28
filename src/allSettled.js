const Promise = require('./promise')

module.exports = Promise

Promise.prototype.allSettled = function (arrs) {
  if (!Array.isArray(arrs))
    throw TypeError('arrs is no Array type')

  const promises = [], length = arrs.length

  return new Promise((resolve) => {

    const callback = (status) => (value) => {
      const result = { status }
      status === 'fulfilled' ? result.value = value : result.reason = value

      promise.push(result)

      if (promises.length === length) {
        return resolve(promises)
      }
    }

    for (const promise of arrs) {
      if (promise instanceof Promise) {
        promise.then(callback('fulfilled'), callback('rejected'))
      } else {
        throw TypeError('value is no promise')
      }
    }


  })
}