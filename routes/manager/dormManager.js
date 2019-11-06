var express = require('express');
var path = require('path');
var router = express.Router();
var dbOperate = require(path.join(__dirname, '../../bin/dbOperate.js'));
var libs = require(path.join(__dirname, '../../libs'));

router.get('/queryDoomMsg', function(req, res, next) {
  let queryStatement = 'select * from dorm';
  dbOperate.query(queryStatement, (err, result) => {
    if (err) {
      let response = new libs.Message();
      response.setStatusCode(-1);
      response.setMessage('宿舍信息查询出错');
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(response));
      res.end();
      return;
    }
    let response = new libs.Message();
    response.setStatusCode(0);
    response.setMessage({ doomList: result });
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(response));
    res.end();
  })
});

router.get('/queryDormDetail', function(req, res, next) {
  let queryStatement1 = `select * from checkin`;
  let checkInList = null;
  let dormList = null;
  dbOperate.query(queryStatement1, (err, result) => {
    if (err) {
      let response = new libs.Message();
      response.setStatusCode(-1);
      response.setMessage('获取宿舍详情出错');
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(response));
      res.end();
      return;
    }
    checkInList = result;
    let queryStatement2 = 'select * from dorm';
    dbOperate.query(queryStatement2, (err, result) => {
      if (err) {
        let response = new libs.Message();
        response.setStatusCode(-1);
        response.setMessage('获取宿舍详情出错');
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(response));
        res.end();
        return;
      }
      dormList = result;
      for (let i = 0; i < dormList.length; i++ ) {
        dormList[i].existedStudentsList = [];
        for (let j = 0; j < checkInList.length; j++) {
          if (dormList[i].dormNO === checkInList[j].dormNO && dormList[i].dormBuilding === checkInList[j].dormBuilding) {
            dormList[i].existedStudentsList.push(checkInList[j].studentID);
            checkInList.splice(j, 1);
            j--;
          }
        }
      }
      console.log(dormList);
      let response = new libs.Message();
      response.setStatusCode(0);
      response.setMessage({ dormList });
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(response));
      res.end();
    })
  })
});

module.exports = router;
