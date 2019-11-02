var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlEncodeParser = bodyParser.urlencoded({ extended: true });

//登录方式需要修改为使用Post方法,另外需要提供token机制
router.post('/', urlEncodeParser, function(req, res, next){
    console.log(req.body);
    res.write('QUSI');
    res.end();
});

router.get('/',function(req,res,next){
    res.set('Content-Type','application/x-javascript')
    res.write("alert('你好啊')")
    res.end();
})




module.exports = router;
