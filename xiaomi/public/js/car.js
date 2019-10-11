let phoneBox = document.querySelector(".phoneBox")
let payBox = document.querySelector(".payBox")
let carTips = document.querySelector(".carTips")

$("body").click(function (e) {
    if (e.target.className == "del") {
        let CiD = e.target.dataset.cid
        $(e.target).parent().remove()

        $.ajax({
            url: "/car/car.jsp",
            type: 'get',
            data: {
                cid: CiD,
            },
            success: function (res) {
                window.location.href = 'http://127.0.0.1:3000/car'
                console.log(res);
            }
        })
    }

    if (e.target.className == "right") {
        let CiD = e.target.dataset.cid
        $.ajax({
            url: "/car/car.asp",
            type: 'get',
            data: {
                cid: CiD,
                ruid: userId
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
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: " translate(-50%, -50%)"
                })
                prizeBox.innerText = `结算成功`
                document.body.appendChild(prizeBox)
                prizeBox.onclick = function () {
                    document.body.removeChild(prizeBox)
                }
                setTimeout(function () {
                    window.location.href = 'http://127.0.0.1:3000/all'
                }, 2000)
            }

        })
    }

})
$.ajax({
    url: "/car/car.php",
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
                if(document.querySelector(".carTips")){
                    phoneBox.removeChild(carTips)
            }
                sum = parseInt(sum) + parseInt(res[i].Ppri)
                phoneBox.innerHTML += `
                <ul>
                <li>&nbsp;</li>
                <li><img style="height: 80px;width: 80px" src="${res[i].Pimg}"></li>
                <li> ${res[i].Pname}（${res[i].Vers}） </li>
                <li> ${res[i].Ppri}元</li>
                <li class="inputBoxs">
                    <input type="button" value="-">
                    <input type="text" value="1" class="textBtns">
                    <input type="button" value="+">
                </li>
                <li>${res[i].Ppri}元</li>
                <li class="del" data-cid="${res[i].Cid}">X</li>
            </ul>
                `
            }
            payBox.innerHTML = `
            <p>共${res.length}件商品，已选择${res.length}件</p>
            <span>合计<b>${sum}</b>元</span>
            <div class="right">
            去结算
            </div>
            `
        }
    }

})