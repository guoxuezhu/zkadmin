<template>
  <div>
    <b-button @click="login" size="lg" variant="primary">登 录</b-button>
    <b-button @click="getDevices" size="lg" variant="primary">getDevices</b-button>
    <b-button @click="addDevices" size="lg" variant="primary">addDevices</b-button>
  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    login () {
      this.$router.push({path: '/mainView'})
    },
    getDevices () {
      var param = {}
      axios({
        method: 'get',
        url: 'api/get_center_list',
        params: param
      }).then(function (response) {
        console.log('=======getDevices=============' + JSON.stringify(response.data))
      }).catch(function (error) {
        alert(error)
      })
    },
    addDevices () {
      // var _this = this
      var param = {
        cate_id: 10013,
        ip: '192.168.11.55',
        title: '中控1',
        version: '1.0.1',
        data_version: '1',
        video_num: 6,
        show: 'on'
      }
      // var sign = apply.appSign(param) // 添加签名
      // param.sign = sign
      axios({
        method: 'post',
        url: 'api/add_center_set',
        data: param,
        transformRequest: [function (data, headers) {
          return Qs.stringify(data)
        }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function (response) {
        console.log('=======添加=============' + JSON.stringify(response.data))
      }).catch(function (error) {
        alert(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
