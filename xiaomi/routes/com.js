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

    res.send('123');
});


module.exports = router;