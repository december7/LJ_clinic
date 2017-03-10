<template>

  <!--左侧导航开始-->
  <nav class="navbar-default navbar-static-side" role="navigation">
    <div class="nav-close"><i class="fa fa-times-circle"></i>
    </div>
    <div class="sidebar-collapse">
      <ul class="nav" id="side-menu">
        <li class="nav-header">
          <div class="dropdown profile-element">
            <span style="float:left;"><img alt="image" class="img-circle" src="../../../static/img/profile_small.jpg" /></span>
            <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                <span class="clear">
                               <span class="block m-t-xs"><strong class="font-bold">超级管理员</strong></span>
                                <span class="text-muted text-xs block">编辑<b class="caret"></b></span>
                                </span>
            </a>
            <ul class="dropdown-menu animated fadeInRight m-t-xs">
              <li><a type="button" class="J_menuItem" data-toggle="modal" data-target="#selfinfo">个人信息</a></li>
              <li><a href="login.html">安全退出</a></li>
            </ul>
          </div>

          <div class="logo-element" style="background-color: #008ee6;"><img  class="img-circle1" src="../../../static/img/tops_logo.png" />
          </div>
        </li>
        <li v-for="leftTitle in leftTitles">
          <a :href="leftTitle.url" @click.prevent="menuItem($event)">
            <i :class="iconClazz(leftTitle.menuItemId)"></i>
            <span class="nav-label">{{leftTitle.title}}</span>
            <span  class="fa arrow"></span></a>
          <ul   v-if="leftTitle.menuChlids.length>0"  class="nav nav-second-level collapse" aria-expanded="true">
            <li v-for="(item,index) in leftTitle.menuChlids" v-show="item.menuItemId != 30300">
              <a class="J_menuItem" :href="item.url" @click.prevent="menuItem($event)" :id="item.menuItemId">{{item.title}} <span class="fa arrow"  v-if="item.aSpanIs" ></span></a>
              <ul class="nav nav-third-level"   v-if="item.aSpanIs" >
                <li v-for="thirdList in item.aThirdList"><a class="J_menuItem" :href="thirdList.url" @click.prevent="menuItem($event)" :id="item.menuItemId">{{thirdList.title}}</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--模态弹窗--个人信息-->
    <user_info></user_info>

  </nav>
  <!--左侧导航结束-->
</template>
<script>
  import  'staticcss/lefticonstyle.css';
  import 'jquery-slimscroll/jquery.slimscroll.min.js';
  import 'metismenu/dist/metisMenu.js';
  import user_info from './user_info.vue';
  var  iconClazzs=new Array(
    {menuItemId:20000,iconClazz:"fa icon-register"},
    {menuItemId:30000,iconClazz:"fa icon-clinic"},
    {menuItemId:40000,iconClazz:"fa icon-charge"},
    {menuItemId:50000,iconClazz:"fa icon-inspect"},
    {menuItemId:60000,iconClazz:"fa icon-treatment"},
    {menuItemId:70000 ,iconClazz:"fa icon-pharmacy"},
    {menuItemId:80000 ,iconClazz:"fa icon-adoms"},
    {menuItemId:90000 ,iconClazz:"fa icon-patient"},
    {menuItemId: 100000,iconClazz:"fa icon-statistics"},
    {menuItemId: 110000,iconClazz:"fa icon-set"}
  );
  var leftTitles=[

    {
      url:"",
      title:"挂号",
      menuItemId: 20000,
      menuChlids: [
        {url: '#/doctor_registered/registered_add' ,title:"新增挂号", menuItemId:20100},
        {url: '#/doctor_registered/registered_list' ,title:"挂号列表", menuItemId:20200},
      ],
    },
    {
      url:"",
      title:"医生门诊",
      menuItemId:30000,
      menuChlids: [{url: '#/doctor_clinic/today_patient' ,title:"今日患者", menuItemId:30100},  {url: '#/doctor_clinic/history_patient' ,title:"历史患者", menuItemId:30200}, {url: '#/doctor_clinic/doctor_workbench' ,title:"医生接诊工作台", menuItemId:30300}],
    },
    {
      url:"",
      title:"收费",
      menuItemId:40000,
      menuChlids: [
        {url: '#/doctor_charge/doctor_charge_wait' ,title:"待收费", menuItemId:40100},
        {url: '#/doctor_charge/doctor_charge_list' ,title:"收费列表", menuItemId:40200},
      ],
    },
    {
      url:"",
      title:"检查室",
      menuItemId:50000,
      menuChlids: [
        {url: '#/doctor_clinic/today_patient' ,title:"今日患者",aThirdList:[], menuItemId:50100,
        },
        {url: '#/doctor_clinic/history_patient' ,title:"挂号列表", menuItemId:50200,},
       ],
    },
    {
      url:"",
      title:"治疗室",
      menuItemId:60000,
      menuChlids: [
        {url: '#/treatment_room/waiting_treatment' ,title:"待治疗", menuItemId:60100,},
        {url: '#/treatment_room/treatment_list' ,title:"治疗列表", menuItemId:60200,},
      ]
    },
    {
      title:"药房",
      url:"",
      menuItemId: 70000,
      menuChlids: [
        {url: '#/drugstore/wait_dispensing' ,title:"待发药", menuItemId:70100,},
        {url: '#/drugstore/dispensing_list' ,title:"发药列表", menuItemId:70200,},
      ]
    },
    {
      title:"药品进销存",
      url:"",
      menuItemId:80000,
      menuChlids: [
        {url: '#/medicine/goods_manage' ,title:"商品管理",aThirdList:[], menuItemId:80100,},
        {url: '#/medicine/suppliers_manage' ,title:"供应商管理", menuItemId:80200,},
        {url: '#/medicine/stock_manage' ,title:"库存管理", menuItemId:80400,},
        {url: '#/medicine/early_warning' ,title:"预警", menuItemId:80500,},
        {url: '#/medicine/procurement' ,title:"采购", menuItemId:80600,},
        {url: '#/medicine/procurement_storage' ,title:"入库", menuItemId:80700,},
        {url: '#/medicine/warehouse' ,title:"出库", menuItemId:80800,},
        {url: '#/medicine/returned_goods' ,title:"退货", menuItemId:80900,},
        {url: '#/medicine/inventory' ,title:"盘点", menuItemId:81000,},
        {url: '#/medicine/audit' ,title:"审核", menuItemId:81100,},
        ],
    },
    {
      title:"患者管理",
      url:'',
      menuItemId: 90000,
      menuChlids: [
        {
          url: '#/patients_manage/patients_manage' ,title:"患者列表",aThirdList:[], menuItemId:90100,
        }
      ],
    },
//    {
//      title:"数据统计",
//      url:"",
//      menuItemId: 100000,
//      menuChlids: [
//      ],
//    },
    {
      title:"设置管理",
      url:"",
      menuItemId: 110000,
      menuChlids: [
        {url: '#/settingManage/set_clinic_setting' ,title:"诊所信息", menuItemId:110100,},
        {url: '#/settingManage/set_role_manage' ,title:"角色管理", menuItemId:110200,},
        {url: '#/settingManage/set_staff_manage' ,title:"员工管理", menuItemId:110300,},
        {url: '#/settingManage/set_cost_setting' ,title:"挂号设置", menuItemId:110500,},
        {url: '#/settingManage/set_item_manage' ,title:"项目设置", menuItemId:110600,},
        {url: '#/settingManage/set_item_template' ,title:"项目模板设置", menuItemId:110700,},
      ],
    },
  ]
  export default {

    data() {
      return {
        leftTitles:leftTitles
      }
    },

    components:{user_info},

    computed: {

    },
    mounted: function(){
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
    methods: {
      iconClazz:  function (iconClazz) {
        for(let i in iconClazzs){
          if(iconClazzs[i].menuItemId==iconClazz){
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
          var tab = {title:menuName,path:dataUrl,class:"active J_menuTab",colsed:true,frameName:"iframe"+dataIndex}
          this.$store.dispatch('addTab', tab);
          this.$nextTick(() => {
            //vuex改变状态后的dom还没有更新就执行到这里了
            this.$parent.scrollToTab($('.J_menuTab.active'));
          });

        }
        return false;
      },
    }
  }







</script>


