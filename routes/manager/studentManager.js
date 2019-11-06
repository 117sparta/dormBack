let express = require('express');
let path = require('path');
let router = express.Router();
let dbOperate = require(path.join(__dirname, '../','../','bin/dbOperate.js'));
let libs = require(path.join(__dirname, '../../libs/index.js'));

router.get('/queryStudentInfo', function (req, res, next) {
  let queryStatement = 'select * from student';
  dbOperate.query(queryStatement, (err, result) => {
    if (err) {
      let response = new libs.Message();
      console.log(response);
      response.setMessage('查询出错了');
      response.setStatusCode(-1);
      res.writeHead(200, { 'Content-Type': 'application/json, charset=UTF-8' });
      res.write(JSON.stringify(response));
      return;
    }
    let response = new libs.Message();
    response.setStatusCode(0);
    response.setMessage({ studentInfosList: result });
    res.writeHead(200, {'Content-Type': 'application/json, charset=UTF-8'});
    res.write(JSON.stringify(response));
    res.end();
  });
});

router.get('/queryUnassignedStu', function (req, res, next) {
  let queryStatement = `select distinct student.studentID, student.Ssex, student.Sname, student.Sclass from 
  student, checkin where student.studentID <> checkin.studentID`;
  dbOperate.query(queryStatement, (err, result) => {
    if (err) {
      let response = new libs.Message();
      console.log(response);
      response.setMessage('查询出错了');
      response.setStatusCode(-1);
      res.writeHead(200, { 'Content-Type': 'application/json, charset=UTF-8' });
      res.write(JSON.stringify(response));
      return;
    }
    let response = new libs.Message();
    response.setStatusCode(0);
    response.setMessage({ unassignedStuList: result });
    res.writeHead(200, { 'Content-Type': 'application/json, charset=UTF-8' });
    res.write(JSON.stringify(response));
    res.end();
  })
});

/*router.get('/queryUnassignedStu', function (req, res, next) {
  let queryStatement = `select distinct student.studentID, student.Ssex, student.Sname, student.Sclass from 
  student, checkin where student.studentID <> checkin.studentID`;
  dbOperate.query(queryStatement, (err, result) => {
    if (err) {
      let response = new libs.Message();
      console.log(response);
      response.setMessage('查询出错了');
      response.setStatusCode(-1);
      res.writeHead(200, { 'Content-Type': 'application/json, charset=UTF-8' });
      res.write(JSON.stringify(response));
      return;
    }
    let response = new libs.Message();
    response.setStatusCode(0);
    response.setMessage({ unassignedStuList: result });
    res.writeHead(200, { 'Content-Type': 'application/json, charset=UTF-8' });
    res.write(JSON.stringify(response));
    res.end();
  })
});*/

module.exports = router;