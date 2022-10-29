<template>
    <div class="category">
        <h3>{{title}}分类</h3>
        <slot></slot>
    </div>
    <!-- <ul>
            <li v-for="(item,index) in listData" :key="index" >{{item}}</li>
        </ul>
        <img v-show="title ==='美食'" src="https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202210262033_ef39fca0e37395d07682124770fd3ad9.png?thumb=1&w=200&h=200&f=webp&q=90" alt=""> -->
</template>

<script>
export default {
    name: 'WorkspaceJsonCategory',

    data() {
        return {
           
        };
    },
    props:['title'],
    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>
.category{
    background-color: aquamarine;
    width: 200px;
    height: 300px;
}

h3{
    text-align: center;
    background-color: orange;
}

</style>