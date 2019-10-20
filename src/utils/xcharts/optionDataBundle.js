/*
 * @Description: 实现 option 于 data 的拼装
 * @Author: pdeng
 * @Date: 2019-10-16 19:54:06
 * @LastEditTime: 2019-10-16 23:18:47
 * @LastEditors: Please set LastEditors
 */
import { MockData } from '@/utils'
import { MAP_PROVINCES } from '@/utils/xcharts/data/map/provinceMapData'

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
    // 根据传入的 legend 判断图表有几个纬度
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
    // 判断传入的 columns 是否为二维数组，决定是否渲染嵌套 pie
    if (columns.some(v => Array.isArray(v))) {
      // 二维数组
      const series = []
      columns.forEach((v, i) => {
        // this.mergeOpt.series[i] || this.mergeOpt.series[0]
        this.mergeOpt.series[i].data = v
        series.push(this.mergeOpt.series[i])
      })
      this.mergeOpt.series = series
    } else {
      this.mergeOpt.series[0].data = columns
    }
    this.render()
  },
  radar(
    data = {
      legendData: ['预算分配', '实际开销'],
      columns: [
        {
          value: [4300, 10000, 28000, 35000, 50000, 19000],
          name: '预算分配'
        },
        {
          value: [5000, 14000, 28000, 31000, 42000, 21000],
          name: '实际开销'
        }
      ],
      rows: [
        { name: '销售（sales）', max: 6500 },
        { name: '管理（Administration）', max: 16000 },
        { name: '信息技术（Techology）', max: 30000 },
        { name: '客服（Customer', max: 38000 },
        { name: '研发（Development）', max: 52000 },
        { name: '市场（Marketing）', max: 25000 }
      ]
    }
  ) {
    const { rows, columns, legendData } = data
    this.mergeOpt.legend.data = legendData
    this.mergeOpt.radar.indicator = rows
    // 判断传入的 columns 是否为二维数组，决定是否渲染嵌套
    if (columns.some(v => Array.isArray(v))) {
      // 二维数组
      const series = []
      columns.forEach((v, i) => {
        // this.mergeOpt.series[i] || this.mergeOpt.series[0]
        this.mergeOpt.series[i].data = v
        series.push(this.mergeOpt.series[i])
      })
      this.mergeOpt.series = series
    } else {
      this.mergeOpt.series[0].data = columns
    }
    this.render()
  },
  scatter(
    data = {
      legendData: ['2019'],
      rows: [
        [10.0, 8.04],
        [8.0, 6.95],
        [13.0, 7.58],
        [9.0, 8.81],
        [11.0, 8.33],
        [14.0, 9.96],
        [6.0, 7.24],
        [4.0, 4.26],
        [12.0, 10.84],
        [7.0, 4.82],
        [5.0, 5.68]
      ]
    }
  ) {
    const { rows, legendData, ecStat = {}} = data
    this.mergeOpt.legend.data = legendData
    // 通过传入的 legendData 判断数据是几个纬度
    if (this.mergeOpt.legend.data.length > 1) {
      // 多个纬度
      const series = []
      rows.forEach((v, i) => {
        const foo = Object.assign(
          {},
          this.mergeOpt.series[0],
          this.mergeOpt.series[i]
        )
        // 赋值 data
        foo.data = v
        // 赋值 legend name
        foo.name = legendData[i]
        series.push(foo)
      })
      this.mergeOpt.series = series
    } else {
      // 一个纬度
      this.mergeOpt.series[0].data = rows
      this.mergeOpt.series[0].name = legendData[0]
    }
    if (JSON.stringify(ecStat) !== '{}') {
      this.mergeOpt.series.push({
        name: 'line',
        type: 'line',
        lineStyle: {
          normal: {
            color: '#2f4554'
          }
        },
        smooth: true,
        showSymbol: false,
        data: ecStat.formula && ecStat.formula.points,
        markPoint: {
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          },
          label: {
            normal: {
              show: true,
              position: 'left',
              formatter: ecStat.formula && ecStat.formula.expression,
              textStyle: {
                color: '#333',
                fontSize: 14
              }
            }
          },
          data: ecStat.data
        }
      })
    }
    this.render()
  },
  map(
    data = {
      visualMap: [0, 100],
      rows: Array.from(
        { length: Object.keys(MAP_PROVINCES).length },
        (_, index) => {
          return {
            name: Object.keys(MAP_PROVINCES)[index],
            value: Math.floor(Math.random() * 100) + 1
          }
        }
      )
    }
  ) {
    const { rows, visualMap } = data
    const [min, max] = visualMap
    this.mergeOpt.series[0].data = rows
    this.mergeOpt.visualMap.min = min
    this.mergeOpt.visualMap.max = max
    console.log('this.mergeOpt', this.mergeOpt)
    this.render()
  }
}
