
var that=this;

class Tab{
    constructor(id){
        that=this;
        // 获取元素
        this.main=document.querySelector(id);
        this.lis=this.main.querySelectorAll('li');
        this.section=this.main.querySelectorAll('section')
        this.add=this.main.querySelector('.tabadd')
        this.ul=this.main.querySelector('.firstnav ul:first-child')
        console.log(this.lis);
        this.init()
    }
    init(){
        this.add.onclick=this.addTab;
        for(let i=0;i<this.lis.length;i++){
            this.lis[i].index=i
            this.lis[i].onclick=this.toggleTab;
        }
    }
    // 1、切换功能
    toggleTab() {
        // console.log(this.index);
        that.clearClass()
        this.className='liactive'
        that.section[this.index].className='conactive'
        console.log(this);
        console.log(that);
    }
    clearClass(){
        for(let i=0;i<this.lis.length;i++){
            this.lis[i].className=''
            that.section[i].className=''
        }
    }
    // 2、添加功能
    addTab() {
        // 1、创建li和section
        var li='<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>'
        // 2、添加到父元素
        that.ul.insertAdjacentHTML('beforeend',li);
    }
    // 3、删除功能
    removeTab() {}
    // 4、修改功能
    editTab() {}


}
new Tab('#tab');
