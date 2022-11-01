<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- 跳转路由并携带query参数，to的字符串写法 -->
        <!-- query -->
        <!-- <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link> -->
        <!-- params -->
        <!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link> -->
        <!-- 跳转路由并携带query参数，to的字符串写法 -->
        <router-link
          :to="{
            // 直接写名字，略去path
            name:'xiangqing',
            query: {
              id: m.id,
              title: m.title,
            },}">
          {{ m.title }}
        </router-link>
        <!-- 跳转路由并携带params参数，to的字符串写法 -->
        <!-- <router-link
          :to="{
            // 直接写名字，略去path
            // 必须使用name不能使用path，否则会报错
            name:'xiangqing',
            params: {
              id: m.id,
              title: m.title,
            },}">
          {{ m.title }}
        </router-link> -->
        &nbsp;&nbsp;
      </li>
    </ul>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "WorkspaceJsonMessage",

  data() {
    return {
      messageList: [
        { id: "001", title: "消息001" },
        { id: "002", title: "消息002" },
        { id: "003", title: "消息003" },
      ],
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>