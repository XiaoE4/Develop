import {createRouter,createWebHashHistory} from "vue-router";
// 路由懒加载
const list = () => import('../components/list.vue')
const calendar = () => import('../components/calendar.vue')
const test1 = () => import('../components/test1.vue')

// 正常的路由写法
// import list from "../components/list.vue";
// import calendar from "../components/calendar.vue";


const routes =[
    {
        path:'/',
        redirect:'/list',
    },
    {
        path:'/list',
        name:'list',
        component: list,
    },
    {
        path:'/calendar',
        name:'calendar',
        component: calendar,
    },
    {
        path:'/test1',
        name:'test1',
        component: test1,
    },
]

export const router = createRouter({
    history:createWebHashHistory(),
    routes,
})

export default router