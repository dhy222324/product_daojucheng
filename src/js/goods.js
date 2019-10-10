$(function(){
    init();
    $('#carts').click(function(){
        $(window).attr('location','carts.html');
    })
    $('#clearHistory').click(function(){
        $('#lookedgoods').remove();
        $('#clearHistory').remove();
        $('<p>没有历史记录！</p>').appendTo('#looked');
    })
    $('#minus').click(function(){
        var num = $('#number').val();
        num--;
        if(num<1){
            num = 1;
        }
        $('#number').val(num);
        
    })
    $('#plus').click(function(){
        var num = $('#number').val();
        num++;
        if(num>99){
            num = 99;
            alert('数量最大为99！');
        }
        $('#number').val(num);
    })
    $('#number').blur(function(){
        var num = $(this).val();
        var re = /\D/;
        if(re.test(num)){
            num =1;
        }else if (num>99){
            num = 99;
        }
        $(this).val(num);
    })
    $('#buy').click(function(){
        var goodName = $('#goodname').text();
        var price = $('#goodPrice1').text();
        var goodPrice = parseFloat(price.match(/(-?\d+)\.?\d+/g, "")[0]);
        var goodNum = parseInt($('#number').val());
        var goodSrc = $('#imgsrc').attr('src');

        if($('#goodsnum').text()==0){
            $('#goodsnum').text(goodNum);
        }else{
            var goodsSum =parseInt($('#goodsnum').text());
            goodsSum += goodNum;
            $('#goodsnum').text(goodsSum);
        }
        
        //cookie
        var cookieStr = $.cookie('carts') ? $.cookie('carts') : '';
        var cookieObj = toObj(cookieStr);
        if (goodName in cookieObj) {
            cookieObj[goodName].num = goodsSum;
        } else {
            cookieObj[goodName] = {
                "name": goodName,
                "price": goodPrice,
                "num": goodNum,
                "src":goodSrc
            }
        }
        $.cookie('carts', JSON.stringify(cookieObj), {
            expires: 7,
            path: '/'
        });
    })
    
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
    function toObj(str) {
        if (!str) {
            return {};
        }
        return JSON.parse(str);
    }
    $('#buy').click(function(){
        $('#mark').show();
        $('#alertbox span').click(function(){
            $('#mark').hide();
        })
        $('#alertbox input').click(function(){
            $('#mark').hide();
        })
    })
})
