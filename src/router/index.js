import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import MainView from '@/components/MainView'
import Classdata from '@/components/Classdata'
import Userlist from '@/components/Userlist'
import ICdata from '@/components/ICdata'
import ApkUpdata from '@/components/ApkUpdata'
import Connect from '@/components/Connect.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/connect',
      name: 'Connect',
      component: Connect
    }, {
      path: '/apkUpdata',
      name: 'ApkUpdata',
      component: ApkUpdata
    }, {
      path: '/userlist',
      name: 'Userlist',
      component: Userlist
    }, {
      path: '/icdata',
      name: 'ICdata',
      component: ICdata
    }, {
      path: '/classdata',
      name: 'Classdata',
      component: Classdata
    }, {
      path: '/mainView',
      name: 'MainView',
      component: MainView
    }
  ]
})
