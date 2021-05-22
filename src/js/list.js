
let page = 1;
let line = 8;

setPage1();
function setPage1(){
  const urlObj =getUrlVal();
  
  console.log(urlObj.cat_one_id);
  $.ajax({
    url:'../server/goods_list.php',
    type:'get',
    data:{cat_one_id:urlObj.cat_one_id,page:page,line:line},
    dataType:'json',
    success:(res)=>{
      let str = "";
      res.data.forEach((item) => {
        str+=`
        <li class="list-item">
          <div class="panel panel-primary">
            <div class="panel-body">
              <ol class="breadcrumb">
                <li><a href="#">${item.cat_one_id}</a></li>
                <li><a href="#">${item.cat_two_id}</a></li>
                <li class="active">${item.cat_three_id}</li>
              </ol>
            </div>
            <div class="panel-footer">
              <div class="row">
                <div class="">
                  <div class="thumbnail">
                    <img
                      src="${item.goods_big_logo}"
                      alt="...">
                    <div class="caption">
                      <h3>${item.goods_name}</h3>
                      <p>
                        <i class="glyphicon glyphicon-yen"></i>
                        <span>${item.goods_price}</span>
                      </p>
                      <p><a href="javascript:;" class="btn btn-primary" role="button">查找相似商品</a> <a href="./detail.html?goods_id=${item.goods_id}" class="btn btn-danger" role="button">查看商品详情</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        `
        
      });
    
      $('.container').html(str);

      $('.pagi').pagination({
        pageCount:res.sumPage,
        totalData:res.row,
        current:page,
        showData:line,
        prevCls	:'prev',
        nextCls	:'next',
        prevContent:"上一页",
        nextContent:'下一页',
        active:"active",
        count:5,
        jump:true,
        mode:	'fixed',
        coping:true,
        isHide:	true,
        homePage:	'首页',
        endPage:	'末页',
        jump:true,
        callback:	function(res){
            page = res.getCurrent();
            setPage1();
        }
      });
    }
  })
}

setPare();
function setPare(){
  $('[name= "logout"]').on("click", function () {
    let name = "ligin";
    const obj = myGetCookie();
    if(obj.ligin === undefined){
      if(window.confirm("请登录，点击确跳转登录界面")){
        window.location.href="../pages/login.html";
      }
    }else{
      mySetCoolie(name, 1, path = "/",-1);
      window.alert("退出成功！");
    }
  })
  $('[name="cart"]').on("click",function(){
    const obj = myGetCookie();
    if(obj.ligin === undefined){
      if(window.confirm("请登录，点击确跳转登录界面")){
        window.location.href=`./login.html?url=${window.location.href}`;
      }
    }else{
      window.location.href="../pages/cart.html";
    }
  })
  
  $('[name="login"]').on("click",function(){
    window.location.href = `../pages/login.html?url=${window.location.href}`;
  })
  $('[name="register"]').on("click",function(){
    window.location.href = `../pages/register.html?url=${window.location.href}`;
  })
  }

function getUrlVal(){
  // 创建一个对象
  var obj ={};

  // 获取 浏览器地址栏参数 不要 ?问号
  var str = window.location.search.substr(1);

  // 字符串 以 & 为间隔 转化为数组
  var arr1 = str.split('&');

  // 循环遍历 数组arr1 单元的数据是 键值对字符串
  // 以 = 等号为间隔 分割为 数组
  // 新增数组[0] 是 对象的键名 
  // 新增数组[1] 是 对象的键值   需要还原
  arr1.forEach(item=>{
      var arr2 = item.split('=');
      obj[ arr2[0] ] = window.decodeURIComponent( arr2[1] );
  })

  // 返回值就是这个对象
  return obj;
}
