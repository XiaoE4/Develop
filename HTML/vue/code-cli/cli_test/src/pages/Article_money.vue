<template>
  <div class="article_money">
      <div class="article_money2">
          <h1>近期获得收益</h1>
          <h1 style="margin-top: 50px">{{money.get}}</h1>
      </div>
      <div class="article_moneyShow">
          <h1 style="text-align: center">总收益</h1>
          <div class="moneyShow">
              <h3>点赞</h3>
              <h3>{{money.zan}}</h3>
          </div>
          <div class="moneyShow">
              <h3>收藏</h3>
              <h3>{{money.cang}}</h3>
          </div>
      </div>
      <div style="margin-left: auto;margin-right: auto;width: 100px">
          <el-button type="success" plain @click="tixian">点我提现</el-button>
      </div>

  </div>
</template>

<script>
export default {
    name: "Article_money",
    data(){
        return{
            account:this.$route.query.account,
            money:{
                zan:0,
                cang:0,
                get:0,
            }
        }
    },
    mounted() {
        this.getMoney()

    },
    methods:{
      //   点击提现
      tixian(){
          console.log(this.money.get)
          let self=this
          console.log("tixian")
          console.log(this.account)
          this.$confirm('此操作将把收益提现到钱包内, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              if(this.money.get==0){
                  this.$message.error("你还没有获得收益，无法提现！")
                  return false
              }
              self.$axios({
                  method:'post',
                  url:'http://127.0.0.1:10520/api/user/money',
                  data:{
                      token:'tixian',
                      account: this.account,
                      money: this.money.get
                  }
              }).then(res=>{
                  switch (res.data){
                      case 0:
                          this.$message.success("提现成功！")
                          setTimeout(function (){
                              location.reload()
                          },1000)
                          break
                  }
              }).catch(err=>{
                  this.$message.error(err)
              })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消提现'
              });
          });
      },
      //   获取收益
      getMoney(){
          let self =this
          self.$axios({
              method:'post',
              url:'http://127.0.0.1:10520/api/user/getArticle',
              data:{
                  account: '414546312',
              }
          }).then(res=>{
              console.log("获取文章：",res.data)
              for(let i =0;i<res.data.length;i++){
                  this.money.zan=this.money.zan+res.data[i].zan* 1 * 0.1
                  this.money.cang=this.money.cang+res.data[i].cang * 0.5
                  this.money.get=this.money.get+res.data[i].money
              }
              this.money.zan=this.money.zan.toFixed(2)
              this.money.cang=this.money.cang.toFixed(2)
              this.money.get=this.money.get.toFixed(2)
              console.log(this.money.zan)

          }).catch((err=>{
              console.log(err)
          }))
      }
    }
}
</script>

<style >
.article_money{
    width: 1000px;
    height: 650px;
    margin: 0 auto 0 auto;
    background-color: white;
    padding-top: 20px;
}
.article_money2{
    width: 500px;
    height: 200px;
    margin: 0 auto 30px auto;
    background-color: #ededef;
    padding-top: 20px;
}
.article_money2 h1{
    text-align: center;
    margin-top: 0;
}
.article_moneyShow{
    width: 1000px;
    height: 300px;
    /*margin: 0 50px 0 50px;*/
}
.moneyShow{
    width: 400px;
    height: 200px;
    display: block;
    float: left;
    margin: 0 50px 0 50px;
    background-color: #ededef;
}
.moneyShow h3{
    text-align: center;
}

</style>