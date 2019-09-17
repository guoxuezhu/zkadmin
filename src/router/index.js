import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import MainView from '@/components/MainView'
import Classdata from '@/components/Classdata'

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
