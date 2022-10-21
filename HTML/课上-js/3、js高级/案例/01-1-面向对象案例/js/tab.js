var that

class TabOpen {
    constructor(id) {
        // this.main
        this.main = document.querySelector(id)
        // 添加按钮
        this.addbtn = this.main.querySelector(".tabadd")
        // li的父系
        this.ul = this.main.querySelector(".firstnav ul")
        // section的父系
        this.fsection = this.main.querySelector(".tabscon")
        // console.log(this.fsection);
        that=this
        console.log("this:",this);
        console.log("that:",that);

        this.init()
    }
    // 运行各个方法
    init() {
        this.render()
        // this.toggleTab()

        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i
            this.lis[i].onclick = this.toggleTab
            this.addbtn.onclick = this.addTab
            this.delbtn[i].onclick = this.removeTab
        }

    }
    // 渲染更新页面
    render() {
        console.log("render.this:", this);
        this.lis = this.main.querySelectorAll("ul li")
        this.sections = this.main.querySelectorAll(".tabscon section")
        this.delbtn = this.main.querySelectorAll(".icon-guanbi")

    }
    // 切换
    toggleTab() {
        that.clearTab()
        this.className="liactive"
        that.sections[this.index].className="conactive"
        console.log(this.index);
    }
    // 清除class
    clearTab(){
        for(let i=0;i<that.lis.length;i++){
            that.lis[i].className=""
            that.sections[i].className=""
        }
    }
    // 添加
    addTab() {
        that.clearTab()
        var random = Math.random();
        let li=`<li class="liactive"><span>测试${that.lis.length+1}</span><span class="iconfont icon-guanbi"></span></li>`
        let section=`<section class="conactive">测试:${random}</section>`
        that.ul.insertAdjacentHTML("beforeend",li)
        that.fsection.insertAdjacentHTML("beforeend",section)

        that.init()
        // 若是that.render()的话，新添加的lis不会被添加index序号，所以只能切换前三个标签，不能切换新添加的标签
        
    }
    // 删除
    removeTab() {
        // console.log(this.index);
        let index=this.parentNode.index
        // console.log(index);
    }


}
let obj = new TabOpen("#tab")
console.log("obj:", obj);
