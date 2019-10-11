var express = require('express');
var router = express.Router();
var db=require('./../utils/db.js');

router.get('/',function(req,res){
    let sql='select Mobile,Email,Avatar from userdetails where uid= ?';
    let Mobile=null;
    let Email=null;
    let Avatar=null;
    db.dbConnect(sql,[req.session.uid],function(err,data){
    if(data.length>0){
        Mobile=data[0].Mobile;
        Email=data[0].Email;
        Avatar=data[0].Avatar;
    }
    console.log(Mobile,Email,9999999999)
    res.render('PersonalCenter.ejs',{loginState:req.session.loginState,username:req.session.username,uid:req.session.uid,mobile:Mobile,email:Email,avatar:Avatar})        
    })
})

module.exports = router;