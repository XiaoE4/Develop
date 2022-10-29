<template>
    <div>
        <button @click="isShow= !isShow" >显示/隐藏</button>
        <transition name="hello" :appear="true">
            <h1 v-show="isShow">你好！</h1>
        </transition>
        
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
}
/* Vue不和@keyframes动画进行对话，只和那两个样式进行对话 */
.hello-enter-active{
    animation: test2d 1s;
}
.hello-leave-active{
    animation: test2d 1s reverse;
}
@keyframes test2d {
    from{transform: translateX(-100%);}
    to{transform: translateX(0);}
}
</style>