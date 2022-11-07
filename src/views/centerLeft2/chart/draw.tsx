import { defineComponent, watch, shallowReactive, nextTick, ref, onUnmounted } from 'vue';

// 声明类型
const PropsType = {
  cdata: {
    type: Array,
    require: true
  }
} as const

// 定义主体
export default defineComponent({
  props: PropsType,
  setup(props) {
    // 配置项
    let options = shallowReactive({ showLegendSymbol: null, tooltip: null, geo: null, series: null })
    // 设置点的位置(经纬度)
    const geoCoordMap = {
      上海: [121.4648, 31.2891],
      东莞: [113.8953, 22.901],
      东营: [118.7073, 37.5513],
      中山: [113.4229, 22.478],
      临汾: [111.4783, 36.1615],
      临沂: [118.3118, 35.2936],
      丹东: [124.541, 40.4242],
      丽水: [119.5642, 28.1854],
      乌鲁木齐: [87.9236, 43.5883],
      佛山: [112.8955, 23.1097],
      保定: [115.0488, 39.0948],
      兰州: [103.5901, 36.3043],
      包头: [110.3467, 41.4899],
      北京: [116.4551, 40.2539],
      北海: [109.314, 21.6211],
      南京: [118.8062, 31.9208],
      南宁: [108.479, 23.1152],
      南昌: [116.0046, 28.6633],
      南通: [121.1023, 32.1625],
      厦门: [118.1689, 24.6478],
      台州: [121.1353, 28.6688],
      合肥: [117.29, 32.0581],
      呼和浩特: [111.4124, 40.4901],
      咸阳: [108.4131, 34.8706],
      哈尔滨: [127.9688, 45.368],
      唐山: [118.4766, 39.6826],
      嘉兴: [120.9155, 30.6354],
      大同: [113.7854, 39.8035],
      大连: [122.2229, 39.4409],
      天津: [117.4219, 39.4189],
      太原: [112.3352, 37.9413],
      威海: [121.9482, 37.1393],
      宁波: [121.5967, 29.6466],
      宝鸡: [107.1826, 34.3433],
      宿迁: [118.5535, 33.7775],
      常州: [119.4543, 31.5582],
      广州: [113.5107, 23.2196],
      廊坊: [116.521, 39.0509],
      延安: [109.1052, 36.4252],
      张家口: [115.1477, 40.8527],
      徐州: [117.5208, 34.3268],
      德州: [116.6858, 37.2107],
      惠州: [114.6204, 23.1647],
      成都: [103.9526, 30.7617],
      扬州: [119.4653, 32.8162],
      承德: [117.5757, 41.4075],
      拉萨: [91.1865, 30.1465],
      无锡: [120.3442, 31.5527],
      日照: [119.2786, 35.5023],
      昆明: [102.9199, 25.4663],
      杭州: [119.5313, 29.8773],
      枣庄: [117.323, 34.8926],
      柳州: [109.3799, 24.9774],
      株洲: [113.5327, 27.0319],
      武汉: [114.3896, 30.6628],
      汕头: [117.1692, 23.3405],
      江门: [112.6318, 22.1484],
      沈阳: [123.1238, 42.1216],
      沧州: [116.8286, 38.2104],
      河源: [114.917, 23.9722],
      泉州: [118.3228, 25.1147],
      泰安: [117.0264, 36.0516],
      泰州: [120.0586, 32.5525],
      济南: [117.1582, 36.8701],
      济宁: [116.8286, 35.3375],
      海口: [110.3893, 19.8516],
      淄博: [118.0371, 36.6064],
      淮安: [118.927, 33.4039],
      深圳: [114.5435, 22.5439],
      清远: [112.9175, 24.3292],
      温州: [120.498, 27.8119],
      渭南: [109.7864, 35.0299],
      湖州: [119.8608, 30.7782],
      湘潭: [112.5439, 27.7075],
      滨州: [117.8174, 37.4963],
      潍坊: [119.0918, 36.524],
      烟台: [120.7397, 37.5128],
      玉溪: [101.9312, 23.8898],
      珠海: [113.7305, 22.1155],
      盐城: [120.2234, 33.5577],
      盘锦: [121.9482, 41.0449],
      石家庄: [114.4995, 38.1006],
      福州: [119.4543, 25.9222],
      秦皇岛: [119.2126, 40.0232],
      绍兴: [120.564, 29.7565],
      聊城: [115.9167, 36.4032],
      肇庆: [112.1265, 23.5822],
      舟山: [122.2559, 30.2234],
      苏州: [120.6519, 31.3989],
      莱芜: [117.6526, 36.2714],
      菏泽: [115.6201, 35.2057],
      营口: [122.4316, 40.4297],
      葫芦岛: [120.1575, 40.578],
      衡水: [115.8838, 37.7161],
      衢州: [118.6853, 28.8666],
      西宁: [101.4038, 36.8207],
      西安: [109.1162, 34.2004],
      贵阳: [106.6992, 26.7682],
      连云港: [119.1248, 34.552],
      邢台: [114.8071, 37.2821],
      邯郸: [114.4775, 36.535],
      郑州: [113.4668, 34.6234],
      鄂尔多斯: [108.9734, 39.2487],
      重庆: [107.7539, 30.1904],
      金华: [120.0037, 29.1028],
      铜川: [109.0393, 35.1947],
      银川: [106.3586, 38.1775],
      镇江: [119.4763, 31.9702],
      长春: [125.8154, 44.2584],
      长沙: [113.0823, 28.2568],
      长治: [112.8625, 36.4746],
      阳泉: [113.4778, 38.0951],
      青岛: [120.4651, 36.3373],
      韶关: [113.7964, 24.7028]
    };
    const seriesData = [
      {
        name: '东莞',
      },
      {
        name: '乌鲁木齐',
      },
      {
        name: '南京',
      },
      {
        name: '南宁',
      },
      {
        name: '南昌',
      },
      {
        name: '合肥',
      },
      {
        name: '大连',
      },
      {
        name: '太原',
      },
      {
        name: '宁波',
      },
      {
        name: '成都',
      },
      {
        name: '昆明',
      },
      {
        name: '杭州',
      },
      {
        name: '武汉',
      },
      {
        name: '福州',
      },
      {
        name: '西宁',
      },
      {
        name: '贵阳',
      },
      {
        name: '郑州',
      },
      {
        name: '长沙',
      },
      {
        name: '青岛',
      }
    ]
    const convertData = function (data) {
      const scatterData = [];
      for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          scatterData.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return scatterData;
    }
    // 监听
    watch(
      () => props.cdata,
      (val: any) => {
        options = {
          showLegendSymbol: true,
          tooltip: {
            trigger: 'item',
            textStyle: {
              fontSize: 14,
              lineHeight: 22,
            },
            position: point => {
              // 固定在顶部
              return [point[0] + 50, point[1] - 20];
            },
            // 如果需要自定义 tooltip样式，需要使用formatter
            /*
              formatter: params => {
                return `<div style=""> ... </div>`
              }
            */
          },
          // 如果需要根据不同的数据展示深浅不一的颜色，则把这里打开
          // visualMap: {
          //   min: 0,
          //   max: 10,
          //   show: false,
          //   seriesIndex: 0,
          //   // 颜色
          //   inRange: {
          //     color: ['rgba(41,166,206, .5)', 'rgba(69,117,245, .9)'],
          //   },
          // },
          // 底部背景
          geo: [{
            show: true,
            aspectScale: 0.85, //长宽比
            zoom: 1.16,
            top: '10%',
            left: '17%',
            map: 'china',
            roam: false,
            itemStyle: {
              normal: {
                borderColor: '#7ad5ff7f',
                shadowOffsetY: 5,
                shadowBlur: 15,
                areaColor: 'rgba(5,21,35,0.1)'
              }
            }
          }],
          series: [
            {
              name: '相关指数',
              type: 'map',
              aspectScale: 0.85, //长宽比
              zoom: 1.16, //缩放
              mapType: 'china', // 自定义扩展图表类型
              top: '9%',
              left: '16%',
              itemStyle: {
                normal: {
                  // 背景渐变色
                  areaColor: {
                    type: 'linear-gradient',
                    x: 0,
                    y: 300,
                    x2: 0,
                    y2: 0,
                    colorStops: [{
                      offset: 0,
                      color: 'RGBA(19,96,187,1)' // 0% 处的颜色
                    }, {
                      offset: 1,
                      color: 'RGBA(7,193,223,1)' // 50% 处的颜色
                    }],
                    global: true // 缺省为 false
                  },
                  borderColor: '#4ECEE6',
                  borderWidth: 1,
                },
                emphasis: {
                  areaColor: '#4f7fff',
                  borderColor: 'rgba(0,242,252,.6)',
                  borderWidth: 2,
                  shadowBlur: 10,
                  shadowColor: '#00f2fc',
                },
              },
              label: {
                formatter: params => `${params.name}`,
                show: true,
                position: 'insideRight',
                textStyle: {
                  fontSize: 14,
                  color: '#efefef',
                },
                emphasis: {
                  textStyle: {
                    color: '#fff',
                  },
                },
              },
              data: val,
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              symbolSize: 7,
              effectType: 'ripple',
              legendHoverLink: false,
              showEffectOn: 'render',
              rippleEffect: {
                period: 4,
                scale: 2.5,
                brushType: 'stroke',
              },
              zlevel: 1,
              itemStyle: {
                normal: {
                  color: '#99FBFE',
                  shadowBlur: 5,
                  shadowColor: '#fff',
                },
              },
              data: convertData(seriesData),
            },
          ],
        }
      },
      {
        immediate: true,
        deep: true
      }
    )
    return () => {
      const height = "460px"
      const width = "930px"

      return <div>
        <echart options={options} height={height} width={width} />
      </div>
    }
  }
})

