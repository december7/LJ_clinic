<template>
  <div>
    <!--中间列表-->
    <div class="wrapper wrapper-content animated fadeInRight no_top_padding">
      <screen_title></screen_title>

      <div class="col-sm-12 no-padding" id="userList">
        <ul>
          <li v-for="data_item in data_items" class="col-sm-4 item_list">
            <div class="ibox patient_item">
              <div class="ibox-title patient_list_item_title">
                <h5>{{data_item.name}}</h5>
                <small class="m-l-sm">{{data_item.age}}岁 / {{data_item.sex == 0 ? '男' : '女'}} / {{data_item.tele}}</small>
              </div>
              <div class="ibox-content patient_ibox-content">

                <div class="patient_msg_list">

                  <div style="margin: 5px 0;">
                    <p class="patient_msg_title">挂号医生:</p>
                    <p class="patient_msg_content">{{data_item.doctorName}} ({{data_item.doctorName}})</p>
                  </div>

                  <div>
                    <p class="patient_msg_title">门诊号:</p>
                    <p class="patient_msg_content">{{data_item.outpatientNum}}</p>
                  </div>

                  <div>
                    <p class="patient_msg_title">接诊类型:</p>
                    <p class="patient_msg_content">{{data_item.receptionType == 0 ? '初诊' : '次诊'}}</p>
                  </div>

                </div>

                <div class="m-t-sm">
                  <a class="waiting_treatment_btn" href="#/treatment_room/treatment_details" role="button">待治疗 ( {{data_item.treatmentCount}} )</a>
                </div>

                <div v-show="data_item.state == 0" class="patient_state_img"><img src="../../../../static/img/emergency.png" alt=""></div>

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

<script>

  import screen_title from '../doctor_clinic/screen_content_title.vue'
  import pagination from '../doctor_clinic/bottom_pagination.vue'


  export default{
    data(){
      return {

        data_items:[]

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
        this.$api.get(this,this.$requestApi.todayPatient,"",function  (data) {
          if(data.status=='200'){
            that.data_items = data.body.data;
            that.$store.dispatch('setPageCount', Number(data.body.pageCount));
            var counts = [(Number(data.body.receivedCount) + Number(data.body.waitReceiveCount)), data.body.receivedCount, data.body.waitReceiveCount];
            that.$store.dispatch('changeTitleCount', counts);
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
      },

    },

    components: {screen_title, pagination},
  }
</script>
