//退出的a标签
$('#logout').on('click',function(e){
    e.preventDefault();
    $.ajax({
        url:'/login/logout.jsp',
        type:'post',
        success:function(res){
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
            prizeBox.innerText = `退出成功`
            document.body.appendChild(prizeBox)
            var timer=setInterval(function(){
                document.body.removeChild(prizeBox)
            },2000)
            setTimeout(function(){
                window.location.href = 'http://127.0.0.1:3000/';
            },500)
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