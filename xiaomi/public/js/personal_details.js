var avatar = document.querySelector(".avatar");
var details = document.querySelector(".details");
var selects = document.querySelectorAll("select");
var inputs = document.querySelectorAll("input");
var year = "";
var month = "";
var day = "";
var b_email = document.querySelector(".email");
var b_tel = document.querySelector(".tel");
var ensure=document.querySelector(".ensure");
console.log(ensure);

$(details).height($(avatar).height());

for (let i = 1900; i <= new Date().getFullYear(); i++) {
    year += `<option value="${i}">${i}</option>`;
}
for (let i = 1; i <= 12; i++) {
    month += `<option value="${i}">${i}</option>`;
}
// selects[0].innerHTML = year;
// selects[1].innerHTML = month;
// selects[0].onchange = function () {
//     let year = event.target.value;
//     selects[1].onchange = function () {
//         let month = event.target.value;
//         let date = new Date(year, month, 0).getDate();
//         for (var i = 1; i <= date; i++) {
//             day += `<option value="${i}">${i}</option>`;
//         }
//         selects[2].innerHTML = day;
//     }
// }

for (var i = 0; i < inputs.length; i++) {
    let email = null;
    if (inputs[i].type == "email") {
        email = inputs[i];
        email.onblur = function () {
            let email_value = email.value;
            let email_pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (email_pattern.test(email_value) == true) {
                b_email.innerHTML = "&#xe502";
                b_email.style.color = "#0F0";
                ensure.setAttribute("disabled","enabled");
                $(ensure).css({background:'#ff7600',border:'1px solid #ff7600',cursor:'default'})
            } else {
                b_email.innerHTML = "&#xe504";
                b_email.style.color = "#F00";
                ensure.setAttribute("disabled","disabled");
                $(ensure).css({background:'#aaa',border:'1px solid #aaa',cursor:'not-allowed'})
            }
        }
    }
    let tel = null;
    if (inputs[i].type == "tel") {
        tel = inputs[i];
        tel.onblur = function () {
            let tel_value = tel.value;
            let tel_pattern = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (tel_pattern.test(tel_value) == true) {
                b_tel.innerHTML = "&#xe502";
                b_tel.style.color = "#0F0";
                ensure.setAttribute("disabled","enabled");
                $(ensure).css({background:'#ff7600',border:'1px solid #ff7600',cursor:'default'})
            } else {
                b_tel.innerHTML = "&#xe504";
                b_tel.style.color = "#F00";
                ensure.setAttribute("disabled","disabled");
                $(ensure).css({background:'#aaa',border:'1px solid #aaa',cursor:'not-allowed'})
            }
        }
    }
}


// 修改个人资料
$('.avatar').on('click', function () {
    $('.popup_mask').show();
})
$('.tip_btns .a1').on('click', function () {
    $('.popup_mask').hide();
})
$('.btn_mod_close').on('click', function () {
    $('.popup_mask').hide();
})
$('.uplodefile').on('change', function () {
    $('.mod_acc_tip').hide();
})
$('.tip_btns .a2').on('click', function () {
    $('.mod_acc_tip').show();
    $('.alertface').hide();
})
var imgList = $('.imgList')
var fileInput = document.querySelector('.uplodefile')
var imgBox = $('.imgBox')
var box = document.querySelector('.box')
var small = document.querySelector('#small')
var big = document.querySelector('#big')

var img1 = $('#img1')
var img2 = $('#img2')
var img3 = $('#img3')
var background = $('.background')
var gray = $('.gray')
var file = null;
var dx, dy, mx, my, scale = 1, positionX, positionY, scaleWidth, scaleHeight

/** @type {HTMLCanvasElement} */
var canvasNode = document.createElement('canvas')
canvasNode.width = 100;
canvasNode.height = 100;
var cvs = canvasNode.getContext('2d')
/** @type {HTMLCanvasElement} */
var mycanvas = document.createElement('canvas')
mycanvas.width = parseInt(imgBox.css('width'))
mycanvas.height = parseInt(imgBox.css('height'))
var ctx = mycanvas.getContext('2d')
var imgbase = '';
fileInput.onchange = function (e) {
    gray.css('display', 'none')
    file = fileInput.files[0];
    var url = window.webkitURL.createObjectURL(file)
    var img = new Image()
    img.src = url;
    $('.alertface').show();
    $('.mod_acc_tip').hide();

    function changeScale() {
        /* 初始化和改变缩放倍数时执行的函数 */
        scaleWidth = img.width * scale
        scaleHeight = img.height * scale
        imgBox.css({
            'backgroundImage': `url(${img.src})`,
            'backgroundSize': `${scaleWidth}px ${scaleHeight}px`,
            'backgroundPositionX': `${-(scaleWidth / 2 - parseInt(imgBox.css('width')) / 2)}px`,
            'backgroundPositionY': `${-(scaleHeight / 2 - parseInt(imgBox.css('height')) / 2)}px`
        })
    }
    function drewCanvas() {
        /* 通过一个和imgBox一样大的canvas去获取当前显示区域的img信息，显示在与显示区域一样大的另一个canvas中 */
        ctx.clearRect(0, 0, 300, 300)
        ctx.drawImage(img, positionX, positionY, scaleWidth, scaleHeight)
        var date = ctx.getImageData(100, 100, 100, 100)
        cvs.putImageData(date, 0, 0);
    }
    box.onmousewheel = function (e) {
        /* 滚轮缩放 */
        if (e.deltaY > 0 && scale > 0.05) {
            scale -= 0.05
        } else if (e.deltaY < 0) {
            scale += 0.05
        }
        changeScale()
    }

    img.onload = function () {
        changeScale()

        box.onmousedown = function (de) {
            dx = de.clientX;
            dy = de.clientY;
            positionX = parseInt(imgBox.css('backgroundPositionX'))
            positionY = parseInt(imgBox.css('backgroundPositionY'))
            box.onmousemove = function (me) {

                me.preventDefault()
                mx = me.clientX
                my = me.clientY
                /* 只改变我们能够看到的imgBox的位置，在下面通过函数调用去改变画布中的位置 */
                imgBox.css({ 'backgroundPositionX': `${positionX + (mx - dx)}px`, 'backgroundPositionY': `${positionY + (my - dy)}px` })
                drewCanvas()
            }
            box.onmouseup = function () {
                positionX = parseInt(imgBox.css('backgroundPositionX'))
                positionY = parseInt(imgBox.css('backgroundPositionY'))
                drewCanvas()
                imgbase = canvasNode.toDataURL()
                img1.attr('src', canvasNode.toDataURL())
                img2.attr('src', canvasNode.toDataURL())
                img3.attr('src', canvasNode.toDataURL())
                box.onmousemove = null;
            }
        }
    }
}

$('#confirm').on('click', function () {
    $.ajax({
        type: 'post',
        url: 'PersonalDetail/345',
        data: { img: imgbase },
        success: function (res) {
            $('.avatar img').attr({ src: imgbase })
        }
    })
    $('.popup_mask').hide();
})

$('.ensure').on('click',function(){
    $.ajax({
        url:'/PersonalDetail/personalCenter.do',
        type:'post',
        data:$('#detailsform').serialize(),
        success:function(res){
            window.location.href="http://127.0.0.1:3000/PersonalCenter";
        }
    })
})
