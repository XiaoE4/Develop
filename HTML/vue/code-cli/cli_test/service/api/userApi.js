const models=require('../db/db');
const express=require('express');
const router = express.Router();
const mysql =require('mysql');
const $sql = require('../db/sqlMap');

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

router.post('/login',(req,res)=>{
    let user = req.body;
    const sel_account = $sql.user.selectUser + " where account = '" + user.account + "'";
    console.log(sel_account);
    // console.log("user.email",user.email)
    conn.query(sel_account, user.account, (error, results)=>{
        if (error) {
            throw new error;
        }
        console.log("results:",results)
        if (results[0] === undefined) {
            res.send("-1");  // -1 表示查询不到，用户不存在，即邮箱填写错误
        } else{
            if (results[0].account === user.account && results[0].password === user.password) {
                res.send("0");  // 0 表示用户存在并且邮箱密码正确
            } else{
                res.send("1");  // 1 表示用户存在，但密码不正确
            }
        }
    })
});

// 注册接口,先验证是否是新账户，不录入数据库
router.post('/register', (req, res) => {
    let params = req.body;
    const sel_sql = $sql.user.selectUser + " where account = '" + params.account + "'";
    const sel_user_account=$sql.user.selectUser_account + " where account = '" + params.account + "'";
    const addUser =$sql.user.addUser
    const addUserAccount=$sql.user.addUser_account
    // const add_sql = $sql.user.add;
    console.log(sel_sql);

    conn.query(sel_user_account,params.account,(error,results) =>{
        if(error){
            throw new error;
        }
        if(results.length !==0 && params.account ===results[0].account){
            res.send("-1");
        }else {
            // 是否添加到数据库
            if(params.submit===0){
                // 不添加只是验证
                res.send("0")
            }else if(params.submit===1){
            //     添加账号到数据库
                conn.query(addUser,[params.account,params.username],(err,rst)=>{
                    if (err) {
                        console.log('addUser ERROR:'+err);
                    }else{
                        console.log("addUser:",rst)
                    }
                })
                conn.query(addUserAccount,[params.account,params.username,params.sex,params.date,params.pic],(err,rst)=>{
                    if (err) {
                        console.log('addUserAccount ERROR:'+err);
                    } else{
                        console.log("addUserAccount:",rst);
                        res.send("1"); // 0 表示用户创建成功
                    }
                })

            }
        }
    })
});

// 获取用户信息接口，主页面使用
router.post('/getUser',(req,res)=>{
    let params= req.body;
    let user =$sql.get.user +"where account = '" +params.account+"'";
    let userAll=$sql.get.user;
    let causes = $sql.get.causes;
    let jin=$sql.get.jin + "set jinyan='" + params.jin + "' where account= '"+params.account+"'"
    let ban=$sql.get.jin + "set ban='" + params.ban + "' where account= '"+params.account+"'"
    let fan=$sql.get.fan
    let guan=$sql.get.guan

    // 获取所有用户数据
    if(params.token==="all"){
        conn.query(userAll,(err,rst)=>{
            if(err){throw new err}else{
                res.send(rst)
            }
        })
    }
    // 获取当前用户信息
    else if(params.token==="user"){
        conn.query(user,params.account,(err,rst)=>{
            if(err){throw new err}else{
                // 输出结果第一行不存在
                if (rst[0] === undefined) {
                    res.send("-1");  // -1 表示查询不到，用户不存在
                }else{
                    res.send(rst[0])
                }
            }
        })
    }
    // 获取被删除原因
    else if(params.token==="causes"){
        conn.query(causes,(err,rst)=>{
            if(err){throw new err}else{
                res.send(rst)
            }
        })
    }
    // 修改是否被禁言
    else if(params.token==="jin"){
        conn.query(jin,(err,rst)=>{
            if(err){throw new err}else{
                console.log(rst)
                res.send("0")
            }
        })
    }
    // 修改是否被封禁
    else if(params.token==="feng"){
        conn.query(ban,(err,rst)=>{
            if(err){throw new err}else{
                console.log(rst)
                res.send("0")
            }
        })
    }
    // 查看粉丝
    else if(params.token==="fan"){
        conn.query(fan,params.account,(err,rst)=>{
            if(err){throw new err}else{
                res.send(rst)
            }
        })
    }
    // 查看关注
    else if(params.token==="guan"){
        conn.query(guan,params.account,(err,rst)=>{
            if(err){throw new err}else{
                res.send(rst)
            }
        })
    }
})

// 获取全部文章接口
router.post('/getArticle',(req,res)=>{
    let params=req.body;
    // 所有文章
    let article1= $sql.get.article
    let article2 = $sql.get.article + "&& a.account= '" + params.account +"'"
    // 单一用户文章
    // let article2=$sql.get.article +" && u.account= '" +params + "'";
    console.log("params:",params)
    // 如果是获取全部文章
    if(params.account==='all'){
        conn.query(article1,(err,rst)=>{
            if(err){throw new err}else{
                res.send(rst)
            }
        })
    }else{
        // 获取一个用户的文章
        conn.query(article2,params.account,(err,rst2)=>{
            if(err){throw new err}else{
                res.send(rst2)
            }
        })
    }
})

// 获取头条文章
router.post('/top',(req,res)=>{
    let params = req.body;
    let top= $sql.get.top;
    let deArticle = $sql.get.delete;
    let insertTou=$sql.root.insertTou + "values('" +params.article_Cno + "');"
    let insertTOu2 = $sql.root.insertTou2
    console.log("params-token:",params.token)
    console.log("params-data:",params.data)
    if(params.token==="get"){
        conn.query(top,(err,rst)=>{
            if(err){throw new err}else{
                console.log("成功：top---"+params.token)
                res.send(rst)
            }
        })
    }else if(params.token==="delect"){
        conn.query(deArticle,params.Tno,(err,rst)=>{
            if(err){throw new err}else{
                console.log("成功：top---",params.token)
                res.send(rst)
            }
        })
    }else if(params.token==="insert"){
        conn.query(insertTOu2,params.article_Cno,(err,rst)=>{
            if(err){throw new err}else{
                    // 头条表未含此博客
                if(rst.length===0 || !rst){
                    conn.query(insertTou,(err,rst)=>{
                        if(err){throw new err}else{
                            console.log(rst)
                        }
                    })
                    res.send("0")
                }else{
                    // 头条表已含有此博客
                    res.send("1")
                }
            }
        })

    }
})
// 文章功能接口
router.post('/Article',(req,res)=>{
    let params=req.body;
    let delArticle = $sql.root.delArticle;
    let delReason=$sql.root.delReason + " values('" + params.account + "','" + params.cause +" ',' "+params.date+ "');"
    let zan =$sql.user.click.zan
    let cang = $sql.user.click.cang
    // let cang2=$sql.user.click.cang2
    let updCang= $sql.user.click.updCang
    let updCang2= $sql.user.click.updCang2
    let isCang=$sql.get.cang2 + "&& c.Cno='"+params.Cno +"'"
    let get=$sql.get.cang
    let delCang=$sql.user.delCang
    let search=$sql.user.search


    console.log("token:",params.token)
    if(params.token==="delArticle"){
        // 删除博客
        conn.query(delArticle,params.Cno,(err,rst)=>{
            if(err){throw new err}else{
                console.log("成功：Article---",params.token)
                console.log(rst)
                // 添加删除原因
                conn.query(delReason,(err,rst)=>{
                    if(err){throw new err}else{
                        console.log(rst)
                        console.log("成功添加删除原因:"+params.cause+"  至账户",params.account,"时间为：",params.date)
                        res.send(rst)
                    }
                })
            }
        })
    }
//     点赞接口
    else if(params.token==="zan"){
        conn.query(zan,params.Cno,(err,rst)=>{
            if(err){throw new err}else{
                console.log(rst)
                res.send("0")
            }
        })
    }
//     收藏接口
    else if(params.token==="cang"){
    //     先判断是否已经收藏
        conn.query(isCang,params.account,(err,rst)=>{
            if(err){throw new err}else{
                // 未收藏
                if(rst.length===0){
                    conn.query(cang,[params.account,params.Cno],(err,rst)=>{
                      if(err){throw new err}else{
                          console.log(rst)
                          conn.query(updCang,params.Cno,(err,rst)=>{
                              if(err){throw new err}else{
                                  console.log(rst)
                                  res.send("0")
                              }
                          })
                      }
                    })
                }
                // 已收藏过
                else{
                    res.send("1")
                }
            }
        })
    }
//  获取收藏
    else if(params.token==='getCang'){
        conn.query(get,params.account,(err,rst)=>{
            if(err){throw new err}else{
                res.send(rst)
            }
        })
    }
//     删除收藏
    else if(params.token==='delCang'){
        conn.query(delCang,params.Cangno,(err)=>{
            if(err){throw new err}else{
                conn.query(updCang2,params.Cno,(err)=>{
                    if(err){throw new err}else{
                        res.send('0')
                    }
                })

            }
        })
    }
//     搜索文章
    else if(params.token==='search'){
        conn.query(search,params.message,(err,rst)=>{
            if(err){throw new err}else{
                console.log("message=====",params.message)
                console.log(rst.data)
                res.send(rst)
            }
        })
    }



})
// 草稿箱接口
router.post('/draft',(req,res)=>{
    let params = req.body
    let draft = $sql.get.draft
    let delDraft = $sql.user.delDraft
    console.log(params.token)
    // 获取草稿
    if(params.token==="get"){
        conn.query(draft,params.account,(err,rst)=>{
            if(err){throw new err}else{
                res.send(rst)
            }
        })
    }
    // 删除草稿
    else if(params.token==="delete"){
        conn.query(delDraft,params.Cno,(err,rst)=>{
            if(err){throw new err}else{
                console.log(rst)
                res.send("0")
            }
        })
    }

})
// 钱包及提现
router.post('/money',(req,res)=>{
    let params = req.body
    // 将article内的钱清零
    let getMoney= $sql.user.money.getMoney
    // 添加到用户的钱包
    let addMoney=$sql.user.money.addMoney
    // 获取用户的钱包
    let showMoney =$sql.user.money.showMoney
    // 将用户的钱包清零 || 提现
    let getMoney2 = $sql.user.money.getMoney2
    // 用户打赏后钱包里的钱减少
    let shangMoney= $sql.user.money.shangMoney
    // 用户打赏后文章的钱增加
    let shangMoney2= $sql.user.money.shangMoney2

    if(params.token==='tixian'){
        conn.query(getMoney,params.account,(err)=>{
            if(err){throw new err}else{
                conn.query(addMoney,[params.money,params.account],(err)=>{
                    if(err){throw new err}else{
                        res.send("0")
                    }
                })
            }
        })
    }
//     钱包获取多少钱
    else if(params.token==='showMoney'){
        conn.query(showMoney,params.account,(err,rst)=>{
            if(err){throw new err}else{
                res.send(rst)
            }
        })
    }
//     提取钱包里的钱
    else if(params.token==='tiqu'){
        conn.query(getMoney2,params.account,(err)=>{
            if(err){throw new err}else{
                res.send("0")
            }
        })
    }
//     充值
    else if(params.token==='chong'){
        conn.query(addMoney,[params.money,params.account],(err)=>{
            if(err){throw new err}else{
                res.send("0")
            }
        })
    }
//     给博客打赏
    else if(params.token==='shang'){
        // 用户打赏后钱包里的钱减少
        conn.query(shangMoney,[params.money,params.account],(err)=>{
            if(err){throw new err}else{
                // 用户打赏后文章的钱增加
                conn.query(shangMoney2,[params.money,params.Cno],(err)=>{
                    if(err){throw new err}else{
                        res.send("0")
                    }
                })
            }
        })
    }


})

// 上传接口
router.post('/insert',(req,res)=>{
    let params= req.body
    let insertImg = $sql.user.insert.img
    let insertArt = $sql.user.insert.article
    let insertVid = $sql.user.insert.video
    let insertWri = $sql.user.insert.writing
    let insertUnl = $sql.user.insert.unload
    console.log(params.token)
    console.log(res)
    // 图片博客
    if(params.token==="img"){
        console.log("params.token===  img  ")
        conn.query(insertImg,[params.account,params.title,params.Cpic,params.date],(err,rst)=>{
            if(err){throw new err}else{
                console.log(rst)
                res.send("0")
            }

        })
    }
    // 短文章博客
    else if(params.token==="article"){
        console.log("params.token===  article  ")
        conn.query(insertArt,[params.account,params.title,params.Cpic,params.content,params.date],(err,rst)=>{
            if(err){throw new err}else{
                console.log(rst)
                res.send("0")
            }

        })
    }
    // 视频博客
    else if(params.token==="video"){
        console.log("params.token===  video  ")
        conn.query(insertVid,[params.account,params.title,params.video,params.date],(err,rst)=>{
            if(err){throw new err}else{
                console.log(rst)
                res.send("0")
            }

        })
    }
    //  长文章博客
    else if(params.token==="writing"){
        console.log("params.token===  writing  ")
        conn.query(insertWri,[params.account,params.title,params.content,params.date],(err,rst)=>{
            if(err){throw new err}else{
                console.log(rst)
                res.send("0")
            }

        })
    }
    // 添加到草稿箱
    else if(params.token==="unload"){
        console.log("params.token===  unload  ")
        conn.query(insertUnl,[params.account,params.title,params.content,params.date],(err)=>{
            if(err){throw new err}else{
                res.send("0")
            }

        })
    }

})

router.post('/fan',(req,res)=>{
    let params=req.body
    let fan=$sql.user.click.fan
    let fan2=$sql.user.click.fan2
    let guan=$sql.user.click.guan
    let guan2=$sql.user.click.guan2
    let insertFan=$sql.user.insert.fan
    let delFan=$sql.user.delFan

    if(params.token==="add"){
        conn.query(fan,params.account,(err)=>{
            if(err){throw new err}else{
                conn.query(guan,params.fans_account,(err)=>{
                    if(err){throw new err}else{
                        conn.query(insertFan,[params.account,params.fans_account],(err)=>{
                            if(err){throw new err}else{
                                res.send("0")
                            }
                        })

                    }
                })
            }
        })
    }
//     取消关注
    else if(params.token==="del"){
        conn.query(fan2,params.account,(err)=>{
            if(err){throw new err}else{
                conn.query(guan2,params.fans_account,(err)=>{
                    if(err){throw new err}else{
                        conn.query(delFan,[params.account,params.fans_account],(err)=>{
                            if(err){throw new err}else{
                                res.send("0")
                            }
                        })

                    }
                })
            }
        })
    }

})

module.exports = router;