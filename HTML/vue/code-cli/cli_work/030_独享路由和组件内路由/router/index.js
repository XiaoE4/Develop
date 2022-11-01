// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
// 引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'
import Detail from '../pages/Detail'

// 创建并暴露一个路由器
const router = new VueRouter({
    routes: [
        {
            name: 'guanyu',
            path: '/about',
            component: About,
            meta: { title: '关于',isAuth:true },

        },
        {
            name: 'zhuye',
            path: '/home',
            component: Home,
            meta: { title: '主页' },
            children: [
                {
                    name: 'xinwen',
                    path: 'news',
                    component: News,
                    // 路由守卫，isAuth是否授权
                    meta: { isAuth: true, title: '新闻' },
                    // 独享路由守卫
                    /*  beforeEnter: (to, from, next) => {
                        if (to.meta.isAuth) {
                            if (localStorage.getItem('name') === 'xiaoE') {
                                next()
                            } else {
                                alert('id不对，无权查看')
                            }
                        } else {
                            next()
                        }
                    } */
                },
                {
                    name: 'xiaoxi',
                    path: 'message',
                    component: Message,
                    // 路由守卫，isAuth是否授权
                    meta: { isAuth: true, title: '消息' },
                    children: [
                        {
                            name: 'xiangqing',
                            path: 'detail',
                            component: Detail,
                            props($route) {
                                return {
                                    id: $route.query.id,
                                    title: $route.query.title
                                }
                            }
                        },
                    ]

                }
            ]
        },
    ]
});

// 全局前置路由守卫——————初始化的时候被调用、每次路由切换之前被调用
/* router.beforeEach((to, from, next) => {
    console.log('前置守卫');
    console.log('to', to);
    console.log('from', from)
    console.log('next', next)
    if (to.meta.isAuth) {
        if (localStorage.getItem('name') === 'xiaoE') {

            next()
        } else {
            alert('id不对，无权查看')
        }
    } else {

        next()
    }
}) */
// 全局后置路由守卫——————初始化的时候被调用、每次路由切换之后被调用
router.afterEach((to, from) => {
    console.log('后置守卫');
    console.log('to', to);
    console.log('from', from)
    document.title = to.meta.title || 'Test'
})

export default router