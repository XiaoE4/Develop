<template>
  <div>
      <div class="userPic">
          <el-avatar style="margin-left: 150px" :size="150"
                     :src="require('../assets/pic/' + user.pic + '.jpg')" ></el-avatar>
          <h2 style="text-align: center">{{user.username}}</h2>
      </div>
      <div class="show_article">
          <div class="show_card" v-for="m in article" :key="m.id" @click="show(m)">
              <div class="card_pic" v-if="m.Cpic">
                  <img :src="require('../assets/pic-content/' + m.Cpic[0] + '.jpg')" alt="" >
<!--                  :src="require('../assets/pic-content/' + m.Cpic + '.jpg')"  -->
              </div>
              <div class="card_video" v-if="m.video">
                  <video :src="require('../assets/video/' + m.video + '.mp4')" ></video>
              </div>
              <div class="card_title" >
<!--                  文章或视频标题-->
                  <h1 v-if="m.title">
                     {{m.title}}
                  </h1>

              </div>
              <div class="card_content" v-if="m.content" >
                  <p v-html="m.content" class="content-p" :class="{p2:!m.Cpic}">
                     {{m.content}}
                  </p>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
// import Show from "@/pages/Article_show1.vue"
export default {
    name: "Article_show",
    data(){
        return{
            user:{
                pic:this.$route.query.Apic,
                account:this.$route.query.account,
                username:this.$route.query.username,
            },
            article:[]
        };
    },
    // components:{Show},
    mounted() {
        this.getArticle()
        // this.card = this.article.content.replaceAll('')
    },
    methods:{
        // eslint-disable-next-line no-unused-vars
        show(m){
            this.$router.push({
                path:'/Show',
                // query传递点击的卡片文章的题目和内容
                query:{
                    account:m.account,
                    Apic:m.Apic,
                    Cpic:m.Cpic,
                    title:m.title,
                    content:m.content,
                    video:m.video,
                    date:m.date,
                    username:m.username,

                },
            })
        },
        getArticle(){
            let self = this
            let acc = this.$route.query.account
            self.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/getArticle',
                data:{
                    account:acc,
                }
            }).then(res=>{
                console.log("用户文章为：",res.data)
                for(let i =0;i<res.data.length;i++){
                    res.data[i].date=new Date(res.data[i].date).toLocaleDateString().replace(/\//g,"-")
                    if(res.data[i].Cpic){
                        console.log(typeof (res.data[i].Cpic))
                        res.data[i].Cpic = res.data[i].Cpic.split(',') || res.data[i].Cpic
                    }
                    // console.log(typeof(res.data[i].Cpic))        // object
                }
                self.article=res.data
            }).catch(err=>{
                console.log(err)
            })
        }



    }
}
</script>

<style>
  .userPic{
      width: 450px;
      margin-left: auto;
      margin-right: auto;
  }
  .show_article{
      width: 1600px;
      /*height: 300px;*/
      margin: 30px auto 0 auto;
      /*background-color: #2e6da4;*/
      /*position: relative;*/
  }
  /*小卡片*/
  .show_card{
      position: relative;
      width: 350px;
      height: 500px;
      margin: 0 50px 50px 0;
      display: block;
      float: left;
      border-radius: 25px;
      border: 1px solid gray;
      transition: top .5s , box-shadow .5s;
      background-color: #f3f3f3;
  }
  .show_card:hover{
      top: -10px;
      box-shadow: 3px 3px 5px rgba(31,31,31,.3);
  }
  /*卡片的图片*/
  .card_pic{
      width: 350px;
      height: 250px;
  }
  .card_pic img{
      width: 350px;
      height: 250px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
  }
  .card_video{
      width: 350px;
      height: 250px;
  }
  .card_video video{
      width: 350px;
      height: 250px;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      object-fit: fill;
  }
  /*  卡片的标题*/
  .card_title{
      width: 350px;
      height: 50px;
      margin: 30px 0 0 0;
  }
  .card_title h1{
      width: 350px;
      height: 50px;
      margin: 0;
      font-size: 20px;
      color: black;
      text-align: center;
  }
  .card_title .h1-show{
      color: red;
  }
  /*  卡片的内容*/
  .card_content{
      width: 350px;
      height: 120px;
      padding: 0 15px 0 15px;
      /*display: -webkit-box!important;*/
      /*-webkit-box-orient: vertical;*/
      /*-webkit-line-clamp: 6;*/
      /*overflow: hidden;*/
  }
  .card_content .content-p{
      display: -webkit-box!important;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
      overflow: hidden;
      font-size: 16px;
  }
.content-p.p2{
    -webkit-line-clamp: 12;
}

</style>