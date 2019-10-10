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

//查询的绑定
// $('#searchbtn').on('click',function(e){
//     e.preventDefault();
//     console.log($('#search').val());
//     $.ajax({
//         url:'/search_result',
//         type:'get',
//         data:{key:$('#search').val()},
//         success:function(res){
//             console.log(res.data);
//             window.location.href = 'http://127.0.0.1:3000/search_result';

//         }
//     })
// })