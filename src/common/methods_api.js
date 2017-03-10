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
    success(data);
  },function(error){
      console.log("异常数据"+JSON.stringify(data));
    failure(error);
  })

}
//请求方法
export default {
  get: function(context,url, params, success, failure) {
    return _api_base(context,'GET', url, params, success, failure)
  },
  post: function(context,url, params, success, failure) {
    return _api_base(context,'POST', url, params, success, failure)
  }
}



