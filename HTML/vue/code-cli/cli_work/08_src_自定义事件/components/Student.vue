<template>
  <div class="student">
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <h2>当前求和为：{{number}}</h2>
    <button @click="add">number++</button>
    <button @click="sendStudentlName">把学生名给App</button>
    <button @click="unbind">解绑auguigu事件</button>
    <button @click="death">销毁当前Student组件的实例(vc)</button>
  </div>
</template>

<script>
export default {
    name: 'WorkspaceJsonStudent',
    data() {
        return {
          name:'张三',
          sex:'男',
          number:0
        };
    },
    methods: {
      sendStudentlName(){
        // 触发student组件实例身上的atguigu事件
        this.$emit('atguigu',this.name,666,888,900)
        this.$emit('demo',this.name,666,888,900)
      },
      unbind(){
        // this.$off('atguigu')  //解绑一个自定义事件
        this.$off(['atguigu','demo'])  //解绑多个自定义事件
        // this.$off()   //解绑所有自定义事件
      },
      death(){
        this.$destroy()   //销毁了当前student组件的实例，销毁后所有Student实例的自定义事件全都不奏效了
      },
      add(){
        console.log('add was used');
        this.number++
      }
    },
};
</script>


<style scoped>
.student{
  background-color: aquamarine;
  padding: 5px;
}

</style>

