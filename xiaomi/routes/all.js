var express = require('express');
var router = express.Router();
var db = require('../utils/db.js');
router.get('/', function (req, res, next) {
  res.render('all', {
    loginState: req.session.loginState,
    username: req.session.username,
    uid: req.session.uid
  });
});
router.get('/all.php', function (req, res, next) {
  let sqlArr = [req.query.ruid]
  let sql = 'select * from indtable where uid =?';
  db.dbConnect(sql, sqlArr, function (err, data) {
    res.send(data);
  })
})
// 点击
router.get('/all.jsp', function (req, res, next) {
  let cids = req.query.cid
  let sqlarr = [cids]
  let sql = 'select * FROM indtable where Cid=? ';

  db.dbConnect(sql, sqlarr, function (err, data) {
    res.send({data});
  })
})

module.exports = router;