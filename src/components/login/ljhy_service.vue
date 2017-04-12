<template>
    <div class="no-padding no-margins white-bg" style="height:auto;">
      <div class="home-top fixed-div" style="border-bottom: 1px solid #e8e8e8">
        <div class="home-center" style="background: rgba(0,0,0,0)">
          <img class="home-logo" src="../../../static/img/LoginAndRegister/home_logo.png">
          <a href="#/" type="button" class="home-top-title">首页</a>
          <a href="#/" type="button" class="home-top-title" style="left: 33%;">产品说明</a>
          <a type="button" @click="contactClick" class="home-top-title" style="left: 47%;">联系我们</a>
          <span>400-0900-360</span>
          <img class="home-phone-img" src="../../../static/img/LoginAndRegister/home_phone.png">
        </div>
      </div>
      <div style="width:100%;height:auto;margin-top:66px">
          <div style="width:805px;height:2530px;margin:0 auto;">
              <div style="width:805px;height:2450px;position:absolute;top:106px;border:solid 1px #ccc">
                  <div class="service-title">诊所系统服务协议</div>
                  <p style="margin-bottom:15px;" class="service-small-title">一、声明</p>
                  <p class="service-text">1、本协议由格格医疗科技（上海）有限公司（邻家好医）根据《中华人民共和国合同法》及其它相关法律法规制定。旨在规范中国区域内您（本协议中的您包含自然人和法人）访问和使用邻家好医诊所管理系统的相关事项。</p>
                  <p class="service-text">2、我们的产品邻家好医诊所管理系统是一款专为基层医疗机构管理设计的、提供基于云计算的信息化解决方案、覆盖医疗完整业务流程的门诊管理、患者（用户）管理、药品管理、电子病历、收费管理、库存管理、统计分析等医疗信息管理服务的系统。</p>
                  <p class="service-text">3、您在注册和使用邻家好医诊所管理系统服务之前，请先仔细阅读本协议，您注册或使用邻家好医诊所管理系统的行为即表明您与我们建立了合同关系，表明您接受本协议的约束。</p>
                  <p style="margin-top: 15px;margin-bottom:15px;" class="service-small-title">二、注册</p>
                  <p class="service-text">1、您在使用邻家好医诊所管理系统服务之前，需要访问我们提供的网址（[补充网址]）并注册邻家好医诊所管理系统。注册时，您应当自愿且如实填写您的个人及机构信息（包括但不限于姓名、名称、证件号）。在您完成注册经审核通过后，我们将通过短信向您发送您的帐户。您根据我们提供的帐户可自行设置密码使用邻家好医诊所管理系统。注册完成即表示您已经同意并授权我们为向您提供服务而使用您的个人信息。</p>
                  <p class="service-text">2、您在使用邻家好医诊所管理系统的服务时，必须向系统传输正确的信息（包括但不限于患者（用户）信息、药品信息、病历信息等），系统将根据您上传或填写的信息为您记录、分析、展示、统计正确的医疗信息，便于您对医疗机构业务的科学化管理。若您上传的信息不正确、不完整，导致系统分析或管理出现错误，我们无需向您承担任何法律责任。因传输错误信息发生的一切行为应当由您自行承担法律后果。</p>
                  <p class="service-text">3、您同意始终确保您的邻家好医诊所管理系统帐户用户名、密码等信息的安全和保密性。因您自身行为导致密码泄露引起的损失或纠纷，应当由您自行承担相关法律责任。</p>
                  <p class="service-text">4、您应当自行负责配置使用邻家好医诊所管理系统所需的设配与网络环境（包含但不限于电脑、第三方网络等）。</p>
                  <p class="service-text">5、邻家好医诊所管理系统仅为您提供诊所信息化管理，您在为患者诊疗医治过程中，应当根据医疗行业相关标准，参考您机构的诊疗设备及医务人员的专业水准为患者提供恰当的医疗服务。因您的医疗设备及医务人员的过错引起的医疗事故或纠纷与我们无关，应当由您或相关人员自行承担相关的刑事、行政、民事法律责任。</p>
                  <p style="margin-top: 15px;margin-bottom:15px;" class="service-small-title">三、付费与收费方式</p>
                  <p class="service-text">1、您可以免费注册为邻家好医诊所管理系统的用户，在您注册成功后，邻家好医诊所管理系统系统将提示您，您在一段时间内可以免费试用邻家好医诊所管理系统。试用期满后，您可以根据希望使用的年限，选择我们的服务。我们将根据您做出的选择收取相应的服务费。</p>
                  <p class="service-text">2、您在使用邻家好医诊所管理系统时，可以根据自身的需要选择所需要的服务模块。我们将会根据您选择的服务模块数量向您收取相应的服务费。</p>
                  <p class="service-text">3、您可以选择支付宝、微信转账、银联等多种方式向我们支付服务费。</p>
                  <p class="service-text">我们将会在服务期届满的三天前通知并询问您是否继续和我们合作，如您选择继续合作，您可以根据我们为您提供的服务年限，支付相应的服务费。若您续费，表明您继续接受本协议的约束</p>
                  <p style="margin-top: 15px;margin-bottom:15px;" class="service-small-title">四、不可抗力</p>
                  <p class="service-text">1、本协议中的不可抗力，包括但不限于网络设备维护、网络连接故障、网络信号未覆盖、网络传输延时或中断、电子终端、通讯或其他系统的故障或误差、电力故障、罢工、火灾、洪水、司法行政机关的命令、其它不可抗力或第三方的行为。</p>
                  <p class="service-text">2、因不可抗力造成邻家好医诊所管理系统无法提供服务或延迟服务，邻家好医不承担任何法律责任。</p>
                  <p class="service-text">3、在邻家好医不存在故意或重大过失的情况下，由于您访问和使用邻家好医诊所管理系统的服务，对您或任何第三方造成的任何损失，您同意我们将不予承担任何法律责任。</p>
                  <p style="margin-top: 15px;margin-bottom:15px;" class="service-small-title">五、双方声明与承诺</p>
                  <p class="service-text">1、您同意并确认，在您使用邻家好医诊所管理系统服务过程中，由我们掌握收集您的个人信息及您向邻家好医诊所管理系统传输的信息。</p>
                  <p class="service-text">2、邻家好医承诺所收集与掌握的您及您的患者（用户）的信息仅作为您提供医疗信息化服务用途，我们将严格保守在为您提供服务过程中所知悉的医疗信息（包括但不限于客户信息、患者信息、药品信息、商业秘密等）。</p>
                  <p style="margin-top: 15px;margin-bottom:15px;" class="service-small-title">六、知识产权归属</p>
                  <p class="service-text">本协议中的邻家好医诊所管理系统软件著作权系格格医疗科技（上海）有限公司拥有。您注册或使用邻家好医诊所管理系统软件的行为不构成向您转让或许可使用邻家好医诊所管理系统软件著作权及我们的商标、名称等。您不得以任何方式或理由对我们的产品、名称、商标进行复制、修改、抄录、出售等侵权行为。否则，我们随时有权向您追诉，并要求你赔偿所有损失（包含律师费）</p>
                  <p style="margin-top: 15px;margin-bottom:15px;" class="service-small-title">七、本协议的变更</p>
                  <p class="service-text">我们有权对邻家好医诊所管理系统软件进行系统升级，并变更本协议。本协议发生重大变更的，我们将通过您预留的联系方式向您发出通知。您有权选择接受我们的系统升级并同意协议变更，也有权拒绝我们的升级服务，保留原协议。</p>
                  <p style="margin-top: 15px;margin-bottom:15px;" class="service-small-title">八、违约责任</p>
                  <p class="service-text">1、我们根据您选择的服务及服务年限向您收取服务费；若您在服务期限到期前终止本协议或不再使用我们的产品的；我们视为您单方面违约。我们有权不予退还所收取的服务费。</p>
                  <p class="service-text">2、若因邻家好医诊所管理系统发生故障，您有权向我们发出通知，我们将会及时作出修复处理。您无权解除本协议。如果因为我们的重大过错导致邻家好医诊所管理系统不能修复无法给您提供服务，我们将会视具体情况退还部分或全部服务费。</p>
                  <p style="margin-top: 15px;margin-bottom:15px;" class="service-small-title">九、联系我们</p>
                  <p class="service-text">您在使用邻家好医诊所管理系统过程中，发生的任何与产品有关的疑问或需要我们为其提供技术服务的。均可发邮件或打电话联系我们，我们将会及时解答您的问题，或者指派技术人员帮助您解决技术问题。我们的邮箱：it@linjiahaoyi.com 客服电话：400-0900-360</p>
                  <p style="margin-top: 15px;margin-bottom:15px;" class="service-small-title">十、争议解决方式</p>
                  <p class="service-text">因本协议或您使用邻家好医诊所管理系统中发生的纠纷，双方应友好协商解决。协商不成的，任何一方有权向邻家好医所在地人民法院提起诉讼。</p>
              </div>
          </div>
      </div>
      <!--底部联系我们-->
      <div style="width:100%;height:200px;">
        <div class="contact-bg">
          <div style="width:805px;height:120px;margin:0 auto;">
            <a href="#/" class="contact-a">首页</a>
            <a href="#/" style="margin-left:46px" class="contact-a">产品说明</a>
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

.service-title {
    font-size: 22px;
    color: #333;
    font-weight: 500;
    text-align: center;
    margin-top: 25px;
}
.service-small-title {
    font-size: 20px;
    color: #282828;
    margin-top: 21px;
    margin-left: 20px;
}
.service-text{
    font-size: 16px;
    line-height:29px;
    color: #282828;
    margin-left: 20px;
    margin-right: 20px;
}


</style>


<script>

export default {
  data() {
      return {

      }
  },
  methods: {
    contactClick: function(){
      $('html,body').animate({scrollTop: '2135px'}, 500);
    },
  },

}

</script>