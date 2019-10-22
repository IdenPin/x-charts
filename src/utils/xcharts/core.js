/*
 * @Description: x-charts 核心入口文件
 * @Author: pdeng
 * @Date: 2019-10-16 19:54:06
 * @LastEditTime: 2019-10-16 23:16:45
 * @LastEditors: Please set LastEditors
 */
import Echarts from 'echarts'
import { deepMerge } from './utils'
import DefaultOpt from './defaultOpt'
import { LOADING_STYLE } from './constants'
import OptionDataBundle from './optionDataBundle'
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
    this.Echarts = Echarts
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
    // 添加 loading
    this.chart.showLoading(LOADING_STYLE())
    // 处理 option
    this.optionsHandler()
  }
  // 1. 合并 defaultOpt 与 opt
  optionsHandler() {
    this.mergeOpt = deepMerge(DefaultOpt[this.type](), this.opt)
  }
  // ==》用户触发-接受外面传递的 data
  // 2. 拆分 options 中的 data 再拼装
  setData(data) {
    this.chart.hideLoading()
    OptionDataBundle[this.type].call(this, data)
    return this
  }
  // 3. 渲染图表
  render() {
    this.chart.setOption(this.mergeOpt, true)
  }
}

export default Xcharts
