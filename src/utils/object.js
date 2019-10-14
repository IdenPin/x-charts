export default class ObjectUtil {
  static corevertObjectToArray(obj) {
    const newObj = JSON.parse(JSON.stringify(obj))
    const keys = Object.keys(newObj)
    return keys.map((key) => {
      return {
        key: key,
        value: newObj[key]
      }
    })
  }
}
