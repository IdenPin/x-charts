<template>
  <div class="pie-chart">
    <el-main>
      <el-card
        v-for="(v,i) in items"
        :key="i"
        style="margin:1%;box-sizing:border-box;width: 48%;float:left"
      >
        <div slot="header" class="clearfix">
          <span>{{ v.title }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="openDialog(i)">查看源码</el-button>
        </div>
        <div class="text item">
          <div :id="`chart${i}`" style="width: 100%;height:280px" />
        </div>
      </el-card>
    </el-main>
    <el-dialog title="源码查看" :visible.sync="dialogVisible" width="80%">
      <codemirror v-model="codeView" :options="cmOptions" class="code" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Xcharts } from '@/utils/xcharts'
import _ from 'lodash'
import Echarts from 'echarts'
import codemirror from '@/mixins/codemirror'
import ecStat from 'echarts-stat'
import {
  ecStatData,
  rows,
  legendData,
  effectChartRows
} from '@/utils/xcharts/data/scatter'
export default {
  name: 'Pie',
  mixins: [codemirror],
  data() {
    return {
      dialogVisible: false,
      items: [
        {
          title: '散点图',
          code: `this.chart0 = new Xcharts('chart0', 'scatter').setData()`
        },
        {
          title: '多纬度散点图',
          code: `this.chart1 = new Xcharts('chart1', 'scatter', this.opt).setData({
  legendData,
  rows
})
var myRegression = ecStat.regression('logarithmic', ecStatData)
myRegression.points.sort(function(a, b) {
  return a[0] - b[0]
})`
        },
        {
          title: 'Logarithmic 散点图',
          code: `this.chart2 = new Xcharts('chart2', 'scatter', this.opt).setData({
  ecStat: {
    data: [
      {
        coord: myRegression.points[myRegression.points.length - 1]
      }
    ],
    formula: ecStat.regression('logarithmic', ecStatData)
  },
  legendData,
  rows
})`
        },
        {
          title: 'Effect Scatter 散点图',
          code: `this.chart3 = new Xcharts('chart3', 'scatter', {
  xAxis: {
    scale: true
  },
  yAxis: {
    scale: true
  },
  series: [
    {
      type: 'effectScatter',
      symbolSize: 10
    },
    {
      type: 'scatter'
    }
  ]
}).setData({
  legendData: ['特征点', '测试数据'],
  rows: effectChartRows
})`
        }
      ],
      codeView: '',
      chart0: null,
      chart1: null,
      chart2: null,
      chart3: null,
      opt: {
        series: [
          {
            symbolSize: function(data) {
              // xex 特殊说明
              // 1e1=10    2e1=20
              // 1e2=100    2e2=200
              return Math.sqrt(data[2]) / 8e2
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[3]
                },
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                color: new Echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(251, 118, 123)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(204, 46, 72)'
                  }
                ])
              }
            }
          },
          {
            symbolSize: function(data) {
              // xex 特殊说明
              // 1e1=10    2e1=20
              // 1e2=100    2e2=200
              return Math.sqrt(data[2]) / 8e2
            },
            label: {
              emphasis: {
                show: true,
                formatter: function(param) {
                  return param.data[3]
                },
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new Echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                  {
                    offset: 0,
                    color: 'rgb(129, 227, 238)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(25, 183, 207)'
                  }
                ])
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.renderCharts()
    this.chartResize()
  },
  methods: {
    renderCharts() {
      // 图一
      this.chart0 = new Xcharts('chart0', 'scatter').setData()
      // 图二
      this.chart1 = new Xcharts('chart1', 'scatter', this.opt).setData({
        legendData,
        rows
      })
      var myRegression = ecStat.regression('logarithmic', ecStatData)
      myRegression.points.sort(function(a, b) {
        return a[0] - b[0]
      })
      // 图三
      this.chart2 = new Xcharts('chart2', 'scatter', this.opt).setData({
        ecStat: {
          data: [
            {
              coord: myRegression.points[myRegression.points.length - 1]
            }
          ],
          formula: ecStat.regression('logarithmic', ecStatData)
        },
        legendData,
        rows
      })
      // 图四
      this.chart3 = new Xcharts('chart3', 'scatter', {
        xAxis: {
          scale: true
        },
        yAxis: {
          scale: true
        },
        series: [
          {
            type: 'effectScatter',
            symbolSize: 10
          },
          {
            type: 'scatter'
          }
        ]
      }).setData({
        legendData: ['特征点', '测试数据'],
        rows: effectChartRows
      })
    },
    openDialog(i) {
      this.codeView = this.items[i].code
      this.dialogVisible = true
    },
    chartResize() {
      this.handlerResize = _.debounce(() => {
        this.chart0.chart && this.chart0.chart.resize()
        this.chart1.chart && this.chart1.chart.resize()
        this.chart2.chart && this.chart2.chart.resize()
        this.chart3.chart && this.chart3.chart.resize()
      })
      window.addEventListener('resize', this.handlerResize)
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', this.handlerResize)
        this.chart0.chart && this.chart0.chart.dispose()
        this.chart1.chart && this.chart1.chart.dispose()
        this.chart2.chart && this.chart2.chart.dispose()
        this.chart3.chart && this.chart3.chart.dispose()
      })
    }
  }
}
</script>
