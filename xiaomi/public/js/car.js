    let phoneBox = document.querySelector(".phoneBox")
   
    $.ajax({
        url: "/car/car.php",
        type: 'get',
        success:function(res) {
            console.log(res[0].Pimg);
            
            for (var i = 0; i < res.length; i++) {
                let sum = res[i].Ppri
                sum=sum+res[i].Ppri
                phoneBox.innerHTML += `
                <ul>
                <li>&nbsp;</li>
                <li><img src="${res[i].Pimg}"></li>
                <li> ${res[i].Pname} </li>
                <li> ${res[i].Ppri} </li>
                <li class="inputBoxs">
                    <input type="button" value="-">
                    <input type="text" value="1" class="textBtns">
                    <input type="button" value="+">
                </li>
                <li>${sum}</li>
                <li>X</li>
            </ul>
                `
            }
        }

    })

   