import Vue from 'vue'

import Vuex from 'vuex'
import nanoid from 'nanoid'
import axios from 'axios'
Vue.use(Vuex)


const countAbout = {
    namespaced: true,
    state: {
        sum: 0,
        tool: 'Chrome',
        object: 'Vue'
    },
    actions: {
        jiaOdd(context, value) {
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
            state.sum += value
        },
        JIAN(state, value) {
            state.sum -= value
        }
    },
    // getters
    getters: {
        // 别忘了里面的state
        bigSum(state) {
            return state.sum * 10
        }
    }
}
const personAbout = {
    namespaced: true,
    state: {
        persons: [
            { id: '001', name: '张三' }
        ]
    },
    actions: {
        addLi(context, value) {
            if (value.name.indexOf('李') === 0) {
                context.commit('ADD_PERSON', value)
            } else {
                alert('请输入姓李的名字！')
                value = ''
            }
        },
        addWord(context){
            axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(
                response=>{
                    context.commit('ADD_PERSON',{id:nanoid,name:response.data})
                },
                error=>{
                    alert(error.message)
                }
            )
        }
    },
    mutations: {
        ADD_PERSON(state, value) {
            state.persons.unshift(value)
        }

    },
    getters:{
        firstName(state){
            return state.persons[0].name
        }
    }
}




const store = new Vuex.Store({
    modules: {
        countObj: countAbout,
        personAbout: personAbout
    }
})

export default store