<template>
    <div class="category">
        <h3>{{title}}</h3>
       <slot name="center"></slot>
       <slot name="footer"></slot>
    </div>
    
</template>

<script>
export default {
    // <img v-show="title ==='美食'" src="https://cdn.cnbj1.fds.api.mi-img.com/nr-pub/202210262033_ef39fca0e37395d07682124770fd3ad9.png?thumb=1&w=200&h=200&f=webp&q=90" alt="">
    name: 'WorkspaceJsonCategory',
    props:['category','listData','title'],
    data() {
        return {
           
        };
    },

};
</script>

<style scoped>
.category{
    background-color: aquamarine;
    width: 200px;
    height: 500px;
}

h3{
    text-align: center;
    background-color: orange;
}

</style>