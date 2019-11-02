var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'dormManagement',
    useConnectionPooling:true
});
function query(sql,callback){
    //connection.connect();
    connection.query(sql,function(err,result){
        if(err){
            console.log('查询失败了'+err);
        }
        callback(err,result);
    });
    //connection.end();
}
exports.query = query;
exports.createConnection = mysql.createConnection;
