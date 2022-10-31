<template>
  <div>
    <h1>当前求和为：{{ $store.state.sum }}</h1>
    <h3>当前求和放大10倍后为：{{ $store.getters.bigSum }}</h3>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
export default {
  name: "WorkspaceJsonCount",

  data() {
    return {
      n: 1, // 用户选择的数据
    };
  },
  methods: {
    increment() {
      // this.sum += this.n;
      // 按照流程来写，先dispatch到actions再commit到mutations
      // this.$store.dispatch('jia',this.n)
      // 由于actions只是传递下数据，没有使用算法，所以直接略过dispatch直接用commit使用mutations
      this.$store.commit("JIA", this.n);
    },
    decrement() {
      // this.$store.dispatch('jian',this.n)
      this.$store.commit("JIAN", this.n);
    },
    incrementOdd() {
      this.$store.dispatch("jiaOdd", this.n);
    },
    incrementWait() {
      this.$store.dispatch("jiaWait", this.n);
    },
  },
  mounted() {
    console.log("Count", this);
  },
};
</script>

<style scoped>
button {
  margin-left: 10px;
}
</style>