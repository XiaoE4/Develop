<!-- Banner是未登录时的主页 -->
<template>
  <div>
    <!-- 上方的导航栏，不会随路由跳转改变 -->
    <div id="top">
      <Top/>
    </div>
    <!-- 下方的内容框，随路由跳转改变 -->
      <router-view></router-view>
  </div>

</template>

<script>
import Top from "@/components/Top.vue";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
  name: 'Banner',
  components: {Top},
  data(){
      return{

      }
  },
  mounted() {
  },
};
</script>

<style>
body{
  margin: 0;
  padding: 0;
    background-color: #ededef;
  /*opacity: 1;*/
}
/* 上方主搜索框 */
  #top{
    /*width: 100%;*/
    height: 50px;
    background-color: #1F1F1F;

  }


</style>