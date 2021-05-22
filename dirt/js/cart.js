
setPage();
$('.container').on('click',function(e){
  let arr = localStorage.getItem('cart');
   arr = JSON.parse(arr);
  if(e.target.getAttribute('name')==="all"){
    arr.forEach((item)=>{
      item.buy = e.target.checked;
    })
  }else if(e.target.getAttribute("name")==="bon"){
    for(let i = 0;i<arr.length;i++){
      if(arr[i].goods_id ===e.target.getAttribute("num")){
        arr[i].buy = e.target.checked;
        break;
      }
    }
  }else if(e.target.getAttribute("name")==="del"){
    for(let i=0;i<arr.length;i++){
      if(arr[i].goods_id ===e.target.getAttribute("num")){
        arr.splice(i,1);
        break;
      }
    }
  }else if(e.target.getAttribute('name')==="-"){
    for(let i=0;i<arr.length;i++){
      if(arr[i].goods_id===e.target.getAttribute("num")){
        arr[i].num--;
        break;
      }
    }
  }else if(e.target.getAttribute("name")==="+"){
      for(let i=0;i<arr.length;i++){
        if(arr[i].goods_id===e.target.getAttribute("num")){
          arr[i].num++;
          break;
        }
      }
    } 
  localStorage.setItem("cart",JSON.stringify( arr));
  setPage();
})


function setPage(){
  let cartArr = localStorage.getItem('cart');
  cartArr = JSON.parse(cartArr);
  if(cartArr ===null){
     $(".container").html("<h3>你的购物车空空如也，快去购物吧</h3>");
  }else{
    if(cartArr.length===0){
      $(".container").html("<h3>你的购物车清空了，赶紧再去购物吧</h3>");
    }else{
     
      let bool=true;
      //动态写入之前
      let str=`
      <div class="panel panel-info ">
      <div class="panel-body bg-info">
        <div class="checkbox">
          <label>
            <input name="all" type="checkbox" value="">
            全选
          </label>
        </div>
      </div>
      <div class="panel-footer">
        <ul class="cart-list">
      `;

      //动态写入
        cartArr.forEach((item) => {

          if(item.buy===false) bool=false;
          str+= `
          <li class="cart-item">
            <div class="left">
              <input name= 'bon' num=${item.goods_id} type="checkbox" ${item.buy ? 'checked':"" }>
            </div>
            <div class="right">
              <div class="media">
                <div class="media-left">
                  <a href="#">
                    <img class="media-object" src="${item.goods_small_logo}" alt="...">
                  </a>
                </div>
                <div class="media-body">
                  <h4 class="media-heading">${item.goods_name}</h4>
                  <p>
                    <i class="glyphicon glyphicon-yen"></i>
                    <span>${item.goods_price}</span>
                  </p>
                  <div class="btn-group pull-right" role="group" aria-label="...">
                    <button type="button" name="-" num=${item.goods_id} ${item.num===1?"disabled":""} class="btn btn-default">-</button>
                    <button type="button" class="btn btn-default" disabled>${item.num}</button>
                    <button type="button" name="+" num=${item.goods_id} ${item.num==item.goods_number?"disabled":""} class="btn btn-default">+</button>
                  </div>
                  <button  name = "del" num =${item.goods_id} class="del btn btn-danger">我不要了</button>

                </div>
              </div>
            </div>
          </li>
          
          `
        });

      //动态之后
          str+=`
              </ul>
            </div>
          </div>
          `;

          $('.container').html(str);
          $('[name = "all"]').attr("checked" ,bool);

    }
  }
}
