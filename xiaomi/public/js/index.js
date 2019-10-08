var swiperWrapperimg=$('.swiperWrapper');//获取图片
var index=0;
var len=swiperWrapperimg.length;//获取图片个数
var smallpoints=$('.swiper_pagination_ul>li');//获取小圆点

// 显示隐藏
$('.siteCategoryOne>ul>li').hover(function(){
    $('.siteCategoryTwo').show();
},
function(){
    $('.siteCategoryTwo').hide();
}
)
$('.siteCategoryTwo').hover(function(){
    $('.siteCategoryTwo').show();
},
function(){
    $('.siteCategoryTwo').hide();
}
)



// 背景图片切换-上一张
$('.swiper_button_prev').on('click',function(){
    index--;
    if(index<0){
        index=4;
    }
    $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
})
// 背景图片切换-下一张
$('.swiper_button_next').on('click',function(){
    index++;
    if(index>len-1){
        index=0;
    }
    $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
})
// 点击切换到相应的图片
smallpoints.on('click',function(){
    var lis=event.target;
    index=$(lis).data('idx');
    $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
    $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')

})
//自动播放
    var timeId=setInterval(function(){
        index++;
        if(index>len-1){
            index=0;
        }
        $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
        $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')
    },4000)
//移入停止！！！
// swiperWrapperimg.mouseenter(function(){
//     window.clearInterval(timeId);
// })
// swiperWrapperimg.mouseenter(function(){
// })

//搜索框
$('#search').focus(function(){
    $('#search').css({borderColor:'#ff7600'});
    $('.search_btn').css({borderColor:'#ff7600'});
})
$('#search').blur(function(){
    $('#search').css({borderColor:'rgb(224, 224, 224)'});
    $('.search_btn').css({borderColor:'rgb(224, 224, 224)'});
})
