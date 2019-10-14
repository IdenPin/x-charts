export const DEFAULT_COLORS = [
  '#19d4ae',
  '#5ab1ef',
  '#fa6e86',
  '#ffb980',
  '#0067a6',
  '#c4b4e4',
  '#d87a80',
  '#9cbbff',
  '#d9d0c7',
  '#87a997',
  '#d49ea2',
  '#5b4947',
  '#7ba3a8'
]

export const LINE_TEXT_COLOR = {
  textStyle: '#666',
  lineStyle: '#EBECF0'
}

export const HEAT_MAP_COLOR = [
  '#313695',
  '#4575b4',
  '#74add1',
  '#abd9e9',
  '#e0f3f8',
  '#ffffbf',
  '#fee090',
  '#fdae61',
  '#f46d43',
  '#d73027',
  '#a50026'
]

export const itemPoint = color => {
  return [
    '<span style="',
    `background-color:${color};`,
    'display: inline-block;',
    'width: 10px;',
    'height: 10px;',
    'border-radius: 50%;',
    'margin-right:2px;',
    '"></span>'
  ].join('')
}

export const ECHARTS_SETTINGS = [
  'grid',
  'dataZoom',
  'visualMap',
  'toolbox',
  'title',
  'legend',
  'xAxis',
  'yAxis',
  'radar',
  'tooltip',
  'axisPointer',
  'brush',
  'geo',
  'timeline',
  'graphic',
  'series',
  'backgroundColor',
  'textStyle'
]

export const DEFAULT_THEME = {
  //   categoryAxis: {
  //     axisLine: { show: false },
  //     axisTick: { show: false },
  //     splitLine: { show: false }
  //   },
  //   valueAxis: {
  //     axisLine: { show: false }
  //   },
  line: {
    smooth: true
  },
  color: DEFAULT_COLORS,
  tooltip: {
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 0,
    padding: [5, 12, 5, 12],
    textStyle: {
      color: '#fff',
      fontSize: 14
    },
    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
  },
  grid: {
    left: 10,
    top: 30,
    right: 10,
    bottom: 0,
    containLabel: true
  },
  legend: {
    textStyle: {
      color: '#666',
      fontSize: 12
    },
    right: 0,
    icon: 'rect',
    itemWidth: 20,
    itemHeight: 10,
    itemGap: 10
  }
}
