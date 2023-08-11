import {createRouter,createWebHashHistory} from "vue-router"
const index = () => import('../components/index.vue')
const search = () => import('../components/search.vue')
const list = () => import('../components/list.vue')
const calendar = () => import('../components/calendar.vue')

const routes =[
    {
      path:'/',
      redirect:'/index',
    },
    {
        path:'/index',
        name:'index',
        component: index,
    },
    {
        path:'/search',
        name:'search',
        component: search,
    },
    {
        path:'/list',
        name:'list',
        component:list,
    },
    {
        path:'/calendar',
        name:'calendar',
        component:calendar,
    },
]

export const router = createRouter({
    history:createWebHashHistory(),
    routes,
})

export default router