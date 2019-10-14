
// 对象拷贝
// 普通
var a = {
  name: 'jake',
  age: 18
}
var b = a
a.age = 19
console.log(b.age) // 19

/**
 * 浅拷贝
 */
// 方法一
var a = {
  name: 'jake',
  age: 18
}
var b = Object.assign({}, a)
a.age = 19
console.log(b.age) // 18
// 方法二
var a = {
  name: 'jake',
  age: 18
}
var b = { ...a }
a.age = 19
console.log(b.age) // 18

/**
 * 深拷贝
 */
// 普通（深度对象不能包含函数、undefined、symbol会被忽略）
// 但是在通常情况下，复杂数据都是可以序列化的，所以这个函数可以解决大部分问题，并且该函数是内置函数中处理深拷贝性能最快的
var a = {
  name: 'jake',
  age: 18,
  hobby: {
    eat: '3',
    reading: '10h'
  }
}

var b = JSON.parse(JSON.stringify(a))
a.hobby.eat = 1
console.log(b)

/**
 * 函数防抖
 * 防抖和节流的作用都是防止函数多次调用。
 * 区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于wait，防抖的情况下只会调用一次，
 * 而节流的 情况会每隔一定时间（参数wait）调用函数。
 *
 * 防抖动和节流本质是不一样的。
 * 防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。
 */

var debounce = (fn, wait = 500) => {
  let timer = 0
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setInterval(() => {
      fn.apply(this, args)
    }, wait)
  }
}

debounce()
