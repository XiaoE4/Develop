<!-- Banner是未登录时的主页 -->
<template>
  <div>
    <!-- 上方的搜索框 -->
    <div id="search">
      <Search/>
    </div>
    <!-- 下方的内容框和尾页 -->
    <div id="content">
      <!-- 左侧的榜单 -->
      <div id="left">
          <Bangdan/>
      </div>
      <!-- 中间的内容 -->
      <div id="bottom">
        <NewsFenye/>
        <News/>
      </div>
      <!-- 右侧的热搜和尾页 -->
      <div id="right">
        <Resou/>
      </div>
    </div>
  </div>

</template>

<script>
import Search from "@/pages/Search.vue";
import Bangdan from "@/pages/bangdan.vue";
import NewsFenye from "@/pages/News_fenye.vue";
import News from "@/pages/News.vue";
import Resou from "@/pages/Resou.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Banner',
  components: {Resou, News, NewsFenye, Bangdan, Search},

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style>
  #search{
    width: 100%;
    height: 300px;
    background-color: #02a774;
  }
  #content{
    width: 100%;
    background-color: black;
  }
</style>