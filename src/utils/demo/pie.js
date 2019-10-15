import { ChartColor, ChartLoading } from '@/common/utils/echart'

export default class ChartPie {
  /**
   * 基于echarts和业务进行饼图封装
   * @param ctx vue实例作用域（this）
   * @param rId 图表的id（#id） 或者ref属性值
   * @param config  图表配置扩展属性
   */
  constructor(ctx, rId, config) {
    this.ctx = ctx
    this.rId = rId
    config = config || {}
    this.config = {
      // 饼图大小
      radius: config.radius || '60%',
      // 饼子是否开启选择// 'single || multiple',
      selectedMode: config.selectedMode || false,
      // 饼图容器定位
      center: config.center || ['50%', '50%'],
      // label说明标签在饼图外面还是里面inside
      labelPosition: config.labelPosition || '',
      color: ChartColor.base
    }
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
  setData(data, options) {
    if (!data || JSON.stringify(data) === '{}' || data === '') {
      data = {
        name: '污染等级',
        series: [
          { value: 335, name: '一级' },
          { value: 310, name: '二级' },
          { value: 234, name: '三级' },
          { value: 135, name: '四级' }
        ]
      }
    }
    this.drawChart(data, options)
  }
  drawChart(data, options) {
    options = Object.assign({}, {
      legend: {
        icon: 'circle',
        x: 'center',
        y: '5%',
        data: ['异常信息', '弱口令', '蠕虫', '病毒'],
        textStyle: {
          color: '#000'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b} : {d}%',
        // formatter: "{a} <br/>{b} : {c} ({d}%)",
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
          fontSize: 13
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
      },
      color: this.config.color,
      series: [
        {
          name: '',
          type: 'pie',
          zlevel: 0,
          silent: true,
          center: ['50%', '55%'],
          radius: ['0', '75%'],
          label: {
            normal: {
              show: false
            }
          }
        },
        {
          name: data.name,
          type: 'pie',
          selectedMode: this.config.selectedMode,
          zlevel: 0,
          center: this.config.center,
          radius: this.config.radius,
          hoverOffset: 10,
          data: data.series,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            normal: {
              borderWidth: 2,
              borderColor: '#ffffff',
              label: {
                show: true,
                position: this.config.labelPosition,
                formatter: '{b}\n{d}%'
                // formatter: '{b}\n{c}\n( {d}% )'
              }
            }
          }
        }
      ]
    }, options)
    this.chart.setOption(options, true)
    this.chart.hideLoading()
  }
  setColor(data) {
    this.config.color = data
    return this
  }
}

