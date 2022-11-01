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
};
</script>

