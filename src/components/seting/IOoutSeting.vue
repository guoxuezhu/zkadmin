<template>
  <div>
    <b-button v-if="isMyIPconnect" class="btn_tijiao" variant="outline-success" @click="ioOutInfoCommit()">提 交</b-button>
    <br><br>
    <div v-for="ioOut in ioOutList" :key="ioOut.id">
      <div class="danger_bg">
        <b-row>
          <b-col lg="2">
            <b>{{ioOut.name}}口</b>
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
export default {
  created () {
    if (localStorage.getItem('isMyIPconnect') === '1') {
      this.isMyIPconnect = true
    } else {
      this.isMyIPconnect = false
    }
  },
  data () {
    return {
      isMyIPconnect: false,
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
      if (localStorage.getItem('isMyIPconnect') === '1') {
        this.ipconnectiooutInfo()
      } else {
        this.myiooutInfo()
      }
    },
    myiooutInfo () {
      var _this = this
      var param = {
        ip: localStorage.getItem('zhongkongIP')
      }
      axios({
        method: 'get',
        url: 'api/get_io_list',
        params: param
      }).then(function (response) {
        console.log('=======iooutInfo======get_io_list=======' + JSON.stringify(response.data))
        if (response.data.flag === 1) {
          _this.ioOutList = response.data.data.rows
        } else {
          _this.ioOutList = []
          for (var i = 1; i < 5; i++) {
            _this.ioOutList.push({ioOutStatus: 0, deviceName: '', id: i, name: 'io输出' + i, time: 1})
          }
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    ipconnectiooutInfo () {
      var _this = this
      var param = {}
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/iooutInfo',
        params: param
      }).then(function (response) {
        console.log('=======iooutInfo=====zhongkongIP========' + JSON.stringify(response.data))
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
