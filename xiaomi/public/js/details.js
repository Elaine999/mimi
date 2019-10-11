var swiperWrapperimg = $('.swiperWrapper');//获取图片
var index = 0;
var len = swiperWrapperimg.length;//获取图片个数
var smallpoints = $('.swiper_pagination_ul>li');//获取小圆点



// 背景图片切换-上一张
$('.swiper_button_prev').on('click', function () {
    index--;
    if (index < 0) {
        index = 4;
    }
    $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
    $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')
})
// 背景图片切换-下一张
$('.swiper_button_next').on('click', function () {
    index++;
    if (index > len - 1) {
        index = 0;
    }
    $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
    $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')
})
// 点击切换到相应的图片
smallpoints.on('click', function () {
    var lis = event.target;
    index = $(lis).data('idx');
    $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
    $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')

})
//自动播放
//console.log(imgstatus);

if (imgstatus == 1) {
    var timeId = setInterval(function () {
        index++;
        if (index > len - 1) {
            index = 0;
        }
        $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
        $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')
    }, 3000)
    //移入停止！！！
    swiperWrapperimg.mouseover(function () {
        window.clearInterval(timeId);
    })
    swiperWrapperimg.mouseout(function () {
        timeId = setInterval(function () {
            index++;
            if (index > len - 1) {
                index = 0;
            }
            $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
            $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')
        }, 3000)
    })
}

//不同版本  不同价格
$('.btn-biglarge').on('click', function () {
    var str = ''
    $(this).addClass('active').siblings().removeClass('active')
    var vers = $('.active').find('.name').text()
    //console.log(vers);
    var vers_price = $('.active').find('.price').text()
    //console.log(vers);

    str += `
    
    <li>${vers}<span>${vers_price}元 </span></li>
    <li class="totlePrice" data-name="seckill"> 总价 ：${vers_price}元 </li>
    `
    $('.pro-list').find('.verul').html(str)
})
//携带产品信息添加到数据库
$('.buy').on('click', function () {
    var pname = $('.pro-list').find('h4').text()
    var u_vers = $('.active').find('.name').text()
    var u_verprice = $('.active').find('.price').text()
    var u_img = $('.f1').find('img').attr('src')
    var u_id = userId
    $.ajax({
        type: 'get',
        url: '/insertcar',
        data: {
            Pid: pid,
            Pname: pname,
            Uid: u_id,
            Pimg: u_img,
            Ppri: u_verprice,
            Vers: u_vers,
        },
        success: function (res) {
            let prizeBox = document.createElement("div")
            $(prizeBox).css({
                width: " 300px",
                height: "100px",
                background: "rgba(101, 101, 102, 0.4)",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                lineHeight: "100px",
                position: "fixed",
                top: "50%",
                left: "50%",
                marginLeft: '-150px',
                marginTop: '-50px'
            })
            prizeBox.innerText = `已成功加入购物车`
            document.body.appendChild(prizeBox)
            var timer=setInterval(function(){
                document.body.removeChild(prizeBox)
            },2000)
        }
    })
})

//喜欢的 点击事件
$('.like').on('click', function () {
    $(this).find('i').toggleClass('redheart')
    var c=$('.redheart').css('color')
    console.log(c);
    
    localStorage.setItem('c',c)
    localStorage.getItem('c',c)
    //location.reload('true')
})