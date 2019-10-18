<template>
  <div class="pie-chart">
    <el-main>
      <el-card
        v-for="(v,i) in items"
        :key="i"
        style="margin: 1%;box-sizing:border-box;width: 48%;float:left"
      >
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
import { Xcharts } from '@/utils/xcharts'
import _ from 'lodash'
import codemirror from '@/mixins/codemirror'
import { MockData } from '@/utils'
export default {
  name: 'Radar',
  mixins: [codemirror],
  data() {
    return {
      dialogVisible: false,
      items: [
        {
          title: '雷达图',
          code: `this.chart0 = new Xcharts('chart0', 'radar', {
  radar: {
    shape: 'circle'
  },
  series: [
    {
      radius: ['30%', '85%'],
      selectedMode: 'single'
    }
  ]
}).setData({
  legendData: ['实际开销'],
  columns: [
    {
      value: MockData.array(5, [8000, 10500]),
      name: '实际开销'
    }
  ],
  rows: [
    { name: '销售（sales）', max: 20000 },
    { name: '管理（Administration）', max: 25000 },
    { name: '客服（Customer', max: 20000 },
    { name: '研发（Development）', max: 25000 },
    { name: '市场（Marketing）', max: 25000 }
  ]
})`
        },
        {
          title: 'circle 雷达图',
          code: `this.chart1 = new Xcharts('chart1', 'radar').setData()`
        },
        {
          title: 'areaStyle 雷达图',
          code: `this.chart2 = new Xcharts('chart2', 'radar', {
  series: [
    {
      areaStyle: {
        normal: {}
      }
    }
  ]
}).setData({
  legendData: ['预算', '开销'],
  columns: [
    {
      value: MockData.array(5, [10000, 20000]),
      name: '预算'
    },
    {
      value: MockData.array(5, [5000, 17500]),
      name: '开销'
    }
  ],
  rows: [
    { name: '销售（sales）', max: 20000 },
    { name: '管理（Administration）', max: 25000 },
    { name: '客服（Customer', max: 20000 },
    { name: '研发（Development）', max: 25000 },
    { name: '市场（Marketing）', max: 25000 }
  ]
})`
        },
        {
          title: '多维度雷达图',
          code: `this.chart3 = new Xcharts('chart3', 'radar', {
visualMap: {
  top: 'middle',
  right: 10,
  color: ['red', 'yellow'],
  calculable: true
},
series: [
  {
    name: '访问来源',
    type: 'radar',
    symbol: 'none',
    lineStyle: {
      width: 1
    },
    emphasis: {
      areaStyle: {
        color: 'rgba(0,250,0,0.3)'
      }
    }
  }
]
}).setData({
legendData: (() => {
  const list = []
  for (let i = 1; i <= 18; i++) {
    list.push(i + 2000 + '')
  }
  return list
})(),
columns: (() => {
  const columns = []
  for (let i = 1; i <= 18; i++) {
    columns.push({
      value: [
        (40 - i) * 10,
        (38 - i) * 4 + 60,
        i * 5 + 10,
        i * 9,
        (i * i) / 2
      ],
      name: i + 2000 + ''
    })
  }
  return columns
})(),
rows: [
  { text: 'IE8-', max: 400 },
  { text: 'IE9+', max: 400 },
  { text: 'Safari', max: 400 },
  { text: 'Firefox', max: 400 },
  { text: 'Chrome', max: 400 }
]
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
    window.removeEventListener('resize', null)
    this.chart0.chart && this.chart0.chart.dispose()
    this.chart1.chart && this.chart1.chart.dispose()
    this.chart2.chart && this.chart2.chart.dispose()
    this.chart3.chart && this.chart3.chart.dispose()
  },
  methods: {
    renderCharts() {
      // 图1
      this.chart0 = new Xcharts('chart0', 'radar', {
        radar: {
          shape: 'circle'
        },
        series: [
          {
            radius: ['30%', '85%'],
            selectedMode: 'single'
          }
        ]
      }).setData({
        legendData: ['实际开销'],
        columns: [
          {
            value: MockData.array(5, [8000, 10500]),
            name: '实际开销'
          }
        ],
        rows: [
          { name: '销售（sales）', max: 20000 },
          { name: '管理（Administration）', max: 25000 },
          { name: '客服（Customer', max: 20000 },
          { name: '研发（Development）', max: 25000 },
          { name: '市场（Marketing）', max: 25000 }
        ]
      })
      // 图2
      this.chart1 = new Xcharts('chart1', 'radar').setData()

      // 图3
      this.chart2 = new Xcharts('chart2', 'radar', {
        series: [
          {
            areaStyle: {
              normal: {}
            }
          }
        ]
      }).setData({
        legendData: ['预算', '开销'],
        columns: [
          {
            value: MockData.array(5, [10000, 20000]),
            name: '预算'
          },
          {
            value: MockData.array(5, [5000, 17500]),
            name: '开销'
          }
        ],
        rows: [
          { name: '销售（sales）', max: 20000 },
          { name: '管理（Administration）', max: 25000 },
          { name: '客服（Customer', max: 20000 },
          { name: '研发（Development）', max: 25000 },
          { name: '市场（Marketing）', max: 25000 }
        ]
      })
      // 图4
      this.chart3 = new Xcharts('chart3', 'radar', {
        visualMap: {
          top: 'middle',
          right: 10,
          color: ['red', 'yellow'],
          calculable: true
        },
        series: [
          {
            name: '访问来源',
            type: 'radar',
            symbol: 'none',
            lineStyle: {
              width: 1
            },
            emphasis: {
              areaStyle: {
                color: 'rgba(0,250,0,0.3)'
              }
            }
          }
        ]
      }).setData({
        legendData: (() => {
          const list = []
          for (let i = 1; i <= 18; i++) {
            list.push(i + 2000 + '')
          }
          return list
        })(),
        columns: (() => {
          const columns = []
          for (let i = 1; i <= 18; i++) {
            columns.push({
              value: [
                (40 - i) * 10,
                (38 - i) * 4 + 60,
                i * 5 + 10,
                i * 9,
                (i * i) / 2
              ],
              name: i + 2000 + ''
            })
          }
          return columns
        })(),
        rows: [
          { text: 'IE8-', max: 400 },
          { text: 'IE9+', max: 400 },
          { text: 'Safari', max: 400 },
          { text: 'Firefox', max: 400 },
          { text: 'Chrome', max: 400 }
        ]
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
