var express = require('express');
var router = express.Router();
var db=require('./../utils/db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {loginState:req.session.loginState,username:req.session.username,uid:req.session.uid});
});

router.get('/login', function(req, res, next) {
  req.session.url=req.headers.referer
  res.redirect('/login.html');
})

//主页数据调用
router.get('/123',function(req,res){
  let sql='select * from productsinfo left join imglist on productsinfo.PID  = imglist.PID';
  db.dbConnect(sql,[],function(err,data){
    res.send(data);
  })
})
//产品详情页
router.get('/details',function(req,res){
  let pid = req.query.pid;
  let sqlarr = [];
 // console.log(pid);
  // res.send(pid)
  let sql='  select * from (productsinfo left join imglist on productsinfo.PID  = imglist.PID)left join vers_pric on vers_pric.PID=imglist.PID WHERE productsinfo.PID=?';
  sqlarr.push(pid)
  db.dbConnect(sql,sqlarr,function(err,data){
    //console.log(data);
    
    res.render('details.ejs',{data,loginState:req.session.loginState,username:req.session.username,uid:req.session.uid})
    
  })
})
//评论
router.get('/comment',function(req,res){
  let pid = req.query.pid;
  let sqlarr = [];
  let sql='select * from productsinfo where PID=?'
  sqlarr.push(pid)
  db.dbConnect(sql,sqlarr,function(err,data){
    //console.log(data,123456);
    
    res.render('comment.ejs',{data,loginState:req.session.loginState,username:req.session.username,uid:req.session.uid})
    
  })
})

router.get('/insertcar',function(req,res){
  let Pid=req.query.Pid
  let Pname=req.query.Pname
  let Uid=req.query.Uid
  let Pimg=req.query.Pimg
  let Ppri=req.query.Ppri
  let sqlarr=[Pid,Uid,Pname,Ppri,Pimg]
  let sql='insert into cartable(Pid,Uid,Pname,Ppri,Pimg) values(?,?,?,?,?)'
  db.dbConnect(sql,sqlarr,function(err,data){
    // console.log(data);
    
    res.render('car.ejs',{data,loginState:req.session.loginState,username:req.session.username,uid:req.session.uid})
  })
})
module.exports = router;
