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

module.exports = router;
