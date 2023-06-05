use 项目数据库;

select * from Person;

-- insert into Person(
--         PersonID,
--         LastName,
--         FirstName,
--         Address,
--         City
-- )
-- values(
--          001,
--         'chuhang',
--         'li',
--         'henan',
--         'yexian'
-- );

-- update Person
-- set PersonID=001
-- where FirstName='li'

-- DELETE from Person
-- where PersonID='1'

-- select * from Person;


SELECT Sno,Sname,Sdept
FROM Student
WHERE Sno in (
    SELECT Sno
    FROM SC
    WHERE Grade <60
)
-- （3）查询选修数据库课程（其值为“DB”）的学生学号、姓名及其成绩；
SELECT Sno,Sname,Grade
FROM Student,SC
WHERE Sno in(
    SELECT Sno
    FROM Course
    WHERE Cname='DB'
)
-- （4）统计每个院系的男生人数和女生人数，分别起中文标题为“院系”、“性别”和“学生人数”，先按院系升序排列，院系相同者，再按性别降序排列；
SELECT Sdept 院系,Ssex 性别,count(*)学生人数
FROM Student
group by Ssex
ORDER BY Cno DESC     



