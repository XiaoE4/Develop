<template>
    <div id="article_write">
        <input  v-if="!route.title" type="text" v-model="title" id="title_write" required placeholder="请输入标题">
        <input  v-if="route.title" type="text" v-model="route.title" id="title_write" required placeholder="请输入标题">
        <Editor v-if="!route.value" id="tinymce" v-model="value" :init="init" style="width: 100%;height: 2000px;"></Editor>
        <Editor v-if="route.value" id="tinymce" v-model="route.value" :init="init" style="width: 100%;height: 2000px;"></Editor>
        <el-row>
            <el-button type="primary" round  @click="save">保存到草稿箱</el-button>
            <el-button type="success" round @click="submit" style="float: right">发布</el-button>
        </el-row>

    </div>
</template>

<script>
import tinymce from "tinymce"
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/plugins/image";
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import 'tinymce/icons/default/icons.min.js'

export default {
    name: "ArticleWrite",
    data(){
        return{
            // 输入的标题
            title:'',
            // 输入的内容
            value: '',
            account:this.$store.state.user.account,
            route:{
                title:this.$route.query.title,
                value:this.$route.query.content,
                Cno:this.$route.query.Cno,
                account:this.$route.query.account
            },
            // 提交的日期
            date:'',
            content:{},
            init: {
                language_url: "/zh-Hans.js", // 语言包位置，因为放在public下所以可以省略public
                selector: "#tinymce", //tinymce的id
                language: "zh-Hans", //语言类型
                skin_url: "/skins/ui/oxide",
                height: 500, //编辑器高度
                browser_spellcheck: true, // 拼写检查
                // elementpath: false, //禁用编辑器底部的状态栏
                // statusbar: false, // 隐藏编辑器底部的状态栏
                paste_data_images: true, // 允许粘贴图像
                menubar: false, //最顶部文字信息
                plugins: "image link code table lists wordcount",
                branding: false, //是否禁用“Powered by TinyMCE”
                toolbar: "fontselect fontsizeselect link lineheight forecolor backcolor bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | image quicklink h2 h3 blockquote  numlist bullist preview fullscreen", //工具栏
                fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
                font_formats: "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
            }
        }
    },
    components: { Editor },
    mounted() {
      tinymce.init({})
        // this.tuichu()
    },
    methods:{
        // 提交内容
        submit(){
            console.log(this.title)
            console.log(this.route.title)
            if(!this.title && this.route.title){
                this.title=this.route.title
                this.value=this.route.value
                this.account=this.route.account
            }
            if(this.title.length===0 || !this.title){
                this.$message.error("标题不能为空！！！")
            }else {
                if(this.value.length===0 || !this.value){
                    this.$message.error("内容不能为空！！！")
                }else{
                    // console.log(this.$store.state.user.account)
                    this.$confirm('此操作将提交并退出编辑, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.date=new Date().toLocaleDateString().replace(/\//g,"-")
                        // 添加到草稿箱
                        this.$axios({
                            method:'post',
                            url:'http://127.0.0.1:10520/api/user/insert',
                            data:{
                                token:'writing',
                                account:this.account,
                                title:this.title,
                                content:this.value,
                                date:this.date,
                            }
                        }).then(res=>{
                            switch (res.data){
                                case 0:
                                    this.$message({
                                        type: 'success',
                                        message: '上传成功！！!',
                                    });
                                    // 如果是草稿编辑保存就删除原来的草稿
                                    if(this.route.Cno){
                                        this.$axios({
                                            method:'post',
                                            url:'http://127.0.0.1:10520/api/user/draft',
                                            data:{
                                                token: 'delete',
                                                Cno: this.route.Cno,
                                            }
                                        }).then(res=>{
                                            switch (res.data) {
                                                case 0:
                                                    // this.getUnsave()
                                                    console.log("删除旧草稿成功！")
                                                    setTimeout(function(){
                                                        window.history.go(-1);
                                                    },1000)
                                                    break
                                            }
                                        }).catch(err=>{
                                            console.log(err)
                                        })
                                    }else{
                                        // 重新加载界面
                                        setTimeout(function(){
                                            window.history.go(-1);
                                        },1000)
                                    }
                                    break
                            }
                        }).catch(err=>{
                            this.$message.error(err)
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消退出'
                        });
                    });
                }
            }
        },
        // 保存到草稿箱并询问是否退出
        save(){
            if(!this.title && this.route.title){
                this.title=this.route.title
                this.value=this.route.value
                console.log(this.title,this.value)
            }
            // if(!this.title)
            if(this.title.length===0 || !this.title){
                this.$message.error("标题不能为空！！！")
                return false
            }
            if(this.value.length===0 || !this.value){
                this.$message.error("内容不能为空！！！")
                return false
            }
            this.$confirm('此操作将退出编写, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.date=new Date().toLocaleDateString().replace(/\//g,"-")
                this.$axios({
                    method:'post',
                    url:'http://127.0.0.1:10520/api/user/insert',
                    data:{
                        token:'unload',
                        account:this.$store.state.user.account,
                        title:this.title,
                        content:this.value,
                        date:this.date,
                    }
                }).then(res=>{
                    switch (res.data){
                        case 0:
                            this.$message({
                                type: 'success',
                                message: '上传成功！！!',
                            });
                            // 如果是草稿编辑保存就删除原来的草稿
                            if(this.route.Cno){
                                this.$axios({
                                    method:'post',
                                    url:'http://127.0.0.1:10520/api/user/draft',
                                    data:{
                                        token: 'delete',
                                        Cno: this.route.Cno,
                                    }
                                }).then(res=>{
                                    switch (res.data) {
                                        case 0:
                                            // this.getUnsave()
                                            console.log("删除旧草稿成功！")
                                            setTimeout(function(){
                                                window.history.go(-1);
                                            },1000)
                                            break
                                    }
                                }).catch(err=>{
                                    console.log(err)
                                })
                            }else{
                                // 退出界面
                                setTimeout(function(){
                                    window.history.go(-1);
                                },1000)
                            }
                            break
                    }
                }).catch(err=>{
                    this.$message.error(err)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                });
            });
            // this.$axios({
            //     method:'post',
            //     url:'http://127.0.0.1:10520/api/user/insert',
            //     data:{
            //         token:'writing',
            //         account:this.$store.state.user.account,
            //         title:this.title,
            //         content:this.value,
            //         date:this.date,
            //     }
            // }).then(res=>{
            //     switch (res.data){
            //         case 0:
            //             this.$message({
            //                 type: 'success',
            //                 message: '上传成功！！!',
            //             });
            //             // 重新加载界面
            //             setTimeout(function(){
            //                 location.reload()
            //             },1000)
            //             break
            //     }
            // }).catch(err=>{
            //     this.$message.error(err)
            // })
        },

        tuichu(){
            // window.addEventListener("popstate", function fn() {
            //     this.$confirm('此操作将退出编写, 是否继续?', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         window.history.go(-1);
            //     }).catch(() => {
            //         this.$message({
            //             type: 'info',
            //             message: '已取消退出'
            //         });
            //     });
            // }, false);
            // history.pushState(null, document.title, location.href);
            // // eslint-disable-next-line no-unused-vars
            // window.addEventListener('popstate', function (event) {
            //     const leavePage = confirm("确认退出？");
            //     if (leavePage) {
            //         history.go(-1);
            //
            //     } else {
            //         history.pushState(null, document.title, location.href);
            //     }
            //
            // })
            window.onbeforeunload=function(){return false}
            }


    },


}
</script>

<style>
body{
    width: 80%;
    margin: auto;
}
#article_write{
    width: 1500px;
    margin: auto;
}
#article_write button{

}

#title_write{
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    font-size: 30px;
    border: 1px solid #ccc;
}


</style>