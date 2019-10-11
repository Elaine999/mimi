var express = require('express');
var router = express.Router();
var db=require('./../utils/db.js');

router.post('/345',function(req,res){
    let baseimg=req.body.img;
    let sql='UPDATE userdetails SET Avatar=? WHERE UID=?'
    db.dbConnect(sql,[baseimg,req.session.uid],function(error,data){
        res.send(data);
    })
})

router.get('/',function(req,res){
    let sql='select Mobile,Email,Avatar,Gender,Nickname from userdetails where uid= ?';
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
    res.render('PersonalDetails.ejs',{loginState:req.session.loginState,username:req.session.username,uid:req.session.uid,mobile:Mobile,email:Email,avatar:Avatar,address:Address,gender:Gender,nickname:Nickname})        
    })
})


router.post('/personalCenter.do',function(req,res){
    let Mobile=req.body.phonenum;
    let Email=req.body.emailinfo;
    let gender=req.body.gender;
    let Nickname=req.body.nickname;
    let address = req.body.address;
    let birdate = req.body.birdate;
    let sql='update userdetails set Mobile=? , Email=? , Gender=? , nickname=? , Address=? , BirthDate=? where UID=req.session.uid';
    // console.log(Mobile,Email,gender,Nickname,address,birdate);
    db.dbConnect(sql,[Mobile,Email,gender,Nickname,address,birdate],function(err,data){
        res.send();
    })
    
    // db.dbConnect(sql,[req.session.uid],function(err,data){
    // if(data.length>0){
    //     Mobile=data[0].Mobile;
    //     Email=data[0].Email;
    //     Avatar=data[0].Avatar;
    //     Nickname=data[0].Nickname;
    // }
    // res.render('PersonalCenter.ejs',{loginState:req.session.loginState,username:req.session.username,uid:req.session.uid,mobile:Mobile,email:Email,avatar:Avatar,nickname:Nickname})        
    // })
})
module.exports = router;