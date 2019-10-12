
    $.ajax({
        url: '/com/search',
        type: 'get',
        data: {
            pid: pid
        },
        success: function (res) {
            $('.empty').remove()
            var str=''
            var dateday ='';
            var datetime='';
            for (let i = 0; i < res.data.length; i++) {
                dateday=res.data[i].comdate.split(' ')[0]
                datetime=res.data[i].comdate.split(' ')[1]
                str+=`<div class="discuss">
                <div class="dis-head">
                        <div class="head-portrait"><img src="${res.data[i].Avatar}" alt=""></div>
                        <div class="head-name">${res.data[i].nickname}</div>
                        <div class="head-time">${dateday}  ${datetime}</div>
                    </div>
                    <div class="dis-body">
                        <p class="dis-text">${res.data[i].content}</p>
                        <div class="ope">
                                <a href="javascript:void(0);"><i class="icon-good_active-copy"></i>  ${res.data[i].likes}点赞</a>
                                <a href="javascript:void(0);"><i class="icon-pinglun"></i>  评论</a>
                                <a href="javascript:void(0);"><i class="icon-zhuanfa"></i>  分享</a >
                        </div>
                    </div>
                    </div>`
            }
            $(str).appendTo($('.review'));
        }
    })