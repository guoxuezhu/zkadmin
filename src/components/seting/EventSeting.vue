<template>
  <div>
    <b-button v-if="isMyIPconnect" class="btn_tijiao" variant="outline-success" @click="EventInfoCommit()">提 交</b-button>
    <br><br>
    <div v-for="event in events" :key="event.id">
      <b-input-group >
        <b-input-group-prepend is-text><b style="width: 118px;">{{event.id}}</b></b-input-group-prepend>
        <b-input-group-prepend is-text><b style="width: 138px;">{{event.name}}</b></b-input-group-prepend>
        <b-form-input type="text" v-model.trim="event.strMLs" placeholder="请输入操作指令"></b-form-input>
      </b-input-group>
      <br>
    </div>
    <b-pagination v-model="currentPage" :total-rows="count" :per-page="perPage" align="center" @change="pageEvent()"></b-pagination>
  </div>
</template>

<script>
import axios from 'axios'
// import apply from '../../api/apply.js'
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
      eventList: [],
      events: [],
      perPage: 10,
      currentPage: 1,
      count: 1,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    pageEvent () {
      this.$nextTick(function () {
        console.log('=======串口=====11========' + this.currentPage)
        if (this.currentPage === 1) {
          this.events = this.eventList.slice(0, 10)
        } else if (this.currentPage === 2) {
          this.events = this.eventList.slice(10, 20)
        } else if (this.currentPage === 3) {
          this.events = this.eventList.slice(20, 30)
        } else if (this.currentPage === 4) {
          this.events = this.eventList.slice(30, 40)
        } else if (this.currentPage === 5) {
          this.events = this.eventList.slice(40, 50)
        } else if (this.currentPage === 6) {
          this.events = this.eventList.slice(50, 60)
        } else if (this.currentPage === 7) {
          this.events = this.eventList.slice(60, 70)
        }
      })
    },
    eventInfo () {
      if (localStorage.getItem('isMyIPconnect') === '1') {
        this.ipconnecteventInfo()
      } else {
        this.myeventInfo()
      }
    },
    myeventInfo () {
      var _this = this
      var param = {
        ip: localStorage.getItem('zhongkongIP')
      }
      axios({
        method: 'get',
        url: 'api/get_event_list',
        params: param
      }).then(function (response) {
        console.log('=======事件=====get_event_list========' + JSON.stringify(response.data))
        if (response.data.flag === 1) {
          _this.eventList = response.data.data.rows
          _this.count = _this.eventList.length
          _this.events = _this.eventList.slice(0, 10)
          _this.currentPage = 1
        } else {
          alert('无数据')
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    ipconnecteventInfo () {
      var _this = this
      var param = {}
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/eventList',
        params: param
      }).then(function (response) {
        console.log('=======事件======zhongkongIP=======' + JSON.stringify(response.data))
        _this.eventList = response.data.data
        _this.count = _this.eventList.length
        _this.events = _this.eventList.slice(0, 10)
        _this.currentPage = 1
      }).catch(function (error) {
        alert(error)
      })
    },
    EventInfoCommit () {
      var _this = this
      var param = {
        eventDatas: _this.eventList
      }
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataEventInfo',
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
.btn_tijiao {
  float: right;
}
</style>
