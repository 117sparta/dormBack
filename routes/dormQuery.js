var express = require('express');
var router = express.Router();
var dbOp = require('../bin/dbOperate');

/* GET users listing. */
router.get('/', function(req, res, next) {
    dbOp.query("select student.studentID,Sname,Ssex,Sdept,Sclass,dormNO,dormBuilding from student,checkIn where student.studentID=checkIn.studentID and student.studentID='3115004873'",function(err,result){
        if(err) {
            res.send({status:400,msg:'账号或者密码错误'});
            res.end();
        }
        else{
            let finalResult = {
                statusCode: 0,
                message: {
                    dormMessage: result,
                }
            };
            res.writeHead(200,{'Content-type':'application/json;charset=utf-8'});
            console.log(finalResult);
            res.write(JSON.stringify(finalResult));
            res.end();
        }
    });
});

module.exports = router;
