(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e4a8d"],{"90bb":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pie-chart"},[a("el-main",e._l(e.items,(function(t,n){return a("el-card",{key:n,staticStyle:{margin:"1%","box-sizing":"border-box",width:"48%",float:"left"}},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[e._v(e._s(t.title))]),a("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"},on:{click:function(t){return e.openDialog(n)}}},[e._v("查看源码")])],1),a("div",{staticClass:"text item"},[a("div",{staticStyle:{width:"100%",height:"200px"},attrs:{id:"chart"+n}})])])})),1),a("el-dialog",{attrs:{title:"源码查看",visible:e.dialogVisible,width:"80%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("codemirror",{staticClass:"code",attrs:{options:e.cmOptions},model:{value:e.codeView,callback:function(t){e.codeView=t},expression:"codeView"}}),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("确 定")])],1)],1)],1)},i=[],s=a("e352"),r=a("2ef0"),c=a.n(r),l=a("4781"),o={name:"Pie",mixins:[l["a"]],data:function(){return{dialogVisible:!1,items:[{title:"普通饼图",code:"const legendData = [\n  '直接访问',\n  '邮件营销',\n  '联盟广告',\n  '视频广告',\n  '搜索引擎'\n]\nconst columns = [\n  { value: 335, name: '直接访问' },\n  { value: 310, name: '邮件营销' },\n  { value: 234, name: '联盟广告' },\n  { value: 135, name: '视频广告' },\n  { value: 548, name: '搜索引擎' }\n]\n// 图1\nthis.chart0 = new Xcharts('chart0', 'pie').setData({\n  legendData: [\n    '直接访问',\n    '邮件营销',\n    '联盟广告',\n    '视频广告',\n    '搜索引擎'\n  ],\n  columns: [\n    { value: 335, name: '直接访问' },\n    { value: 310, name: '邮件营销' },\n    { value: 234, name: '联盟广告' },\n    { value: 135, name: '视频广告' },\n    { value: 1548, name: '搜索引擎' }\n  ]\n})"},{title:"圆环图",code:"this.chart1 = new Xcharts('chart1', 'pie', {\n  series: [\n    {\n      radius: ['30%', '85%'],\n      selectedMode: 'single'\n    }\n  ]\n}).setData({\n  legendData,\n  columns\n})"},{title:"roseType图",code:"this.chart2 = new Xcharts('chart2', 'pie', {\n  series: [\n    {\n      radius: [0, '70%'],\n      roseType: 'radius'\n    }\n  ]\n}).setData({\n  legendData,\n  columns\n})"},{title:"嵌套饼图",code:"this.chart3 = new Xcharts('chart3', 'pie', {\n  series: [\n    {\n      name: '访问来源',\n      type: 'pie',\n      radius: ['60%', '80%']\n    },\n    {\n      name: '访问来源',\n      type: 'pie',\n      selectedMode: 'single',\n      radius: [0, '45%']\n    }\n  ]\n}).setData({\n  legendData,\n  columns: [columns, columns]\n})"}],codeView:"",chart0:null,chart1:null,chart2:null,chart3:null}},mounted:function(){this.renderCharts(),this.chartResize()},beforeDestroy:function(){window.removeEventListener("resize",null),this.chart0.chart&&this.chart0.chart.dispose(),this.chart1.chart&&this.chart1.chart.dispose(),this.chart2.chart&&this.chart2.chart.dispose(),this.chart3.chart&&this.chart3.chart.dispose()},methods:{renderCharts:function(){var e=["直接访问","邮件营销","联盟广告","视频广告","搜索引擎"],t=[{value:335,name:"直接访问"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"},{value:548,name:"搜索引擎"}];this.chart0=new s["a"]("chart0","pie").setData({legendData:["直接访问","邮件营销","联盟广告","视频广告","搜索引擎"],columns:[{value:335,name:"直接访问"},{value:310,name:"邮件营销"},{value:234,name:"联盟广告"},{value:135,name:"视频广告"},{value:1548,name:"搜索引擎"}]}),this.chart1=new s["a"]("chart1","pie",{series:[{radius:["30%","85%"],selectedMode:"single"}]}).setData({legendData:e,columns:t}),this.chart2=new s["a"]("chart2","pie",{series:[{radius:[0,"70%"],roseType:"radius"}]}).setData({legendData:e,columns:t}),this.chart3=new s["a"]("chart3","pie",{series:[{name:"访问来源",type:"pie",radius:["60%","80%"]},{name:"访问来源",type:"pie",selectedMode:"single",radius:[0,"45%"]}]}).setData({legendData:e,columns:[t,t]})},openDialog:function(e){this.codeView=this.items[e].code,this.dialogVisible=!0},chartResize:function(){var e=this;window.addEventListener("resize",c.a.debounce((function(){e.chart0.chart&&e.chart0.chart.resize(),e.chart1.chart&&e.chart1.chart.resize(),e.chart2.chart&&e.chart2.chart.resize(),e.chart3.chart&&e.chart3.chart.resize()})))}}},h=o,d=a("2877"),u=Object(d["a"])(h,n,i,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d0e4a8d.a39edfb8.js.map