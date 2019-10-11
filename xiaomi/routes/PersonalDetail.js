var express = require('express');
var router = express.Router();
var db=require('./../utils/db.js');

router.post('/345',function(req,res){
    let baseimg=req.body.img;
    // console.log(baseimg,99999);
    let sql='UPDATE userdetails SET Avatar=? WHERE UID=1'
    db.dbConnect(sql,[baseimg],function(error,data){
        
        res.send(data);
    })
})

router.get('/',function(req,res){
    let sql='select Mobile,Email,Avatar from userdetails where uid= ?';
    let Mobile=null;
    let Email=null;
    let Avatar=null;
    let Address=null;
    let Gender=1;
    let Nickname=null;
    db.dbConnect(sql,[req.session.uid],function(err,data){
    if(data.length>0){
        Mobile=data[0].Mobile;
        Email=data[0].Email;
        Avatar=data[0].Avatar;
        Address=data[0].Address;
        Gender=data[0].Gender;
        Nickname=data[0].Nickname;
    }
    console.log(Mobile,Email,9999999999)
    res.render('PersonalDetails.ejs',{loginState:req.session.loginState,username:req.session.username,uid:req.session.uid,mobile:Mobile,email:Email,avatar:Avatar,address:Address,gender:Gender,nickname:Nickname})        
    })
})
module.exports = router;