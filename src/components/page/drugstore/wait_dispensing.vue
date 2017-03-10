<template>
    <div>
      <!--中间列表-->
      <div class="wrapper wrapper-content animated fadeInRight no_top_padding">
        <screen_title></screen_title>

        <div class="col-sm-12 no-padding" id="userList">
          <ul>
            <li v-for="(data_item,index) in data_items" class="col-sm-4 item_list">
              <div class="ibox patient_item">
                <div class="ibox-title patient_list_item_title">
                  <h5>{{data_item.userName}}</h5>
                  <small class="m-l-sm">{{getAge(data_item.birthdayDate)}}岁 / {{data_item.userSex == 1 ? '男' : '女'}} / {{data_item.billId}}</small>
                </div>
                <div class="ibox-content patient_ibox-content">

                  <div class="patient_msg_list">
                    <div>
                      <p class="patient_msg_title">挂号医生:</p>
                      <p class="patient_msg_content">{{data_item.doctorName}} ({{data_item.departName}})</p>
                    </div>

                    <div>
                      <p class="patient_msg_title">门诊号:</p>
                      <p class="patient_msg_content">{{data_item.sortNo}}</p>
                    </div>

                    <div style="margin: 3px 0;">
                      <p class="patient_msg_title">接诊类型:</p>
                      <p class="patient_msg_content">{{data_item.registeredType == 0 ? '初诊' : '次诊'}}</p>
                    </div>

                  </div>

                  <div class="m-t-sm">
                    <a @click="clickWaitDispensing(data_item,index)" class="waiting_treatment_btn" href="#/drugstore/wait_dispensing_details">待发药 ( {{data_item.waitMedicine}} )</a>
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
<style>

  .search_patient_input{
    width: 180px;
    height: 30px;
    padding-left: 20px !important;
    font-size: 12px;
  }

</style>
<script>
  import screen_title from '../doctor_clinic/screen_content_title.vue'
  import pagination from '../doctor_clinic/bottom_pagination.vue'


  export default{
    data(){
      return {

        data_items:[],
        age:'',

      }
    },

    created(){
      this.$store.dispatch('showListCount', true);
      this.$store.dispatch('showSearchView', true);
      this.request_list();
    },


    methods:{
      request_list:function () {
        var that=this;
        this.$api.get(this,this.$requestApi.waitMediList,{"pageIndex":"1","pageSize":"9"},function  (data) {
          if(data.status=='200'){
            that.data_items = data.body.data;
            var totalRecord = that.data_items.length;
            var totalPageNum = parseInt((totalRecord  +  9  - 1) / 9);
            console.log("总页数--->" + totalPageNum);
            that.$store.dispatch('setPageCount', totalPageNum);
//            var counts = [(Number(data.body.receivedCount) + Number(data.body.waitReceiveCount)), data.body.receivedCount, data.body.waitReceiveCount];
//            that.$store.dispatch('changeTitleCount', counts);
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
      },
//      将时间戳转换为标准时间格式
      timeFormat:function(nS) {
        return new Date(parseInt(("/Date("+nS+")/").substr(6, 13))).toLocaleDateString();
      },
//      计算年龄
      getAge:function (timestamp) {
        var birthDay = new Date(this.timeFormat(timestamp)).getTime();
        var now = new Date().getTime();
        var hours = (now - birthDay)/1000/60/60;
        var years =  Math.floor(hours / (24 * 30 * 12));
        console.log("years-------->" + years);
        return years;
      },
      clickWaitDispensing: function (data_item,index) {
        this.$store.dispatch('show_registeredOrdId', data_item.registeredOrdId);
      },

    },

    components: {screen_title, pagination},
  }
</script>
