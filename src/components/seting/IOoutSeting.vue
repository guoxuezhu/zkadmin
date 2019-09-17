<template>
  <div>
    <b-button class="btn_tijiao" variant="outline-success" @click="ioOutInfoCommit()">提 交</b-button>
    <br><br>
    <div v-for="ioOut in ioOutList" :key="ioOut.id">
      <div class="danger_bg">
        <b-row>
          <b-col lg="2">
            <b>{{ioOut.name}}</b>
          </b-col>
          <b-col lg="4">
            <b-input-group prepend="绑定的设备">
              <b-form-input type="text" v-model.trim="ioOut.deviceName" placeholder="请输入绑定的设备"></b-form-input>
            </b-input-group>
          </b-col>
          <b-col lg="3">
            初始状态：<b-form-radio-group v-model="ioOut.ioOutStatus" :options="ioStatusOptions" buttons button-variant="outline-success"></b-form-radio-group>
          </b-col>
          <b-col lg="3">
            <b-input-group prepend="工作时长(秒)">
              <b-form-input type="number" min="1" v-model.trim="ioOut.time" placeholder="请输入工作时长"></b-form-input>
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
  created () {
    console.log('=========BaseInfo===========')
    // this.getBaseInfo()
  },
  data () {
    return {
      ioOutList: [],
      ioStatusOptions: [
        { value: 1, text: '高电平' },
        { value: 0, text: '低电平' }
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    iooutInfo () {
      var _this = this
      var param = {}
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/iooutInfo',
        params: param
      }).then(function (response) {
        console.log('=======iooutInfo=============' + JSON.stringify(response.data))
        _this.ioOutList = response.data.data
      }).catch(function (error) {
        alert(error)
      })
    },
    ioOutInfoCommit () {
      var _this = this
      var param = {
        ioOutDatas: _this.ioOutList
      }
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataIoOutInfo',
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
