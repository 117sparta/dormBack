var express = require('express');
var router = express.Router();
var dbOperate = require('../../bin/dbOperate');

router.get('/queryCheckInMsg', function (req, res, next) {
  let queryStatement = `select student.studentID, Sname, Ssex, Sclass, dormNO, dormBuilding, managerID
   from student, checkin where student.studentID=checkin.studentID`;
   dbOperate.query(queryStatement, (err, result) => {
     res.writeHead(200, { 'Content-Type': 'application/json, charset=UTF-8'});
     if (err) {
       let response = { statusCode: -1, message: '查询出错' };
       res.write(JSON.stringify(response));
       res.end();
       return;
     }
     let response = { statusCode: 0, message: { checkInList: result } };
     console.log(response);
     res.write(JSON.stringify(response));
     res.end();
   });
});

router.get('/createCheckInMsg', function (req, res, next) {
  let queryStatement = `select student.studentID, Sname, Ssex, Sclass, dormNO, dormBuilding, managerID
   from student, checkin where student.studentID=checkin.studentID`;
  dbOperate.query(queryStatement, (err, result) => {
    res.writeHead(200, { 'Content-Type': 'application/json, charset=UTF-8'});
    if (err) {
      let response = { statusCode: -1, message: '查询出错' };
      res.write(JSON.stringify(response));
      res.end();
      return;
    }
    let response = { statusCode: 0, message: { checkInList: result } };
    console.log(response);
    res.write(JSON.stringify(response));
    res.end();
  });
});

router.get('/deleteCheckInMsg', function (req, res, next) {
  if (!req.body.studentID) {
    const response = {
      statusCode: 0,
      message: 'studentID 为空'
    };
    res.writeHead(200, {'Content-Type':'application/json, charset=UTF-8'});
    res.write(JSON.stringify(response));
    res.end();
    return;
  }
  let queryStatement = `delete from checkin where studentID=${req.body.studentID}`;
  dbOperate.query(queryStatement, (err, result) => {
    res.writeHead(200, { 'Content-Type': 'application/json, charset=UTF-8'});
    if (err) {
      let response = { statusCode: -1, message: '删除出错' };
      res.write(JSON.stringify(response));
      res.end();
      return;
    }
    const response = { statusCode: 0, message: '删除成功' };
    res.write(JSON.stringify(response));
    res.end();
  });
});


module.exports = router;
