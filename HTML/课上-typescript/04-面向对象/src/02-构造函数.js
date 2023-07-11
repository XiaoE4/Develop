var Dog = /** @class */ (function () {
    // constructor 构造函数，在对象创建时调用
    function Dog(name, age) {
        this.name = name;
        this.age = age;
    }
    Dog.prototype.show = function () {
        console.log("wang!");
        // 在方法中可以通过this来表示当前调用方法的对象
        console.log(this);
    };
    return Dog;
}());
var dog1 = new Dog("旺财", 3);
var dog2 = new Dog("招手", 7);
console.log(dog1);
console.log(dog2);
dog1.show();
//# sourceMappingURL=02-%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0.js.map