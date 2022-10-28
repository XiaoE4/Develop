<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>

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
    mounted() {
      // console.log('school',this.x)
      this.$bus.$on('hello',(data)=>{
        console.log('school收到了数据',data);
      })
    },
};
</script>

<style scoped>

.school{
  background-color: antiquewhite;
  padding: 5px;
  margin-top:30px
}

</style>