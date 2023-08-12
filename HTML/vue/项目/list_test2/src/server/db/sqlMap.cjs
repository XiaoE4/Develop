const sqlMap ={
    list:{
        getList:'select * from list_menu where user_id=(?)',
        getContent:''
    }
}

module.exports = sqlMap