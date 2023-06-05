<template>
    <div id="content">
        <!-- 左侧的内容页 -->
<!--        <Lside :user-pic="user.pic"/>-->
<!--        &lt;!&ndash; 右侧的详尽页和尾页 &ndash;&gt;-->
<!--        <Rside :user-username="user.username" :user-account="user.account" :user-guanzhu="user.guanzhu" />-->
        <keep-alive>
            <Lside/>
        </keep-alive>

            <Rside/>
    </div>
</template>

<script>
import Rside from "@/components/Rside.vue";
import Lside from "@/components/Lside.vue";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Content",
    data(){
        return {
            isRouterAlive:true,
            show_account:'',
            isLogin:'',
            user:{
                username:'',
                account:'',
                guanzhu:'',
                pic:''
            },
            allArticle:[],

        }
    },
    components: {Lside, Rside},

    mounted(){
        this.setData()
    },
    provide(){
      return {
          reload: this.reload
      }
    },
    watch:{
        // allArticle:{
        //     deep:true,
        //     handler(){
        //         this.setArt()
        //     }
        // }
    },


    methods: {
        reload(){
            this.isRouterAlive=false
            this.$nextTick(function(){
                this.isRouterAlive=true
            })
        },
        setData(){
            let self=this
            let a =localStorage.getItem('UserAccount')
            if(a !== 'root' && a){
                self.user.account = a
                self.isLogin=true
            }else{
                console.log('不存在！')
                self.user.pic='user3'
                self.$store.commit('updatePic',self.user.pic)
                self.isLogin=false
            }
            console.log(self.user.account)
            if(self.user.account.length===0){
                self.show_account=false
                this.setArt()
                // self.show_youke=false
            }else{
                self.show_account=true
                // self.show_youke=true
                console.log("111")
                // 获取主用户信息
                self.$axios({
                    method:'post',
                    url:'http://127.0.0.1:10520/api/user/getUser',
                    data: {
                        token:'user',
                        account: self.user.account
                    }
                })
                    .then(res =>{
                        // console.log(res.data)
                        console.log("本用户资料:",res.data)
                        console.log("用户请求成功！")
                        // self.user.username = res.data.username
                        // self.user.guanzhu = res.data.guanzhu
                        // self.user.pic= res.data.Apic
                        self.$store.commit('updateUsername',res.data.username)
                        self.$store.commit('updateAccount',res.data.account)
                        self.$store.commit('updateGuanzhu',res.data.guanzhu)
                        self.$store.commit('updatePic',res.data.Apic)
                        self.$store.commit('updateSex',res.data.sex)
                        self.$store.commit('updateBir',res.data.birthday)
                        self.$store.commit('updateJin',res.data.jinyan)
                        self.$store.commit('updateFeng',res.data.ban)
                        self.$store.commit('updateMoney',res.data.money)
                        // 获取所有文章
                        this.setArt()
                    })
                    .catch( err => {
                        console.log(err);
                    });
            }
        },
        setArt(){
            let self =this
            self.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/getArticle',
                data:{
                    account: "all",
                }
            }).then(res=>{
                console.log("获取文章：",res.data)
                for(let i =0;i<res.data.length;i++){
                    res.data[i].date=new Date(res.data[i].date).toLocaleDateString().replace(/\//g,"-")
                    if(res.data[i].Cpic){
                        console.log(typeof (res.data[i].Cpic))
                        res.data[i].Cpic = res.data[i].Cpic.split(',') || res.data[i].Cpic
                    }
                    // console.log(typeof(res.data[i].Cpic))        // object
                }
                // console.log("文章获取成功！")
                self.$store.commit('allArticle',res.data)
                this.allArticle=res.data
            }).catch((err=>{
                console.log(err)
            }))
        },
        // 获取微博
        getWeibo(){
          this.$axios({
            method:'GET',
            url:'https://api.weibo.com/2/statuses/user_timeline.json',
            data:{
              access_token:'xxx',  //采用OAuth授权方式为必填参数，OAuth授权后获得
              uid:'',
            }
          }).then(res=>{
            console.log(res.data)
          }).catch(err=>{
            console.log(err)
          })
        }


    },
}
</script>

<style>
/* 下方主内容框 */
#content{
    margin:auto;
    background-color: pink;
    width: 1050px;
    /*height: 2000px;*/
}
</style>