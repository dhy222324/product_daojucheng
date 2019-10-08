//左侧轮播部分
function autoPlay (){
    var index = 0;
    $('#banner>li').hide();
    $('#banner>li').eq(index).show();
    play();
    function play(){
        var showObj = $('#banner>li');
        timer = setInterval(function(){
            index++;
            if (index > 2){
                index = 0;
            }
            showObj.fadeOut(500);
			showObj.eq(index).fadeIn(500);
        },3000)
    }
}
autoPlay();
//表单部分
var nickName = $('#nickName'),
    nickNameAlert = $('#nickNameAlert'),
    pwd = $('#pwd'),
    pwdInfo = $('#pwdInfo'),
    pwdAlert1 = $('#pwdAlert1'),
    pwdAlert2 = $('#pwdAlert2'),
    telNumber = $('#telNumber'),
    btn = $('#btn'),
    check = $('#checkbox'),
    checked = $('#checked');

    //昵称
nickNameAlert.hide();
nickName.blur(function (){
    if(!nickName.val()){
        nickNameAlert.slideDown();
        nickName.css('border','1px solid red');
    }else{
        nickNameAlert.slideUp();
        nickName.css('border','1px solid #777');
    }
});
    //密码
pwdInfo.hide();
pwdAlert1.hide();
pwdAlert2.hide();
pwd.focus(function(){
    pwdInfo.slideDown();
})
pwd.blur(function(){
    var re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    if(!pwd.val()){
        pwdAlert1.slideDown();
        pwd.css('border','1px solid red');
    }else if (!re.test(pwd.val())){
        pwdAlert1.slideUp();
        pwdAlert2.slideDown();
        pwd.css('border','1px solid red');
    }else{
        pwdAlert1.slideUp();
        pwdAlert2.slideUp();
        pwdInfo.slideUp();
        pwd.css('border','1px solid #777');
    }
})

    //手机号
telNumber.blur(function(){
    var re = /^1[3456789]\d{9}$/;
    if(!telNumber.val()){
        telNumber.css('border','1px solid red');
    }else if(!re.test(telNumber.val())){
        telNumber.css('border','1px solid red');
    }else{
        telNumber.css('border','1px solid #777');
    }
})

    //注册
checked.hide();
btn.click(function(){
    var niName = nickName.val();
    var upwd = pwd.val();
    if(!$("input[type='checkbox']").prop("checked")){
        checked.slideDown();
    }else{
        checked.slideUp();
        if(!niName){
            nickNameAlert.slideDown();
            nickName.css('border','1px solid red');
        }else if(!upwd){
            pwdAlert1.slideDown();
            pwd.css('border','1px solid red');
        }else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(upwd)){
            pwdAlert1.slideUp();
            pwdAlert2.slideDown();
            pwd.css('border','1px solid red');
        }else{
            var cookieStr =  $.cookie('register') ? $.cookie('register') : '';
            var cookieObj = toCookieObj(cookieStr);
            if(niName in cookieObj){
                alert('用户名已存在！');
                return;
            }else {
                cookieObj[niName] = upwd;
                alert('注册成功！');
                location.href = 'login.html';
            }
            $.cookie('register', JSON.stringify(cookieObj), {
                expires: 7,
                path: '/'
            });
        }
    }
})
function toCookieObj(str) {
    if (!str) {
        return {};
    }
    return JSON.parse(str);
}