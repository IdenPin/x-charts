<template>
  <div class="home">
    <h1>X · Charts</h1>
    <div id="chart1" style="width: 400px;height:300px" />
  </div>
</template>
<script>
import { Xcharts } from '@/utils/xcharts'
export default {
  name: 'Home',
  mounted() {
    this.renderCharts()
  },
  methods: {
    renderCharts() {
      const biz = new Xcharts('chart1', 'line')
      biz.setData({
        lData: ['企业数'],
        xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        sData: [820, 932, 901, 934, 1290, 1330, 1320]
      })
      console.log('biz', biz)
    }
  }
}
</script>
