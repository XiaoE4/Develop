class Dog {
    name:string;
    age:number;
    // constructor 构造函数，在对象创建时调用
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    show() {
        console.log("wang!")
        // 在方法中可以通过this来表示当前调用方法的对象
        console.log(this)
    }
}

const dog1 = new Dog("旺财", 3)
const dog2 = new Dog("招手", 7)
console.log(dog1)
console.log(dog2)
dog1.show()