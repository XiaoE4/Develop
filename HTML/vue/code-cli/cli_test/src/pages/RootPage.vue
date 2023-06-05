<template>
  <div id="root_page">
      <div class="top">
          <h1 style="width: 200px;float: left">博客后端管理系统</h1>
          <h1 style="float: right;width:1500px;color: #409EFF;text-align: center;">{{title}}</h1>
      </div>
      <el-row class="tac">
          <el-col :span="12" style="width: 100%;height: calc(100vh - 50px)" >
              <el-menu
                        :default-openeds="openeds"
                      default-active="2"
                      class="el-menu-vertical-demo"
                      @open="handleOpen"
                      @close="handleClose"
                      background-color="#545c64"
                      text-color="#fff"
                      active-text-color="#ffd04b">
                  <el-submenu index="1">
                      <template slot="title">
                          <i class="el-icon-location"></i>
                          <span>内容管理</span>
                      </template>
<!--                      只能删除头条-->
                      <el-menu-item index="1-1" @click="Toutiao">头条</el-menu-item>
<!--                      加入头条，删除，日期排序，-->
                      <el-menu-item index="1-2" @click="Wenzhang">文章</el-menu-item>
<!--                      加入头条，删除，日期排序-->
                      <el-menu-item index="1-3" @click="Shipin">视频</el-menu-item>
<!--                      加入头条，删除，日期排序-->
                      <el-menu-item index="1-4" @click="Tupian">图片</el-menu-item>

                  </el-submenu>
                  <el-menu-item index="2" @click="Jinyan">
                      <i class="el-icon-menu"></i>
<!--                      添加或删除-->
                      <span slot="title">用户禁言</span>
                  </el-menu-item>
                  <el-menu-item index="3" @click="Fengjin">
                      <i class="el-icon-setting"></i>
<!--                      添加或删除-->
                      <span slot="title">用户封禁</span>
                  </el-menu-item>
              </el-menu>
          </el-col>
      </el-row>
      <div class="content">
            <router-view ></router-view>
      </div>
  </div>
</template>

<script>
export default {
    name: "RootPage",
    data(){
        return{
            title:'点击左侧查看库表',
        }
    },
    mounted() {
        this.getArticle()
    },
    methods:{
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        Toutiao(){
            this.title='头条'
            this.$router.replace('/Root/Toutiao')
        },
        Wenzhang(){
            this.title='文章'
            this.$router.replace('/Root/Content')
        },
        Shipin(){
            this.title='视频'
            this.$router.replace('/Root/Video')
        },
        Tupian(){
            this.title='图片'
            this.$router.replace('/Root/Picture')
        },
        Jinyan(){
            this.title='禁言'
            this.$router.replace('/Root/BanTalk')
        },
        Fengjin(){
            this.title='封禁'
            this.$router.replace('/Root/BanUser')
        },
        getArticle(){
            // 获取所有文章
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/getArticle',
                data:{
                    account: "all",
                }
            }).then(res=>{
                console.log("获取文章：",res.data)
                // console.log("文章获取成功！")
                this.$store.commit('allArticle',res.data)
            }).catch((err=>{
                console.log(err)
            }))

        }
    }
}
</script>

<style>
/*主页面*/
body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
}
#root_page{
    width: 100%;
    background-color: yellow;
}
#root_page .top{
    height: 50px;
    width: 100%;
    background-color: rgb(91, 96, 103);
}
#root_page .top h1{
    color: rgb(255,255,255);
    margin: 0;
    font-size: 25px;
    line-height: 50px;
    font-weight: bold;
}
.tac{
    height: calc(100vh - 50px);
    width: 20%;
    float: left;
    background-color: rgb(84, 92, 100);
}
.el-menu{
    border: 1px solid rgb(84, 92, 100);
}
#root_page .content{
    height: calc(100vh - 50px);
    float: left;
    width: 80%;
    background-color: white;
}
.content h1{
    margin: 0 0 10px 0;
    text-align: center;
}
#root_pic{
    width: 100px;
    height: 100px;
    margin-right: 20px;
    /*margin-bottom: 20px;*/
    float: left;
}
#root_video{
    width: 200px;
    height: 100px;
}
#root_content{
    display: -webkit-box!important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}

</style>