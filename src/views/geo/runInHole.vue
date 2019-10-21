<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>省市区三级下钻</span>
        <div class="map-crumb">
          <div class="item" v-for="(item, index) in mapCrumb" :key="index" @click="crumbEvent(index)">
            <span>{{item.name}}</span>
            <i class="el-icon-arrow-right" v-if="index<2"/>
          </div>
        </div>
      </div>
      <div class="content">
        <div id="china-map" style="width:100%;height:800px" />
      </div>
    </el-card>
  </el-main>
</template>
<style lang="scss">
.map-crumb {
  float:right;
  .item {
    display: inline-block;
    cursor: pointer;
    span{
        display: inline-block;
        border-bottom: 2px solid #409eff;
        padding: 0 10px 4px;
    }
  }
}
</style>

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
      mapName: 'china',
      // 地图下钻的等级
      zMapLevel: 0,
      // 地图资源 json
      sourceJson: [],
      // 将 index 和 this.dataKey 关联
      dataKey : {
        0: 'china',
        1: 'MAP_PROVINCES',
        2: 'MAP_CITY',
      },
      mapCrumb: [
        {
          name: '全国',
        }
      ]
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
    // 初始化地图实例
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
      this.loadMapJson()
    },
    // 渲染地图
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
      })
    },
    // 动态加载地图 json 资源
    loadMapJson() {
        // 通过 data传入的name 匹配获得 require 的文件 name
        if (this.mapName === 'china') {
          this.sourceJson[0] = require('@/utils/xcharts/data/map/china.json')
          this.zMapLevel = 0
        } else if (this.mapName in MAP_PROVINCES) {
          const temp = MAP_PROVINCES[this.mapName][0]
          this.sourceJson[1] = require(`@/utils/xcharts/data/map/province/${temp}.json`)
          this.zMapLevel = 1
        } else if (this.mapName in MAP_CITY) {
          const temp = MAP_CITY[this.mapName]
          this.sourceJson[2] = require(`@/utils/xcharts/data/map/city/${temp}.json`)
          this.zMapLevel = 2
        } else {
          // 没有地图资源，钻不动了
          return true
        }
        this.chinaMap.Echarts.registerMap(this.mapName, this.sourceJson[this.zMapLevel])
    },
    // 地图事件
    mapEvent(v) {
      this.chinaMap.chart.on('click', data => {
        this.mapName = data.name
        if(this.loadMapJson()){
          return 
        }
        this.mapCrumb.push({
          name: data.name
        })
        // mock 数据渲染地图
        const currentMapItem = []
        this.sourceJson[this.zMapLevel].features.forEach(v => {
          currentMapItem.push(v.properties.name)
        })
        
        const params = {
          visualMap: [0, 1000],
          map: this.mapName,
          rows: Array.from(
            { length: Object.keys(this.dataKey[this.zMapLevel]).length },
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
    },
    // 面包屑导航事件
    crumbEvent(index) {
      this.mapName = !index ? 'china' : this.mapCrumb[index].name
      this.mapCrumb.splice(index + 1, this.mapCrumb.length - 1)
      this.zMapLevel = index
      this.chinaMap.Echarts.registerMap(this.mapName, this.sourceJson[this.zMapLevel])
      // mock 数据渲染地图
      const currentMapItem = []
      this.sourceJson[this.zMapLevel].features.forEach(v => {
        currentMapItem.push(v.properties.name)
      })
      const params = {
          visualMap: [0, 1000],
          map: this.mapName,
          rows: Array.from(
            { length: this.dataKey[this.zMapLevel] === 'china' ? currentMapItem.length : Object.keys(this.dataKey[this.zMapLevel]).length },
            (_, index) => {
              return {
                name: currentMapItem[index],
                value: Math.floor(Math.random() * 1000) + 1
              }
            }
          )
        }
      this.renderChart(params)
    }
  }
}
</script>

<style>
</style>
