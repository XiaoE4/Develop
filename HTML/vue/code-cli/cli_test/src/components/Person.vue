<template>
  <div>
    <br />
    <hr />
    <br />
    <h3>count组件的求和为{{ sum }}</h3>
    <input type="text" v-model="name" />
    <button @click="addName">点我添加名字</button>
    <button @click="addLi">点我添加姓李的名字</button>
    <button @click="addWord">点我添加一句话</button>
    <ul>
      <li v-for="p in persons" :key="p.id">{{ p.name }}</li>
    </ul>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import { mapState } from "vuex";
export default {
  name: "WorkspaceJsonPerson",
  data() {
    return {
      name: "",
    };
  },
  computed: {
    ...mapState("countObj", ["sum"]),
    ...mapState("personAbout", ["persons"]),
  },
  mounted() {},

  methods: {
    addName() {
      // console.log(this.name);
        const onePerson = { id: nanoid(), name: this.name };
        this.$store.commit("personAbout/ADD_PERSON", onePerson);
        this.name = "";
    },
    addLi() {
      const onePerson = { id: nanoid(), name: this.name };
      this.$store.dispatch("personAbout/addLi", onePerson);
      this.name = "";
    },
    addWord(){
        this.$store.dispatch('personAbout/addWord')
    }
  },
};
</script>

<style lang="scss" scoped>
</style>