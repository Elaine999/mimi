var express = require('express');
var router = express.Router();
var db=require('./../utils/db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {loginState:req.session.loginState,username:req.session.username,uid:req.session.uid});
});

router.get('/123',function(req,res){
  let sql='select * from productsinfo left join imglist on productsinfo.PID  = imglist.PID where productsinfo.CategoryID=1';
  db.dbConnect(sql,[],function(err,data){
    res.send(data);
  })
})

router.get('/details',function(req,res){
  let pid = req.query.pid;
  let sqlarr = [];
  console.log(pid);
  // res.send(pid)
  let sql='SELECT * FROM productsinfo JOIN imglist ON productsinfo.PID=imglist.PID WHERE productsinfo.PID=?';
  sqlarr.push(pid)
  db.dbConnect(sql,sqlarr,function(err,data){
    // console.log(data);
    
    res.render('details.ejs',{data})
    
  })
})

module.exports = router;
