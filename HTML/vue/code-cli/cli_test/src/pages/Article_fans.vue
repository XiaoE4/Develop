<template>
  <div >
      <div id="showUP">
          <h1 style="text-align: center">{{ user.username }}</h1>
          <div class="userPic">
              <el-avatar style="margin-left: 150px;margin-bottom: 10px" :size="150"  :src="require('../assets/pic/' + user.Apic + '.jpg')"></el-avatar>

          </div>
          <el-button style="margin-left: 650px" type="primary" v-if="user.account!==root && !this.user.guan" icon="el-icon-plus" plain @click="clickGuan">关注</el-button>
          <el-button style="margin-left: 650px" type="info" v-if="user.account!==root && this.user.guan" icon="el-icon-check" plain @click="clickDelGuan">已关注</el-button>

      </div>
      <div id="showGF" >
          <div id="showGF2">
              <span  @click="selFans" :class="{active:show.fans}">粉丝</span>
              <span  @click="selGuan" :class="{active:show.guanzhu}">关注</span>
          </div>
          <div id="fans" v-if="show.fans" style="">
              <div v-if="!haveFan">
                  <h3 style="line-height: 600px;text-align: center;color: #999999">没有粉丝</h3>
              </div>
              <div v-for="f in fans" :key="f.id" id="fans_one">
                  <img  :src="require('../assets/pic/' +f.Apic + '.jpg')"  alt="" style="width:150px;height: 150px;margin: 0 25px 0 25px;">
                  <p>{{f.username}}</p>
                  <p style="color: #999999">{{f.account}}</p>
              </div>

          </div>
          <div id="guanzhu" v-if="show.guanzhu" style="">
              <div v-if="!haveGuan">
                  <h3 style="line-height: 600px;text-align: center;color: #999999">没有关注</h3>
              </div>
              <div id="fans_one" v-for="g in guan" :key="g.id">
                  <img :src="require('../assets/pic/' +g.Apic + '.jpg')"  alt="" style="width:150px;height: 150px;margin: 0 25px 0 25px;">
                  <p>{{g.username}}</p>
                  <p style="color: #999999">{{g.account}}</p>
              </div>

          </div>
      </div>


  </div>
</template>

<script>
export default {
    name: "Article_fans",
    data(){
        return {
            root:localStorage.getItem('UserAccount'),
            user:{
                username:this.$route.query.username,
                account:this.$route.query.account,
                Apic:this.$route.query.Apic,
                guan:false,
            },
            show:{
                fans:false,
                guanzhu:true,
            },
            haveFan:true,
            haveGuan:true,
            fans:[],
            guan:[],

        }
    },
    computed:{

    },
    mounted() {
      this.getFans()
      this.getGuan()
    },
    methods:{
        selFans(){
            this.show.fans=true
            this.show.guanzhu=false
        },
        selGuan(){
            this.show.fans=false
            this.show.guanzhu=true
        },
        getFans(){
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/getUser',
                data:{
                    token:'fan',
                    account:this.user.account
                }
            }).then(res=>{
                this.fans=res.data
                if(this.fans.length===0){
                    this.haveFan=false
                    this.user.guan=false
                }else{
                    for(let i=0;i<this.fans.length;i++){
                        if(this.fans[i].account===this.root){
                            this.user.guan=true
                        }
                    }
                }
            }).catch(err=>{
                this.$message.error(err)
            })
        },
        getGuan(){
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/getUser',
                data:{
                    token:'guan',
                    account:this.user.account
                }
            }).then(res=>{
                this.guan=res.data
                if(this.guan.length===0){
                    this.haveGuan=false
                }
            }).catch(err=>{
                this.$message.error(err)
            })
        },
        clickGuan(){
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/fan',
                data:{
                    token:'add',
                    account:this.user.account,
                    fans_account:this.root,
                }
            }).then(res=>{
                switch (res.data){
                    case 0:
                        this.$message.success("关注成功！")
                        setTimeout(function(){
                            location.reload()
                        },1000)
                        break
                }
            }).catch(err=>{
                this.$message.error(err)
            })
        },
        clickDelGuan(){
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/fan',
                data:{
                    token:'del',
                    account:this.user.account,
                    fans_account:this.root,
                }
            }).then(res=>{
                switch (res.data){
                    case 0:
                        this.$message.success("取关成功！")
                        setTimeout(function(){
                            location.reload()
                        },1000)
                        break
                }
            }).catch(err=>{
                this.$message.error(err)
            })

        },
    }
}
</script>

<style>
/*用户名和用户图片*/
#showUP{
    width: 1400px;
    margin-left:auto;
    margin-right: auto;
    /*background-color: white;*/
}
/*用户粉丝和关注*/
#showGF{
    width: 1400px;
    min-height: 600px;
    background-color: white;
    margin-left:auto;
    margin-right: auto;
}
#showGF2{
    width: 1400px;
    height: 35px;
    background-color: white;
    padding: 0 600px 0 600px;
    border-bottom: 1px solid rgba(31,31,31,0.25);
}
#showGF2 span{
    display: block;
    width: 100px;
    float: left;
    text-align: center;
    font-size: 24px;
    user-select: none;
}
#showGF2 span.active{
    background-color: #409EFF;
}
#fans{
    width: 100%;
    display: block;
    background-color: white;
    height: auto;
}
#fans_one{
    width: 280px;
    height: 260px;
    display: inline-block;
    float: left;
    background-color: white;
    padding: 20px 40px 20px 40px;
}
#fans_one p{
    text-align: center;
    font-size: 20px;
}
#guanzhu{
    width: 100%;
    height: 200px;
}
.btn_guan{
    width: 80px;
    height: 40px;
    user-select: none;
    background-color: white;
    color: black;
    transition: background-color 1s ,color 1s;
}
.btn_guan:hover{
    color:white;
    background-color: #409EFF;
}
/*.el-icon-check tbody tr:hover>td {*/
/*    color:#ffffff!important*/
/*}*/


</style>