<template>
    <div>
        <button @click="isShow= !isShow" >显示/隐藏</button>
        <transition-group 
        appear
        name="animate__animated animate__bounce"
        enter-active-class="animate__rubberBand"
        leave-active-class="animate__rotateOutUpLeft"
        >
            <h1 v-show="!isShow" key="1">你好啊！</h1>
            <h1 v-show="isShow" key="2">小饿！</h1>
        </transition-group>
        
    </div>
</template>

<script>
import 'animate.css'
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
    background-color: red;
    /* transition: 0.5s; */
}
</style>