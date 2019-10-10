var express = require('express');
var router = express.Router();
var db = require('./../utils/db.js');

// router.get('/', function (req, res, next) {
//     res.render('comment', {
//         loginState: req.session.loginState,
//         username: req.session.username,
//         uid: req.session.uid
//     });
// });

router.post('/insert', function (req, res, next) {
    let data = req.body;

    res.send(data);
});

router.get('/search',function(req,res){
    let pid = req.query.pid;
    let sql = `select * from comtable join userdetails on comtable.uid=userdetails.UID where comtable.pid=?`
    let sqlArr = [pid]
    db.dbConnect(sql,sqlArr,function(err,data){
        console.log(data);
        if (err) {
            res.send({state:false,mas:'服务器错误'})
        }
        if (data.length>0) {
            res.send({data,state:true})
        }else{
            res.send({state:false})
        }
    })


})


module.exports = router;