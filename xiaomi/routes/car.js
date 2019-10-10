var express = require('express');
var router = express.Router();
var db=require('./../utils/db.js');
router.get('/', function(req, res, next) {
    res.render('car', {loginState:req.session.loginState,username:req.session.username,uid:req.session.uid});
  });
router.get('/car.php', function (req, res, next) {
    let sql='select * from cartable ';
    db.dbConnect(sql,[],function(err,data){
        console.log(data);
        res.send(data);
      })
})
router.get('/car.jsp', function (req, res, next) {
  let sql='delete * from cartable ';
  db.dbConnect(sql,[],function(err,data){
      console.log(data);
      res.send(data);
    })
})

module.exports = router;
