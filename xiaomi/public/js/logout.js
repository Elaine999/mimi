//退出的a标签
$('#logout').on('click',function(e){
    e.preventDefault();
    $.ajax({
        url:'/login/logout.jsp',
        type:'post',
        success:function(res){
            window.location.href = 'http://127.0.0.1:3000/';
        }
    })
})