<template>
    <div class="listContainer">
        <!--清单导航栏-->
        <div class="listAppMenu">
            <ul>
                <li :class="{active:listNum===1}" @click="toList()">清单</li>
                <li :class="{active:listNum===2}" @click="toCalendar()">日历</li>
                <li :class="{active:listNum===3}" @click="toTest()">test1</li>
            </ul>
        </div>
        <!--清单导航之后的页面显示-->
        <div class="listAppShow">
            <router-view>

            </router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>

import {ref} from 'vue'
import {useRouter} from 'vue-router'

// 代表当前展示的是第 listNum 个界面
let listNum = ref(1)
// this.$router
const router = useRouter()

// 跳转到清单界面
let toList = () => {
    console.log("routerView-1")
    listNum.value = 1
    router.push('/list')
}

// 跳转到日历界面
let toCalendar = () => {
    listNum.value = 2
    console.log("routerView-2")
    router.push('/calendar')
}

let toTest = ()=>{
    listNum.value = 3
    console.log("routerView-3")
    router.push('/test1')
}


</script>

<style>
* {
    padding: 0;
    margin: 0;
}

.listContainer {
    display: flex;
    width: 100vw;
}
.listAppMenu {
    float: left;
    width: 200px;
    background-color: #747bff;
}

.listAppMenu ul {
    margin-top: 100px;
    width: 200px;
}

.listAppMenu li {
    text-align: center;
    margin-top: 50px;
    width: 200px;
    line-height: 60px;
    user-select: none;
    transition: color .5s,background-color .5s;
}
.listAppMenu li:hover{
    color: yellow;
    background-color: #d43c33;
}

li {
    list-style: none;
}

.active {
    color: yellow;
    background-color: #d43c33;
}

.listAppShow {

}
</style>