<template>
  <div class="app">
    <h1>{{msg}}</h1> 
    <School/>
    <Student/>
  </div>
</template>

<script>
  import Student from './components/Student.vue'
  import School from './components/School.vue'

export default {
    name: 'WorkspaceJsonApp',
    components:{Student,School},
    data() {
      return {
        msg:'你好',
      };
    },
};
</script>

<style>
.app{
  background-color: gray;
}

</style>

