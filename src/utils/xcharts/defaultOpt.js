/*
 * @Description: 各图表默认的 options 配置文件
 * @Author: pdeng
 * @Date: 2019-10-16 19:54:06
 * @LastEditTime: 2019-10-17 10:13:48
 * @LastEditors: Please set LastEditors
 */
import { deepMerge } from '@/utils'
import { DEFAULT_THEME, OBJECT_COLORS } from '@/utils/xcharts/constants'
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
            color: OBJECT_COLORS.textStyle,
            fontSize: 12
          },
          rotate: 0
        },
        // x轴刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: OBJECT_COLORS.lineStyle,
            width: 2
          }
        },
        // 网格
        splitLine: {
          show: true,
          lineStyle: {
            color: OBJECT_COLORS.lineStyle,
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
            color: OBJECT_COLORS.textStyle,
            fontSize: 14
          }
        },
        // y轴刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: OBJECT_COLORS.lineStyle,
            width: 2 // 这里是坐标轴的宽度
          }
        },
        // y轴网格
        splitLine: {
          show: true,
          lineStyle: {
            color: OBJECT_COLORS.lineStyle,
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
            color: OBJECT_COLORS.textStyle,
            fontSize: 12
          },
          rotate: 0
        },
        // x轴刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: OBJECT_COLORS.lineStyle,
            width: 2
          }
        },
        // 网格
        splitLine: {
          show: true,
          lineStyle: {
            color: OBJECT_COLORS.lineStyle,
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
            color: OBJECT_COLORS.textStyle,
            fontSize: 14
          }
        },
        // y轴刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: OBJECT_COLORS.lineStyle,
            width: 2 // 这里是坐标轴的宽度
          }
        },
        // y轴网格
        splitLine: {
          show: true,
          lineStyle: {
            color: OBJECT_COLORS.lineStyle,
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
            color: OBJECT_COLORS.textStyle,
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
      legend: {
        icon: 'circle',
        itemWidth: 15,
        itemHeight: 15
      },
      xAxis: {
        axisLabel: {
          show: true,
          textStyle: {
            color: OBJECT_COLORS.textStyle,
            fontSize: 12
          },
          rotate: 0
        },
        // x轴刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: OBJECT_COLORS.lineStyle,
            width: 2
          }
        },
        // 网格
        splitLine: {
          show: true,
          lineStyle: {
            color: OBJECT_COLORS.lineStyle,
            type: 'dashed'
          }
        }
      },
      yAxis: {
        axisLabel: {
          show: true,
          textStyle: {
            color: OBJECT_COLORS.textStyle,
            fontSize: 12
          },
          rotate: 0
        },
        // x轴刻度
        axisLine: {
          show: true,
          lineStyle: {
            color: OBJECT_COLORS.lineStyle,
            width: 2
          }
        },
        // 网格
        splitLine: {
          show: true,
          lineStyle: {
            color: OBJECT_COLORS.lineStyle,
            type: 'dashed'
          }
        },
        scale: true
      },
      series: [
        {
          symbolSize: 20,
          type: 'scatter'
        }
      ]
    })
  },
  map: () => {
    return deepMerge(DEFAULT_THEME(), {
      tooltip: {
        trigger: 'item',
        formatter: function(v) {
          if (!v.name) {
            v.value = 0
          }
          return `
            <div>${v.name}</div>
            <div>总排放量：${v.value}（吨）</div>
        `
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
      visualMap: {
        orient: 'horizontal',
        type: 'continuous',
        itemWidth: 9,
        itemHeight: 55,
        text: ['高', '低'],
        showLabel: true,
        inRange: {
          color: ['#f5f7ff', '#889ef7', '#5781FD']
          // color: ['#e4f2dc', '#cde8bc', '#a3ea77', '#90d764', '#68b837']
        },
        textStyle: {
          color: '#7B93A7',
          fontSize: 14
        }
      },
      series: [
        {
          type: 'map',
          map: 'china',
          center: [106, 36],
          zoom: 1,
          scaleLimit: {
            min: 1,
            max: 5
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            emphasis: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            }
          },
          roam: true,
          animation: true
        }
      ]
    })
  }
}
