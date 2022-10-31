// 该文件用于创建vuex中最为核心的store
// 引入vuex
import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import { nanoid } from 'nanoid'
// 使用Vuex插件
Vue.use(Vuex)


// 求和功能相关的配置
const countOptions = {
    namespaced: true,
    actions: {
        jiaOdd(context, value) {
            // console.log(context.commit);
            if (context.state.sum % 2) {
                context.commit('JIA', value)
            }
        },
        jiaWait(context, value) {
            setTimeout(() => {
                context.commit('JIA', value)
            }, 500);
        }
    },
    mutations: {
        JIA(state, value) {
            // console.log('mutations中的jia被调用了',a,b);
            state.sum += value
        },
        JIAN(state, value) {
            // console.log('mutations中的jia被调用了',a,b);
            state.sum -= value
        },
    },
    state: {
        sum: 0, // 当前的和
        school: '乐知院',
        subject: '前端',
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    }
}
// 人员管理功能相关的配置
const personOptions = {
    namespaced: true,
    actions: {
        addPersonWang(context, value) {
            if (value.name.indexOf('王') === 0) {
                context.commit('ADD_PERSON', value)
            } else {
                alert('请添加姓王的！')
            }
        },
        addPersonServer(context) {
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                response => {
                    context.commit('ADD_PERSON', { id: nanoid(), name: response.data })
                },
                error => {
                    alert(error.message)
                }
            )
        }
    },
    mutations: {
        ADD_PERSON(state, value) {
            state.personList.unshift(value)
        }
    },
    state: {
        personList: [
            { id: '001', name: '张三' }
        ]

    },
    getters: {
        firstPersonName(state) {
            return state.personList[0].name
        }
    }
}

// 创建store
const store = new Vuex.Store({
    modules: {
        countAbout: countOptions,
        personAbout: personOptions
    }

})

// 暴露store
export default store