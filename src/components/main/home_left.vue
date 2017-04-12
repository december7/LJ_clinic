<template>

  <!--左侧导航开始-->
  <nav class="navbar-default navbar-static-side" role="navigation">
    <div class="nav-close"><i class="fa fa-times-circle"></i>
    </div>
    <div class="sidebar-collapse">
      <ul class="nav" id="side-menu">
        <li class="nav-header">
          <div class="dropdown profile-element">
            <span style="float:left;"><img id="hospitalUrl_id" alt="image" class="img-circle" :src="hospitalUrl"></span>
            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <span class="clear">
                               <div class="m-t-xs font-bold nameCSS">{{userInfo_data_item.operatorName}}</div>
                                <div class="text-muted text-xs">编辑<b class="caret"></b></div>
                                </span>
            </a>
            <ul class="dropdown-menu animated fadeInRight m-t-xs">
              <li><a @click="userInfoClick" type="button" class="J_menuItem" data-toggle="modal" data-target="#selfinfo">个人信息</a></li>
              <li><a href="#/login" @click="accountOut">安全退出</a></li>
            </ul>
          </div>

          <div class="logo-element" style="background-color: #008ee6;"><img  class="img-circle1" src="../../../static/img/tops_logo.png" />
          </div>
        </li>
        <li v-for="leftTitle in leftTitles">
          <a :href="leftTitle.privUrl" @click.prevent="menuItem($event)">
            <i :class="iconClazz(leftTitle.privId)"></i>
            <span class="nav-label">{{leftTitle.privName}}</span>
            <span  class="fa arrow"></span></a>
          <ul v-if="leftTitle.childPrivs.length>0"  class="nav nav-second-level collapse" aria-expanded="true">
            <li v-for="(item,index) in leftTitle.childPrivs" v-show ="getShow(item.privId )"  >
              <a class="J_menuItem" :href="'#'+item.privUrl" @click.prevent="menuItem($event)" :id="item.privId">{{item.privName}} <span class="fa arrow"  v-if="item.aSpanIs" ></span></a>
              <ul class="nav nav-third-level"   v-if="item.aSpanIs" >
                <li v-for="thirdList in item.aThirdList"><a class="J_menuItem" :href="thirdList.url" @click.prevent="menuItem($event)" :id="item.privId">{{thirdList.title}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--模态弹窗--个人信息-->
    <user_info :userInfo_data_item="userInfo_data_item"></user_info>
  </nav>
  <!--左侧导航结束-->
</template>
<script>
  import  'staticcss/lefticonstyle.css';
  import 'jquery-slimscroll/jquery.slimscroll.min.js';
  import 'metismenu/dist/metisMenu.js';
  import user_info from './user_info.vue';
  var  iconClazzs=new Array(
    {privId:3,iconClazz:"fa icon-register"},
    {privId:10,iconClazz:"fa icon-clinic"},
    {privId:1,iconClazz:"fa icon-charge"},
    // {privId:50000,iconClazz:"fa icon-inspect"},
    {privId:18,iconClazz:"fa icon-treatment"},
    {privId:5 ,iconClazz:"fa icon-pharmacy"},
    {privId:23 ,iconClazz:"fa icon-adoms"},
    {privId:6 ,iconClazz:"fa icon-patient"},
    {privId: 100000,iconClazz:"fa icon-statistics"},
    {privId: 7,iconClazz:"fa icon-set"}
  );
  export default {
    data() {
      return {
        leftTitles:[],
        userInfo_data_item:'',
        hospitalUrl:'',
      }
    },

    components:{user_info},

    mounted: function(){
      this.init();
      $('#hospitalUrl_id').error(function() {
        console.log("诊所图标图片加载出错了！");
        $('#hospitalUrl_id').attr("src", "../../../static/img/LoginAndRegister/clinic_logo.jpg");
      });
    },
    created(){
      this.getTab();
      this.user_info();
      this.getDataList();
    },
    methods: {
      getDataList:function () {
        let that=this;


        that.$api.get(that,that.$requestApi.staticData,{},function  (response) {
            if(response.body.code=='00'){
              console.time("Array耗时");
              that.$enumeration.setEnumeration(response.body.data)
              console.timeEnd("Array耗时");
            }

          },function (err) {
            console.log(err);

          }
        );
      },

      user_info: function () {
        var that = this;
        this.$api.get(this, this.$requestApi.userinfo, "", function (data) {
          if (data.body.code == '00') {
            that.userInfo_data_item = data.body.data;
            if(!that.userInfo_data_item.hospitalUrl) {
              that.hospitalUrl = "../../../static/img/LoginAndRegister/clinic_logo.jpg";
            }else {
              that.hospitalUrl = "http://test.rolinzs.com/" + that.data_item.hospitalUrl;
            }
          } else {
            console.log(data.body.msg);
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        }, function (err) {
          console.log(err);
        });
      },
      userInfoClick:function () {
        // this.user_info();
      },
      getShow:function (privId) {
      return  privId != 39 ?privId != 10000:false;
      },
      accountOut:function () {
       this.$enumeration.accountOut(this);
      },
      setLeftTitles:function (homeLeftTabs) {
        let that=this;
        if (homeLeftTabs!=[]&&homeLeftTabs.length>0){
        homeLeftTabs[homeLeftTabs.length-1].childPrivs.push({privUrl:"/message_center/message_center",privId:10000 ,privName:"消息中心"});
        homeLeftTabs[homeLeftTabs.length-1].childPrivs.push({privUrl:"/doctor_clinic/doctor_workbench",privId:39 ,privName:"医生接诊工作台"});
        that.leftTitles=homeLeftTabs;
        let  childPriv= homeLeftTabs[0].childPrivs[0];
          var tab = {title:childPriv.privName,path:'#'+childPriv.privUrl,class:"active J_menuTab",colsed:false,frameName:"iframe1"}
          that.$store.dispatch('reset_tab',tab);
          that.$nextTick(() => {
            //vuex改变状态后的dom还没有更新就执行到这里了
            that.init();
          });

        }else {
          that.getTab();
        }

      },
      init:function () {

        $('#side-menu').metisMenu();
        //固定菜单栏
        $('.sidebar-collapse').slimScroll({
          height: '100%',
          railOpacity: 0.9,
          alwaysVisible: false
        });
        $(window).scroll(function () {
          if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
          } else {
            $('#right-sidebar').removeClass('sidebar-top');
          }
        });
        $('.full-height-scroll').slimScroll({
          height: '100%'
        });
        $(".J_menuItem").each(function (index) {
          if (!$(this).attr('data-index')) {
            $(this).attr('data-index', index);
          }
        });
        var vue = this;
        $('#side-menu>li').click(function () {
          if ($('body').hasClass('mini-navbar')) {
            vue.navToggle();
          }
        });
        $('#side-menu>li li a').click(function () {
          if ($(window).width() < 769) {
            vue.navToggle();
          }
        });
        $('.nav-close').click(vue.navToggle);
//        $('.J_menuItem').on('click', this.menuItem);

      },
      getTab:function () {
        var that = this;
        that.$api.get(that, that.$requestApi.operatorPrivs,"", function (data) {
          if (data.body.code == '00') {
            that.setLeftTitles(data.body.data);

            that.$nextTick(() => {
              //vuex改变状态后的dom还没有更新就执行到这里了
              that.init();
            });

          } else {
            console.log(data.body.msg);
          }

        }, function (err) {
          console.log(err);

        });
      },

      iconClazz:  function (iconClazz) {
        for(let i in iconClazzs){
          if(iconClazzs[i].privId==iconClazz){
            return iconClazzs[i].iconClazz;
          }
        }
      },
      navToggle:function() {
        console.log( $('.navbar-minimalize'));
        $('.navbar-minimalize').trigger('click');
      },
      menuItem:function (e) {
        var menu = $(e.currentTarget);
        // 获取标识数据
        var dataUrl = menu.attr('href'),
          dataIndex = menu.data('index'),
          menuName = $.trim(menu.text()),
          flag = true;
        if (dataUrl == undefined || $.trim(dataUrl).length == 0)return false;
        // 选项卡菜单已存在
        var vue = this;
        $('.J_menuTab').each(function () {
          if ($(this).data('id') == dataUrl) {
            if (!$(this).hasClass('active')) {
              $(this).addClass('active').siblings('.J_menuTab').removeClass('active');
              vue.$parent.scrollToTab(this);
              // 显示tab对应的内容区
              $('.J_mainContent .J_iframe').each(function () {
                if ($(this).data('id') == dataUrl) {
                  $(this).show().siblings('.J_iframe').hide();
                  return false;
                }
              });
            }
            flag = false;
            return false;
          }
        });

        // 选项卡菜单不存在
        if (flag) {
//            var str = '<a href="javascript:;" class="active J_menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-times-circle"></i></a>';

          $('.J_menuTab').removeClass('active');

          // 添加选项卡对应的iframe
//            var str1 = '<iframe class="J_iframe" name="iframe' + dataIndex + '" width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
//            $('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);

          //显示loading提示
//            var loading = layer.load();
//
//            $('.J_mainContent iframe:visible').load(function () {
//                //iframe加载完成后隐藏loading提示
//                layer.close(loading);
//            });
          // 添加选项卡
//            $('.J_menuTabs .page-tabs-content').append(str);
          $('.J_mainContent').find('iframe.J_iframe').hide();
          if (this.navs[0].dataUrl==dataUrl){return}

          var tab = {title:menuName,path:dataUrl,class:"active J_menuTab",colsed:true,frameName:"iframe"+dataIndex}
          this.$store.dispatch('addTab', tab);
          this.$nextTick(() => {
            //vuex改变状态后的dom还没有更新就执行到这里了
            this.$parent.scrollToTab($('.J_menuTab.active'));
          });

        }
        return false;
      },
    },

    computed : {
      navs(){
        return this.$store.getters.getTabs;
      },
    },
  }




</script>

<style>

.nameCSS{
  width:60px;
  white-space:nowrap;
  text-overflow:ellipsis;
  -o-text-overflow:ellipsis;
  overflow: hidden;
}

</style>

