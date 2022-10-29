<template>
    <div class="category">
        <h3>{{title}}分类</h3>
        <slot :games="games" >qwerdfas</slot>
    </div>
</template>

<script>
export default {
    name: 'WorkspaceJsonCategory',
    props:['title'],
    data() {
        return {
            games: ['红色警戒', '穿越火线', '劲舞团','穿越火线']
        };
    },
}
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