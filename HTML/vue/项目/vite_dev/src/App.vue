<script setup>
// import router from "./router/index.js";
import { useRouter } from 'vue-router'
const router = useRouter()


const toList = ()=>{
    router.push('/list')
}
const toRili = () =>{
    router.push('/calendar')
}

</script>

<template>
    <div>
        <button @click="toList()">toLIST</button>
        <button @click="toRili()">toRILI</button>
        <div class="view">
            <router-view>

            </router-view>
        </div>

    </div>



</template>

<style scoped>
    .view{
        width: 500px;
        height: 500px;
    }

</style>
