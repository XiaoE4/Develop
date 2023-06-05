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
                  <el-tag type="info" v-if="scope.row.Cpic && scope.row.content">普通</el-tag>
                  <el-tag type="success" v-if="!scope.row.content && scope.row.Cpic">图片</el-tag>
                  <el-tag v-if="!scope.row.Cpic && scope.row.title && !scope.row.video">长文章</el-tag>
                  <el-tag type="danger" v-if="scope.row.video">视频</el-tag>
              </template>
          </el-table-column>
          <el-table-column
                  label="封面"
                  prop="Cpic"
                  width="180">
              <template slot-scope="scope" v-if="scope.row.Cpic">
                  <div v-for="c in scope.row.Cpic" :key="c" >
                      <img :src="require('../assets/pic-content/'+ c +'.jpg')" alt="" id="root_pic">
                  </div>
              </template>
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
                  <p  v-html="scope.row.content" v-if="scope.row.content" id="root_content"></p>
                  <video :src="require('../assets/video/' + scope.row.video + '.mp4')"
                         v-if="scope.row.video"
                         id="root_video"
                  ></video>
                  <div v-for="c in scope.row.Cpic" :key="c"  >
                      <img :src="require('../assets/pic-content/'+ c +'.jpg')" alt="" id="root_pic" v-if="scope.row.Cpic.length>=2">
                  </div>
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
                          @click="handleDelete(scope.$index, scope.row)">移除</el-button>
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
                       style="margin-top: 30px;">
        </el-pagination>
    </div>

</template>

<script>

export default {
    name: "Admin_Toutiao",
    data(){
        return{
            loading:true,
            tableData: [],
            currentPage: 1, // 当前页码
            total: '', // 总条数
            pageSize: 5 // 每页的数据条数 ,默认10条
        }
    },
    mounted() {
        this.getTop()
    },
    computed:{
        // article(){
        //     return this.$store.state.allArticle
        // },
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
        // 删除数据
        handleDelete(index, row) {
            console.log(index, row);
            let self=this
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                self.$axios({
                    method:'post',
                    url:'http://127.0.0.1:10520/api/user/top',
                    data:{
                        token:'delect',
                        Tno: row.Tno,
                    }
                }).then(res=>{
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });
                    // 重新获取头条
                    self.getTop()
                    // 刷新页面，渲染界面
                    // location.reload()
                }).catch(err=>{
                    this.$message({
                        type: 'warning',
                        message: err
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });


        },
        // 获取头条
        getTop(){
            let self=this
            this.$axios({
                method:'post',
                url:'http://127.0.0.1:10520/api/user/top',
                data:{
                    token:'get',
                }
            }).then(res=>{
                console.log("获取头条：",res.data)
                for(let i =0;i<res.data.length;i++){
                    res.data[i].date=new Date(res.data[i].date).toLocaleDateString().replace(/\//g,"-")
                    if(res.data[i].Cpic){
                        res.data[i].Cpic = res.data[i].Cpic.split(',') || res.data[i].Cpic
                    }
                        self.tableData.push(res.data[i])
                }
                console.log(res.data)
                self.tableData=res.data
            }).catch((err=>{
                console.log(err)
            }))
        }
    }
}
</script>

<style scoped>

</style>