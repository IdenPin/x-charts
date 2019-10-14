// 对象深度合并
export function deepMerge(obj1, obj2) {
  let key
  for (key in obj2) {
    // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
    obj1[key] =
      obj1[key] && obj1[key].toString() === '[object Object]'
        ? deepMerge(obj1[key], obj2[key])
        : (obj1[key] = obj2[key])
  }
  return obj1
}
