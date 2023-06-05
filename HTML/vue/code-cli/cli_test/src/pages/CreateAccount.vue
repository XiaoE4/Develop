<template>
    <div>
        <div id="header">
            <h1>完善您的账号信息</h1>
            <el-steps :active="active" finish-status="success" style="width: 800px ;margin:20px auto 40px auto;">
                <el-step title="步骤 1"></el-step>
                <el-step title="步骤 2"></el-step>
                <el-step title="步骤 3"></el-step>
            </el-steps>
        </div>
        <div id="app">
            <div class="app1" :class="{active:active===0}">
                <el-form ref="form" :model="form" >
                    <div style="height: 650px">
                        <el-form-item label="账号">
                            <el-input v-model="form.account"  style="width: 300px" ></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.password" style="width: 300px" show-message></el-input>
                        </el-form-item>
                        <el-form-item label="用户名">
                            <el-input v-model="form.username" style="width: 300px" show-message></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-select v-model="form.sex" placeholder="请选择性别">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="生日">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-M-MM"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" style="float: left">上一步</el-button>
                        <el-button type="primary" @click="upSubmit" style="float: right">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="app1"  :class="{active:active===1}">
                <div style="height: 650px">
                    <div class="userPic">
                        <h1 style="text-align: center;margin: 0 0 10px 0">选择您的头像</h1>
                        <el-avatar style="margin-left: 150px" :size="150" :src="squareUrl" v-model="form.pic"></el-avatar>
                    </div>
                    <div class="selectPic" >
                        <div class="selectPic_click" v-for="s in selectUrl" :key="s.id"  @click="selectPic(s.id)">
                            <el-avatar shape="square" :size="80" :src="s.url" style="margin: 10px"></el-avatar>
                        </div>

                    </div>
                </div>
                <el-button type="primary" @click="onSubmit" style="float: left">上一步</el-button>
                <el-button type="primary" @click="upSubmit" style="float: right;">下一步</el-button>
            </div>
            <div class="app1" :class="{active:active===2}">
                <el-form ref="form" :model="form">
                    <div style="height: 650px">
                        <h1 style="text-align: center;margin: 0 0 10px 0">确认你的信息</h1>
                        <div class="userPic">
                            <el-avatar style="margin-left: 150px;margin-bottom: 50px" :size="150" :src="squareUrl" v-model="form.pic" ></el-avatar>
                        </div>
                        <el-form-item label="账号">
                            <el-input  style="width: 300px" v-model="form.account" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="用户名">
                            <el-input v-model="form.username" style="width: 300px" show-message disabled></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-input v-model="form.sex" style="width: 300px" show-message disabled></el-input>
                        </el-form-item>
                        <el-form-item label="生日">
                            <el-input v-model="form.date" style="width: 300px" show-message disabled></el-input>
                        </el-form-item>

                        <el-form-item>

                        </el-form-item>
                    </div>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" style="float: left">上一步</el-button>
                        <el-button type="primary" @click="verify" style="float: right">进入博客</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>



    </div>


</template>

<script>

export default {
    name: "CreateAccount",
    data() {
        return {
            squareUrl:require('@/assets/pic/user1.jpg'),
            selectUrl:[
                {id:1,url: require('@/assets/pic/user1.jpg'),},
                {id:2,url: require('@/assets/pic/user2.jpg'),},
                {id:3,url: require('@/assets/pic/user3.jpg'),},
                {id:4,url: require('@/assets/pic/user4.jpg'),},
                {id:5,url: require('@/assets/pic/user5.jpg'),},
                {id:6,url: require('@/assets/pic/user6.jpg'),},
                {id:7,url: require('@/assets/pic/user7.jpg'),},
                {id:8,url: require('@/assets/pic/user8.jpg'),},
                {id:9,url: require('@/assets/pic/user9.jpg'),},
                {id:10,url: require('@/assets/pic/user10.jpg'),},
                {id:11,url: require('@/assets/pic/user11.jpg'),},
                {id:12,url: require('@/assets/pic/user12.jpg')}
            ],
            active: 0 ,
            form: {
                account:'',
                password:'',
                username: '',
                sex: '',
                date: '',
                pic:'',
                submit:0,
            },
            Null:[
                {id:0,name:'账户',verify:false,value:''},
                {id:1,name:'密码',verify:false,value:''},
                {id:2,name:'用户名',verify:false,value:''},
                {id:3,name:'性别',verify:false,value:''},
                {id:4,name:'生日',verify:false,value:''},
            ],

        }
    },
    mounted() {

    },
    methods: {
        onSubmit(){
            console.log(this.active)
            if (this.active-- < 1) this.active = 0;
        },
        upSubmit() {
            console.log(typeof this.form.account)
            console.log(this.form.account)
            // this.active++
            if (this.active++ > 2) this.active = 2;
            // console.log(this.active)
            this.Null[0].value=this.form.account
            this.Null[1].value=this.form.password
            this.Null[2].value=this.form.username
            this.Null[3].value=this.form.sex
            this.Null[4].value=this.form.date
            console.log()
            // 第一步
            if(this.active===1){
                for(let i=0;i<=4;i++){
                    if(this.Null[i].value.length!==0){
                        this.Null[i].verify=true
                    }
                        if(!this.Null[i].verify){
                            this.active=0
                            // this.$message.error(this.Null[i].name+'不能为空！');
                            this.$message({
                                // duration:0,
                                customClass:'warning',
                                message:this.Null[i].name+'不能为空！',
                                type:'error',
                                showClose:true,
                            })
                        }
                }
                // 如果输入的内容全部不为空 则 验证账号是否已存在
                if(this.Null[0].verify && this.Null[1].verify&& this.Null[2].verify&& this.Null[3].verify&& this.Null[4].verify){
                    this.register()
                }
            }
        },
        // 用户选择头像
        selectPic(id){
            this.squareUrl = this.selectUrl[id-1].url
            this.form.pic = this.squareUrl
        },
        register(){
            const self = this;
            self.$axios({
                    method:'post',
                    url: 'http://127.0.0.1:10520/api/user/register',
                    data: {
                        account: self.form.account,
                        username:self.form.username,
                        submit:self.form.submit
                    }
            })
                .then( res => {
                        switch(res.data){
                            case 0:
                                console.log("账户可以使用！")
                                self.active=1
                                break;
                            case -1:
                                this.$notify({
                                    title:'警告',
                                    message:'账户已存在！',
                                    type:'warning'
                                })
                                self.active=0
                                break;
                        }
                })
                .catch( err => {
                        console.log(err);
                })
        },
        // 进入博客
        verify(){
            this.form.submit=1
            console.log(this.form)
            const self=this
            self.$axios({
                method:'post',
                url: 'http://127.0.0.1:10520/api/user/register',
                data: {
                    account: self.form.account,
                    password:self.form.password,
                    username:self.form.username,
                    sex:self.form.sex,
                    date:self.form.date,
                    pic:self.form.pic,
                    submit:self.form.submit
                }
            }).then(res=>{
                switch(res.data){
                    case 1:
                        this.$router.replace('/Home')
                        break;
                }
            }).catch(err=>{
                console.log(err)
            })
        },
    },

}
</script>

<style>

*{
    padding: 0;
    margin: 0;
}
#header h1{
    text-align: center;
    font-size: 35px;
    font-weight: bold;
    width: 1200px;
    margin: 20px auto 20px auto;
}
.app1.active{
    display: block;
}
#app{
    width: 450px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}
.app1{
    position: absolute;
    width: 450px;
    margin-left: auto;
    margin-right: auto;
    display: none;
    /*height: 1000px;*/
}
.app1 .userPic{
    width: 450px;
    margin-left: auto;
    margin-right: auto;
}
.app1 .selectPic{
    width: 400px;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
}
.selectPic_click{
    width: 100px;
    display: block;
    float: left;
    margin: 0;
}
.warning{
    padding: 0;
    /*height: 40px;*/
    /* jut */
}

</style>

