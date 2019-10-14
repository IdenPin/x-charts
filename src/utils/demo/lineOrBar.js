import { ChartColor, ChartLoading } from '@/common/utils/echart'
import { computedLabel } from '@/common/utils/echart/chart.tool'

export default class ChartLineOrBar {
  /**
   * 基于echarts和业务进行折线图和柱状图封装
   * @param ctx  vue上下文context
   * @param rId  图表的id（#id） 或者ref属性值
   * @param type 图表类型可选（line、bar）
   * @param config 图表配置扩展属性
   * 注意 data.series 传入的是 **[二维数组]**
   */
  constructor(ctx, rId, type, config) {
    this.ctx = ctx
    this.rId = rId
    this.type = type
    config = config || {}
    // 可自定义扩展echarts属性
    this.config = {
      // 是否翻转X轴，（排行）
      Y: config.Y || false,
      // 是否开启渐变展示
      areaStyle: config.areaStyle || false,
      // 是否展示平滑的折现
      smooth: config.smooth || true,
      // 坐标轴两边是否留白
      boundaryGap: !!(config.boundaryGap || type === 'bar'),
      // 坐标轴label旋转
      rotate: config.rotate || 0,
      gridTop: config.gridTop || 40,
      provideNum: config.provideNum || false
    }
    this.init()
  }
  init() {
    if (this.rId.indexOf('#') === 0) {
      const foo = this.rId
      this.chart = this.ctx.$echarts.init(
        document.getElementById(foo.substr(1, foo.length))
      )
    } else {
      this.chart = this.ctx.$echarts.init(this.ctx.$refs[this.rId])
    }
    this.chart.showLoading(ChartLoading())
  }
  // 设置图表data
  setData(data) {
    let tpl = []
    data = data || {}
    if (JSON.stringify(data) !== '{}' || data === '') {
      data.series.forEach(v => {
        tpl.push({
          data: v,
          type: this.type,
          smooth: this.config.smooth
        })
      })
    } else {
      // 默认数据
      data = {
        xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        legend: ['污染']
      }
      tpl = [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: this.type,
          smooth: this.config.smooth
        }
      ]
    }
    this.drawChart(data, tpl)
  }
  drawChart(data, tpl) {
    const option = {
      color: ChartColor.base,
      legend: {
        data: data.legend || [],
        right: 0,
        icon: 'rect',
        itemWidth: 20,
        itemHeight: 10,
        itemGap: 10
      },
      tooltip: {
        trigger: 'axis',
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
        top: this.config.gridTop,
        right: 30,
        bottom: 0,
        containLabel: true
      },
      xAxis: {
        boundaryGap: this.config.boundaryGap,
        // x轴的字体样式
        axisLabel: {
          show: true,
          textStyle: {
            color: ChartColor.textStyle,
            fontSize: 14
          },
          rotate: this.config.rotate,
          formatter: params => {
            return (
              (this.config.provideNum
                ? computedLabel(params, this.config.provideNum)
                : false) || params
            )
          }
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
      }
    }

    if (!this.config.Y) {
      option.xAxis.data = data.xAxis
      option.xAxis.type = 'category'
      option.yAxis.type = 'value'
      if (this.config.areaStyle) {
        tpl.forEach((v, i) => {
          v.areaStyle = {
            normal: {
              color: new this.ctx.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  { offset: 0, color: ChartColor.base[i] },
                  { offset: 1, color: '#fff' }
                ],
                false
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 1
            }
          }
        })
      }
      tpl.forEach((v, i) => {
        v.name = data.legend ? data.legend[i] : ''
      })
      option.series = tpl
    } else {
      // 翻转X轴
      option.xAxis.type = 'value'
      option.xAxis.position = 'top'
      option.yAxis.inverse = true // 排序
      option.yAxis.type = 'category'
      option.yAxis.splitLine.show = false
      option.yAxis.data = data.xAxis
      option.series = {
        stack: '污染物浓度',
        type: this.type,
        data: this.config.Y
          ? data.series
          : tpl.map(v => {
            return v.data
          }),
        itemStyle: {
          normal: {
            color: '#48A6EB'
          }
        }
      }
    }
    this.chart.setOption(option, true)
    this.chart.hideLoading()
  }
}
