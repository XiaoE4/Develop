// 该文件用于创建vuex中最为核心的store
// 引入vuex
import Vuex from 'vuex'
import Vue from 'vue'
// 使用Vuex插件
Vue.use(Vuex)

// 准备actions——用于响应组件中的动作
const actions = {
    // jia(context, value) {
    //     // console.log('actions中的jia被调用了',context,value);
    //     context.commit('JIA', value)
    // },
    // jian(context, value) {
    // console.log('actions中的jia被调用了',context,value);
    //     context.commit('JIAN', value)
    // },
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
}
// 准备mutations——用于操作数据（state）
const mutations = {
    JIA(staste, value) {
        // console.log('mutations中的jia被调用了',a,b);
        state.sum += value
    },
    JIAN(state, value) {
        // console.log('mutations中的jia被调用了',a,b);
        state.sum -= value
    }
}
// 准备state——用于存储数据 ===>data
const state = {
    sum: 0, // 当前的和
}
// 准备getters——用于将state中的数据进行加工 ===>computed
const getters = {
    bigSum(state) {
        return state.sum * 10
    }
}
// 创建store
const store = new Vuex.Store({
    actions: actions,
    mutations: mutations,
    state: state,
    getters
})

// 暴露store
export default store