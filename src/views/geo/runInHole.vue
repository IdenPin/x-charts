<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>省市区三级下钻</span>
      </div>
      <div class="content">
        <div id="china-map" style="width:100%;height:800px" />
      </div>
    </el-card>
  </el-main>
</template>

<script>
import { Xcharts } from '@/utils/xcharts'
import _ from 'lodash'
import {
  MAP_PROVINCES,
  MAP_CITY
} from '@/utils/xcharts/data/map/provinceMapData'
export default {
  data() {
    return {
      // xcharts instance
      chinaMap: null,
      // xcharts register map name
      mapName: '',
      // 地图下钻的等级
      zMapLevel: 1
    }
  },
  mounted() {
    this.initChart()
    this.renderChart({
      visualMap: [0, 1000],
      map: this.mapName,
      rows: Array.from(
        { length: Object.keys(MAP_PROVINCES).length },
        (_, index) => {
          return {
            name: Object.keys(MAP_PROVINCES)[index],
            value: Math.floor(Math.random() * 1000) + 1
          }
        }
      )
    })
    this.mapEvent()
  },
  methods: {
    initChart() {
      // 地图实例化
      this.chinaMap = new Xcharts('china-map', 'map', {
        series: [
          {
            label: {
              normal: {
                show: true
              }
            }
          }
        ]
      })
      // 注入地图 json
      this.mapName = 'china'
      this.chinaMap.Echarts.registerMap(
        this.mapName,
        require('@/utils/xcharts/data/map/china.json')
      )
    },
    renderChart(data) {
      // 传入数据渲染
      this.chinaMap.setData(data)
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
    },
    mapEvent(v) {
      this.chinaMap.chart.on('click', data => {
        this.mapName = data.name
        let sourceJson = ''
        // 通过 data传入的name 匹配获得 require 的文件 name
        if (this.mapName === 'china') {
          sourceJson = require('@/utils/xcharts/data/map/china.json')
          this.zMapLevel = 1
        } else if (this.mapName in MAP_PROVINCES) {
          const temp = MAP_PROVINCES[data.name][0]
          sourceJson = require(`@/utils/xcharts/data/map/province/${temp}.json`)
          this.zMapLevel = 2
        } else if (this.mapName in MAP_CITY) {
          const temp = MAP_CITY[data.name]
          sourceJson = require(`@/utils/xcharts/data/map/city/${temp}.json`)
          this.zMapLevel = 3
        } else {
          // 没有地图资源，钻不动了
          return
        }
        this.chinaMap.Echarts.registerMap(this.mapName, sourceJson)

        // mock 数据渲染地图
        const currentMapItem = []
        sourceJson.features.forEach(v => {
          currentMapItem.push(v.properties.name)
        })
        const dataKey = ['', 'MAP_PROVINCES', 'MAP_CITY']
        const params = {
          visualMap: [0, 1000],
          map: this.mapName,
          rows: Array.from(
            { length: Object.keys(dataKey[this.zMapLevel]).length },
            (_, index) => {
              return {
                name: currentMapItem[index],
                value: Math.floor(Math.random() * 1000) + 1
              }
            }
          )
        }
        this.renderChart(params)
      })
    }
  }
}
</script>

<style>
</style>
