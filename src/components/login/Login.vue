<template xmlns:v-validate="http://www.w3.org/1999/xhtml">
  <div class="middle-box text-center loginscreen  animated fadeInDown">
    <div>
      <div>

        <!--h1 class="logo-name">H+</h1-->

      </div>
      <h3>欢迎使用 邻家好医诊所管理系统</h3>
      <form class="m-t"   label-position="left" label-width="0px">

        <div class="form-group">
          <input name="phone" v-model="phone"   v-validate:phone.initial="'required|numeric'" :class="{'input': true, 'form-control': true, 'is-danger': errors.has('phone') }" type="text" placeholder="请输入账号">
          <toast-error v-show="errors.has('phone')" :toastContent="placeholder.toastContent"></toast-error>



        </div>
        <div class="form-group">
          <input name="password" v-model="password"   v-validate:phone.initial="'required|numeric'" :class="{'input': true, 'form-control': true, 'is-danger': errors.has('password') }" type="text" placeholder="请输入密码">
          <toast-error v-show="errors.has('password')" :toastContent="placeholder.toastPassword"></toast-error>

        </div>
        <div class="form-group">
          <input name="accounting" v-model="accounting"   v-validate:phone.initial="'required|numeric'" :class="{'input': true, 'form-control': true, 'is-danger': errors.has('accounting') }" type="text" placeholder="请输入组织机构码">
          <toast-error v-show="errors.has('accounting')" :toastContent="placeholder.toastAccounting"></toast-error>

        </div>
        <!-- 组件:用于显示提示信息 -->
        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
        </el-tooltip>
        <button type="button" class="btn btn-primary block full-width m-b" @click="handleSubmit2">登 录</button>
        <toast-error v-show="isLogin" :toastContent="placeholder.toastLogin"></toast-error>

      </form>


    </div>
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
      placeholder:{
        toastPhone: "请输入手机号码 !",
        toastPassword: "请输入密码 !",
        toastAccounting: "请输入组织机构码 !",
        toastLogin: "登录失败请重试 !",

      },

//      phone:"18621889844",
      phone:"13026306663",
      accounting: '',
      password:"123456",
      isLogin:false,
    };
  },

    methods: {

    handleSubmit2(event) {
      if (!this.phone&&this.password){
        return
      }
      //设置提示信息内容
        var  that=this;
      this.$api.post(this,this.$requestApi.login, {"source":"1","billId":this.phone,"password":this.password},function  (data) {
        console.info(data.body);
        if(data.body.code==='00'){
          console.log(data.body.ljhyToken);
          that .$store.dispatch('login_submit_success',data.body.ljhyToken);
          that.$store.dispatch('auth_access_user_operator_id',data.body.data.operatorId);
          console.log("data.body.data.operatorId"+data.body.data.operatorId);
//          localStorage.setItem("AUTH_ACCESS_USER_DATA", data.body.data.operatorId);
          localStorage.setItem("AUTH_ACCESS_USER_OPERATOR_ID", data.body.data.operatorId);
          localStorage.setItem("AUTH_ACCESS_USER_OPERATOR_NAME", data.body.data.operatorName);
          localStorage.setItem("AUTH_ACCESS_USER_BILLID", data.body.data.billId);
          swal({   title: data.body.msg,   text: "", type: "success",  timer: 2000,   showConfirmButton: false });

          that.$router.push('/');

        }else{
          console.log(data.body.msg);
          that.isLogin=true;
          swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
        }

      },function (err) {
        console.log(err);
        swal({   title: "登录失败,请重试",   text: "", type: "error",  timer: 2000,   showConfirmButton: false });


      });

    }
  },

  }

</script>

