<template>
  <div>
    <h2>我是About的内容</h2>
  </div>
</template>

<script>
export default {
  name: "WorkspaceJsonAbout",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
  beforeDestroy() {
    console.log("About组件即将被销毁");
  },

  // 通过路由规则，进入该组件时被调用
  beforeRouteEnter(to, from, next) {
    console.log('About---beforeRouteEnter',to,from);
    if (to.meta.isAuth) {
      if (localStorage.getItem("name") === "xiaoE") {
        next();
      } else {
        alert("id不对，无权查看");
      }
    } else {
      next();
    }
  },

  // 通过路由规则，离开该组件时被调用
  beforeRouteLeave(to, from, next) {
    console.log('About---beforeRouteLeave',to,from,next);
    
    next()
  },
};
</script>

