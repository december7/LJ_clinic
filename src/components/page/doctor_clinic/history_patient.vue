<template>
  <div>
    <switch_tab></switch_tab>

    <!--中间列表-->
    <div class="wrapper wrapper-content animated fadeInRight no_top_padding">
      <screen_title :titleItems="titleItems"></screen_title>

      <div class="col-sm-12 no-padding" id="userList">
        <ul>
          <li v-for="data_item in data_items" class="col-sm-4 item_list">
            <div class="ibox patient_item">
              <div class="ibox-title patient_list_item_title">
                <h5>{{data_item.userName}}</h5>
                <small class="m-l-sm">{{$stringUtils.dateAge(data_item.birthdayDate)}}岁 / {{ $stringUtils.dateSex(data_item.userSex )}} / {{data_item.billId}}</small>
              </div>
              <div class="ibox-content patient_ibox-content">

                <div class="patient_msg_list">
                  <div>
                    <p class="patient_msg_title">门诊号:</p>
                    <p class="patient_msg_content">{{data_item.registeredOrdId}}</p>
                  </div>

                  <div style="margin: 3px 0;">
                    <p class="patient_msg_title">接诊类型:</p>
                    <p class="patient_msg_content">{{ $stringUtils.registeredType(data_item.registeredType) }}</p>

                  </div>

                  <div>
                    <p class="patient_msg_title">挂号医生:</p>
                    <p class="patient_msg_content">{{data_item.doctorName}}</p>
                    <p class="pull-right" :class=" {'text-danger' : data_item.illnessState == 0} ">{{$stringUtils.registeredState(data_item.state)}}</p>
                  </div>

                  <div class="m-t-sm">
                    <button @click="prefectUser(data_item.userId)" data-toggle="modal" data-target="#perfect_information_modal" class="list_reception wait_reception_left" type="button">完善信息</button>
                    <button @click="reception(data_item.userId)" class="list_reception wait_reception_right pull-right" type="button">就诊详情</button>
                  </div>
                </div>

                <div v-if="data_item.isEmergency == 1" class="patient_state_img"><img src="../../../../static/img/emergency.png" alt=""></div>

              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--底部分页-->
    <pagination v-show="data_items.length > 0"> </pagination>

    <!--完善信息模态框-->
    <prefect :userId="userId"></prefect>

  </div>
</template>

<style>

  .item_list{
    list-style: none;
    padding-left: 0 !important;
  }

  button {
    outline: none !important;
  }

  .patient_list_item_title {
    padding: 12px 10px;
  }

  .patient_ibox-content {
    padding: 10px !important;
    text-align: center;
  }

  .patient_msg_list {
    text-align: left;
  }

  .patient_msg_title {
    display: inline;
    margin-right: 10px;
  }

  .patient_msg_content {
    display: inline;
  }

  .list_reception {
    width: 49.5%;
    height: 30px;
    outline: none;
    border-radius: 3px;
    border: 1px solid #314268;
  }

  .wait_reception_right {
    background-color: white;
    color: #314268;
  }

  .wait_reception_left {
    background-color: #314268;
    color: white;
  }

  .patient_item {
    position: inherit !important;
    margin-bottom: 20px;
  }

  .patient_state_img {
    position: absolute;
    right: 10px;
    top: 47px;
  }

  .patient_state_img img {
    width: 35px;
    height: 35px;
  }

  .doctor_workbench_top_right p {
    line-height: 30px;
    font-size: 16px;
    color: deepskyblue;
  }

  .content_top_right_container p {
    line-height: 30px;
  }

  .msg_item_title h5 {
    padding-left: 20px;
    border-left: 4px solid #314268;
  }


</style>

<script>

  import switch_tab from './switch_tab_template.vue'
  import screen_title from './screen_content_title.vue'
  import pagination from './bottom_pagination.vue'
  import prefect from '../doctor_registered/registered_modal_perfect.vue'

  export default{
    computed : {


  },

    data(){
      return {
        titleItems: [
          {titleName: '昨天'},
          {titleName: '过去七天'},
          {titleName: '过去三十天'},
          {titleName: '自定义'}
        ],
        titles: [
          {titleName: '全部', selected: true, listCount: 0},
          {titleName: '已接诊', selected: false, listCount: 0},
          {titleName: '已过期', selected: false, listCount: 0},
        ],

        selects:[
          {selectName: '全部'},
          {selectName: '患者'},
          {selectName: '医生'},
        ],

        data_items:[],
        userId:"",
        historyData:{
          startDate:"",
          pageIndex:"",
          pageSize:this.$enumerationType.pageSize,
          endDate:"",
          userName:"",
        }

      }
    },

    created(){
      this.$store.dispatch('addSwitchTabs', this.titles);
      this.$store.dispatch('addSelectStates', this.selects);
      this.$store.dispatch('showRightSearch', true);
      this.$store.dispatch('showListCount', true);
      this.request();
    },


    methods:{
      pageIndexNo:function(){
        return (this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.$enumerationType.pageSize+1;
      },
      request:function () {
        let that=this;
        that.historyData.startDate=that.$stringUtils.dayFormat(-1);
        that.historyData.endDate=that.$stringUtils.nowFormat();

        this.requestGet(that.historyData);
      },
      screenSearchResult:function (resultName) {
        let that=this;
        that.historyData.userName=resultName;
        this.requestGet(that.historyData);
      },
      screenDateList:function (startDate,endDate) {
        let that=this;
        that.historyData.startDate=startDate;
        that.historyData.endDate=endDate;
        this.requestGet(that.historyData);
      },
      requestGet:function (data) {
        let that=this;
        that.historyData.pageIndex= that.pageIndexNo();
        that.$api.get(that,that.$requestApi.historyPatients,data,
          function  (data) {
            if(data.status=='200'){
              that.data_items = data.body.data;
              that.$store.dispatch('setPageCount',that.$enumerationType.getPageNumber(data.body.iTotalRecords));
            }else{
              console.log(data.body.msg);
            }

          },function (err) {
            console.log(err);
          });
      },
      screenList:function (index ) {
        let that=this;
        if (index==0){
          that.historyData.startDate=that.$stringUtils.dayFormat(-1);
        }else if (index==1){
          that.historyData.startDate=that.$stringUtils.dayFormat(-7);
        }else if (index==2){
          that.historyData.startDate=that.$stringUtils.dayFormat(-30);
        }
        this.requestGet( that.historyData);
      },
      request_list:function (index) {
        let that=this;
        if (index==1||index==2){
          that.historyData.state=index==1?2:1;
        }else if (index==0){
//          delete  that.historyData ['state'];
          that.historyData.state=-1;
        }
        this.requestGet( that.historyData);
      },
      reception:function (userId) {
        this.$store.dispatch('medicine_compile_user_id',  userId);
        this.$router.push('/doctor_clinic/history_case');
      },
      prefectUser:function (userId) {
        this.userId=userId;
      }
    },

    components: {switch_tab, screen_title, pagination, prefect},
  }
</script>
