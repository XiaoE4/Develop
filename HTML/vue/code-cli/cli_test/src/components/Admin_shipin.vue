<template>
    <div>
        <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%"
            :row-style="{height:'160px'}"
            height="calc(100vh - 150px)"
            :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column
                label="日期"
                prop="date"
                width="100"
                sortable>
            </el-table-column>
            <el-table-column
                label="作者名"
                prop="username"
                width="100">
            </el-table-column>
            <el-table-column
                label="类型"
                prop="content"
                width="100">
                <template  slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.video">视频</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                label="标题"
                prop="title"
                width="180">
            </el-table-column>
            <el-table-column
                prop="content"
                label="内容"
                width="600">
                <template slot-scope="scope">
                    <video :src="require('../assets/video/' + scope.row.video + '.mp4')"
                           id="root_video"
                    ></video>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <!--                <el-button-->
                    <!--                    size="mini"-->
                    <!--                    type="success"-->
                    <!--                    @click="handleAdd(scope.$index,scope.row)"-->
                    <!--                >添加到头条</el-button>-->
                    <el-popconfirm
                        :title="'确定将《'+scope.row.title+'》添加到头条吗？'"
                        @confirm="handleAdd(scope.$index,scope.row)"
                        style="margin-left: 10px"
                    >
                        <el-button slot="reference" size="mini"  type="warning">添加到头条</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination align='center'
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[1,5,10,20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="tableData.length"
                       style="margin-top: 30px">
        </el-pagination>
        <el-dialog
            title="删除"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <span>请说明删除原因：</span>
            <input type="text" v-model="del.cause">
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="delete1">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Admin_shipin",
    data(){
        return{
            tableData: [],
            // 当前页码
            currentPage: 1,
            // 总条数
            total: '',
            // 每页的数据条数 ,默认10条
            pageSize: 5,
            // 弹窗
            dialogVisible: false,
            del:{
                Cno:'',
                account:'',
                cause:'',
                date: new Date().toLocaleDateString().replace(/\//g,"-")
            }
        }
    },
    mounted() {
        this.getAllVideo()
    },
    methods:{
        //每页条数改变时触发 选择一页显示多少行
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage = 1;
            this.pageSize = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
        },
        // 查看数据
        handleEdit(index, row) {
            // index:第几行   row:这一行的数据
            console.log("第",index,"行")
            this.$router.push({
                path:'/Show',
                query:{
                    account:row.account,
                    Apic:row.Apic,
                    Cpic:row.Cpic,
                    title:row.title,
                    content:row.content,
                    video:row.video,
                    date:row.date,
                }
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(()=> {
                    this.del.cause=''
                    done();
                })
                .catch(()=> {});
        },
        // 删除数据
        handleDelete(index, row) {
            console.log(index, row);
            this.dialogVisible=true
            this.del.account = row.account
            this.del.Cno = row.Cno
        },
        // 删除数据
        delete1(){
            console.log(this.del.cause)
            console.log(this.del.account)
            if(this.del.cause.length===0){
                console.log("原因不能为空！")
            }else{
                let self=this
                this.$axios({
                    method:'post',
                    url:'http://127.0.0.1:10520/api/user/Article',
                    data:{
                        token:'delArticle',
                        Cno: self.del.Cno,
                        // 删除账户，用于causes表
                        account: self.del.account,
                        // 删除原因，用于causes表
                        cause: self.del.cause,
                        date:self.del.date,
                    }
                }).then(res=>{
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });
                    // 关闭窗口
                    this.dialogVisible=false
                    // 重新获取头条
                    self.getAllVideo()
                    // 刷新页面，渲染界面
                    location.reload()
                }).catch(err=>{
                    this.$message({
                        type: 'warning',
                        message: err
                    });
                })

            }

        },
        // 添加到头条
        handleAdd(index, row) {
            console.log(index, row);
            // let self=this
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/top',
                data:{
                    token:'insert',
                    article_Cno: row.Cno,
                }
            }).then(res=>{
                console.log(res)
                switch (res.data){
                    case 0:
                        this.$message({
                            type: 'success',
                            message: '添加成功!',
                        });
                        break;
                    case 1:
                        this.$message({
                            type: 'error',
                            message: '头条已存在!',
                        });
                        break;
                }



            }).catch(err=>{
                this.$message({
                    type: 'warning',
                    message: err
                });
            })
        },
        // 获取文章
        getAllVideo(){
            let self=this
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/getArticle',
                data:{
                    token:'get',
                    account:'all',
                }
            }).then(res=>{
                for(let i =0;i<res.data.length;i++){
                    res.data[i].date=new Date(res.data[i].date).toLocaleDateString().replace(/\//g,"-")
                    if(res.data[i].video){
                        self.tableData.push(res.data[i])
                    }
                }
                console.log(self.tableData)
                // 判断文章
                // self.tableData=res.data
            }).catch((err=>{
                console.log(err)
            }))
        }
    }
}
</script>

<style scoped>

</style>