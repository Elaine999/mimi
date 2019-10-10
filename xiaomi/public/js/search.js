// import { log } from "util";

// console.log(data);
console.log($('#searchword').text());
var keyword = $('#searchword').text();


function getlist(kwd) {
    console.log(kwd);
    $.ajax({
        url: '/search_result/getinfo',
        data: {
            key: kwd
        },
        type: 'get',
        complete: function (res) {
            res.text = JSON.parse(res.responseText)

            if (res.readyState==4&&res.text.state) {
                var str = '';
                for (let i = 0; i < res.text.data.length; i++) {
                    str += `<li class="goods-item">
                            <a href="/details?pid=${res.text.data[i].PID}">
                            <img src="${res.text.data[i].img1}" alt="">
                            <h2 class="title">${res.text.data[i].Title}</h2>
                            <p class="price">${res.text.data[i].ShoppPrice}元 起 `
                    if (res.text.data[i].CostpPrice) {
                        str +=`<del>${res.text.data[i].CostpPrice}元 起 </del></p>`
                    }
                    str +=`<div class="thumbs">
                                <ul class="thumbs-list">
                                    <li><img src="${res.text.data[i].img1}" alt=""></li>
                                </ul>
                            </div>
                            <div class="flags">`;
                    if (res.text.data[i].IsNew) {
                        str += `<span class="zeng">新</span>`
                    }
                    // str += `<span class="zeng">新</span>`
                    str += `</div>
                          </a>
                        </li>`
                }
                $(str).appendTo($('.goods-list'))

            } else if(res.readyState==4&&!res.text.state) {
                $('<p>未找到数据</p>').appendTo($('.goods-list'))
            }
        }
    })
}

window.onload = function () {
    getlist(keyword);
}