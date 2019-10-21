<template>
  <el-main>
    <el-card>
      <div slot="header" class="clearfix">
        <span>城市群选择</span>
        <el-select
          v-model="areaCityValue"
          style="float: right; margin: -5px 0"
          @change="areaChangeFn"
        >
          <el-option
            v-for="(item,index) in areaCityList"
            :key="index"
            :value="item.value"
            :label="item.title"
          >{{ item.title }}</el-option>
        </el-select>
      </div>
      <div class="content">
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
      cityMap: null,
      areaCityValue: 0,
      areaCityList: [
        {
          value: 0,
          title: '全国',
          centerPos: [100.97, 35.71]
        },
        {
          value: 1,
          title: '京津冀2+26',
          centerPos: [115, 37]
        },
        {
          value: 2,
          title: '汾渭平原',
          centerPos: [109.7864, 35.0299]
        },
        {
          value: 3,
          title: '长三角',
          centerPos: [120, 29.8773]
        },
        {
          value: 4,
          title: '长江经济带',
          centerPos: [105, 28]
        },
        {
          value: 5,
          title: '环渤海经济带',
          centerPos: [119, 38]
        }
      ]
    }
  },
  computed: {
    // 动态计算地图中心点坐标
    centerCoord: function() {
      const [{ centerPos }] = this.areaCityList.filter(
        v => v.value === this.areaCityValue
      )
      return centerPos
    }
  },
  mounted() {
    this.initChart()
    this.renderChart({
      visualMap: [0, 1000],
      center: this.centerCoord,
      zoom: 1,
      rows: Array.from({ length: Object.keys(MAP_CITY).length }, (_, index) => {
        return {
          name: Object.keys(MAP_CITY)[index],
          value: 0
          // value: Math.floor(Math.random() * 1000) + 1
        }
      })
    })
  },
  methods: {
    initChart() {
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
      // 注入地图 json
      this.cityMap.Echarts.registerMap(
        'china',
        require('@/utils/xcharts/data/map/allCity.min.json')
      )
    },
    renderChart(data) {
      // 载入中国地图json
      // 传入数据渲染
      this.cityMap.setData(data)
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
    },
    areaChangeFn(v) {
      this.renderChart({
        visualMap: [0, 1000],
        center: this.centerCoord,
        zoom: !v ? 1 : 5,
        rows: Array.from(
          { length: Object.keys(MAP_CITY).length },
          (_, index) => {
            return {
              name: Object.keys(MAP_CITY)[index],
              value: Math.floor(Math.random() * 1000) + 1
            }
          }
        )
      })
    }
  }
}
</script>

<style>
</style>
