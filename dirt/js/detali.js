  const urlObj = getUrlVal();
    // console.log(urlObj.goods_id);

    $.ajax({
      url:'../server/goods_detail.php',
      type:'post',
      data:{goods_id:urlObj.goods_id},
      dataType:'json',
      success:(res)=>{
        let str=`
        
          <div class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">商品详细信息</h3>
                </div>
                <div class="panel-body">
                  <div class="media">
                    <div class="media-left">
                      <a href="#">
                        <img class="media-object" src="${res.goods_small_logo}" alt="...">
                      </a>
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading">${res.goods_name}</h4>
                      <p>
                        <i class="glyphicon glyphicon-yen"></i>
                        <span>${res.goods_price}</span>
                      </p>
                      <div class="btn-group" role="group" aria-label="...">
                        <button type="button" class="btn btn-default">XL</button>
                        <button type="button" class="btn btn-default">L</button>
                        <button type="button" class="btn btn-default">M</button>
                        <button type="button" class="btn btn-default">S</button>
                        <button type="button" class="btn btn-default">XS</button>
                      </div>
                      <p>
                        <a href="javascript:;" class="btn btn-warning btn-lg" role="button">立即购买</a>
                        <a name="cart" href="javascript:;"  class="btn btn-danger btn-lg" role="button">加入购物车</a>
                      </p>
                    </div>
                  </div>
                  <ul class="nav nav-tabs">
                    <li role="presentation" class="active"><a href="#">商品详细信息</a></li>
                    <li role="presentation"><a href="#">商品参数信息</a></li>
                    <li role="presentation"><a href="#">相关商品</a></li>
                  </ul>
                  <div>
                      ${res.goods_introduce};
                  </div>
                </div>
            </div>

        `;
        $('.container').html(str);
        $('[name="cart"]').on("click",function(){
          const cookie =  myGetCookie();
          // console.log(cookie);
          if(cookie.ligin==undefined){
            if(window.confirm("您还没有登陆，请先登录，点击确认按钮就行登录！")){
              window.location.href = `./login.html?url=${window.location.href}`;
            }
          }else{
            let cartArr = localStorage.getItem(`cart`);
            
            if(cartArr === null){
                let arr =[];
              res.buy = true;
              res.num = 1;
              arr.unshift(res);
              localStorage.setItem('cart',JSON.stringify(arr));
            }else{
                cartArr = JSON.parse(cartArr);

                let bool = cartArr.some(function(val){
                return val.goods_id===res.goods_id;
              })
              if(bool){
                for(let i=0;i<cartArr.length;i++){
                  if(cartArr[i].goods_id===res.goods_id){
                    cartArr[i].num++;
                  }
                }
                localStorage.setItem('cart',JSON.stringify(cartArr));
              }else{
                res.buy = true;
                res.num = 1;
                cartArr.unshift(res);
                localStorage.setItem('cart',JSON.stringify(cartArr));
              }
              window.location.href='./cart.html';
            }
          }
          

        })

        
      }
    })