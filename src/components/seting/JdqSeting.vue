<template>
  <div>
    <b-button class="btn_tijiao" variant="outline-success" @click="jdqInfoCommit()">提 交</b-button>
    <br><br>
    <div v-for="jdq in jdqList" :key="jdq.id">
      <div class="danger_bg">
        <b-row>
          <b-col lg="2">
            <b>{{jdq.name}}</b>
          </b-col>
          <b-col lg="4">
            <b-input-group prepend="绑定的设备">
              <b-form-input type="text" v-model.trim="jdq.deviceName" placeholder="请输入绑定的设备"></b-form-input>
            </b-input-group>
          </b-col>
          <b-col lg="3">
            初始状态：<b-form-radio-group v-model="jdq.jdqStatus" :options="jdqStatusOptions" buttons button-variant="outline-success"></b-form-radio-group>
          </b-col>
          <b-col lg="3">
            <b-input-group prepend="工作时长(秒)">
              <b-form-input type="number" min="1" v-model.trim="jdq.time" placeholder="请输入工作时长"></b-form-input>
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
      jdqStatusOptions: [
        { value: 1, text: '开' },
        { value: 0, text: '关' }
      ],
      jdqList: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    jdqInfo () {
      if (localStorage.getItem('isMyIPconnect') === '1') {
        this.ipconnectjdqInfo()
      } else {
        this.myjdqInfo()
      }
    },
    myjdqInfo () {
      var _this = this
      var param = {
        ip: localStorage.getItem('zhongkongIP')
      }
      axios({
        method: 'get',
        url: 'api/get_relay_list',
        params: param
      }).then(function (response) {
        console.log('=======继电器======get_relay_list=======' + JSON.stringify(response.data))
        _this.jdqList = response.data.data.rows
      }).catch(function (error) {
        alert(error)
      })
    },
    ipconnectjdqInfo () {
      var _this = this
      var param = {}
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/jdqInfo',
        params: param
      }).then(function (response) {
        console.log('=======继电器======zhongkongIP=======' + JSON.stringify(response.data))
        _this.jdqList = response.data.data
      }).catch(function (error) {
        alert(error)
      })
    },
    jdqInfoCommit () {
      var _this = this
      var param = {
        jdqDatas: _this.jdqList
      }
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataJdqInfo',
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
