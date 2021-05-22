
$("form").submit(()=>{
  return false;
})
$("button").on("click",function(){
  $.ajax({
    
    url:"../server/goods_login.php",
    type:"post",
    data:{userName:$('[name="user"]').val(),userPwd:$('[name ="pwd"]').val()},
    dataType:"json",
    success:(res)=>{
      let name = "ligin";
      if(res.result===1){
        mySetCoolie(name, 1, path = "/", 7*24*60*60);
        let num = 5;
        console.log();
        $("h3").html(`恭喜您登陆成功，${num}秒后为您跳转页面，<a href="./index.html">跳转至首页</a>`);
        setInterval(()=>{
          num--;
          if(num===0){
            
            window.location.href=`${window.location.search.substr(5)}`;
            return
          }
           $("h3").html(`恭喜您登陆成功，${num}秒后为您跳转页面，<a href="./index.html">跳转至首页</a> `);
        },1000)
      }else{
        alert("账号密码输入错误");
      }
    }
  })
})
