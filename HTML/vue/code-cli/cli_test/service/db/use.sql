use boke;

select * from user_account
where account=123456;


select * from user_account u, article a, article_tou t
              where u.account=a.account && a.Cno = t.article_Cno  ;

delete from article_tou where Tno=7;

select date from article
where account = 414546312;

update boke.user_account t set t.jinyan ='[
        {
          \"causes\": \"图片违规111\"
        }
]' where account='123456';

# 插入数据
# insert into causes(account, causes) values ('414546312','图片违规');
insert into article_tou(article_Cno) values ('3');

select article_Cno from article_tou where article_Cno=1;

update user_account set jinyan=0 where account=110;

# 获取c.account为xxx的收藏 || 读取用户的收藏用
# 1、点击收藏后 表cang 插入，
select * from user_account u,article a,cang  c
where u.account=a.account && a.Cno=c.Cno && c.account=110;
# 2、article中的 数据cang会+1

update article  set zan=zan+1 where Cno = 7;

select * from cang where account=414546312 && Cno=22;




# 表fans：
# account表示被关注账号
#### 该用户的粉丝
select * from fans f,user_account u where f.fans_account=u.account && f.account=414546312;
#### 该用户的关注
select * from fans f,user_account u where f.account=u.account && f.fans_account=414546312;


# 1、点击关注后关注表添加，
# 2、user_account中关注+1，粉丝+1


update user_account set fensi=fensi+1 where account=414546312;

delete from fans where account=110 && fans_account=414546312;

select * from  cang c,article a,user_account u where c.account=414546312 && c.Cno=a.Cno && u.account=a.account;

update article set money=0 where account=123456;

update user_account set money =money+1000 where account=110;
select money from user_account where account=414546312;

select * from  cang c,article a  where c.account=414546312 && c.Cno=a.Cno  && c.Cno=22;
select * from  cang c,article a  where c.account=414546312;
select * from  cang c,article a,user_account u  where c.account=414546312 && c.Cno=a.Cno && u.account=a.account;

select  * from article where title like '%1%';

SELECT distinct * from article a,user_account u where  INSTR(`title`, '1') > 0 && a.account=u.account;
update article set zan=zan+1,money=money+0.1 where Cno =1;
