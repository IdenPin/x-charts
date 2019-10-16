import { MockData } from '@/utils'
export default {
  line(
    data = {
      legendData: ['测试数据'],
      rows: MockData.array(5),
      columns: MockData.date(5, 'week')
    }
  ) {
    const { legendData, rows, columns } = data
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
      this.mergeOpt.series = seriesArr
    }
    this.render()
  },
  bar(
    data = {
      legendData: ['测试数据'],
      rows: MockData.array(5),
      columns: MockData.date(5, 'week')
    }
  ) {
    const { legendData, rows, columns } = data
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
      this.mergeOpt.series = seriesArr
    }
    this.render()
  },
  pie(
    data = {
      legendData: ['直达', '邮件营销', '联盟广告'],
      columns: [
        { value: 335, name: '直达' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' }
      ]
    }
  ) {
    const { legendData, columns } = data
    this.mergeOpt.legend.data = legendData
    // 判断传入的 columns 是否为二位数组，决定是否渲染嵌套 pie
    if (columns.some(v => Array.isArray(v))) {
      // 二位数组
      const series = []
      columns.forEach((v, i) => {
        console.log('0000000', this.mergeOpt)
        // this.mergeOpt.series[i] || this.mergeOpt.series[0]
        this.mergeOpt.series[i].data = v
        series.push(this.mergeOpt.series[i])
      })
      this.mergeOpt.series = series
    } else {
      this.mergeOpt.series[0].data = columns
    }
    this.render()
  }
}
