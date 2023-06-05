<template>
    <div>
        <div class="content">
            <div class="wrapper">
                <div class="form-wrapper">
                    <div class="login-form">
                        <div class="tips">
                            <h1>Login in this platform.</h1>
                            <span>No account?</span>
<!--                            注册界面切换-->
                            <span class="signup-into" @click="signupInto">Create</span>
                        </div>
                        <div class="form-wrapper">
                            <div class="input-wrapper user">
                                <input type="text" class="inputs" v-model="form.account">
                                <span class="errTips" :class="{active:errorTip===1}" v-if="accountError">* 账户填写错误 *</span>
                            </div>
                            <div class="input-wrapper pwd">
                                <input type="password" class="inputs" v-model="form.password">
                                <span class="errTips" :class="{active:errorTip===2}" v-if="passwordError">* 密码填写错误 *</span>
                            </div>
                            <div class="input-wrapper veri-code">
<!--                                登录：输入验证码-->
                                <input type="text" class="inputs veri-code-input" v-model="form.vericode">
<!--                                登录：点击获取验证码-->
                                <span class="veri-code-tips" @click="veriCodeTips">Click To Get</span>
                            </div>
                            <div class="btn-wrapper">
<!--                                登录：验证码登录-->
                                <button class="form-btn other-login-btn" @click="otherLogin">VeriCode Login</button>
<!--                                登录按钮-->
                                <button class="form-btn login-btn" @click="LoginAccount">Login</button>
                            </div>
<!--                            <div class="other-login">-->
<!--                                <div class="divider">-->
<!--                                    <span class="line"></span>-->
<!--                                    <span class="divider-text">or</span>-->
<!--                                    <span class="line"></span>-->
<!--                                </div>-->
<!--                                <div class="other-login-wrapper">-->
<!--                                    <div class="other-login-item">-->
<!--                                        <img src="../assets/images/QQ.png" alt="QQ">-->
<!--                                    </div>-->
<!--                                    <div class="other-login-item">-->
<!--                                        <img src="../assets/images/WeChat.png" alt="WeChat">-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

export default {
    name: 'Login-Account',

    data() {
        return {
            veriCodeTipsWrite:false,
            el:'#Login',
            isLogin:false,
            accountError:false,
            passwordError:false,
            existed:false,
            errorTip: 0,
            form:{
                account:'',
                password:'',
                vericode:'',
            },
            reckonTimeFlag:"5",
            otherLoginFlag:false,
            // reckonTime:setInterval(this.countDown, 1000)
        };
    },

    mounted() {
        // window.addEventListener("popstate",function(){
        //     history.pushState(null, null, document.URL);
        // },false)
    },

    methods: {

        // 注册界面切换
        signupInto(){
            this.$router.push('/CreateAccount')
        },

        // 验证码登录
        otherLogin(){
            let veriCode = document.querySelector('.veri-code');
            let otherLoginBtn = document.querySelector('.other-login-btn');
            let pwdBtn = document.querySelector('.pwd');
            if(this.otherLoginFlag) {
                veriCode.style.opacity = '0';
                veriCode.style.zIndex = '0';
                veriCode.style.transform = 'translate(0, 0px)';
                pwdBtn.style.opacity = '1'
                otherLoginBtn.innerHTML = 'VeriCode Login';
                this.otherLoginFlag = false;
            } else {
                veriCode.style.opacity = '1';
                veriCode.style.zIndex = '1';
                veriCode.style.transform = 'translate(0, -90px)';
                pwdBtn.style.opacity = '0'
                otherLoginBtn.innerHTML = 'Password Login';
                this.otherLoginFlag = true;
            }
        },

        // 验证码获取
            // 1.点击改变验证码提示
        veriCodeTipsClick(){
            let self=this
            let veriCodeTips = document.querySelector('.veri-code-tips');
            this.veriCodeTipsWrite = true;
            let reckonTimeFlag=5;
            veriCodeTips.style.color = "rgb(153, 151, 151)";

            // 定时器
            let reckonTime = setInterval(function(){
                let veriCodeTips = document.querySelector('.veri-code-tips');
                veriCodeTips.innerHTML = `RESEND(${reckonTimeFlag})`;
                reckonTimeFlag--;
                // console.log("get",self.veriCodeTipsWrite)
                // console.log("reckonTimeFlag：",reckonTimeFlag)
                // console.log(veriCodeTips)
                if (reckonTimeFlag < 0) {
                    clearInterval(reckonTime);
                    // console.log("break",reckonTime)
                    this.reckonTimeFlag = 5;
                    // console.log(reckonTimeFlag)
                    veriCodeTips.innerHTML = `Click To Get`;
                    veriCodeTips.style.color = "rgb(39, 150, 247)";
                    // 可以点击获取验证码
                    self.veriCodeTipsWrite = false;
                    // console.log(self.veriCodeTipsWrite)
                    // veriCodeTips.onclick = this.veriCodeTipsClick+this.veriCodeTipsShow;
                }
            }, 1000);
        },
            // 2.验证码显示
        rand(min,max){
            return Math.floor(Math.random()*(max-min))+min;
        },
        veriCodeTipsShow(){
            let randnum=this.rand(0,9999);
            if(randnum.toString().length===4){
                console.log(randnum);
                console.log(typeof(randnum));
                this.$notify.info({
                    title:'验证码',
                    message:randnum,
                    duration: 6000,
                })
            }else if(randnum.toString().length===3){
                randnum= "0"+randnum
                console.log(randnum);
                console.log(typeof(randnum));
                this.$notify.info({
                    title:'验证码',
                    message:randnum,
                    duration: 6000,
                })
            }else if(randnum.toString().length===2){
                randnum = '00' + randnum
                console.log(randnum);
                console.log(typeof(randnum));
                this.$notify.info({
                    title:'验证码',
                    message:randnum,
                    duration: 6000,
                })
            }else if(randnum.toString().length===1){
                randnum= "000"+randnum
                console.log(randnum);
                console.log(typeof(randnum));
                this.$notify.info({
                    title:'验证码',
                    message:randnum,
                    duration: 6000,
                })
            }
        },
            // 3.点击获取验证码
        veriCodeTips(){
            if(!this.veriCodeTipsWrite){
                this.veriCodeTipsClick()
                this.veriCodeTipsShow()
            }

        },

        // 登录界面跳转
        LoginAccount(){
            // console.log(this.form.account)
            const self = this;
            if (self.form.account !== "" && self.form.password !== "") {
                self.$axios({
                    method:'post',
                    url: 'http://127.0.0.1:10520/api/user/login',
                    data: {
                        account: self.form.account,
                        password: self.form.password
                    }
                })
                    .then( res => {
                        switch(res.data){
                            case 0:
                                this.$notify({
                                    title:'登录成功！',
                                    message:'欢迎你！用户'+self.form.account,
                                    type:'success'
                                })
                                // alert("登陆成功！");
                                if(self.form.account==='root'){
                                    setTimeout(function(){
                                        self.$router.replace('/Root')
                                    },2000)
                                }else{
                                    localStorage.setItem('UserAccount',self.form.account)
                                    setTimeout(function(){
                                        self.$router.replace('/Home')
                                    },2000)
                                }

                                // 管理员跳转到管理界面：if(self.form.account=root)

                                // this.$router.push('/Home')
                                break;
                            case -1:
                                this.accountError = true;
                                // 错误提示
                                this.errorTip=1;
                                break;
                            case 1:
                                this.passwordError = true;
                                // 错误提示
                                this.errorTip=2;
                                break;
                        }
                    })
                    .catch( err => {
                        console.log(err);
                    })
            } else{
                alert("填写不能为空！");
            }
        },
      //
      loginWeibo(){
        this.$axios({
          method:'GET',
          url:'https://api.weibo.com/2/users/show.json',
          data:{
            access_token:'xxx',  //采用OAuth授权方式为必填参数，OAuth授权后获得
            uid:'',               //用户id
          }
        }).then(res=>{
          console.log(res.data)
          // {
          //   "id": 1404376560,      用户UID
          //     "screen_name": "zaku",  用户昵称
          //     "name": "zaku",  	友好显示名称
          //     "province": "11",  	用户所在省级ID
          //     "city": "5",  用户所在城市ID
          //     "location": "北京 朝阳区",  	用户所在地
          //     "description": "人生五十年，乃如梦如幻；有生斯有死，壮士复何憾。", 	用户个人描述
          //     "url": "http://blog.sina.com.cn/zaku", 	用户博客地址
          //     "profile_image_url": "http://tp1.sinaimg.cn/1404376560/50/0/1",
          //     "domain": "zaku",
          //     "gender": "m",
          //     "followers_count": 1204,
          //     "friends_count": 447,
          //     "statuses_count": 2908,
          //     "favourites_count": 0,
          //     "created_at": "Fri Aug 28 00:00:00 +0800 2009",
          //     "following": false,
          //     "allow_all_act_msg": false,
          //     "geo_enabled": true,
          //     "verified": false,
          //   "status": {
          //   "created_at": "Tue May 24 18:04:53 +0800 2011",
          //       "id": 11142488790,
          //       "text": "我的相机到了。",
          //       "source": "<a href="http://weibo.com" rel="nofollow">新浪微博</a>",
          //       "favorited": false,
          //       "truncated": false,
          //       "in_reply_to_status_id": "",
          //       "in_reply_to_user_id": "",
          //       "in_reply_to_screen_name": "",
          //       "geo": null,
          //       "mid": "5610221544300749636",
          //       "annotations": [],
          //       "reposts_count": 5,
          //       "comments_count": 8
          // },
          //   "allow_all_comment": true,
          //     "avatar_large": "http://tp1.sinaimg.cn/1404376560/180/0/1",
          //     "verified_reason": "",
          //     "follow_me": false,
          //     "online_status": 0,
          //     "bi_followers_count": 215
          // }
          if(res.data){
            console.log("可以获取到")
            console.log(res.data)
          }else{
            this.$message.warning("未检测到信息")
          }
        }).catch(err=>{
          console.log(err)
        })
      }



    },
    beforeDestroy() {
        // clearInterval(this.reckonTime)
    }
};
</script>

<style>
@import "../assets/css/Login.css";
</style>