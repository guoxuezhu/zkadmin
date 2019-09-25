<template>
  <div>
    <Navbar></Navbar>
    <b-tabs pills card vertical>
      <b-tab title="基本信息" active @click="tabBaseinfoSeting">
        <BaseInfo ref="childBaseinfoSeting"></BaseInfo>
      </b-tab>
      <b-tab title="录播设置" @click="tabLuboSeting">
        <LuboSeting ref="childLuboSeting"></LuboSeting>
      </b-tab>
      <b-tab title="串口设置" @click="tabSportSeting">
        <SportSeting ref="childSportSeting"></SportSeting>
      </b-tab>
      <b-tab title="报警设置" @click="tabDangerSeting">
        <DangerSeting ref="childDangerSeting"></DangerSeting>
      </b-tab>
      <b-tab title="继电器设置" @click="tabJdqSeting">
        <JdqSeting ref="childJdqSeting"></JdqSeting>
      </b-tab>
      <b-tab title="报警输出设置" @click="tabDangeroutSeting">
        <DangeroutSeting ref="childDangeroutSeting"></DangeroutSeting>
      </b-tab>
      <b-tab title="IO输出设置" @click="tabIOoutSeting">
        <IOoutSeting ref="childIOoutSeting"></IOoutSeting>
      </b-tab>
      <!-- <b-tab title="温湿度设置">
        <WsdSeting></WsdSeting>
      </b-tab> -->
      <b-tab title="事件设置" @click="tabEventSeting">
        <EventSeting ref="childEventSeting"></EventSeting>
      </b-tab>
      <!-- <b-tab title="远程服务设置" @click="tabMqttSeting">
        <MqttSeting ref="childMqttSeting"></MqttSeting>
      </b-tab> -->
      <b-tab title="控制面板">
        <ZKban></ZKban>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import BaseInfo from './seting/BaseInfo.vue'
import DangerSeting from './seting/DangerSeting.vue'
import EventSeting from './seting/EventSeting.vue'
import JdqSeting from './seting/JdqSeting.vue'
import LuboSeting from './seting/LuboSeting.vue'
import SportSeting from './seting/SportSeting.vue'
import WsdSeting from './seting/WsdSeting.vue'
import MqttSeting from './seting/MqttSeting.vue'
import IOoutSeting from './seting/IOoutSeting.vue'
import DangeroutSeting from './seting/DangeroutSeting.vue'
import ZKban from './seting/ZKban.vue'
import Navbar from './Navbar.vue'
export default {
  components: {
    Navbar,
    BaseInfo,
    DangerSeting,
    EventSeting,
    JdqSeting,
    LuboSeting,
    SportSeting,
    WsdSeting,
    MqttSeting,
    IOoutSeting,
    ZKban,
    DangeroutSeting
  },
  created () {
    console.log('=========HelloWorld===========')
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    tabBaseinfoSeting () {
      this.$refs.childBaseinfoSeting.getBaseInfo()
    },
    tabSportSeting () {
      this.$refs.childSportSeting.sportInfo()
    },
    tabEventSeting () {
      this.$refs.childEventSeting.eventInfo()
    },
    tabJdqSeting () {
      this.$refs.childJdqSeting.jdqInfo()
    },
    tabLuboSeting () {
      this.$refs.childLuboSeting.luboInfo()
    },
    tabMqttSeting () {
      this.$refs.childMqttSeting.mqttInfo()
    },
    tabIOoutSeting () {
      this.$refs.childIOoutSeting.iooutInfo()
    },
    tabDangeroutSeting () {
      this.$refs.childDangeroutSeting.dangeroutInfo()
    },
    tabDangerSeting () {
      this.$refs.childDangerSeting.getDangerInfo()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.titleAppbar {
  width: 100%;
  position: fixed;
  z-index: 1024;
}
.titleheight {
  height: 56px;
}
</style>
