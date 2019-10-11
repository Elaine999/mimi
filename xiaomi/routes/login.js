var express = require('express');
var router = express.Router();
var db = require('./../utils/db.js');

router.post('/login.jsp', function (req, res, next) {
    let uersid = req.body.user;
    let password = req.body.password;
    let sql = 'select * from useraccount where email=? and pwd=? '
    let sqlArr = [uersid, password];
    db.dbConnect(sql, sqlArr, function (err, data) {
        if (err) {
            res.send(err);
        }
        if (data.length > 0) {
            req.session.loginState = uersid;
            req.session.username = data[0].UserName;
            req.session.uid = data[0].uid;
            res.send({stateCode:true,url:req.session.url});
        } else {
            res.send({stateCode:false})
        }
    })
})
router.post('/logout.jsp', function (req, res, next) {
    req.session.loginState = null;
    req.session.username = null;
    req.session.uid = null;
    res.render('index', {loginState:req.session.loginState,username:req.session.username,uid:req.session.uid}); //退出接口还不知道可以不
})

module.exports = router;