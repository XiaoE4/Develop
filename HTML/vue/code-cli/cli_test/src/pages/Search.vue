<template>
  <div>
    <div class="search">
      <input type="search" placeholder="搜索微博">
      <button type="button">搜索</button>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Search',

  data() {
    return {
      
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style>
    .search{
      width: 460px;
      height: 50px;
      display: block;
      margin: 0 auto 0 auto;
    }
    .search input{
      height: 50px;
      width: 400px;
    }
    .search button{
      height: 50px;
      width: 60px;
    }

</style>