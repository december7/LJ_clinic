<template>
  <div class="row screen_container">
    <div class="col-sm-12">
      <div class="screen_left_container">
        <p>筛选: </p>
        <div class="white-bg select_items_btn">
          <div class="btn-group roll-nav roll-right" style="right: 0px">
            <div class="input-group-btn">
              <button data-toggle="dropdown" style="width: 130px !important;" class="btn btn-white dropdown-toggle no-padding no-borders no-margins search_text" type="button">{{titleItems[selectedIndex].titleName}}<span class="drop_tips caret"></span>
              </button>
              <ul class="dropdown-menu" style="min-width: 130px;" >
                <li @click="selectItem(index)" v-for="(titleItem, index) in titleItems">
                  <a :class="{selected_item : selectedIndex == index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
                </li>

              </ul>
            </div>
          </div>

        </div>
      </div>

      <div v-show="selectedIndex == 3">
        <div class="form-group white-bg screen_right_container"  >
          <div class="pull-left ">
            <div class="pull-left"><input readonly type="text" placeholder="起始日期" id="startDate" style="background: white" class="form-control layer-date  " @click="$stringUtils.layDateUi()" ></div>
            <span class="input-group-addon no-borders pull-left m-t-xxs"  ><i class="fa fa-calendar"></i></span>
          </div>
          <small class="pull-left m-r-sm">~</small>
          <div class="pull-left ">
            <div class="pull-left"><input id="endDate" readonly type="text" placeholder='截止日期'  style="background: white"  class="form-control layer-date  " @click="$stringUtils.layDateUi()"   ></div>
            <span  class="pull-left input-group-addon no-borders m-t-xxs"><i class="fa fa-calendar"></i></span>
          </div>
        </div>

        <div class="pull-left white-bg">
          <a class="no-margins wrapper" style="line-height: 30px; border-left: 1px solid deepskyblue" @click="searchDate">确定</a>
        </div>
      </div>

      <div v-show="showSearchView" class="pull-right search_input">
        <input placeholder="请输入需要搜索的姓名" type="text" style="outline: none;width:200px;border: none;">
        <!--<span style="padding: 0 15px; border-left: 1px solid #F4F4F4">&times;</span>-->
        <img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png">
      </div>
    </div>

  </div>
</template>
<style>
  .screen_container {
    padding: 15px 0;
  }

  .screen_left_container {
    line-height: 30px;
    float: left
  }

  .screen_left_container p {
    display: inline;
    float: left;
    margin-right: 10px
  }

  .screen_right_container {
    line-height: 30px;
    float: left;
    margin-left: 10px;
    margin-bottom: 0px;
    border: none;
    outline: none;
    padding: 0 20px;
  }

  .screen_right_container input {
    border: none;
    outline: none;
    width: 100px;
    height: 20px;
    text-align: center;
    border-bottom: 1px solid #333333
  }

  .select_items_btn {
    float: left;
    width: 130px;
  }

  .drop_tips {
    position: absolute;
    right: 10px;
    top: 8px;
  }

  .search_text {
    width: 100px !important;
    text-align: left;
    padding-left: 10px !important;
  }

  .selected_item {
    background-color: #00a2d4;
    color: white !important;
  }

  .search_input{
    margin-right: 15px;
    line-height: 30px;
    background-color: white;
    border-radius: 5px;
    padding-left: 10px
  }

</style>
<script>
  import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'
  import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
  import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min'
  import 'staticjs/plugins/layer/laydate/skins/default/laydate.css'
  import 'staticjs/plugins/layer/laydate/laydate.js'

  export default{
    props: {
      titleItems:{
        default: []
      },
    },
    data(){
      return {
        selectedIndex: 0
      };
    },
    mounted:function(){
    },

    methods:{
      selectItem:function (selectedIndex) {
        this.selectedIndex = selectedIndex;
        if (selectedIndex!=3){
          this.$parent.screenList(selectedIndex);
        }
      },
      searchDate:function () {
        this.$parent.screenDateList($("#startDate").val(),$("#endDate").val());
      },
    },

    computed:{
      showSearchView: function () {
        return this.$store.getters.weatherShowSearchView;
      }

    },
  }
</script>
