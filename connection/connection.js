const mysql=require('mysql');
const mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'userManagement',
    multipleStatments:true
})
mysqlConnection.connect((err)=>{
    if(!err)
    {
        console.log("Database Connected");
    }
    else{
        console.log(err);
    }
})

module.exports=mysqlConnection;