<template>
  <div>
    <ul>
      <li :style="{opacity}">知天易</li>
      <li>news001 <input type="text" /></li>
      <li>news002 <input type="text" /></li>
      <li>news003 <input type="text" /></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "WorkspaceJsonNews",

  data() {
    return {
      opacity:1
    };
  },
  activated(){
    console.log('组件被激活');
    this.timer = setInterval(()=>{
      console.log('1111');
      this.opacity-=0.01
      if(this.opacity<=0) this.opacity=1
    },20)
  },
  deactivated(){
    console.log('组件失活');
    clearInterval(this.timer)
  }
};
</script>

<style lang="scss" scoped>
</style>