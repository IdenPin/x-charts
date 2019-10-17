/*
 * @Description: 各图表默认的 options 配置文件
 * @Author: pdeng
 * @Date: 2019-10-16 19:54:06
 * @LastEditTime: 2019-10-16 23:16:03
 * @LastEditors: Please set LastEditors
 */
import { deepMerge } from '@/utils'
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
  }
}
