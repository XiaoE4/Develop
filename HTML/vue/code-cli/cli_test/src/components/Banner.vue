<template>
  <div>
    <div id="search">
      <Search/>
    </div>

    <div id="content">
      <div id="left">
          <Bangdan/>
      </div>
      <div id="bottom">
        <NewsFenye/>
        <News/>
      </div>
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