<template>
  <div>
    <Navbar></Navbar>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
export default {
  components: {
    Navbar
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
