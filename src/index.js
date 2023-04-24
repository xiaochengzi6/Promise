const Promise = require('./promise')

require('./catch')
require('./all')
require('./finally')
require('./race')

Promise.prototype.resolve = (value) => new Promise((resolve) => resolve(value))
Promise.prototype.reject = (reason) => new Promise((_, reject) => reject(reason))

module.exports = Promise
