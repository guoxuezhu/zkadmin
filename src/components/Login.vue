<template>
  <div class="loigin_Bg">
    <div class="h-25 d-inline-block"></div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="6"></b-col>
        <b-col cols="4">
          <div class="login_Layout" @keyup.enter="login($event)">
            <h3 class="login_title">用户登录</h3>
            <b-input-group>
              <b-input-group-prepend>
                <img src="../assets/zhanghao.png" class="login_input_img">
              </b-input-group-prepend>

              <b-form-input type="text" size="lg" v-model.trim="userName" placeholder="请输入用户名"></b-form-input>
            </b-input-group>
            <br/>
            <b-input-group>
              <b-input-group-prepend>
                <img src="../assets/mima.png" class="login_input_img">
              </b-input-group-prepend>

              <b-form-input type="password" size="lg" v-model.trim="passWord" placeholder="请输入密码"></b-form-input>
            </b-input-group>

            <b-container class="bv-example-row login_mima_jizhu">
              <b-row>
                <b-col><b-form-checkbox v-model="status" value="1" unchecked-value="0">记住密码</b-form-checkbox></b-col>
                <b-col><a href="javascript:return 0" class="a_login"><small>忘记密码?</small></a></b-col>
              </b-row>
            </b-container>

            <b-button @click="login" size="lg" variant="primary" class="loginbtn">登 录</b-button>
            <br/>
          </div>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
export default {
  name: 'Login',
  created () {
  },
  data () {
    return {
      userName: localStorage.getItem('userName'),
      passWord: localStorage.getItem('passWord'),
      status: localStorage.getItem('mimastatus'),
      msg: 'Login'
    }
  },
  methods: {
    login () {
      var _this = this
      if (this.userName === '' || this.passWord === '') {
        alert('请输入用户名、密码')
        return
      }
      if (this.userName !== 'admin' || this.passWord !== 'admin') {
        alert('用户名或密码错误')
        return
      }
      var param = {
        user_name: this.userName,
        user_pass: this.passWord
      }
      axios({
        method: 'post',
        url: 'api/user_login',
        data: param,
        transformRequest: [function (data, headers) {
          return Qs.stringify(data)
        }]
      }).then(function (response) {
        console.log('=======登录==user_login=======' + JSON.stringify(response.data))
        if (response.data.flag === 1) {
          localStorage.setItem('userName', _this.userName)
          localStorage.setItem('passWord', _this.passWord)
          localStorage.setItem('mimastatus', _this.status)
          localStorage.setItem('quanxian', response.data.data.role)
          _this.$router.push({path: '/helloWorld'})
        } else {
          localStorage.setItem('userName', '')
          localStorage.setItem('passWord', '')
          localStorage.setItem('mimastatus', '')
        }
      }).catch(function (error) {
        alert(error)
      })
      // localStorage.setItem('isLogin', '1')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.borde_red {
  border: 1px solid red;
}
.loigin_Bg {
  position:absolute;
  width: 100%;
  height: 100%;
  background: url('../assets/login_bg.png') no-repeat ;
  background-size: cover;
}
.login_Layout {
  height: auto;
  width: 100%;
  border-radius: 6px;
  background-color: #c8f8fa;
  padding: 20px;
  margin-top: 25%;
}
.login_title {
  text-align: center;
  margin-bottom: 19px;
}
.login_input_img {
  background: #555CE0;
  width: 48px;
  height: 48px;
  padding: 13px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.login_mima_jizhu {
  padding-left: 0px;
  padding-right: 0px;
  margin-top: 13px;
  margin-bottom: 13px;
}
.a_login {
  float: right;
}
.loginbtn {
  width: 100%;
}
</style>
