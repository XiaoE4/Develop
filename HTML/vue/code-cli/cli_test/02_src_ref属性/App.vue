<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button @click="showDOM" ref="btn">点我输出h1的DOM元素</button>
    <School ref="sch"/>
  </div>
</template>

<script>
  import School from './components/School.vue'
export default {
  name: 'WorkspaceJsonHelloWorld',

  data() {
    return {
      msg:'欢迎使用Vue！'
    };
  },
  components:{School},
  methods: {
    showDOM(){
      console.log(this.$ref.title);
      console.log(this.$ref.btn);
      console.log(this.$ref.sch);
      
    }
  },
};
</script>
