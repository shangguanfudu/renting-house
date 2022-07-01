<template>
  <div>
    <MyHeader name="发布房源"></MyHeader>
    <h5>房源信息</h5>
    <van-form @submit="onSubmit">
      <!-- 小区名称 -->
      <van-field
        is-link
        readonly
        @click="$router.push({ name: 'commity' })"
        label="小区名称"
        label-align="center"
        placeholder="请输入小区名称"
        v-model="$store.state.commityName.communityName"
      />
      <!-- 租金 -->
      <van-field
        v-model="price"
        label="租 金"
        label-align="center"
        type="number"
        placeholder="请输入租金/月"
      >
        <template #right-icon>
          <span>￥{{ price }}/月</span>
        </template>
      </van-field>
      <!-- 建筑面积 -->
      <van-field
        v-model="size"
        label="建筑面积"
        label-align="center"
        type="number"
        placeholder="请输入建筑面积"
      >
        <template #right-icon>
          <span>{{ size }}m²</span>
        </template>
      </van-field>
      <!-- 户型 -->
      <van-field
        readonly
        clickable
        name="picker"
        :value="houseStyle.value"
        label="户 型"
        label-align="center"
        placeholder="请选择"
        @click="houseStyle.showPicker = true"
      />
      <van-popup v-model="houseStyle.showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="houseStyle.columns"
          @confirm="houseStyleConfirm"
          @cancel="houseStyle.showPicker = false"
        />
      </van-popup>
      <!-- 所在楼层 -->
      <van-field
        readonly
        clickable
        name="picker2"
        :value="floor.value"
        label="所在楼层"
        label-align="center"
        placeholder="请选择"
        @click="floor.showPicker = true"
      />
      <van-popup v-model="floor.showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="floor.columns"
          @confirm="floorConfirm"
          @cancel="floor.showPicker = false"
        />
      </van-popup>
      <!-- 朝向 -->
      <van-field
        readonly
        clickable
        name="picker3"
        :value="orient.value"
        label="朝 向"
        label-align="center"
        placeholder="请选择"
        @click="orient.showPicker = true"
      />
      <van-popup v-model="orient.showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="orient.columns"
          @confirm="orientConfirm"
          @cancel="orient.showPicker = false"
        />
      </van-popup>
      <!-- 房屋标题 -->
      <p class="tit">房屋标题</p>
      <van-cell-group>
        <van-field
          v-model="title"
          placeholder="请输入标题 (例如: 整租 小区名 2室 5000元)"
        />
      </van-cell-group>
      <!-- 房屋图像 -->
      <p class="tit">房屋图像</p>
      <van-field name="uploader">
        <template #input>
          <van-uploader v-model="uploader" />
        </template>
      </van-field>
      <!-- 房屋配置 -->
      <p class="tit">房屋配置</p>
      <van-field name="checkboxGroup">
        <template #input>
          <van-checkbox-group v-model="equip" direction="horizontal">
            <van-checkbox name="衣柜" shape="square" checked-color="#21b97a">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="props.checked ? closet.activeIcon : closet.inactiveIcon"
                />
              </template>
              <template #default>
                <p>衣柜</p>
              </template>
            </van-checkbox>
            <van-checkbox name="洗衣机" shape="square">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="props.checked ? wash.activeIcon : wash.inactiveIcon"
                />
              </template>
              洗衣机
            </van-checkbox>
            <van-checkbox name="空调" shape="square">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="props.checked ? air.activeIcon : air.inactiveIcon"
                />
              </template>
              空调
            </van-checkbox>
            <van-checkbox name="天然气" shape="square">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="props.checked ? gas.activeIcon : gas.inactiveIcon"
                />
              </template>
              天然气
            </van-checkbox>
            <van-checkbox name="冰箱" shape="square">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="props.checked ? cold.activeIcon : cold.inactiveIcon"
                />
              </template>
              冰箱
            </van-checkbox>
            <van-checkbox name="暖气" shape="square">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="props.checked ? hot.activeIcon : hot.inactiveIcon"
                />
              </template>
              暖气
            </van-checkbox>
            <van-checkbox name="电视" shape="square">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="props.checked ? tv.activeIcon : tv.inactiveIcon"
                />
              </template>
              电视
            </van-checkbox>
            <van-checkbox name="热水器" shape="square">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="
                    props.checked ? hotWater.activeIcon : hotWater.inactiveIcon
                  "
                />
              </template>
              热水器
            </van-checkbox>
            <van-checkbox name="宽带" shape="square">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="props.checked ? wifi.activeIcon : wifi.inactiveIcon"
                />
              </template>
              宽带
            </van-checkbox>
            <van-checkbox name="沙发" shape="square">
              <template #icon="props">
                <img
                  class="img-icon"
                  :src="props.checked ? soft.activeIcon : soft.inactiveIcon"
                />
              </template>
              沙发
            </van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
      <!-- 房屋描述 -->
      <p class="tit">房屋描述</p>
      <van-field
        v-model="message"
        rows="5"
        autosize
        type="textarea"
        placeholder="请输入房屋描述信息"
      />
      <div style="margin: 16px" class="btn">
        <van-button block type="default" @click="cancel">取消</van-button>
        <van-button block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { pubHouse } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      areaName: '',
      price: '',
      size: '',
      houseStyle: {
        value: '',
        columns: ['一室', '两室', '三室', '四室', '四室以上'],
        showPicker: false
      },
      floor: {
        value: '',
        columns: ['高楼层', '中楼层', '低楼层'],
        showPicker: false
      },
      orient: {
        value: '',
        columns: ['东', '南', '西', '北', '东南', '东北', '西南', '西北'],
        showPicker: false
      },
      title: '',
      uploader: [],
      equip: [],
      message: '',
      checked: true,
      closet: {
        activeIcon: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactiveIcon: 'https://img01.yzcdn.cn/vant/user-inactive.png'
      },
      wash: {
        activeIcon: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactiveIcon: 'https://img01.yzcdn.cn/vant/user-inactive.png'
      },
      air: {
        activeIcon: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactiveIcon: 'https://img01.yzcdn.cn/vant/user-inactive.png'
      },
      gas: {
        activeIcon: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactiveIcon: 'https://img01.yzcdn.cn/vant/user-inactive.png'
      },
      cold: {
        activeIcon: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactiveIcon: 'https://img01.yzcdn.cn/vant/user-inactive.png'
      },
      hot: {
        activeIcon: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactiveIcon: 'https://img01.yzcdn.cn/vant/user-inactive.png'
      },
      tv: {
        activeIcon: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactiveIcon: 'https://img01.yzcdn.cn/vant/user-inactive.png'
      },
      hotWater: {
        activeIcon: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactiveIcon: 'https://img01.yzcdn.cn/vant/user-inactive.png'
      },
      wifi: {
        activeIcon: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactiveIcon: 'https://img01.yzcdn.cn/vant/user-inactive.png'
      },
      soft: {
        activeIcon: 'https://img01.yzcdn.cn/vant/user-active.png',
        inactiveIcon: 'https://img01.yzcdn.cn/vant/user-inactive.png'
      }

    }
  },
  methods: {
    async onSubmit () {
      try {
        const data = {
          title: this.title,
          description: this.message,
          houseImg: this.uploader[0].content,
          oriented: 'ORIEN|141b98bf-1ad0-11e3',
          supporting: this.equip.join('|'),
          price: this.price,
          roomType: 'ROOM|ce2a5daa-811d-2f49',
          size: this.size,
          floor: `FLOOR|${this.floor.value === '高楼层' ? '1' : this.floor.value === '中楼层' ? '2' : '3'}`,
          community: this.commityName.community
        }
        const { data: res } = await pubHouse(data)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    },
    houseStyleConfirm (value) {
      this.houseStyle.value = value
      this.houseStyle.showPicker = false
    },
    floorConfirm (value) {
      this.floor.value = value
      this.floor.showPicker = false
    },
    orientConfirm (value) {
      this.orient.value = value
      this.orient.showPicker = false
    },
    async cancel () {
      try {
        await this.$dialog.confirm({ message: '确认是否退出编辑' })
        this.$router.push({ name: 'home' })
      } catch (err) { console.log(err) }
    }
  },
  computed: {
    ...mapState(['commityName'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
h5 {
  margin: 15px;
  font-size: 30px;
  color: #61c07a;
  font-weight: normal;
}
.btn {
  display: flex;
  /deep/ .van-button--default {
    color: #61c07a;
  }
}
.tit {
  width: 240px;
  height: 60px;
  line-height: 60px;
  font-size: 28px;
  text-align: center;
}
.img-icon {
  height: 48px;
}
</style>
