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

module.exports = router;
