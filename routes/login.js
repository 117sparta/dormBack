var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var dpOperate = require('../bin/dbOperate.js');
var urlEncodeParser = bodyParser.urlencoded({ extended: true });

//登录方式需要修改为使用Post方法,另外需要提供token机制
router.post('/', urlEncodeParser, function(req, res, next){
    console.log(req.body);
    if (req.body.account && req.body.password) {
        dpOperate.query(`select account from user where account=${req.body.account}`, (error, result) => {
            console.log(result);
            if (result) {
                if (result.length) {
                    dpOperate.query(`select power, account, mark from user where account=${req.body.account}
                    and password=${req.body.password}`, (loginError, loginResult) => {
                        if (loginResult.length) {
                            const successMessage = { statusCode: 0, message: loginResult[0] };
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.write(JSON.stringify(successMessage));
                            res.end();
                        } else {
                            const failMessage = { statusCode: 1, message: '账号或者密码错误' };
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.write(JSON.stringify(failMessage));
                            res.end();
                        }
                    });
                } else {
                    const failMessage = { statusCode: 2, message: '用户不存在' };
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.write(JSON.stringify(failMessage));
                    res.end();
                }
            }
            if (error) {
                console.log(error);
            }
        })
    } else {
        const response = {
            statusCode: 3,
            message: '账号或者密码不能为空'
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(response));
        res.end();
        return;
    }
});

router.get('/',function(req,res,next){
    res.set('Content-Type','application/x-javascript')
    res.write("alert('你好啊')")
    res.end();
})




module.exports = router;
