import Vue from 'vue'
import App from './App.vue'

import vueResource from 'vue-resource'

import store from './store'
Vue.use(vueResource)

new Vue({
    el: '#app',
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this
    },
    store
})