<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
        </li>
        <li>
          <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
        </li>
      </ul>
        <!-- include里面的名字是组件名 -->
      <!-- <keep-alive include="WorkspaceJsonNews"> -->
        <keep-alive :include="['WorkspaceJsonNews','WorkspaceJsonMessage']">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkspaceJsonHome",

  data() {
    return {};
  },

  //   mounted() {
  //     console.log('Home组件挂载了',this)

  //   },
  //   beforeDestroy() {
  //     console.log("Home组件即将被销毁");
  //   },
};
</script>

