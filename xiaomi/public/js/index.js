



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


;(function(){
    var _global;
    function move(){
        var swiperWrapperimg=$('.swiperWrapper');//获取图片
        var index=0;
        var len=swiperWrapperimg.length;//获取图片个数
        var smallpoints=$('.swiper_pagination_ul>li');//获取小圆点
// 背景图片切换-上一张
$('.swiper_button_prev').on('click',function(){
    index--;
    if(index<0){
        index=4;
    }
    $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
    $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')
})
// 背景图片切换-下一张
$('.swiper_button_next').on('click',function(){
    index++;
    if(index>len-1){
        index=0;
    }
    $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
    $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')
})
// 点击切换到相应的图片-按钮
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
        console.log(status)
    },4000) 
//移入停止！！！
swiperWrapperimg.mouseover(function(){
    window.clearInterval(timeId);
})
//移除启动定时器
swiperWrapperimg.mouseout(function(){
    timeId=setInterval(function(){
        index++;
        if(index>len-1){
            index=0;
        }
        $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
        $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')
    },4000)
})
    }
 _global=(function(){return this;}())
 !(move in _global) && (_global.move = move);
}())

new move();

//搜索框
$('#search').focus(function(){
    $('#search').css({borderColor:'#ff7600'});
    $('.search_btn').css({borderColor:'#ff7600'});
    $('.search_hot_words').hide();
})
$('#search').blur(function(){
    $('#search').css({borderColor:'rgb(224, 224, 224)'});
    $('.search_btn').css({borderColor:'rgb(224, 224, 224)'});
    $('.search_hot_words').show();
})