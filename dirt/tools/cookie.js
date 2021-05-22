function mySetCoolie(name, value, path = "", time) {
    let t = new Date();
    t.setTime(t.getTime() + time * 1000 - 8 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};path=${path};expires=${t}`;

}

function myGetCookie() {
    let str = document.cookie;
    let arr = str.split("; ");
    let obj = {};
    arr.forEach((item, key) => {
        let arr3 = item.split("=");
        obj[arr3[0]] = arr3[1];
    })
    return obj;
}