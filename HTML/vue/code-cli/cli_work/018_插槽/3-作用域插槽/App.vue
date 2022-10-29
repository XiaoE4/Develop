<template>
    <div class="container">
        <Category title="游戏">
          <template scope="data">
            <ul>
            <li v-for="(g,index) in data.games" :key="index" >{{g}}</li>
            </ul>
          </template>
        </Category>

        <Category title="游戏">
          <template scope={games}>
            <ol>
            <li v-for="(g,index) in games" :key="index" >{{g}}</li>
            </ol>
          </template>
        </Category>

        <Category title="游戏">
          <template scope="data">
            <h4 v-for="(g,index) in data.games" :key="index" >{{g}}</h4>
          </template>
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
      // games: ['红色警戒', '穿越火线', '劲舞团','穿越火线']
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