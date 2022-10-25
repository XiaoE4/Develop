<template>
  <!-- 组件的结构 -->
  <div>
        <h1>学校名称：{{schoolName}}</h1>
        <h1>学校地址：{{address}}</h1>
        <button @click="showName">点我提示学校名</button>
    </div>
  
</template>

<script>
// 组件交互相关的代码（数据、方法等等）

// const school=Vue.extend({
    export default{
        name:'School',
        data() {
            return {
                schoolName: '第一高中',
                address: '地球村'
            }
        },
        methods: {
            showName() {
                alert(this.schoolName)
            }
        },
    }
    // })
    // export default school

</script>
    

<style>
/* 组件的样式 */
.demo{
    background-color:orange;
}


</style>