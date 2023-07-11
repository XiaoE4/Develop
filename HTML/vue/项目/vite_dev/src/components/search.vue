<template>
    <div class="layout_header">
        <div class="layout_header_main">
            <div class="left">
                <div class="logo">
                    <img src="https://test.nttcc.com.cn/_nuxt/img/logo_1.e54ae31.png" alt="">
                    <h1>共创云</h1>
                </div>
                <div class="mid_nav">
                    <a href="https://test.nttcc.com.cn/resource-search?tab=1">服务产品</a>
                    <a href="https://test.nttcc.com.cn/resource-search?tab=2">科创需求</a>
                    <a href="https://test.nttcc.com.cn/resource-search?tab=3">专利论文</a>
                    <a href="https://test.nttcc.com.cn/data">交易大数据</a>
                </div>
            </div>
            <div class="right">
                <el-button type="primary">登录</el-button>
                <el-button type="primary" plain>注册</el-button>
            </div>
        </div>

    </div>
    <div class="content">
        <div class="panel_header">
            <div class="title_box">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVCAYAAABc6S4mAAAABHNCSVQICAgIfAhkiAAAAUhJREFUOE/tlL9Kw1AYxc9JCyIodLKLID5Bi6MI/kFdipgOtmP7JtY3SUd1aKR1UdEO4ijtE4jgUqeCgghJjyRaiMQ0qVJcmuly8/vOuTn3y0ckeMyGMjPpQUVE1cMpWO+OUbeL7MeVcxRQasoE3ApJ8ydOkk0jZR0XeBalEzI4OFeeGlQgVElk4k7ovZfQB2GJRv20wE6wxjcIRkAgn0Q0ihHQCUbIcsuxAe7/RTTSzIuw3HI1CfGhZugOSk23RuLwK9ujk71UzVuPux8yuO4pR8C8un8rPvWcnN+OjvvIgR58M4PLSqeWRu0vZtPd7ZXZhgB7K8uuzw6dbp7ldY51cfuCy7vXX6W2szqH3bV5T7W6ucD61CAU4zSi2M7634gm/qMNv3/ckRDFfxsVQSg26ISABH+O8VNc6wA3EtYmxNQW2Z74uP4A+kAQbn8IYmUAAAAASUVORK5CYII=" alt="">
                <p>资源大厅</p>
            </div>
            <div class="search_box">
                <div class="input_box">
                    <el-input
                        style="height: 40px;width: 447px;"
                        v-model="input" placeholder="请输入资源名称或用户名搜索" />
                    <el-button
                        style="height: 40px;width: 93px;border-radius: 0"
                        type="primary" :icon="Search">搜索</el-button>
                </div>
            </div>
        </div>
<!--        <el-tabs v-model="activeName" class="panel_tabs" @tab-click="handleClick">-->
<!--            <el-tab-pane label="服务" name="first" class="tabs_item" style="width: 28px;height: 20px;padding: 14px 6px;margin-right: 120px;"></el-tab-pane>-->
<!--            <el-tab-pane label="需求" name="second" class="tabs_item"></el-tab-pane>-->
<!--            <el-tab-pane label="科创资源" name="third" class="tabs_item"></el-tab-pane>-->
<!--        </el-tabs>-->
        <div class="panel_tabs">
            <div class="tabs_item active">服务</div>
            <div class="tabs_item ">需求</div>
            <div class="tabs_item">科创资源</div>
        </div>
        <div class="panel_main">
            <div class="demo-collapse">
                <el-collapse accordion>
                    <el-collapse-item name="1">
                        <template #title>
                            Consistency<el-icon class="header-icon">
                            <info-filled />
                        </el-icon>
                        </template>
                        <div>
                            Consistent with real life: in line with the process and logic of real
                            life, and comply with languages and habits that the users are used to;
                        </div>
                        <div>
                            Consistent within interface: all elements should be consistent, such
                            as: design style, icons and texts, position of elements, etc.
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="Feedback" name="2">
                        <div>
                            Operation feedback: enable the users to clearly perceive their
                            operations by style updates and interactive effects;
                        </div>
                        <div>
                            Visual feedback: reflect current state by updating or rearranging
                            elements of the page.
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="Efficiency" name="3">
                        <div>
                            Simplify the process: keep operating process simple and intuitive;
                        </div>
                        <div>
                            Definite and clear: enunciate your intentions clearly so that the
                            users can quickly understand and make decisions;
                        </div>
                        <div>
                            Easy to identify: the interface should be straightforward, which helps
                            the users to identify and frees them from memorizing and recalling.
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="Controllability" name="4">
                        <div>
                            Decision making: giving advices about operations is acceptable, but do
                            not make decisions for the users;
                        </div>
                        <div>
                            Controlled consequences: users should be granted the freedom to
                            operate, including canceling, aborting or terminating current
                            operation.
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <div class="panel_pagination">
            <el-table :data="tableData" border style="width: 1140px" height="800"
                      :row-style="{height:'80px',padding:'0 20px',marginBottom:'10px'}"
                      :cell-style="{padding:'0 auto'}"
                      show-header:false
            >
                <el-table-column prop="date" label="服务名称" width="300" />
                <el-table-column prop="date" label="发布用户" width="300" />
                <el-table-column prop="name" label="服务类型" width="240" />
                <el-table-column prop="name" label="成功成交数" width="150" />
                <el-table-column prop="name" label="信用评价" width="150" />
            </el-table>
        </div>
    </div>
</template>
<!--<script lang="ts" setup>-->
// import { ref } from 'vue'
// import type { TabsPaneContext } from 'element-plus'
// import { Search } from '@element-plus/icons-vue'

// const activeName = ref('first')

// const handleClick = (tab: TabsPaneContext, event: Event) => {
//     console.log(tab, event)
// }
<!--</script>-->

<script setup>
const tableData =[
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }
]
</script>
<script>
    import {ref} from 'vue'
    import {InfoFilled, Search} from '@element-plus/icons-vue'

    export default {
        name:'search',
        components: {InfoFilled},
        setup(){
            const input =ref('')

            return {
                input,
                Search,
                InfoFilled,

            }

        }

    }

</script>

<style>
@import "../assets/css/search.css";

</style>