var express = require('express');
var router = express.Router();
var db=require('./../utils/db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',loginState:123,username:345});
});

router.get('/123',function(req,res){
  let sql='select * from productsinfo left join imglist on productsinfo.PID  = imglist.PID';
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
    console.log(data);
    
    res.render('details.ejs',{data})
    
  })
})
router.post("/reg.jsp", function (req, res, next) {
  let Email = req.body.eMail
  let Password = req.body.regPwd
  let sql = "INSERT INTO userdetails(Email,Password) VALUES(?,?)"
  let sqlARR = [Email,Password]
  console.log(sqlARR);

  db.dbConnect(sql, sqlARR, function (err, data) {
    if (err) {
      res.send("注册失败请检查")
    } else {
      res.send("注册成功")
    }
  })
})

router.post('/login.jsp',function(req,res,next){
  let uersid = req.body.user;
  let password = req.body.password;
  let sql = 'select * from userdetails where Email=? and Password=? '
  let sqlArr = [uersid,password];
  console.log(uersid,password,999);
  db.dbConnect(sql,sqlArr,function(err,data){
    if(err){
      res.send(err);
    }
    console.log(data);
    console.log(req.session);
    if (data.length>0) {
      req.session.loginState = uersid;
      res.send(data);
      
    }else{
      res.send('登录失败')
    }
  })

})
router.post('/logout.jsp',function(req,res,next){
  req.session.loginState = null;
  res.render('index.html')//退出接口还不知道可以不
})
module.exports = router;
