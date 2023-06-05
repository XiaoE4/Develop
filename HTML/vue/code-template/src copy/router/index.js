/* 
路由器对象模块
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'

// 使用插件
Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            // name:'msite',
            path: '/msite',
            component: MSite
        },
        {
            // name:'order',
            path: '/order',
            component: Order
        },
        {
            // name:'profile',
            path: '/profile',
            component: Profile
        },
        {
            // name: 'search',
            path: '/search',
            component: Search
        },
        // 默认
        {
            path: '/',
            redirect: '/msite'
        }

    ],
})
