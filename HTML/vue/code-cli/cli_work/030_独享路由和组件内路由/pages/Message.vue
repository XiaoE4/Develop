<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <router-link
          :to="{
            // 直接写名字，略去path
            path:'/home/message/detail',
            query: {
              id: m.id,
              title: m.title,
            },
          }"
        >
          {{ m.title }}
        </router-link>
        <button @click="pushShow(m)">push查看</button>
        <button @click="replaceShow(m)">replace查看</button>
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

  beforeDestroy(){
    console.log('Message组件即将被销毁了');
  },
  methods: {
    pushShow(m) {
      this.$router.push({
        name: "xiangqing",
        query: {
          id: m.id,
          title: m.title,
        }
      });
      // console.log(this.$router);
    },
    replaceShow(m){
        this.$router.replace({
        name: "xiangqing",
        query: {
          id: m.id,
          title: m.title,
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>