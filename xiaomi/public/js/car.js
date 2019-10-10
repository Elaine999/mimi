    let phoneBox = document.querySelector(".phoneBox")
   let payBox=document.querySelector(".payBox")


$("body").click(function(e){
   if(e.target.className=="del"){
      let CiD= e.target.dataset.cid
      $(e.target).parent().remove()

      $.ajax({
        url: "/car/car.jsp",
        type: 'get',
        data:{
            cid:CiD
        },
        success:function(res){
            // console.log(res[0].Pid);
        }
      })
   }
    
    
})
    $.ajax({
        url: "/car/car.php",
        type: 'get',
        success:function(res) {
            // console.log(res[0].Pimg);
            let sum = 0
            for (var i = 0; i < res.length; i++) {
                sum=parseInt(sum)+ parseInt(res[i].Ppri) 
                phoneBox.innerHTML += `
                <ul>
                <li>&nbsp;</li>
                <li><img style="height: 80px;width: 80px" src="${res[i].Pimg}"></li>
                <li> ${res[i].Pname} </li>
                <li> ${res[i].Ppri} </li>
                <li class="inputBoxs">
                    <input type="button" value="-">
                    <input type="text" value="1" class="textBtns">
                    <input type="button" value="+">
                </li>
                <li>${res[i].Ppri}</li>
                <li class="del" data-cid="${res[i].Cid}">X</li>
            </ul>
                `
            }
            payBox.innerHTML=`
            <p>共${res.length}件商品，已选择${res.length}件</p>
            <span>合计<b>${sum}</b>元</span>
            <div class="right">
            去结算
            </div>
            `
        }

    })
