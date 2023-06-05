import Vue from "vue";
import VueRouter from "vue-router";
import LoginAccount from '../pages/Login.vue'
import createAccount from "../pages/CreateAccount.vue";
import Banner from "../pages/Banner.vue";
import Article_show from "@/pages/Article_show.vue";
import Content from "@/pages/Content.vue";
import Article_write from "@/pages/Article_write.vue";
import Article_show1 from "@/pages/Article_show1.vue"
import UserPage from "@/pages/UserPage.vue";
import Article_unsave from "@/pages/Article_unsave.vue";
import RootPage from "@/pages/RootPage.vue";
import Admin_toutiao from "@/components/Admin_toutiao.vue";
import Admin_wenzhang from "@/components/Admin_wenzhang.vue";
import Admin_user_feng from "@/components/Admin_user_feng.vue";
import Admin_user_jin from "@/components/Admin_user_jin.vue";
import Admin_tupian from "@/components/Admin_tupian.vue";
import Admin_shipin from "@/components/Admin_shipin.vue";
import Article_find from "@/pages/Article_find.vue";
import Article_cang from "@/pages/Article_cang.vue";
import Article_fans from "@/pages/Article_fans.vue";
import Article_money from "@/pages/Article_money.vue";
import Wallet from "@/pages/Wallet.vue";

Vue.use(VueRouter)

// const routes=[
//     {
//         path:'/login',
//         name:'login',
//         component:LoginAccount
//     },
//     {
//         path:'/CreateAccount',
//         name:'CreateAccount',
//         component: createAccount
//     }
// ]

const router =new VueRouter({
    // mode:'history',
    base: process.env.BASE_URL,
    routes:[
        {
            path:'/',
            name:'login',
            component:LoginAccount,
        },
        {
            path:'/CreateAccount',
            name:'CreateAccount',
            component: createAccount,
            hidden:true,
        },
        {
            path:'/Home',
            name:'Home',
            component: Banner,
            hidden:true,
            children:[
                // 进入主页后显示的文章
                {
                    path:'',
                    name:'Content',
                    component: Content,
                },
                // 创作者中心查看所有文章
                {
                    path:'Article',
                    name:'Article_show',
                    component: Article_show,
                },
                {
                    path:'Unsave',
                    name:'Article_unsave',
                    component:Article_unsave
                },
                {
                    path:'User',
                    name:'UserPage',
                    component: UserPage
                },
                {
                    path:'Find',
                    name:'Article_find',
                    component: Article_find
                },
                {
                    path:'Collect',
                    name:'Article_cang',
                    component: Article_cang
                },
                {
                    path:'Fans',
                    name:'Article_fans',
                    component: Article_fans
                },
                {
                    path:'Money',
                    name:'Article_money',
                    component: Article_money
                },
                {
                    path:'Wallet',
                    name:'User_Wallet',
                    component: Wallet
                }
            ]
        },
        {
            path:'/ArticleWriting',
            name:'Writing',
            component: Article_write,
            hidden: true
        },
        {
            path:'/Show',
            name:'Article_show1',
            component:Article_show1,
        },
        {
            path:'/User',
            name:'UserPage',
            component:UserPage
        },
        {
            path:'/Root',
            name:'RootPage',
            component:RootPage,
            children:[
                {
                    path:'',

                },
                {
                    path:'Toutiao',
                    name:'Toutiao',
                    component: Admin_toutiao
                },
                {
                    path:'Content',
                    name:'Content',
                    component: Admin_wenzhang
                },
                {
                    path:'Video',
                    name:'Video',
                    component: Admin_shipin
                },
                {
                    path:'Picture',
                    name:'Picture',
                    component: Admin_tupian
                },
                {
                    path:'BanTalk',
                    name:'BanTalk',
                    component: Admin_user_jin
                },
                {
                    path:'BanUser',
                    name:'BanUser',
                    component: Admin_user_feng
                },
            ]
        }

    ]
})

//
// const router=new VueRouter({
//     mode: 'history',
//     base: process.env.BASE_URL,
//     routes
// })

export default router