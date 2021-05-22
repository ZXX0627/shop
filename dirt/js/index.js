class SetObj {
  constructor(arr, element) {
    this.arr = arr;
    this.oBox = element;
    this.oBul = this.oBox.querySelector(".banner_01>ul");
    this.oBol = this.oBox.querySelector(".banner_01>ol");
    this.ulli;
    this.olli;
    this.liWidth;
    this.time;
    this.bool = true;
    this.index = 1;
  }

  init() {
    this.setLi();
    this.setLoop();
    this.setHide();
    this.setMouse();
    this.setBon();
  }

  setLi() {
    let oUlstr = "";
    let oOlstr = "";
    this.arr.forEach((item, key) => {
      oUlstr += `<li><img src="../img/${item.img}" alt=""></li>`;
      oOlstr +=
        key === 0
          ? `<li class=active name ="olli" num= "${key}"></li>`
          : `<li name ="olli" num= "${key}"></li>`;
    });
    this.oBul.innerHTML = oUlstr;
    this.oBol.innerHTML = oOlstr;

    this.ullis = Array.from(this.oBul.children);
    this.ollis = Array.from(this.oBol.children);

    const cloneFirst = this.ullis[0].cloneNode(true);
    const cloneLast = this.ullis[this.ullis.length - 1].cloneNode(true);

    this.oBul.append(cloneFirst);
    this.oBul.insertBefore(cloneLast, this.ullis[0]);
    this.liWidth = parseInt(window.getComputedStyle(this.ullis[0]).width);

    this.oBul.style.width = (this.ullis.length + 2) * this.liWidth + "px";
    this.oBul.style.left = -this.index * this.liWidth + "px";
  }

  setLoop() {
    this.time = setInterval(() => {
      this.index++;
      this.setStyle();
      move(
        this.oBul,
        { left: -this.index * this.liWidth },
        this.loopEnd.bind(this)
      );
    }, 3000);
  }

  loopEnd() {
    if (this.index === this.arr.length + 1) {
      this.index = 1;
      this.oBul.style.left = -this.index * this.liWidth + "px";
    } else if (this.index === 0) {
      this.index = this.arr.length;
      this.oBul.style.left = -this.index * this.liWidth + "px";
    }
    this.bool = true;
  }

  setStyle() {
    this.ollis.forEach((item, key) => {
      item.classList.remove("active");

      if (key === this.index - 1) {
        item.classList.add("active");
      } else if (this.index === 0) {
        this.ollis[this.arr.length - 1].classList.add("active");
      } else if (this.index === this.arr.length + 1) {
        this.ollis[0].classList.add("active");
      }
    });
  }

  setMouse() {
    this.oBox.addEventListener("mouseenter", () => {
      clearInterval(this.time);
    });
    this.oBox.addEventListener("mouseleave", () => {
      this.setLoop();
    });
  }

  setBon() {
    this.oBox.addEventListener("click", (e) => {
      if (e.target.getAttribute("name") === "left") {
        if (!this.bool) return;
        this.bool = false;

        this.index--;
        this.setStyle();
        move(
          this.oBul,
          { left: -this.index * this.liWidth },
          this.loopEnd.bind(this)
        );
      } else if (e.target.getAttribute("name") === "right") {
        if (!this.bool) return;
        this.bool = false;

        this.index++;
        this.setStyle();
        move(
          this.oBul,
          { left: -this.index * this.liWidth },
          this.loopEnd.bind(this)
        );
      } else if (e.target.getAttribute("name") === "olli") {
        if (!this.bool) return;
        this.bool = false;

        this.index = e.target.getAttribute("num") - 0 + 1;
        this.setStyle();
        move(
          this.oBul,
          { left: -this.index * this.liWidth },
          this.loopEnd.bind(this)
        );
      }
    });
  }

  setHide() {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        this.setLoop();
      } else if (document.visibilityState === "hidden") {
        clearInterval(this.time);
      }
    });
  }
}

const p = pAjax("get", "../server/banner.php", `webp=webp`);

let oBanner = document.querySelector(".banner_01");

p.then(function (res1) {
  res1 = JSON.parse(res1);
  const SetBanner = new SetObj(res1, oBanner);
  // console.log(SetBanner);
  SetBanner.init();
});

let oList = document.querySelector(".nav");
let oLul = oList.querySelector(".list_02>ul");
let oLis = oList.querySelectorAll(".list_01>li");
let oLdiv = oList.querySelector(".list_02");

setList();
function setList() {
  oList.addEventListener("mouseover", function (e) {
    if (e.target.getAttribute("name") == "li") {
      let keyword = e.target.innerHTML;
      const p1 = pAjax("get", "../server/nav.php", `nav_name=${keyword}`);
      p1.then(function (res1) {
        res1 = JSON.parse(res1);
        // console.log(res1);
        let str = "";
        res1.forEach((item, key) => {
          // console.log(item.nav_src);
          str += `
            <li>
            <img src="../img/${item.nav_src}" alt="" />
            <h3>${item.nav_mes}</h3>
            <p>￥${item.nav_price}</p>
          </li>
            `;
        });
        oLul.innerHTML = str;
        oLis.forEach((item, key) => {
          item.style.color = "black";
        });
        e.target.style.color = "red";
      });

      oLdiv.style.borderTop = "1px solid #999";
      oLdiv.style.height = "300px";
    }
  });
  oList.addEventListener("mouseout", function (e) {
    if (e.target.getAttribute("name") == "li") {
      oLdiv.style.borderTop = "0";
      oLdiv.style.height = "0px";
    }
  });
  oLdiv.addEventListener("mouseover", function () {
    oLdiv.style.borderTop = "1px solid #999";
    oLdiv.style.height = "300px";
  });
  oLdiv.addEventListener("mouseout", function () {
    oLdiv.style.borderTop = "0";
    oLdiv.style.height = "0";
  });
}
setPare();
function setPare() {
  $('[name= "logout"]').on("click", function () {
    let name = "ligin";
    const obj = myGetCookie();
    if (obj.ligin === undefined) {
      if (window.confirm("请登录，点击确跳转登录界面")) {
        window.location.href = "../pages/login.html";
      }
    } else {
      mySetCoolie(name, 1, (path = "/"), -1);
      window.alert("退出成功！");
    }
  });
  $('[name="cart"]').on("click", function () {
    const obj = myGetCookie();
    if (obj.ligin === undefined) {
      if (window.confirm("请登录，点击确跳转登录界面")) {
        window.location.href = `./login.html?url=${window.location.href}`;
      }
    } else {
      window.location.href = "../pages/cart.html";
    }
  });

  $('[name="login"]').on("click", function () {
    window.location.href = `../pages/login.html?url=${window.location.href}`;
  });
  $('[name="register"]').on("click", function () {
    window.location.href = `../pages/register.html?url=${window.location.href}`;
  });
}

time1();

function time1() {
  var st = new Date();
  t1 = st.getHours() + 1;
  let mouth = st.getMonth() + 1;
  day = st.getDate();
  let nowTime = `${t1}` < 10 ? `"0"+${t1}` : `${t1}` + ": 00";
  console.log(nowTime);
  let oTime = document.querySelector('[name = "time"]');
  oTime.innerHTML = nowTime;
  const obj = setCountDown(`2021-${mouth}-${day} ${nowTime}:00`);

  console.log(obj.hour);
  console.log(day);
  console.log(obj.minute);
  console.log(obj.second);
  $('[ name="hour"]').html(obj.hour);
  $('[ name="minute"]').html(obj.minute);
  $('[ name="second"]').html(obj.second);
  let num = setInterval(function () {
    const obj = setCountDown(`2021-${mouth}-${day} ${nowTime}:00`);
    $('[ name="hour"]').html(obj.hour);
    $('[ name="minute"]').html(obj.minute);
    $('[ name="second"]').html(obj.second);
    if ((obj.hour == "00") & (obj.minute == "00") & (obj.second === "00")) {
      clearInterval(num);
      time1();
    }
  }, 1000);
}
setText();

function setText() {
  const p1 = pAjax("get", "../server/nav.php", `nav_name=电视`);
  p1.then(function (res1) {
    res1 = JSON.parse(res1);
    // console.log(res1);
    let str = "";
    res1.forEach((item, key) => {
      // console.log(item.nav_src);
      str += `
            <li>
            <img src="../img/${item.nav_src}" alt="" />
            <h3>${item.nav_mes}</h3>
            <p>￥<span>￥${item.nav_price}</span><del>￥1999</del> </p>
          </li>
            `;
    });

    $('[name = "text"]').html(str);
  });
}

function setCountDown(str) {
  var st = new Date();
  var et = new Date(str);
  var t = parseInt((et.getTime() - st.getTime()) / 1000);

  var hour = parseInt(t / (60 * 60));
  var minute = parseInt((t % (60 * 60)) / 60);
  var second = t % 60;

  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return { hour, minute, second };
}

setLi1();

function setLi1() {
  $("a").on("mouseenter", function () {
    $(".banner_left").css({ display: "block" });

    let keyword = $(this).text();
    $.ajax({
      url: "../server/goods_list.php",
      type: "get",
      data: { cat_one_id: `${keyword}`, page: 1, line: 21 },
      dataType: "json",
      success: (res) => {
        let str = "";
        res.data.forEach((item) => {
          str += `
            <li>
              <img src="${item.goods_small_logo}" alt="">
              <p>${item.cat_three_id}</p>
            </li> 
        `;
        });
        $(".banner_mes").html(str);
      },
    });
  });

  $("a").on("mouseleave", function () {
    $(".banner_left").css({ display: "none" });
  });
}
