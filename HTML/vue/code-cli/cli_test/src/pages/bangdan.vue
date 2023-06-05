<template>
    <div>
      <div class="first">
        <a v-for="m in bangdan" :key="m.id">
          {{ m.name }}
        </a>
      </div>
      <div class="second">

      </div>

    </div>

</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
    name: 'Bangdan',

    data() {
        return {
            bangdan:[
                {id:'01',name:'全部关注',url:'#'},
                // 逐个人的最新博客
                {id:'02',name:'最新博客',url:'#'},
                // 时间排序
                {id:'03',name:'特别关注',url:'#'},
                {id:'04',name:'好友圈',url:'#'},
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
    .first{
      display: block;
      float: bottom;
    }
    .first a{
        padding-top: 5px;
        padding-bottom: 5px;
        display: block;
    }
    .second{
      display: block;
      float: end;
    }
</style>