<template>
  <div>
    <!--中间列表-->
    <div class="wrapper wrapper-content animated fadeInRight no_top_padding">
      <screen_title :titleItems="titleItems"></screen_title>

      <div class="col-sm-12 no-padding" id="userList">
        <ul>
          <li v-for="data_item in data_items" class="col-sm-4 item_list">
            <div class="ibox patient_item">
              <div class="ibox-title patient_list_item_title">
                <h5>{{data_item.userName}}</h5>
                <small class="m-l-sm">{{getAge(data_item.birthdayDate)}}岁 / {{data_item.userSex == 1 ? '男' : '女'}} / {{data_item.billId}}</small>
              </div>
              <div class="ibox-content patient_ibox-content">

                <div class="patient_msg_list">

                  <div style="margin: 5px 0;">
                    <p class="patient_msg_title">挂号医生:</p>
                    <p class="patient_msg_content">{{data_item.doctorName}} ({{data_item.departName}})</p>
                  </div>

                  <div>
                    <p class="patient_msg_title">门诊号:</p>
                    <p class="patient_msg_content">{{data_item.sortNo}}</p>
                  </div>

                  <div>
                    <p class="patient_msg_title">接诊类型:</p>
                    <p class="patient_msg_content">{{data_item.registeredType == 0 ? '初诊' : '复诊'}}</p>
                  </div>

                </div>

                <div class="m-t-sm">
                  <a @click="clickWaitTreatDetail(data_item,index)" class="waiting_treatment_btn" href="#/treatment_room/wait_treat_detail" role="button">待治疗 ( {{data_item.waitTreat}} )</a>
                </div>

                <div v-show="data_item.isEmergency == 1" class="patient_state_img"><img src="../../../../static/img/emergency.png" alt=""></div>

              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--底部分页-->
    <pagination v-show="data_items.length > 0"></pagination>

  </div>
</template>

<script>

  import screen_title from '../doctor_clinic/screen_content_title.vue'
  import pagination from '../doctor_clinic/bottom_pagination.vue'


  export default{
    data(){
      return {
        titleItems: [
          {titleName: '今天'},
          {titleName: '过去七天'},
          {titleName: '过去三十天'},
          {titleName: '自定义'}
        ],

        data_items:[],
        waitParams: {
          pageIndex: '',
          pageSize: this.$enumerationType.pageSize,
          startDate: this.$stringUtils.nowFormat,
          endDate: this.$stringUtils.dayFormat(1),
          userName: '',
        },

      }
    },

    created(){
      this.$store.dispatch('showListCount', true);
      this.$store.dispatch('showSearchView', true);
      this.waiting_list();
    },


    methods:{
      pageIndexNo:function(){
        		return (this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.$enumerationType.pageSize+1;
      		},
      waiting_list:function () {
        var that=this;
        this.waitParams.pageIndex = this.pageIndexNo();
        this.$api.get(this,this.$requestApi.waitTreatList,this.waitParams,function  (data) {
          if(data.status=='200'){
            that.data_items = data.body.data;
            that.$store.dispatch('setPageCount',Math.ceil(Number(data.body.iTotalRecords)/that.$enumerationType.iDisplayLength));
          }else{
            console.log(data.body.msg);
          }
        },function (err) {
          console.log(err);
        });
      },
      screenList:function (index) {
        let that=this;
        if (index==0){
          that.waitParams.startDate=that.$stringUtils.nowFormat;
        }else if (index==1){
          that.waitParams.startDate=that.$stringUtils.dayFormat(-7);
        }else if (index==2){
          that.waitParams.startDate=that.$stringUtils.dayFormat(-30);
        }
        this.waiting_list();
      },

      screenDateList:function (startDate,endDate) {
        let that=this;
        that.waitParams.startDate=startDate;
        that.waitParams.endDate=endDate;
        this.waiting_list();
      },
      request_list:function (index) {

				let that=this;
				if (index==1||index==2){
					that.waitParams.state=index==1?2:1;
				}else {
					delete  that.waitParams['state'];
				}
				this.waiting_list();
			},
//      计算年龄
      getAge:function (timestamp) {
        var now = new Date().getTime();
        var hours = Math.abs(now - timestamp)/1000/60/60;
        var years =  parseInt(hours / (24 * 30 * 12));
        console.log("years-------->" + years);
        return years;
      },
      clickWaitTreatDetail: function (data_item,index) {
        this.$store.dispatch('show_registeredOrdId', data_item.registeredOrdId);
      },

    },

    components: {screen_title, pagination},
  }
</script>

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

  .waiting_treatment_btn {
    display: inline-block;
    width: 100%;
    height: 30px;
    border-radius: 2px;
    line-height: 30px;
    outline: none;
    border: 1px solid #314268;
    color: white;
    background-color: #314268;
  }

  .waiting_treatment_btn:hover{
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
