<template>
  <div>
    <MyHeader :name="detail.community"></MyHeader>

    <van-image
      :src="'http://liufusong.top:8080' + detail.houseImg"
      width="100%"
      height="252"
    ></van-image>
    <!-- 房屋细节 -->
    <div class="house-detail">
      <div class="top">
        <h1>{{ detail.title }}</h1>
        <span>{{ detail.tags }}</span>
      </div>
      <div class="middle">
        <div class="detail">
          <p>{{ detail.price }} 元/月</p>
          <span>租金</span>
        </div>
        <div class="detail">
          <p>{{ detail.roomType }}</p>
          <span>房型</span>
        </div>
        <div class="detail">
          <p>{{ detail.size }} m²</p>
          <span>面积</span>
        </div>
      </div>
      <div class="bottom">
        <div class="desc">
          <span>装修:</span>
          <i>精装</i>
        </div>
        <div class="desc">
          <span>朝向:</span>
          <i>{{ detail.oriented }}</i>
        </div>
        <div class="desc">
          <span>楼层:</span>
          <i>{{ detail.floor }}</i>
        </div>
        <div class="desc">
          <span>类型:</span>
          <i>普通住宅</i>
        </div>
      </div>
    </div>

    <!-- 地图 -->
    <div class="map">
      <div class="title">小区: {{ detail.community }}</div>
      <div class="main"></div>
    </div>
    <!-- 房屋设备 -->
    <div class="equip">
      <div class="header">房屋配套</div>
      <div class="main">
        <van-grid :column-num="5" :border="false">
          <van-grid-item
            v-for="value in detail.supporting"
            :key="value"
            :text="value"
          >
            <template #icon>
              <i class="iconfont" :class="iClass(value)"></i>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <!-- 房屋概况 -->
    <div class="about">
      <div class="header">房屋概况</div>
      <div class="renter">
        <div class="mid">
          <van-image
            src="http://liufusong.top:8080/img/avatar.png"
            width="1.39rem"
            height="1.39rem"
          ></van-image>
          <div class="tet">
            <p>王女士</p>
            <span> <van-icon name="shield-o" />已认证房主 </span>
          </div>
        </div>
        <van-button plain type="primary">发消息</van-button>
      </div>
      <p class="text">
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
        2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
        3.人车分流，环境优美。
        4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </p>
    </div>
    <!-- 猜你喜欢 -->
    <div class="like">
      <div class="header">猜你喜欢</div>
      <div class="main">
        <MyHouse :houseList="list"></MyHouse>
      </div>
    </div>
    <!-- 底部按钮组 -->
    <div class="btns">
      <van-button type="default" @click="changeFav">
        <van-icon name="star" color="#ff4f00" v-if="isFavorite" />
        <van-icon name="star-o" v-else />
        收藏
      </van-button>
      <van-button type="default">在线咨询</van-button>
      <van-button type="primary">电话预约</van-button>
    </div>
  </div>
</template>

<script>
import { getDetail, checkIf } from '@/api/house'
import { isFav, addFav, delFav } from '@/api/user'
export default {
  name: 'Detail',
  created () {
    this.getDetail()
    this.isFav()
  },
  props: ['id'],
  data () {
    return {
      list: [{
        houseImg: '/newImg/7bj63hd2c.jpg',
        title: '复兴门外大街 2室1厅 ',
        tags: [
          '近地铁',
          '集中供暖',
          '新上'
        ],
        price: 10000,
        desc: '二室/66/南/复兴门外大街',
        houseCode: '5cc467fc1439630e5b430566'
      },
      {
        houseImg: '/newImg/7bi2cga4p.jpg',
        title: '建邦华庭西区 2室1厅 ',
        tags: [
          '近地铁',
          '集中供暖',
          '新上'
        ],
        price: 4600,
        desc: '二室/53/南/建邦华庭西区',
        houseCode: '5cc467e31439630e5b42fffa'
      },
      {
        houseImg: '/newImg/7bi61paa8.jpg',
        title: '万寿路乙15号院 2室1厅',
        tags: [
          '近地铁',
          '集中供暖',
          '新上',
          '随时看房'
        ],
        price: 6000,
        desc: '二室/92/南/万寿路乙15号院',
        houseCode: '5cc46ab31439630e5b439daf'
      }],
      detail: {},
      isFavorite: false
    }
  },
  methods: {
    // 获取详情
    async getDetail () {
      try {
        const { data: res } = await getDetail(this.id)
        // console.log(res)
        this.detail = res.body
        this.detail.tags = this.detail.tags[0]
        this.detail.oriented = this.detail.oriented[0]
        this.detail.houseImg = this.detail.houseImg[0]
        // 根据id猜你喜欢
        const { data: result } = await checkIf()
        // console.log(result)
        this.list = result.body.list.splice(0, 3)
      } catch (error) {
        console.log(error)
      }
    },
    // 房屋是否已收藏
    async isFav () {
      try {
        const { data: res } = await isFav(this.id)
        // console.log(res)
        this.isFavorite = res.body.isFavorite
      } catch (error) {
        console.log(error)
      }
    },
    async changeFav () {
      this.isFavorite = !this.isFavorite
      if (this.isFavorite) {
        await addFav(this.id)
      } else {
        await delFav(this.id)
      }
    },
    iClass (val) {
      switch (val) {
        case '空调': return 'icon-kongtiao'
        case '电视': return 'icon-dianshi'
        case '衣柜': return 'icon-yigui'
        case '沙发': return 'icon-canyi'
        case '宽带': return 'icon-wifi'
        case '洗衣机': return 'icon-xiyiji'
        case '冰箱': return 'icon-bingxiang'
        case '暖气': return 'icon-yuba'
        case '热水器': return 'icon-reshuiqi'
        case '天然气': return 'icon-meiqitianranqi'
      }
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  padding: 30px 0;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  border-bottom: 1px solid #cfcfcf;
}
.house-detail {
  margin-bottom: 15px;
  width: 100%;
  height: 542px;
  padding: 30px;
  // background-color: pink;
  span {
    color: #999;
  }
  .top {
    h1 {
      font-weight: normal;
      font-size: 32px;
      margin: 32px 0;
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
  .middle {
    margin: 30px 0;
    padding: 30px 0;
    display: flex;
    justify-content: space-around;
    text-align: center;
    border-top: 1px solid #cfcfcf;
    border-bottom: 1px solid #cfcfcf;
    p {
      font-size: 36px;
      color: #f4553f;
    }
    span {
      font-size: 28px;
    }
  }
  .bottom {
    display: flex;
    flex-wrap: wrap;
    .desc {
      flex: 50%;
      font-size: 26px;
      margin-bottom: 20px;
      i {
        margin-left: 15px;
      }
    }
  }
}
.map {
  .title {
    padding-left: 30px;
    font-size: 28px;
    height: 88px;
    line-height: 88px;
    width: 100%;
    // background-color: pink;
  }
  .main {
    width: 100%;
    height: 290px;
    background-color: #e2e7ed;
  }
}
.equip {
  padding: 0 30px;
  .main {
    height: 280px;
    // background-color: #ccc;
    /deep/ .van-grid-item__content {
      padding: 16px 8px;
    }
    i {
      font-size: 48px;
    }
  }
}
.about {
  margin: 20px 0;
  padding: 0 30px;
  .renter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .mid {
      display: flex;
      p {
        font-size: 28px;
      }
      span {
        font-size: 24px;
        color: #fa5741;
      }
      .tet {
        margin-left: 30px;
      }
    }
    .van-button {
      width: 148px;
      height: 58px;
      font-size: 28px;
    }
  }
  .text {
    padding: 20px 0;
    font-size: 28px;
  }
}
.like {
  padding: 0 30px;
}
.btns {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  justify-content: space-around;
  .van-button {
    flex: 1;
  }
}
</style>
