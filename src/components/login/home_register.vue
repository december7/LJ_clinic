<template>
  <div class="no-padding no-margins" style="background: white;width: 100%;height: 1200px">
    <!--头部浮动框-->

    <div class="home-top fixed-div" style="border-bottom: 1px solid #e8e8e8">
      <div class="home-center" style="background: rgba(0,0,0,0);width:770px">
        <img class="home-logo" src="../../../static/img/LoginAndRegister/home_logo.png">
        <a @click="contactClick" class="register-top-title">联系我们</a>
        <a href="#/" class="register-top-title" style="right: 15%;">产品说明</a>
        <a href="#/" class="register-top-title" style="right: 30%;">首页</a>
      </div>
    </div>
    <!--横条-->
    <!--<div class="register-border"></div>-->
    <!--诊所信息-->
    <form id="fileForm" enctype="multipart/form-data" action="javascript:void(0)">
    <div class="home-center" style="width:770px;height: 480px;top: 66px;">
      <div class="register-blue-title">诊所信息</div>
      <div class="register-input-div" style="margin-top: 26px">
        <label><div class="red-star">*</div>诊所名称:</label><input @input="inputSomeThing(hospitalName,0)" :class="{'register-input':true,'register-not-input':notInputArr[0]}" placeholder="请输入诊所名称(15字以内)" v-model="hospitalName" name="hospitalName">
      </div>
      <!--营业执照-->
      <div class="register-right-title"><div class="red-star">*</div>营业执照</div>
      <a id="imgUl" href="javascript:void(0)">
        <div :class="{'register-right-img':true,'register-blackborder-input':!notInputArr[1], 'register-not-input':notInputArr[1]}"><img id="showImg" src="../../../static/img/LoginAndRegister/register_photo.png"></div>
      </a>
      <div id="fileDiv" style="display: inline-block">
        <input type="file" style="display: none" id="picFile" name="busiLicenceUrl">
      </div>
      <div class="register-right-title" style="margin-top: 50px;color: #999;font-size: 13px;width: 93px">注:请将营业执照正面朝上</div>
      <!--诊所图标-->
      <div class="register-right-title" style="margin-top: 146px">诊所图标</div>
      <a id="imgUl_icon" href="javascript:void(0)">
        <div class="register-right-img register-blackborder-input" style="margin-top: 146px"><img id="showImg_icon" src="../../../static/img/LoginAndRegister/register_logo_gray.png"></div>
      </a>
      <div id="fileDiv_icon" style="display: inline-block">
        <input type="file" style="display: none" id="picFile_icon" name="hospitalUrl">
      </div>
      <div class="register-right-title" style="margin-top: 170px;color: #999;font-size: 13px">上传诊所图标更有可信度哦!</div>
      <!--诊所类型-->
      <div class="register-input-div">
        <label><div class="red-star">*</div>诊所类型:</label>
        <input @click="clinicTypeList()" readonly v-model="itemData.clinicTypeName" placeholder="选择诊所类型" data-toggle="dropdown"  :class="{'register-select':true, 'register-blackborder-input':!notInputArr[2], 'register-notclick-input':notInputArr[2]}" type="text">
        <input id="clinicType_id" v-show="false" name="hospitalType"> <!--隐藏的input（用于提交表单）-->
        <ul class="dropdown-menu attopic" style="width: 304px;top: 187px;left: 112px">
          <li @click="selectClinicType(clinicType,index)" v-for="(clinicType, index) in clinicTypeArr">
            <a class="no-padding" style="text-align: center">{{clinicType}}</a>
          </li>
        </ul>
        <img @click="clinicTypeList" data-toggle="dropdown" style="position: absolute;right: 47%;margin-top: 16.5px;width: 13px;height: 13px" src="../../../static/img/LoginAndRegister/register_arrow_gray.png">
      </div>
      <div class="register-input-div">
        <label><div class="red-star">*</div>法人姓名:</label><input @input="inputSomeThing(legalName,3)" :class="{'register-input':true,'register-not-input':notInputArr[3]}" placeholder="请输入法人姓名" v-model="legalName" name="legalName">
      </div>
      <div class="register-input-div">
        <label><div class="red-star">*</div>法人身份证:</label><input @input="inputSomeThing(legalCard,4)" @focus="getLegalCardFocus(legalCard)" @blur="loseLegalCardFocus(legalCard)" :class="{'register-input':true,'register-not-input':notInputArr[4]}" placeholder="请输入18位身份证号码" type="tel" maxlength="18" v-model="legalCard" name="legalCard">
      </div>
      <div class="register-input-div" style="width: 100%">
        <label style="width: 107px"><div class="red-star">*</div>诊所地址:</label>
        <!--省-->
        <input @click="provinceList" readonly v-model="itemData.privName" placeholder="省" data-toggle="dropdown" style="width: 142px;margin-left:2px" :class="{'register-select':true, 'register-blackborder-input':!notInputArr[5], 'register-notclick-input':notInputArr[5]}" type="text">
        <input id="province_id" v-show="false" name="privCode"> <!--隐藏的input（用于提交表单）-->
        <ul v-show="province_items.length>0"  class="dropdown-menu attopic" style="width: 142px;top: 386px;left: 112px">
          <li @click="selectProvinceValue(province)" v-for="(province, index) in province_items">
            <a class="no-padding" style="text-align: center">{{province.districtName}}</a>
          </li>
        </ul>
        <img @click="provinceList" data-toggle="dropdown" style="position: absolute;right: 68%;margin-top: 16.5px;width: 13px;height: 13px" src="../../../static/img/LoginAndRegister/register_arrow_gray.png">
        <!--市-->
        <input @click="cityList" readonly v-model="itemData.cityName" placeholder="市" data-toggle="dropdown" style="width: 142px;margin-left:17px" :class="{'register-select':true, 'register-blackborder-input':!notInputArr[6], 'register-notclick-input':notInputArr[6]}" type="text">
        <input id="city_id" v-show="false" name="cityCode"> <!--隐藏的input（用于提交表单）-->
        <ul v-show="city_items.length>0" class="attopic dropdown-menu" style="width: 142px;top: 386px;left: 275px">
          <li @click="selectCityValue(city)" v-for="(city, index) in city_items">
            <a class="no-padding" style="text-align: center">{{city.districtName}}</a>
          </li>
        </ul>
        <img @click="cityList" data-toggle="dropdown" style="position: absolute;right: 47%;margin-top: 16.5px;width: 13px;height: 13px" src="../../../static/img/LoginAndRegister/register_arrow_gray.png">
        <input @input="inputSomeThing(address,7)" :class="{'register-input':true,'register-not-input':notInputArr[7]}" style="width: 322px;margin-left: 25px;" placeholder="详细地址" v-model="address" name="address">
      </div>
    </div>
    <!--横条-->
    <div class="register-border"></div>
    <!--管理者信息-->
    <div class="home-center" style="width:770px;height: 520px;background: white;top: 541px;">
      <div class="register-blue-title">管理者信息</div>
      <div class="register-input-div" style="margin-top: 26px;width: 100%">
        <label style="width: 107px"><div class="red-star">*</div>姓&nbsp;&nbsp;名:</label><input @input="inputSomeThing(contactName,8)" :class="{'register-input':true,'register-not-input':notInputArr[8]}" style="width: 306px" placeholder="请输入管理者姓名" v-model="contactName" name="contactName">
        <label style="width: 107px;text-align: right">微&nbsp;&nbsp;信:</label><input style="width: 235px" class="register-input" placeholder="微信账号" v-model="wechatAccount" name="wechatAccount">
      </div>
      <div class="register-input-div" style="margin-top: 26px;width: 100%">
        <label style="width: 107px"><div class="red-star">*</div>手  机  号:</label><input @input="inputSomeThing(contactPhone,9)" @focus="getFocus(contactPhone)" @blur="loseFocus(contactPhone)" style="width: 306px" :class="{'register-input':true,'register-not-input':notInputArr[9]}" placeholder="请填写手机号码" type="tel" maxlength="11" v-model="contactPhone" name="contactPhone">
        <label style="width: 107px;text-align: right">邮&nbsp;&nbsp;箱:</label><input style="width: 235px" class="register-input" placeholder="邮箱地址" v-model="contactEmail" name="contactEmail">
      </div>
      <div class="register-input-div" style="margin-top: 26px;width: 100%">
        <label style="width: 107px"><div class="red-star">*</div>验  证  码:</label><input @input="inputSomeThing(validCode,10)" :class="{'register-input':true,'register-not-input':notInputArr[10]}" style="width: 306px" placeholder="请输入验证码" type="tel" maxlength="6" v-model="validCode" name="validCode">
        <a @click="sendSecurity" v-show="showSendCodeMsg" id="security_a_id" class="register-right-code forget-send-security" style="color: #4ca7d2;font-size: 16px;">立即获取</a>
        <div v-show="showtimerCode" class="register-right-code register-resendCode">{{timerCodeMsg}}</div>
      </div>
      <!--同意协议复选框-->
      <div style="margin-left: 35%;margin-top: 106px">

        <div  >
          <div class="login-checkbox-div" style="margin-top: 20px">
            <input class="checkbox-red" type="checkbox" name="checkbox_service" v-model="agree_clickCheck">
            <router-link target="_blank"   :to="{ path: 'ljhy_service'}" append style="color: #f44f63;font-size: 14px;display: inline-block">阅读并同意《邻家好医服务条款》</router-link>
          </div>
        </div>
      </div>
      <!--提交申请按钮-->
      <a><button @click="submitClick" :class="agree_clickCheck ? 'register-button' : 'register-button-gray'">提交申请</button></a>
    </div>
    </form>
    <div style="width:100%;height:200px;" class="register-bottom-div">
        <div class="contact-bg">
          <div style="width:770px;height:120px;margin:0 auto;">
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

<script>
import 'staticjs/jquery.form.min.js';

  export default {
    components: {
      //注册组件

    },

    data() {
      return {
        clinicTypeArr:[],
        province_items: [],
        city_items:[],
        privCode:'',
        cityCode:'',

        hospitalName:'',
        hospitalType:'',
        address:'',
        legalName:'',//法人姓名
        legalCard:'',
        contactName:'',//管理者姓名
        contactEmail:'',
        wechatAccount:'',
        contactPhone:'',
        validCode:'', //验证码
        busiLicenceUrl:'', //营业执照
        hospitalUrl:'', //诊所图标

        timerCodeMsg:'',
        showtimerCode:false,
        showSendCodeMsg:true,
        itemData:{
          clinicTypeName:'',
          privName:'',
          cityName:'',
        },
        agree_clickCheck: false,
        isRegisted:false,

        notInputArr:[false,false,false,false,false,false,false,false,false,false,false]
      }
    },
    mounted: function(){
      let that=this;
      $("#fileDiv input").change(function(){
        console.log("---||||||||");
        var picSrc = $(this).val();
        if(picSrc == null || picSrc == ""){
          return;
        }
        if(!picSrc.match(/.jpg|.jpeg|.gif|.png|.bmp/i)){
          swal({title: "图片格式不正确，请重新选择",text: "",type: "error",timer: 1000,showConfirmButton: false });
          $(this).val("");
          return;
        }
        var docObj = document.getElementById("picFile");
        var imgObjPreview = document.getElementById("showImg");
        if(docObj.files && docObj.files[0]){
          that.notInputArr.splice(1, 1, false);
          imgObjPreview.src = that.getObjectURL(docObj.files[0]);
          imgObjPreview.style = "width:80px;height:80px;margin:0px 0px;border-radius: 5px;";
        }else{
          //IE下，使用滤镜
          console.log("__________________");
          document.selection.empty();
        }
      });

      $("#imgUl").each(function(){
        $(this).click(function(){
          console.log("--->>>>>>")
          $("#picFile").click();

        });
      });


      // 诊所图标
      $("#fileDiv_icon input").change(function(){
        console.log("----<><><><><>");
        var picSrc = $(this).val();
        if(picSrc == null || picSrc == ""){
          return;
        }
        if(!picSrc.match(/.jpg|.jpeg|.gif|.png|.bmp/i)){
          swal({title: "图片格式不正确，请重新选择",text: "",type: "error",timer: 1000,showConfirmButton: false });
          $(this).val("");
          return;
        }
        var docObj = document.getElementById("picFile_icon");
        var imgObjPreview = document.getElementById("showImg_icon");
        if(docObj.files && docObj.files[0]){
          // that.notInputArr.splice(1, 1, false);
          imgObjPreview.src = that.getObjectURL(docObj.files[0]);
          imgObjPreview.style = "width:80px;height:80px;margin:0px 0px;border-radius: 5px;";
        }else{
          //IE下，使用滤镜
          console.log("__________________");
          document.selection.empty();
        }
      });

      $("#imgUl_icon").each(function(){
        $(this).click(function(){
          console.log("--->>>>>>")
          $("#picFile_icon").click();
        });
      });
    },

    methods: {
      getObjectURL: function (file) {
        var url = null;
        if (window.createObjectURL != undefined) {
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      clinicTypeList: function () {
        this.clinicTypeArr = [
          "中医诊所",
          "西医诊所",
          "中西医结合",
          "专科诊所",
          "综合门诊部",
        ];
        console.log(this.clinicTypeArr);
      },
//      选择诊所类型
      selectClinicType: function (clinicType,index) {
        this.itemData.clinicTypeName = clinicType;
        this.hospitalType = index+1;
        this.inputSomeThing(clinicType,2);
        $("#clinicType_id").val(index+1);
      },
//      省份列表
      provinceList: function () {
        var that=this;
        this.province_items=[];
        this.city_items=[];
        this.$api.get(this,this.$requestApi.provinceList,'',function  (data) {
          if(data.body.code == '00'){
            that.province_items = data.body.data;
          }else{
            console.log(data.body.msg);
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        },function (err) {
          console.log(err);
        });
      },
//      选择省份
      selectProvinceValue: function (province) {
        this.itemData.privName = province.districtName;
        this.privCode = province.districtCode;
        this.province_items=[];
        this.inputSomeThing(province.districtName,5);
        $("#province_id").val(province.districtCode);
        var that=this;
        this.$api.get(this,this.$requestApi.cityList,{parentCode:this.privCode},function  (data) {
          if(data.body.code == '00'){
            that.city_items = data.body.data;
            that.itemData.cityName = that.city_items[0].districtName;
            that.cityCode = that.city_items[0].districtCode;
            that.inputSomeThing(that.city_items[0].districtName,6);
            $("#city_id").val(that.city_items[0].districtCode);
            that.city_items=[];
          }else{
            console.log(data.body.msg);
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        },function (err) {
          console.log(err);
        });
      },
//      城市
      cityList: function () {
        var that=this;
        this.province_items=[];
        this.city_items=[];
        if (this.privCode == '') {
          swal({title: "请先选择省份",text: "",type: "error",timer: 1000,showConfirmButton: false });
          return;
        }
        this.$api.get(this,this.$requestApi.cityList,{parentCode:this.privCode},function  (data) {
          if(data.body.code == '00'){
            that.city_items = data.body.data;
          }else{
            console.log(data.body.msg);
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        },function (err) {
          console.log(err);
        });
      },
      selectCityValue: function (city) {
        this.itemData.cityName = city.districtName;
        this.cityCode = city.districtCode;
        this.city_items=[];
        this.inputSomeThing(city.districtName,6);
        $("#city_id").val(city.districtCode);
      },


      sendSecurity:function () {
        var sec = 60;
        console.log("=========");
        if (this.$stringUtils.checkPhone(this.contactPhone)){
          if(!this.isRegisted){ //手机号未被注册
            var that=this;
            this.$api.post(this,this.$requestApi.sendCode, {"billId":this.contactPhone} ,function (data) {
              if(data.body.code == '00'){
                console.log("发送成功");
                swal({title: "发送成功!", text: "", type: "success", timer: 2000, showConfirmButton: false});
                that.showSendCodeMsg = false;
                that.showtimerCode = true;
                for(var i = 0; i <= 60; i++){
                  window.setTimeout(function(){
                    if (sec != 0) {
                      that.timerCodeMsg = "重新发送(" + sec + "s)";
                      // console.log("|||||||||||" + that.timerCodeMsg + '--->' + that.showtimerCode);
                      sec--;
                    } else {
                      sec = 60;//如果倒计时结束就让  获取验证码显示出来
                      that.showSendCodeMsg = true;
                      that.showtimerCode = false;
                    }
                  }, i * 1000)
                }
              }else{
                console.log("发送失败");
              }
            });
          }else {
            swal({title: "手机号已被注册，不可发送验证码", text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        }else {
          swal({title: "手机号输入有误", text: "", type: "error", timer: 1000, showConfirmButton: false});
          console.log("手机号输入有误");
        }
      },

      submitClick: function () {
       let that = this;
       console.log("$('#fileForm').serialize()-------->" + $('#fileForm').serialize());
       if (this.agree_clickCheck){
          if (this.hospitalName && this.hospitalType && this.legalName && this.legalCard
            && this.privCode && this.cityCode && this.address && this.contactName && this.contactPhone && this.validCode && $("#picFile").val()){
              if (this.$stringUtils.checkPhone(this.contactPhone)){
                if(!this.isRegisted){ //手机号未被注册
                  if(this.$stringUtils.checkLegalCard(this.legalCard)){ //验证身份证号码
                    $('#fileForm').ajaxSubmit({
                      url :that.$API_URL + '/' + that.$requestApi.registClinic,
                      data:$('#fileForm').serialize(),
                      //  extParam: dataJson,
                      traditional : true,
                      dataType : "json",
                      type:"post",
                      success : function(data){
                        if(data.code=="00"){
                          console.log("提交申请成功!" + data.msg);
                          swal({title: data.msg, text: "", type: "success", timer: 1000, showConfirmButton: false});
                          history.back();
                        }else{
                          console.log("提交申请失败!" + data.msg);
                          swal({title: data.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
                        }
                        return false;
                      },
                      error : function(){
                        swal({title: "提交申请失败", text: "", type: "error", timer: 1000, showConfirmButton: false});
                        return false;
                      }
                    });
                  }else {
                    swal({title: "身份证填写有误，请检查", text: "", type: "error", timer: 1000, showConfirmButton: false});
                  }
                }else {
                  swal({title: "手机号已被注册", text: "", type: "error", timer: 1000, showConfirmButton: false});
                }
              }else {
                  swal({title: "手机号填写有误", text: "", type: "error", timer: 1000, showConfirmButton: false});
              }
          }else {
            swal({title: "必填项未填写", text: "", type: "error", timer: 1000, showConfirmButton: false});
            if(!this.hospitalName) this.notInputArr.splice(0, 1,  true);
            if(!$("#picFile").val()) this.notInputArr.splice(1, 1,  true);
            if(!this.hospitalType)  this.notInputArr.splice(2, 1,  true);
            if(!this.legalName)  this.notInputArr.splice(3, 1,  true);
            if(!this.legalCard)  this.notInputArr.splice(4, 1,  true);
            if(!this.privCode)  this.notInputArr.splice(5, 1,  true);
            if(!this.cityCode)  this.notInputArr.splice(6, 1,  true);
            if(!this.address)  this.notInputArr.splice(7, 1,  true);
            if(!this.contactName)  this.notInputArr.splice(8, 1,  true);
            if(!this.contactPhone)  this.notInputArr.splice(9, 1,  true);
            if(!this.validCode)  this.notInputArr.splice(10, 1,  true);
          }
        }else {
          console.log("未勾选不可提交");
          swal({title: "请先勾选《邻家好医服务条款》", text: "", type: "error", timer: 1000, showConfirmButton: false});
          return;
        }
      },

      getFocus:function (contactPhone) {
        console.log("=========getFocus");
      },
      loseFocus:function (contactPhone) {
        console.log("=========loseFocus--->" + contactPhone);
        if(contactPhone){
          if(this.$stringUtils.checkPhone(contactPhone)){
            var that=this;
            this.$api.post(this,this.$requestApi.checkRegistedPhone + contactPhone,"",function  (data) {
              if(data.body.code == '00'){
                that.isRegisted = false;
              }else{
                that.isRegisted = true;
                swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
              }
            },function (err) {
              console.log(err);
            });
          }else {
            swal({title: "手机号不合法", text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        }
      },

      getLegalCardFocus:function (legalCard){
        console.log("=========getLegalCardFocus");
      },
      loseLegalCardFocus:function (legalCard){
        if(this.$stringUtils.checkLegalCard(this.legalCard)){ //验证身份证号码

        }else {
          swal({title: "身份证填写有误，请检查", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }
      },

      contactClick: function(){
        $('html,body').animate({scrollTop: '2135px'}, 500);
      },

      inputSomeThing: function (inputsm,index){
        if(inputsm){
          this.notInputArr[index] = false;
        }else {
          this.notInputArr[index] = true;
        }
        console.log("this.notInputArr[index]--->" + this.notInputArr[index]);
      },


    },


  }



</script>

<style>
  .register-border {
    border-top: 1px solid #e8e8e8;
    width: 100%;
    height: 1px;
    position: absolute;
    top: 540px;
  }
  /*.register-center {*/
  /*position: absolute;*/
  /*left: 20%;*/
  /*right: 20%;*/
  /*width: 60%;*/
  /*}*/
  .register-top-title{
    position: absolute;
    right: 0px;
    top: 20px;
    font-size: 13px;
    color: #333;
    line-height: 30px;
  }
  .register-top-title:hover {
    color: #4ca7d3;
  }
  .register-blue-title {
    font-family: SimSun;
    font-size: 20px;
    color: #4ca7d2;
    margin-top: 20px;
  }
  /*输入框*/
  .register-input-div {
    width: 422px;
    height: 46px;
    margin-top: 20px;
    display: inline-block;
  }
  .register-input-div label{
    width: 109px;
    margin-top: 6px;
    font-size: 18px;
    color: #333;
    font-family: SimSun;
    font-weight: 100;
    display: inline-block;
  }
  .red-star{
    color: #f44f63;
    display: inline-block;
    font-size: 14px;
  }
  .register-input{
    background: #ffffff;
    background-image: none;
    border: 1px solid #666;
    border-radius: 3px;
    box-shadow: none;
    color: inherit;
    display: inline-block;
    padding: 6px 20px;
    /*-webkit-transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;*/
    /*transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;*/
    width: 304px;
    height: 46px;
    font-size: 18px;
    margin-left: 4px;
  }
  .register-input::-webkit-input-placeholder{
    color: #ccc;
    font-weight: 100;
    font-family: SimSun;
  }
  .register-input:focus {
    border-color: #5FA8D4;
    outline: 0;
    -webkit-box-shadow:0 0 1px 1px #5FA8D4;
    -moz-box-shadow:0 0 1px 1px #5FA8D4;
    box-shadow:0 0 1px 1px #5FA8D4;
  }
  .register-not-input{
    border: 1px solid #f44f63;
  }
  .register-notclick-input{
    border: 1px solid #f44f63;
  }
  .register-blackborder-input{
    border: 1px solid #666;
  }
  /*诊所类型*/
  .register-select {
    background: #fff;
    font-family: SimSun;
    background-image: none;
    /*border: 1px solid #666;*/
    border-radius: 3px;
    box-shadow: none;
    color: inherit;
    display: inline-block;
    /*-webkit-transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;*/
    /*transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;*/
    width: 304px;
    height: 46px;
    font-size: 18px;
    padding: 6px 20px;
  }
  .register-select:focus {
    border-color: #5FA8D4;
    outline: 0;
    -webkit-box-shadow:0 0 1px 1px #5FA8D4;
    -moz-box-shadow:0 0 1px 1px #5FA8D4;
    box-shadow:0 0 1px 1px #5FA8D4;
  }
  .register-select::-webkit-input-placeholder{
    color: #ccc;
    font-weight: 100;
    font-family: SimSun;
  }

  /*营业执照相关*/
  .register-right-title {
    margin-top: 26px;
    font-size: 16px;
    font-family: SimSun;
    color: #333;
    width:100px;
    display: inline-block;
    position: absolute;
    right: 0px;
  }
  .register-right-img {
    /*border: 1px solid #666;*/
    margin-top: 26px;
    display: inline-block;
    position: absolute;
    right: 110px;
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }
  .register-right-img img {
    width: 42px;
    height: 42px;
    margin: 19px 19px;
  }

  .register-right-code {
    font-size: 18px;
    position: absolute;
    top: 228px;
    left: 44%;
  }
  .register-resendCode {
    width: auto;
    left: 39%;
    color: #666;
    font-size: 16px;
  }
  .register-button {
    border: 0px;
    border-radius: 3px;
    color: #fff;
    background: #4ca7d2;
    font-size: 18px;
    width: 240px;
    height: 33px;
    margin-top: 13px;
    margin-left: 37.5%;
    outline: none;
    text-align: center;
  }
  .register-button-gray {
    border: 0px;
    border-radius: 3px;
    color: #fff;
    background: #ccc;
    font-size: 18px;
    width: 240px;
    height: 33px;
    margin-top: 13px;
    margin-left: 37.5%;
    outline: none;
    text-align: center;
  }
  .register-bottom-div {
    position: absolute;
    top: 1089px;
  }

</style>
