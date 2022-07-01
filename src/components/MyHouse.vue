<template>
  <van-grid :column-num="1" direction="horizontal" v-if="houseList.length >= 1">
    <van-grid-item
      icon="photo-o"
      text="文字"
      v-for="(obj, ind) in houseList"
      :key="ind"
      class="van-hairline--bottom"
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
</template>

<script>
export default {
  props: {
    houseList: {
      type: Array,
      required: true
    }
  },
  name: 'MyHouse',
  created () { },
  data () {
    return {

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
  }
}
</style>
