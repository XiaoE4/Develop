<template>
    <div class="container">
        <Category title="美食">
          <img src="https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202210262033_ef39fca0e37395d07682124770fd3ad9.png?thumb=1&w=200&h=200&f=webp&q=90" alt="">
        </Category>
        <Category title="游戏">
          <ul>
            <li v-for="(g,index) in games" :key="index" >{{g}}</li>
          </ul>
        </Category>
        <Category title="电影">
          <video src=""></video>
        </Category>
    </div>
</template>

<script>
import Category from './components/Category.vue'
export default {
  
  name: 'WorkspaceJsonApp',
  components:{Category},
  data() {
    return {
      foods: ['火锅', '烧烤', '小龙虾'], 
      games: ['红色警戒', '穿越火线', '劲舞团'],
      films: ['《教父》', '《拆弹专家》', '《你好，李焕英》']
    };
  },
  


};
</script>

<style>
.container{
  display: flex;
  justify-content: space-around;
}
img{
    display: block;
}
</style>