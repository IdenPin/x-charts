<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>城市框选</span>
      </div>
      <div class="text item">
        <div id="city-map" style="width:100%;height:800px" />
      </div>
    </el-card>
  </el-main>
</template>

<script>
import { Xcharts } from '@/utils/xcharts'
import _ from 'lodash'
import { MAP_CITY } from '@/utils/xcharts/data/map/provinceMapData'

export default {
  data() {
    return {
      cityMap: null
    }
  },
  mounted() {
    // 地图实例化
    this.cityMap = new Xcharts('city-map', 'map', {
      series: [
        {
          label: {
            normal: {
              show: false
            }
          }
        }
      ]
    })
    // 载入中国地图json
    this.cityMap.Echarts.registerMap(
      'china',
      require('@/utils/xcharts/data/map/allCity.min.json')
    )
    // 传入数据渲染
    this.cityMap.setData({
      visualMap: [0, 1000],
      rows: Array.from({ length: Object.keys(MAP_CITY).length }, (_, index) => {
        return {
          name: Object.keys(MAP_CITY)[index],
          value: Math.floor(Math.random() * 1000) + 1
        }
      })
    })
    this.handlerResize = _.debounce(() => {
      this.cityMap.chart && this.cityMap.chart.resize()
    })
    // 添加 resize 事件
    window.addEventListener('resize', this.handlerResize)
    // 移除事件
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.handlerResize)
      this.cityMap.chart && this.cityMap.chart.dispose()
      this.cityMap = null
    })
  }
}
</script>

<style>
</style>
