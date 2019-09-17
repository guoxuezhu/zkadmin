<template>
  <div>
    <b-container>
      <b-row>
        <b-col lg="3">
          <b-input-group prepend="波特率">
            <b-form-select v-model="baudrateSelected" :options="baudrateOptions"></b-form-select>
          </b-input-group>
        </b-col>
        <b-col lg="3">
          <b-input-group prepend="校验位">
            <b-form-select v-model="checkoutBitSelected" :options="checkoutBitOptions"></b-form-select>
          </b-input-group>
        </b-col>
        <b-col lg="3">
          <b-input-group prepend="数据位">
            <b-form-select v-model="dataBitSelected" :options="dataBitOptions"></b-form-select>
          </b-input-group>
        </b-col>
        <b-col lg="3">
          <b-input-group prepend="停止位">
            <b-form-select v-model="stopBitSelected" :options="stopBitOptions"></b-form-select>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>
    <br>
    <b-container>
      <b-row>
        <b-col lg="4">
          <b-input-group >
            <b-input-group-prepend is-text><b style="width: 118px;">绑定的设备</b></b-input-group-prepend>
            <b-form-input type="text" v-model.trim="bindName" placeholder="请输入绑定名称"></b-form-input>
          </b-input-group>
        </b-col>
        <b-col lg="4">
          <b-form-group>
            <b-form-radio-group v-model="jinzhiSelected" :options="jinzhiOptions" buttons button-variant="outline-info"></b-form-radio-group>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-button class="btn_tijiao" variant="outline-success" @click="commitbtn()">提 交</b-button>
        </b-col>
      </b-row>
    </b-container>
    <div v-for="command in commands" :key="command.commandId">
      <b-input-group >
        <b-input-group-prepend is-text><b style="width: 118px;">{{command.commandId}}</b></b-input-group-prepend>
        <b-form-input type="text" v-model.trim="command.commandName" placeholder="请输入命令名称"></b-form-input>
        <b-form-input type="text" v-model.trim="command.commandStr" placeholder="请输入命令"></b-form-input>
      </b-input-group>
      <br>
    </div>
    <b-pagination v-model="currentPage" :total-rows="count" :per-page="perPage" align="center" @change="pageEvent()"></b-pagination>
    <br><br>
  </div>
</template>

<script>
import axios from 'axios'
// import apply from '../../api/apply.js'
import Qs from 'qs'
export default {
  data () {
    return {
      jinzhiSelected: 16,
      jinzhiOptions: [
        { value: 16, text: '十六进制' },
        { value: 10, text: '十进制' }
      ],
      baudrateSelected: 3,
      baudrateOptions: [
        { value: 0, text: '1200' },
        { value: 1, text: '2400' },
        { value: 2, text: '4800' },
        { value: 3, text: '9600' },
        { value: 4, text: '19200' },
        { value: 5, text: '38400' },
        { value: 6, text: '57600' },
        { value: 7, text: '115200' }
      ],
      checkoutBitSelected: 0,
      checkoutBitOptions: [
        { value: 0, text: 'NONE' },
        { value: 1, text: 'ODD' },
        { value: 2, text: 'EVEN' },
        { value: 3, text: 'MAAR' },
        { value: 4, text: 'SPACE' }
      ],
      dataBitSelected: 0,
      dataBitOptions: [
        { value: 0, text: '8' },
        { value: 1, text: '7' },
        { value: 2, text: '6' },
        { value: 3, text: '5' }
      ],
      stopBitSelected: 0,
      stopBitOptions: [
        { value: 0, text: '1' },
        { value: 1, text: '1.5' },
        { value: 2, text: '2' }
      ],
      commandList: [],
      commands: [],
      perPage: 10,
      currentPage: 1,
      count: 1,
      bindName: ''
    }
  },
  methods: {
    pageEvent () {
      this.$nextTick(function () {
        console.log('=======串口=====11========' + this.currentPage)
        if (this.currentPage === 1) {
          this.commands = this.commandList.slice(0, 10)
        } else if (this.currentPage === 2) {
          this.commands = this.commandList.slice(10, 20)
        } else if (this.currentPage === 3) {
          this.commands = this.commandList.slice(20, 30)
        } else if (this.currentPage === 4) {
          this.commands = this.commandList.slice(30, 40)
        } else if (this.currentPage === 5) {
          this.commands = this.commandList.slice(40, 50)
        }
      })
    },
    getSportInfo (spnumer) {
      var _this = this
      _this.ckNum = spnumer
      var param = {
        sportNum: spnumer
      }
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/sportInfo',
        params: param
      }).then(function (response) {
        console.log('=======串口=============' + JSON.stringify(response.data.data))
        _this.baudrateSelected = response.data.data.serialPortData.baudRateId
        _this.checkoutBitSelected = response.data.data.serialPortData.checkoutBitId
        _this.dataBitSelected = response.data.data.serialPortData.dataBitId
        _this.stopBitSelected = response.data.data.serialPortData.stopBitId
        _this.bindName = response.data.data.serialPortData.deviceName
        _this.jinzhiSelected = response.data.data.serialPortData.jinZhi
        _this.commandList = response.data.data.serialCommandList
        _this.count = _this.commandList.length
        _this.commands = _this.commandList.slice(0, 10)
        _this.currentPage = 1
      }).catch(function (error) {
        alert(error)
      })
    },
    commitbtn () {
      var _this = this
      var param = {
        sportNum: _this.ckNum,
        baudRateId: _this.baudrateSelected,
        baudRate: _this.baudrateOptions[_this.baudrateSelected].text,
        checkoutBitId: _this.checkoutBitSelected,
        checkoutBit: _this.checkoutBitOptions[_this.checkoutBitSelected].text,
        dataBitId: _this.dataBitSelected,
        dataBit: _this.dataBitOptions[_this.dataBitSelected].text,
        stopBitId: _this.stopBitSelected,
        stopBit: _this.stopBitOptions[_this.stopBitSelected].text,
        deviceName: _this.bindName,
        jinZhi: _this.jinzhiSelected,
        sportMls: JSON.stringify(_this.commandList)
      }
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataSportInfo',
        data: param,
        transformRequest: [function (data, headers) {
          console.log('===headers=====：' + JSON.stringify(headers))
          return Qs.stringify(data)
        }]
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
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn_tijiao {
  float: right;
}
</style>
