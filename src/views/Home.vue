<template>
  <div class="home">
    <h1>X · Charts</h1>
    <div id="chart1" style="width: 100%;height:300px" />
    <div id="chart2" style="width: 100%;height:300px" />
    <div id="chart3" style="width: 100%;height:300px" />
  </div>
</template>
<script>
import { MockData } from '@/utils'
import { Xcharts } from '@/utils/xcharts'
export default {
  name: 'Home',
  mounted() {
    this.renderCharts()
  },
  methods: {
    renderCharts() {
      new Xcharts('chart1', 'line').setData({
        legendData: ['企业数'],
        columns: MockData.date(30, 'day'),
        rows: MockData.array(30)
      })
      new Xcharts('chart2', 'bar').setData({
        legendData: ['企业数', '工人数'],
        columns: MockData.date(12, 'month'),
        rows: [MockData.array(12), MockData.array(12)]
      })
      new Xcharts('chart3', 'bar').setData({
        legendData: ['比率', '余额', '年龄'],
        columns: MockData.date(5, 'week'),
        rows: [MockData.array(5), MockData.array(5), MockData.array(5)]
      })
    }
  }
}
</script>
