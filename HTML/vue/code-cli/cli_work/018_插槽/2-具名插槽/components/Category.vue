<template>
    <div class="category">
        <h3>{{title}}分类</h3>
        <slot name="center">abcd</slot>
        <slot name="footer">abcd</slot>
    </div>
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
    height: 500px;
}

h3{
    text-align: center;
    background-color: orange;
}

</style>