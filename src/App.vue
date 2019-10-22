<template>
  <div id="app">
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/lineOrBar">折线图 / 柱状图</el-menu-item>
      <el-menu-item index="/pie">饼图</el-menu-item>
      <el-menu-item index="/radar">雷达图</el-menu-item>
      <el-menu-item index="/scatter">散点图</el-menu-item>
      <el-menu-item index="/tree" disabled>...</el-menu-item>
      <el-submenu index="/geo">
        <template slot="title">GEO / Map</template>
        <el-menu-item index="/geo/china">地图展示</el-menu-item>
        <el-menu-item index="/geo/choose">地市框选</el-menu-item>
        <el-menu-item index="/geo/basin">流域地图</el-menu-item>
        <el-menu-item index="/geo/runInHole">省市区三级下钻</el-menu-item>
      </el-submenu>
    </el-menu>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  }
}
</script>
<style lang="scss">
html,
body {
  margin: 0;
  background-color: #f5f7ff;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
