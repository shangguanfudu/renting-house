<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <van-icon name="arrow-left" @click="$router.go('-1')" />
      <div class="search">
        <MySearch></MySearch>
      </div>
    </div>

    <!-- 下拉菜单 -->
    <van-dropdown-menu z-index="10" lazy-render>
      <van-dropdown-item title="区域" @open="isMenuShow = true">
        <template #default>
          <van-picker
            toolbar-position="bottom"
            show-toolbar
            :columns="areaList"
            @confirm="Confirm"
            @cancel="onCancel"
            v-if="isMenuShow"
          >
            <template #confirm>
              <van-button block size="large" type="primary">确定</van-button>
            </template>
            <template #cancel>
              <van-button block plain size="large" type="primary"
                >取消</van-button
              >
            </template>
          </van-picker>
        </template>
      </van-dropdown-item>
      <van-dropdown-item title="方式" v-model="value2" :options="option2" />
      <van-dropdown-item title="租金" v-model="value3" :options="option3" />
      <van-dropdown-item title="筛选" ref="item" @open="isPopShow = true">
        <van-popup :overlay="false" position="right" v-model="isPopShow">
          <div class="wrap">
            <section>
              <div class="header">户型</div>
              <div class="main">
                <van-checkbox-group icon-size="0" v-model="roomTypeRes">
                  <van-checkbox
                    v-for="(obj, ind) in checks.roomType"
                    :key="ind"
                    :name="obj.value"
                  >
                    <template #default>
                      <div
                        class="text"
                        :class="{
                          green: roomTypeRes.some((item) => item === obj.value),
                        }"
                      >
                        {{ obj.label }}
                      </div>
                    </template>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </section>
            <section>
              <div class="header">朝向</div>
              <div class="main">
                <van-checkbox-group icon-size="0" v-model="orientedRes">
                  <van-checkbox
                    v-for="(obj, ind) in checks.oriented"
                    :key="ind"
                    :name="obj.value"
                  >
                    <template #default>
                      <div
                        class="text"
                        :class="{
                          green: orientedRes.some((item) => item === obj.value),
                        }"
                      >
                        {{ obj.label }}
                      </div>
                    </template>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </section>
            <section>
              <div class="header">楼层</div>
              <div class="main">
                <van-checkbox-group icon-size="0" v-model="floorRes">
                  <van-checkbox
                    v-for="(obj, ind) in checks.floor"
                    :key="ind"
                    :name="obj.value"
                  >
                    <template #default>
                      <div
                        class="text"
                        :class="{
                          green: floorRes.some((item) => item === obj.value),
                        }"
                      >
                        {{ obj.label }}
                      </div>
                    </template>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </section>
            <section>
              <div class="header">房屋亮点</div>
              <div class="main">
                <van-checkbox-group icon-size="0" v-model="moreRes">
                  <van-checkbox
                    v-for="(obj, ind) in more"
                    :key="ind"
                    :name="obj.value"
                  >
                    <template #default>
                      <div
                        class="text"
                        :class="{
                          green: moreRes.some((item) => item === obj.value),
                        }"
                      >
                        {{ obj.label }}
                      </div>
                    </template>
                  </van-checkbox>
                </van-checkbox-group>
              </div>
            </section>
            <div class="btns">
              <van-button
                block
                plain
                class="btn1"
                type="primary"
                @click="moreCancel"
                >清除</van-button
              >
              <van-button class="btn2" block type="primary" @click="moreConfirm"
                >确定</van-button
              >
            </div>
          </div>
        </van-popup>
        <!-- <van-cell center title="包邮">
          <template #right-icon>
            <van-switch v-model="switch1" size="24" active-color="#ee0a24" />
          </template>
        </van-cell>
        <van-cell center title="团购">
          <template #right-icon>
            <van-switch v-model="switch2" size="24" active-color="#ee0a24" />
          </template>
        </van-cell> -->
        <!-- <div style="padding: 5px 16px">
          <van-button type="danger" block round @click="onConfirm">
            确认
          </van-button>
        </div> -->
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 房屋列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <MyHouse :houseList="houseList"></MyHouse>
    </van-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCityValue } from '@/api/area'
import { getConditions, getAddConditions, checkHouse } from '@/api/house'
export default {
  name: 'Look',
  created () {
    this.getAddConditions()
    this.getList()
  },
  data () {
    return {
      houseList: [],
      areaList: [],
      cityValue: '',
      isMenuShow: false,
      isPopShow: false,
      value2: 'null',
      value3: 'null',
      loading: false,
      finished: false,
      end: 10,
      checks: {
      },
      roomTypeRes: [],
      orientedRes: [],
      floorRes: [],
      moreRes: [],
      more: [
        { label: '集中供暖', value: 'CHAR|f56b9ad7-a97c-b28f' },
        { label: '双卫生间', value: 'CHAR|51ae05f0-7c7a-c24b' },
        { label: '近地铁', value: 'CHAR|76eb0532-8099-d1f4' }, { label: '随时看房', value: 'CHAR|ee11187b-a631-beef' },
        { label: '精装', value: 'CHAR|1d9bf0be-284f-93dd' },
        { label: '公寓', value: 'CHAR|2d9fb1b2-dbf9-eb64' },
        { label: '独立卫生间', value: 'CHAR|c3d3e453-c3fa-d4af' },
        { label: '押一付一', value: 'CHAR|f838b575-9196-bf13' },
        { label: '独立阳台', value: 'CHAR|479e8f8a-f193-9605' },
        { label: '月租', value: 'CHAR|3870eb95-3f80-e5f8' },
        { label: '限女生', value: 'CHAR|014e0e46-2147-8785' }, { label: '限男生', value: 'CHAR|7121e024-499d-c929' }, { label: '新上', value: 'CHAR|41e8322b-3846-d721' }
      ],
      moreStr: '',
      option2: [
        { text: '不限', value: 'null' },
        { text: '整租', value: 'true' },
        { text: '合租', value: 'false' }
      ],
      option3: [
        { text: '不限', value: 'null' },
        { text: '1000及以下', value: 'PRICE|1000' },
        { text: '1000 - 2000', value: 'PRICE|2000' },
        { text: '2000 - 3000', value: 'PRICE|3000' },
        { text: '3000 - 4000', value: 'PRICE|4000' },
        { text: '4000 - 5000', value: 'PRICE|5000' },
        { text: '5000 - 7000', value: 'PRICE|7000' },
        { text: '7000以上', value: 'PRICE|100001' }

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
    },
    async getAddConditions () {
      try {
        const { data: res } = await getAddConditions()
        // console.log(res)
        this.checks = res.body
      } catch (error) {
        console.log(error)
      }
    },
    async getList () {
      try {
        const { data: res } = await checkHouse({
          cityId: this.cityValue,
          rentType: this.value2,
          price: this.value3,
          more: this.moreStr,
          start: 1,
          end: this.end
        })
        // console.log(res)
        this.houseList = res.body.list
      } catch (error) {
        console.log(error)
      }
    },
    onLoad () {
      this.end += 10
      this.getList()
      this.loading = false
      // 数据全部加载完成
      if (this.houseList.length >= 100) {
        this.finished = true
      }
    },
    moreConfirm () {
      this.moreStr = [...this.roomTypeRes, ...this.orientedRes, ...this.floorRes, ...this.moreRes].join(',')
      this.getList()
      this.isPopShow = false
      this.$refs.item.toggle()
    },
    moreCancel () {
      this.roomTypeRes = this.orientedRes = this.floorRes = this.moreRes = []
    }
  },
  computed: {
    ...mapState(['currentCity'])
  },
  components: {},
  watch: {
    currentCity: {
      immediate: true,
      async handler () {
        try {
          const { data: res } = await getCityValue(this.currentCity)
          // console.log(res)
          this.cityValue = res.body.value
        } catch (error) {
          console.log(error)
        }
      }
    },
    cityValue: {
      // immediate: true,
      async handler () {
        try {
          const { data: res } = await getConditions(this.cityValue)
          console.log(res)
          this.areaList = res.body.area.children
        } catch (error) {
          console.log(error)
        }
      }
    },
    value2: {
      deep: true,
      handler () {
        this.getList()
      }
    },
    value3: {
      deep: true,
      handler () {
        this.getList()
      }
    }
  }
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
/deep/ .van-picker__toolbar {
  justify-content: space-around;
}
/deep/ .van-picker__cancel {
  flex: 33%;
  padding: 0;
}
/deep/ .van-picker__confirm {
  flex: 67%;
  padding: 0;
}
/deep/.van-dropdown-menu__bar--opened {
  z-index: 10 !important;
}
.van-button {
  height: 100px;
}
.wrap {
  height: 100vh;
  width: 590px;
  padding: 0 30px 30px;
  overflow: auto;
  padding-bottom: 100px;
  .header {
    margin: 40px 0;
    background-color: #fff;
    height: 36px;
    font-size: 30px;
  }
  .main {
    width: 450px;
    margin-left: 80px;
    padding-bottom: 28px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 24px;
    .van-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      .van-checkbox {
        flex: 50%;
        .text {
          border: 1px solid #ddd;
          width: 134px;
          height: 60px;
          line-height: 60px;
          margin: 0 36px 30px 0;
          text-align: center;
        }
        .green {
          border: 1px solid #21b97a;
          color: #21b97a;
          background-color: #defaef;
        }
        /deep/ .van-checkbox__icon {
          visibility: hidden;
        }
      }
    }
  }
  .btns {
    position: fixed;
    width: 100%;
    display: flex;
    right: 0;
    bottom: 0;
    z-index: 10;
    .btn1 {
      flex: 33%;
    }
    .btn2 {
      flex: 67%;
    }
  }
}
</style>
