<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>中国地图</span>
      </div>
      <div class="text item">
        <div id="china-map" style="width:100%;height:800" />
      </div>
    </el-card>
  </el-main>
</template>

<script>
import { Xcharts } from '@/utils/xcharts'
import _ from 'lodash'

export default {
  data() {
    return {
      chinaMap: null
    }
  },
  mounted() {
    // 地图实例化
    this.chinaMap = new Xcharts('china-map', 'map')
    // 载入中国地图json
    this.chinaMap.Echarts.registerMap(
      'china',
      require('@/utils/xcharts/data/map/china.json')
    )
    // 传入数据渲染
    this.chinaMap.setData()
    this.handlerResize = _.debounce(() => {
      this.chinaMap.chart && this.chinaMap.chart.resize()
    })
    // 添加 resize 事件
    window.addEventListener('resize', this.handlerResize)
    // 移除事件
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.handlerResize)
      this.chinaMap.chart && this.chinaMap.chart.dispose()
      this.chinaMap = null
    })
  }
}
</script>

<style>
</style>
