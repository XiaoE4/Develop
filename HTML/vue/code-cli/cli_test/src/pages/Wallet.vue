<template>
  <div class="wallet">
      <div class="wallet1">
          <el-tooltip class="item" effect="dark"  placement="right">
              <div slot="content">金额 = <br> 充值的金额 + 激励计划提取的金额</div>
              <i class="el-icon-coin" style="font-size: 40px;color: #000000;margin-right: 240px;margin-left: 240px;user-select: none">金额</i>
          </el-tooltip>

          <h1 >{{money.get}} 元</h1>
      </div>
      <div class="wallet2">
          <el-button type="warning" plain @click=" drawer = true" >充值</el-button>
          <el-button type="success" plain @click="tixian">提现</el-button>
      </div>
      <el-drawer
              title="请选择充值金额"
              style="text-align: center"
              :visible.sync="drawer"
              direction="btt"
              :before-close="handleClose">
          <div class="chong_money">
              <el-button @click="money.chong=100">100元</el-button>
              <el-button @click="money.chong=50">50元</el-button>
              <el-button @click="money.chong=10">10元</el-button>
              <el-button @click="money.chong=5;">5元</el-button>
          </div>
          <div class="chong_btn">
              <el-button type="warning" plain round style="width: 150px;height: 50px" @click="chongzhi">充值</el-button>
          </div>

      </el-drawer>
  </div>
</template>

<script>
export default {
    name: "User_Wallet",
    data(){
        return{
            account:this.$route.query.account,
            drawer:false,
            money:{
                get:0,
                chong:0,
            }
        }
    },
    mounted() {
        this.getMoney()
    },
    methods:{
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(() => {
                    done();
                })
                .catch(() => {});
        },
        // 获取用户钱包有多少钱
        getMoney(){
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/money',
                data:{
                    token:'showMoney',
                    account: this.account,
                }
            }).then(res=>{
                console.log(res.data)
                this.money.get=res.data[0].money
            }).catch((err=>{
                console.log(err)
            }))
        },
        // 点击充值
        chongzhi(){
            console.log(this.money.chong)
            if(this.money.chong===0){
                this.$message.error("请选择充值的金额！")
                return false
            }
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/money',
                data:{
                    token:'chong',
                    account: this.account,
                    money:this.money.chong,
                }
            }).then(res=>{
                switch (res.data){
                    case 0:
                        this.$message.success("成功充值"+this.money.chong+"元！")
                        setTimeout(function (){
                            location.reload()
                        },1000)
                        break
                }
            }).catch((err=>{
                console.log(err)
            }))
        },
        // 点击提现
        tixian(){
            this.$confirm('此操作将把钱包的钱提取到银行卡内, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.money.get===0){
                    this.$message.error("你的钱包内没有余额！")
                    return false
                }
                this.$axios({
                    method:'post',
                    url:'http://127.0.0.1:10520/api/user/money',
                    data:{
                        token:'tiqu',
                        account: this.account,
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
    }
}
</script>

<style>
.wallet{
    width: 1000px;
    height: 650px;
    margin: 0 auto 0 auto;
    background-color: white;
    padding-top: 20px;
}
.wallet1{
    width: 600px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    padding-top: 20px;
    background-color: #ededef;
}
.wallet1 h1{
    margin-top: 50px;
    text-align: center;
    color: red;
}
.wallet2{
    width: 150px;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
}
.chong_money{
    width: 100%;
    height: 100px;
}
.chong_btn{
    width: 200px;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
}
.chong_btn2{
    width: 500px;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
}

</style>