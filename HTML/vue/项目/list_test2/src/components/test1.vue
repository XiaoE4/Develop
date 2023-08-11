<template>
    <el-row class="tac" v-loading="menuLoading">
        <el-col :span="300">
            <el-menu
                default-active="0"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"
            >
                <div  v-for="menu in menuDataShow_1" :key="menu.data.id" >
                    <el-menu-item  :index="menu.data.index" v-if="!menu.son.length">
                        <el-icon>
                            <List/>
                        </el-icon>
                        <span>{{ menu.data.text }}</span>
                    </el-menu-item>
                    <el-sub-menu :index="menu.data.index" v-else>
                        <template #title>
                            <el-icon >
                                <List/>
                            </el-icon>
                            <span>{{ menu.data.text }}</span>
                        </template>
                        <el-menu-item v-for="son in menu.son" :key="son.id" :index="son.index">
                            <el-icon>
                                <icon-menu/>
                            </el-icon>
                            <span>{{son.text}}</span>
                        </el-menu-item>
                    </el-sub-menu>
                </div>
            </el-menu>
        </el-col>
        <div class="tagAdd" >
            <div class="tagAddButton" @click="drawer = true">
                <text>我的标签</text>
            </div>
<!--            点击我的标签后的左侧抽屉-->
            <el-drawer v-model="drawer" title="标签管理" direction="ltr" class="tagDrawer">
                <div class="tagItem">
                    <div class="tagItemLeft">
                        <el-icon :size="20"   color="red"><Management /></el-icon>
                        <span>标签1</span>
                    </div>
                    <div class="tagItemRight">
                        <el-icon :size="20" color="gray"><More /></el-icon>
                    </div>
                </div>
                <div class="tagItem" @click="dialogVisible = true">
                    <el-icon :size="20" ><Plus /></el-icon>
                    <span style="margin-left: 10px;line-height: 40px;">添加标签</span>
                </div>
<!--                点击添加标签后的弹出框-->
                <el-dialog
                    v-model="dialogVisible"
                    title="Tips"
                    width="800px"
                    :before-close="handleCloseDialog"
                >
                        <el-form :model="form" label-width="200px">
                            <el-form-item label="Activity name">
                                <el-input v-model="form.name" />
                            </el-form-item>
                            <el-form-item label="Activity color">
                                <el-color-picker v-model="form.color" size="large" :predefine="predefineColors" />
                            </el-form-item>
                        </el-form>
<!--                    <div class="m-4">-->
<!--                        <p>Child options expand when clicked (default)</p>-->
<!--                        <el-cascader v-model="value" :options="options" @change="handleCascaderChange" />-->
<!--                    </div>-->
                    <template #footer>
                              <span class="dialog-footer">
                                <el-button @click="handleDialogCancel()">Cancel</el-button>
                                <el-button type="primary" @click="handleDialogConfirm()">
                                  Confirm
                                </el-button>
                              </span>
                    </template>
                </el-dialog>
            </el-drawer>
        </div>
    </el-row>
    <div class="contentContainer">
<!--        顶部的功能栏-->
        <div class="contentTop"></div>
<!--        下面的内容栏-->
        <div class="contentShow" v-loading="contentLoading">
            <div class="contentItemAll">
                <div class="contentItem" v-for="content in contentShow" :key="content.id">
                    <text style="color: red;font-size: 40px">{{ content.content }}</text>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import {Document, List,  Menu as IconMenu, Setting} from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'
import {onMounted, ref, reactive} from 'vue'
import request from "../utils/request.ts";

// 添加标签
let form = reactive({
    "name":'',
    "color":'',
})
let menuDataShow_1 = ref([])    // 父级菜单
let indexShow = ref('')         // 点击的menu标识
let contentAll=ref([])          // 全部内容
let contentShow =ref([])        // 将要显示的内容
let menuLoading = ref(true)
let contentLoading = ref(true)
let drawer = ref(false)
let value = ref([])
const dialogVisible = ref(false)
let predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
])


onMounted(async () => {
    // 获取菜单信息
    let menuData = await getListMenu()
    menuLoading.value = false
    // 获取内容信息
    let contentData = await getListContent()
    // setTimeout(function(){
        contentLoading.value = false
    // },2000)

    console.log("menuData:", menuData)
    console.log("contentData:",contentData)
    contentAll.value = contentData
    // menuDataShow.value = menuData
    // 渲染list菜单数据
    showListMenu(menuData)
    // 渲染菜单index下的内容
    indexShow.value="0"
    showListContent(indexShow.value)
})

// const activeNames = ref(['1'])
// const handleChange = (val: string[]) => {
//     console.log(val)
// }

// 渲染list菜单数据
let showListMenu = (data:object) => {
    // 获取菜单数据
    // let data = menuDataShow.value
    console.log("传递的菜单数据：",data)

    let secondData = data.filter((currentValue: any) => {
        return currentValue.index.charAt(1) === "-"
    })
    // 所有的子级菜单
    console.log(secondData)

    // 父级菜单的index
    let firstData:any[]=[]
    for(let i=0;i<data.length;i++){
        if(data[i].index.charAt(1)!=="-"){
            let add = {
                "data":data[i],
                "son":[]
            }
            firstData.push(add)
        }
    }
    console.log(firstData)

    for(let i=0;i<firstData.length;i++){
        for(let n=0;n<secondData.length;n++){
            if(!secondData){
                return
            }
            if(secondData[n].index.charAt(0)===firstData[i].data.index){
                // 添加到父元素
                console.log("执行添加")
                let thisData = firstData[i]
                thisData.son.push(secondData[n])
                // 删除子元素内的数据
                secondData.slice(0,n+1);
            }
        }
    }
    console.log("父元素：",firstData)
    console.log("子元素：",secondData)
    menuDataShow_1.value = firstData
    console.log(menuDataShow_1.value)
}
// 获取该下标菜单下的内容   index:menu的index
let showListContent = (index:string)=>{
    contentShow.value=[]
    let data = contentAll.value
    if(index=="0"){
    //     获取全部的内容
        contentShow.value = data
    }else{
        // 获取单个menu下的内容
        for(let i=0;i<data.length;i++){
            if(data[i].index == index){
                contentShow.value.push(data[i])
                console.log("相等",data[i],contentShow.value)
            }else{
                contentShow.value.push()
            }
        }
    }
}
// 点击“添加标签”后 展示标签内容和添加标签按钮


// Element-PLUS 组件函数  ↓↓↓↓↓↓↓↓
// 点击
const handleCloseDialog = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}
// 点击弹出窗的 “取消” 按钮后
let handleDialogCancel = ()=>{
    // 清空form里的数据，然后关闭弹窗
    dialogVisible.value = false
    form.name = '';
    form.color ='';
}
// 点击弹出窗的 “确认” 按钮后
let handleDialogConfirm = ()=>{
    // 将标签信息保存到库内；之后关闭弹窗 ；弹出成功通知
    dialogVisible.value = false

}

// const props = {
//     expandTrigger: 'hover' as const,
// }
// const handleCascaderChange = (value:any) => {
//     console.log(value)
// }
const handleOpen = (key: string, keyPath: string[]) => {
    console.log("key,keyPath:", key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleSelect = (index: string, indexPath: string[]) => {
    console.log("index,indexPath:", index, indexPath)
    indexShow.value = index
    // 获取清单的下标并储存
    showListContent(index)
    // getListContent()
}

// Axios获取数据   ↓↓↓↓↓↓

// 获取清单下的内容
const getListContent = async () => {
    return await request('http://localhost:3000/content')
}
// 获取清单菜单
const getListMenu = async () => {
    // console.log(data)
    return await request('http://localhost:3000/menu')
}


const options = [
    {
        value: 'guide',
        label: 'Guide',
        children: [
            {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                    {
                        value: 'consistency',
                        label: 'Consistency',
                    },
                    {
                        value: 'feedback',
                        label: 'Feedback',
                    },
                    {
                        value: 'efficiency',
                        label: 'Efficiency',
                    },
                    {
                        value: 'controllability',
                        label: 'Controllability',
                    },
                ],
            },
            {
                value: 'navigation',
                label: 'Navigation',
                children: [
                    {
                        value: 'side nav',
                        label: 'Side Navigation',
                    },
                    {
                        value: 'top nav',
                        label: 'Top Navigation',
                    },
                ],
            },
        ],
    },
    {
        value: 'component',
        label: 'Component',
        children: [
            {
                value: 'basic',
                label: 'Basic',
                children: [
                    {
                        value: 'layout',
                        label: 'Layout',
                    },
                    {
                        value: 'color',
                        label: 'Color',
                    },
                    {
                        value: 'typography',
                        label: 'Typography',
                    },
                    {
                        value: 'icon',
                        label: 'Icon',
                    },
                    {
                        value: 'button',
                        label: 'Button',
                    },
                ],
            },
            {
                value: 'form',
                label: 'Form',
                children: [
                    {
                        value: 'radio',
                        label: 'Radio',
                    },
                    {
                        value: 'checkbox',
                        label: 'Checkbox',
                    },
                    {
                        value: 'input',
                        label: 'Input',
                    },
                    {
                        value: 'input-number',
                        label: 'InputNumber',
                    },
                    {
                        value: 'select',
                        label: 'Select',
                    },
                    {
                        value: 'cascader',
                        label: 'Cascader',
                    },
                    {
                        value: 'switch',
                        label: 'Switch',
                    },
                    {
                        value: 'slider',
                        label: 'Slider',
                    },
                    {
                        value: 'time-picker',
                        label: 'TimePicker',
                    },
                    {
                        value: 'date-picker',
                        label: 'DatePicker',
                    },
                    {
                        value: 'datetime-picker',
                        label: 'DateTimePicker',
                    },
                    {
                        value: 'upload',
                        label: 'Upload',
                    },
                    {
                        value: 'rate',
                        label: 'Rate',
                    },
                    {
                        value: 'form',
                        label: 'Form',
                    },
                ],
            },
            {
                value: 'data',
                label: 'Data',
                children: [
                    {
                        value: 'table',
                        label: 'Table',
                    },
                    {
                        value: 'tag',
                        label: 'Tag',
                    },
                    {
                        value: 'progress',
                        label: 'Progress',
                    },
                    {
                        value: 'tree',
                        label: 'Tree',
                    },
                    {
                        value: 'pagination',
                        label: 'Pagination',
                    },
                    {
                        value: 'badge',
                        label: 'Badge',
                    },
                ],
            },
            {
                value: 'notice',
                label: 'Notice',
                children: [
                    {
                        value: 'alert',
                        label: 'Alert',
                    },
                    {
                        value: 'loading',
                        label: 'Loading',
                    },
                    {
                        value: 'message',
                        label: 'Message',
                    },
                    {
                        value: 'message-box',
                        label: 'MessageBox',
                    },
                    {
                        value: 'notification',
                        label: 'Notification',
                    },
                ],
            },
            {
                value: 'navigation',
                label: 'Navigation',
                children: [
                    {
                        value: 'menu',
                        label: 'Menu',
                    },
                    {
                        value: 'tabs',
                        label: 'Tabs',
                    },
                    {
                        value: 'breadcrumb',
                        label: 'Breadcrumb',
                    },
                    {
                        value: 'dropdown',
                        label: 'Dropdown',
                    },
                    {
                        value: 'steps',
                        label: 'Steps',
                    },
                ],
            },
            {
                value: 'others',
                label: 'Others',
                children: [
                    {
                        value: 'dialog',
                        label: 'Dialog',
                    },
                    {
                        value: 'tooltip',
                        label: 'Tooltip',
                    },
                    {
                        value: 'popover',
                        label: 'Popover',
                    },
                    {
                        value: 'card',
                        label: 'Card',
                    },
                    {
                        value: 'carousel',
                        label: 'Carousel',
                    },
                    {
                        value: 'collapse',
                        label: 'Collapse',
                    },
                ],
            },
        ],
    },
    {
        value: 'resource',
        label: 'Resource',
        children: [
            {
                value: 'axure',
                label: 'Axure Components',
            },
            {
                value: 'sketch',
                label: 'Sketch Templates',
            },
            {
                value: 'docs',
                label: 'Design Documentation',
            },
        ],
    },
    ]

</script>

<style>
.tac {
    position: relative;
    float: left;
    height: 500px;
    background-color: #ffffff;
    user-select: none;
    width: 200px;
}
.tagAdd{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background-color: rgba(46, 204, 113, 0.5);
    transition: background-color .5s;
}
.tagAdd:hover{
    background-color: rgba(255, 0, 0, 0.5);
}
.tagDrawer .tagItem{
    display: flex;
    line-height: 40px;
    width: 300px;
    height: 40px;
    margin: auto;
    margin-bottom: 10px;
    border-radius: 10px;
    transition: background-color .5s;
}
.tagDrawer .tagItem:hover{
    background-color: rgba(116, 123, 255, 0.3);
}
.tagDrawer .tagItem i{
    height: 40px;
    width: 40px;
}
.tagDrawer .tagItem .tagItemLeft{
    width: 260px;
    float: left;
    display: flex;
}
.tagDrawer .tagItem .tagItemLeft span{
    margin-left: 20px;
}
.tagDrawer .tagItem .tagItemRight{
    float: right;
}
.tagDrawer .tagItem .tagItemRight i{
    transition: color .3s;
}
.tagDrawer .tagItem .tagItemRight i:hover{
    color: red;
}


.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    //height: 100vh;
}
.contentContainer{
    float: right;
    //width: calc(100vw - 10vw - 240px);
    //height: calc(100vh - 40px);
}
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>