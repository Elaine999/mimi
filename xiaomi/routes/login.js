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
        console.log(data);
        console.log(req.session);
        if (data.length > 0) {
            req.session.loginState = uersid;
            res.send(data);

        } else {
            res.send('登录失败')
        }
    })

})
router.post('/logout.jsp', function (req, res, next) {
    req.session.loginState = null;
    res.render('index.html') //退出接口还不知道可以不
})

module.exports = router;