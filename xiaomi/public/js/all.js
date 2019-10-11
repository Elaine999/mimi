    let phoneBox = document.querySelector(".phoneBox")
    let payBox = document.querySelector(".payBox")


    $("body").click(function (e) {
        if (e.target.className == "del") {
            let CiD = e.target.dataset.cid
            // $(e.target).parent().remove()
            console.log(e.target);
            
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
        data:{ruid:userId},
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