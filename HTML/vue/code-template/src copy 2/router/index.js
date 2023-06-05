import VueRouter from 'vue-router'

import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import Message from '../pages/Message.vue'
import News from '../pages/News.vue'

import Detail from '../pages/Detail.vue'

const router = new VueRouter({
    routes: [
        {
            name: 'guanyu',
            path: '/about',
            component: About,
            meta: { title: '关于' }
        },
        {
            name: 'zhuye',
            path: '/home',
            component: Home,
            meta: { title: '主页', isAuth: true },
            children: [
                {
                    name: 'xinwen',
                    path: 'news',
                    component: News,
                    meta: { title: '新闻' }
                },
                {
                    name: 'xinxi',
                    path: 'message',
                    component: Message,
                    meta: { title: '信息', isAuth: true },
                    beforeEnter: (to, from, next) => {
                        if (to.meta.isAuth) {
                            if (localStorage.getItem('id') === '000') {
                                next()
                            } else {
                                alert('id wrong')
                            }
                        } else {
                            next()
                        }
                    },
                    children: [
                        {
                            name: 'neirong',
                            path: 'detail',
                            component: Detail,
                            props($route) {
                                return {
                                    id: $route.query.id,
                                    title: $route.query.title
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {
        if (localStorage.getItem('name') === 'xiaoE') {
            next()
        } else {
            alert('name wrong')
        }
    } else {
        next()
    }

});
// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
    document.title=to.meta.title || 'Test'
})


export default router