import {ajax,pajax} from  "./util.js"
class todoList {
    constructor(a) {
        // 主属性
        this.main=document.querySelector(a)
        this.catalog=document.querySelector('.list-catalog')
        this.label=document.querySelector('.list-label')
        //清单目录
        this.catalogOne=document.querySelector('.catalog-one')
        //标签
        this.labelBtn=document.querySelector('.list-label a')
        this.labelAddBtm=document.querySelector('.list-label a:nth-child(3)')
        this.labelLi=document.querySelectorAll('.list-label ul li')
        this.labelUl=document.querySelector('.list-label ul')
        this.labelAddInput=document.querySelector('#labelAddInput')
        //    右侧页面清单内容
        this.contentUl=document.querySelector('.list-content')
        this.contentLi=document.querySelectorAll('.content-li')
        // console.log(this.contentLi)
        this.init()
    }
    init(){
        // this.render()
        this.labelOn()
        this.labelAdd()
        this.getData()

    }
//    渲染页面
    render(){
        // console.log(this.labeldata1)
        //添加右侧内容
        this.contentUl.innerHTML=this.listdata1.map(item=>
        `
        <div class="content-li active" data-index="${item.id}">
            ${item.name}
        </div>
        `).join("")
        //添加左侧清单
        let ul=this.catalogOne.childNodes[1]
        // console.log("ul",ul)
        console.log("listdata2:",this.listdata2)
        ul.innerHTML=this.listdata2.map(item=>
        `
        <li><a href="#">${item}</a></li>
        `
        ).join("")
        // console.log(ul.innerHTML)
        //添加左侧标签
        this.labelUl.innerHTML=this.labeldata1.map(item=>
        `
        <li>${item.name}</li>
        `).join("")
        console.log("render()")
        this.contentOn()

    }
    //浮现label标签
    labelOn(){
        let i=0
        this.labelBtn.addEventListener("click",()=>{
            // 点击让标签浮动
           i+=1
            if(i%2){
                this.catalog.style.height='500px'
                this.label.style.height='295px'
                if(this.label.height = '295px'){
                    this.labelUl.style.display='block'
                    this.labelAddBtm.style.display='block'
                    this.labelAddInput.style.display='block'
                }
            }else{
                this.catalog.style.height='750px'
                this.label.style.height='45px'
                if(this.label.height = '45px'){
                    this.labelUl.style.display='none'
                    this.labelAddBtm.style.display='none'
                    this.labelAddInput.style.display='none'
                }
            }
        })
        console.log("labelOn()")
    }
    //添加label标签
    labelAdd(){
        this.labelAddBtm.addEventListener("click",()=>{
            this.labelAddInput.style.display='block'
            let n =this.labelLi.length
            console.log(this.labelUl)
            // console.log(this.labelAddInput.value)
            let li =document.createElement('li')
            li.innerHTML=`<li>${this.labelAddInput.value}</li>`
            console.log(li.innerText)
            if(li.innerText.length!==0){
                this.labelUl.appendChild(li)
            }else{
                alert('请输入标签名')
            }
        })
    }
    // 获取数据
    getData(){
       // 获取清单数据
       pajax({
           url:"http://localhost:3000/lists",
           method:"GET",
       }).then(list=>{
           this.listdata1=list
           console.log("listdata1:",this.listdata1)
           //左侧清单去重
           var hash=[];
           for (let i = 0; i < list.length; i++) {
               if(hash.indexOf(list[i].list)===-1){
                   hash.push(list[i].list);
                   // console.log("hash:",hash)
               }
           }
           this.listdata2=hash
           // console.log(this.listdata2)
           return hash;
       })
        //获取标签数据
        pajax({
            url:"http://localhost:3000/label",
            method:"GET"
        }).then(label=>{
            this.labeldata1=label
            console.log("labeldata1:",this.labeldata1)
            this.render()
        }).catch(err=>{
            console.log("err:",err)
        })
        console.log("getData()")
    }

    // 标签写入数据
    // insertLabel(){
    //
    //     pajax({
    //         url:"http://localhost:3000/label",
    //         method:""
    //     })
    // }

    // 右侧内容栏显示
    contentOn(){
        // let add=document.getElementById('catalog1')
        // console.log(add)
        //
        // let lis2=add.getElementsByTagName('a')
        // console.log(typeof lis2)
        // console.log(lis2[1].innerText)

        let ul=this.catalogOne.childNodes[1]
        console.log("ul:",ul)
        let a=ul.getElementsByTagName('a')
        console.log("a:",a[0].innerText)
        console.log(a.length)
        let lis=ul.getElementsByTagName('li')
        console.log(lis)
        console.log(lis[1])
        console.log(this.contentUl.children)
        // console.log(lis[1])
        // console.log(this.contentUl.children)
        let lis2=this.contentUl.getElementsByClassName('content-li')
        console.log(lis2[1])
        console.log(lis2[1].dataset.index)
        console.log(this.listdata1)
        console.log(this)
        let that=this

        //////// error:Cannot read properties of undefined (reading '0')
        //////// at a.<computed>.onclick
        for(let i=0;i<a.length;i++){
            a[i].onclick=function(){
                //渲染前先把内容全部隐藏
                //以黄色感叹警示输出
                console.warn("数据已清除")
                for(let i=0;i<lis2.length;i++){
                    lis2[i].className='content-li'
                }
               // 渲染数据到右侧内容栏
               for(let n=0;n<=a.length;n++){
                   // console.log(n)
                   // console.log(that)
                   if(a[i].innerText === that.listdata1[n].list){
                       console.log("n:",n)
                       console.log(that.listdata1[n].list)
                       console.log(a[i].innerText)
                       if(that.listdata1[n].list === a[i].innerText){
                           console.log(`已写入第${n}个数据到右侧内容栏`)
                           lis2[n].className='content-li active'
                           // if(that.listdata1[n].id === lis2[0].dataset.index){
                           //     lis2[0].className='content-li active'
                           // }
                       }
                   }
               }
            }
        }
        console.log("contentOn()")
    }




}
let obj =new todoList(".right-todo")
console.log('obj:',obj)