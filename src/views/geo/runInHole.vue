<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>省市区三级下钻</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="openDialog(i)">查看源码</el-button>
      </div>
      <div class="text item">
        <div id="china-map" style="width:100%;height:800px" />
      </div>
    </el-card>
  </el-main>
</template>

<script>
// import { Xcharts } from '@/utils/xcharts'
// import ChinaJSON from '@/utils/xcharts/data/map/china.json'

export default {
  data() {
    return {}
  },
  mounted() {
    // const chinaMap = new Xcharts('china-map', 'map')
    // axios.get('http://118.190.154.106/cdn/map/china.json').then(({ data }) => {
    // axios.get('http://118.190.154.106/cdn/map/china.json').then(({ data }) => {
    // chinaMap.Echarts.registerMap('china', ChinaJSON)
    // chinaMap.setData()
    // })
  }
}
</script>

<style>
</style>
