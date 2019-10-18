<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-17 09:59:49
 * @LastEditTime: 2019-10-18 10:22:29
 * @LastEditors: Please set LastEditors
 -->
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
import codemirror from '@/mixins/codemirror'
export default {
  name: 'Pie',
  mixins: [codemirror],
  data() {
    return {
      dialogVisible: false,
      items: [
        {
          title: '普通饼图',
          code: `const legendData = [
  '直接访问',
  '邮件营销',
  '联盟广告',
  '视频广告',
  '搜索引擎'
]
const columns = [
  { value: 335, name: '直接访问' },
  { value: 310, name: '邮件营销' },
  { value: 234, name: '联盟广告' },
  { value: 135, name: '视频广告' },
  { value: 548, name: '搜索引擎' }
]
// 图1
this.chart0 = new Xcharts('chart0', 'pie').setData({
  legendData: [
    '直接访问',
    '邮件营销',
    '联盟广告',
    '视频广告',
    '搜索引擎'
  ],
  columns: [
    { value: 335, name: '直接访问' },
    { value: 310, name: '邮件营销' },
    { value: 234, name: '联盟广告' },
    { value: 135, name: '视频广告' },
    { value: 1548, name: '搜索引擎' }
  ]
})`
        },
        {
          title: '圆环图',
          code: `this.chart1 = new Xcharts('chart1', 'pie', {
  series: [
    {
      radius: ['30%', '85%'],
      selectedMode: 'single'
    }
  ]
}).setData({
  legendData,
  columns
})`
        },
        {
          title: 'roseType图',
          code: `this.chart2 = new Xcharts('chart2', 'pie', {
  series: [
    {
      radius: [0, '70%'],
      roseType: 'radius'
    }
  ]
}).setData({
  legendData,
  columns
})`
        },
        {
          title: '嵌套饼图',
          code: `this.chart3 = new Xcharts('chart3', 'pie', {
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
