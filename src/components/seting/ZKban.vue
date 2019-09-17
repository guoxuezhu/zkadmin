<template>
  <div>
    <br><br>
    <b-button @click="btnSendMsg('SKJAA')" v-b-popover.hover.right="'没有卡的时候可以控制操作面板进入控制界面'"
      variant="outline-success">启动操作面板</b-button>
    <br>
  </div>
</template>

<script>
import axios from 'axios'
// import apply from '../../api/apply.js'
export default {
  created () {
    console.log('=========控制面板===========')
  },
  data () {
    return {
      mqttdata: {
        classRoom: '',
        mqttuser: '',
        mqttpassword: '',
        uuid: ''
      },
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    mqttInfo () {
      var _this = this
      var param = {}
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/mqttInfo',
        params: param
      }).then(function (response) {
        console.log('=======mqtt=============' + JSON.stringify(response.data))
        _this.mqttdata = response.data.data
      }).catch(function (error) {
        alert(error)
      })
    },
    btnSendMsg (btnmsg) {
      var param = {
        zkbtn: btnmsg
      }
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/zkczbtn',
        params: param
      }).then(function (response) {
        console.log('=======提交======提交=======' + JSON.stringify(response.data))
        if (response.data.success) {
          alert('成功')
        } else {
          alert('失败')
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
.btn_lubo_tijiao {
  text-align: center;
}
</style>
