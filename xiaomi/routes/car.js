var express = require('express');
var router = express.Router();
var db=require('./../utils/db.js');
router.get('/', function(req, res, next) {
    res.render('car', {loginState:req.session.loginState,username:req.session.username,uid:req.session.uid});
  });
router.get('/car.php', function (req, res, next) {
   let sqlArr=[req.query.ruid]
  
    let sql='select * from cartable where Uid =?';
    db.dbConnect(sql,sqlArr,function(err,data){
        res.send(data);
      console.log(data);

      })
})
// 点击
router.get('/car.jsp', function (req, res, next) {
  let cids = req.query.cid
  let sqlarr=[cids]
  let sql='DELETE  FROM cartable where Cid=? ';

  db.dbConnect(sql,sqlarr,function(err,data){
      res.send(data);
      
    })
})

module.exports = router;

