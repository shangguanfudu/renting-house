<template>
  <div>
    <MyHeader name="地图找房"></MyHeader>
    <div id="container"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMap } from '@/api/area'
// https://lbsyun.baidu.com/jsdemo.htm#eAddMarker
export default {
  async created () {
    try {
      const { data: res } = await getMap(this.cityValue)
      // console.log(res)
      this.areaList = res.body
      this.$nextTick(() => {
        const { BMapGL } = window
        const map = new BMapGL.Map('container')
        map.centerAndZoom(this.currentCity + '市', 13) // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放

        // 创建文本标注
        this.areaList.forEach((item) => {
          const label = new BMapGL.Label(`${item.label} \n ${item.count}套`, {
            position: new BMapGL.Point(item.coord.longitude, item.coord.latitude), // 设置标注的地理位置
            offset: new BMapGL.Size(10, 20) // 设置标注的偏移量
          })
          map.addOverlay(label)
          label.setStyle({ // 设置label的样式
            width: ' 70px',
            height: '70px',
            lineHeight: '70px',
            display: 'inline-block',
            position: 'absolute',
            borderRadius: '100%',
            background: ' rgba(12, 181, 106, .9)',
            color: '#fff',
            border: ' 2px solid #fff',
            textAlign: 'center',
            cursor: ' pointer'
          })
        })
      })
    } catch (error) {
      console.log(error)
    }
  },
  mounted () {
  },
  data () {
    return {
      areaList: []
    }
  },
  methods: {},
  computed: { ...mapState(['cityValue', 'currentCity']) },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
#container {
  width: 100vw;
  height: 100vh;
}
</style>
