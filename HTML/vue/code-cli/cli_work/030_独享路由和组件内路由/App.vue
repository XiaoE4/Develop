<template>
  <div>
    <div class="row">
      <Banner/>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- 原始html中我们使用a标签实现页面的跳转 -->
          <!-- <a class="list-group-item active" href="./about.html">About</a>
          <a class="list-group-item" href="./home.html">Home</a> -->
          
          <!-- replace属性： -->
          <router-link :replace="true" class="list-group-item" active-class="active" :to="{name:'guanyu'}">About</router-link>
                    <!-- ↓简写↓ -->
          <router-link replace class="list-group-item" active-class="active" to="/home">Home</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!-- 指定组件的呈现位置 -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from './components/Banner.vue'
// import About from './pages/About.vue'
export default {
  name: "WorkspaceJsonApp",

  data() {
    return {};
  },
  components:{Banner}
};
</script>

<style  scoped>
</style>