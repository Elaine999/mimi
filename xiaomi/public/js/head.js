window.onload = function(){
    getcatnum()
}

function getcatnum() {
    $.ajax({
        url: '/car/car.php',
        type: 'get',
        data: {
            ruid: uidtocarnum
        },
        success:function(res){
            $('.topbarCart').find('span').html(`(${res.length})`)
        }
    })
}