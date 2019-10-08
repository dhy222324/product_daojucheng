
$('#btn').click(function() {
    var uname = $('#uname').val();
    var upwd = $('#upwd').val();
    if (!uname && !upwd) {
        alert('账号或不能为空!');
        return;
    }
    var cookieStr = $.cookie('register') ? $.cookie('register') : '';
    var cookieObj = toCookieObj(cookieStr);
    if (uname in cookieObj) {
        if (upwd === cookieObj[uname]) {
            alert('登录成功!');
            location.href = 'index.html';
            $.cookie('logins', uname, {
                expires: 7,
                path: '/'
            })
            return;
        } else {
            alert('密码不正确');
            return;
        }
    } else {
        alert('用户名不存在！');
    }
})

function toCookieObj(str) {
    if (!str) {
        return {};
    }
    return JSON.parse(str);
}