<template>
  <div class="container">
    <!-- 头部 -->
    <MyHeader name="账号登录"></MyHeader>
    <!-- <van-nav-bar title="账号登录" left-arrow @click-left="onClickLeft" /> -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.name"
        name="username"
        placeholder="请输入账号"
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: /^[a-zA-Z0-9_-]{5,8}$/, message: '用户名为5-8位' },
        ]"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^[a-zA-Z0-9_-]{5,12}$/, message: '密码为5-12位' },
        ]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登 录</van-button
        >
      </div>
    </van-form>

    <!-- 注册 -->
    <div class="reg-wrap">
      <a href="javascript:;" class="reg">还没有账号,去注册~</a>
    </div>
  </div>
</template>

<script>
import { loginUp } from '@/api/user'
import MyHeader from '@/components/MyHeader.vue'
export default {
  data () {
    return {
      user: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        // console.log('submit', values)
        const { data: res } = await loginUp(values)
        if (res.status === 200) {
          this.$toast.success('登录成功')
          this.$store.commit('SETUSER', res.body)
          this.$router.push({ name: 'my' })
        }
      } catch (e) {
        this.$toast.fail('登录失败')
      }
    }
    // onClickLeft () {
    //   this.$router.go('-1')
    // }
  },
  computed: {},
  components: { MyHeader }
}
</script>

<style scoped lang="less">
.van-form {
  margin: 42px;
  .van-field {
    height: 120px;
  }
  .van-button {
    background-color: #21b97a;
    font-size: 36px;
  }
}
.reg-wrap {
  position: relative;
  .reg {
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: #333;
    font-size: 28px;
  }
}
</style>
