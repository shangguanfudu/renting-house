<template>
  <div class="container">
    <!-- 已登录 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="logbox">
        <div class="avatar">
          <van-image
            width="100%"
            height="100%"
            round
            :src="'http://liufusong.top:8080'+userInfo.avatar"
          />
        </div>
        <div class="contain">
          <p>{{ userInfo.nickname }}</p>
          <van-button type="primary" round size="mini" @click="logout"
            >退出</van-button
          >
          <div class="edit">
            编辑个人资料
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header header-unlog" v-else>
      <div class="logbox">
        <div class="avatar">
          <van-image
            width="100%"
            height="100%"
            round
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <div class="contain">
          <p>游客</p>
          <van-button
            type="primary"
            round
            size="small"
            @click="$router.push('/login')"
            >去登录</van-button
          >
        </div>
      </div>
    </div>

    <!-- 宫格导航 -->
    <div class="grid-wrap">
      <van-grid :column-num="3" clickable>
        <van-grid-item
          icon="star-o"
          text="我的收藏"
          @click="$router.push({ name: 'mystar' })"
        />
        <van-grid-item
          icon="shop-o"
          text="我的出租"
          @click="$router.push({ name: 'myrent' })"
        />
        <van-grid-item icon="clock-o" text="看房记录" />
        <van-grid-item icon="idcard" text="成为房主" />
        <van-grid-item icon="contact" text="个人资料" />
        <van-grid-item icon="service-o" text="联系我们" />
      </van-grid>
    </div>
    <!-- 广告 -->
    <div class="ad">
      <van-image
        width="90%"
        height="100%"
        src="http://liufusong.top:8080/img/profile/join.png"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getInfo } from '@/api/user'
export default {
  async created () {
    try {
      const { data: res } = await getInfo()
      // console.log(res)
      this.userInfo = res.body
    } catch (e) {
      console.log(e)
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确认是否退出' })
        this.$router.push({ name: 'login' })
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: { ...mapState(['user']) },
  components: {}
}
</script>

<style scoped lang="less">
.container {
  .header {
    position: relative;
    width: 100%;
    min-height: 600px;
    .logbox {
      position: absolute;
      top: 270px;
      left: 50%;
      transform: translateX(-50%);
      // border: 1px solid #ccc;
      box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
      width: 600px;
      height: 330px;
      background-color: #fff;
      .avatar {
        position: absolute;
        top: -70px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 50%;
        width: 140px;
        height: 140px;
        border: 5px solid #f5f5f5;
        box-shadow: 0 2px 2px #bdbdbd;
      }
    }
  }
  .header-unlog {
    background: url("http://liufusong.top:8080/img/profile/bg.png") no-repeat;
    background-size: contain;
    .contain {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 26px;
      p {
        margin: 100px 0 30px;
      }
      .van-button {
        padding: 0 30px;
      }
    }
  }
  .header-login {
    background: url("http://liufusong.top:8080/img/profile/bg.png") no-repeat;
    background-size: contain;
    .contain {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 26px;
      p {
        margin: 100px 0 20px;
      }
      .van-button {
        padding: 0 30px;
        margin-bottom: 30px;
      }
      .edit {
        color: #b2b2b2;
        font-size: 24px;
      }
    }
  }
}
.grid-wrap {
  margin-top: 20px;
}
.ad {
  width: 100%;
  text-align: center;
}
</style>
