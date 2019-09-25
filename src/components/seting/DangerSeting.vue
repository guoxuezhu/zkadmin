<template>
  <div>
    <b-button class="btn_tijiao" variant="outline-success" @click="DangerInfoCommit()">提 交</b-button>
    <br><br>
    <div v-for="danger in dangerList" :key="danger.id">
      <div class="danger_bg">
        <b-row>
          <b-col lg="2">
            <b>报警{{danger.id}}口</b>
          </b-col>
          <b-col lg="4">
            <b-input-group prepend="绑定的设备">
              <b-form-input type="text" v-model.trim="danger.deviceName" placeholder="请输入绑定的设备"></b-form-input>
            </b-input-group>
          </b-col>
          <b-col lg="6">
            报警状态：<b-form-radio-group v-model="danger.dangerIoStatus" :options="dangerStatusOptions" buttons button-variant="outline-danger"></b-form-radio-group>
          </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col lg="6">
            <b-input-group prepend="报警操作指令">
              <b-form-input type="text" v-model.trim="danger.dangerMl" placeholder="请输入报警操作指令"></b-form-input>
            </b-input-group>
          </b-col>
          <b-col lg="6">
            <b-input-group prepend="非报警操作指令">
              <b-form-input type="text" v-model.trim="danger.noDangerMl" placeholder="请输入非报警操作指令"></b-form-input>
            </b-input-group>
          </b-col>
        </b-row>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import apply from '../../api/apply.js'
export default {
  data () {
    return {
      dangerStatusOptions: [
        { value: 1, text: '高电平' },
        { value: 0, text: '低电平' }
      ],
      dangerList: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getDangerInfo () {
      if (localStorage.getItem('isMyIPconnect') === '1') {
        this.ipconnectDangerInfo()
      } else {
        this.myDangerInfo()
      }
    },
    myDangerInfo () {
      var _this = this
      var param = {
        ip: localStorage.getItem('zhongkongIP')
      }
      axios({
        method: 'get',
        url: 'api/get_alarm_list',
        params: param
      }).then(function (response) {
        console.log('=======报警======get_alarm_list=======' + JSON.stringify(response.data))
        _this.dangerList = response.data.data.rows
      }).catch(function (error) {
        alert(error)
      })
    },
    ipconnectDangerInfo () {
      var _this = this
      var param = {}
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/dangerInfo',
        params: param
      }).then(function (response) {
        console.log('=======报警======zhongkongIP=======' + JSON.stringify(response.data))
        _this.dangerList = response.data.data
      }).catch(function (error) {
        alert(error)
      })
    },
    DangerInfoCommit () {
      var _this = this
      var param = {
        dangerDatas: _this.dangerList
      }
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataDangerInfo',
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
.danger_bg {
  background: #e5e3e3;
  padding: 10px;
}
.btn_tijiao {
  float: right;
}
</style>
