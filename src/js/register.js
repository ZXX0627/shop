$('input').on("input",()=>{
  // console.log(11111);
  var text = /^[a-zA-Z]([-_a-zA-Z0-9]{6,20})$/;
  var num = /^[0-9]{6}/;
  if(text.test($('[name="username"]').val())){
    $(".user").html("√");
  }else{
    $(".user").html("以字母开头，字母，数字下划线组合");
  }
  if(num.test($('[name="password1"]').val())){
    $(".name1").html("√");
  }else{
    $(".name1").html("输入6位数字");
  }
  if(num.test($('[name="password2"]').val())){
    $(".name2").html("√");
  }else{
    $(".name2").html("输入6位数字");
  }
})
$("#sc")
  .html(setVc())
  .click(function () {
    $(this).html(setVc());
  });
$('[name="username"]').on("blur", function () {
  $.ajax({
    url: "../server/goods_select.php",
    type: "post",
    data: {
      userName: $('[name="username"]').val(),
      userName: $('[name="username"]').val(),
    },
    dataType: "json",
    success: (res) => {
      $(".user").html(res.msg);
    },
  });
});

$('[name = "btn"]').on("click", function () {
  if ($('[name="password1"]').val() !== $('[name="password2"]').val()) {
    window.alert("两次密码输入不正确,请重新输入密码！");
    $("#sc").html(setVc());
    return;
  }

  if ($("#sc").html()!== $('[name="sc"]').val()) {
    window.alert("验证码输入不正确！");
    $("#sc").html(setVc());
    return;
  }
  $.ajax({
    url: "../server/goods_register.php",
    type: "post",
    data: {
      userName: $('[name="username"]').val(),
      userPwd: $('[name="password1"]').val(),
    },
    dataType: "json",
    success: (res) => {
      if (res.result === 1) {
        window.alert("恭喜你注册成功！点击确定跳转登陆页面");
        window.location.href = "./login.html";
      }
    },
  });
});

function setVc(num = 6, n = 2, bool = false) {
  var res = "";
  if (n === 1) {
    for (var i = 1; i <= num; i++) {
      var index = parseInt(Math.random() * 9);
      if (res.indexOf(index) === -1) {
        res += index;
      } else {
        i--;
      }
    }
    return res;
  } else if (n === 2) {
    for (var i = 1; i <= num; i++) {
      var index = parseInt(Math.random() * 123);
      if (res.indexOf(index) === -1) {
        if (index < 10) {
          res += index;
        } else if (
          (index >= 65 && index <= 90) ||
          (index >= 97 && index <= 122)
        ) {
          res += String.fromCharCode(index);
        } else {
          i--;
        }
      }
    }
    return res;
  }
}
