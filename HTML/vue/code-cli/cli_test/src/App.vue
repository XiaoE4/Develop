<template>
    <div>
        <Count/>
    </div>
</template>

<script>
import Count from './components/Count'
export default {
  name: 'WorkspaceJsonApp',
  data() {
    return {
     
    };
    
  },
  components:{Count},
  mounted() {
    console.log('App',this)
  },
  


};
</script>

<style>

</style>