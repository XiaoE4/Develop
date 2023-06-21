// 导入fs模块
const fs = require ('fs')

fs.readFile('./assets/files/成绩.txt','utf8',function(err,rst){
    if(err){return err.message}
    // console.log('results:','\n',rst)
    console.log('results:\n ',rst)

    let arrOld = rst.split(' ')
    console.log(arrOld)
    let arrNew = []
    arrOld.forEach(item=>{
        arrNew.push(item.replace('=',':'))
    })
    arrNew = arrNew.join('\r\n')
    console.log(arrNew)
})
