// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import store from './store'
// import Validator from 'vue-validator'
import VeeValidate from 'vee-validate' ;
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'staticcss/font-awesome.min.css';
import 'staticcss/animate.css';
import 'staticcss/style.css';
import 'sweetalert/dist/sweetalert.css';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css'
import 'staticcss/theme/index.css'
import 'staticcss/fm.selectator.jquery.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'sweetalert/dist/sweetalert.min.js';
import 'staticjs/fm.selectator.jquery.js';
import  names from  "common/utils/names.js"

// / 引用API文件
import api from 'common/methods_api.js';
import requestApi from 'common/request_api';
import stringUtils from  'common/utils/stringUtils.js';
import enumerationType from 'common/enumerationType';
import enumeration from 'common/enumeration.js';
Vue.prototype.$requestApi = requestApi;
Vue.prototype.$stringUtils = stringUtils;
Vue.prototype.$enumerationType = enumerationType;
Vue.prototype.$enumeration = enumeration;
Vue.prototype.$names = names;
Vue.prototype.isDebug=false;
// 引用路由配置文件
// 将API方法绑定到全局
Vue.prototype.$api = api;
Vue.use(VeeValidate);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.http.options.root = process.env.API_URL;
const jwtToken =store.state.account.auth.check();
Vue.http.interceptors.push((request, next) => {
  //request.headers.common['token'] = sessionStorage.getItem("accessToken");
  //request.headers['token'] = sessionStorage.getItem("accessToken");

 // const jwtToken =sessionStorage.getItem("accessToken");
console.log("Token---"+jwtToken);

  // request. header("Access-Control-Allow-Origin: http://test.rolinzs.com/clinic");
  if (jwtToken) {

    request.headers.set('ljhyToken',jwtToken );

  }
  console.log(request);
  // continue to next interceptor
  next();
});
// Vue.use(vuex);
import routes from 'router/routes'
// 使用配置文件规则
const router = new VueRouter({
  routes,
});


router.beforeEach((to, from, next) => {
  console.log(to.fullPath);
  //console.log(to.matched.some(record => record.meta.requiresAuth));
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // if (!auth.loggedIn()) {
    // sessionStorage.setItem('accessToken',"13432");
    // sessionStorage.removeItem('accessToken');
    // 校验token是否存在
    var accessToken = store.state.account.auth.check();
    console.log("校验token是否存在"+accessToken);
    if (!accessToken) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      //console.log(to.fullPath);
      //console.log(vue);
      next();
      // Vue.http.post(requestApi.auth ,{"path":to.fullPath}).then(function(response){
      //   if(response.body.code==='00'){
      //     //next();
      //     next();
      //     //set('user', this.name, date, '/', window.location.hostname)
      //   }else{
      //     next({
      //       path: '/login',
      //       query: { redirect: to.fullPath }
      //     })
      //   }
      // },function(err){
      //   next({
      //     path: '/login',
      //     query: { redirect: to.fullPath }
      //   })
      // }).catch(function(response){
      //   next({
      //     path: '/login',
      //     query: { redirect: to.fullPath }
      //   })
      // })

      // 校验是否有权限访问

    }
  } else {
    next() // 确保一定要调用 next()
  }




})

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
  //created: function () {
  // this.$router.replace('/login')
  //}
});
window.vueRoot = vue;


