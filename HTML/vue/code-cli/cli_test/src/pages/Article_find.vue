<template>
    <div class="work_find">
        <div v-for="m in array" :key="m.Cno" class="lside_content" :data-index="m.Cno">
            <div class="content_Apic"  @mouseover="mouseover(m.Cno)" @mouseout="mouseout(m.Cno)" :data-index="m.Cno">
                <img :src="require('../assets/pic/' + m.Apic + '.jpg')" alt=""  @click="showArticle(m.account,m.username,m.Apic)">
                <div class="content_user show1" style="position: relative;left: -100px;top: -70px;background-color: black;color: white;width: 100px;height: 150px;padding: 10px 20px ;" :data-index="m.Cno">
                  <div @click="showUser(m.account,m.username,m.sex,m.birthday,m.Apic)">
                    <img :src="require('../assets/pic/' + m.Apic + '.jpg')" alt="">
                    <p style="text-align: center;user-select: none">{{m.username}}</p>
                  </div>
                  <p style="user-select: none" @click="showFans(m.account,m.username,m.Apic)">粉丝：{{m.fensi}}</p>
                </div>
            </div>
            <div class="content_show" >
                <div class="content_Cpic" v-if="m.Cpic" @click="toArticle(m)">
                    <img :src="require('../assets/pic-content/' + m.Cpic[0] + '.jpg')" alt="">
                </div>
                <div class="content_name" @click="toArticle(m)">
                    <h1>
                        {{m.title}}
                    </h1>
                </div>
                <div class="content_content" v-if="m.content" @click="toArticle(m)">
                    <!--                                                        ↓:class="{p2:m.Cpic}"-->
                    <p v-html="m.content" class="content-p1" >
                        {{m.content}}
                    </p>
                </div>
                <div class=""  v-if="m.video">
                    <video :src="require('../assets/video/'+m.video +'.mp4')" controls="true">
                    </video>
                </div>
                <div class="content_add" >
                    <a>
                        <i class="el-icon-circle-check"  style="width: 20px;height: 20px;font-size: 20px" @click.once="zan_on(m.id)" :data-index="m.id">{{m.zan}}</i>
                    </a>
                    <a>
                        <i class="el-icon-star-off" style="width: 20px;height: 20px;font-size: 20px" @click.once="cang_on(m.id)" :data-index="m.id">{{m.cang}}</i>
                    </a>
                    <p style="margin-left: 400px;color: #999999;user-select: none">
                        {{m.date}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Article_find',
    // props:['userPic'],
    data() {
        return {
            a:document.getElementsByClassName('el-icon-circle-check'),
            b:document.getElementsByClassName('el-icon-star-off'),
            array:'',

            article:'',
            isFind:this.$route.query.isFind || 1,
            search:this.$route.query.search

        };
    },

    mounted() {
        // console.log(this.neirong)
        // console.log(this.neirong[1])
    //  权重计算：
    //     console.log("zan:",this.neirong[0].zan)
      if(this.isFind===1){
        this.tuijian()
      }else{
        this.showSearch()
        console.log(this.isFind)
        console.log(this.search)

      }
        console.log("array:",this.array)
        console.log("article:",this.article)
    },

    computed:{
        userImg(){
            return this.$store.state.user.pic
        },
        neirong:{
            // 数据getter
            get(){
                return  this.$store.state.allArticle
            },
            // 数据setter
            set(val){
                this.article=val
            }
        },
    },

    methods: {
        mouseover(m){
          let show =document.getElementsByClassName('content_user')
          m=m.toString()
          for(let i=0;i<show.length;i++){
            if(show[i].dataset.index===m){
              show[i].className='content_user show2'
            }

          }
        },
        // 鼠标失焦
        mouseout(m){
          let show =document.getElementsByClassName('content_user')
          m=m.toString()
          for(let i=0;i<show.length;i++){
            if(show[i].dataset.index===m){
              show[i].className='content_user show1'
            }
          }
        },
        tuijian(){
            let data=[]
            for(let i =0 ; i<this.neirong.length ; i++){
                let a = this.neirong[i].zan * 1
                let b = this.neirong[i].cang * 10
                let c = this.neirong[i].toutiao * 100
                let d=a+b+c
                console.log(d)
                // JSON数组data
                data[i]= {
                    "Cno":this.neirong[i].Cno,
                    "sum":d
                }
            }
            console.log("JSON:",data)
            // 权重比较
            let data1=[]
            for(let o in data){
                data1.push(data[o])
            }
            // 权重比较-排序
            data1.sort(function(a,b){
                return b.sum-a.sum
            })
            // 得到权重比较下的文章id
            console.log(data1)
            // 得到的和数据中的Cno匹配
            const self =this
            function  ArrayJson(arr,obj={}){
                    arr.forEach(item=>{
                        obj[item.Cno-1]=item
                    })
                return obj
            }
            // let self.neirong = neirong1
            self.article =ArrayJson(self.neirong)
            let i =0
            self.array=[]
            while(i< data1.length){
                if(self.article[data1[i].Cno-1]){
                    self.array.push(self.article[data1[i].Cno-1])
                    // console.log(array[i].Cno)
                }
                i++;
            }
            console.log(self.array)
        },
        // 跳转用户文章
        showArticle(a,n,p){
            this.$router.push({
                path:'/Home/Article',
                query:{
                    account:a,
                    username:n,
                    Apic:p,
                }
            })
        },
        //  跳转用户粉丝          传递用户的账户,用于router
        showFans(a,n,p){
            console.log("粉丝数：",a)
          this.$router.push({
            path:'/Home/Fans',
            query:{
              account:a,
              username:n,
              Apic:p,
            }
          })
        },
        //  跳转用户详情
        showUser(a,n,s,b,p){
          console.log("用户账户：",a)
          this.$router.push({
            path:'/Home/User',
            query:{
              account:a,
              username:n,
              sex:s,
              birthday:b,
              Apic:p,
            }
          })
        },
        // 跳转文章详情
        toArticle(m){
            this.$router.push({
                path:'/Show',
                query:{
                    account:m.account,
                    Apic:m.Apic,
                    Cpic:m.Cpic,
                    title:m.title,
                    content:m.content,
                    video:m.video,
                    date:m.date,
                }
            })
        },
        zan_on(n) {
            // 未点击
            // n=m.id
            console.log(this.neirong.length)
            if (!this.neirong[n - 1].zan_on) {
                this.neirong[n - 1].zan = this.neirong[n - 1].zan + 1
                console.log(this.a)
                console.log(this.a[0].index)
                if (this.a.index === n) {
                    this.a[n - 1].className = 'el-icon-success'
                }
            } else // 已点击
            {
                if (this.a.index === n) {
                    this.a[n - 1].className = 'el-icon-success'
                }
            }
        },
        cang_on(n) {
            // 获取所有点赞收藏按钮
            let a=document.getElementsByTagName('a')
            console.log(a)
            if (!this.neirong[n - 1].cang_on) {
                this.neirong[n - 1].cang = this.neirong[n - 1].cang + 1
                console.log(this.b)
                console.log(this.b[0].index)
                if (this.b.index === n) {
                    this.a[n - 1].className = 'el-icon-star-on'
                }
            } else // 已点击
            {
                if (this.a.index === n) {
                    this.a[n - 1].className = 'el-icon-star-on'
                }
            }
        },
        showSearch(){
          if(!this.search){
            this.$message.warning("输入为空！")
            return false
          }
          this.$axios({
            method:'post',
            url:'http://127.0.0.1:10520/api/user/Article',
            data:{
              token:'search',
              message:this.search
            }
          }).then(res=>{
            console.log(res.data)
            for(let i =0;i<res.data.length;i++) {
              res.data[i].date=new Date(res.data[i].date).toLocaleDateString().replace(/\//g,"-")
              if (res.data[i].Cpic) {
                console.log(typeof (res.data[i].Cpic))
                res.data[i].Cpic = res.data[i].Cpic.split(',') || res.data[i].Cpic
              }
            }
            this.array = res.data
            console.log(this.array)
            // console.log(this.array[1].Cpic[0])
          }).catch(err=>{
            this.$message.error(err)
          })
        }

    }
};
</script>

<style>


.work_find{
    width: 700px;
    margin: 20px auto 0 auto;
}
.work_write{
    width: 500px;
    padding: 0 ;
    border: 1px solid rgba(31,31,31,.3);
    /*background-color: pink;*/
}
.work_write input{
    border: solid rgba(31,31,31,.3);
    border-width: 0 0 1px 0;
    width: 498px;
    outline: none;
    font-size: 20px;
}

.lside_content{
    padding: 10px 10px 10px 0;
    width: 700px;
    max-height: 600px;
    min-height: 64px;
    background-color: white;
    margin-top: 20px;
    display: block;
    float: left;
}
.lside_content.bgd{
    background-image: linear-gradient(rgba(255,0,0,.65),rgba(255,255,0,.1));
}
.content_show{
    width: 600px;
    float: right;
}
.content_Apic{
    box-shadow: 0 0 5px 1px #444444;
    width: 60px;
    height: 60px;
    float: left;
}
.content_Apic img{
    width: 60px;
    height: 60px;
}
.content_Cpic{
    width: 600px;
    height: 300px;
    display: block;
}
.content_Cpic img{
    width: 600px;
    height: 300px;
}

video{
    background-color: black;
    width: 600px;
    height: 300px;
}
.content_name{
    font-size: 18px;
    color: #444;
}
.content_content{
    width: 600px;
}
.content_content .content-p1{
    width: 600px;
    font-size: 16px;
    display: -webkit-box!important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    overflow: hidden;
}
.content_content .content-p1.p2{
    -webkit-line-clamp: 15;
}

.content_add{
    margin-top: 20px;
    display: block;
    height: 20px;
    /*position: absolute;*/
}
.content_add a{
    text-decoration: none;
    color: gray;
    display: block;
    float: left;
    min-width: 100px;
}
.content_add a i{
    text-decoration: none;
    user-select: none;
    display: inline-block;
    float: left;
}
.el-upload--picture-card input.el-upload__input{
    display: none;
}
.el-dialog__body .hide .el-upload--picture-card{
    display: none;
}

</style>