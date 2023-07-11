import {createRouter,createWebHashHistory} from "vue-router"
const login = () => import('../components/login.vue')
const search = () => import('../components/search.vue')

const routes =[
    {
      path:'/',
      redirect:'/login',
    },
    {
        path:'/login',
        name:'login',
        component: login,
    },
    {
        path:'/search',
        name:'search',
        component: search,
    }
]

export const router = createRouter({
    history:createWebHashHistory(),
    routes,
})

export default router