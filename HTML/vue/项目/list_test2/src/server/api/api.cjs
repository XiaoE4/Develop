const models=require('../db/index.cjs');
const express=require('express');
const router = express.Router();
const mysql =require('mysql');
const $sql = require('../db/sqlMap.cjs');

const conn = mysql.createConnection(models.mysql);
conn.connect();

// 登录接口
router.get('/', function (req, res) {
    console.log("主页 GET 请求");
    // const user=req.body
    res.send('Hello GET');
    // console.log(user)
    // res.send(user)
})


// 获取用户的清单菜单
router.post('/list/all',(req,res)=>{
    let data = req.body;
    let sql_list = $sql.list.getList;
    conn.query(sql_list,data.userId,(err,rst)=>{
        if(err){throw new err}else{
            res.send(rst)
        }
    })
})
router.post('/list/content',(req,res)=>{
    let data = req.body;
    // let
})



module.exports = router