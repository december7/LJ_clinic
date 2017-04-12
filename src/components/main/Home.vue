<template>
  <div  id="wrapper"  >
    <homeleft></homeleft>
    <homecontent></homecontent>
</div>
</template>
<script>
  // 全局js
//  import 'jquery-slimscroll/jquery.slimscroll.min.js';
  //  import 'staticjs/plugins/layer/layer.min.js';

  // 自定义js
//  import 'staticjs/hplus.js?v=4.1.0';
//  import 'staticjs/contabs.js';
  // 第三方插件
//  import 'staticjs/plugins/pace/pace.min.js';
  //引用组件
import homecontent from  './home_content'
import homeleft from  './home_left'

export default {
  components: {
    homecontent,
    homeleft,
  },
  created() {


  },
  beforeMount:function () {

  },
  mounted: function () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子

    this.fix_height;
    $(window).bind("load resize click scroll", function () {
      if (!$("body").hasClass('body-small')) {
        this.fix_height;
      }
    });
    $(window).bind("load resize", function () {
      if ($(this).width() < 769) {
        $('body').addClass('mini-navbar');
        $('.navbar-static-side').fadeIn();
      }
    });
  },
  methods:{
    // 侧边栏高度
    fix_height:function(){
      var heightWithoutNavbar = $("body > #wrapper").height() - 61;
      $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
    },
//计算元素集合的总宽度
    calSumWidth:function(elements) {
      var width = 0;
      $(elements).each(function () {
        width += $(this).outerWidth(true);
      });
      return width;
    },
    //滚动到指定选项卡
    scrollToTab:function(element) {
      var marginLeftVal = this.calSumWidth($(element).prevAll()), marginRightVal = this.calSumWidth($(element).nextAll());
      // 可视区域非tab宽度
      var tabOuterWidth = this.calSumWidth($(".content-tabs").children().not(".J_menuTabs"));
      //可视区域tab宽度
      var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
      //实际滚动宽度
      var scrollVal = 0;
      if ($(".page-tabs-content").outerWidth() < visibleWidth) {
        scrollVal = 0;
      } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
        if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
          scrollVal = marginLeftVal;
          var tabElement = element;
          while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
            scrollVal -= $(tabElement).prev().outerWidth();
            tabElement = $(tabElement).prev();
          }
        }
      } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
        scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
      }
      $('.page-tabs-content').animate({
        marginLeft: 0 - scrollVal + 'px'
      }, "fast");
    },
  }
}

</script>
<style >
</style>
