<template>
  <div>
    <br><br>
    <b-row>
      <b-col lg="3">
      </b-col>
      <b-col lg="6" class="btn_lubo_tijiao">
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">录播IP地址</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="luboList.record_ip" placeholder="请输入录播IP地址"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">录播用户名称</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="luboList.record_user" placeholder="请输入录播用户名称"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">录播用户密码</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="luboList.record_pass" placeholder="请输入录播用户密码"></b-form-input>
        </b-input-group>
        <br>
        <b-button v-if="isMyIPconnect" variant="outline-success" @click="luboInfoCommit()">提 交</b-button>
      </b-col>
      <b-col lg="3">
      </b-col>
    </b-row>
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
      luboList: {
        record_ip: '',
        record_user: '',
        record_pass: ''
      },
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    luboInfo () {
      if (localStorage.getItem('isMyIPconnect') === '1') {
        this.ipconnectLuboInfo()
      } else {
        this.myLuboInfo()
      }
    },
    myLuboInfo () {
      var _this = this
      var param = {
        ip: localStorage.getItem('zhongkongIP')
      }
      axios({
        method: 'get',
        url: 'api/get_record_list',
        params: param
      }).then(function (response) {
        console.log('=======录播=====get_record_list========' + JSON.stringify(response.data))
        _this.luboList = response.data.data
      }).catch(function (error) {
        alert(error)
      })
    },
    ipconnectLuboInfo () {
      var _this = this
      var param = {}
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/luboInfo',
        params: param
      }).then(function (response) {
        console.log('=======录播=======zhongkongIP======' + JSON.stringify(response.data))
        _this.luboList = response.data.data[0]
      }).catch(function (error) {
        alert(error)
      })
    },
    luboInfoCommit () {
      var _this = this
      var param = {
        luboDatas: _this.luboList
      }
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataLuboInfo',
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
