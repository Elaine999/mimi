var express = require('express');
var router = express.Router();
var db=require('./../utils/db.js');

router.get('/345',function(req,res){
    console.log(req.query);
    let sql='insert into '
})

module.exports = router;