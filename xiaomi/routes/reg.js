var express = require('express');
var router = express.Router();
var db = require('./../utils/db.js');
const sendEmail = require('./../sendmail.js');




// 注册
router.post("/reg.jsp", function (req, res, next) {
    let Email = req.body.eMail
    let pwd = req.body.regPwd
    let codes = req.body.code
    // 插入
    let sql = "INSERT INTO useraccount(email,pwd,UserName) VALUES(?,?,?)"
    let sqlARR = [Email, pwd, Email]

    // 查询验证码
    let sql2 = "SELECT * FROM verCode WHERE email=? AND codes=?"
    let sqlARR2 = [Email, codes]
    // 查询uid
    let sql3 = "SELECT * FROM useraccount WHERE email = ?"
    let sql3Arr = [Email]
    // 插入信息表
    let sql4 = "INSERT INTO userdetails (UID,Avatar,Email,nickname) VALUES (?,?,?,?)"
    // 查询
    db.dbConnect(sql2, sqlARR2, function (err, data) {
        console.log(data);

        if (data.length > 0) {
            db.dbConnect(sql, sqlARR, function (err, data) {
                console.log(data);

                db.dbConnect(sql3, sql3Arr, function (err, data) {
                    let sql4Arr = [data[0].uid, "img/user_defult.png", Email,`小米用户${parseInt(Math.random()*8000+1000)}`]
                    db.dbConnect(sql4, sql4Arr, function (err, data) {

                    })
                })

                if (err) {
                    res.send("注册失败请检查啦啦啦")
                    console.log(22222222);

                } else {
                    res.send("注册成功")
                    console.log(11111111);
                    
                }
            })

        } else {
            console.log("注册失败请检查");
            res.send({
                sta: false
            })

        }
    })


})

router.post("/getcode.php", function (req, res, next) {
    let Emails = req.body.eMails
    // 邮箱
    let emailCode = (function captchaNumber() {
        let num = [];
        for (let i = 0; i < 6; i++) {
            num[i] = parseInt(Math.random() * 10);
        }
        return num.join('');
    })()
    //随机生成6位数字
    let email = {
        title: '小米官网认证',
        body: `
<h1>您好：</h1>
<p style="font-size: 18px;color:#000;">
为确保是您本人操作，请在邮件验证码输入框输入下方验证码 <br>
    <span style="font-size: 24px;color:#f00;"> ${ emailCode }</span><br>
您正在注册小米账号，请勿向任何人泄露您收到的验证码<p style="font-size: 1.5rem;color:#999;">此验证码60秒内有效</p>
    此致
</p>
`
    }
    let emailCotent = {
        from: '小米-为发烧而生<953099247@qq.com>', // 发件人地址
        to: Emails, // 收件人地址，多个收件人可以使用逗号分隔
        subject: email.title, // 邮件标题
        html: email.body // 邮件内容
    };

    sendEmail.send(emailCotent)
    // 插入
    let sql1 = "INSERT INTO vercode (email,codes) VALUES(?,?)"
    let sqlARR1 = [Emails, emailCode]
    // 插入
    db.dbConnect(sql1, sqlARR1, function (err, data) {
        if (err) {
            console.log("失败");
            res.send("1")
        } else {
            console.log("成功");
            res.send("2")
        }
    })
})
module.exports = router;