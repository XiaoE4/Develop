<template>
  <div class="demo">
    <h2>学生姓名：{{name}}</h2>
    <h2 class="qwe">学生性别：{{sex}}</h2>
  </div>
</template>

<script>
export default {
    name: 'WorkspaceJsonStudent',
    data() {
        return {
          name:'张三',
          sex:'男'
        };
    },
};
</script>


<style lang="less" scoped>
.demo{
  background-color: aquamarine;
  .qwe{
    font-size: 40px;
  }
}

</style>

