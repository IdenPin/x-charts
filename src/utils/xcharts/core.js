/*
 * @Author: pdeng
 * @Date: 2019-10-14 22:31:15
 * @Last Modified by: pdeng
 * @Last Modified time: 2019-10-14 23:33:09
 */
import Echarts from 'echarts'
import _ from 'lodash'
import DefaultOpt from './defaultOpt'
export default class Xcharts {
  constructor(el, chartType, opt = {}) {
    this.el = el
    this.chartType = chartType
    this.opt = opt

    // echarts 图表空对象
    this.eObj = {}
    // 最终合并的 option
    this.option = {}
    this.init()
  }
  init() {
    if (!this.el) {
      console.error('图表初始化dom未填写 ~')
      return
    }
    if (!this.chartType) {
      console.error('图表类型位置设 ~')
      return
    }
    this.eObj = Echarts.init(document.querySelector(`#${this.el}`))
    this.mergeOpt()
  }
  // 1. 合并 defaultOpt 与 opt
  mergeOpt() {
    this.option = _.merge(DefaultOpt[this.chartType], this.opt)
  }
  // ==》用户触发-接受外面传递的 data
  setData(data) {
    this.groupOptData(data)
  }
  // 2. 组合 option 与 data
  groupOptData(data) {
    // TODO ...
    console.log(this.option, data)
    this.render(this.option)
  }
  // 3. 渲染图表
  render(option) {
    this.eObj.setOption(option)
  }
}
