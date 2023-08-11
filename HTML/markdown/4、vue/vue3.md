# 路由router

**router/index.js**

```js
import {createRouter, createWebHashHistory} from "vue-router"

const index = () => import('../components/index.vue')
const search = () => import('../components/search.vue')

const routes = [
    {
        path: '/',
        redirect: '/index',
    },
    {
        path: '/index',
        name: 'index',
        component: index,
    },
    {
        path: '/search',
        name: 'search',
        component: search,
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router

```

# App.vue

在*template*里添加*router-view*即可

# main.js

```js
import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'


const el = document.documentElement
// 获取 css 变量
getComputedStyle(el).getPropertyValue(`--el-color-primary`)

// 设置 css 变量
el.style.setProperty('--el-color-primary', '#3473e6')

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')
app.config.globalProperties.$axios = axios


```

# Vue3中的<script>

```vue

<script>
    import {ref} from 'vue'
    import {InfoFilled, Search} from '@element-plus/icons-vue'

    export default {
        name: 'search',
        components: {InfoFilled},
        setup() {
            const input = ref('')

            return {
                input,
                Search,
                InfoFilled,

            }

        }

    }

</script>


```
