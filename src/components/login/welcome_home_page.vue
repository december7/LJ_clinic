<template>
    <div class="no-padding no-margins">
      <div class="home-top fixed-div">
        <div class="home-center">
          <img class="home-logo" src="../../../static/img/LoginAndRegister/home_logo.png">
          <a class="home-top-title">首页</a>
          <a class="home-top-title" style="left: 33%;">产品说明</a>
          <a class="home-top-title" style="left: 47%;">联系我们</a>
          <span>400-0900-360</span>
          <img class="home-phone-img" src="../../../static/img/LoginAndRegister/home_phone.png">
        </div>
      </div>
      <div class="home-banner">
        <img class="home-banner no-margins" src="../../../static/img/LoginAndRegister/home_banner.png">
        <div class="transparent-bg text-center">
          <div class="transparent-bg-toptitle">若邻云诊所</div>
          <div class="transparent-bg-slogon">为您搭建一个有温度的诊所</div>
          <a href="#/login/home_register"><button class="transparent-button-regis">注册</button></a>
          <a href="/login/Login"><button class="transparent-button-login">立即登录</button></a>
        </div>
      </div>
      <div class="text-center">
        
      </div>
    </div>
</template>
<style>
  .home-center {
    position: absolute;
    left: 20%;
    right: 20%;
    width: 60%;
    height: 66px;
    background: white;
  }
  .home-center span {
    color: #333;
    font-size: 16px;
    position: absolute;
    right: 0px;
    top: 20px;
    width: 110px;
  }
  .home-top{
    width: 100%;
    height: 66px;
    background: white;
  }
  .home-banner {
    width: 100%;
    height: 493px;
    margin-top: 66px;
  }
  .home-logo {
    margin-top: 20px;
    height: 26px;
  }
  .home-top-title {
    left: 21%;
    position: absolute;
    top: 20px;
    font-size: 13px;
    line-height: 30px;
    color: #333;
  }
  .home-phone-img {
    position: absolute;
    right: 123px;
    top: 23.5px;
    width: 16px;
    height: 16px;
  }


  .transparent-bg {
    width: 60%;
    height:493px;
    left: 20%;
    right: 20%;
    background: rgba(0,0,0,0.3);
    position: absolute;
    top: 66px;
  }
  .transparent-bg-toptitle {
    font-family: "YouYuan";
    /*font-weight: bold;*/
    font-size: 78px;
    color: white;
    margin-top: 90px;
    font-weight: 100;
  }
  .transparent-bg-slogon {
    font-family: "STKaiti";
    font-size: 46px;
    color: white;
    margin-top: 5px;
  }
  .transparent-button-regis {
    border: 2px solid #ffffff;
    border-radius: 3px;
    color: #ffffff;
    background: rgba(0,0,0,0);
    font-size: 20px;
    width: 200px;
    height: 46px;
    margin-top: 30px;
    outline: none;
    text-align: center;
    margin-right: 15px;
  }
  .transparent-button-login {
    border: 0px;
    border-radius: 3px;
    color: #7a8385;
    background: #fff;
    font-size: 20px;
    width: 200px;
    height: 46px;
    margin-top: 30px;
    outline: none;
    text-align: center;
  }

</style>
<script>

</script>
