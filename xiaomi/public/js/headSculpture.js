$('.tip_btns .a1').on('click',function(){
    $('.popup_mask').hide();
})
$('.btn_mod_close').on('click',function(){
    $('.popup_mask').hide();
})
$('.uplodefile').on('change',function(){
    $('.mod_acc_tip').hide();
})
$('.tip_btns .a2').on('click',function(){
    $('.mod_acc_tip').show();
    $('.alertface').hide();
})
        var imgList = $('.imgList')
        var fileInput = document.querySelector('.uplodefile')
        var imgBox = $('.imgBox')
        var box = document.querySelector('.box')
        var small = document.querySelector('#small')
        var big = document.querySelector('#big')

        var img1 = $('#img1')
        var img2 = $('#img2')
        var img3 = $('#img3')
        var background = $('.background')
        var gray = $('.gray')
        var file = null;
        var dx, dy, mx, my, scale = 1, positionX, positionY, scaleWidth, scaleHeight

        /** @type {HTMLCanvasElement} */
        var canvasNode = document.createElement('canvas')
        canvasNode.width = 200;
        canvasNode.height = 200;
        var cvs = canvasNode.getContext('2d')
        /** @type {HTMLCanvasElement} */
        var mycanvas = document.createElement('canvas')
        mycanvas.width = parseInt(imgBox.css('width'))
        mycanvas.height = parseInt(imgBox.css('height'))
        var ctx = mycanvas.getContext('2d')

        fileInput.onchange = function (e) {
            gray.css('display', 'none')
            file = fileInput.files[0];
            var url = window.webkitURL.createObjectURL(file)
            var img = new Image()
            img.src = url;
            $('.alertface').show();
            $('.mod_acc_tip').hide();

            function changeScale() {
                /* 初始化和改变缩放倍数时执行的函数 */
                scaleWidth = img.width * scale
                scaleHeight = img.height * scale
                imgBox.css({
                    'backgroundImage': `url(${img.src})`,
                    'backgroundSize': `${scaleWidth}px ${scaleHeight}px`,
                    'backgroundPositionX': `${-(scaleWidth / 2 - parseInt(imgBox.css('width')) / 2)}px`,
                    'backgroundPositionY': `${-(scaleHeight / 2 - parseInt(imgBox.css('height')) / 2)}px`
                })
            }
            function drewCanvas() {
                /* 通过一个和imgBox一样大的canvas去获取当前显示区域的img信息，显示在与显示区域一样大的另一个canvas中 */
                ctx.clearRect(0, 0, 300, 300)
                ctx.drawImage(img, positionX, positionY, scaleWidth, scaleHeight)
                var date = ctx.getImageData(50, 50, 200, 200)
                cvs.putImageData(date, 0, 0);
            }
            box.onmousewheel = function (e) {
                /* 滚轮缩放 */
                if (e.deltaY > 0 && scale > 0.05) {
                    scale -= 0.05
                } else if (e.deltaY < 0) {
                    scale += 0.05
                }
                changeScale()
            }

            img.onload = function () {
                changeScale()

                box.onmousedown = function (de) {
                    dx = de.clientX;
                    dy = de.clientY;
                    positionX = parseInt(imgBox.css('backgroundPositionX'))
                    positionY = parseInt(imgBox.css('backgroundPositionY'))
                    box.onmousemove = function (me) {

                        me.preventDefault()
                        mx = me.clientX
                        my = me.clientY
                        /* 只改变我们能够看到的imgBox的位置，在下面通过函数调用去改变画布中的位置 */
                        imgBox.css({ 'backgroundPositionX': `${positionX + (mx - dx)}px`, 'backgroundPositionY': `${positionY + (my - dy)}px` })
                        drewCanvas()
                    }
                    box.onmouseup = function () {
                        positionX = parseInt(imgBox.css('backgroundPositionX'))
                        positionY = parseInt(imgBox.css('backgroundPositionY'))
                        drewCanvas()

                        img1.attr('src', canvasNode.toDataURL())
                        img2.attr('src', canvasNode.toDataURL())
                        img3.attr('src', canvasNode.toDataURL())
                        box.onmousemove = null;
                    }
                }
            }
        }
        $('#confirm').on('click',function(){
            
        })