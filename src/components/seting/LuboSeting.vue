<template>
  <div>
    <br><br>
    <div v-for="lubo in luboList" :key="lubo.id">
      <b-row>
        <b-col lg="3">
        </b-col>
        <b-col lg="6" class="btn_lubo_tijiao">
          <b-input-group>
            <b-input-group-prepend is-text><b style="width: 118px;">录播IP地址</b></b-input-group-prepend>
            <b-form-input type="text" v-model.trim="lubo.record_ip" placeholder="请输入工作时长"></b-form-input>
          </b-input-group>
          <br>
          <b-input-group>
            <b-input-group-prepend is-text><b style="width: 118px;">录播用户名称</b></b-input-group-prepend>
            <b-form-input type="text" v-model.trim="lubo.record_user" placeholder="请输入工作时长"></b-form-input>
          </b-input-group>
          <br>
          <b-input-group>
            <b-input-group-prepend is-text><b style="width: 118px;">录播用户密码</b></b-input-group-prepend>
            <b-form-input type="text" v-model.trim="lubo.record_pass" placeholder="请输入工作时长"></b-form-input>
          </b-input-group>
          <br>
          <b-button variant="outline-success" @click="luboInfoCommit()">提 交</b-button>
        </b-col>
        <b-col lg="3">
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import apply from '../../api/apply.js'
export default {
  created () {
    this.luboInfo()
  },
  data () {
    return {
      luboList: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    luboInfo () {
      var _this = this
      var param = {}
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'get',
        url: 'api/get_record_list',
        params: param
      }).then(function (response) {
        console.log('=======录播 =============' + JSON.stringify(response.data))
        _this.luboList = response.data.data.rows
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
