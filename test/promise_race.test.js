const Promise = require('../src/race')
const p1 = new Promise((resolve, reject)=>{
  setTimeout(resolve, 400, '1')
})
const p2 = new Promise((resolve, reject)=>{
  setTimeout(resolve, 200, '2')
})
const p3 = new Promise((resolve, reject)=>{
  setTimeout(reject, 100, '3')
})
const p4 = new Promise((resolve, reject)=>{
  setTimeout(reject, 200, '4')
})

const p = Promise.race([p1,p2,p3,p4])
setTimeout(console.log, 1000, p) // Promise{ State: reject, reson: 3}