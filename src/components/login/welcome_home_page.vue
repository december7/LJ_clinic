<template>
    <div class="no-padding no-margins white-bg" style="height:2765px;">
      <div class="home-top fixed-div">
        <div class="home-center">
          <img class="home-logo" src="../../../static/img/LoginAndRegister/home_logo.png">
          <a type="button" @click="homeClick" class="home-top-title">首页</a>
          <a type="button" @click="productClick" class="home-top-title" style="left: 33%;">产品说明</a>
          <a type="button" @click="contactClick" class="home-top-title" style="left: 47%;">联系我们</a>
          <span>400-0900-360</span>
          <img class="home-phone-img" src="../../../static/img/LoginAndRegister/home_phone.png">
        </div>
      </div>
      <div id="home-banner_id" class="home-banner">
        <div class="home-banner-img">
          <div class="transparent-bg text-center">
            <div class="transparent-bg-toptitle">若邻云诊所</div>
            <div class="transparent-bg-slogon">为您搭建一个有温度的诊所</div>
            <a href="#/login/home_register"><button class="transparent-button-regis">注册</button></a>
            <a href="#/login"><button class="transparent-button-login">立即登录</button></a>
          </div>
        </div>
        <!--<img class="home-banner no-margins" src="../../../static/img/LoginAndRegister/home_banner.png">-->
      </div>
      <!--诊所经营的困扰-->
      <div style="width:100%;height:72px;margin-top: 48px;">
        <div style="width:470px;height:60px;margin:0 auto;">
          <div class="center-title-border"></div>
          <div class="center-title-div">诊所经营的困扰</div>
          <div style="margin-left:30px;" class="center-title-border"></div>
          <div class="center-english-div">Management problems</div>
        </div>
      </div>
      <!--三个描述div-->
      <div style="width:100%;height:256px;margin-top:22px">
        <div style="width:820px;height:256px;margin:0 auto;">
          <div class="three-describe-left">
            <img style="width:100%;height:100%" src="../../../static/img/LoginAndRegister/home_problems_bg.png">
            <div class="three-describe-Titletext">信息繁杂</div>
            <div class="three-describe-text">众多表单存储繁琐易丢失，给诊所对账造成困扰！</div>
          </div>
          <div class="three-describe-left three-describe-center">
            <img style="width:100%;height:100%" src="../../../static/img/LoginAndRegister/home_brand_bg.png">
            <div class="three-describe-Titletext">品牌效应低</div>
            <div class="three-describe-text">维系用户关系难，利润上不去！良好口碑无法建立，新用户难拓展！</div>
          </div>
          <div class="three-describe-left three-describe-right">
            <img style="width:100%;height:100%" src="../../../static/img/LoginAndRegister/home_cost_bg.png">
            <div class="three-describe-Titletext">运营成本高</div>
            <div class="three-describe-text">许多环节需要人工干预，容易出错，效率低！</div>
          </div>
        </div>
      </div>
      <!--轮播图-->
      <div class="wheel-gray-div">
        <img class="triangle-img" src="../../../static/img/LoginAndRegister/home_triangle.png">
        <div class="wheel-div">
          <img src="../../../static/img/LoginAndRegister/home_1.png">
          <img style="margin-left:-4px" src="../../../static/img/LoginAndRegister/home_2.png">
          <img style="margin-left:-3.5px" src="../../../static/img/LoginAndRegister/home_3.png">
          <img src="../../../static/img/LoginAndRegister/home_4.png">
          <img style="margin-left:-3px" src="../../../static/img/LoginAndRegister/home_5.png">
          <img style="margin-left:-3.5px" src="../../../static/img/LoginAndRegister/home_6.png">
        </div>
      </div>
      <!--我们办得到-->
      <div style="width:100%;height:72px;margin-top: 48px;">
        <div style="width:470px;height:60px;margin:0 auto;">
          <div class="center-title-border"></div>
          <div class="center-title-div">我们办得到</div>
          <div style="margin-left:30px;" class="center-title-border"></div>
          <div class="center-english-div">We can do it</div>
        </div>
      </div>
      <!--办得到的内容-->
      <div style="width:100%;height:432px;margin-top:40px">
        <div style="width:805px;height:310px;margin:0 auto;">
          <img class="wecan-img-div" src="../../../static/img/LoginAndRegister/home_box_bg.png">
          <span class="wecan-span">优化就诊流程</span>
          <img style="margin-left:-4px;" class="wecan-img-div" src="../../../static/img/LoginAndRegister/home_box_bg.png">
          <span class="wecan-span">辅助问诊</span>
          <img style="margin-left:-3.5px;" class="wecan-img-div" src="../../../static/img/LoginAndRegister/home_box_bg_missing.png">
          <span class="wecan-span">智能操作</span>
          <img style="margin-left:-3.5px;" class="wecan-img-div" src="../../../static/img/LoginAndRegister/home_box_bg.png">
          <span class="wecan-span">系统化管理</span>
          <img style="margin-left:100px;margin-top:-88px;" class="wecan-img-div" src="../../../static/img/LoginAndRegister/home_box_bg_missing.png">
          <span style="margin-top:0px;" class="wecan-span">对接医保</span>
          <img style="margin-left:-3.5px;margin-top:-88px;" class="wecan-img-div" src="../../../static/img/LoginAndRegister/home_box_bg.png">
          <span style="margin-top:0px;" class="wecan-span">患者导流</span>
          <img style="margin-left:-3.5px;margin-top:-88px;" class="wecan-img-div" src="../../../static/img/LoginAndRegister/home_box_bg.png">
          <span style="margin-top:0px;" class="wecan-span">优质供应链</span>
        </div>
      </div>
      <!--联系我们-->
      <div style="width:100%;height:72px;margin-top: 48px;">
        <div style="width:470px;height:60px;margin:0 auto;">
          <div class="center-title-border"></div>
          <div class="center-title-div">联系我们</div>
          <div style="margin-left:30px;" class="center-title-border"></div>
          <div class="center-english-div">Contact us</div>
        </div>
      </div>
      <img style="width:100%;height:430px;" src="../../../static/img/LoginAndRegister/home_map.png">
      <div style="width:100%;height:200px;">
        <div class="contact-bg">
          <div style="width:805px;height:120px;margin:0 auto;">
            <a @click="homeClick" class="contact-a">首页</a>
            <a @click="productClick" style="margin-left:46px" class="contact-a">产品说明</a>
            <a @click="contactClick" style="margin-left:46px" class="contact-a">联系我们</a>
            <div class="contact-border"></div>
            <div class="contact-div">
              <img src="../../../static/img/LoginAndRegister/home_addr_phone.png">
              <span>400-0900-360</span>
            </div>
            <div class="contact-div">
              <img src="../../../static/img/LoginAndRegister/home_addr_email.png">
              <span>service@linjiahaoyi.com</span>
            </div>
            <div class="contact-div">
              <img src="../../../static/img/LoginAndRegister/home_addr_address.png">
              <span>浙江省杭州市滨江区六和路368号海创园南2层E1-2</span>
            </div>
            <img style="width:120px;height:120px;position:absolute;margin-left:685px;margin-top:-125px" src="../../../static/img/LoginAndRegister/home_qrcord.png">
          </div>
      </div>
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
  .home-top-title:hover {
    color: #4ca7d3;
  }
  .home-phone-img {
    position: absolute;
    right: 123px;
    top: 23.5px;
    width: 16px;
    height: 16px;
  }

  .home-banner-img {
    width: 100%;
    height: 493px;
    background:url('../../../static/img/LoginAndRegister/home_banner.png') no-repeat center center;
    background-size: 100% 100%;
}
  .transparent-bg {
    height:493px;
    width: 800px;
    background: rgba(0,0,0,0.3);
    margin: 0 auto;
  }
  .transparent-bg-toptitle {
    /*font-family: "YouYuan";*/
    width: 800px;
    font-size: 78px;
    color: white;
    padding-top: 90px;
    font-weight: 300;
    font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell","Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
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

  /*中间的描述div*/
  .center-title-div {
    text-align:center;
    width:160px;
    margin-left: 30px;
    font-size: 22px;
    color: #333;
    font-weight: 300;
    /*font-weight: lighter;*/
    display: inline-block;
    font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell","Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
  }
  .center-title-border { /*中间的描述div里的横线*/
    border-top: 1.3px solid #333;
    width: 120px;
    height: 1.3px;
    display: inline-block;
    vertical-align: super;
  }
  .center-english-div {
    text-align:center;
    width:130px;
    margin: 0 auto;
    font-size: 12px;
    color: #333;
    font-weight: 300;
    font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell","Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
  }
  /*三个描述div*/
  .three-describe-left {
    display: inline-block;
    width:249px;
    height:256px;
  }
  .three-describe-center {
    margin-left: 30px;
  }
  .three-describe-right {
    margin-left: 30px;
  }
  .three-describe-Titletext {
    position:absolute;
    margin-top: -150px;
    width:249px;
    text-align: center;
    font-size: 20px;
    color:#333;
    display: inline-block;
  }
  @-moz-document url-prefix() {
    .three-describe-Titletext {
      position:absolute;
      margin-top:100px;
      margin-left: -250px;
      width:249px;
      text-align: center;
      font-size: 20px;
      color:#333;
      display: inline-block;
  }
			}
  .three-describe-text {
    position:absolute;
    text-align: center;
    display: inline-block;
    font-size:16px;
    color:#666;
    margin-top:-110px;
    margin-left: 24px;
    width: 201px;
    font-weight: 300;
    font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell","Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
  }
  /*灰色轮播图*/
  .wheel-gray-div {
    height:426px;
    width:100%;
    background:#666;
    margin-top:106px;
    text-align: center;
  }
  .triangle-img {
    width:39px;
    height:19px;
    margin-top: -4px;
  }
  .wheel-div {
    width: 800px;
    height:306px;
    margin: 41px auto 60px;
    text-align: left;
  }
  .wheel-div img {
    width:266px;
    height:153px;
  }
  /*我们办得到*/
  .wecan-img-div {
    width: 200px;
    height: 200px;
  }
  .wecan-span {
    position:absolute;
    margin-left:-204px;
    margin-top:90px;
    font-size:16px;
    color:#333;
    width: 200px;
    text-align: center;
    /*font-weight: 300;*/
  }
  /*底部联系我们*/
  .contact-bg {
    width:100%;
    height:200px;
    padding-top: 30px;
    background:url('../../../static/img/LoginAndRegister/home_addr_bg.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .contact-a{
    color:white;
    font-size: 16px;
    font-weight: 300;
    font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell","Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
  }
  .contact-a:hover{
    color: #4ca7d3;
  }
  .contact-border {
    border-top: 1.3px solid #fff;
    width: 394px;
    height: 1.3px;
    margin-top: 13px;
  }
  .contact-div {
    width:420px;
    height: 20px;
    margin-top: 13px;
  }
  .contact-div img {
    width: 20px;
    height: 20px;
  }
  .contact-div span {
    font-size: 16px;
    color: #fff;
    vertical-align: text-top;
    margin-left: 9px;
    font-weight: 300;
    font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell","Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
  }

</style>
<script>

export default {
  data() {
      return {

      }
  },
  methods: {
    homeClick: function(){
      $('html,body').animate({scrollTop: '0px'}, 500);
    },
    productClick: function(){
      $('html,body').animate({scrollTop: '493px'}, 500);
    },
    contactClick: function(){
      $('html,body').animate({scrollTop: '2135px'}, 500);
    },
  },

}

</script>
