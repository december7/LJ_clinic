<template xmlns:v-validate="http://www.w3.org/1999/xhtml">
    <div style="width: 100%;height: 100%;background: white">
      <div class="text-center forget-title-top">重置密码</div>
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
        <button @click="sureClick" class="forget-button-blue">保存并登录</button>
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
        this.billId = this.getUrlPhone('billId');
        console.log("billId---->" + this.billId);
    },

    methods: {
      cancel: function () {
          history.back();
      },
      getUrlPhone:function (name){
       let phoneNumber =  window.location.href.substr(window.location.href.indexOf('=')+1)
       return  (phoneNumber != null) ?phoneNumber:  null; //返回参数值
      },

      sureClick: function () {
        if (this.old_password && this.new_password && this.again_password && this.new_password==this.again_password){
         var that=this;
          this.$api.post(this,this.$requestApi.resetPwd, {
            "billId":this.billId,
            "oldPwd":this.$md5(this.old_password),
            "newPwd":this.$md5(this.new_password),
            "confirmPwd":this.$md5(this.again_password),
          } ,function (data) {
            if(data.body.code == '00'){
              console.log("重置密码成功!");
              swal({title: "重置密码成功!", text: "", type: "success", timer: 2000, showConfirmButton: false});
                //设置提示信息内容
              that.$api.post(that, that.$requestApi.login, {
                "source": "1",
                "billId": that.billId,
                "password": that.$md5(that.again_password)
              }, function (data) {
                console.info(data.body);
                if (data.body.code === '00') {
                  console.log(data.body.ljhyToken);
                  that.$store.dispatch('login_submit_success', data.body.ljhyToken);
  //                that.$store.dispatch('auth_access_user_operator_id', data.body.data.operatorId);
                  console.log("data.body.data.operatorId" + data.body.data.operatorId);
                  localStorage.setItem("AUTH_ACCESS_USER_OPERATOR_ID", data.body.data.operatorId);
                  localStorage.setItem("AUTH_ACCESS_USER_OPERATOR_NAME", data.body.data.operatorName);
                  localStorage.setItem("AUTH_ACCESS_USER_BILLID", data.body.data.billId);
                  localStorage.setItem(that.$names.reload, 1);
                  swal({title: data.body.msg, text: "", type: "success", timer: 2000, showConfirmButton: false});
                  that.$router.replace('/home');
                } else {
                  console.log(data.body.msg);
                  that.isLogin = true;
                  swal({title: data.body.msg, text: "", type: "error", timer: 2000, showConfirmButton: false});
                }
              });
            }else{
              console.log("重置密码失败");
              swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
            }
          });
        }else {
          if(!this.old_password) swal({title: "请填写旧密码", text: "", type: "error", timer: 1000, showConfirmButton: false});
          else if(!this.new_password) swal({title: "请填写新密码", text: "", type: "error", timer: 1000, showConfirmButton: false});
          else if(!this.again_password) swal({title: "请再次填写一次新密码", text: "", type: "error", timer: 1000, showConfirmButton: false});
          else if(this.new_password!=this.again_password) swal({title: "两次密码不一致", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }
      },

    },

  }

</script>