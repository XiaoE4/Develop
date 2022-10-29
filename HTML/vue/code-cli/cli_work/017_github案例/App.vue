<template>
    <div class="container">
        <Search/>
        <List/>
    </div>
</template>

<script>
import Search from './components/Search.vue'
import List from './components/List.vue'
export default {
  
  name: 'WorkspaceJsonApp',
  components:{Search,List},
  data() {
    return {
        
    };
  },
  


};
</script>

<style>


</style>