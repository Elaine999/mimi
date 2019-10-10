;
(function () {
    var _global;

    function pager(container, count, cutnum, arg) {
        var _this = this;
        this.container = container;
        this.count = count;
        this.cutnum = cutnum;
        this.navNode = '';
        this.arg = arg;
        this.init();
        this.handle();
    }
    pager.prototype = {
        constructor: pager,
        getImg: function (imgtype = 0, key = '', activeNum) {
            var xhr = null;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest()
            } else {
                xhr = new ActiveXObject('Micrsoft.XMLHTTP')
            }
            xhr.onreadystatechange = function () {
                //回调函数
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var str = ''
                    try {
                        var data = JSON.parse(xhr.responseText)
                        var imgs = data.data
                        var len = imgs.length > 8 ? 8 : imgs.length;
                        // console.log(len);
                        for (let i = 0; i < len; i++) {
                            str += `<div class="imgBox">
                                <img src="${imgs[i].i_imgsrc}" alt="">
                                <h4>${imgs[i].i_imgname}</h4>
                                <p>${imgs[i].i_imgdes}</p>
                            </div>`
                        }
                        list.innerHTML = str;
                        console.log(list.innerHTML);
                        //分页部分
                        // var pagenum = Math.ceil(imgs.length/8)
                    } catch (error) {
                        list.innerHTML = xhr.responseText;
                    }
                }
            }
            xhr.open('get', `getimg.do?type=${imgtype}&key=${key}&startnum=${(activeNum-1)*8}`);
            xhr.send(null)
        },
        init: function () {
            if (this.count > 6) {
                this.navNode = `<div class="nav-pager">
                                    <ul>
                                        <li class="prev-page">上一页</li>
                                        <li class='num'>1</li>
                                        <li class='num'>2</li>
                                        <li class='num'>3</li>
                                        <li class='num'>4</li>
                                        <li class='num disabled'>...</li>
                                        <li class='num'></li>
                                        <li class="next-page">下一页</li>
                                        <li class="jump-text">
                                            <input name="text" type="text" id="NewPage" onKeyUp="value=value.replace(/\\\D/g,'')"
                                                onafterpaste="value=value.replace(/\\\D/g,'')">
                                        </li>
                                        <li class="jump-btn">确定</li>
                                    </ul>
                                </div>`;
                $(this.navNode).insertAfter(this.container);
                $('li.num:last').text(`${this.count}`)
            } else {
                this.navNode = `<div class="nav-pager">
                                    <ul>
                                        <li class="prev-page">上一页</li>
                                        <li class="next-page">下一页</li>
                                        <li class="jump-text">
                                            <input name="text" type="text" id="NewPage" onKeyUp="value=value.replace(/\\\D/g,'')"
                                                onafterpaste="value=value.replace(/\\\D/g,'')">
                                        </li>
                                        <li class="jump-btn">确定</li>
                                    </ul>
                                </div>`;
                $(this.navNode).insertAfter(this.container);
                for (let i = 0; i < this.count; i++) {
                    $(`<li class = 'num'>${this.count - i}</li>`).insertAfter($('.prev-page'))
                }
            }
            /* 设置默认样式 */
            $('li.num:first').addClass('active')
            $('li.prev-page').addClass('disabled')
        },
        handle() {
            var _this = this;
            $('li.num').on('click', function () {

                if ($(this).hasClass('disabled')) {
                    return
                } else {
                    if (_this.count > 6) {
                        _this.clickNum(_this, this, parseInt($(this).text()))
                    } else {
                        _this.clickNumOne(_this, this, parseInt($(this).text()))
                    }
                }
            })
            $('li.prev-page').on('click', function () {
                if ($(this).hasClass('disabled')) {
                    return
                } else {
                    _this.clickPrev(_this, parseInt($('li.active').text()))
                }
            })
            $('li.next-page').on('click', function () {
                if ($(this).hasClass('disabled')) {
                    return
                } else {
                    _this.clickNext(_this, parseInt($('li.active').text()))
                }
            })
            $('li.jump-btn').on('click', function () {
                // console.log(parseInt($('#NewPage').val()));
                if (!isNaN(parseInt($('#NewPage').val()))) {
                    console.log(parseInt($('#NewPage').val()));
                    _this.jump(_this, parseInt($('#NewPage').val()))
                }
            })
        },

        clickNumOne(_this, that, activeNum) {
            $(that).addClass('active').siblings().removeClass('active')
            if ($(that).text() == 1) {
                $('li.next-page').removeClass('disabled') //启用下一页
                $('li.prev-page').addClass('disabled') //启用上一页
            } else if ($(that).text() == _this.count) {
                $('li.next-page').addClass('disabled') //启用下一页
                $('li.prev-page').removeClass('disabled') //启用上一页
            } else {
                $('li.next-page').removeClass('disabled') //启用下一页
                $('li.prev-page').removeClass('disabled') //启用上一页
            }
            _this.getImg(_this.arg[0], _this.arg[1], $(that).text())
        },
        clickNum(_this, that, activeNum) {
            // console.log(typeof activeNum);
            if (activeNum == 2 || activeNum == 3 || activeNum == _this.count - 1 || activeNum == _this.count - 2) {
                $(that).addClass('active').siblings().removeClass('active')
                $('li.next-page').removeClass('disabled') //启用下一页
                $('li.prev-page').removeClass('disabled') //启用上一页
            } else if (activeNum == 1) {
                //点击第一页
                $(that).addClass('active').siblings().removeClass('active').removeClass('disabled')
                for (let i = 1; i < $('li.num').length; i++) {
                    if (i == 4) {
                        $('li.num').eq(i).text('...').addClass('disabled')
                    } else if (i == $('li.num').length - 1) {
                        $('li.num').eq(i).text(_this.count)
                    } else {
                        $('li.num').eq(i).text(i + 1)
                    }
                }
                $('li.next-page').removeClass('disabled') //启用下一页
                $('li.prev-page').addClass('disabled') //禁用上一页
            } else if (activeNum == _this.count) {
                //点击最后一页
                $(that).addClass('active').siblings().removeClass('active').removeClass('disabled')
                var number = 3;
                for (let i = 1; i < $('li.num').length; i++) {
                    if (i == 1) {
                        $('li.num').eq(i).text('...').addClass('disabled')
                    } else if (i == $('li.num').length - 1) {
                        $('li.num').eq(i).text(_this.count)
                    } else {
                        $('li.num').eq(i).text(_this.count - number)
                        number--
                    }
                }
                $('li.prev-page').removeClass('disabled') //启用上一页
                $('li.next-page').addClass('disabled') //禁用下一页
            } else if (activeNum == _this.count - 3) {
                $('li.num').eq(1).addClass('disabled').text('...').end().eq(2).text(activeNum).addClass('active').siblings().removeClass('active').end().end().eq(3).text(_this.count - 2).end().eq(4).removeClass('disabled').text(_this.count - 1)
                $('li.next-page').removeClass('disabled') //启用下一页
                $('li.prev-page').removeClass('disabled') //启用上一页
            } else {
                $('li.num').eq(1).addClass('disabled').text('...').end().eq(2).text(activeNum).addClass('active').siblings().removeClass('active').end().end().eq(3).text(activeNum + 1);
                $('li.next-page').removeClass('disabled') //启用下一页
                $('li.prev-page').removeClass('disabled') //启用上一页
            }
            _this.getImg(_this.arg[0], _this.arg[1], activeNum)
        },
        /** 
         * @method 点击上一页
         * @_this 全局this
         * @activeNum 当前的数字
         */
        clickPrev(_this, activeNum) {
            if ($('li.next-page').hasClass('disabled')) {
                $('li.next-page').removeClass('disabled')
            }
            if (activeNum == _this.count || activeNum == _this.count - 1 || activeNum == _this.count - 2 || activeNum == 3 || activeNum == 2) {
                if (activeNum == 2) {
                    $('li.prev-page').addClass('disabled') //禁用上一页
                }
                $('li.active').removeClass('active').prev().addClass('active')
            } else if (activeNum == 4) { //activeNum==_this.count-3
                $('li.num').eq(1).text(activeNum - 2).removeClass('disabled').end().eq(2).text(activeNum - 1).addClass('active').siblings().removeClass('active').end().end().eq(3).text(activeNum).end().eq(4).addClass('disabled').text('...')
            } else {
                $('li.num').eq(1).addClass('disabled').text('...').end().eq(2).text(activeNum - 1).addClass('active').siblings().removeClass('active').end().end().eq(3).text(activeNum).end().eq(4).text('...').addClass('disabled');
            }
            _this.getImg(_this.arg[0], _this.arg[1], activeNum - 1)
        },
        clickNext(_this, activeNum) {
            if ($('li.prev-page').hasClass('disabled')) {
                $('li.prev-page').removeClass('disabled')
            }
            if (activeNum == _this.count - 1 || activeNum == _this.count - 2 || activeNum == _this.count - 3 || activeNum == 2 || activeNum == 1) {
                if (activeNum == _this.count - 1) {
                    $('li.next-page').addClass('disabled') //禁用上一页
                }
                $('li.active').removeClass('active').next().addClass('active')
            } else if (activeNum == _this.count - 4) {
                $('li.num').eq(1).addClass('disabled').text('...').end().eq(2).text(activeNum + 1).addClass('active').siblings().removeClass('active').end().end().eq(3).text(_this.count - 2).end().eq(4).removeClass('disabled').text(_this.count - 1)
            } else {
                $('li.num').eq(1).addClass('disabled').text('...').end().eq(2).text(activeNum + 1).addClass('active').siblings().removeClass('active').end().end().eq(3).text(activeNum + 2);
            }
            _this.getImg(_this.arg[0], _this.arg[1], activeNum + 1)
        },
        jump(_this, num) {
            if (num > _this.count) {
                return
            } else {
                if (_this.count > 6) {
                    if (num >= 1 && num <= 3) {
                        $('li.num').eq(num - 1).addClass('active').siblings().removeClass('active')
                        for (let i = 1; i < $('li.num').length; i++) {
                            if (i == 4) {
                                $('li.num').eq(i).text('...').addClass('disabled')
                            } else if (i == $('li.num').length - 1) {
                                $('li.num').eq(i).text(_this.count)
                            } else {
                                $('li.num').eq(i).text(i + 1)
                            }
                        }
                        $('li.next-page').removeClass('disabled') //启用下一页
                        if (num == 1) {
                            $('li.prev-page').addClass('disabled')
                        }
                    } else if (num <= _this.count && num >= _this.count - 3) {
                        $('li.num').eq(num - (_this.count - 3) + 2).addClass('active').siblings().removeClass('active')
                        var number = 3;
                        for (let i = 1; i < $('li.num').length; i++) {
                            if (i == 1) {
                                $('li.num').eq(i).text('...').addClass('disabled')
                            } else if (i == $('li.num').length - 1) {
                                $('li.num').eq(i).text(_this.count)
                            } else {
                                $('li.num').eq(i).text(_this.count - number)
                                number--
                            }
                        }
                        $('li.prev-page').removeClass('disabled') //启用上一页
                        if (num == _this.count) {
                            $('li.next-page').addClass('disabled') //启用下一页
                        }
                    } else {
                        $('li.num').eq(1).addClass('disabled').text('...').end().eq(2).text(num).addClass('active').siblings().removeClass('active').end().end().eq(3).text(num + 1);
                        $('li.next-page').removeClass('disabled') //启用下一页
                        $('li.prev-page').removeClass('disabled') //启用上一页
                    }
                } else {
                    $('li.num').eq(num-1).addClass('active').siblings().removeClass('active')
                    if (num == 1) {
                        $('li.next-page').removeClass('disabled') //启用下一页
                        $('li.prev-page').addClass('disabled') //启用上一页
                    } else if (num == _this.count) {
                        $('li.next-page').addClass('disabled') //启用下一页
                        $('li.prev-page').removeClass('disabled') //启用上一页
                    } else {
                        $('li.next-page').removeClass('disabled') //启用下一页
                        $('li.prev-page').removeClass('disabled') //启用上一页
                    }
                }

                _this.getImg(_this.arg[0], _this.arg[1], num)
            }
        }
    }

    _global = (function () {
        return this;
    })();
    !(pager in _global) && (_global.pager = function (container, count, cutnum, arg) {
        return new pager(container, count, cutnum, arg)
    })
})()