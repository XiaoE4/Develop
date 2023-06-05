import Vue from 'vue'
// import Vuex from 'vuex'
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from "axios";
import router from "./router";
import store from './store'
import Router from 'vue-router'
import echarts from 'echarts'


Vue.use(ElementUI);
// Vue.use(Vuex);

Vue.prototype.$axios =axios
Vue.prototype.$echarts = echarts;
Vue.config.productionTip=false

//点击跳转后固定在页面头部
// router.beforeEach((to, from, next) => {
//     // chrome
//     document.body.scrollTop = 0
//
//     next()
// })

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')