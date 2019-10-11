var date2=(new Date()).getHours();
if(date2>=6 && date2< 12){
    $('.tip').text('早上好~');
}else if(date2>=12 && date2<13){
    $('.tip').text('中午好~');
}else if(date2>=13 && date2<=18){
    $('.tip').text('下午好~');
}else{
    $('.tip').text('晚上好~');    
}
