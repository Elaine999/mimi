var indexTwo = 0;//小米闪购索引
var izero = -1, ione = -1, itwo = -1, ithree = -1, ifour = -1, ifive = -1, isix = -1, iseven = -1;
var times=null;
// 显示隐藏
$('.siteCategoryOne>ul>li').hover(function () {
    $('.siteCategoryTwo').show();
},
    function () {
        $('.siteCategoryTwo').hide();
    }
)
$('.siteCategoryTwo').hover(function () {
    $('.siteCategoryTwo').show();
},
    function () {
        $('.siteCategoryTwo').hide();
    }
)

//退出的a标签
$('#logout').on('click', function (e) {
    e.preventDefault();
    $.ajax({
        url: '/login/logout.jsp',
        type: 'post',
        success: function (res) {
            window.location.href = 'http://127.0.0.1:3000/';
        }
    })
})


    ; (function () {
        var _global;
        function move() {
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
            // 点击切换到相应的图片-按钮
            smallpoints.on('click', function () {
                var lis = event.target;
                index = $(lis).data('idx');
                $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
                $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')

            })

            //自动播放
            var timeId = setInterval(function () {
                index++;
                if (index > len - 1) {
                    index = 0;
                }
                $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
                $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')
            }, 4000)
            //移入停止！！！
            swiperWrapperimg.mouseover(function () {
                window.clearInterval(timeId);
            })
            //移除启动定时器
            swiperWrapperimg.mouseout(function () {
                timeId = setInterval(function () {
                    index++;
                    if (index > len - 1) {
                        index = 0;
                    }
                    $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
                    $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')
                }, 4000)
            })
        }
        _global = (function () { return this; }())
        !(move in _global) && (_global.move = move);
    }())

new move();

//搜索框
$('#text').focus(function () {
    $('#text').css({ borderColor: '#ff7600' });
    $('.search_btn').css({ borderColor: '#ff7600' });
    $('.search_hot_words').hide();
    $('.J_keywordList').show();
})
$('#text').blur(function () {
    $('#text').css({ borderColor: 'rgb(224, 224, 224)' });
    $('.search_btn').css({ borderColor: 'rgb(224, 224, 224)' });
    $('.search_hot_words').show();
    $('.J_keywordList').hide();
})


//小米闪购轮播

$('#swiper_controls_prev').on('click', function () {
    indexTwo--;
    if (indexTwo <= 0) {
        indexTwo = 0;
        $('#swiper_controls_prev i').css({ color: '#e0e0e0' })
        $('#swiper_controls_next i').css({ color: '#b0b0b0' })
    } else {
        $('#swiper_controls_prev i').css({ color: '#b0b0b0' })
    }
    $('.swiper_wrapper').css({ transform: `translateX(-${992 * indexTwo}px)` });
})

$('#swiper_controls_next').on('click', function () {
    indexTwo++;
    if (indexTwo >= 2) {
        indexTwo = 2;
        $('#swiper_controls_prev i').css({ color: '#b0b0b0' })
        $('#swiper_controls_next i').css({ color: '#e0e0e0' })
    } else {
        $('#swiper_controls_next i').css({ color: '#b0b0b0' })
    }
    $('.swiper_wrapper').css({ transform: `translateX(-${992 * indexTwo}px)` });
})
var timemi = setInterval(function () {
    indexTwo++;
    if (indexTwo >= 2) {
        indexTwo = 2;
        $('#swiper_controls_prev i').css({ color: '#b0b0b0' })
        $('#swiper_controls_next i').css({ color: '#e0e0e0' })
    }else{
        $('#swiper_controls_next i').css({ color: '#b0b0b0' })
    }
    $('.swiper_wrapper').css({ transform: `translateX(-${992 * indexTwo}px)` });
}, 5000)
$('.J_flashSaleList').mouseover(function () {
    clearInterval(timemi);
})
$('.J_flashSaleList').mouseout(function () {
    timemi = setInterval(function () {
        indexTwo++;
        if (indexTwo >= 2) {
            indexTwo = 2
        }
        $('.swiper_wrapper').css({ transform: `translateX(-${992 * indexTwo}px)` });
    }, 5000)
})

//闪购时间渲染
function timing() {
    var date = new Date();
    var date2 = new Date(`${date.toLocaleDateString()} 14:00`);
    times = date2.getTime() - date.getTime();
    var hours = addZero(parseInt(times / 1000 / 60 / 60));
    var minutes = addZero(parseInt(times / 1000 / 60) - hours * 60);
    var seconds = addZero(parseInt(times / 1000 % 60));
    function addZero(b) {
        var b = b < 10 ? '0' + b : b;
        return b;
    }
    $('.countdown span').eq(0).text(hours);
    $('.countdown span').eq(1).text(minutes);
    $('.countdown span').eq(2).text(seconds);
}
timing();
var c=parseInt(times/1000);
var timeId2=setInterval(function () {
    c--;
    if(c<=0){
        clearInterval(timeId2);
    }
    timing();
}, 1000)






//数据渲染
$.ajax({
    type: 'get',
    url: '/123',
    success: function (res) {
        for (let i = 0; i < res.length; i++) {
            switch (res[i].CategoryID) {
                case 0: izero++; a(res[i], 0, izero); break;
                case 1: ione++; a(res[i], 1, ione); break;
                case 2: itwo++; a(res[i], 2, itwo); break;
                case 3: ithree++; a(res[i], 3, ithree); break;
                case 4: ifour++; a(res[i], 4, ifour); break;
                case 5: ifive++; a(res[i], 5, ifive); break;
                case 6: isix++; a(res[i], 6, isix); break;
                case 7: iseven++; a(res[i], 7, iseven); break;
            }
        }
    }
})
function a(item, j, id) {
    $(`.brick-item-m-${j} a`).eq(id).attr({ href: `/details?pid=${item.PID}` })
    $(`.brick-item-m-${j} img`).eq(id).attr({ src: item.img1, alt: item.Title })
    $(`.brick-item-m-${j} .title`).eq(id).text(item.PName)
    $(`.brick-item-m-${j} span`).eq(id).text(item.ShoppPrice)
    $(`.brick-item-m-${j} del`).eq(id).text(item.CostpPrice)
    $(`.brick-item-m-${j} .desc`).eq(id).text(item.details)
}