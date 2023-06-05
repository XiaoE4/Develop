<template>
  <div class="top_content">
      <div class="top_btn" @click="toHome">
          首页
      </div>
      <div class="top_btn" @click="find">
          发现
      </div>
      <div class="search">
          <input type="search" v-model="message" placeholder="搜索博客">
          <button type="button" @click="searchArt">搜索</button>
      </div>
      <i class="el-icon-s-tools" @click="ShowTools"></i>
      <ul class="tools show1">
          <li @click="card_show">个人空间</li>
          <li @click="dialogVisible=true">退出登录</li>
      </ul>
      <el-dialog
          title="是否确认退出登录？"
          :visible.sync="dialogVisible"
          width="20%"
          :show-close="false"
          :center="true"
          :close-on-click-modal="false">
              <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="card_unlogin">确 定</el-button>
              </span>
      </el-dialog>

  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Search',

  data() {
    return {
      dialogVisible:false,
      message:'',
    };
  },

  mounted() {
    
  },

  methods: {

      root(){
          this.$router.push('/Root')
      },

      toHome(){
          this.$router.push('/Home')
      },

      find(){
          this.$router.push('/Home/Find')
      },
      // 搜索博客
      searchArt(){
        // console.log(this.message)
        this.$router.push({
            path:'/Home/Find',
            query:{
                isFind:"0",
                search:this.message,
            }
        })
        this.message=''

      },
      ShowTools(){
          let tools=document.querySelector('.tools')
          // console.log(tools.className)
          if(tools.className==='tools show1'){
              // setTimeout(function(){
                    tools.className='tools show2'
              // },1000)
          }else{
              tools.className='tools show1'
          }
      },
      // 点击事件：切换到个人空间
      card_show(){
          let tools=document.querySelector('.tools')
          tools.className='tools show1'
          // this.$router.push('/Home/User')
          this.$router.push({
              path:'/Home/User',
              query:{
                  username:this.$store.state.user.username,
                  account:this.$store.state.user.account,
                  sex:this.$store.state.user.sex,
                  Apic:this.$store.state.user.pic,
                  birthday:this.$store.state.user.birthday
              }
          })

      },
      card_unlogin(){
          // console.log(1)
          console.log("111")
          this.$router.push('/')
      }
  },
};
</script>

<style>
.top_content{
    margin-left: auto;
    margin-right: auto;
    width: 1100px;
    height: 50px;
    /*position: relative;*/
}
.top_content i{
    float: right;
    margin: 12px 200px 0 0;
    font-size: 25px;
    color: #999999;
    transition: color 1s;
}
i:hover{
    color: #409EFF;
}
.top_content .tools{
    display: block;
    width: 150px;
    height: 90px;
    font-size: 18px;
    list-style: none;
    text-align: center;
    color: white;
    position: absolute;
    user-select: none;
    left:1190px;
    top: 50px;
    background-color: #1F1F1F;
}
/*点击显示工具栏*/
.show1{
    opacity: 0;
    visibility: hidden;
    z-index: 0;
}
.show2{
    opacity: 1;
    visibility: visible;
    z-index: 10;
    transition: 1s;
}
.tools li{
    height: 45px;
    padding: 10px 0 10px 0;
    transition: background-color .5s,color .5s;
}
li:hover{
    background-color: #909399;
    color: #1F1F1F;
}
.top_btn{
    /*display: inline-block;*/
    text-align: center;
    float: left;
    color: #999999;
    height: 50px;
    width: 100px;
    font-size: 16px;
    /*margin-right: 50px;*/
    user-select: none;
    padding-top: 15px;
    transition: background-color .5s,color .5s;
}
.top_btn:hover{
    background-color: #999999;
    color: #1F1F1F;
}
.search{
    float: left;
    width: 300px;
    height: 50px;
    margin-top: 3px;
    margin-left: 100px;
}
.search input{
    height: 40px;
    width: 250px;
    border-radius: 20px;
    float: left;
    padding-left: 10px;
    outline: none;
}
/*.search input:focus{*/
/*    border: 1px solid red;*/
/*}*/
.search button{
    height: 40px;
    width: 50px;
    border-radius: 20px;
    font-size: 15px;
    /*position: absolute;*/
    float: left;
}

</style>