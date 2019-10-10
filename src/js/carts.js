$(function(){
    init();
    
    function init() {
        $('#goodsnum').text(0);
        var cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
        var cookieObj = toObj(cookieStr);
        var summ = 0;
            for (var i in cookieObj) {
                summ += parseInt(cookieObj[i].num);
            }
        $('#goodsnum').text(summ);
    }


        var cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
        var cookieObj = toObj(cookieStr);

        for (var key in cookieObj) {
        var good = cookieObj[key];
        var str = "\n                        <tr id=\"goodDetail\">\n                        <td>\n                            <input type=\"checkbox\" class=\"checkbox\">\n                        </td>\n                        <td>\n                            <img src=\"".concat(good.src, "\"><p id=\"goodname\">").concat(good.name, "</p>\n                        </td>\n                        <td>\u65F6\u88C5</td>\n                        <td id=\"singlePrice\">").concat(good.price, "Q\u5E01</td>\n                        <td>1\u4E2A</td>\n                        <td id=\"num\">\n                            <input type=\"button\" value=\"-\" id=\"minus\"><input type=\"text\" value=\"").concat(good.num, "\" id=\"number\"><input type=\"button\" value=\"+\" id=\"plus\">\n                        </td>\n                        <td>\u65E0\u4F18\u60E0</td>\n                        <td id='totalPrice'>").concat(good.price * good.num, "Q\u5E01</td>\n                        <td><a href=\"javascript:;\" id=\"remove\">\u5220\u9664</a></td>\n                    </tr>\n\t\t\t\t");
        $('#empty').replaceWith(str);
        }
        

        var totalPrice =$('#totalPrice');
        var singlePrice = parseFloat($('#singlePrice').text());

        var minus =$('#minus')
        minus.click(function(){
            var num = $('#number').val();
            num--;
            if(num<1){
                num = 1;
            }
            $('#number').val(num);
            totalPrice.text((num * singlePrice).toFixed(2) + 'Q币');
            $('#jsInfo_price').text(totalPrice.text());
            $('#jsInfo_num').text(numinput.val());
            if($(ckd).prop("checked")){
                $('#finishPrice').text(totalPrice.text());
            }else{
                $('#finishPrice').text('0.00Q币');
            }

        })

        var plus = $('#plus')
        plus.click(function(){
            var num = $('#number').val();
            num++;
            if(num>99){
                num = 999;
                alert('数量最大为999！');
            }
            $('#number').val(num);
            totalPrice.text((num * singlePrice).toFixed(2) + 'Q币');
            $('#jsInfo_price').text(totalPrice.text());
            $('#jsInfo_num').text(numinput.val());
            if($(ckd).prop("checked")){
                $('#finishPrice').text(totalPrice.text());
            }else{
                $('#finishPrice').text('0.00Q币');
            }
        })


        var numinput = $('#number')
        numinput.blur(function(){
            var num = $(this).val();
            var re = /\D/;
            if(re.test(num)){
                num =1;
            }else if (num>999){
                num = 999;
                alert('数量最大为999！');
            }
            $(this).val(num);
            totalPrice.text((num * singlePrice).toFixed(2) + 'Q币');
            $('#jsInfo_price').text(totalPrice.text());
            $('#jsInfo_num').text(numinput.val());
            if($(ckd).prop("checked")){
                $('#finishPrice').text(totalPrice.text());
            }else{
                $('#finishPrice').text('0.00Q币');
            }
        })

        var ckd=$(".checkbox");
        $("#qxbox").click(function() {				//首先给id为全选的元素增加单击事件
            if(this.checked){						//判断当前按钮是否被选中
               for(var i=0;i<ckd.length;i++){			//判断之后要循环改变所有复选框的值
                     ckd[i].checked=true;					//结果为真（选中），则复选框为true;
                     }
            }else{
               for(var i=0;i<ckd.length;i++){
                     ckd[i].checked=false;					//结果为假（未选中），则复选框为false;
               }
            }
            if($(ckd).prop("checked")){
                $('#jsInfo').show();
                $('#finishPrice').text(totalPrice.text());
                $('#jsInfo_price').text(totalPrice.text());
                $('#jsInfo_num').text(numinput.val());
                $('#submit').css("background","#f74a4a");
                $('#submit').css("cursor","pointer");
            }else{
                $('#jsInfo').hide(); 
                $('#finishPrice').text('0.00Q币');
                $('#submit').css("background","#666666");
                $('#submit').css("cursor","default");
            }
        })
        ckd.click(function(){
            if($(this).prop("checked")){
                $('#jsInfo').show();
                $('#finishPrice').text(totalPrice.text());
                $('#jsInfo_price').text(totalPrice.text())
                $('#jsInfo_num').text(numinput.val());
                $('#submit').css("background","#f74a4a");
                $('#submit').css("cursor","pointer");
            }else{
                $('#jsInfo').hide(); 
                $('#finishPrice').text('0.00Q币');
                $('#submit').css("background","#666666");
                $('#submit').css("cursor","default");
            }
        })

        if($(ckd).prop("checked")){
            $('#jsInfo').show();
        }
    var remover = $('#remove');
    remover.click(function(){
        var id = $('#goodname').text();
        var cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
        var cookieObj = toObj(cookieStr);
        delete cookieObj[id];
        $.cookie('carts', JSON.stringify(cookieObj), {
            expires: 7,
            path: '/'
        });
        $('#goodDetail').remove();
        $('#jsInfo').remove();
        $('#finishPrice').text('0.00 Q币');
        $('#jsInfo_price').text('0.00 Q币');
        $('#jsInfo_num').text(0);
        if(!$.contains($("#info_detail"),$("#goodDetail"))){
            $('<tr id=\"empty\">\n<td colspan=\"9\">\u60A8\u7684\u8D2D\u7269\u8F66\u8FD8\u6CA1\u6709\u9053\u5177\uFF0C\u8D76\u5FEB\u53BB\u6311\u9009\u51E0\u4E2A\u5427 <a href=\"javascript:;\"> \u6211\u8981\u4E70</a></td>\n</tr>').appendTo($("#info_detail"));
        }
    })


    function toObj(str) {
        if (!str) {
            return {};
        }
        return JSON.parse(str);
    }
    
})
