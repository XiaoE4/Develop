<template>
  <div id="Article_show">
      <div class="article_show1">
          <div class="article_show1_1">
              <!--          <img :src="require('../assets/pic/' + Apic + '.jpg')" alt="">-->
              <img :src="require('../assets/pic/' + m.Apic + '.jpg')" alt="" style="width: 150px;height: 150px;margin:30px 0 20px 75px;border-radius: 100px">
              <h3>{{m.username}}</h3>
          </div>
          <div class="article_show1_2">
              <h1>{{m.title}}</h1>
          </div>
      </div>
      <div v-for="c in m.Cpic" :key="c">
          <img :src="require('../assets/pic-content/' + c + '.jpg')" alt="" v-if="typeof(m.Cpic)=='object' " >
      </div>
      <img :src="require('../assets/pic-content/' + m.Cpic + '.jpg')" alt="" v-if="typeof(m.Cpic)=='string'">
      <video :src="require('../assets/video/' + m.video + '.mp4')" controls="true" v-if="m.video"></video>
      <p class='p1' v-html="m.content">{{m.content}}</p>
      <el-button type="success" plain round style="margin-bottom: 20px;width: 1000px" @click="drawer = true" >打赏作者</el-button>
      <p class="p2">上传于 {{m.date}}</p>
      <el-drawer
              title="请选择或输入打赏金额"
              style="text-align: center"
              :visible.sync="drawer"
              direction="btt"
              :before-close="handleClose">
          <div class="chong_money">
              <el-button @click="money.shang=10">10元</el-button>
              <el-button @click="money.shang=5">5元</el-button>
              <el-button @click="money.shang=1">1元</el-button>
              <el-input  v-model="money.shang" style="width: 200px;margin-left: 10px" onkeyup="this.value=this.value.replace(/[^\d]/g,'')">
                  <template slot="prepend">打赏金额</template>
              </el-input>
          </div>
          <div class="chong_btn2">
              <el-input  v-model="money.get" style="width: 250px" :disabled="true" >
                  <template slot="prepend">余额</template>
                  <template slot="append">元</template>
              </el-input>
              <el-button type="warning" plain round style="width: 150px;height: 50px;margin-left: 20px" @click="shang">打赏</el-button>
          </div>

      </el-drawer>
  </div>
</template>

<script>
export default {
    name: "Article_show1",
    data(){
        return{
            // 用户
            root:localStorage.getItem('UserAccount'),
            money:{
              get:0,
              shang:0,
            },
            m:{
                Cpic:this.$route.query.Cpic,
                Apic:this.$route.query.Apic,
                title:this.$route.query.title,
                content:this.$route.query.content,
                video:this.$route.query.video,
                account:this.$route.query.account,
                date:this.$route.query.date,
                username:this.$route.query.username
            },
            content1:'',
            content2:'',
            drawer:false,
        }
    },
    mounted() {
        // console.log("content1:",this.content1)
        // console.log("content2:",this.content2)
        console.log("m====:",this.m)
        console.log("Cpic:",this.m.Cpic)
        this.getMoney()
    },
    created() {
        // this.content1 = this.$route.params.content
        // this.content2 = this.$route.query.name
        window.scrollTo(0,0);
    },
    computed:{
        date(){
            let a =this.$route.query.date
            a =new Date(a).toLocaleDateString().replace(/\//g,"-")
            return a
        },
    },
    methods:{
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(() => {
                    done();
                })
                .catch(() => {});
        },
        shang(){
            if(this.root===this.m.account){
                this.$message.error("不能给自己打赏！")
                return false
            }
            let self=this
            console.log(this.Cno)
            this.money.shang=parseInt(this.money.shang)
            // this.$message.info(this.money.shang+"-------"+this.money.get)
            if(this.money.get<this.money.shang){
                this.$message.error("你的余额不足")
                return false
            }
            if(this.money.shang===0){
                this.$message.error("请选择打赏金额")
                return false
            }
            this.$confirm('将打赏给该作者, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log("shang!")
                self.$axios({
                    method:'post',
                    url:'http://127.0.0.1:10520/api/user/money',
                    data:{
                        token:'shang',
                        account: this.root,
                        money:this.money.shang,
                        Cno:this.m.Cno,
                    }
                }).then(res=>{
                    switch (res.data){
                        case 0:
                            this.$message.success("打赏成功！")
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
        getMoney(){
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/money',
                data:{
                    token:'showMoney',
                    account: this.root,
                }
            }).then(res=>{
                console.log(res.data)
                this.money.get=res.data[0].money
            }).catch((err=>{
                console.log(err)
            }))
        }
    }

}
</script>

<style scoped>

#Article_show{
    width: 1100px;
    padding: 50px;
    margin: 0 auto 50px auto;
    background-color: #f3f3f3;
    border: solid rgba(31,31,31,.3);
    border-width: 0 1px 0 1px;
    box-shadow: 3px 3px 5px rgba(31,31,31,.3);
}
.article_show1{
    width: 1000px;
    height: 300px;
    float: right;
    margin-bottom: 20px;
}
.article_show1_1{
    height: 300px;
    width: 300px;
    float: left;
    background-color: white;
}
.article_show1_1 img{
    width: 100px;
    height: 100px;
}
.article_show1_1 h3{
    text-align: center;
}
.article_show1_2{
    height: 300px;
    width: 700px;
    float: right;
}
.article_show1_2 h1{
    font-size: 34px;
    text-align: center;
    margin: 50px 0 50px 0;
}
#Article_show img{
    width: 1000px;
    height: 500px;
    margin: 30px 0 30px 0;
}
#Article_show video{
    background-color: black;
    width: 1000px;
    height: 500px;
    margin: 30px 0 30px 0;
}
#Article_show .p1{
    font-size: 20px;
    margin-bottom: 200px;
}
#Article_show .p1 img{
    width: 1000px;
    height: 500px;
    margin: 20px 0;
}
#Article_show .p2{
    font-size: 16px;
    color: #999999;
    user-select: none;
    text-align: center;
}
</style>