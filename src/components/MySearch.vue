<template>
  <!-- 搜索栏 -->
  <div class="search-wrap">
    <van-search v-model="searchFor" show-action placeholder="请输入小区或地址">
      <template #label>
        <span @click="$router.push('/citys')">{{ currentCity }}▼</span>
      </template>
      <template #action>
        <van-icon @click="$router.push('/map')" name="location-o" size="25" />
      </template>
    </van-search>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    name: String
  },
  data () {
    return {
      searchFor: ''
    }
  },
  methods: {
  },
  computed: {
    ...mapState(['currentCity'])
  },
  components: {}
}
</script>

<style scoped lang="less">
.search-wrap {
  position: absolute;
  top: 50px;
  width: 100%;
  height: 68px;
  line-height: 68px;
  padding: 0 10px;
  z-index: 2;
  // background-color: transparent;
  .van-search {
    width: 100%;
    height: 28px;
    line-height: 28px;
  }
  .van-icon {
    height: 68px;
    line-height: 68px;
    color: #fff;
  }
  .van-search__label {
    height: 48px;
    line-height: 48px;
    color: #666;
  }
  .van-cell {
    height: 48px;
    line-height: 28px;
    padding-left: 20px;
    margin-left: 20px;
    border-left: 1px solid #e6e6e6;
  }
  .van-search__content {
    padding: 10px;
  }
}
</style>
