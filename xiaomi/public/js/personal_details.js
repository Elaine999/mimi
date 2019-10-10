var avatar = document.querySelector(".avatar");
var details = document.querySelector(".details");
var selects = document.querySelectorAll("select");
var inputs = document.querySelectorAll("input");
var year = "";
var month = "";
var day = "";
var b_email = document.querySelector(".email");
var b_tel = document.querySelector(".tel")
console.log(b_tel);

$(details).height($(avatar).height());

for (let i = 1900; i <= new Date().getFullYear(); i++) {
    year += `<option value="${i}">${i}</option>`;
}
for (let i = 1; i <= 12; i++) {
    month += `<option value="${i}">${i}</option>`;
}
selects[0].innerHTML = year;
selects[1].innerHTML = month;
selects[0].onchange = function() {
    let year = event.target.value;
    selects[1].onchange = function() {
        let month = event.target.value;
        let date = new Date(year, month, 0).getDate();
        for (var i = 1; i <= date; i++) {
            day += `<option value="${i}">${i}</option>`;
        }
        selects[2].innerHTML = day;
    }
}

for (var i = 0; i < inputs.length; i++) {
    let email = null;
    if (inputs[i].type == "email") {
        email = inputs[i];
        email.onblur = function() {
            let email_value = email.value;
            let email_pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (email_pattern.test(email_value) == true) {
                b_email.innerHTML = "&#xe502";
                b_email.style.color = "#0F0";
            } else {
                b_email.innerHTML = "&#xe504";
                b_email.style.color = "#F00";
            }
        }
    }
    let tel = null;
    if (inputs[i].type == "tel") {
        tel = inputs[i];
        tel.onblur = function() {
            let tel_value = tel.value;
            let tel_pattern = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (tel_pattern.test(tel_value) == true) {
                b_tel.innerHTML = "&#xe502";
                b_tel.style.color = "#0F0";
            } else {
                b_tel.innerHTML = "&#xe504";
                b_tel.style.color = "#F00";
            }
        }
    }
}