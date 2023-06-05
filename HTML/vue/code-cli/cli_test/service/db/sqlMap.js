const sqlMap = {
    // 用户相关
    user: {
        // 注册添加
        addUser: 'insert into user (account,password) values (?,?)',
        addUser_account:'insert into user_account (account,username,sex,birthday,Apic) values(?,?,?,?,?)',
        selectUser: 'select * from user',
        selectUser_account:'select account from user where account=(?)',
        search: 'SELECT distinct * from article a,user_account u where  INSTR(`title`, (?)) > 0 && a.account=u.account;',
        insert: {
            img: ' insert into article (account , title , Cpic , date) values (?,?,?,?) ',
            article:' insert into article (account,title,Cpic,content,date) values (?,?,?,?,?) ',
            video:' insert into article (account,title,video,date) values (?,?,?,?) ',
            writing:' insert into article (account,title,content,date) values (?,?,?,?) ',
            unload: 'insert into article_unload (account,title,content,date) values(?,?,?,?)',
            fan: 'insert into fans(account,fans_account) values(?,?)'
        },
        register:{

        },
        money:{
            getMoney:'update article set money=0 where account=(?);',
            addMoney:'update user_account set money=money+(?) where account=(?)',
            showMoney: ' select money from user_account where account=(?) ',
            getMoney2:'update user_account set money=0 where account=(?)',
            shangMoney:'update user_account set money=money-(?) where account=(?)',
            shangMoney2:'update article set money=money+(?) where Cno=(?)',
        },
        click:{
          zan:' update article set zan=zan+1,money=money+0.1 where Cno =(?)  ',
          cang:' insert into cang (account,Cno) values(?,?) ',
          guan:' update user_account set guanzhu=guanzhu+1 where account=(?) ',
          fan:' update user_account set fensi=fensi+1 where account=(?) ',
          guan2:' update user_account set guanzhu=guanzhu-1 where account=(?) ',
          fan2:' update user_account set fensi=fensi-1 where account=(?) ',
          updCang:'update article set cang=cang+1,money=money+0.5 where Cno=(?)',
          updCang2:'update article set cang=cang-1 where Cno=(?)'
        },
        // 删除草稿箱
        delDraft:' delete from article_unload where Cno=(?) ',
        delFan:' delete from fans where account=(?) &&  fans_account=(?)',
        delCang: 'delete from cang where Cangno=(?)'
    },
    get:{
        user: 'select * from user_account ',
        article:' select * from user_account u, article a  where u.account=a.account',
        top: ' select * from user_account u, article a, article_tou t where u.account=a.account && a.Cno = t.article_Cno ',
        delete : ' delete from article_tou where Tno =(?) ',
        causes: 'select * from causes',
        jin: 'update user_account ',
        cang: ' select * from  cang c,article a,user_account u  where c.account=(?) && c.Cno=a.Cno && u.account=a.account',
        cang2:'select * from  cang c,article a   where c.account=(?) ',
        draft: ' select * from article_unload where account = (?) ',
        guan:' select * from fans f,user_account u where f.account=u.account && f.fans_account=(?)',
        fan: ' select * from fans f,user_account u where f.fans_account=u.account && f.account=(?) ',
    },
    // 管理员相关
    root:{
    //     移除头条文章
        delTou : ' delete from article_tou where Tno =(?) ',
    //     删除用户博客
        delArticle: ' delete from article where Cno = (?) ' ,
        delReason: 'insert into causes(account,cause,date) ',
        insertTou: ' insert into article_tou(article_Cno)  ',
        insertTou2: 'select article_Cno from article_tou where article_Cno=(?) '
    }
};

module.exports=sqlMap