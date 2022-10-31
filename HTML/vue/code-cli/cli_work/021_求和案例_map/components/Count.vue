<template>
  <div>
    <h1>当前求和为：{{ sum }}</h1>
    <h3>当前求和放大10倍后为：{{bigSum}}</h3>
    <h3>我在{{school}}，学习了{{subject}}</h3>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: "WorkspaceJsonCount",
  data() {
    return {
      n: 1, // 用户选择的数据
    };
  },
  computed:{
    // 手写
    /* sum(){
        return this.$store.state.sum
    },
    school(){
        return this.$store.state.school
    },
    subject(){
        return this.$store.state.subject
    }, */
    // 借助mapState生成计算属性，从state中读取数据 （对象写法）
    ...mapState({sum:'sum',school:'school',subject:'subject'}),

    // 借助mapState生成计算属性，从state中读取数据 （数组写法）
    ...mapState(['sum','school','subject']),

    // 0000000000000000000000000000000000000000000000000000000000000
    // bigSum(){
    //     return this.$store.getters.bigSum
    // },
    
    ...mapGetters(['bigSum'])


  },
  methods: {
   /*  increment() {
      this.$store.commit("JIA", this.n);
    },
    decrement() {
      this.$store.commit("JIAN", this.n);
    }, */
    
    // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations（对象写法）
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),

    // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations（数组写法）
    // ...mapMutations({'JIA','JIAN'}),         //increment和decrement在template中也要修改成对应的JIA和JIAN

    /* ************************************ */
    /* incrementOdd() {
      this.$store.dispatch("jiaOdd", this.n);
    },
    incrementWait() {
      this.$store.dispatch("jiaWait", this.n);
    }, */
    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系actions（对象写法）
    ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
    // 数组写法同mapMutations
    
  },
  mounted() {
    console.log("Count", this);
    const x=mapState({sum:'sum',school:'school',subject:'subject'})
    console.log(x);
  },
};
</script>

<style scoped>
button {
  margin-left: 10px;
}
</style>