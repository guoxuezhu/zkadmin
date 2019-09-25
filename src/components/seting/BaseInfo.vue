<template>
  <div>
    <br><br>
    <h6 class="btn_lubo_tijiao h_color">设备名称 设置必须保证与别的学校不同，并且容易记住，作为远程控制连接</h6>
    <b-row>
      <b-col lg="3">
      </b-col>
      <b-col lg="6" class="btn_lubo_tijiao">
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">设备名称</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="baseinfoList.title" placeholder="请输入设备名称"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">IP 地址</b></b-input-group-prepend>
          <b-form-input disabled type="text" v-model.trim="baseinfoList.ip" placeholder="请输入IP地址"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">系统版本</b></b-input-group-prepend>
          <b-form-input disabled type="text" v-model.trim="baseinfoList.version" placeholder="请输入系统版本"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">数据库版本</b></b-input-group-prepend>
          <b-form-input disabled type="text" v-model.trim="baseinfoList.data_version" placeholder="请输入数据库版本"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">显示屏个数</b></b-input-group-prepend>
          <b-form-input type="number" min="0" v-model.trim="baseinfoList.video_num" placeholder="请输入显示屏个数"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">远程控制</b></b-input-group-prepend>
          <b-form-select v-model="baseinfoList.show" :options="mqttStatusOptions"></b-form-select>
        </b-input-group>
        <br>
        <b-button v-if="isMyIPconnect" variant="outline-success" @click="baseInfoCommit()">提 交</b-button>
      </b-col>
      <b-col lg="3">
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
// import apply from '../../api/apply.js'
export default {
  created () {
    // console.log('=========BaseInfo=====created=======')
    // if (localStorage.getItem('isLogin') === '0' || localStorage.getItem('isLogin') === null) {
    //   this.$router.push({path: '/login'})
    // } else if (localStorage.getItem('isConnect') === '0' || localStorage.getItem('isConnect') === null) {
    //   this.$router.push({path: '/connect'})
    // } else {
    //   this.getBaseInfo()
    // }
    if (localStorage.getItem('isMyIPconnect') === '1') {
      this.isMyIPconnect = true
    } else {
      this.isMyIPconnect = false
    }
    this.getBaseInfo()
  },
  data () {
    return {
      isMyIPconnect: false,
      mqttStatusOptions: [
        { value: 1, text: '启动' },
        { value: 0, text: '禁止' }
      ],
      baseinfoList: {
        title: '',
        ip: '',
        version: '',
        data_version: '',
        video_num: 0,
        uuid: '',
        show: 0
      },
      zkIP: localStorage.getItem('zhongkongIP'),
      zkversion: ''
    }
  },
  methods: {
    getBaseInfo () {
      if (localStorage.getItem('isMyIPconnect') === '1') {
        this.ipconnectBaseInfo()
      } else {
        this.mygetBaseInfo()
      }
    },
    ipconnectBaseInfo () {
      var _this = this
      var param = {}
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/zkBaseInfo',
        params: param
      }).then(function (response) {
        console.log('=======getBaseInfo======zhongkongIP=======' + JSON.stringify(response.data))
        _this.baseinfoList = response.data.data
      }).catch(function (error) {
        alert(error)
      })
    },
    mygetBaseInfo () {
      var _this = this
      var param = {
        ip: localStorage.getItem('zhongkongIP')
      }
      axios({
        method: 'get',
        url: 'api/get_center_list',
        params: param
      }).then(function (response) {
        console.log('=======getBaseInfo======get_center_list=======' + JSON.stringify(response.data))
        _this.baseinfoList = response.data.data.rows[0]
      }).catch(function (error) {
        alert(error)
      })
    },
    baseInfoCommit () {
      var _this = this
      if (_this.baseinfoList.zkname === '') {
        alert('请输入设备名称')
        return
      }
      var param = {
        zkbaseInfoData: _this.baseinfoList
      }
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataZKbaseInfo',
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

<style scoped>
.btn_lubo_tijiao {
  text-align: center;
}
.h_color {
  color: red;
}
</style>
