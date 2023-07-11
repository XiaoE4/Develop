// 也可以直接使用字面量进行类型声明
var a;
a = 10;
// 可以使用 | 来连接多个类型（联合类型）
var b;
b = "male";
b = "female";
var c;
c = true;
c = 'hello';
// any 表示的是任意类型，一个变量设置类型为any后相当于对该变量关闭了TS的类型检测
// 使用TS时，不建议使用any类型
// let d: any;
// 声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any （隐式的any）
var d;
d = 10;
d = 'hello';
d = true;
// unknown 表示未知类型的值
var e;
e = 10;
e = "hello";
e = true;
var s;
// d的类型是any，它可以赋值给任意变量
// s = d;
e = 'hello';
// unknown 实际上就是一个类型安全的any
// unknown 类型的变量，不能直接赋值给其他变量
if (typeof e === "string") {
    s = e;
}
// 类型断言，可以用来告诉解析器变量的实际类型
/*
* 语法：
*   变量 as 类型
*   <类型>变量
*
* */
s = e;
s = e;
// void 用来表示空，以函数为例，就表示没有返回值的函数
function fn() {
}
function f1() {
}
// never 表示永远不会返回结果
function fn2() {
    throw new Error('报错了！');
}
//object表示一个js对象
var a2;
a2 = {};
a2 = function () {
};
// {} 用来指定对象中可以包含哪些属性
// 语法：{属性名:属性值,属性名:属性值}
// 在属性名后边加上?，表示属性是可选的
var b2;
b2 = { name: "下头男", age: 18, };
// [propName:string]: any 表示任意类型的属性
var c2;
c2 = { name: "逆天男", age: 20, sex: "man" };
/*
*   设置函数结构的类型声明：
*       语法：(形参:类型, 形参:类型 ...) => 返回值
* */
var d2;
d2 = function (n1, n2) {
    return n1 + n2;
};
// string[] 表示字符串数组
var e2;
e = ['a', 'b', 'c'];
// number[] 表示数组数值
var f2;
var g2;
g2 = [1, 2, 3];
/*
*   元组，元组就是固定长度的数组
*       语法：[类型, 类型, 类型]
* */
var h;
h = ['hello', 123];
/*
* enum 枚举
*
* */
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
})(Gender || (Gender = {}));
var i;
i = {
    name: '张三',
    gender: Gender.Male
};
console.log(i.gender === Gender.Female);
