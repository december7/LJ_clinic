<template xmlns:v-validate="http://www.w3.org/1999/xhtml">
  <div class="loginBG">
    <div class="text-center login-box animated">
      <div>
        <div class="login-title-top text-center">用户登录</div>
        <!--<form class="m-t" label-position="left" label-width="0px">-->

          <div class="login-input-div" style="margin-top: 16px">
            <div class="login-input-frontImg phone-BG"></div><div class="login-input-frontLine"></div>
            <a @click="deletePhone()" class="login-input-rightImg delete-BG" style="width: 16px;height: 16px;top: 12px;" v-show="phone.length"></a>
            <input name="phone" v-model="phone" v-validate:phone.initial="'required|numeric'"
                   :class="{'input': true, 'login-input': true, 'is-danger': errors.has('phone') }" type="tel"
                   placeholder="请输入您的手机号码" maxlength="11">
            <toast-error class="my-toast-error" v-show="errors.has('phone')" :toastContent="placeholder.toastContent"></toast-error>
          </div>
          <div class="login-input-div">
            <div :class="[{ 'top-20px': errors.has('phone') }, 'login-input-frontImg paswd-BG']"></div><div :class="[{ 'top-20px': errors.has('phone') }, 'login-input-frontLine']"></div>
            <a @click="clickEye(eyeOpen)" id="click_eye_id" :class="{ 'top-20px': errors.has('phone') }" class="login-input-rightImg eye-off-BG" v-show="!errors.has('phone')"></a>
            <input name="password" id="paswd_id" v-model="password" v-validate:phone.initial="'required|numeric'"
                   :class="{'input': true, 'login-input': true, 'is-danger': errors.has('password') }" type="password"
                   placeholder="请输入密码">
            <toast-error style="margin-bottom: 0px" class="my-toast-error" v-show="errors.has('password')" :toastContent="placeholder.toastPassword"></toast-error>
          </div>
          <!--<div class="form-group">-->
            <!--<input name="accounting" v-model="accounting" v-validate:phone.initial="'required|numeric'"-->
                   <!--:class="{'input': true, 'login-input': true, 'is-danger': errors.has('accounting') }" type="text"-->
                   <!--placeholder="请输入组织机构码">-->
            <!--<toast-error v-show="errors.has('accounting')" :toastContent="placeholder.toastAccounting"></toast-error>-->

          <!--</div>-->
          <!-- 组件:用于显示提示信息 -->
          <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start"></el-tooltip>
          <div class="login-checkbox-div">
            <!--<img class="" src="../../../static/img/LoginAndRegister/login_phone.png" style="display: inline-block">-->
            <input class="checkbox-myblue" type="checkbox" name="checkbox_paswd" value="0"><span style="font-size: 12px">记住密码</span>
          </div>
          <a href="#/login/welcome_home_page" style="color: #1c2b44"><div class="foget-paswd-div"><img class="forget-paswd-img" src="../../../static/img/LoginAndRegister/login_forget.png"><span style="font-size: 12px">&nbsp;忘记密码</span></div></a>
          <!--<a href="#/login/forget_password" style="color: #1c2b44"><div class="foget-paswd-div"><img class="forget-paswd-img" src="../../../static/img/LoginAndRegister/login_forget.png"><span style="font-size: 12px">&nbsp;忘记密码</span></div></a>-->
          <button type="button" class="login-button" @click="handleSubmit2">登 录</button>
          <!--<button type="button" :class="agree_clickCheck ? 'login-button' : 'login-button-gray'" @click="handleSubmit2">登 录</button>-->
          <!--同意协议复选框-->
          <!--<div class="login-checkbox-div" style="margin-top: 20px"><input class="checkbox-red" type="checkbox" name="checkbox_service" v-model="agree_clickCheck"><span style="color: #f44f63;font-size: 12px;">同意《邻家好医服务条款》</span></div>-->

        <!--</form>-->
      </div>
    </div>
    <div class="logo-div">
      <div class="SAASName">若邻云诊所</div>
      <img class="ljhyLogo" src="../../../static/img/LoginAndRegister/login_logo.png">
      <img class="ljhySlogan" src="../../../static/img/LoginAndRegister/login_slogan.png">
    </div>
  </div>
</template>
<script>
  import toastError from "components/commonView/toastError.vue";
  //导入显示提示信息的组件
  export default {
    components: {
      //注册组件
      toastError
    },


    data() {
      return {
        placeholder: {
          toastPhone: "请输入手机号码 !",
          toastPassword: "请输入密码 !",
          toastLogin: "登录失败请重试 !",

        },

//      phone:"18621889844",
//        phone: "13026306663",
        phone: "15726816311",
        accounting: '',
        password: "123456",
        isLogin: false,

        eyeOpen: false,
        agree_clickCheck: false,
      };
    },

    methods: {

      handleSubmit2(event) {
//        if (this.agree_clickCheck){
//          console.log("可以登录");
          if (this.phone && this.password) {
            //设置提示信息内容
            var that = this;
            this.$api.post(this, this.$requestApi.login, {
              "source": "1",
              "billId": this.phone,
              "password": this.password
            }, function (data) {
              console.info(data.body);
              if (data.body.code === '00') {
                console.log(data.body.ljhyToken);
                that.$store.dispatch('login_submit_success', data.body.ljhyToken);
                that.$store.dispatch('auth_access_user_operator_id', data.body.data.operatorId);
                console.log("data.body.data.operatorId" + data.body.data.operatorId);
//          localStorage.setItem("AUTH_ACCESS_USER_DATA", data.body.data.operatorId);
                localStorage.setItem("AUTH_ACCESS_USER_OPERATOR_ID", data.body.data.operatorId);
                localStorage.setItem("AUTH_ACCESS_USER_OPERATOR_NAME", data.body.data.operatorName);
                localStorage.setItem("AUTH_ACCESS_USER_BILLID", data.body.data.billId);
                swal({title: data.body.msg, text: "", type: "success", timer: 2000, showConfirmButton: false});

                that.$router.push('/');

              } else {
                console.log(data.body.msg);
                that.isLogin = true;
                swal({title: data.body.msg, text: "", type: "error", timer: 2000, showConfirmButton: false});
              }

            }, function (err) {
              console.log(err);
              swal({title: "登录失败", text: "", type: "error", timer: 2000, showConfirmButton: false});
            });
          }else {
            swal({title: "账号或密码未填写", text: "", type: "error", timer: 2000, showConfirmButton: false});
          }
//        }else {
//          console.log("未勾选不可以登录");
//        }

      },

      clickEye :function (eyeOpen) {
        $("#paswd_id").attr("type",$("#paswd_id").attr("type")==='password'?"text":"password");
        if (eyeOpen) {
          this.eyeOpen = false;
          $("#click_eye_id").attr("class","login-input-rightImg eye-off-BG");
        }else {
          this.eyeOpen = true;
          $("#click_eye_id").attr("class","login-input-rightImg eye-on-BG");
        }
      },
      deletePhone: function () {
        this.phone = '';
      },


    },


  }

</script>

<style>
  .logo-div {
    width: 33%;
    height: 24%;
    /*background: black;*/
    float: right;
    margin-right: 4%;
    margin-top: 12%;
  }
  .ljhyLogo {
    float: right;
    margin-right: 2%;
    margin-top: 15px;
    width: 50px;
    height: 50px;
    display: inline-block;
  }
  .SAASName {
    font-family: "STHeiti";
    font-weight: bold;
    font-size: 52px;
    color: #1c2b44;
    float: right;
    /*margin-right: 4%;*/
    /*margin-top: 12%;*/
    display: inline-block;
  }
  .ljhySlogan {
    float: right;
    /*margin-right: -310px;*/
    /*margin-top: 18%;*/
    margin-right: 2%;
    margin-top: 1%;
  }

  .loginBG {
    width: 100%;
    height: 100%;
    /*background-image: url(../../../static/img/LoginAndRegister/login_bg.png);*/
    background: url(../../../static/img/LoginAndRegister/login_bg.png) no-repeat center center;
    /*background-repeat:no-repeat;*/
    background-size: 100% 100%;
    /*background-position: 0 50%;*/
  }
  @media (min-width: 1281px) {
    .loginBG {
      /*background-size: 100% 100%;*/
      /*background-position: 50% 0%;*/
      background: url(../../../static/img/LoginAndRegister/login_bg_1366.png) no-repeat center center;
    }
  }

  .login-box {
    width: 292px;
    height: 330px;
    /*height: 318px;*/
    background: rgba(255,255,255,0.8);
    margin-top: 10%;
    margin-right: 14%;
    float: right;
    border-radius: 5px;
  }

  .login-title-top {
    font-size: 22px;
    color: #1c2b44;
    margin-top: 33px;
  }

  .login-input-div {
    margin-top: 13px;
    position: relative;
    width: 100%;
  }
  .login-input-frontImg {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    left: 42px;
    /*z-index: 5;*/
  }
  .login-input-frontLine {
    height: 20px;
    position: absolute;
    border-left: 1px solid #1c2b44;
    top: 10px;
    left: 72px;
  }
  .login-input-rightImg {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 42px;
  }
  .top-20px {
    top: 25px;
  }
  .phone-BG {
    background: url(../../../static/img/LoginAndRegister/login_phone.png) no-repeat;
  }
  .paswd-BG {
    background: url(../../../static/img/LoginAndRegister/login_lock.png) no-repeat;
  }
  .eye-on-BG {
    background: url(../../../static/img/LoginAndRegister/eyes_on.png) no-repeat;
  }
  .eye-off-BG {
    background: url(../../../static/img/LoginAndRegister/eyes_off.png) no-repeat;
  }
  .delete-BG {
    background: url(../../../static/img/LoginAndRegister/login_delete.png) no-repeat;
  }

  .login-input{
    background: #ffffff;
    background-image: none;
    border: 1px solid #1c2b44;
    border-radius: 3px;
    box-shadow: none;
    color: #333;
    display: inline-block;
    padding-left: 54px;
    padding-right: 50px;
    /*-webkit-transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;*/
    /*transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;*/
    width: 233px;
    height: 40px;
    font-size: 13px;
  }
  .login-input:focus {
    border-color: #1c2b44;
    outline: 0;
    -webkit-box-shadow:0 0 1px 2px rgba(28,43,68,0.35);
    -moz-box-shadow:0 0 1px 2px rgba(28,43,68,0.35);
    box-shadow:0 0 1px 2px rgba(28,43,68,0.35);
  }
  .my-toast-error {
    color: #f52f3e;
    width: 233px;
    text-align: left;
    margin-left: 30px;
    margin-top: 3px !important;
    margin-bottom: 8px;
    font-size: 1px;
  }
  /*登录按钮*/
  .login-button {
    border: 0px;
    border-radius: 3px;
    color: #e7e7f1;
    background: #1c2b44;
    font-size: 14px;
    width: 233px;
    height: 32px;
    margin-top: 20px;
    outline: none;
    text-align: center;
  }
  .login-button-gray {
    border: 0px;
    border-radius: 3px;
    color: #ffffff;
    background: #ccc;
    font-size: 14px;
    width: 233px;
    height: 32px;
    margin-top: 20px;
    outline: none;
    text-align: center;
  }

  /*复选框*/
  .login-checkbox-div {
    display: inline-block;
    margin:10px 0 0px 30px;
    float: left;
  }
  .login-checkbox-div span {
    /*display: inline-block;*/
    margin-left: 5px;
    font-size: 13px;
    color: #1c2b44;
  }
  /*蓝色复选框*/
  .checkbox-myblue {
    -webkit-appearance: none;
    cursor: pointer;
    width: 15px;
    height: 15px;
    display: inline-block;
    outline: none !important;
    border: none;
    vertical-align: bottom;
    background: url(../../../static/img/LoginAndRegister/select_blue_nor.png) no-repeat;
  }
  .checkbox-myblue:checked{
    vertical-align: bottom;
    display: inline-block;
    outline:none;
    border: none;
    width: 15px;
    height: 15px;
    background: url(../../../static/img/LoginAndRegister/select_blue.png) no-repeat;
  }
  /*红色复选框*/
  .checkbox-red {
    -webkit-appearance: none;
    cursor: pointer;
    width: 15px;
    height: 15px;
    display: inline-block;
    outline: none !important;
    border: none;
    vertical-align: bottom;
    background: url(../../../static/img/LoginAndRegister/select_red_nor.png) no-repeat;
  }
  .checkbox-red:checked{
    vertical-align: bottom;
    display: inline-block;
    outline:none;
    border: none;
    width: 15px;
    height: 15px;
    background: url(../../../static/img/LoginAndRegister/select_red.png) no-repeat;
  }

  .forget-paswd-img {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    display: inline-block;
    outline: none !important;
    border: none;
    vertical-align: bottom;
  }
  .foget-paswd-div {
    display: inline-block;
    margin:10px 30px 0px 0px;
    float: right;
  }



</style>
