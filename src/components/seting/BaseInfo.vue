<!-- <template>
  <div>
    <br><br>
    <h6 class="btn_lubo_tijiao h_color">设备名称 设置必须保证与别的学校不同，并且容易记住，作为远程控制连接</h6>
    <b-row>
      <b-col lg="3">
      </b-col>
      <b-col lg="6" class="btn_lubo_tijiao">
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">设备名称</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="baseinfoList.zkname" placeholder="请输入设备名称"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">IP 地址</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="baseinfoList.zkip" placeholder="请输入IP地址"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">系统版本</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="baseinfoList.zkVersion" placeholder="请输入系统版本"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">数据库版本</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="baseinfoList.geendaoVersion" placeholder="请输入数据库版本"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">显示屏个数</b></b-input-group-prepend>
          <b-form-input type="number" min="0" v-model.trim="baseinfoList.hudongVIDnum" placeholder="请输入显示屏个数"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">远程控制</b></b-input-group-prepend>
          <b-form-select v-model="baseinfoList.ismqttStart" :options="mqttStatusOptions"></b-form-select>
        </b-input-group>
        <br>
        <b-button variant="outline-success" @click="baseInfoCommit()">提 交</b-button>
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
  },
  data () {
    return {
      mqttStatusOptions: [
        { value: 1, text: '启动' },
        { value: 0, text: '禁止' }
      ],
      baseinfoList: {
        zkname: '',
        zkip: '',
        zkVersion: '',
        geendaoVersion: '',
        hudongVIDnum: 0,
        uuid: '',
        ismqttStart: 0
      },
      zkIP: localStorage.getItem('zhongkongIP'),
      zkversion: ''
    }
  },
  methods: {
    getBaseInfo () {
      var _this = this
      var param = {}
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/zkBaseInfo',
        params: param
      }).then(function (response) {
        console.log('=======getBaseInfo=============' + JSON.stringify(response.data))
        _this.baseinfoList = response.data.data
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
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn_lubo_tijiao {
  text-align: center;
}
.h_color {
  color: red;
}
</style>
 -->