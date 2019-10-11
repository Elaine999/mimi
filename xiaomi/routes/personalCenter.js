var express = require('express');
var router = express.Router();
var db=require('./../utils/db.js');

router.get('/',function(req,res){
    // if(req.session.loginState){
        let sql='select Mobile,Email,Avatar,Nickname from userdetails where uid= ?';
        let Mobile=null;
        let Email=null;
        let Avatar=null;
        let Nickname=null;
        db.dbConnect(sql,[req.session.uid],function(err,data){
        if(data.length>0){
            Mobile=data[0].Mobile;
            Email=data[0].Email;
            Avatar=data[0].Avatar;
            Nickname=data[0].Nickname;
        }
        res.render('PersonalCenter.ejs',{loginState:req.session.loginState,username:req.session.username,uid:req.session.uid,mobile:Mobile,email:Email,avatar:Avatar,nickname:Nickname})        
        })
    // }else{
    //     res.render('index.ejs',{loginState:req.session.loginState,username:req.session.username,uid:req.session.uid})
    // }
    
})



module.exports = router;