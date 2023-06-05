<template>
  <div>
    <div class="fenye_top">
      <a v-for="f in fenye" :key="f.id">
        {{ f.name }}
      </a>
    </div>

  </div>
</template>

<script>
export default {
  name: 'NewsFenye',

  data() {
    return {
        fenye:[
          {id:'01',name:'全部'},
          {id:'02',name:'原创'},
          {id:'03',name:'视频'},
          {id:'04',name:'图片'},
      ]
    };
  },

  mounted() {
    
  },

  methods: {
    
  },
};
</script>

<style>
    .fenye_top{
      height: 300px;
      display: block;
    }
    .fenye_top a{
      height: 30px;
      width: 70px;
      font-size: 18px;
      /* float: left; */
      display: inline-block;
    }
</style>