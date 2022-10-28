<template>
  <div class="school">
    <h2>学校名称：{{name | mySlice}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="sendSchoolName">把学校名给App</button>
  </div>
</template>

<script>
export default {
    name: 'WorkspaceJsonSchool',
    props:['getSchoolName'],
    data() {
        return {
          name:'第一高中',
          address:'翻斗花园'
        };
    },
    methods:{
      sendSchoolName(){
        this.getSchoolName(this.name)
      }
    }
};
</script>

<style scoped>

.school{
  background-color: antiquewhite;
  padding: 5px;
  margin-top:30px
}

</style>