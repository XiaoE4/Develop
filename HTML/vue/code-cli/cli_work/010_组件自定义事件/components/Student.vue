<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <button @click="sendStudentName">把学生名给School组件</button>
  </div>
</template>

<script>
export default {
    name: 'WorkspaceJsonStudent',
    data() {
        return {
          name:'张三',
          sex:'男',
        };
    },
    mounted() {
      // console.log('student',this.x)
    },
    methods:{
      sendStudentName(){
        this.$bus.$emit('hello',this.name)
      }
    }

};
</script>


<style scoped>
.student{
  background-color: aquamarine;
  padding: 5px;
}

</style>

