import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)
// Vue.prototype.$axios=axios


//准备actions对象——响应组件中用户的动作
const actions = {

}
//准备mutations对象——修改state中的数据
const mutations = {
    updateUsername (state , username){
        state.user.username = username
    },
    updateAccount(state , account){
        state.user.account = account
    },
    updateGuanzhu(state , guanzhu){
        state.user.guanzhu= guanzhu
    },
    updatePic(state,pic){
        state.user.pic=pic
        console.log("state.user.pic: ",state.user.pic)
    },
    updateSex(state,sex){
      state.user.sex=sex
    },
    updateBir(state,bir){
      state.user.birthday=bir
    },
    updateJin(state,jin){
        state.user.jin=jin
    },
    updateFeng(state,ban){
        state.user.ban=ban
    },
    updateMoney(state,money){
        state.user.money=money
    },
    allArticle(state,article){
        for(let i = 0 ;i<article.length;i++){
            article[i].date=new Date(article[i].date).toLocaleDateString().replace(/\//g,"-")
        }
        state.allArticle=article
        console.log("state.allArticle: ",state.allArticle)
    },



}
//准备state对象——保存具体的数据
const state = {
    user:{
        username:'',
        account:'',
        guanzhu:'',
        pic:'',
        sex:'',
        birthday:'',
        jin:'',
        ban:'',
        money:'',
    },
    allArticle:[],
    article_top:[],
    article_tupian:[],

}


export default new Vuex.Store({
    actions,
    mutations,
    state,
})