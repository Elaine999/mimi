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
    },3000)
//移入停止！！！
swiperWrapperimg.mouseenter(function(){
    window.clearInterval(timeId);
})
swiperWrapperimg.mouseleave(function(){
    var timeId=setInterval(function(){
        index++;
        if(index>len-1){
            index=0;
        }
        $(swiperWrapperimg[index]).fadeIn('slow').siblings('.swiperWrapper').fadeOut('fast');
        $(smallpoints[index]).addClass('smallShow').siblings().removeClass('smallShow')
    },3000) 
})