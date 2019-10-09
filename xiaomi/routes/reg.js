var express = require('express');
var router = express.Router();
var db=require('./../utils/db.js');

// 注册
router.post("/reg.jsp", function (req, res, next) {
    let Email = req.body.eMail
    let pwd = req.body.regPwd
    let sql = "INSERT INTO useraccount(email,pwd) VALUES(?,?)"
    let sqlARR = [Email,pwd]
    console.log(sqlARR);
    db.dbConnect(sql, sqlARR, function (err, data) {
      if (err) {
    console.log(err);
        res.send("注册失败请检查")
      } else {
        res.send("注册成功")
      }
    })
  })
  
  
  router.post("/register.html/getcode.php", function (req, res, next) {
   console.log(req.body.Code);
   
  })
module.exports = router;
