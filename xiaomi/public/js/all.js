    let phoneBox = document.querySelector(".phoneBox")
    let payBox = document.querySelector(".payBox")
    let nodestr = `<div class="combox">
                    <div class="comtext">
                        <textarea name="comcontent" id="comcontent" placeholder="写点什么吧！" cols="30" rows="10"></textarea>
                    </div>
                    <div class="appbtn">
                        <button id="cancel">取消</button>
                        <button id="sub">发布</button>
                    </div>
                </div>`

    $("body").click(function (e) {
        if (e.target.className == "del") {
            let CiD = e.target.dataset.cid
            console.log(e.target);
            $(nodestr).appendTo($('body'))
            $.ajax({
                url: "/all/all.jsp",
                type: 'get',
                data: {
                    cid: CiD,
                },
                success: function (res) {
                    console.log(res);
                }
            })
        }


    })
    $.ajax({
        url: "/all/all.php",
        type: 'get',
        data: {
            ruid: userId
        },
        success: function (res) {
            // console.log(res[0]);
            let sum = 0
            for (var i = 0; i < res.length; i++) {
                // console.log(res[i]);

                if (res[i].Uid == userId) {

                    sum = parseInt(sum) + parseInt(res[i].Ppri)
                    phoneBox.innerHTML += `
                <ul>
                <li>&nbsp;</li>
                <li><img style="height: 80px;width: 80px" src="${res[i].Pimg}"></li>
                <li> ${res[i].Pname} </li>
                <li> ${res[i].Ppri}元</li>
                <li class="inputBoxs">
                    <input type="button" value="-">
                    <input type="text" value="1" class="textBtns">
                    <input type="button" value="+">
                </li>
                <li>${res[i].Ppri}元</li>
                <li><input data-cid="${res[i].Cid}" class="del" type="button" value="去评价" style="outline: none;background: orangered;color: white;text-align: center;border:none;width: 60px;height: 40px;font-size:14px;"></li>
            </ul>
                `
                }

            }
        }

    })