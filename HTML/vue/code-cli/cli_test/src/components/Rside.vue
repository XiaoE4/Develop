<template>
  <div id="rside">
    <div id="login_zhuye" v-if="!show_account">
      <h1>了解天下事！</h1>
      <button @click="login_link">点我登录</button>
    </div>
      <div id="login_zhuye" v-if="show_account">
          <div class="zhuye_user">
              <p class="zhuye_name">{{user.username}}</p>
              <p class="zhuye_account">{{user.account}}</p>
          </div>
          <div class="zhuye_guanzhu">
              <p class="zhuye_guanzhu1">关注</p>
              <p class="zhuye_guanzhu2" @click="show_guanzhu(user.account,user.username,user.pic)">{{user.guanzhu}}</p>
          </div>
      </div>
      <div class="origin-card">
          <h1>创作者中心</h1>
          <div class="origin-cardP" @click="card_show(user.account,user.pic,user.username)">
              <i class="el-icon-s-management" style="float: left;font-size: 20px;color:gray;margin: 1px 5px 0 4px;"></i>
              <p>文章</p>
          </div>
          <div class="origin-cardP" @click="card_drafts(user.account)">
              <i class="el-icon-s-order" style="float: left;font-size: 20px;color:gray;margin: 1px 5px 0 4px;"></i>
              <p>草稿</p>
          </div>
          <div class="origin-cardP" @click="card_star(user.account)">
              <i class="el-icon-star-on" style="float: left;font-size: 20px;color:gray;margin: 1px 5px 0 4px;"></i>
              <p>收藏</p>
          </div>
          <div class="origin-cardP" @click="card_center(user.account)" >
              <i class="el-icon-s-marketing" style="float: left;font-size: 20px;color:gray;margin: 1px 5px 0 4px;"></i>
              <p>激励中心</p>
          </div>
          <div class="origin-cardP" @click="card_money(user.account)">
              <i class="el-icon-s-finance" style="float: left;font-size: 20px;color:gray;margin: 1px 5px 0 4px;"></i>
              <p>钱包</p>
          </div>
      </div>
  </div>
</template>

<script>

import {mapState} from 'vuex';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Resow',
    // props:['userUsername','userAccount','userGuanzhu'],
  data() {
    return {
        show_account:'',
        // show_youke:false,
        //     username:'',
        //     account:'',
        //     guanzhu:''

    };
  },

  mounted() {
      const self=this
      function fn(){
          let a=localStorage.getItem('UserAccount')
          console.log(a)
          self.show_account = a.length !== 0;
          // if(a.length===0){
          //     self.show_account=false
          // }else{
          //     self.show_account=true
          // }
      }
      fn()
  },
    computed:{
      ...mapState(
          ['user']
          ),
      //   user(){
      //     return this.user
      //   },
      //   username(){
      //       return this.$store.state.user.username
      //   },
      //   account(){
      //       return this.$store.state.user.account
      //   },
      //   guanzhu(){
      //       return this.$store.state.user.guanzhu
      //   }
    },

  methods: {
      login_link(){
          this.$router.push('/')
      },
      show_guanzhu(a,n,p){
        this.$router.push({
            path:'/Home/Fans',
            query:{
                account:a,
                username:n,
                Apic:p,
            }
        })
      },
      // 创作者中心>文章查看
      card_show(a,p,n){
          // console.log(self.$store.state.user.account)
        this.$router.push({
            path:'/Home/Article',
            query:{
                account:a,
                Apic:p,
                username:n,
            }
        })
      },
      // 创作者中心>草稿查看
      card_drafts(a){
        this.$router.push({
            path:'/Home/Unsave',
            query:{
                account:a,
            }
        })
      },
      // 创作者中心>收藏查看
      card_star(a){
          this.$router.push({
              path:'/Home/Collect',
              query:{
                  account:a,
              }
          })
      },
      card_center(a){
          this.$router.push({
              path:'/Home/Money',
              query:{
                  account:a,
              }
          })
      },
      card_money(a){
          this.$router.push({
              path:'/Home/Wallet',
              query:{
                  account:a,
              }
          })
      },

  },
};
</script>

<style>
#rside{
    width: 300px;
    /*height: 1000px;*/
    float: left;
    left: -100px;
    position: sticky ;
    top: 20px;
    margin-top: 20px;


}
#login_zhuye{
    background-color: #f3f3f3;
    border: 1px solid rgb(212, 212, 213);
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.3);
    width: 300px;
    height: 200px;
    margin-bottom: 30px;
}
#login_zhuye h1{
    text-align: center;
}
.zhuye_user:hover{
    background-color: white;
}
.zhuye_user{
    width: 300px;
    height: 60px;
    padding: 1px 0 0 0;
}
#login_zhuye .zhuye_name{
    font-size: 24px;
    /*text-align: center;*/
    margin: 0 0 0 10px;
    user-select: none;
}
#login_zhuye .zhuye_account{
    font-size: 18px;
    color: gray;
    /*text-align: center;*/
    margin: 0 0 0 10px;
    user-select: none;
}
#login_zhuye button{
  display: block;
  margin: 20px auto 0 auto;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  font-size: 18px;
  background-color: palegoldenrod;
}
#login_zhuye .zhuye_guanzhu{
    border-top: 1px solid rgba(31,31,31,0.25);
    width: 300px;
    height: 139px;
}
.zhuye_guanzhu1{
    padding-top: 20px;
    font-size: 18px;
    text-align: center;
}
.zhuye_guanzhu2{
    font-size: 20px;
    text-align: center;
    user-select: none;
    color: #409EFF;
}
/*创作者卡片*/
.origin-card{
    background-color: #f3f3f3;
    border: 1px solid rgb(212, 212, 213);
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.3);
    width: 300px;
    /*padding: 5px 0 0 0 ;*/
    /*height: 200px;*/
}
.origin-card h1{
    font-size: 22px;
    margin: 0 0 0 10px;
    padding: 10px 0 10px 0;
}
.origin-cardP{
    border-top: 1px solid rgba(31,31,31,0.25);
    width: 300px;
    padding: 8px 0 8px 15px;
    transition: background-color .5s;
}
.origin-cardP:hover{
    background-color: white;
}
.origin-card p{
    margin: 0;
    font-size: 16px;
    user-select: none;
}
.el-icon-s-management{
    float: left;
    font-size: 20px;
    color:gray;
    margin: 1px 5px 0 4px;
}


</style>