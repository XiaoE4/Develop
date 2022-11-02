<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h3>当前求和放大10倍为{{ bigSum }}</h3>
    <h4>我用的是{{ tool }}，学习的是{{ object }}</h4>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
    <h3>{{firstName}}</h3>
  </div>
</template>

<script>
import { mapState ,mapGetters, mapActions,mapMutations} from "vuex";
export default {
  name: "WorkspaceJsonCount",

  data() {
    return {
      n: 1,
    };
  },

  mounted() {},
  computed: {
    ...mapState('countObj',['tool', 'object', 'sum']),

    ...mapGetters('countObj',['bigSum']),

    ...mapGetters('personAbout',['firstName'])
  },
  methods: {

    ...mapActions('countObj',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'}),

    ...mapMutations('countObj',{increment:'JIA',decrement:'JIAN'})
  },
};
</script>

<style lang="css">
button {
  margin-left: 5px;
}
</style>
