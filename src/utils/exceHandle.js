/**
 * 处理获取数据返回的业务
 * @param {*} promise
 */
export default function exception(promise) {
  return promise.then(response => {
    if (response && response.code === '000000') {
      if (response.data) {
        // eslint-disable-next-line
        return [{ data, status }, null]
      } else {
        return [true, null]
      }
    } else {
      return [null, response]
    }
  }).catch(error => {
    return [error, { data: null }]
  })
}
