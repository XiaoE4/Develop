<template>
    <div>
        <School></School>
        <Student></Student>
    </div>
</template>

<script>
import School from './School'
import Studnet from './Studnet'
    export default {
        name:'App',
        components:{
            School,
            Student
        }
    }
</script>
