import { ChartColor, ChartLoading } from '@/common/utils/echart'
import dataTool from 'echarts/extension/dataTool'

// const ChartBoxplot = {
//   init(ctx, rId, dataJson, config) {
//     const chart = ctx.$echarts.init(ctx.$refs[rId])
//     chart.showLoading(ChartLoading())
//     chart.setOption(this.option(dataTool.prepareBoxplotData(dataJson.data), dataJson.xAxis, ctx), true)
//     return chart
//   },
//   option(res, xAxirows, ctx) {
//     const option = {
//       color: ChartColor.base,
//       tooltip: {
//         trigger: 'item',
//         axisPointer: {
//           type: 'shadow'
//         },
//         borderColor: '#000',
//         borderWidth: 1,
//         backgroundColor: 'rgba(0,0,0,0.7)',
//         borderRadius: 0,
//         padding: [5, 12, 5, 12],
//         textStyle: {
//           color: '#fff',
//           fontSize: 14
//         },
//         extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
//       },
//       grid: {
//         left: 10,
//         top: 10,
//         right: 30,
//         bottom: 10,
//         containLabel: true
//       },
//       xAxis: {
//         type: 'category',
//         data: xAxirows,
//         boundaryGap: true,
//         nameGap: 30,
//         splitArea: {
//           show: false
//         },
//         axisLabel: {
//           show: true,
//           // formatter: 'expr {value}',
//           textStyle: {
//             color: ChartColor.textStyle,
//             fontSize: 14
//           },
//           rotate: 0
//         },
//         // x轴的颜色和宽度
//         axisLine: {
//           show: true,
//           lineStyle: {
//             color: ChartColor.lineStyle,
//             width: 2
//           }
//         },
//         splitLine: {
//           show: false,
//           lineStyle: {
//             color: ChartColor.lineStyle,
//             type: 'dashed'
//           }
//         }
//       },
//       yAxis: {
//         type: 'value',
//         // name: 'km/s minus 299,000',
//         splitArea: {
//           show: true
//         },
//         axisLabel: {
//           show: true,
//           textStyle: {
//             color: ChartColor.textStyle,
//             fontSize: 14
//           }
//         },
//         // y轴的颜色和宽度
//         axisLine: {
//           show: false,
//           lineStyle: {
//             color: ChartColor.lineStyle,
//             width: 2 // 这里是坐标轴的宽度
//           }
//         },
//         splitLine: {
//           show: true,
//           lineStyle: {
//             color: ChartColor.lineStyle,
//             type: 'dashed'
//           }
//         }
//       },
//       series: [
//         {
//           name: 'boxplot',
//           type: 'boxplot',
//           data: res.bocolumns,
//           tooltip: {
//             formatter: function(param) {
//               return [
//                 '所选污染物： ' + param.name,
//                 '上边缘: ' + param.data[5],
//                 'Q3: ' + param.data[4],
//                 '中位数: ' + param.data[3],
//                 'Q1: ' + param.data[2],
//                 '下边缘: ' + param.data[1]
//               ].join('<br/>')
//             }
//           }
//         },
//         {
//           name: '异常值',
//           type: 'scatter',
//           data: res.outliers,
//           color: 'red'
//         }
//       ]
//     }
//     return option
//   }
// }

export default class ChartPie {
  /**
   * @param ctx vue实例作用域（this）
   * @param rId 图表的id（#id） 或者ref属性值
   * @param config  图表配置扩展属性
   */
  constructor(ctx, rId, config) {
    this.ctx = ctx
    this.rId = rId
    config = config || {}
    this.config = {}
    this.init()
  }
  init() {
    if (this.rId.indexOf('#') === 0) {
      const foo = this.rId
      this.chart = this.ctx.$echarts.init(document.getElementById(foo.substr(1, foo.length)))
    } else {
      this.chart = this.ctx.$echarts.init(this.ctx.$refs[this.rId])
    }
    this.chart.showLoading(ChartLoading())
  }
  // 图表设置data
  setData(data) {
    this.drawChart(dataTool.prepareBoxplotData(data.data), data.xAxis)
  }
  drawChart(res, xAxirows) {
    this.chart.setOption({
      color: ChartColor.base,
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        },
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 0,
        padding: [5, 12, 5, 12],
        textStyle: {
          color: '#fff',
          fontSize: 14
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
      },
      grid: {
        left: 10,
        top: 10,
        right: 30,
        bottom: 10,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: xAxirows,
        boundaryGap: true,
        nameGap: 30,
        splitArea: {
          show: false
        },
        axisLabel: {
          show: true,
          // formatter: 'expr {value}',
          textStyle: {
            color: ChartColor.textStyle,
            fontSize: 14
          },
          rotate: 0
        },
        // x轴的颜色和宽度
        axisLine: {
          show: true,
          lineStyle: {
            color: ChartColor.lineStyle,
            width: 2
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ChartColor.lineStyle,
            type: 'dashed'
          }
        }
      },
      yAxis: {
        type: 'value',
        // name: 'km/s minus 299,000',
        splitArea: {
          show: true
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: ChartColor.textStyle,
            fontSize: 14
          }
        },
        // y轴的颜色和宽度
        axisLine: {
          show: false,
          lineStyle: {
            color: ChartColor.lineStyle,
            width: 2 // 这里是坐标轴的宽度
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ChartColor.lineStyle,
            type: 'dashed'
          }
        }
      },
      series: [
        {
          name: 'boxplot',
          type: 'boxplot',
          data: res.bocolumns,
          tooltip: {
            formatter: function(param) {
              return [
                '所选污染物： ' + param.name,
                '上边缘: ' + param.data[5],
                'Q3: ' + param.data[4],
                '中位数: ' + param.data[3],
                'Q1: ' + param.data[2],
                '下边缘: ' + param.data[1]
              ].join('<br/>')
            }
          }
        },
        {
          name: '异常值',
          type: 'scatter',
          data: res.outliers,
          color: 'red'
        }
      ]
    }
    , true)
    this.chart.hideLoading()
  }
}

