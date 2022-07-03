<template>
  <div class="con">
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/layout/look" icon="search">找房</van-tabbar-item>
      <van-tabbar-item replace to="/layout/ask" icon="chat-o">咨询</van-tabbar-item>
      <van-tabbar-item replace to="/layout/my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {},
  computed: {},
  components: {}
}
</script>

<style scoped>
</style>
