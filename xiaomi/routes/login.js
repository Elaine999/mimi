var express = require('express');
var router = express.Router();
var db = require('./../utils/db.js');

router.post('/login.jsp', function (req, res, next) {
    let uersid = req.body.user;
    let password = req.body.password;
    let sql = 'select * from useraccount where email=? and pwd=? '
    let sqlArr = [uersid, password];
    console.log(uersid, password, 999);
    db.dbConnect(sql, sqlArr, function (err, data) {
        if (err) {
            res.send(err);
        }
        if (data.length > 0) {
            req.session.loginState = uersid;
            req.session.username = data[0].UserName;
            req.session.uid = data[0].uid;
            res.send({stateCode:true});
        } else {
            res.send({stateCode:false})
        }
    })

})
router.post('/logout.jsp', function (req, res, next) {
    req.session.loginState = uersid;
    req.session.username = data[0].UserName;
    req.session.uid = data[0].uid;
    console.log(123);
    res.render('index') //退出接口还不知道可以不
})

module.exports = router;