// 1.导入 fs 模块，来操作文件
const fs = require('fs')

// 2.调用fs.readFile() 方法读取文件
//    参数1： 读取文件的存放路径
//    参数2： 读取文件是采用的编码格式，一般默认指定 utf8
//    参数3： 回调函数， 拿到读取失败和成功的结果 err dataStr
// fs.readFile('./assets/files/1.txt', 'utf8', function (err, dataStr) {
//     // 如果读取成功，则err的值为null
//     // 如果读取失败，则err的值为错误对象，dataStr的值为 undefined
//     console.log(err)
//     console.log('=====================')
//     console.log(dataStr)
// })

fs.readFile('./assets/files/11.txt', 'utf-8', function (err, dataStr) {
    if (err) {
        return console.log('读取错误:', err.message)
    }
    console.log('success:' + dataStr)
})

