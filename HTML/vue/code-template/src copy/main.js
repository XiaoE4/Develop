/* 
// 该文件是整个项目的入口文件
// 引入Vue
import Vue from 'vue'
// 引入App组件，它是所有组件的父组件
import App from './App.vue'
// 引入ElementUI
import ElementUI from 'element-ui';
// 按需引入
// import { Button, Row, DatePicker } from 'element-ui'
// 引入ElementUI的全部样式
import 'element-ui/lib/theme-chalk/index.css';

// 使用插件
Vue.use(ElementUI)
// Vue.component(Button.name, Button)
// Vue.component(Row.name, Row)
// Vue.component(DatePicker.name, DatePicker)

// 关闭vue的生产提示
Vue.config.productionTip = false


// 创建Vue实例对象---vm
new Vue({
  el: '#app',
  // 将App组件放入容器中
  render: h => h(App),

}) */

/* 
  入口JS
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入ElementUI
import ElementUI from 'element-ui';
// 引入ElementUI的全部样式
import 'element-ui/lib/theme-chalk/index.css';

// 使用插件：
Vue.use(ElementUI)

// 关闭vue的生产提示
Vue.config.productionTip = false


new Vue({
  el: '#app',
  // 将App组件放入容器中
  render: h => h(App),
  router
})