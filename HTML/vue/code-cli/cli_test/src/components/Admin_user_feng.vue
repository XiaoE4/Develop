<template>
    <div>
        <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%"
            :row-style="{height:'60px'}"
            height="calc(100vh - 150px)"
            :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column
                label="用户名"
                prop="username"
                width="180">
            </el-table-column>
            <el-table-column
                label="账户"
                prop="account"
                width="180">
            </el-table-column>
            <el-table-column
                prop="causes"
                label="被删除次数">
            </el-table-column>
            <el-table-column
                prop="ban"
                label="是否被封禁"
                width="150"
                :filters="[{ text: '否', value: '否' }, { text: '是', value: '是' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.ban === '否' ? 'success' : 'danger'  "
                        disable-transitions>{{scope.row.ban}}</el-tag>
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
                        @click="handleJin(scope.$index, scope.row)">封禁</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleUnjin(scope.$index, scope.row)">解除封禁</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination align='center'
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10,20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="tableData.length"
                       style="margin-top: 30px">
        </el-pagination>
        <el-dialog title="博客被删除原因" :visible.sync="dialogTableVisible1">
            <el-table :data="causeData2">
                <el-table-column property="date" label="日期" width="150"></el-table-column>
                <el-table-column property="account" label="账户" width="200"></el-table-column>
                <el-table-column property="cause" label="原因"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "Admin_user_jin",
    data(){
        return{
            tableData: [],
            userData:[],
            causeData:[],
            causeData2:[],
            dialogTableVisible1:false,
            currentPage: 1, // 当前页码
            total: '', // 总条数
            pageSize: 10 // 每页的数据条数 ,默认10条
        }
    },
    mounted() {
        this.getUser()
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
        // 查看被删除原因
        handleEdit(index, row) {
            // index:第几行   row:这一行的数据
            // console.log(index, row);
            console.log("account 为 ===",row.account)
            console.log(this.tableData)
            row.account=parseInt( row.account )
            this.causeData2=[]
            for(let i=0;i<this.causeData.length;i++){
                // console.log("1")
                // this.causeData[i].account = parseInt(this.causeData[i].account)
                this.causeData[i].date=new Date(this.causeData[i].date).toLocaleDateString().replace(/\//g,"-");
                if(row.account===this.causeData[i].account){
                    // console.log("2")
                    this.causeData2[i]={
                        "account":this.causeData[i].account,
                        "cause":this.causeData[i].cause,
                        "date":this.causeData[i].date,
                    }
                }
            }
            console.log(this.causeData2)
            this.dialogTableVisible1=true
        },

        // 封禁用户
        handleJin(index, row) {
            // console.log(index, row);
            console.log(row.account)
            let self=this
            if(row.ban==="是"){
                this.$message({
                    type: 'warning',
                    message: '用户已被封禁!',
                });
            }else{
                this.$axios({
                    method:'post',
                    url:'http://127.0.0.1:10520/api/user/getUser',
                    data:{
                        token:'feng',
                        account: row.account,
                        ban:"1",
                    }
                }).then(res=>{
                    console.log(res)
                    switch (res.data) {
                        case 0:
                            this.$message({
                                type: 'success',
                                message: '封禁成功!',
                            });
                            // 重新获取头条
                            // 刷新页面，渲染界面
                            setTimeout(function(){
                                self.getUser()
                            },1000)
                            break

                    }

                }).catch(err=>{
                    this.$message({
                        type: 'warning',
                        message: err
                    });
                })
                // 重新获取头条
                self.getUser()
                // 刷新页面，渲染界面
                location.reload()
            }
        },
        // 解除封禁
        handleUnjin(index,row){
            console.log(index, row);
            console.log(row.account)
            let self=this
            if(row.ban==="否"){
                this.$message({
                    type: 'warning',
                    message: '用户未被封禁!',
                });
            }else {
                this.$axios({
                    method: 'post',
                    url: 'http://127.0.0.1:10520/api/user/getUser',
                    data: {
                        token: 'feng',
                        account: row.account,
                        ban: "0",
                    }
                }).then(res => {
                    console.log(res)
                    switch (res.data){
                        case 0:
                            this.$message({
                                type: 'success',
                                message: '解除封禁成功!',
                            });
                            // 刷新页面，渲染界面
                            setTimeout(function(){
                                self.getUser()
                            },1000)
                            break
                    }

                }).catch(err => {
                    this.$message({
                        type: 'warning',
                        message: err
                    });
                })
            }
        },
        filterTag(value, row) {
            return row.jinyan === value;
        },
        getUser(){
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/getUser',
                data:{
                    token:'all',
                    account:''
                }
            }).then(res=>{
                console.log("user:",res.data)
                this.tableData=res.data
                this.$axios({
                    method:'post',
                    url:'http://127.0.0.1:10520/api/user/getUser',
                    data:{
                        token:'causes',
                        account:''
                    }
                }).then(res=>{
                    for(let i=0;i<this.tableData.length;i++){
                        let b=this.tableData[i].account
                        let c=0
                        b = parseInt(b);
                        for(let n=0;n<res.data.length;n++){
                            // console.log(typeof (res.data[n].account))
                            if(b===res.data[n].account){
                                console.log("1")
                                c=c+1
                            }
                        }
                        this.tableData[i].causes=c
                        if(this.tableData[i].ban=== 1 || this.tableData[i].ban==="1"){
                            this.tableData[i].ban="是"
                        }else{
                            this.tableData[i].ban="否"
                        }
                    }
                    // console.log("userData",this.userData)
                    this.causeData = res.data
                    // console.log(this.causeData)
                    console.log("获取数据成功")
                }).catch(err=>{
                    console.log(err)
                })
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>

</style>