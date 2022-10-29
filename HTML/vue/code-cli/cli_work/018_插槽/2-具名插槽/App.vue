<template>
    <div class="container">
        <Category title="美食">
          <img slot="center" src="https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202210262033_ef39fca0e37395d07682124770fd3ad9.png?thumb=1&w=200&h=200&f=webp&q=90" alt="">
          <a slot="footer" href="#">嘿嘿嘿</a>
        </Category>
        <Category title="游戏">
          <ul slot="center">
            <li v-for="(g,index) in games" :key="index" >{{g}}</li>
          </ul>
          <!-- slot="footer"   ===   v-slot:footer -->
          <template slot="footer">
            <div class="foot" >
            <a  href="#">嘿嘿嘿</a>
            <a  href="#">嘿嘿嘿</a>
            </div>
            <h4>你好！</h4>
          </template>
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
      games: ['红色警戒', '穿越火线', '劲舞团','穿越火线'],
      films: ['《教父》', '《拆弹专家》', '《你好，李焕英》']
    };
  },
  


};
</script>

<style>
.container, .foot ,h4{
  display: flex;
  justify-content: space-around;
}
</style>