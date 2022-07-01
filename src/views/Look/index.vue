<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <van-icon name="arrow-left" @click="$router.go('-1')" />
      <div class="search">
        <MySearch></MySearch>
      </div>
    </div>

    <!-- 下拉菜单 -->
    <van-dropdown-menu lazy-render >
      <van-dropdown-item title="区域" @open="isMenuShow = true">
        <template #default>
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="Confirm"
            @cancel="onCancel"
            v-if="isMenuShow"
          />
        </template>
      </van-dropdown-item>
      <van-dropdown-item title="方式" v-model="value2" :options="option2" />
      <van-dropdown-item title="租金" v-model="value3" :options="option3" />
      <van-dropdown-item title="筛选" ref="item">
        <van-cell center title="包邮">
          <template #right-icon>
            <van-switch v-model="switch1" size="24" active-color="#ee0a24" />
          </template>
        </van-cell>
        <van-cell center title="团购">
          <template #right-icon>
            <van-switch v-model="switch2" size="24" active-color="#ee0a24" />
          </template>
        </van-cell>
        <div style="padding: 5px 16px">
          <van-button type="danger" block round @click="onConfirm">
            确认
          </van-button>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isMenuShow: false,
      value2: 0,
      value3: 0,
      switch1: false,
      switch2: false,
      option2: [
        { text: '不限', value: 0 },
        { text: '整租', value: 1 },
        { text: '合租', value: 2 }
      ],
      option3: [
        { text: '不限', value: 0 },
        { text: '1000及以下', value: 1 },
        { text: '1000~2000', value: 2 },
        { text: '2000~3000', value: 3 },
        { text: '3000~4000', value: 4 },
        { text: '3000~5000', value: 5 },
        { text: '5000以上', value: 6 }

      ],
      columns: [
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
              children: [{ text: '西湖区' }, { text: '余杭区' }]
            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
          ]
        },
        {
          text: '福建',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }]
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }]
            }
          ]
        }
      ]
    }
  },
  methods: {
    Confirm (value, index) {
      this.isMenuShow = false
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel () {
      this.isMenuShow = false
      this.$toast('取消')
    },
    onConfirm () {
      this.$refs.item.toggle()
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  width: 100%;
  height: 120px;
  background-color: #21b97a;
  .van-icon {
    line-height: 120px;
    color: #fff;
  }
  /deep/ .search-wrap {
    top: 40px;
    width: 95%;
  }
}
</style>
