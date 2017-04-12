<template xmlns:v-validate="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;background: white">
      <div class="text-center forget-title-top">修改密码</div>
      <div class="forget-box text-center">
        <!--旧密码-->
        <div class="login-input-div">
          <div class="login-input-frontImg paswd-BG"></div><div class="login-input-frontLine"></div>
          <input v-model="old_password" v-validate:phone.initial="'required|numeric'"
                 :class="{'login-input': true, }" type="password"
                 placeholder="输入旧密码">
        </div>
        <!--新密码-->
        <div class="login-input-div">
          <div class="login-input-frontImg paswd-BG"></div><div class="login-input-frontLine"></div>
          <input v-model="new_password" v-validate:phone.initial="'required|numeric'"
                 :class="{'login-input': true, }" type="password"
                 placeholder="输入新密码">
        </div>
        <!--确认新密码-->
        <div class="login-input-div">
          <div class="login-input-frontImg again-password-BG"></div><div class="login-input-frontLine"></div>
          <input v-model="again_password" v-validate:phone.initial="'required|numeric'"
                 :class="{'login-input': true, }" type="password"
                 placeholder="确认新密码">
          <toast-error style="margin-bottom: 0px" class="my-toast-error" v-show="new_password!=again_password" :toastContent="placeholder.toastNotSame"></toast-error>
        </div>
        <button @click="sureClick" class="forget-button-blue">保存</button>
        <button @click="cancel" class="forget-button-white">取消</button>
      </div>
    </div>
</template>

<style>

</style>

<script>
  import toastError from "components/commonView/toastError.vue";
  export default {
    components: {
      //注册组件
      toastError
    },
    data() {
      return {
        placeholder: {
          toastNotSame: "两次密码不一致 !",

        },
        billId:'',
        old_password: '',
        new_password: '',
        again_password: '',
      };
    },

    created() {
        this.operatorId = this.getUrlId();
        console.log("operatorId---->" + this.operatorId);
    },

    methods: {
      cancel: function () {
          window.opener=null;
          window.open('','_self');
          window.close();
      },
      getUrlId:function (name){
       let operatorId =  window.location.href.substr(window.location.href.indexOf('=')+1)
       return  (operatorId != null) ?operatorId:  null; //返回参数值
      },

      sureClick: function () {
        if (this.old_password && this.new_password && this.again_password && this.new_password==this.again_password){
//          var that=this;
          this.$api.post(this,this.$requestApi.updatePwd, {
            "operatorId":this.operatorId,
            "oldPassword":this.$md5(this.old_password),
            "newPassword":this.$md5(this.new_password),
            "confirmPwd":this.$md5(this.again_password),
          } ,function (data) {
            if(data.body.code == '00'){
              console.log("修改密码成功!");
              swal({title: "修改密码成功!", text: "", type: "success", timer: 2000, showConfirmButton: false});
            }else{
              console.log("修改密码失败");
              swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
            }
          });
        }else {
          swal({title: "信息填写有误!", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }
      },

    },

  }

</script>