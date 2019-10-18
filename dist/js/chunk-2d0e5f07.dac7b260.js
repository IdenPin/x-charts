(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e5f07"],{"972e":function(a,e,t){"use strict";t.r(e);var n=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"pie-chart"},[t("el-main",a._l(a.items,(function(e,n){return t("el-card",{key:n,staticStyle:{margin:"1%","box-sizing":"border-box",width:"48%",float:"left"}},[t("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[t("span",[a._v(a._s(e.title))]),t("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:function(e){return a.openDialog(n)}}},[a._v("查看源码")])],1),t("div",{staticClass:"text item"},[t("div",{staticStyle:{width:"100%",height:"300px"},attrs:{id:"chart"+n}})])])})),1),t("el-dialog",{attrs:{title:"源码查看",visible:a.dialogVisible,width:"80%"},on:{"update:visible":function(e){a.dialogVisible=e}}},[t("codemirror",{staticClass:"code",attrs:{options:a.cmOptions},model:{value:a.codeView,callback:function(e){a.codeView=e},expression:"codeView"}}),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){a.dialogVisible=!1}}},[a._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(e){a.dialogVisible=!1}}},[a._v("确 定")])],1)],1)],1)},r=[],i=t("e352"),s=t("2ef0"),l=t.n(s),c=t("4781"),o=t("ed08"),h={name:"Radar",mixins:[c["a"]],data:function(){return{dialogVisible:!1,items:[{title:"雷达图",code:"this.chart0 = new Xcharts('chart0', 'radar', {\n  radar: {\n    shape: 'circle'\n  },\n  series: [\n    {\n      radius: ['30%', '85%'],\n      selectedMode: 'single'\n    }\n  ]\n}).setData({\n  legendData: ['实际开销'],\n  columns: [\n    {\n      value: MockData.array(5, [8000, 10500]),\n      name: '实际开销'\n    }\n  ],\n  rows: [\n    { name: '销售（sales）', max: 20000 },\n    { name: '管理（Administration）', max: 25000 },\n    { name: '客服（Customer', max: 20000 },\n    { name: '研发（Development）', max: 25000 },\n    { name: '市场（Marketing）', max: 25000 }\n  ]\n})"},{title:"circle 雷达图",code:"this.chart1 = new Xcharts('chart1', 'radar').setData()"},{title:"areaStyle 雷达图",code:"this.chart2 = new Xcharts('chart2', 'radar', {\n  series: [\n    {\n      areaStyle: {\n        normal: {}\n      }\n    }\n  ]\n}).setData({\n  legendData: ['预算', '开销'],\n  columns: [\n    {\n      value: MockData.array(5, [10000, 20000]),\n      name: '预算'\n    },\n    {\n      value: MockData.array(5, [5000, 17500]),\n      name: '开销'\n    }\n  ],\n  rows: [\n    { name: '销售（sales）', max: 20000 },\n    { name: '管理（Administration）', max: 25000 },\n    { name: '客服（Customer', max: 20000 },\n    { name: '研发（Development）', max: 25000 },\n    { name: '市场（Marketing）', max: 25000 }\n  ]\n})"},{title:"多维度雷达图",code:"this.chart3 = new Xcharts('chart3', 'radar', {\nvisualMap: {\n  top: 'middle',\n  right: 10,\n  color: ['red', 'yellow'],\n  calculable: true\n},\nseries: [\n  {\n    name: '访问来源',\n    type: 'radar',\n    symbol: 'none',\n    lineStyle: {\n      width: 1\n    },\n    emphasis: {\n      areaStyle: {\n        color: 'rgba(0,250,0,0.3)'\n      }\n    }\n  }\n]\n}).setData({\nlegendData: (() => {\n  const list = []\n  for (let i = 1; i <= 18; i++) {\n    list.push(i + 2000 + '')\n  }\n  return list\n})(),\ncolumns: (() => {\n  const columns = []\n  for (let i = 1; i <= 18; i++) {\n    columns.push({\n      value: [\n        (40 - i) * 10,\n        (38 - i) * 4 + 60,\n        i * 5 + 10,\n        i * 9,\n        (i * i) / 2\n      ],\n      name: i + 2000 + ''\n    })\n  }\n  return columns\n})(),\nrows: [\n  { text: 'IE8-', max: 400 },\n  { text: 'IE9+', max: 400 },\n  { text: 'Safari', max: 400 },\n  { text: 'Firefox', max: 400 },\n  { text: 'Chrome', max: 400 }\n]\n})"}],codeView:"",chart0:null,chart1:null,chart2:null,chart3:null}},mounted:function(){this.renderCharts(),this.chartResize()},beforeDestroy:function(){window.removeEventListener("resize",null),this.chart0.chart&&this.chart0.chart.dispose(),this.chart1.chart&&this.chart1.chart.dispose(),this.chart2.chart&&this.chart2.chart.dispose(),this.chart3.chart&&this.chart3.chart.dispose()},methods:{renderCharts:function(){this.chart0=new i["a"]("chart0","radar",{radar:{shape:"circle"},series:[{radius:["30%","85%"],selectedMode:"single"}]}).setData({legendData:["实际开销"],columns:[{value:o["a"].array(5,[8e3,10500]),name:"实际开销"}],rows:[{name:"销售（sales）",max:2e4},{name:"管理（Administration）",max:25e3},{name:"客服（Customer",max:2e4},{name:"研发（Development）",max:25e3},{name:"市场（Marketing）",max:25e3}]}),this.chart1=new i["a"]("chart1","radar").setData(),this.chart2=new i["a"]("chart2","radar",{series:[{areaStyle:{normal:{}}}]}).setData({legendData:["预算","开销"],columns:[{value:o["a"].array(5,[1e4,2e4]),name:"预算"},{value:o["a"].array(5,[5e3,17500]),name:"开销"}],rows:[{name:"销售（sales）",max:2e4},{name:"管理（Administration）",max:25e3},{name:"客服（Customer",max:2e4},{name:"研发（Development）",max:25e3},{name:"市场（Marketing）",max:25e3}]}),this.chart3=new i["a"]("chart3","radar",{visualMap:{top:"middle",right:10,color:["red","yellow"],calculable:!0},series:[{name:"访问来源",type:"radar",symbol:"none",lineStyle:{width:1},emphasis:{areaStyle:{color:"rgba(0,250,0,0.3)"}}}]}).setData({legendData:function(){for(var a=[],e=1;e<=18;e++)a.push(e+2e3+"");return a}(),columns:function(){for(var a=[],e=1;e<=18;e++)a.push({value:[10*(40-e),4*(38-e)+60,5*e+10,9*e,e*e/2],name:e+2e3+""});return a}(),rows:[{text:"IE8-",max:400},{text:"IE9+",max:400},{text:"Safari",max:400},{text:"Firefox",max:400},{text:"Chrome",max:400}]})},openDialog:function(a){this.codeView=this.items[a].code,this.dialogVisible=!0},chartResize:function(){var a=this;window.addEventListener("resize",l.a.debounce((function(){a.chart0.chart&&a.chart0.chart.resize(),a.chart1.chart&&a.chart1.chart.resize(),a.chart2.chart&&a.chart2.chart.resize(),a.chart3.chart&&a.chart3.chart.resize()})))}}},m=h,d=t("2877"),u=Object(d["a"])(m,n,r,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0e5f07.dac7b260.js.map