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

// 数据生成
export const MockData = {
  array(len, slice = -2) {
    return Array.from({ length: len }, (_, index) => {
      return Number(
        Math.random()
          .toString()
          .slice(slice)
      )
    })
  },
  date(len, type) {
    return Array.from({ length: len }, (_, index) => {
      let temp = ''
      switch (type.toLocaleLowerCase()) {
        case 'day':
          temp = Number(index + 1) + '日'
          break
        case 'month':
          temp = Number(index + 1) + '月'
          break
        case 'week':
          temp = '第' + Number(index + 1) + '周'
          break
        default:
          '20' + Number(index + 1) + '年'
          break
      }
      return temp
    })
  }
}
