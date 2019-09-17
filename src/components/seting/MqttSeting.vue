<template>
  <div>
    <br><br>
    <b-row>
      <b-col lg="4">
      </b-col>
      <b-col lg="4" class="btn_lubo_tijiao">
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">设备位置</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="mqttdata.classRoom" placeholder="请输入设备位置"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">远程用户帐号</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="mqttdata.mqttuser" placeholder="请输入远程用户帐号"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">远程用户密码</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="mqttdata.mqttpassword" placeholder="请输入远程用户密码"></b-form-input>
        </b-input-group>
        <br>
        <b-button variant="outline-success" @click="mqttInfoCommit()">提 交</b-button>
      </b-col>
      <b-col lg="4">
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
// import apply from '../../api/apply.js'
export default {
  created () {
    console.log('=========BaseInfo===========')
    // this.getBaseInfo()
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
    mqttInfoCommit () {
      var _this = this
      var param = {
        mqttData: _this.mqttdata
      }
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataMqttInfo',
        params: param
      }).then(function (response) {
        console.log('=======提交======提交=======' + JSON.stringify(response.data))
        if (response.data.success) {
          alert('修改成功')
        } else {
          alert('修改失败')
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
