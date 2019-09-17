<template>
  <div>
    <b-tabs content-class="mt-3" v-model="tabIndex">
      <b-tab title="串口１" @click="tabSportOne()">
        <Sport ref="childSportOne"></Sport>
      </b-tab>
      <b-tab title="串口２" @click="tabSportTwo()">
        <Sport ref="childSportTwo"></Sport>
      </b-tab>
      <b-tab title="串口３" @click="tabSportThree()">
        <Sport ref="childSportThree"></Sport>
      </b-tab>
      <b-tab title="串口４" @click="tabSportFour()">
        <Sport ref="childSportFour"></Sport>
      </b-tab>
      <b-tab title="串口５" @click="tabSportFive()">
        <Sport ref="childSportFive"></Sport>
      </b-tab>
      <b-tab title="串口６" @click="tabSportSix()">
        <Sport ref="childSportSix"></Sport>
      </b-tab>
      <b-tab title="串口７" @click="tabSportSeven()">
        <Sport ref="childSportSeven"></Sport>
      </b-tab>
      <b-tab title="串口８" @click="tabSportEight()">
        <Sport ref="childSportEight"></Sport>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Sport from '../smcomponents/Sport.vue'
export default {
  components: {
    Sport
  },
  created () {
    console.log('=========SportSeting===========')
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  methods: {
    sportInfo () {
      this.tabIndex = 0
      this.tabSportOne()
    },
    tabSportOne () {
      this.$refs.childSportOne.getSportInfo(1)
    },
    tabSportTwo () {
      this.$refs.childSportTwo.getSportInfo(2)
    },
    tabSportThree () {
      this.$refs.childSportThree.getSportInfo(3)
    },
    tabSportFour () {
      this.$refs.childSportFour.getSportInfo(4)
    },
    tabSportFive () {
      this.$refs.childSportFive.getSportInfo(5)
    },
    tabSportSix () {
      this.$refs.childSportSix.getSportInfo(6)
    },
    tabSportSeven () {
      this.$refs.childSportSeven.getSportInfo(7)
    },
    tabSportEight () {
      this.$refs.childSportEight.getSportInfo(8)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
