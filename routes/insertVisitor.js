var express = require('express');
var router = express.Router();
var dbOp = require('../bin/dbOperate');

/*通过router的get获取浏览器的get请求,这边用于获取数据*/
router.get('/',function(req,res,next){
    let readyStatement = "select visitorInfo.visitorID,visitorName,visitorSex,visitDateTime,managerID,visitDormNO,visitBuilding from "
    +"visitRecord,visitorInfo where visitRecord.visitorID=visitorInfo.visitorID";
    dbOp.query(readyStatement,function(err,result){
        if(err){
            res.end({status:'1083',desc:'sql语句执行有错误'});
        }
        else{
            let data = JSON.stringify(result);
            console.log(data);
            res.writeHead(200,{'ContentType':'text/plain;charset=utf-8','Access-Control-Allow-origin':'*',
                'Access-Control-Allow-Methods':'PUT,GET,POST,DELETE,OPTIONS'});
            res.write(data);
            res.end();
        }
    })
});
router.post('/',function(req,res,next){
   let ope = req.body.ope;
   let body = req.body;
   let readyStatement = '';
   console.log("接收到post请求");
   switch(ope){
       case 'insert':
           readyStatement = `select visitorID from visitorInfo where visitorID='${body.visitorID}'`;
           dbOp.query(readyStatement,function(err,result){  //查询一下是不是已经有来访人信息了?
               if(err){
                    console.log('查询出错了');
               }
               if(result.length>0){         //已经在来访人信息中有了
                   let readyStatement = `insert into visitRecord (visitDateTime,managerID,visitorID,visitDormNO,visitBuilding) values
                    ('${body.visitDateTime}','${body.managerID}','${body.visitorID}','${body.visitDormNO}','${body.visitBuilding}')`;
                   dbOp.query(readyStatement,function(err,result){
                       if(err){
                           console.log('39行插入出错了');
                       }
                       res.writeHead(200,{'ContentType':'text/plain;charset=utf-8','Access-Control-Allow-origin':'*',
                           'Access-Control-Allow-Methods':'PUT,GET,POST,DELETE,OPTIONS'});
                       res.write('成功插入');
                       res.end();
                   });
               }
               else {     //如果是新的来访人信息
                   let readyStatement = `insert into visitorInfo (visitorID,visitorSex,visitorName) values
                    ('${body.visitorID}','${body.visitorSex}','${body.visitorName}')`;//先插入来访人信息表中
                   dbOp.query(readyStatement,function(err,result){
                       if(err){
                           console.log('49行插入出错了');
                       }
                       console.log(result);
                       let rs = `insert into visitRecord (visitDateTime,managerID,visitorID,visitDormNO,visitBuilding) values
                    ('${body.visitDateTime}','${body.managerID}','${body.visitorID}','${body.visitDormNO}','${body.visitBuilding}')`;//接着插入记录表
                       dbOp.query(rs,function(err,result){
                           if(err){
                               console.log('56行插入出错');
                           }
                           else{
                               res.writeHead(200,{'ContentType':'text/plain;charset=utf-8','Access-Control-Allow-origin':'*',
                                   'Access-Control-Allow-Methods':'PUT,GET,POST,DELETE,OPTIONS'});
                               res.write('插入成功了');
                               res.end();
                           }
                       })
                   });
               }
           });
   }
});
router.options('/',function(req,res,next){
    res.writeHead(200,{'ContentType':'text/plain;charset=utf-8','Access-Control-Allow-origin':'*',
        'Access-Control-Allow-Methods':'PUT,GET,POST,DELETE,OPTIONS'});
    res.end();
});
module.exports = router;
