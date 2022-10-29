<template>
    <div>
        <button @click="isShow= !isShow" >显示/隐藏</button>
        <transition-group name="hello" :appear="true">
            <h1 v-show="isShow" key="1">你好啊！</h1>
            <h1 v-show="isShow" key="2">小饿！</h1>
        </transition-group>
        
    </div>
</template>

<script>
export default {
    name: 'WorkspaceJsonTest',

    data() {
        return {
            isShow:true 
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style  scoped>

h1{
    background-color: chocolate;
    /* transition: 0.5s; */
}
/* 进入的起点，离开的终点 */
.hello-enter,.hello-leave-to{
    transform: translateX(-100%); 
}
.hello-enter-active,.hello-leave-active{
    transition: 0.5s;
}
/* 进入的终点，离开的起点 */
.hello-enter-to,.hello-leave{
    transform: translateX(0);
}
</style>