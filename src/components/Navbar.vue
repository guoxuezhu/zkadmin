<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success" class="titleAppbar titleheight">
      <b-navbar-brand href="#">力弘智慧教育</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#/helloWorld">设备管理</b-nav-item>
          <b-nav-item href="#/icdata">IC卡管理</b-nav-item>
          <b-nav-item href="#/apkUpdata">升级管理</b-nav-item>
          <b-nav-item href="#/userlist">用户管理</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content"><em>{{username}}</em></template>
            <b-dropdown-item @click="loginout">退出</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="titleheight"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: localStorage.getItem('userName')
    }
  },
  methods: {
    loginout () {
      // localStorage.setItem('isConnect', '0')
      localStorage.setItem('zhongkongIP', '')
      // localStorage.setItem('isLogin', '0')
      localStorage.setItem('passWord', '')
      localStorage.setItem('mimastatus', '')
      localStorage.setItem('quanxian', '')
      this.$router.push({path: '/login'})
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
