/* 
  该文件是整个项目的入口文件

*/
// 引入Vue
import Vue from 'vue'
// 引入App组件，它是所有组件的父组件
import App from './App.vue'
// 引入插件
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'

// 使用插件
Vue.use(VueRouter)


// 关闭vue的生产提示
Vue.config.productionTip = false


// 创建Vue实例对象---vm
new Vue({
  el: '#app',
  // 将App组件放入容器中
  render: h => h(App),
  router,
 
})