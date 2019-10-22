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

export default {
  data() {
    return {
      cityMap: null,
      mapName: '',
      areaCityValue: 1,
      areaCityList: [
        {
          value: 1,
          title: '京津冀2+26',
          centerPos: [115, 37],
          data: [
            {
              total: 49.25,
              COD: 44.44,
              region_name: '邢台市',
              ANDAN: 4.81,
              region_code: '130500000'
            },
            {
              total: 40.67,
              COD: 38.81,
              region_name: '唐山市',
              ANDAN: 1.86,
              region_code: '130200000'
            },
            {
              total: 18.65,
              COD: 18.3,
              region_name: '滨州市',
              ANDAN: 0.35,
              region_code: '371600000'
            },
            {
              total: 15.77,
              COD: 14.91,
              region_name: '邯郸市',
              ANDAN: 0.86,
              region_code: '130400000'
            },
            {
              total: 15.52,
              COD: 14.7,
              region_name: '开封市',
              ANDAN: 0.82,
              region_code: '410200000'
            },
            {
              total: 12.58,
              COD: 11.44,
              region_name: '济南市',
              ANDAN: 1.14,
              region_code: '370100000'
            },
            {
              total: 12.22,
              COD: 11.89,
              region_name: '衡水市',
              ANDAN: 0.33,
              region_code: '131100000'
            },
            {
              total: 11.56,
              COD: 11.23,
              region_name: '石家庄市',
              ANDAN: 0.33,
              region_code: '130100000'
            },
            {
              total: 10.33,
              COD: 10.11,
              region_name: '济宁市',
              ANDAN: 0.22,
              region_code: '370800000'
            },
            {
              total: 7.33,
              COD: 6.94,
              region_name: '淄博市',
              ANDAN: 0.39,
              region_code: '370300000'
            },
            {
              total: 6.41,
              COD: 6.33,
              region_name: '保定市',
              ANDAN: 0.08,
              region_code: '130600000'
            },
            {
              total: 5.85,
              COD: 5.67,
              region_name: '德州市',
              ANDAN: 0.18,
              region_code: '371400000'
            },
            {
              total: 4.38,
              COD: 4.17,
              region_name: '濮阳市',
              ANDAN: 0.21,
              region_code: '410900000'
            },
            {
              total: 3.22,
              COD: 3.19,
              region_name: '聊城市',
              ANDAN: 0.03,
              region_code: '371500000'
            },
            {
              total: 2.38,
              COD: 2.28,
              region_name: '焦作市',
              ANDAN: 0.1,
              region_code: '410800000'
            },
            {
              total: 2.27,
              COD: 2.25,
              region_name: '郑州市',
              ANDAN: 0.02,
              region_code: '410100000'
            },
            {
              total: 2.26,
              COD: 2.04,
              region_name: '新乡市',
              ANDAN: 0.22,
              region_code: '410700000'
            },
            {
              total: 2.06,
              COD: 1.88,
              region_name: '沧州市',
              ANDAN: 0.18,
              region_code: '130900000'
            },
            {
              total: 1.22,
              COD: 1.11,
              region_name: '鹤壁市',
              ANDAN: 0.11,
              region_code: '410600000'
            },
            {
              total: 0.7,
              COD: 0.63,
              region_name: '长治市',
              ANDAN: 0.07,
              region_code: '140400000'
            },
            {
              total: 0.48,
              COD: 0.42,
              region_name: '晋城市',
              ANDAN: 0.06,
              region_code: '140500000'
            },
            {
              total: 0.25,
              COD: 0.24,
              region_name: '廊坊市',
              ANDAN: 0.01,
              region_code: '131000000'
            },
            {
              total: 0.19,
              COD: 0.19,
              region_name: '菏泽市',
              ANDAN: 0.0,
              region_code: '371700000'
            },
            {
              total: 0.18,
              COD: 0.17,
              region_name: '安阳市',
              ANDAN: 0.01,
              region_code: '410500000'
            },
            {
              total: 0.01,
              COD: 0.01,
              region_name: '太原市',
              ANDAN: 0.0,
              region_code: '140100000'
            }
          ]
        },
        {
          value: 2,
          title: '汾渭平原',
          centerPos: [109.7864, 35.0299],
          data: [
            {
              total: 35.1,
              COD: 34.09,
              region_name: '西安市',
              ANDAN: 1.01,
              region_code: '610100000'
            },
            {
              total: 7.72,
              COD: 7.07,
              region_name: '渭南市',
              ANDAN: 0.65,
              region_code: '610500000'
            },
            {
              total: 4.18,
              COD: 3.66,
              region_name: '宝鸡市',
              ANDAN: 0.52,
              region_code: '610300000'
            },
            {
              total: 2.25,
              COD: 2.15,
              region_name: '三门峡市',
              ANDAN: 0.1,
              region_code: '411200000'
            },
            {
              total: 1.24,
              COD: 1.22,
              region_name: '洛阳市',
              ANDAN: 0.02,
              region_code: '410300000'
            },
            {
              total: 0.64,
              COD: 0.62,
              region_name: '运城市',
              ANDAN: 0.02,
              region_code: '140800000'
            },
            {
              total: 0.18,
              COD: 0.18,
              region_name: '吕梁市',
              ANDAN: 0.0,
              region_code: '141100000'
            },
            {
              total: 0.09,
              COD: 0.09,
              region_name: '临汾市',
              ANDAN: 0.0,
              region_code: '141000000'
            },
            {
              total: 0.01,
              COD: 0.01,
              region_name: '咸阳市',
              ANDAN: 0.0,
              region_code: '610400000'
            }
          ]
        },
        {
          value: 3,
          title: '长三角',
          centerPos: [120, 29.8773],
          data: [
            {
              total: 126.98,
              COD: 126.16,
              region_name: '杭州市',
              ANDAN: 0.82,
              region_code: '330100000'
            },
            {
              total: 23.37,
              COD: 23.06,
              region_name: '绍兴市',
              ANDAN: 0.31,
              region_code: '330600000'
            },
            {
              total: 22.03,
              COD: 21.48,
              region_name: '宁波市',
              ANDAN: 0.55,
              region_code: '330200000'
            },
            {
              total: 15.05,
              COD: 14.65,
              region_name: '金华市',
              ANDAN: 0.4,
              region_code: '330700000'
            },
            {
              total: 14.1,
              COD: 7.71,
              region_name: '嘉兴市',
              ANDAN: 6.39,
              region_code: '330400000'
            },
            {
              total: 12.15,
              COD: 11.78,
              region_name: '无锡市',
              ANDAN: 0.37,
              region_code: '320200000'
            },
            {
              total: 10.38,
              COD: 10.07,
              region_name: '合肥市',
              ANDAN: 0.31,
              region_code: '340100000'
            },
            {
              total: 8.4,
              COD: 8.24,
              region_name: '安庆市',
              ANDAN: 0.16,
              region_code: '340800000'
            },
            {
              total: 7.46,
              COD: 6.97,
              region_name: '滁州市',
              ANDAN: 0.49,
              region_code: '341100000'
            },
            {
              total: 6.3,
              COD: 6.1,
              region_name: '苏州市',
              ANDAN: 0.2,
              region_code: '320500000'
            },
            {
              total: 5.66,
              COD: 5.59,
              region_name: '台州市',
              ANDAN: 0.07,
              region_code: '331000000'
            },
            {
              total: 5.44,
              COD: 5.36,
              region_name: '湖州市',
              ANDAN: 0.08,
              region_code: '330500000'
            },
            {
              total: 3.94,
              COD: 3.81,
              region_name: '扬州市',
              ANDAN: 0.13,
              region_code: '321000000'
            },
            {
              total: 2.88,
              COD: 2.67,
              region_name: '马鞍山市',
              ANDAN: 0.21,
              region_code: '340500000'
            },
            {
              total: 2.28,
              COD: 2.23,
              region_name: '盐城市',
              ANDAN: 0.05,
              region_code: '320900000'
            },
            {
              total: 0.55,
              COD: 0.54,
              region_name: '南通市',
              ANDAN: 0.01,
              region_code: '320600000'
            },
            {
              total: 0.52,
              COD: 0.52,
              region_name: '池州市',
              ANDAN: 0.0,
              region_code: '341700000'
            },
            {
              total: 0.43,
              COD: 0.43,
              region_name: '泰州市',
              ANDAN: 0.0,
              region_code: '321200000'
            },
            {
              total: 0.02,
              COD: 0.02,
              region_name: '常州市',
              ANDAN: 0.0,
              region_code: '320400000'
            }
          ]
        },
        {
          value: 4,
          title: '长江经济带',
          centerPos: [105, 28],
          data: [{ 'total': 126.98, 'COD': 126.16, 'region_name': '杭州市', 'ANDAN': 0.82, 'region_code': '330100000' }, { 'total': 24.71, 'COD': 23.68, 'region_name': '黔南布依族苗族自治州', 'ANDAN': 1.03, 'region_code': '522700000' }, { 'total': 23.37, 'COD': 23.06, 'region_name': '绍兴市', 'ANDAN': 0.31, 'region_code': '330600000' }, { 'total': 22.96, 'COD': 20.88, 'region_name': '绵阳市', 'ANDAN': 2.08, 'region_code': '510700000' }, { 'total': 22.03, 'COD': 21.48, 'region_name': '宁波市', 'ANDAN': 0.55, 'region_code': '330200000' }, { 'total': 15.08, 'COD': 14.61, 'region_name': '成都市', 'ANDAN': 0.47, 'region_code': '510100000' }, { 'total': 15.05, 'COD': 14.65, 'region_name': '金华市', 'ANDAN': 0.40, 'region_code': '330700000' }, { 'total': 14.10, 'COD': 7.71, 'region_name': '嘉兴市', 'ANDAN': 6.39, 'region_code': '330400000' }, { 'total': 12.15, 'COD': 11.78, 'region_name': '无锡市', 'ANDAN': 0.37, 'region_code': '320200000' }, { 'total': 12.04, 'COD': 11.39, 'region_name': '蚌埠市', 'ANDAN': 0.65, 'region_code': '340300000' }, { 'total': 10.38, 'COD': 10.07, 'region_name': '合肥市', 'ANDAN': 0.31, 'region_code': '340100000' }, { 'total': 9.72, 'COD': 8.97, 'region_name': '襄樊市', 'ANDAN': 0.75, 'region_code': '420600000' }, { 'total': 9.72, 'COD': 8.10, 'region_name': '怀化市', 'ANDAN': 1.62, 'region_code': '431200000' }, { 'total': 8.40, 'COD': 8.24, 'region_name': '安庆市', 'ANDAN': 0.16, 'region_code': '340800000' }, { 'total': 7.46, 'COD': 6.97, 'region_name': '滁州市', 'ANDAN': 0.49, 'region_code': '341100000' }, { 'total': 6.87, 'COD': 6.13, 'region_name': '淮北市', 'ANDAN': 0.74, 'region_code': '340600000' }, { 'total': 6.30, 'COD': 6.10, 'region_name': '苏州市', 'ANDAN': 0.20, 'region_code': '320500000' }, { 'total': 6.28, 'COD': 6.10, 'region_name': '亳州市', 'ANDAN': 0.18, 'region_code': '341600000' }, { 'total': 6.27, 'COD': 6.19, 'region_name': '岳阳市', 'ANDAN': 0.08, 'region_code': '430600000' }, { 'total': 6.00, 'COD': 5.33, 'region_name': '红河哈尼族彝族自治州', 'ANDAN': 0.67, 'region_code': '532500000' }, { 'total': 5.66, 'COD': 5.59, 'region_name': '台州市', 'ANDAN': 0.07, 'region_code': '331000000' }, { 'total': 5.44, 'COD': 5.36, 'region_name': '湖州市', 'ANDAN': 0.08, 'region_code': '330500000' }, { 'total': 5.29, 'COD': 5.00, 'region_name': '九江市', 'ANDAN': 0.29, 'region_code': '360400000' }, { 'total': 5.08, 'COD': 4.79, 'region_name': '宿州市', 'ANDAN': 0.29, 'region_code': '341300000' }, { 'total': 4.37, 'COD': 3.62, 'region_name': '荆门市', 'ANDAN': 0.75, 'region_code': '420800000' }, { 'total': 4.36, 'COD': 4.23, 'region_name': '武汉市', 'ANDAN': 0.13, 'region_code': '420100000' }, { 'total': 4.31, 'COD': 3.67, 'region_name': '乐山市', 'ANDAN': 0.64, 'region_code': '511100000' }, { 'total': 3.97, 'COD': 3.74, 'region_name': '曲靖市', 'ANDAN': 0.23, 'region_code': '530300000' }, { 'total': 3.96, 'COD': 3.77, 'region_name': '衢州市', 'ANDAN': 0.19, 'region_code': '330800000' }, { 'total': 3.94, 'COD': 3.81, 'region_name': '扬州市', 'ANDAN': 0.13, 'region_code': '321000000' }, { 'total': 3.76, 'COD': 3.40, 'region_name': '上饶市', 'ANDAN': 0.36, 'region_code': '361100000' }, { 'total': 3.71, 'COD': 3.41, 'region_name': '内江市', 'ANDAN': 0.30, 'region_code': '511000000' }, { 'total': 3.68, 'COD': 2.75, 'region_name': '随州市', 'ANDAN': 0.93, 'region_code': '421300000' }, { 'total': 3.64, 'COD': 3.56, 'region_name': '泸州市', 'ANDAN': 0.08, 'region_code': '510500000' }, { 'total': 3.53, 'COD': 3.07, 'region_name': '宜昌市', 'ANDAN': 0.46, 'region_code': '420500000' }, { 'total': 3.38, 'COD': 3.28, 'region_name': '南充市', 'ANDAN': 0.10, 'region_code': '511300000' }, { 'total': 3.33, 'COD': 2.84, 'region_name': '德阳市', 'ANDAN': 0.49, 'region_code': '510600000' }, { 'total': 3.12, 'COD': 2.97, 'region_name': '遂宁市', 'ANDAN': 0.15, 'region_code': '510900000' }, { 'total': 3.06, 'COD': 2.74, 'region_name': '娄底市', 'ANDAN': 0.32, 'region_code': '431300000' }, { 'total': 2.88, 'COD': 2.67, 'region_name': '马鞍山市', 'ANDAN': 0.21, 'region_code': '340500000' }, { 'total': 2.86, 'COD': 2.83, 'region_name': '咸宁市', 'ANDAN': 0.03, 'region_code': '421200000' }, { 'total': 2.79, 'COD': 2.58, 'region_name': '凉山彝族自治州', 'ANDAN': 0.21, 'region_code': '513400000' }, { 'total': 2.65, 'COD': 2.41, 'region_name': '常德市', 'ANDAN': 0.24, 'region_code': '430700000' }, { 'total': 2.58, 'COD': 2.42, 'region_name': '恩施土家族苗族自治州', 'ANDAN': 0.16, 'region_code': '422800000' }, { 'total': 2.28, 'COD': 2.23, 'region_name': '盐城市', 'ANDAN': 0.05, 'region_code': '320900000' }, { 'total': 2.25, 'COD': 2.24, 'region_name': '普洱市', 'ANDAN': 0.01, 'region_code': '530800000' }, { 'total': 2.21, 'COD': 2.16, 'region_name': '宜宾市', 'ANDAN': 0.05, 'region_code': '511500000' }, { 'total': 2.18, 'COD': 2.13, 'region_name': '六安市', 'ANDAN': 0.05, 'region_code': '341500000' }, { 'total': 2.16, 'COD': 2.01, 'region_name': '株洲市', 'ANDAN': 0.15, 'region_code': '430200000' }, { 'total': 2.11, 'COD': 2.00, 'region_name': '丽水市', 'ANDAN': 0.11, 'region_code': '331100000' }, { 'total': 2.06, 'COD': 1.99, 'region_name': '贵阳市', 'ANDAN': 0.07, 'region_code': '520100000' }, { 'total': 1.98, 'COD': 1.79, 'region_name': '湘潭市', 'ANDAN': 0.19, 'region_code': '430300000' }, { 'total': 1.94, 'COD': 1.93, 'region_name': '连云港市', 'ANDAN': 0.01, 'region_code': '320700000' }, { 'total': 1.93, 'COD': 1.84, 'region_name': '淮安市', 'ANDAN': 0.09, 'region_code': '320800000' }, { 'total': 1.61, 'COD': 1.39, 'region_name': '鄂州市', 'ANDAN': 0.22, 'region_code': '420700000' }, { 'total': 1.58, 'COD': 1.42, 'region_name': '徐州市', 'ANDAN': 0.16, 'region_code': '320300000' }, { 'total': 1.55, 'COD': 1.52, 'region_name': '宿迁市', 'ANDAN': 0.03, 'region_code': '321300000' }, { 'total': 1.44, 'COD': 1.33, 'region_name': '益阳市', 'ANDAN': 0.11, 'region_code': '430900000' }, { 'total': 1.33, 'COD': 1.25, 'region_name': '张家界市', 'ANDAN': 0.08, 'region_code': '430800000' }, { 'total': 1.27, 'COD': 1.18, 'region_name': '广安市', 'ANDAN': 0.09, 'region_code': '511600000' }, { 'total': 1.19, 'COD': 0.98, 'region_name': '攀枝花市', 'ANDAN': 0.21, 'region_code': '510400000' }, { 'total': 1.17, 'COD': 1.13, 'region_name': '达州市', 'ANDAN': 0.04, 'region_code': '511700000' }, { 'total': 1.10, 'COD': 0.97, 'region_name': '楚雄彝族自治州', 'ANDAN': 0.13, 'region_code': '532300000' }, { 'total': 1.09, 'COD': 1.03, 'region_name': '黔东南苗族侗族自治州', 'ANDAN': 0.06, 'region_code': '522600000' }, { 'total': 1.08, 'COD': 1.01, 'region_name': '玉溪市', 'ANDAN': 0.07, 'region_code': '530400000' }, { 'total': 1.04, 'COD': 0.97, 'region_name': '自贡市', 'ANDAN': 0.07, 'region_code': '510300000' }, { 'total': 1.04, 'COD': 0.92, 'region_name': '吉安市', 'ANDAN': 0.12, 'region_code': '360800000' }, { 'total': 1.03, 'COD': 0.99, 'region_name': '德宏傣族景颇族自治州', 'ANDAN': 0.04, 'region_code': '533100000' }, { 'total': 0.89, 'COD': 0.87, 'region_name': '荆州市', 'ANDAN': 0.02, 'region_code': '421000000' }, { 'total': 0.86, 'COD': 0.85, 'region_name': '孝感市', 'ANDAN': 0.01, 'region_code': '420900000' }, { 'total': 0.82, 'COD': 0.81, 'region_name': '黄石市', 'ANDAN': 0.01, 'region_code': '420200000' }, { 'total': 0.76, 'COD': 0.75, 'region_name': '资阳市', 'ANDAN': 0.01, 'region_code': '512000000' }, { 'total': 0.71, 'COD': 0.69, 'region_name': '昭通市', 'ANDAN': 0.02, 'region_code': '530600000' }, { 'total': 0.66, 'COD': 0.59, 'region_name': '广元市', 'ANDAN': 0.07, 'region_code': '510800000' }, { 'total': 0.61, 'COD': 0.59, 'region_name': '抚州市', 'ANDAN': 0.02, 'region_code': '361000000' }, { 'total': 0.59, 'COD': 0.56, 'region_name': '赣州市', 'ANDAN': 0.03, 'region_code': '360700000' }, { 'total': 0.55, 'COD': 0.48, 'region_name': '怒江傈僳族自治州', 'ANDAN': 0.07, 'region_code': '533300000' }, { 'total': 0.55, 'COD': 0.54, 'region_name': '南通市', 'ANDAN': 0.01, 'region_code': '320600000' }, { 'total': 0.52, 'COD': 0.52, 'region_name': '池州市', 'ANDAN': 0.00, 'region_code': '341700000' }, { 'total': 0.44, 'COD': 0.44, 'region_name': '文山壮族苗族自治州', 'ANDAN': 0.00, 'region_code': '532600000' }, { 'total': 0.43, 'COD': 0.43, 'region_name': '泰州市', 'ANDAN': 0.00, 'region_code': '321200000' }, { 'total': 0.41, 'COD': 0.35, 'region_name': '景德镇市', 'ANDAN': 0.06, 'region_code': '360200000' }, { 'total': 0.41, 'COD': 0.40, 'region_name': '南昌市', 'ANDAN': 0.01, 'region_code': '360100000' }, { 'total': 0.39, 'COD': 0.34, 'region_name': '六盘水市', 'ANDAN': 0.05, 'region_code': '520200000' }, { 'total': 0.38, 'COD': 0.35, 'region_name': '巴中市', 'ANDAN': 0.03, 'region_code': '511900000' }, { 'total': 0.37, 'COD': 0.33, 'region_name': '鹰潭市', 'ANDAN': 0.04, 'region_code': '360600000' }, { 'total': 0.32, 'COD': 0.26, 'region_name': '郴州市', 'ANDAN': 0.06, 'region_code': '431000000' }, { 'total': 0.31, 'COD': 0.28, 'region_name': '毕节市', 'ANDAN': 0.03, 'region_code': '522400000' }, { 'total': 0.30, 'COD': 0.28, 'region_name': '宜春市', 'ANDAN': 0.02, 'region_code': '360900000' }, { 'total': 0.25, 'COD': 0.21, 'region_name': '迪庆藏族自治州', 'ANDAN': 0.04, 'region_code': '533400000' }, { 'total': 0.23, 'COD': 0.22, 'region_name': '昆明市', 'ANDAN': 0.01, 'region_code': '530100000' }, { 'total': 0.22, 'COD': 0.18, 'region_name': '眉山市', 'ANDAN': 0.04, 'region_code': '511400000' }, { 'total': 0.20, 'COD': 0.19, 'region_name': '阜阳市', 'ANDAN': 0.01, 'region_code': '341200000' }, { 'total': 0.17, 'COD': 0.17, 'region_name': '西双版纳傣族自治州', 'ANDAN': 0.00, 'region_code': '532800000' }, { 'total': 0.17, 'COD': 0.17, 'region_name': '黄冈市', 'ANDAN': 0.00, 'region_code': '421100000' }, { 'total': 0.16, 'COD': 0.16, 'region_name': '临沧市', 'ANDAN': 0.00, 'region_code': '530900000' }, { 'total': 0.14, 'COD': 0.14, 'region_name': '温州市', 'ANDAN': 0.00, 'region_code': '330300000' }, { 'total': 0.14, 'COD': 0.14, 'region_name': '邵阳市', 'ANDAN': 0.00, 'region_code': '430500000' }, { 'total': 0.11, 'COD': 0.09, 'region_name': '淮南市', 'ANDAN': 0.02, 'region_code': '340400000' }, { 'total': 0.09, 'COD': 0.08, 'region_name': '遵义市', 'ANDAN': 0.01, 'region_code': '520300000' }, { 'total': 0.08, 'COD': 0.08, 'region_name': '十堰市', 'ANDAN': 0.00, 'region_code': '420300000' }, { 'total': 0.07, 'COD': 0.05, 'region_name': '衡阳市', 'ANDAN': 0.02, 'region_code': '430400000' }, { 'total': 0.07, 'COD': 0.04, 'region_name': '黔西南布依族苗族自治州', 'ANDAN': 0.03, 'region_code': '522300000' }, { 'total': 0.06, 'COD': 0.05, 'region_name': '安顺市', 'ANDAN': 0.01, 'region_code': '520400000' }, { 'total': 0.03, 'COD': 0.03, 'region_name': '新余市', 'ANDAN': 0.00, 'region_code': '360500000' }, { 'total': 0.02, 'COD': 0.02, 'region_name': '常州市', 'ANDAN': 0.00, 'region_code': '320400000' }]
        },
        {
          value: 5,
          title: '环渤海经济带',
          centerPos: [119, 38],
          data: [{ 'total': 49.25, 'COD': 44.44, 'region_name': '邢台市', 'ANDAN': 4.81, 'region_code': '130500000' }, { 'total': 40.67, 'COD': 38.81, 'region_name': '唐山市', 'ANDAN': 1.86, 'region_code': '130200000' }, { 'total': 26.02, 'COD': 25.26, 'region_name': '潍坊市', 'ANDAN': 0.76, 'region_code': '370700000' }, { 'total': 18.65, 'COD': 18.30, 'region_name': '滨州市', 'ANDAN': 0.35, 'region_code': '371600000' }, { 'total': 15.77, 'COD': 14.91, 'region_name': '邯郸市', 'ANDAN': 0.86, 'region_code': '130400000' }, { 'total': 15.64, 'COD': 14.06, 'region_name': '张家口市', 'ANDAN': 1.58, 'region_code': '130700000' }, { 'total': 13.47, 'COD': 13.21, 'region_name': '日照市', 'ANDAN': 0.26, 'region_code': '371100000' }, { 'total': 12.91, 'COD': 12.43, 'region_name': '秦皇岛市', 'ANDAN': 0.48, 'region_code': '130300000' }, { 'total': 12.68, 'COD': 10.96, 'region_name': '朝阳市', 'ANDAN': 1.72, 'region_code': '211300000' }, { 'total': 12.58, 'COD': 11.44, 'region_name': '济南市', 'ANDAN': 1.14, 'region_code': '370100000' }, { 'total': 12.22, 'COD': 11.89, 'region_name': '衡水市', 'ANDAN': 0.33, 'region_code': '131100000' }, { 'total': 11.56, 'COD': 11.23, 'region_name': '石家庄市', 'ANDAN': 0.33, 'region_code': '130100000' }, { 'total': 10.33, 'COD': 10.11, 'region_name': '济宁市', 'ANDAN': 0.22, 'region_code': '370800000' }, { 'total': 10.14, 'COD': 9.90, 'region_name': '大连市', 'ANDAN': 0.24, 'region_code': '210200000' }, { 'total': 8.35, 'COD': 4.18, 'region_name': '青岛市', 'ANDAN': 4.17, 'region_code': '370200000' }, { 'total': 7.33, 'COD': 6.94, 'region_name': '淄博市', 'ANDAN': 0.39, 'region_code': '370300000' }, { 'total': 6.72, 'COD': 6.59, 'region_name': '东营市', 'ANDAN': 0.13, 'region_code': '370500000' }, { 'total': 6.41, 'COD': 6.33, 'region_name': '保定市', 'ANDAN': 0.08, 'region_code': '130600000' }, { 'total': 5.85, 'COD': 5.67, 'region_name': '德州市', 'ANDAN': 0.18, 'region_code': '371400000' }, { 'total': 5.54, 'COD': 5.47, 'region_name': '烟台市', 'ANDAN': 0.07, 'region_code': '370600000' }, { 'total': 5.16, 'COD': 4.81, 'region_name': '锦州市', 'ANDAN': 0.35, 'region_code': '210700000' }, { 'total': 5.07, 'COD': 4.41, 'region_name': '葫芦岛市', 'ANDAN': 0.66, 'region_code': '211400000' }, { 'total': 4.59, 'COD': 4.52, 'region_name': '泰安市', 'ANDAN': 0.07, 'region_code': '370900000' }, { 'total': 3.22, 'COD': 3.19, 'region_name': '聊城市', 'ANDAN': 0.03, 'region_code': '371500000' }, { 'total': 3.14, 'COD': 2.97, 'region_name': '铁岭市', 'ANDAN': 0.17, 'region_code': '211200000' }, { 'total': 2.91, 'COD': 2.87, 'region_name': '营口市', 'ANDAN': 0.04, 'region_code': '210800000' }, { 'total': 2.06, 'COD': 1.88, 'region_name': '沧州市', 'ANDAN': 0.18, 'region_code': '130900000' }, { 'total': 1.80, 'COD': 1.77, 'region_name': '阜新市', 'ANDAN': 0.03, 'region_code': '210900000' }, { 'total': 1.77, 'COD': 1.67, 'region_name': '枣庄市', 'ANDAN': 0.10, 'region_code': '370400000' }, { 'total': 1.07, 'COD': 1.00, 'region_name': '临沂市', 'ANDAN': 0.07, 'region_code': '371300000' }, { 'total': 0.98, 'COD': 0.96, 'region_name': '辽阳市', 'ANDAN': 0.02, 'region_code': '211000000' }, { 'total': 0.97, 'COD': 0.96, 'region_name': '莱芜市', 'ANDAN': 0.01, 'region_code': '371200000' }, { 'total': 0.74, 'COD': 0.72, 'region_name': '沈阳市', 'ANDAN': 0.02, 'region_code': '210100000' }, { 'total': 0.57, 'COD': 0.56, 'region_name': '抚顺市', 'ANDAN': 0.01, 'region_code': '210400000' }, { 'total': 0.31, 'COD': 0.29, 'region_name': '丹东市', 'ANDAN': 0.02, 'region_code': '210600000' }, { 'total': 0.25, 'COD': 0.24, 'region_name': '廊坊市', 'ANDAN': 0.01, 'region_code': '131000000' }, { 'total': 0.19, 'COD': 0.19, 'region_name': '菏泽市', 'ANDAN': 0.00, 'region_code': '371700000' }, { 'total': 0.11, 'COD': 0.11, 'region_name': '盘锦市', 'ANDAN': 0.00, 'region_code': '211100000' }, { 'total': 0.04, 'COD': 0.04, 'region_name': '承德市', 'ANDAN': 0.00, 'region_code': '130800000' }, { 'total': 0.04, 'COD': 0.04, 'region_name': '威海市', 'ANDAN': 0.00, 'region_code': '371000000' }, { 'total': 0.01, 'COD': 0.01, 'region_name': '本溪市', 'ANDAN': 0.00, 'region_code': '210500000' }]
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
      visualMap: [0, 100],
      center: this.centerCoord,
      map: this.mapName,
      zoom: 4,
      rows: Array.from({ length: this.areaCityList[0].data.length }, (_, index) => {
        return {
          name: this.areaCityList[0].data[index].region_name,
          value: this.areaCityList[0].data[index].total
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
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: '#333'
                }
              }
            }
          }
        ]
      })
      // 注入地图 json
      this.mapName = 'allCity'
      this.cityMap.Echarts.registerMap(
        this.mapName,
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
        visualMap: [0, 100],
        center: this.centerCoord,
        zoom: 5,
        map: this.mapName,
        rows: Array.from(
          { length: this.areaCityList[v-1].data.length },
          // { length: Object.keys(MAP_CITY).length },
          (_, index) => {
            return {
              name: this.areaCityList[v-1].data[index].region_name,
              value: this.areaCityList[v-1].data[index].total
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
