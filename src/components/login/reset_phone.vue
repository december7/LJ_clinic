<template xmlns:v-validate="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;background: white">
      <div class="text-center forget-title-top">更换手机号</div>
      <div class="forget-box text-center">
        <!--手机号-->
        <div class="login-input-div" style="margin-top: 41px">
          <div class="login-input-frontImg phone-BG"></div>
          <div class="login-input-frontLine"></div>
          <a @click="deletePhone()" class="login-input-rightImg delete-BG" style="width: 16px;height: 16px;top: 12px;"
             v-show="phone.length"></a>
          <input v-model="phone" v-validate:phone.initial="'required|numeric'"
                 :class="{'login-input': true, }" type="tel"
                 placeholder="新手机号码" maxlength="11" @focus="getFocus(phone)" @blur="loseFocus(phone)">
        </div>
        <!--验证码-->
        <div class="login-input-div">
          <div class="login-input-frontImg security-BG"></div><div class="login-input-frontLine"></div>
          <input v-model="security" v-validate:phone.initial="'required|numeric'"
                 :class="{'login-input': true, }" type="tel"
                 placeholder="验证码" maxlength="6">
          <a @click="sendSecurity" v-show="showSendCodeMsg" id="security_a_id" class="login-input-rightImg forget-send-security">立即发送</a>
          <div v-show="showtimerCode" class="login-input-rightImg forget-resendCode">{{timerCodeMsg}}</div>
        </div>
        <!--密码-->
        <div class="login-input-div">
          <div class="login-input-frontImg paswd-BG"></div><div class="login-input-frontLine"></div>
          <input v-model="password" v-validate:phone.initial="'required|numeric'"
                 :class="{'login-input': true, }" type="password"
                 placeholder="请输入原密码">
        </div>
        <button @click="sureClick" class="forget-button-blue">保存</button>
        <button @click="cancel" class="forget-button-white">取消</button>

      </div>
    </div>
</template>
<style>

  .forget-title-top {
    font-size: 24px;
    padding-top: 84px;
    color: #1c2b44;
  }
  .forget-box {
    width: 292px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
  }
  .security-BG {
    background: url(../../../static/img/LoginAndRegister/login_test.png) no-repeat;
  }
  .again-password-BG {
    background: url(../../../static/img/LoginAndRegister/login_confirm.png) no-repeat;
  }

  .forget-button-white {
    border: 1px solid #1c2b44;
    border-radius: 3px;
    color: #1c2b44;
    background: #fff;
    width: 109px;
    height: 32px;
    margin-top: 20px;
    outline: none;
    text-align: center;
  }
  .forget-button-blue {
    border: 0px;
    border-radius: 3px;
    color: #e7e7f1;
    background: #1c2b44;
    width: 109px;
    height: 32px;
    margin-top: 20px;
    margin-right: 10px;
    outline: none;
    text-align: center;
  }
  .forget-send-security{
    color: #f44f63;
    width: auto;
  }
  .forget-resendCode {
    color: #ccc;
    width: auto;
  }

</style>
<script>
  export default {
    
    created() {
        this.operatorId = this.getUrlId();
        console.log("operatorId---->" + this.operatorId);
    },

    data() {
      return {
        phone: '',
        operatorId: '',
        security :'',
        password: '',
        timerCodeMsg:'',
        showtimerCode:false,
        showSendCodeMsg:true,
        isNotRegisted:false,
      };
    },

    methods: {
      cancel: function () {
        window.opener=null;
        window.open('','_self');
        window.close();
      },
      getUrlId:function (){
       let operatorId =  window.location.href.substr(window.location.href.indexOf('=')+1)
       return  (operatorId != null) ?operatorId:  null; //返回参数值
      },

      sendSecurity:function () {
        var sec = 60;
        console.log("=========");
        if (this.$stringUtils.checkPhone(this.phone)){
          if(this.isNotRegisted){
            var that=this;
            this.$api.post(this,this.$requestApi.sendPhoneCode, {"billId":this.phone} ,function (data) {
              if(data.body.code == '00'){
                console.log("发送成功");
                swal({title: "发送成功!", text: "", type: "success", timer: 1000, showConfirmButton: false});
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
            swal({title: "该手机号已注册过诊所", text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        }else {
          swal({title: "手机号输入有误", text: "", type: "error", timer: 1000, showConfirmButton: false});
          console.log("手机号输入有误");
        }
      },

      sureClick: function () {
        if (this.$stringUtils.checkPhone(this.phone) && this.security && this.password){
//          var that=this;
          this.$api.post(this,this.$requestApi.resetPhone, {
            "billId":this.phone,
            "operatorId":this.operatorId,
            "validCode":this.security,
            "password":this.$md5(this.password),
          } ,function (data) {
            if(data.body.code == '00'){
              console.log("设置新手机号成功!");
              swal({title: "设置新手机号成功!", text: "", type: "success", timer: 2000, showConfirmButton: false});
              history.back();
            }else{
              console.log("设置新手机号失败");
              swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
            }
          });
        }else {
          swal({title: "手机号或密码或验证码填写有误!", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }
      },

      getFocus:function (contactPhone) {
        console.log("=========getFocus");
      },
      loseFocus:function (contactPhone) {
        console.log("=========loseFocus--->" + contactPhone);
        if(this.$stringUtils.checkPhone(contactPhone)){
          var that=this;
          this.$api.post(this,this.$requestApi.checkRegistedPhone + contactPhone,"",function(data) {
            if(data.body.code == '00'){
              that.isNotRegisted = true; //手机号未注册
            }else{
              that.isNotRegisted = false; //手机号已注册
              swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
            }
          },function (err) {
            console.log(err);
          });
        }else {
          // swal({title: "手机号不合法", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }
      },

      deletePhone: function () {
        this.phone = '';
      },
    },

  }

</script>
