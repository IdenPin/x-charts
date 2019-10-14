<template>
  <div class="home">
    <h1>X · Charts</h1>
    <div ref="line" style="width: 400px;height:300px" />
  </div>
</template>
<script>
export default {
  name: 'Home',
  mounted() {
    this.renderCharts()
  },
  methods: {
    renderCharts() {
      this.$charts.init(this.$refs['line']).setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }
        ]
      })
    }
  }
}
</script>
