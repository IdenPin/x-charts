/*
 * @Description: 各图表默认的 options 配置文件
 * @Author: pdeng
 * @Date: 2019-10-16 19:54:06
 * @LastEditTime: 2019-10-17 10:13:48
 * @LastEditors: Please set LastEditors
 */
import { deepMerge } from '@/utils'
import { DEFAULT_THEME, LINE_TEXT_COLOR } from '@/utils/xcharts/constants'
export default {
  line: () => {
    return Object.assign({}, DEFAULT_THEME(), {
      xAxis: {
        type: 'category',
        // 坐标轴两边留白策略
        boundaryGap: true,
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        // x轴的字体样式
        axisLabel: {
          show: true,
          textStyle: {
            color: LINE_TEXT_COLOR.textStyle,
            fontSize: 12
          },
          rotate: 0
        },
        // x轴刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: LINE_TEXT_COLOR.lineStyle,
            width: 2
          }
        },
        // 网格
        splitLine: {
          show: true,
          lineStyle: {
            color: LINE_TEXT_COLOR.lineStyle,
            type: 'dashed'
          }
        }
      },
      yAxis: {
        type: 'value',
        // y轴
        axisLabel: {
          show: true,
          textStyle: {
            color: LINE_TEXT_COLOR.textStyle,
            fontSize: 14
          }
        },
        // y轴刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: LINE_TEXT_COLOR.lineStyle,
            width: 2 // 这里是坐标轴的宽度
          }
        },
        // y轴网格
        splitLine: {
          show: true,
          lineStyle: {
            color: LINE_TEXT_COLOR.lineStyle,
            type: 'solid'
          }
        }
      },
      series: [
        {
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          smooth: true,
          type: 'line'
        }
      ]
    })
  },
  bar: () => {
    return Object.assign({}, DEFAULT_THEME(), {
      xAxis: {
        type: 'category',
        // 坐标轴两边留白策略
        boundaryGap: true,
        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        // x轴的字体样式
        axisLabel: {
          show: true,
          textStyle: {
            color: LINE_TEXT_COLOR.textStyle,
            fontSize: 12
          },
          rotate: 0
        },
        // x轴刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: LINE_TEXT_COLOR.lineStyle,
            width: 2
          }
        },
        // 网格
        splitLine: {
          show: true,
          lineStyle: {
            color: LINE_TEXT_COLOR.lineStyle,
            type: 'dashed'
          }
        }
      },
      yAxis: {
        type: 'value',
        // y轴
        axisLabel: {
          show: true,
          textStyle: {
            color: LINE_TEXT_COLOR.textStyle,
            fontSize: 14
          }
        },
        // y轴刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: LINE_TEXT_COLOR.lineStyle,
            width: 2 // 这里是坐标轴的宽度
          }
        },
        // y轴网格
        splitLine: {
          show: true,
          lineStyle: {
            color: LINE_TEXT_COLOR.lineStyle,
            type: 'solid'
          }
        }
      },
      series: [
        {
          // data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'bar'
        }
      ]
    })
  },
  pie: () => {
    return deepMerge(DEFAULT_THEME(), {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left'
      },
      series: [
        {
          type: 'pie',
          radius: [0, '80%'],
          label: {
            normal: {
              show: false,
              position: 'center'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          }
        }
      ]
    })
  },
  radar: () => {
    return deepMerge(DEFAULT_THEME(), {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        x: 'left'
      },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: LINE_TEXT_COLOR.textStyle,
            // backgroundColor: '',
            borderRadius: 3,
            padding: [3, 5]
          }
        },
        indicator: []
      },
      series: [
        {
          areaStyle: {
            normal: {}
          },
          type: 'radar'
        }
      ]
    })
  },
  scatter: () => {
    return deepMerge(DEFAULT_THEME(), {
      xAxis: {
        axisLabel: {
          show: true,
          textStyle: {
            color: LINE_TEXT_COLOR.textStyle,
            fontSize: 12
          },
          rotate: 0
        },
        // x轴刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: LINE_TEXT_COLOR.lineStyle,
            width: 2
          }
        },
        // 网格
        splitLine: {
          show: true,
          lineStyle: {
            color: LINE_TEXT_COLOR.lineStyle,
            type: 'dashed'
          }
        }
      },
      yAxis: {
        axisLabel: {
          show: true,
          textStyle: {
            color: LINE_TEXT_COLOR.textStyle,
            fontSize: 12
          },
          rotate: 0
        },
        // x轴刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: LINE_TEXT_COLOR.lineStyle,
            width: 2
          }
        },
        // 网格
        splitLine: {
          show: true,
          lineStyle: {
            color: LINE_TEXT_COLOR.lineStyle,
            type: 'dashed'
          }
        },
        scale: true
      },
      series: [
        {
          type: 'scatter'
        }
      ]
    })
  }
}
