<template>
  <div>
    <MyHeader name="收藏列表"></MyHeader>
    <MyHouse :houseList="list"></MyHouse>
  </div>
</template>

<script>
import { getFav } from '@/api/user'
export default {
  async created () {
    try {
      const { data: res } = await getFav()
      // console.log(res)
      this.list = res.body
    } catch (error) {
      console.log(error)
    }
  },
  data () {
    return {
      list: []
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
</style>
