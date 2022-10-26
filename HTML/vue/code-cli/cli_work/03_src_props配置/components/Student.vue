<template>
  <div>
    <h1>{{msg}}</h1>
    <h2>学生姓名：{{name}}</h2>
    <h2>学生性别：{{sex}}</h2>
    <h2>学生年龄：{{myAge+1}}</h2>
    <button @click="updateAge">age+1</button>
  </div>
</template>

<script>
export default {
    name: 'WorkspaceJsonSchool',
    data() {
        return {
          msg:'我来自中国',
          myAge:this.age,
        };
    },
    methods:{
      updateAge(){
        this.myAge++
      }
    },
    // 简单声明接收
    // props:['name','age','sex']   
    
    // 接收的同时对数据进行类型限制
    // prrops:{
    //   name:String,
    //   age:Number,
    //   sex:String
    // }

    // 接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
    props:{
      name:{
        type:String,      //name的类型
        required:true     //name是必要的
      },
      age:{
        type:Number,      //age的类型
        default:10        //默认值
      },
      sex:{
        type:String,
        required:true
      },
    }
};
</script>

