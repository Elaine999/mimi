var express = require('express');
var router = express.Router();
var db = require('./../utils/db.js');

router.get('/',function(req,res){
    let keyword = req.query.key;
    let str='saalf ajaj asja'
    let arr = str.split(' ')
    console.log(arr,keyword,999999);
    let sql = `SELECT * FROM productsinfo JOIN imglist ON productsinfo.PID=imglist.PID WHERE productsinfo.PName LIKE ? OR productsinfo.Abstract LIKE ?`
    let sqlArr = [`%${keyword}%`,`%${keyword}%`];
    db.dbConnect(sql,sqlArr,function(err,data){
        if (err) {
            console.log(err);
        }
        if (data.length>0) {
            res.render('search_result.ejs',{data,length:data.length,loginState:req.session.loginState,username:req.session.username,uid:req.session.uid});
        }else{
            res.render('search_result.ejs',{length:0,loginState:req.session.loginState,username:req.session.username,uid:req.session.uid})
        }
    })
})
module.exports = router;