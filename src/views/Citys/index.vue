<template>
  <div>
    <!-- 头部 -->
    <MyHeader name="城市列表"></MyHeader>
    <!-- <van-nav-bar title="" left-arrow @click-left="onClickLeft" /> -->

    <van-index-bar :index-list="indexList" sticky highlight-color="#73c991">
      <van-index-anchor index="#">当前城市</van-index-anchor>
      <van-cell :title="currentCity" />

      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell
        v-for="(obj, index) in hotCitys"
        :key="index"
        :title="obj.label"
        @click="
          CITY(obj.label);
          $router.go('-1');
        "
      />
      <div v-for="item in list" :key="item">
        <van-index-anchor :index="item">{{ item }} </van-index-anchor>
        <van-cell
          v-for="(items, index) in upList[item]"
          :key="index"
          :title="items.label"
          @click="
            CITY(items.label);
            $router.go('-1');
          "
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getCitys, getHots } from '@/api/area'
import MyHeader from '@/components/MyHeader.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  async created () {
    const { data: result } = await getHots()
    // console.log(result)
    this.hotCitys = result.body

    const { data: res } = await getCitys({ level: 1 })
    // console.log(res.body)
    for (let i = 0; i < this.list.length; i++) {
      this.upList[this.list[i]] = res.body.filter(item => item.short[0].toUpperCase() === this.list[i])
    }
    // this.upList.B = this.cityList.filter(item => item.short[0].toUpperCase() === 'B')
  },
  data () {
    return {
      cityNames: [],
      hotCitys: [],
      indexList: ['#', '热', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      list: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      upList: {
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: [],
        I: [],
        J: [],
        K: [],
        L: [],
        M: [],
        N: [],
        O: [],
        P: [],
        Q: [],
        R: [],
        S: [],
        T: [],
        U: [],
        V: [],
        W: [],
        X: [],
        Y: [],
        Z: []
      }
    }
  },
  methods: {
    ...mapMutations(['CITY'])
    // sendCity (val) {
    //   this.currentCity = val
    // this.$bus.$emit('city-event', val)
    // this.$router.push('/layout/home')
    // }
  },
  computed: {
    ...mapState(['currentCity'])
  },
  components: { MyHeader }
}
</script>

<style scoped lang="less">
/deep/.van-index-anchor {
  color: #a2a2a2;
}
/deep/.van-index-bar__index--active {
  background-color: pink;
  border-radius: 50%;
  width: 36px;
  height: 36px;
}
/deep/.van-index-bar__index {
  padding-left: 10px;
  padding-top: 6px;
  margin-top: 10px;
}
</style>
