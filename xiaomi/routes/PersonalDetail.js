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

module.exports = router;