<template>
  <div class="app">
    <h1>{{msg}}</h1>

    <!-- <Student v-on:atguigu=""/> -->
    <Student />

    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName" />
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
      msg:'你好'
    };
  },

  methods: {
    getSchoolName(name){
      console.log("App收到了学校名",name);
    }
  },
};
</script>

<style>
.app{
  background-color: gray;
}

</style>

