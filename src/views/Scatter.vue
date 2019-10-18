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
export default {
  name: 'Pie',
  mixins: [codemirror],
  data() {
    return {
      dialogVisible: false,
      items: [
        {
          title: '散点图',
          code: ''
        },
        {
          title: '多纬度散点图',
          code: ''
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
    this.chart0 = new Xcharts('chart0', 'scatter').setData()
    this.chart1 = new Xcharts('chart1', 'scatter', {
      symbolSize: function(data) {
        return Math.sqrt(data[2]) / 5e2
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
      },
      backgroundColor: new Echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
        {
          offset: 0,
          color: '#f7f8fa'
        },
        {
          offset: 1,
          color: '#cdd0d5'
        }
      ])
    }).setData({
      legendData: ['1990', '2015'],
      rows: [
        [
          [28604, 77, 17096869, 'Australia', 1990],
          [31163, 77.4, 27662440, 'Canada', 1990],
          [1516, 68, 1154605773, 'China', 1990],
          [13670, 74.7, 10582082, 'Cuba', 1990],
          [28599, 75, 4986705, 'Finland', 1990],
          [29476, 77.1, 56943299, 'France', 1990],
          [31476, 75.4, 78958237, 'Germany', 1990],
          [28666, 78.1, 254830, 'Iceland', 1990],
          [1777, 57.7, 870601776, 'India', 1990],
          [29550, 79.1, 122249285, 'Japan', 1990],
          [2076, 67.9, 20194354, 'North Korea', 1990],
          [12087, 72, 42972254, 'South Korea', 1990],
          [24021, 75.4, 3397534, 'New Zealand', 1990],
          [43296, 76.8, 4240375, 'Norway', 1990],
          [10088, 70.8, 38195258, 'Poland', 1990],
          [19349, 69.6, 147568552, 'Russia', 1990],
          [10670, 67.3, 53994605, 'Turkey', 1990],
          [26424, 75.7, 57110117, 'United Kingdom', 1990],
          [37062, 75.4, 252847810, 'United States', 1990]
        ],
        [
          [44056, 81.8, 23968973, 'Australia', 2015],
          [43294, 81.7, 35939927, 'Canada', 2015],
          [13334, 76.9, 1376048943, 'China', 2015],
          [21291, 78.5, 11389562, 'Cuba', 2015],
          [38923, 80.8, 5503457, 'Finland', 2015],
          [37599, 81.9, 64395345, 'France', 2015],
          [44053, 81.1, 80688545, 'Germany', 2015],
          [42182, 82.8, 329425, 'Iceland', 2015],
          [5903, 66.8, 1311050527, 'India', 2015],
          [36162, 83.5, 126573481, 'Japan', 2015],
          [1390, 71.4, 25155317, 'North Korea', 2015],
          [34644, 80.7, 50293439, 'South Korea', 2015],
          [34186, 80.6, 4528526, 'New Zealand', 2015],
          [64304, 81.6, 5210967, 'Norway', 2015],
          [24787, 77.3, 38611794, 'Poland', 2015],
          [23038, 73.13, 143456918, 'Russia', 2015],
          [19360, 76.5, 78665830, 'Turkey', 2015],
          [38225, 81.4, 64715810, 'United Kingdom', 2015],
          [53354, 79.1, 321773631, 'United States', 2015]
        ]
      ]
    })
    // this.renderCharts()
    // this.chartResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', null)
    this.chart0.chart && this.chart0.chart.dispose()
    this.chart1.chart && this.chart1.chart.dispose()
    this.chart2.chart && this.chart2.chart.dispose()
    this.chart3.chart && this.chart3.chart.dispose()
  },
  methods: {
    renderCharts() {
      const legendData = ['直接访问', '联盟广告', '视频广告', '搜索引擎']
      const columns = [
        { value: 335, name: '直接访问' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 548, name: '搜索引擎' }
      ]
      // 图1
      this.chart0 = new Xcharts('chart0', 'pie').setData({
        legendData: ['邮件营销', '联盟广告'],
        columns: [
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' }
        ]
      })
      // 图2
      this.chart1 = new Xcharts('chart1', 'pie', {
        series: [
          {
            radius: ['30%', '85%'],
            selectedMode: 'single'
          }
        ]
      }).setData({
        legendData,
        columns
      })
      // 图3
      this.chart2 = new Xcharts('chart2', 'pie', {
        series: [
          {
            radius: [0, '70%'],
            roseType: 'radius'
          }
        ]
      }).setData({
        legendData,
        columns
      })
      // 图4
      this.chart3 = new Xcharts('chart3', 'pie', {
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['60%', '80%']
          },
          {
            name: '访问来源',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '45%']
          }
        ]
      }).setData({
        legendData,
        columns: [columns, columns]
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
