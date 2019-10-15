// import Echarts from 'echarts'
import { ChartColor } from "@/common/utils/echart"
import { createTwoDimension, deepMerge } from "@/common/utils"

// 默认数据
const defaultData = {
  legendData: ["甄姬", "高渐离", "王昭君"],
  columns: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  rows: createTwoDimension(3, 7)
}
/**
 *  Xchart 图表封装
 *  调用方法：
 *  let eObj = new Xchart(ctx: [Vue上下文this（必填）], id: [图表容器#id或者ref（必填）], type: [图表类型（必填）], opt: [echarts配置（选填）])
 *   eObj.setData()
 */
export default class Xchart {
  /**
   *
   * @param {vue上下文this} ctx
   * @param {图表容器#id或ref} rId
   * @param {图表类型} type
   * @param {图表自定义配置} opt
   */
  constructor(ctx, rId, type, opt) {
    this.ctx = ctx
    this.rId = rId
    this.type = type.toLocaleLowerCase()
    this.opt = opt
    this.init()
  }
  init() {
    const domEl =
      this.rId.indexOf("#") === 0
        ? document.getElementById(this.rId.split("#").pop(0))
        : this.ctx.$refs[this.rId]
    this.chart = this.ctx.$echarts.init(domEl, null, {
      devicePixelRatio: 1
    })
    this.setConfig()
    return this
  }
  setData(data) {
    const tempConfig = this.config
    if (arguments.length === 0) {
      data = {}
    }

    if (this.type === "line" || this.type === "bar") {
      if (data.legendData) {
        tempConfig.legend.data = data.legendData
      }
      // 如果xAxis配置传入 xToy 则x和y对调
      if (this.opt && this.opt.xAxis && this.opt.xAxis.xToy) {
        if (data.columns) {
          tempConfig.yAxis.data = data.columns
        }
      } else {
        if (data.legendData) {
          tempConfig.legend.data = data.legendData
        }
        if (data.columns) {
          tempConfig.xAxis.data = data.columns
        }
        if (data.yData) {
          tempConfig.yAxis = data.yData
        }
      }

      // 注意option入参时为了方便series的特殊写法，应该传入数组的。为了方便传入对象，因此这块做特殊处理
      if (this.opt && this.opt.series) {
        tempConfig.series = defaultData.legendData.map((v, i) => ({
          name: v,
          type: this.type,
          data: defaultData.rows[i]
        }))
      }
      if (data.rows) {
        if (!data.legendData) {
          console.log('自定义数据输入legend必须传入.. legendData: ["xxx"]')
          return
        }
        tempConfig.series = data.legendData.map((v, i) => {
          // 默认 series 的样式
          let biz = {
            name: v,
            smooth: true,
            stack: "总量",
            type: this.type,
            symbolSize: 5, // 折线点的大小
            data: data.rows && data.rows[i]
          }
          // 合并 series
          if (this.opt && this.opt.series) {
            biz = deepMerge(biz, this.opt.series)
          }
          // // 堆叠图形
          // if (!(this.opt && this.opt.series && this.opt.series.areaStyle)) {
          //   delete biz.areaStyle
          // }
          // // 线条样式
          // if (this.opt && this.opt.series && this.opt.series.itemStyle) {
          //   biz.itemStyle = {
          //     normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
          //       color: new this.ctx.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          //         offset: 0,
          //         color: ChartColor.base[i] // 0% 处的颜色
          //       }, {
          //         offset: 1,
          //         color: '#fff' // 100% 处的颜色
          //       }])
          //     },
          //     emphasis: {
          //       color: ChartColor.base[i],
          //       lineStyle: { // 系列级个性化折线样式
          //         width: 0.5,
          //         type: 'dotted',
          //         color: '#fff' // 折线的颜色
          //       }
          //     }
          //   }
          // }
          return biz
        })
      }
    } else if (this.type === "pie") {
      if (data.legendData) {
        tempConfig.legend.data = data.legendData
      }

      // 合并 series
      if (this.opt && this.opt.series) {
        tempConfig.series[0] = deepMerge(tempConfig.series[0], this.opt.series)
      }

      if (data.rows) {
        tempConfig.series[0].data = data.rows
      }
    } else if (this.type === "treemap") {
      if (data.rows) {
        tempConfig.series[0].data = data.rows
      }
    }
    this.chart.setOption(tempConfig, true)
    return this
  }
  setConfig() {
    // 图表公用配置
    const globalDefaultOpt = {
      color: ChartColor.base,
      tooltip: {
        borderColor: "#000",
        borderWidth: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        borderRadius: 0,
        padding: [5, 12, 5, 12],
        textStyle: {
          color: "#fff",
          fontSize: 14
        },
        extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)"
      },
      grid: {
        left: 0,
        top: 30,
        right: 0,
        bottom: 0,
        containLabel: true
      },
      legend: {
        icon: "circle",
        textStyle: {
          color: "#666",
          fontSize: 12
        },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 15
      }
    }

    // line 或者 bar 配置
    const lineOrBarDefaultOpt = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        data: defaultData.legendData,
        right: 0,
        icon: "rect",
        itemWidth: 20,
        itemHeight: 10,
        itemGap: 10
      },
      xAxis: {
        // 坐标轴两边留白策略
        boundaryGap: true,
        data: defaultData.columns,
        // x轴的字体样式
        axisLabel: {
          show: true,
          textStyle: {
            color: ChartColor.textStyle,
            fontSize: 12
          },
          rotate: 0
        },
        // x轴刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: ChartColor.lineStyle,
            width: 2
          }
        },
        // 网格
        splitLine: {
          show: false,
          lineStyle: {
            color: ChartColor.lineStyle,
            type: "dashed"
          }
        }
      },
      yAxis: {
        // y轴
        axisLabel: {
          show: true,
          textStyle: {
            color: ChartColor.textStyle,
            fontSize: 14
          }
        },
        // y轴刻度
        axisLine: {
          show: false,
          lineStyle: {
            color: ChartColor.lineStyle,
            width: 2 // 这里是坐标轴的宽度
          }
        },
        // y轴网格
        splitLine: {
          show: true,
          lineStyle: {
            color: ChartColor.lineStyle,
            type: "solid"
          }
        }
      },
      // 通过 legendData 和 rows 生成 series
      series: defaultData.legendData.map((v, i) => ({
        name: v,
        smooth: true,
        type: this.type,
        data: defaultData.rows[i]
      }))
    }

    // 扩展功能：如果x和y对调【排名图表】
    if (this.opt && this.opt.xAxis && this.opt.xAxis.xToy) {
      lineOrBarDefaultOpt.foo = lineOrBarDefaultOpt.yAxis
      lineOrBarDefaultOpt.yAxis = lineOrBarDefaultOpt.xAxis
      lineOrBarDefaultOpt.xAxis = lineOrBarDefaultOpt.foo
    }

    // pie 配置
    const pieDefaultOpt = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        // orient: 'vertical',
        x: "left",

        data: defaultData.legendData
      },
      series: [
        {
          name: "占比",
          type: "pie",
          radius: "55%",
          // 防止标签重叠策略
          avoidLabelOverlap: true,
          label: {
            normal: {
              show: true,
              position: "right"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "14"
              }
            }
          },
          labelLine: {
            normal: {
              normal: {
                show: true
              }
            }
          },
          data: defaultData.legendData.map(v => {
            return {
              value: Math.round(Math.random() * 100),
              name: v
            }
          })
        }
      ]
    }

    // treemap 配置
    const treemapDefaultOpt = {
      calculable: true,
      series: [
        {
          type: "treemap",
          width: "100%",
          height: "100%",
          roam: false, // 是否开启拖拽漫游（移动和缩放）
          nodeClick: false, // 点击节点后的行为,false无反应
          breadcrumb: {
            show: false
          },
          label: {
            normal: {
              show: true,
              position: [10, 10],
              textStyle: {
                fontSize: "13"
              }
            }
          },
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: "{b}"
              },
              textStyle: {
                color: "#fff",
                fontSize: 12
              },
              borderWidth: 1,
              borderColor: "#fff"
            },
            emphasis: {
              label: {
                show: true
              },
              color: "#3a92ec",
              borderWidth: 1,
              borderColor: "#fff"
            }
          }
        }
      ]
    }

    let options
    // 通过传入的表格类型，选择对应的option进行深度合并
    switch (this.type) {
      case "bar":
      case "line":
        options = lineOrBarDefaultOpt
        break
      case "pie":
        options = pieDefaultOpt
        break
      case "treemap":
        options = treemapDefaultOpt
        break
      default:
        break
    }
    // 传入options 和默认 option 合并
    this.config = deepMerge(deepMerge(globalDefaultOpt, options), this.opt)
    return this
  }
}
