<template>
      <el-form ref="form" :model="user" id="user-page">
          <div style="height: 650px">
              <h1 style="text-align: center">{{ user.username }}</h1>
              <div class="userPic">
                  <el-avatar style="margin-left: 150px;margin-bottom: 50px" :size="150"  :src="require('../assets/pic/' + user.pic + '.jpg')"></el-avatar>
              </div>
              <el-form-item label="账号" label-width="80px">
                  <el-input  style="width: 300px;pointer-events: none" v-model="user.account" ></el-input>
              </el-form-item>
              <el-form-item label="性别" label-width="80px">
                  <el-input v-model="user.sex" style="width: 300px;pointer-events: none" show-message ></el-input>
              </el-form-item>
              <el-form-item label="生日" label-width="80px">
                  <el-input v-model="birthday" style="width: 300px;pointer-events: none" show-message></el-input>
              </el-form-item>
              <el-row
                  v-if="user.account===localUser"
                  style="margin-left: 130px;"
              >
                  <el-button type="primary" style="width: 200px" round @click="editUser">编辑信息</el-button>
              </el-row>
          </div>

      </el-form>
</template>

<script>

export default {
    name: "UserPage",
//     用户信息界面，可以修改个人信息
    data(){
        return{
            localUser:localStorage.getItem('UserAccount'),
            user:{
                pic:this.$route.query.Apic,
                username:this.$route.query.username,
                account:this.$route.query.account,
                sex:this.$route.query.sex,
                }
            }
    },

    computed:{
        birthday(){
            let a = this.$route.query.birthday
            a= new Date(a).toLocaleDateString().replace(/\//g,"-");
            return a
        }
    },
    methods:{
        editUser(){

        },

    }



}
</script>

<style>

#user-page{
    width: 450px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    padding-top: 10px;
    box-shadow: 5px 5px 20px black ;
}

</style>