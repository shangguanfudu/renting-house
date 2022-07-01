<template>
  <div>
    <MyHeader name="房屋管理"></MyHeader>

    <van-grid
      :column-num="1"
      direction="horizontal"
      v-if="houseList.length >= 1"
    >
      <van-grid-item
        icon="photo-o"
        text="文字"
        v-for="(obj, ind) in houseList"
        :key="ind"
        class="van-hairline--bottom"
        @click="$router.push({
          name:'detail',
          params: {id:obj.houseCode}
          })"
      >
        <template #icon>
          <van-image
            :src="'http://liufusong.top:8080' + obj.houseImg"
            width="2.83rem"
            height="2.14rem"
            fit="cover"
          ></van-image>
        </template>
        <template #text>
          <div class="contain">
            <h5>{{ obj.title }}</h5>
            <p>{{ obj.desc }}</p>
            <span>{{ obj.tags[0] }}</span>
            <h4>
              {{ obj.price }}
              <i>元/月</i>
            </h4>
          </div>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 若无房源 -->
    <div class="none" v-else>
      <img src="http://liufusong.top:8080/img/not-found.png" />
      <p>
        您还没有房源，<router-link class="Rent_link__2yGRO" to="/"
          >去发布房源</router-link
        >吧~
      </p>
    </div>
  </div>
</template>

<script>
import { getHouse } from '@/api/user'
export default {
  async created () {
    try {
      const { data: res } = await getHouse()
      // console.log(res)
      this.houseList = res.body
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      houseList: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.none {
  margin-top: 30px;
  text-align: center;
  img {
    width: 50%;
  }
  p {
    font-size: 28px;
  }
  a {
    color: #57c99a;
  }
}
/deep/.van-grid-item__content {
  justify-content: start;
}
.contain {
  margin-left: 20px;
  h5 {
    font-size: 30px;
    color: #394043;
  }
  p {
    color: #afb2b3;
    font-size: 24px;
  }
  h4 {
    color: #fa5741;
    font-size: 32px;
    i {
      font-size: 24px;
      font-weight: normal;
    }
  }
  span {
    display: block;
    width: 92px;
    height: 40px;
    color: #39becd;
    background-color: #e1f5f8;
    font-size: 24px;
    margin-top: 10px;
    text-align: center;
  }
}
</style>
