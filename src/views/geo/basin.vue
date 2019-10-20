<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>9大流域地图</span>
      </div>
      <div class="text item">
        <div id="basin-map" style="width:100%;height:800px" />
      </div>
    </el-card>
  </el-main>
</template>

<script>
import { Xcharts } from '@/utils/xcharts'
import _ from 'lodash'
import { LIU_YU } from '@/utils/xcharts/data/map/provinceMapData'

export default {
  data() {
    return {
      basinMap: null
    }
  },
  mounted() {
    // 地图实例化
    this.basinMap = new Xcharts('basin-map', 'map', {
      visualMap: {
        inRange: {
          color: ['#e4f2dc', '#cde8bc', '#a3ea77', '#90d764', '#68b837']
        }
      }
    })
    this.basinMap.Echarts.registerMap(
      'china',
      require('@/utils/xcharts/data/map/ly.min.json')
    )
    // 传入数据渲染
    this.basinMap.setData({
      visualMap: [0, 1000],
      rows: Array.from({ length: LIU_YU.length }, (_, index) => {
        return {
          name: LIU_YU[index],
          value: Math.floor(Math.random() * 1000) + 1
        }
      })
    })
    this.handlerResize = _.debounce(() => {
      this.basinMap.chart && this.basinMap.chart.resize()
    })
    // 添加 resize 事件
    window.addEventListener('resize', this.handlerResize)
    // 移除事件
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.handlerResize)
      this.basinMap.chart && this.basinMap.chart.dispose()
      this.basinMap = null
    })
  }
}
</script>

<style>
</style>
