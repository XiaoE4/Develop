<template>
  <ul>
    <!-- $route.query改为$route.params -->
    <!-- <li>消息编号：{{$route.params.id}}</li>
    <li>消息标题：{{$route.params.title}}</li> -->
    <li>消息编号：{{id}}</li>
    <li>消息标题：{{title}}</li>
  </ul>
</template>

<script>
export default {
  name: "WorkspaceJsonDetail",
    props:['id','title'],
  data() {
    return {};
  },
  computed:{
    // id(){
    //     return this.$route.params.id
    // },
    // title(){
    //     return this.$route.params.title
    // }

  },
  mounted() {
    // console.log(this.$route);
    /*
    log结果为
    params: {id: '666', title: '你好！'}
    path: "/home/message/detail/666/你好！" 
    query: {}
     */
  },
};
</script>

