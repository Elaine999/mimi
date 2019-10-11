var express = require('express');
var router = express.Router();
var db = require('./../utils/db.js');
router.get('/', function (req, res, next) {
  res.render('car', {
    loginState: req.session.loginState,
    username: req.session.username,
    uid: req.session.uid
  });
});
router.get('/car.php', function (req, res, next) {
  let sqlArr = [req.query.ruid]

  let sql = 'select * from cartable where Uid =?';
  db.dbConnect(sql, sqlArr, function (err, data) {
    res.send(data);
  })
})
// 点击删除
router.get('/car.jsp', function (req, res, next) {
  let cids = req.query.cid
  let sqlarr = [cids]
  let sql = 'DELETE  FROM cartable where Cid=? ';

  db.dbConnect(sql, sqlarr, function (err, data) {
    res.send(data);
  })
})
// 点击结算
router.get('/car.asp', function (req, res, next) {
  let sqlArr = [req.query.ruid]
  let sqlS = "SELECT * FROM cartable WHERE Uid=?"
  let sqlD = 'DELETE  FROM cartable where Uid=? ';
  let sqlI = 'INSERT INTO indtable (pid,uid,pname,pimg,ppri,cid,vers) VALUES (?,?,?,?,?,?,?)';
 
  db.dbConnect(sqlS, sqlArr, function (err, data) {
  
    for (i = 0; i < data.length; i++) {
      let sqlIArr = [data[i].Pid, data[i].Uid, data[i].Pname, data[i].Pimg, data[i].Ppri, data[i].Cid, data[i].Vers]
      db.dbConnect(sqlI, sqlIArr, function (err, data) {
      })
    }
    db.dbConnect(sqlD, sqlArr, function (err, data) {
      res.send(1)
    })
    res.send(data);
  })
  
})
module.exports = router;