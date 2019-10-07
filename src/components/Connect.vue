<template>
  <div class="loigin_Bg">
    <div class="h-25 d-inline-block"></div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="6"></b-col>
        <b-col cols="4">
          <div class="connect_Layout" @keyup.enter="connect($event)">
            <h3 class="connect_title">设备连接</h3>
            <b-input-group>
              <b-input-group-prepend>
                <img src="../assets/connect.png" class="connect_input_img">
              </b-input-group-prepend>
              <b-form-input type="text" size="lg" v-model.trim="ZKIP" :state="ipStatus" placeholder="请输入设备IP地址"></b-form-input>
            </b-input-group>
            <br/>
            <b-button @click="connect" size="lg" variant="primary" class="connectbtn">连 接</b-button>
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
export default {
  name: 'Connect',
  created () {
    console.log('=========Connect=====created=======')
    if (localStorage.getItem('passWord') === '' || localStorage.getItem('passWord') === null) {
      this.$router.push({path: '/login'})
    }
  },
  data () {
    return {
      ZKIP: localStorage.getItem('zhongkongIP'),
      ipStatus: 'null'
    }
  },
  methods: {
    connect () {
      var _this = this
      if (this.ZKIP === '') {
        this.ipStatus = false
        return
      }
      this.ipStatus = true
      var param = {}
      axios({
        method: 'get',
        url: 'http://' + _this.ZKIP + ':8099/api/ipconnect',
        params: param
      }).then(function (response) {
        console.log('=======连接=============' + JSON.stringify(response.data))
        if (response.data === 200) {
          localStorage.setItem('zhongkongIP', _this.ZKIP)
          // localStorage.setItem('isConnect', '1')
          _this.$router.push({path: '/mainView'})
        }
      }).catch(function (error) {
        alert(error)
      })
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
.connect_Layout {
  height: auto;
  width: 100%;
  border-radius: 6px;
  background-color: #c8f8fa;
  padding: 20px;
  margin-top: 35%;
}
.connect_title {
  text-align: center;
  margin-bottom: 19px;
}
.connect_input_img {
  background: #555CE0;
  width: 48px;
  height: 48px;
  padding: 13px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.connectbtn {
  width: 100%;
}
</style>
