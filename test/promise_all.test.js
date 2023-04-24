const Promise = require('../src/all');

const p1 = new Promise((resolve, reject)=>{
  setTimeout(resolve, 1000, '1')
})
const p2 = new Promise((resolve, reject)=>{
  setTimeout(resolve, 1000, '2')
})
const p3 = new Promise((resolve, reject)=>{
  setTimeout(resolve, 1000, '3')
})
const p4 = new Promise((resolve, reject)=>{
  setTimeout(reject, 1000, '4')
})
let p = Promise.all([p1,p2,p3,p4])

setTimeout(console.log, 3000,'p:', p) // State: reject  reson: 4