<template>
  <div class="app">
    <h1>{{msg}},学生的姓名是：{{studentName}}</h1>  

    <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
    <School :getSchoolName="getSchoolName" />
    <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据 -->
    <!-- 第一种写法，使用@或者v-on ，加.once为一次性事件-->
    <!-- <Student @atguigu="getStudentlName" @demo="m1"/> -->

    <!-- 第二种写法，使用ref -->
    <!-- 事件后加.native就会被认定为原生事件 -->
    <Student ref="student" @click.native="show" />
  </div>
</template>

<script>
  import Student from './components/Student.vue'
  import School from './components/School.vue'

export default {
    name: 'WorkspaceJsonApp',
    components:{Student,School},
    data() {
      return {
        msg:'你好',
        studentName:'',
      };
    },
    methods: {
      getSchoolName(name){
        console.log("App收到了学校名",name);
      },
      getStudentlName(name,...params){
        console.log('App收到了学生名',name,params);
        this.studentName = name
      },
      m1(){
        console.log('demo was used');
      },
      show(){
        alert(123)
      }
    },
    mounted() {
      this.$refs.student.$on('atguigu',(name,...params)=>{
        console.log('App收到了学生名',name,params);
        console.log(this);
        this.studentName = name
      })
      // ↓↓↓↓ 先写getStudentName的methods ↓↓↓↓
      // this.$refs.student.$on('atguigu',this.getStudentlName)  //一次性
      // this.$refs.student.$once('atguigu',this.getStudentlName)  //一次性
    },
};
</script>

<style>
.app{
  background-color: gray;
}

</style>

