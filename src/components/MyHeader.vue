<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar :title="name" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>
export default {
  props: {
    name: String
  },
  data () {
    return {}
  },
  methods: {
    onClickLeft () {
      this.$router.go('-1')
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>
</style>
