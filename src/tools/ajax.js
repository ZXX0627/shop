function  myAjax(method,url,date,cb=()=>{}){
    let xhr ={};
    if(XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    if(method==='post'){
        xhr.open('post',url);
    }else{
        xhr.open('get',`${url}?${date}`);
    }

    if(method==='post'){
        xhr.send(date);
    }else{
        xhr.send();
    }

    xhr.onreadystatechange = function(){
        if( xhr.readyState === 4 && ( xhr.status >= 200 && xhr.status <= 299 ) ){
            cb(xhr.response);
            
        }
    }
}





function pAjax (method,url,date){
    const p =new  Promise(function(f1,r1){
        let xhr ={};
        if(XMLHttpRequest){
            xhr=new XMLHttpRequest();
        }else{
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        
        if(method==='post'){
            xhr.open('post',url);
        }else{
            xhr.open('get',`${url}?${date}`);
        }
    
        if(method==='post'){
            xhr.send(date);
        }else{
            xhr.send();
        }
        xhr.onload = function(){
            if( xhr.readyState === 4 && ( xhr.status >= 200 && xhr.status <= 299 ) ){
               
                f1(xhr.response);
            }else{
                r1();
            }
        }
    })

    return p;
}




function pjQueryAjax(url ,type ="get",data={},dataType="text"){
    const p = new Promise(function(f1,f2 ){
        $.ajax({
            url:url ,
            type:type,
            data:data,
            dataType:dataType,
            success:f1,
            error:f2,
        })
    })
    return p;
}

// function pjQueryAjax (url ,type="get",data={},dataType = 'text'){
//     const p =new  Promise(function(f1,r1){
//       $.ajax({
//           url:url,
//           type:type,
//           data:data,
//           dataType:dataType,
//           success:f1,
//           error:r1,
//       }) 
//     })
//     return p;
// }