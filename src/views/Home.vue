<template>
  <div class="home">
    <h1 style="text-align:center">X · Charts</h1>
    <el-main>
      <el-card v-for="(v,i) in items" :key="i" style="margin-bottom:30px">
        <div slot="header" class="clearfix">
          <span>{{ v.title }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="openDialog(i)">查看源码</el-button>
        </div>
        <div class="text item">
          <div :id="`chart${i}`" style="width: 100%;height:300px" />
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
import { MockData } from '@/utils'
import { Xcharts } from '@/utils/xcharts'
import { codemirror } from 'vue-codemirror'
import _ from 'lodash'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/mode/javascript/javascript.js'
import Echarts from 'echarts'
export default {
  name: 'Home',
  components: {
    codemirror
  },
  data() {
    return {
      cmOptions: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        mode: 'text/javascript',
        theme: 'base16-light'
      },
      dialogVisible: false,
      items: [
        {
          title: '折线图',
          code: `new Xcharts('chart0', 'line').setData({
  legendData: ['企业数'],
  columns: MockData.date(30, 'day'),
  rows: MockData.array(30)
})`
        },
        {
          title: '面积堆叠图',
          code: `new Xcharts('chart1', 'line', {
  series: [
    {
      stack: '总量',
      areaStyle: {}
    }
  ]
}).setData({
  legendData: ['企业数', '工人数'],
  columns: MockData.date(12, 'month'),
  rows: [MockData.array(12), MockData.array(12)]
})`
        },
        {
          title: '柱状图',
          code: `new Xcharts('chart2', 'bar').setData({
  legendData: ['比率', '余额', '年龄'],
  columns: MockData.date(5, 'week'),
  rows: [MockData.array(5), MockData.array(5), MockData.array(5)]
})`
        },
        {
          title: '大数据量面积图',
          code: `const data = [Math.random() * 300]
for (let i = 1; i < 15000; i++) {
  data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
}
new Xcharts('chart3', 'line', {
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 10
    },
    {
      start: 0,
      end: 10,
      handleIcon:
        'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '80%',
      handleStyle: {
        color: '#fff',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
      }
    }
  ],
  series: [
    {
      symbol: 'none',
      sampling: 'average',
      itemStyle: {
        color: 'rgb(255, 70, 131)'
      },
      areaStyle: {
        color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 158, 68)'
          },
          {
            offset: 1,
            color: 'rgb(255, 70, 131)'
          }
        ])
      }
    }
  ]
}).setData({
  legendData: ['测试数据'],
  columns: MockData.dateTime('2010-3-1', 1500),
  rows: data
})`
        }
      ],
      codeView: '',
      chart0: null,
      chart1: null,
      chart2: null,
      chart3: null
    }
  },
  mounted() {
    this.renderCharts()
    this.chartResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize')
    this.chart0.chart && this.chart0.chart.dispose()
    this.chart1.chart && this.chart1.chart.dispose()
    this.chart2.chart && this.chart2.chart.dispose()
    this.chart3.chart && this.chart3.chart.dispose()
  },
  methods: {
    renderCharts() {
      // 图1
      this.chart0 = new Xcharts('chart0', 'line').setData({
        legendData: ['企业数'],
        columns: MockData.date(30, 'day'),
        rows: MockData.array(30)
      })
      // 图2
      this.chart1 = new Xcharts('chart1', 'line', {
        series: [
          {
            stack: '总量',
            areaStyle: {}
          }
        ]
      }).setData({
        legendData: ['企业数', '工人数'],
        columns: MockData.date(12, 'month'),
        rows: [MockData.array(12), MockData.array(12)]
      })
      // 图3
      this.chart2 = new Xcharts('chart2', 'bar').setData({
        legendData: ['比率', '余额', '年龄'],
        columns: MockData.date(5, 'week'),
        rows: [MockData.array(5), MockData.array(5), MockData.array(5)]
      })
      // 图4
      const data = [Math.random() * 300]
      for (let i = 1; i < 15000; i++) {
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]))
      }
      this.chart3 = new Xcharts('chart3', 'line', {
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series: [
          {
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }
              ])
            }
          }
        ]
      }).setData({
        legendData: ['测试数据'],
        columns: MockData.dateTime('2010-3-1', 1500),
        rows: data
      })
    },
    openDialog(i) {
      this.codeView = this.items[i].code
      this.dialogVisible = true
    },
    chartResize() {
      window.addEventListener(
        'resize',
        _.debounce(() => {
          this.chart0.chart && this.chart0.chart.resize()
          this.chart1.chart && this.chart1.chart.resize()
          this.chart2.chart && this.chart2.chart.resize()
          this.chart3.chart && this.chart3.chart.resize()
        })
      )
    }
  }
}
</script>
