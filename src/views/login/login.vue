<template>
  <div class="login-wrap">
    <div class="main-login">
      <el-form label-width="80px" :rules="LoginFormRules" :model="loginForm" ref="loginFormEl">
        <el-form-item label="用户名" prop="username">
          <el-input  v-model='loginForm.username'></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password">
          <el-input v-model='loginForm.password' show-password></el-input>
        </el-form-item>
        <el-button class="btn" type="primary" @click.prevent="handleLogin">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      LoginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async handleLogin () {
      this.$refs.loginFormEl.validate(valid => {
        if (valid) {
          this.Login()
        } else {
          return false
        }
      })
    },
    async Login () {
      const loginForm = this.loginForm
      const { data, meta } = (await axios.post('http://localhost:8888/api/private/v1/login', loginForm)).data
      if (meta.status === 200) {
        this.$message({
          message: meta.msg,
          type: 'success'
        })
        // 将收到的用户身份令牌放到本地存储中
        window.localStorage.setItem('token', data.token)
        // 成功登陆后跳转到之前界面或者Home界面
        this.$router.replace('/')
      } else {
        this.checkFalse(meta)
      }
    },
    checkFalse (meta) {
      this.$message.error('登录失败：' + meta.msg)
    }
  }
}
</script>

<style scoped>
.login-wrap {
  height: 100%;
  background-color: #2f4050;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main-login {
  width: 400px;
  height: 230px;
  border-radius: 20px;
  background: #fff;
  box-sizing: border-box;
  padding: 30px 50px;
}

.btn {
  width: 100%;
  font-size: 20px;
}
</style>
