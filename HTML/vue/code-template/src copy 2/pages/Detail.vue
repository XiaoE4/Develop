<template>
    <div>
        <br><hr>
        <li>编号：{{id}}</li>
        <li>标题：{{title}}</li>
    </div>
</template>

<script>
export default {
    name: 'WorkspaceJsonDetail',
    props:['id','title'],
    data() {
        return {
            
        };
    },

    mounted() {
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

</style>