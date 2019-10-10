console.log(pid);

var string = '123T12354'
var strin = string.split('T')[0]
console.log(strin);
window.onload = function () {
    $.ajax({
        url: '/com/search',
        type: 'get',
        data: {
            pid: pid
        },
        success: function (res) {
            console.log(res);
            var str=''
            var dateday ='';
            var datetime='';
            for (let i = 0; i < res.data.length; i++) {
                dateday=res.data[i].comdate.split('T')[0]
                // console.log(res.data[i].comdate.split('T')[1].split('.')[0]);
                datetime=res.data[i].comdate.split('T')[1].split('.')[0] 
                str+=`<div class="discuss">
                <div class="dis-head">
                        <div class="head-portrait"><img src="${res.data[i].Avatar}" alt=""></div>
                        <div class="head-name">${res.data[i].nickname}</div>
                        <div class="head-time">${dateday}  ${datetime}</div>
                    </div>
                    <div class="dis-body">
                        <p class="dis-text">${res.data[i].content}</p>
                        <div class="ope">
                                <a href="javascript:void(0);"><i>99</i> ${res.data[i].likes}点赞</a>
                                <a href="javascript:void(0);"><i>88</i>评论</a>
                                <a href="javascript:void(0);"><i>77</i>分享</a >
                        </div>
                    </div>
                    </div>`
            }
            $(str).appendTo($('.review'));
        }
    })
}