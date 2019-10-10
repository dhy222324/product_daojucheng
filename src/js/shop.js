$(function () {
    
    var timer = null;
    var indexA=0;
    var imgWidth = $("#imgList li").width();
    var clone = $("#imgList li").first().clone(true);
    /*clone 第一张的照片并且添加到最后已达到无缝对接的效果*/
    $("#imgList").append(clone);


    /*get 所有li的个数*/
    var size = $("#imgList li").length;

    $("#infoList li").eq(indexA).addClass("active");

    //整体移入移出事件
    $('#banner').hover(function(){
        clearInterval(timer);
    },function(){
        clearInterval(timer);
        timer = setInterval(function(){
            toRight();
        },4000)
    })
    //按钮指示器鼠标移出移入事件
    $("#infoList li").hover(function () {
        indexA = $(this).index();
        clearInterval(timer);
        $("#imgList").stop().animate({left:-indexA * imgWidth});
        $(this).addClass("active").siblings().removeClass("active");

    },function () {
        clearInterval(timer);
        timer = setInterval(function () {
            toRight();
        },4000)
    });
    //定时器 这里是最开始启动的 这里不设值，会导致页面开始刷新出现错误。
    var timer = setInterval(function () {
        toRight();
    },4000);

    //轮播
    function toRight() {
        indexA++;
        if(indexA==size){
            $("#imgList").css({left:0});
            indexA=1;
        }

        $("#imgList").stop().animate({left: -indexA * imgWidth}, 500);

        //设置下面指示器的颜色索引
        if(indexA == size-1){
            $("#infoList li").eq(0).addClass("active").siblings().removeClass("active");

        }else{
            $("#infoList li").eq(indexA).addClass("active").siblings().removeClass("active");
        }
    }

    $('#hot_goods #hrefgood').click(function(){
        $(window).attr('location',"goods.html");
    });
});
$(function(){
    init();
    $('#carts').click(function(){
        $(window).attr('location','carts.html');
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
})