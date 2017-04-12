<template>
  <div id="page-wrapper" class="gray-bg dashbard-1">

    <div class="row border-bottom">
      <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header"><a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="javascript:void(0);" ><i class="fa fa-bars"></i> </a>
          <form role="search" class="navbar-form-custom" method="post" action="search_results.html">
            <div class="form-group">
              <input type="text" placeholder="请输入您需要查找的内容 …" class="form-control" name="top-search" id="top-search">
            </div>
          </form>
        </div>
        <ul class="nav navbar-top-links navbar-right">
          <li class="dropdown">
            <a class="J_menuItem count-info" @click="openMessage">
              <i class="fa fa-bell"></i> <span class="label label-danger" style="border-radius: 10px;">8</span>
            </a>
          </li>

        </ul>
      </nav>
    </div>
    <div class="row content-tabs">
      <button class="roll-nav roll-left J_tabLeft"  ><i class="fa fa-backward"></i>
      </button>
      <nav class="page-tabs J_menuTabs">
        <div class="page-tabs-content">
          <a v-for="item in navs" href="javascript:;" :class="item.class" :data-id="item.path" v-on:click.prevent="activeTab($event)">{{item.title}}<i v-show="item.colsed" class="fa fa-times-circle" v-on:click="closeTab($event)"></i></a>
        </div>
      </nav>
      <button class="roll-nav roll-right J_tabRight" ><i class="fa fa-forward"></i>
      </button>
      <div class="btn-group roll-nav roll-right">
        <!--<button class="dropdown J_tabClose" data-toggle="dropdown">关闭操作<span class="caret"></span>-->
        <button class=" dropdown J_tabClose" @click="refreshInterface" >刷新</span>

        </button>
        <!--<ul role="menu" class="dropdown-menu dropdown-menu-right">-->
          <!--<li class="J_tabShowActive"><a>定位当前选项卡</a>-->
          <!--</li>-->
          <!--<li class="divider"></li>-->
          <!--<li class="J_tabCloseAll" ><a>关闭全部选项卡</a>-->
          <!--</li>-->
          <!--<li class="J_tabCloseOther" ><a>关闭其他选项卡</a>-->
          <!--</li>-->
        <!--</ul>-->
      </div>
      <span @click="accountOut"><a href="#/login" class="roll-nav roll-right J_tabExit" ><i class="fa fa fa-sign-out"></i> 退出</a></span>
    </div>
    <div class="row J_mainContent" id="content-main">

      <iframe v-for="item in navs"  class="J_iframe" :name="item.frameName" width="100%" height="100%" :src="item.path" frameborder="0" :id="item.frameName" :data-id="item.path" seamless></iframe>
    </div>
    <homefooter></homefooter>

    <!--右侧部分结束-->
  </div>

</template>
<script>

  import homefooter from  './home_footer'
  export default {

    components: {
      homefooter,
    },
    created: function () {

    },

    computed : {
      navs(){
        return this.$store.getters.getTabs;
      },
    },
    mounted: function () {
      var vue = this;
      $('.navbar-minimalize').click(function () {
        $("body").toggleClass("mini-navbar");
        vue.SmoothlyMenu();
      });
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        $('#content-main').css('overflow-y', 'auto');
      }
      $('.J_tabCloseOther').on('click', this.closeOtherTabs);
      $('.J_tabShowActive').on('click', this.showActiveTab);
      //激活
//      $('.J_menuTabs').on('click', '.J_menuTab', this.activeTab());

      $('.J_menuTabs').on('dblclick', '.J_menuTab', this.refreshTab);

      // 左移按扭
      $('.J_tabLeft').on('click',  this.scrollTabLeft);

      // 右移按扭
      $('.J_tabRight').on('click',  this.scrollTabRight);
      $('.J_tabCloseAll').on('click',this.closeAll);
      // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
//      let reload= localStorage.getItem(this.$names.reload);
//      if (reload==1){
//        console.error("reload   this.closeAll();--------" );
//
//        this.$store.dispatch('reset_tab', []);
////        this.$nextTick(() => {
////          //vuex改变状态后的dom还没有更新就执行到这里了
////          this.closeAll();
////        });
//
//        localStorage.setItem("reload",-1);
//      }
    },
    methods:{
      refreshInterface:function () {
     let dataId=$('.active').attr('data-id');
        $('iframe').each(function () {
        if (dataId==$(this).attr('data-id')){
          let name=$(this).attr('name');
          let nameID=$(this).attr('id');
          console.log(document)
//          document.frames(name).location.reload()
          document.getElementById(nameID).contentWindow.location.reload(true);

        }
        })
      },
      openMessage:function () {
        parent.document.getElementById("10000").click();
      },
      accountOut:function () {
        this.$enumeration.accountOut(this);
      },
      SmoothlyMenu:function(){
        console.log('SmoothlyMenu');
        if (!$('body').hasClass('mini-navbar')) {
          $('#side-menu').hide();
          setTimeout(
            function () {
              $('#side-menu').fadeIn(500);
            }, 100);
        } else if ($('body').hasClass('fixed-sidebar')) {
          $('#side-menu').hide();
          setTimeout(
            function () {
              $('#side-menu').fadeIn(500);
            }, 300);
        } else {
          $('#side-menu').removeAttr('style');
        }
      },
      //查看左侧隐藏的选项卡
      scrollTabLeft: function () {
        var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
        // 可视区域非tab宽度
        var tabOuterWidth = this.$parent.calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content").width() < visibleWidth) {
          return false;
        } else {
          var tabElement = $(".J_menuTab:first");
          var offsetVal = 0;
          while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {//找到离当前tab最近的元素
            offsetVal += $(tabElement).outerWidth(true);
            tabElement = $(tabElement).next();
          }
          offsetVal = 0;
          if (this.$parent.calSumWidth($(tabElement).prevAll()) > visibleWidth) {
            while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
              offsetVal += $(tabElement).outerWidth(true);
              tabElement = $(tabElement).prev();
            }
            scrollVal = this.$parent.calSumWidth($(tabElement).prevAll());
          }
        }
        $('.page-tabs-content').animate({
          marginLeft: 0 - scrollVal + 'px'
        }, "fast");
      },
      //查看右侧隐藏的选项卡
      scrollTabRight:function () {
        var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
        // 可视区域非tab宽度
        var tabOuterWidth = this.$parent.calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
        //可视区域tab宽度
        var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
        //实际滚动宽度
        var scrollVal = 0;
        if ($(".page-tabs-content").width() < visibleWidth) {
          return false;
        } else {
          var tabElement = $(".J_menuTab:first");
          var offsetVal = 0;
          while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {//找到离当前tab最近的元素
            offsetVal += $(tabElement).outerWidth(true);
            tabElement = $(tabElement).next();
          }
          offsetVal = 0;
          while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
            offsetVal += $(tabElement).outerWidth(true);
            tabElement = $(tabElement).next();
          }
          scrollVal = this.$parent.calSumWidth($(tabElement).prevAll());
          if (scrollVal > 0) {
            $('.page-tabs-content').animate({
              marginLeft: 0 - scrollVal + 'px'
            }, "fast");
          }
        }
      },
      //关闭其他选项卡
      closeOtherTabs:function(){
        $('.page-tabs-content').children("[data-id]").not(":first").not(".active").each(function () {
          $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
          $(this).remove();
        });
        $('.page-tabs-content').css("margin-left", "0");
      },
      //滚动到已激活的选项卡
      showActiveTab:function(){
        this.$parent.scrollToTab($('.active.J_menuTab'));
      },
      // 点击选项卡菜单
      activeTab:function(e) {
        var tab = $(e.currentTarget);
        if (!tab.hasClass('active')) {
          var currentId = tab.data('id');
          // 显示tab对应的内容区
          $('.J_mainContent .J_iframe').each(function () {
            if ($(this).data('id') == currentId) {
              $(this).show().siblings('.J_iframe').hide();
              return false;
            }
          });
          tab.addClass('active').siblings('.J_menuTab').removeClass('active');
          this.$parent.scrollToTab(this);
        }
      },
      //刷新iframe
      refreshTab:function() {
        var target = $('.J_iframe[data-id="' + $(this).data('id') + '"]');
        var url = target.attr('src');
//        //显示loading提示
//        var loading = layer.load();
//        target.attr('src', url).load(function () {
//            //关闭loading提示
//            layer.close(loading);
//        });
      },
      // 关闭全部
      closeAll:function() {
        $('.page-tabs-content').children("[data-id]").not(":first").each(function () {
          $('.J_iframe[data-id="' + $(this).data('id') + '"]').remove();
          $(this).remove();
        });
        $('.page-tabs-content').children("[data-id]:first").each(function () {
          $('.J_iframe[data-id="' + $(this).data('id') + '"]').show();
          $(this).addClass("active");
        });
        $('.page-tabs-content').css("margin-left", "0");
      },
      // 关闭选项卡菜单
      closeTab:function(e) {
        var tab = $(e.currentTarget);
        var closeTabId = tab.parents('.J_menuTab').data('id');
        console.log(closeTabId);
        var currentWidth = tab.parents('.J_menuTab').width();

        // 当前元素处于活动状态
        if (tab.parents('.J_menuTab').hasClass('active')) {

          // 当前元素后面有同辈元素，使后面的一个元素处于活动状态
          if (tab.parents('.J_menuTab').next('.J_menuTab').size()) {

            var activeId = tab.parents('.J_menuTab').next('.J_menuTab:eq(0)').data('id');
            tab.parents('.J_menuTab').next('.J_menuTab:eq(0)').addClass('active');

            $('.J_mainContent .J_iframe').each(function () {
              if ($(this).data('id') == activeId) {
                $(this).show().siblings('.J_iframe').hide();
                return false;
              }
            });

            var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
            if (marginLeftVal < 0) {
              $('.page-tabs-content').animate({
                marginLeft: (marginLeftVal + currentWidth) + 'px'
              }, "fast");
            }

            //  移除当前选项卡
            tab.parents('.J_menuTab').remove();

            // 移除tab对应的内容区
            $('.J_mainContent .J_iframe').each(function () {
              if ($(this).data('id') == closeTabId) {
                $(this).remove();
                return false;
              }
            });
          }

          // 当前元素后面没有同辈元素，使当前元素的上一个元素处于活动状态
          if (tab.parents('.J_menuTab').prev('.J_menuTab').size()) {
            var activeId = tab.parents('.J_menuTab').prev('.J_menuTab:last').data('id');
            tab.parents('.J_menuTab').prev('.J_menuTab:last').addClass('active');
            $('.J_mainContent .J_iframe').each(function () {
              if ($(this).data('id') == activeId) {
                $(this).show().siblings('.J_iframe').hide();
                return false;
              }
            });

            //  移除当前选项卡
            tab.parents('.J_menuTab').remove();

            // 移除tab对应的内容区
            $('.J_mainContent .J_iframe').each(function () {
              if ($(this).data('id') == closeTabId) {
                $(this).remove();
                return false;
              }
            });
          }
        }
        // 当前元素不处于活动状态
        else {
          //  移除当前选项卡
          tab.parents('.J_menuTab').remove();

          // 移除相应tab对应的内容区
          $('.J_mainContent .J_iframe').each(function () {
            if ($(this).data('id') == closeTabId) {
              $(this).remove();
              return false;
            }
          });
          this.$parent.scrollToTab($('.J_menuTab.active'));
        }

        return false;

      }
    }
  }


</script>
<style>


</style>
