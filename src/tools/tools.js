//运动函数
//参数1 获取的标签对象
//参数2 存储的属性与属性值   存储是一个对象
//参数3 回调函数     默认值是一个空值

function move(element, object, cb = function () { }) {
    let num = 0;

    for (let type in object) {
        let oldVal = type === "opacity" ? window.getComputedStyle(element)[type]*100 : parseInt(window.getComputedStyle(element)[type]);
        let newVal = type === "opacity" ? object[type]*100: object[type];
        num++;
        let time = setInterval(function () {
            let step = (newVal - oldVal) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            oldVal += step;
            element.style[type] =type === "opacity" ? oldVal/100: oldVal + 'px';

            if (oldVal === newVal) {
                clearInterval(time);
                num--;
                if (num === 0) {
                    cb();
                }
            }

        }, 20)
    }
}

//随机产生验证码
//参数1  需要产生几位的验证码
//参数2  产生验证码的内容  默认是纯数字的
//参数3  内容是否可以重复
//返回值  产生的验证码
function setVc(num = 6, n=2, bool = false) {
    var res = ""
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
                } else if (((index >= 65) && (index <= 90)) || ((index >= 97) && (index <= 122))) {
                    res += String.fromCharCode(index);
                } else {
                    i--;
                }
            }
        }
        return res;
    }
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

function setCountDown(str) {
    var st = new Date();
    var et = new Date(str);
    var t = parseInt((et.getTime() - st.getTime()) / 1000);


    var day = parseInt(t / (24 * 60 * 60));
    var hour = parseInt((t % (24 * 60 * 60)) / (60 * 60));
    var minute = parseInt((t % (60 * 60)) / 60);
    var second = t % 60;
    return { day, hour, minute, second };

}