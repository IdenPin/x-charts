# x-charts ![https://travis-ci.com/IdenPin/x-charts.svg?branch=master](https://travis-ci.com/IdenPin/x-charts.svg?branch=master) ![https://img.shields.io/github/license/IdenPin/x-charts](https://img.shields.io/github/license/IdenPin/x-charts)

## 特性

- 0 配置（简化繁琐的 options 配置）
- 可以针对项目提取共用的 default options
- 将 options 和 data 分离

## 使用方法

`npm i @pdeng/x-charts'

new Xcharts(el: HTMLDivElement, type?: String, options?: Object).setData(data?: {rows:? Array, columns?: Array, legendData?: Array})

- `new Xcharts(el: HTMLDivElement, type?: String).setData()`
  el, type 为必填字段，setData 不传默认使用预置 mock 数据

- `new Xcharts(el: HTMLDivElement, type?: String, options?: Object).setData(data)`
  data 中 rows 表示图表的纬度
  options 选传字段，默认使用预置的 default options。可以根据自己项目情况抽离出一份自己的 default options

**注意** : 目前支持的 type 类型有 `line | bar | pie | radar | scatter | map`，项目续更新中

```js
// 使用预置 options
<template>
  <div>
    <div id="chart0" style="width:100%;heigth:300px" />
  </div>
</template>
<script>
import { Xcharts } from '@/utils/xcharts'
export default {
  mounted() {
    new Xcharts('chart0', 'line').setData()
  }
}
</script>

// 自定义 options
<template>
  <div>
    <div id="chart0" style="width:100%;heigth:300px" />
  </div>
</template>
<script>
import { Xcharts } from '@/utils/xcharts'
export default {
  data() {
    return {
      legendData: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      columns: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 548, name: '搜索引擎' }
      ]
    }
  },
  mounted() {
    this.chart0 = new Xcharts('chart0', 'pie', {
      series: [
        {
          radius: [0, '70%'],
          roseType: 'radius'
        }
      ]
    }).setData({
      legendData: this.legendData,
      columns: this.columns
    })
  }
}
```

**演示地址**: https://idenpin.github.io/x-charts/dist

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
