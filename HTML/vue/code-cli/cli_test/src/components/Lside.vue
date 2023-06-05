<template>
    <div id="lside">
        <div class="work">
            <img :src="require('../assets/pic/' + userImg + '.jpg')" style="width: 130px;height: 130px;margin-right: 10px" alt=""/>
<!--            上传短文章按钮-->
            <el-button type="primary" icon="el-icon-edit"  @click="dialogVisible1 = true" style="height: 130px;width: 130px;font-size: 20px">写作</el-button>
            <el-dialog
                title="写作"
                :visible.sync="dialogVisible1"
                width="30%"
                :before-close="handleClose">
                <el-upload
                        action=""
                        list-type="picture-card"
                        ref="pictureUpload2"
                        :limit="1"
                        :auto-upload="uploadImg1"
                        :on-remove="handleMaxpic"
                        :on-success="handleSuccess"
                        :on-error="handleErr"
                        :on-exceed="handleExceed2"
                        :class="{hide:showUpload}"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                >
                    <i slot="default" class="el-icon-plus" @click="test1"></i>
                    <div slot="file" slot-scope="{file}" >
                        <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt=""
                        >
                        <span class="el-upload-list__item-actions">
                    <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleRemove2(file);handleMaxpic"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                    </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" >
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <div class="work_write">
<!--                    写作的内容以表单提交-->
                    <el-form action="Lside.vue" ref="form" :model="form">
                        <input type="text" name="title" placeholder="标题" style="height: 30px" v-model="form.title">
                        <br>
                        <Editor id="tinymce" v-model="form.content" name="content" :init="init" style="width: 100%;height: 200px;"></Editor>
<!--                        <textarea name="content" rows="5" v-model="form.content"-->
<!--                                  style="width: 498px;resize:none;font-size:16px;outline: none;border: solid rgba(31,31,31,.3);border:0">-->
<!--                        </textarea>-->
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="onsubmitEdit()">提 交</el-button>
              </span>
            </el-dialog>

<!--            上传图片按钮-->
            <el-button type="primary" icon="el-icon-camera" @click="dialogVisible2 = true"
                       style="height: 130px;width: 130px;font-size: 20px">图片</el-button>
            <el-dialog
                title="上传图片"
                :visible.sync="dialogVisible2"
                width="30%"
                :before-close="handleClose">
                <input type="text" placeholder="请输入标题" v-model="imageTitle" style="width: 460px;height: 30px;margin-bottom: 10px;font-size: 20px;">
                <!--     最大上传数            :limit="3"   -->
                <el-upload
                    action=""
                    list-type="picture-card"
                    ref="pictureUpload"
                    :limit="limit"
                    :auto-upload="uploadImg1"
                    :on-remove="handleMaxpic"
                    :on-success="handleSuccess"
                    :on-error="handleErr"
                    :on-exceed="handleExceed"
                    :class="{hide:showUpload}"
                    :file-list="fileList"
                    :before-upload="beforeUpload"
                    >
                    <i slot="default" class="el-icon-plus" @click="test1"></i>
                    <div slot="file" slot-scope="{file}" >
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url" alt=""
                            :data-index="file.name.split('.')[0]"
                        >
                        <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file);handleMaxpic"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                    </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" >
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="onsubmitImg" >确 定</el-button>
                </span>
            </el-dialog>

<!--            上传视频按钮-->
            <el-button type="primary" icon="el-icon-video-play" @click="dialogVisible3 = true"
                       style="height: 130px;width: 130px;font-size: 20px">视频</el-button>
            <el-dialog
                title="上传视频"
                :visible.sync="dialogVisible3"
                width="30%"
                :before-close="handleClose">
                <input type="text" placeholder="请输入标题" v-model="form2.title" style="width: 100%;height: 30px;margin-bottom: 10px;font-size: 20px;">
                <el-upload
                        class="avatar-uploader el-upload--text"
                        action=""
                        ref="videoUpload"
                        list-type="picture-card"
                        :auto-upload="false"
                        :show-file-list="true"
                        :on-exceed="handleExceed2"
                        :limit="1"
                        style="border: 1px solid #DCDFE6;border-radius: 4px;padding: 10px;"
                >
                    <i  class="el-icon-plus avatar-uploader-icon" />
                    <div slot="file" slot-scope="{file}">
                        <video
                                class="el-upload-list__item-thumbnail"
                                style="height: 148px"
                                :src="file.url"
                                :data-index="file.name.split('.')[0]"
                        ></video>
                            <span class="el-upload-list__item-actions">
                        <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleRemove3(file);handleMaxpic"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                            </span>

                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" >
                    <video  width="100%" :src="dialogImageUrl" controls="controls" style="height: 400px;margin-left: 150px;"></video>
                </el-dialog>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="onsubmitVid()">确 定</el-button>
                </span>
            </el-dialog>
<!--            点击跳转到长文章上传界面-->
            <el-button type="primary" icon="el-icon-edit-outline" style="height: 130px;width: 130px;font-size: 20px" @click="skipWriting">长文章</el-button>
        </div>
        <div v-for="m in neirong.slice(0,showNeirong)" :key="m.Cno" class="lside_content" :class="{bgd:m.toutiao}" :data-index="m.Cno" >
            <div class="content_Apic" @mouseover="mouseover(m.Cno)" @mouseout="mouseout(m.Cno)" :data-index="m.Cno">
                <img :src="require('../assets/pic/' + m.Apic + '.jpg')" alt="" @click="showArticle(m.account,m.username,m.Apic)">
                <div class="content_user show1" style="position: relative;left: -100px;top: -70px;background-color: black;color: white;width: 100px;height: 150px;padding: 10px 20px ;" :data-index="m.Cno">
                    <div @click="showUser(m.account,m.username,m.sex,m.birthday,m.Apic)">
                        <img :src="require('../assets/pic/' + m.Apic + '.jpg')" alt="">
                        <p style="text-align: center;user-select: none">{{m.username}}</p>
                    </div>
                    <p style="user-select: none" @click="showFans(m.account,m.username,m.Apic)">粉丝：{{m.fensi}}</p>
                </div>
            </div>
            <div class="content_show"  >
                <div class="content_Cpic" v-if="m.Cpic" @click="toArticle(m)">
                        <img :src="require('../assets/pic-content/'+ m.Cpic[0] +'.jpg')" alt="">
                </div>
                <div class="content_name" @click="toArticle(m)">
                    <h1>
                        {{m.title}}
                    </h1>
                </div>
                <div class="content_content" v-if="m.content" @click="toArticle(m)">
<!--                                                        ↓:class="{p2:m.Cpic}"-->
                    <p v-html="m.content" class="content-p1" >
                        {{m.content}}
                    </p>
                </div>
                <div class=""  v-if="m.video">
                    <video :src="require('../assets/video/'+m.video +'.mp4')" controls="true">
                    </video>
                </div>
                <div class="content_add" >
                    <a>
                        <i class="el-icon-circle-check"  style="width: 20px;height: 20px;font-size: 20px" @click="zan_on(m.Cno,m.zan)" >{{m.zan}}</i>
                    </a>
                    <a>
                        <i class="el-icon-star-off" style="width: 20px;height: 20px;font-size: 20px" @click="cang_on(m.Cno)">{{m.cang}}</i>
                    </a>
                    <p style="margin-left: 400px;color: #999999;user-select: none">
                        {{m.date}}
                    </p>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import tinymce from "tinymce"
import Editor from "@tinymce/tinymce-vue";


export default {
  // eslint-disable-next-line vue/multi-word-component-names
    name: 'Bangdan',
    inject:['reload'],
    // props:['userPic'],
    data() {
        return {
            showNeirong:5,
            dialogVisible1: false,
            dialogVisible2: false,
            dialogVisible3: false,
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            autoUpload: false,
            // 决定是否显示图片
            showUpload:false,
            //存储Spu图片数据
            spuImageList: [],
            // 存储图片标题
            imageTitle:'',
            uploadImg1:false,
            // 数量限制
            limit:9 ,
            fileList:[],
            fileList1:{},
            imgList:[],
            progressFlag: false, // 关闭进度条
            videoSrc: '',
            // neirong:this.$store.state.allArticle,
            neirong1:[],
            form:{
                title:'',
                content:'',
                Cpic:'',
                date:'',
            },
            form2:{
                title:'',
                video:'',
                date:'',
            },
            a:document.getElementsByClassName('el-icon-circle-check'),
            b:document.getElementsByClassName('el-icon-star-off'),
            init: {
                language_url: "/zh-Hans.js", // 语言包位置，因为放在public下所以可以省略public
                selector: "#tinymce", //tinymce的id
                language: "zh-Hans", //语言类型
                skin_url: "/skins/ui/oxide",
                height: 500, //编辑器高度
                toolbar: false, //隐藏工具栏
                browser_spellcheck: true, // 拼写检查
                elementpath: false, //禁用编辑器底部的状态栏
                statusbar: false, // 隐藏编辑器底部的状态栏
                paste_data_images: false, // 允许粘贴图像
                menubar: false, //最顶部文字信息
                plugins: "image link code table lists wordcount",
                branding: false, //是否禁用“Powered by TinyMCE”
            },
            state:{
                jin:this.$store.state.user.jin,
                ban:this.$store.state.user.ban
            }
        };
    },
    components: { Editor },
    mounted() {
        tinymce.init({})
        console.log(this.neirong)
        console.log(this.neirong1[1])
        console.log(this.$store.state.allArticle)
        this.showData()
    },
    computed:{
        userImg(){
            return this.$store.state.user.pic
        },
        neirong:{
            get(){
                let a= this.$store.state.allArticle
                // this.neirong1=a
                for(let i =0;i<a.length;i++){
                    a[i].date= new Date(a[i].date).toLocaleDateString().replace(/\//g,"-");
                }
                console.log(a)
                return a
            },
            set(val){
                this.neirong1=val
            }
        },

    },
    watch:{

    },
    methods: {
        showData(){
            let self=this
            let a = document.getElementById('lside')
            console.log(a)
            console.log("height========",a.offsetHeight)
            // console.log(document.documentElement.scrollTop)
            window.addEventListener('scroll',function(){
                // console.log(11);
                // 再得到页面滚动的距离
                // console.log(document.documentElement.scrollTop)
                // 左组件的高度
                let a =document.getElementById('lside').offsetHeight
                // 可视区高度
                let b = document.documentElement.clientHeight
                // 滚动距离
                let c = document.documentElement.scrollTop
                // console.log(a,b,c)

                // console.log(a-b-c)
                let d=a-b-c
                console.log(self.neirong.length)

                if(d<0){
                    console.log(self.showNeirong)
                    self.showNeirong = self.showNeirong+5
                    console.log("!!!!!!!!!!!")
                    if(self.showNeirong<self.neirong){
                        // 动态刷新页面
                        self.reload()
                    }else{
                        console.log("已达最大底")
                    }

                }
            })
        },
        // 鼠标悬停
        mouseover(m){
            // console.log(m)
            let show =document.getElementsByClassName('content_user')
            // console.log(m)
            // console.log(show)
            // console.log(show[m-1])
            // show[m-1].className='content_user show2'
            // m为number类型，将其转换为string类型在进行比较
            m=m.toString()
            // console.log(typeof(m))    // string
            for(let i=0;i<show.length;i++){
                if(show[i].dataset.index===m){
                    show[i].className='content_user show2'
                }

            }
        },
        // 鼠标失焦
        mouseout(m){
            // console.log("add",m)
            let show =document.getElementsByClassName('content_user')
            // setTimeout(function (){
            m=m.toString()
            // console.log(m)
            for(let i=0;i<show.length;i++){
                if(show[i].dataset.index===m){
                    show[i].className='content_user show1'
                }
            }
            // },500)
        },
        //  跳转用户详情          传递用户的账户。用于router
        showUser(a,n,s,b,p){
            console.log("用户账户：",a)
            this.$router.push({
                path:'/Home/User',
                query:{
                    account:a,
                    username:n,
                    sex:s,
                    birthday:b,
                    Apic:p,
                }
            })
        },
        // 跳转用户文章
        showArticle(a,n,p){
            this.$router.push({
                path:'/Home/Article',
                query:{
                    account:a,
                    username:n,
                    Apic:p,
                }
            })
        },
        //  跳转用户粉丝          传递用户的账户,用于router
        showFans(a,n,p){
            console.log("粉丝数：",a)
            this.$router.push({
                path:'/Home/Fans',
                query:{
                    account:a,
                    username:n,
                    Apic:p,
                }
            })
        },
        // 跳转文章详情
        toArticle(m){
            this.$router.push({
                path:'/Show',
                query:{
                    account:m.account,
                    Apic:m.Apic,
                    Cpic:m.Cpic,
                    title:m.title,
                    content:m.content,
                    video:m.video,
                    date:m.date,
                    username:m.username,
                }
            })
        },

        // 点赞
        zan_on(n,zan) {
            // 未点击
            // n=m.Cno
            console.log(n)
            console.log(zan)
            zan=zan+1
            if(this.state.jin===1){
                this.$message.error('你已被禁言，无法点赞！')
                return false
            }
            if(this.state.ban===1){
                this.$message.error('你已被封禁，无法点赞！')
                return false
            }
            let acc= localStorage.getItem('UserAccount')
            if(!acc){
                this.$message.error('请登录！！')
                return false
            }
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/Article',
                data:{
                    token:'zan',
                    Cno:n,
                }
            }).then(res=>{
                switch(res.data){
                    case 0 :
                        this.$message.success("点赞成功！")



                        this.reload()
                        break
                }
            }).catch(err=>{
                this.$message.error(err)
            })
            // zan=zan+1
            // this.reload()
        },
        // 收藏
        cang_on(n) {
            // 获取所有点赞收藏按钮
            // if(this.state.jin===1){
            //     this.$message.error('你已被禁言，无法收藏！')
            //     return false
            // }
            // if(this.state.ban===1){
            //     this.$message.error('你已被封禁，无法收藏！')
            //     return false
            // }
            let a=document.getElementsByTagName('a')
            console.log(a,n)
            let acc= localStorage.getItem('UserAccount')
            if(!acc){
                this.$message.error('请登录！！')
                return false
            }
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/Article',
                data:{
                    token:'cang',
                    Cno:n,
                    account:acc,
                }
            }).then(res=>{
                switch(res.data){
                    case 0 :
                        this.$message.success("收藏成功！")
                        this.reload()
                        break
                    case 1 :
                        this.$message.error("你已经收藏过该文章！")
                        break
                }
            }).catch(err=>{
                this.$message.error(err)
            })
        },

        handleClose(done) {
            this.$confirm('确认关闭(保存)？')
                .then(a => {
                    console.log(a)
                    done();
                })
                .catch(b => {
                    console.log(b)
                });
        },
        // 跳转到富文本编辑器
        skipWriting(){
          this.$router.push('/ArticleWriting')
        },
        // 文件列表移除文件时的钩子
        handleMaxpic(file,fileList){
          if(fileList.length<3){
              this.showUpload=false
          }
          this.spuImageList=fileList
        },
        // 文件上传成功
        handleSuccess(response,file,fileList){
          this.spuImageList=fileList

        },
        // 上传失败
        handleErr(err,file,fileList){
            console.log(err)
            console.log(file,fileList)
        },
        // 上传超过最大值
        handleExceed() {
            this.$message.error(`上传文件数量不能超过 ${this.limit} 个!`)
        },
        //  文章封面上传超过最大值
        handleExceed2() {
            this.$message.error(`上传文件数量不能超过 1 个!`)
        },
        // 图片按钮：删除图片
        handleRemove(file) {
            console.log(file);
            // console.log("a====",a[0].dataset.index)
            let uploadFiles = this.$refs.pictureUpload.uploadFiles
            console.log("uploadFiles=======",uploadFiles)
            // 删除文件
            for (var i = 0; i < uploadFiles.length; i++) {
                if (uploadFiles[i]['url'] == file.url) {
                    uploadFiles.splice(i, 1)
                }
            }
            // console.log(this.spuImageList)
            // console.log(this.fileList)
            // console.log(this.fileList.length)
        },
        // 文章按钮：删除图片
        handleRemove2(file) {
            console.log(file);
            // console.log("a====",a[0].dataset.index)
            let uploadFiles = this.$refs.pictureUpload2.uploadFiles
            console.log("uploadFiles=======",uploadFiles)
            // 删除文件
            for (var i = 0; i < uploadFiles.length; i++) {
                if (uploadFiles[i]['url'] == file.url) {
                    uploadFiles.splice(i, 1)
                }
            }
            // console.log(this.spuImageList)
            // console.log(this.fileList)
            // console.log(this.fileList.length)
        },
        // 视频按钮：删除视频
        handleRemove3(file){
            console.log(file);
            // console.log("a====",a[0].dataset.index)
            let uploadFiles = this.$refs.videoUpload.uploadFiles
            console.log("uploadFiles=======",uploadFiles)
            // 删除文件
            for (var i = 0; i < uploadFiles.length; i++) {
                if (uploadFiles[i]['url'] == file.url) {
                    uploadFiles.splice(i, 1)
                }
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        beforeUpload(file){
            console.log("beforeUpload===",file)

        },
        // 上传图片
        onsubmitImg(){
            // 判断是否有题目
            if(this.imageTitle.length===0){
                this.$message.error("标题不能为空！")
            }else {
                // ======获取待上传的数组
                let uploadFiles = this.$refs.pictureUpload.uploadFiles
                // 判断图片类型和图片大小
                for(let i=0;i<uploadFiles.length;i++){
                    if (uploadFiles[i].name.split('.')[1]!=='jpg' && uploadFiles[i].name.split('.')[1]!=='jpeg'){
                        this.$message.error("第"+ (i+1) +'个文件格式错误,上传图片只能是jpg或jpeg格式格式!')
                            if(uploadFiles[i].size >  1024 * 1024 * 2){
                                this.$message.error("第"+ (i+1) +'个文件不符合规则（图片大小不超过 2M），请重新上传~')
                            }
                    }
                }
                console.log("type:",uploadFiles[0].type)
                console.log(uploadFiles[0].name.split('.')[1])
                let title=this.imageTitle
                // console.log(uploadFiles)
                let a=[]
                for(let i=0;i<uploadFiles.length;i++){
                    a.push(uploadFiles[i].name.split('.')[0])
                }
                // 所有Cpic，数组类型 ['user6', 'user5']
                console.log("a=======",a)
                a = a.toString()
                let acc=this.$store.state.user.account
                let date=new Date().toLocaleDateString().replace(/\//g,"-")
                this.fileList1={
                    "account":acc,
                    "Cpic":a,
                    "date":date,
                    "title":title,
                }
                // 用户账户和上传图片
                console.log(this.fileList1)
                console.log(this.fileList1.Cpic)
                console.log(typeof(this.fileList1.Cpic))
                this.$axios({
                    method:'post',
                    url:'http://127.0.0.1:10520/api/user/insert',
                    data:{
                        token:'img',
                        account:this.fileList1.account,
                        title:this.fileList1.title,
                        Cpic:this.fileList1.Cpic,
                        date:this.fileList1.date,
                    }
                }).then(res=>{
                    switch (res.data){
                        case 0:
                            this.$message({
                                type: 'success',
                                message: '上传成功！！!',
                            });
                            this.dialogVisible2 = false;
                            // 重新加载界面
                            location.reload()
                            break
                    }
                }).catch(err=>{
                    this.$message.error(err)
                })
                // 完成后关闭上传窗口
            }


        },
        // 上传短文章
        onsubmitEdit() {
            let a= this.$refs.pictureUpload2.uploadFiles
            console.log(a,this.form.title,this.form.content)
            if(a.length===0 || this.form.title.length===0 || this.form.content.length===0){
                this.$message.error("请确保所有内容都已填写！")
            }else{
                if (a[0].name.split('.')[1]!=='jpg' && a[0].name.split('.')[1]!=='jpeg'){
                    this.$message.error('文件格式错误,上传图片只能是jpg或jpeg格式格式!')
                    if(a[0].size >  1024 * 1024 * 2){
                        this.$message.error('文件不符合规则（图片大小不超过 2M），请重新上传~')
                    }
                }else{
                    this.form.Cpic = a[0].name.split(".")[0]
                    console.log("准备完成！")
                    console.log(this.form.Cpic,this.form.title,this.form.content)
                    this.form.date=new Date().toLocaleDateString().replace(/\//g,"-")
                    this.$axios({
                        method:'post',
                        url:'http://127.0.0.1:10520/api/user/insert',
                        data:{
                            token:'article',
                            account:this.$store.state.user.account,
                            title:this.form.title,
                            Cpic:this.form.Cpic,
                            content:this.form.content,
                            date:this.form.date,
                        }
                    }).then(res=>{
                        switch (res.data){
                            case 0:
                                this.$message({
                                    type: 'success',
                                    message: '上传成功！！!',
                                });
                                this.dialogVisible2 = false;
                                // 重新加载界面
                                setTimeout(function(){
                                    location.reload()
                                },1000)
                                break
                        }
                    }).catch(err=>{
                        this.$message.error(err)
                    })
                }
            }
        },
        // 视频上传
        onsubmitVid(){
            console.log(this.$refs.videoUpload)
            // dialogVisible3 = false;
            let file = this.$refs.videoUpload.uploadFiles[0]
            console.log(file)
            const isLt10M = file.size / 1024 / 1024 < 10
            if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.raw.type) === -1) {
                this.$message.error('请上传正确的视频格式')
            }else{
                if (!isLt10M) {
                    this.$message.error('上传视频大小不能超过10MB哦!')
                }else{
                    if(this.form2.title.length!==0){
                        this.form2.video=file.name.split('.')[0]
                        this.form2.date=new Date().toLocaleDateString().replace(/\//g,"-")
                        this.$axios({
                            method:'post',
                            url:'http://127.0.0.1:10520/api/user/insert',
                            data:{
                                token:'video',
                                account:this.$store.state.user.account,
                                title:this.form2.title,
                                video:this.form2.video,
                                date:this.form2.date,
                            }
                        }).then(res=>{
                            switch (res.data){
                                case 0:
                                    this.$message({
                                        type: 'success',
                                        message: '上传成功！！!',
                                    });
                                    this.dialogVisible3 = false;
                                    // 重新加载界面
                                    setTimeout(function(){
                                        location.reload()
                                    },1000)
                                    break
                            }
                        }).catch(err=>{
                            this.$message.error(err)
                        })
                    }else{
                        this.$message.error("请输入标题！")
                    }
                }
            }

        },
        test1(){
            console.log("=====点击=====")
        },
    }
};
</script>

<style>


#lside{
    width: 750px;
    float: left;
    left: 500px;
    margin-bottom: 50px;
    margin-top: 20px;
}
.work{
    width: 700px;
    height: 130px;
    background-color: #409EFF;
    margin-bottom: 10px;
}
.work_write{
    width: 500px;
    padding: 0 ;
    border: 1px solid rgba(31,31,31,.3);
}
.work_write input{
    border: solid rgba(31,31,31,.3);
    border-width: 0 0 1px 0;
    width: 498px;
    outline: none;
    font-size: 20px;
}
.lside_content{
    padding: 10px 10px 10px 0;
    width: 700px;
    max-height: 600px;
    min-height: 64px;
    background-color: white;
    margin-top: 20px;
    display: block;
    float: left;
}
.lside_content.bgd{
    background-image: linear-gradient(rgba(255,0,0,.65),rgba(255,255,0,.1));
}
.content_show{
    width: 600px;
    float: right;
}
.content_user{
    position: relative;
    left: -100px;
    top: -70px;
    background-color: black;
    color: white;
    width: 100px;
    height: 150px;
    padding: 10px 20px;
}
/*默认不显示*/
.content_user .show1{
    display: none;
    opacity: 0;
}
/*悬停显示，动画1s*/
.content_user .show2{
    display: block;
    opacity: 1;
    transition: 1s;
}
.content_Apic{
    box-shadow: 0 0 5px 1px #444444;
    width: 60px;
    height: 60px;
    float: left;
    /*margin-bottom: 200px;*/
}
.content_Apic img{
    width: 60px;
    height: 60px;
}

.content_Cpic{
    width: 600px;
    height: 300px;
    display: block;
}
.content_Cpic img{
    width: 600px;
    height: 300px;
}

video{
    background-color: black;
    width: 600px;
    height: 300px;
}
.content_name{
    font-size: 18px;
    color: #444;
}
.content_content{
    width: 600px;
}
.content_content .content-p1{
    width: 600px;
    font-size: 16px;
    display: -webkit-box!important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
    overflow: hidden;
}
.content_content .content-p1.p2{
    -webkit-line-clamp: 15;
}

.content_add{
    margin-top: 20px;
    display: block;
    height: 20px;
    /*position: absolute;*/
}
.content_add a{
    text-decoration: none;
    color: gray;
    display: block;
    float: left;
    min-width: 100px;
}
.content_add a i{
    text-decoration: none;
    user-select: none;
    display: inline-block;
    float: left;
}
.el-upload--picture-card input.el-upload__input{
    display: none;
}
.el-dialog__body .hide .el-upload--picture-card{
    display: none;
}

</style>