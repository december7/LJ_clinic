// 配置API接口地址

//请求基类
function _api_base(context,method,url, params, success, failure) {
  context.$http({
    method:method,
    url:url,
    params:params
  }).then(function(data){
    console.log(params);
    console.log("数据"+JSON.stringify(data));
    if (data.body.code=="01"){
      this.$store.dispatch('login_submit_success', "");
      this.$router.replace('/login');
    }
    // else  if (data.body.code=="99"){
    //   swal({title: data.body.msg, text: "", type: "error", timer: 2000, showConfirmButton: false});
    //   return;
    // }
    success(data);
  },function(error){
   console.log("异常数据"+JSON.stringify(data));
    swal({title: "网络连接失败!", text: "", type: "error", timer: 2000, showConfirmButton: false});
    failure(error);
  })

}
//请求方法
export default {
  get: function(context,url, params, success, failure) {
    return _api_base(context,'GET', url, params, success, failure)
  },
  post: function(context,url, params, success, failure) {
    // let  timeIn= new Date().getMilliseconds();
    // console.log(   this.timeOut);
    // this.timeOut= timeIn-  this.timeOut;
    // if (this.timeOut>1000){
    //   return
    // }
    // console.log(   this.timeOut);
    return _api_base(context,'POST', url, params, success, failure)
  },
  // timeOut: new Date().getMilliseconds(),
}



