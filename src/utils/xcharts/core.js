/*
 * @Author: pdeng
 * @Date: 2019-10-14 22:31:15
 * @Last Modified by: pdeng
 * @Last Modified time: 2019-10-16 00:10:00
 */
import Echarts from 'echarts'
import { deepMerge } from '@/utils/'
import DefaultOpt from './default-opt'
class Xcharts {
  constructor(el, chartType, opt = {}) {
    this.el = el
    this.chartType = chartType
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
    if (!this.chartType) {
      console.error('图表类型位置设 ~')
      return
    }
    this.chart = Echarts.init(document.querySelector(`#${this.el}`))
    this.optionsHandler()
  }
  // 1. 合并 defaultOpt 与 opt
  optionsHandler() {
    // 注意 一定要使用 object.assign 赋值给一个新对象
    this.mergeOpt = Object.assign(
      {},
      deepMerge(this.opt, DefaultOpt[this.chartType])
    )
    console.log('this.mergeOpt', this.mergeOpt)
  }
  // ==》用户触发-接受外面传递的 data
  setData(data) {
    this.optionDataBundle(data)
    return this
  }
  // 2. 组合 option 与 data
  optionDataBundle({ legendData, rows, columns }) {
    this.mergeOpt.legend.data = legendData
    this.mergeOpt.xAxis.data = columns

    // 根据传入的 legend 判断图表是 几个纬度
    // 根据 legend length 判断数组长度
    if (Array.isArray(legendData) && legendData.length === 1) {
      this.mergeOpt.series = [
        Object.assign(
          {
            name: legendData[0],
            data: rows
          },
          this.mergeOpt.series[0]
        )
      ]
    } else {
      // 多个维度 对应多个 legend
      const seriesArr = []
      for (var i = 0; i < legendData.length; i++) {
        // 将拆分后的 data 和 name 于传入的 series 其它属性合并
        seriesArr.push(
          Object.assign(
            {
              name: legendData[i],
              data: rows[i]
            },
            this.mergeOpt.series[0]
          )
        )
      }
      console.log('seriesArr--->', seriesArr)
      this.mergeOpt.series = seriesArr
    }
    this.render()
  }
  // 3. 渲染图表
  render() {
    this.chart.setOption(this.mergeOpt, true)
  }
}

export default Xcharts
