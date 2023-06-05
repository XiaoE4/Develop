<template>
    <el-table
        :data="tableData"
        style="width: 80%;margin: auto"
        :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column
            label="日期"
            prop="date"
            width="180"
            sortable>
        </el-table-column>
        <el-table-column
            label="标题"
            prop="title"
            width="180">
        </el-table-column>
        <el-table-column
            prop="content"
            label="内容">
            <template slot-scope="scope">
                <p  v-html="scope.row.content" id="root_content"></p>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: "Article_unsave",
    data(){
        return{
            tableData: []
        }
    },
    mounted() {
        this.getUnsave()
    },
    methods:{
        show(a,b){
            console.log(a)
            console.log(b)
        },
        show2(a){
            console.log(a)
        },
        rowClick(row, column, event){
            console.log(row,column,event)
        },

        // 点击编辑就跳转到富文本编辑器内，且传递参数为题目和内容。
        handleEdit(index, row) {
            // index:第几行   row:这一行的数据
            console.log(index, row, row.Cno);
            this.$router.push({
                path:'/ArticleWriting',
                query:{
                    title:row.title,
                    content:row.content,
                    Cno:row.Cno,
                    account:this.$route.query.account,
                }
            })
        },

        // 点击删除则会删除草稿箱内的对应草稿
        handleDelete(index, row) {
            console.log(index, row);
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/draft',
                data:{
                    token: 'delete',
                    Cno: row.Cno,
                }
            }).then(res=>{
                switch (res.data) {
                    case 0:
                        this.$message.success("删除成功！")
                        // this.getUnsave()

                        // 一秒后刷新界面
                        setTimeout(function(){
                            location.reload()
                        },1000)

                        break
                }

            }).catch(err=>{
                console.log(err)
            })

        },
        // 获取草稿
        getUnsave(){
            let acc=this.$route.query.account
            console.log(acc)
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/draft',
                data:{
                    token:'get',
                    account:acc,
                }
            }).then(res=>{
                console.log(res.data)
                for(let i=0;i<res.data.length;i++){
                    res.data[i].date=new Date(res.data[i].date).toLocaleDateString().replace(/\//g,"-")
                }
                this.tableData = res.data
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>



</style>