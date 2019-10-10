$(function () {
    var indexA=0;
    var imgWidth = $("#imgList li").width();
    var clone = $("#imgList li").first().clone(true);
    /*clone 第一张的照片并且添加到最后已达到无缝对接的效果*/
    $("#imgList").append(clone);


    /*get 所有li的个数*/
    var size = $("#imgList li").length;

    $("#pointer li").eq(indexA).addClass("active");

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
    $("#pointer li").hover(function () {
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
            $("#pointer li").eq(0).addClass("active").siblings().removeClass("active");

        }else{
            $("#pointer li").eq(indexA).addClass("active").siblings().removeClass("active");
        }
    }
    
});

var intDiff = parseInt(86400);//倒计时总秒数量
function timer(intDiff){
    window.setInterval(function(){
    var day=0,
        hour=0,
        minute=0,
        second=0;//时间默认值        
    if(intDiff > 0){
        day = Math.floor(intDiff / (60 * 60 * 24));
        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    $('#day_show').html(day);
    $('#hour_show').html('<s id="h"></s>'+hour);
    $('#minute_show').html('<s></s>'+minute);
    $('#second_show').html('<s></s>'+second);
    intDiff--;
    }, 1000);
} 
$(function(){
    timer(intDiff);
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