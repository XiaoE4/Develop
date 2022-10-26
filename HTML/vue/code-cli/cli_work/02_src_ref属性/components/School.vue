<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
export default {
    name: 'WorkspaceJsonSchool',
    data() {
        return {
          name:'第一幼儿园',
          address:'翻斗花园'
        };
    },
};
</script>

<style>
  .school{
    background-color: aliceblue;
  }

</style>

