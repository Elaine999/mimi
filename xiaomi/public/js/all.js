    let phoneBox = document.querySelector(".phoneBox")
    let payBox = document.querySelector(".payBox")
    let carTips = document.querySelector(".carTips")

    let nodestr = `<div class="combox">
                    <div class="comtext">
                        <textarea name="comcontent" id="comcontent" placeholder="写点什么吧！" cols="30" rows="10"></textarea>
                    </div>
                    <div class="appbtn">
                        <button id="cancel">取消</button>
                        <button id="sub">发布</button>
                    </div>
                </div>`
    let compid = null;
    let comuid = null;
    $("body").click(function (e) {
        if (e.target.className == "del") {
            let CiD = e.target.dataset.cid
            $(nodestr).appendTo($('body'))
            $.ajax({
                url: "/all/all.jsp",
                type: 'get',
                data: {
                    cid: CiD,
                },
                success: function (res) {
                    compid = res.data[0].pid;
                    comuid = res.data[0].uid;
                }
            })
        }
        if (e.target.id == 'cancel') {
            $('.combox').remove()
        }
        if (e.target.id == 'sub') {
            $.ajax({
                url: '/com/insert',
                type: 'post',
                data: {
                    pid: compid,
                    uid: comuid,
                    content: $('#comcontent').val()
                },
                success: function (res) {
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
                    prizeBox.innerText = `发布成功！`
                    document.body.appendChild(prizeBox)
                    setTimeout(function () {
                        document.body.removeChild(prizeBox)
                        $('.combox').remove()
                    }, 700)
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
            let sum = 0
            for (var i = 0; i < res.length; i++) {
                if (res[i].uid == userId) {
                    if (document.querySelector(".carTips")) {
                        phoneBox.removeChild(carTips)
                    }
                    sum = parseInt(sum) + parseInt(res[i].ppri)
                    phoneBox.innerHTML += `
                <ul>
                <li>&nbsp;</li>
                <li><a href="/details?pid=${res[i].pid}"><img style="height: 80px;width: 80px" src="${res[i].pimg}"></a></li>
                <li> ${res[i].pname}（${res[i].vers}） </li>
                <li> ${res[i].ppri}元</li>
                <li class="inputBoxs">
                    <input type="button" value="-">
                    <input type="text" value="1" class="textBtns">
                    <input type="button" value="+">
                </li>
                <li>${res[i].ppri}元</li>
                <li><input data-cid="${res[i].cid}" class="del" type="button" value="评价" style="outline: none;background: orangered;color: white;text-align: center;border:none;width: 60px;height: 40px;font-size:14px;"></li>
            </ul>
                `
                }

            }
        }

    })