/*
 * @Author: pdeng
 * @Date: 2019-10-14 22:31:15
 * @Last Modified by: pdeng
 * @Last Modified time: 2019-10-16 22:55:28
 */
import Echarts from 'echarts'
import { deepMerge } from '@/utils/'
import DefaultOpt from './default-opt'
import OptionDataBundle from './optionDataBundle'
// import pieOptionDataBundle from './optionDataBundle/pie'
class Xcharts {
  constructor(el, type, opt = {}) {
    // 承载容器的 dom
    this.el = el
    // 图表类型
    this.type = type.toLocaleLowerCase()
    // 用户传入图片配置
    this.opt = opt

    // 实例化图表
    this.chart = {}
    // 合并的 option
    this.mergeOpt = {}
    this.init()
    return this
  }
  init() {
    if (!this.el) {
      console.error('图表初始化dom未填写 ~')
      return
    }
    if (!this.type) {
      console.error('图表类型位置设 ~')
      return
    }
    this.chart = Echarts.init(document.querySelector(`#${this.el}`))
    this.optionsHandler()
  }
  // 1. 合并 defaultOpt 与 opt
  optionsHandler() {
    this.mergeOpt = deepMerge(DefaultOpt[this.type](), this.opt)
    if (this.type === 'pie') {
      console.log(this.mergeOpt)
    }
  }
  // ==》用户触发-接受外面传递的 data
  // 2. 拆分 options 中的 data 再拼装
  setData(data) {
    OptionDataBundle[this.type].call(this, data)
    return this
  }
  // 3. 渲染图表
  render() {
    this.chart.setOption(this.mergeOpt, true)
  }
}

export default Xcharts
