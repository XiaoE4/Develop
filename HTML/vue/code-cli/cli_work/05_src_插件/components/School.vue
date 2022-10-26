<template>
  <div>
    <h2>学校名称：{{name | mySlice}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
// 引入一个混合
// import {mixin} from '../mixin'
export default {
    name: 'WorkspaceJsonSchool',
    data() {
        return {
          name:'第一个高中abcde',
          address:'翻斗花园'
        };
    },
    // mixins:[mixin]
};
</script>

