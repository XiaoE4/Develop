<template>
  <div>
    <ul>
      <li v-for="m in this.massageList" :key="m.id">
        <router-link
          :to="{
            name: 'neirong',
            query: {
              id: m.id,
              title: m.title,
            },
          }"
          >{{ m.title }}</router-link
        >
        <button @click="pushShow(m)">push查看</button>
        <button @click="replaceShow(m)">replace查看</button>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "WorkspaceJsonMessage",

  data() {
    return {
      massageList: [
        { id: "001", title: "标题001" },
        { id: "002", title: "标题002" },
        { id: "003", title: "标题003" },
      ],
    };
  },

  mounted() {},

  methods: {
    pushShow(m){
      this.$router.push({
        name:'neirong',
        query:{
          id:m.id,
          title:m.title
        }
      })
    },
    replaceShow(m){
      this.$router.replace({
        name:'neirong',
        query:{
          id:m.id,
          title:m.title
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>