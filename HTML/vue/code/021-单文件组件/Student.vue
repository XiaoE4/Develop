<template>
    <!-- 组件的结构 -->
    <div>
          <h1>学生姓名：{{name}}</h1>
          <h1>学生年龄：{{age}}</h1>
      </div>
    
  </template>
  
  <script>
      export default{
          name:'School',
          data() {
              return {
                  name: '第一高中',
                  age: '地球村'
              }
          }
      }
  
  </script>