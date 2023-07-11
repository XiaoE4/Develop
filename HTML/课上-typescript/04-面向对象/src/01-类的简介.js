// 对象主要包含两个部分： 属性、方法
var Person111 = /** @class */ (function () {
    function Person111() {
        this.name = "张三";
    }
    // 如果方法以static开头，方法就是类方法，可以直接通过类去调用
    Person111.prototype.sayHello = function () {
        console.log("hello world!");
    };
    Person111.sayHello2 = function () {
        console.log("hello world!");
    };
    // static 静态属性，不需要实例就可以使用的属性
    // readonly 表示一个只读的属性，它无法被修改
    Person111.age = 18;
    return Person111;
}());
var per = new Person111();
console.log(per);
console.log(per.name);
// static静态属性
console.log(Person111.age);
per.sayHello();
Person111.sayHello2();
//# sourceMappingURL=01-%E7%B1%BB%E7%9A%84%E7%AE%80%E4%BB%8B.js.map