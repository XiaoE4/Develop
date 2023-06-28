// 对象主要包含两个部分： 属性、方法
class Person111 {
    name: string = "张三";
    // static 静态属性，不需要实例就可以使用的属性
    // readonly 表示一个只读的属性，它无法被修改
    static age: number = 18;
    


    // 如果方法以static开头，方法就是类方法，可以直接通过类去调用
    sayHello(){
        console.log("hello world!")
    }
    static sayHello2(){
        console.log("hello world!")
    }
}

let per = new Person111()

console.log(per)
console.log(per.name)
// static静态属性
console.log(Person111.age)

per.sayHello()
Person111.sayHello2()

