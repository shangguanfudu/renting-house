<template>
  <div>
    <van-search
      @input="onSearch()"
      v-model="areaName"
      show-action
      placeholder="请输入小区或地址"
    >
      <template #action>
        <span @click="$router.go('-1')">取消</span>
      </template>
    </van-search>

    <van-cell-group>
      <van-cell
        :title="obj.communityName"
        v-for="obj in commityList"
        :key="obj.community"
        @click="
          areaName = obj.communityName;
          COMMITY(obj);
          $router.go('-1');
        "
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getCom } from '@/api/area'
import { watchCity } from '@/function'
let timer = null
export default {
  name: 'Commity',
  created () {

  },
  data () {
    return {
      areaName: '',
      commityList: [],
      cityValue: ''
    }
  },
  methods: {
    ...mapMutations(['COMMITY']),
    async onSearch () {
      if (this.timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        try {
          const { data: res } = await getCom({ name: this.areaName, id: this.cityValue })
          // console.log(res)
          this.commityList = res.body
        } catch (err) {
          console.log(err)
        }
      }, 700)
    }

  },
  computed: { ...mapState(['commityName', 'currentCity']) },
  watch: {
    ...watchCity
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
