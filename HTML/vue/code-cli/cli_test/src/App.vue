<template>
    <div class="container">
      <Category title="美食">
        <ul slot="center">
            <li v-for="(a,index) in foods" :key="index">{{a}}</li>
        </ul>
        <img slot="footer" name="footer" src="https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202210262033_ef39fca0e37395d07682124770fd3ad9.png?thumb=1&w=200&h=200&f=webp&q=90" alt="">
      </Category>
      <Category title="游戏" :listData="films" >
        <ul>
            <li v-for="(a,index) in games" :key="index">{{a}}</li>
        </ul>
      </Category>
      <Category title="电影" :listData="foods" >
        <ul>
            <li v-for="(a,index) in films" :key="index">{{a}}</li>
        </ul>
      </Category>
    </div>
</template>

<script>
import Category from './components/Category.vue'
export default {
  name: 'WorkspaceJsonApp',
  data() {
    return {
      foods: ['火锅', '烧烤', '小龙虾'], 
      games: ['红色警戒', '穿越火线', '劲舞团'],
      films: ['《教父》', '《拆弹专家》', '《你好，李焕英》']
    };
  },
  components:{Category}
  


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