var express = require('express');
var router = express.Router();
var db=require('./../utils/db.js');

router.get('/',function(req,res){
    console.log(12345677);
    
    res.render('PersonalCenter.ejs',{loginState:req.session.loginState,username:req.session.username,uid:req.session.uid,mobile:'18398261695',email:null})
})

module.exports = router;