<template>
  <div>
    <!--中间列表-->
    <div class="wrapper wrapper-content animated fadeInRight no_top_padding">

      <div class="col-sm-12">
        <div class="col-sm-8" style="margin-left: -30px">
          <screen_title></screen_title>
        </div>
        <div class="col-sm-4" style="margin-left: 20px">
          <div class="search_background">
            <input v-model="waitParams.userName" @keyup.enter="chargeOrderList" type="text" placeholder="请输入需要搜索的姓名" class="serach_box">
            <span style="color: lightgray; margin-left: 25px">|</span>
            <button style="border: none; background-color: white"><img src="../../../../static/img/set_manage_img/search.png"></button>
          </div>
        </div>
      </div>

      <div class="col-sm-12 no-padding" id="userList">
        <ul>
          <li v-for="data_item in data_items" class="col-sm-4 item_list">
            <div class="ibox patient_item">
              <div class="ibox-title patient_list_item_title">
                <h5>{{data_item.userName}}</h5>
                <small class="m-l-sm">26岁 / {{data_item.userSex == 1 ? '男' : '女'}} / {{data_item.billId}}</small>
              </div>
              <div class="ibox-content patient_ibox-content">

                <div class="patient_msg_list">
                  <div>
                    <p class="patient_msg_title">门 诊 号:</p>
                    <p class="patient_msg_content">{{data_item.registeredOrdId}}</p>
                  </div>

                  <div style="margin: 3px 0;">
                    <p class="patient_msg_title">挂号医生:</p>
                    <p class="patient_msg_content">{{data_item.doctorName}} ({{data_item.departName}})</p>
                  </div>

                  <div style="margin: 3px 0;">
                    <p class="patient_msg_title">接诊类型:</p>
                    <p class="patient_msg_content">{{data_item.registeredType == 1 ? '初诊' : '复诊'}}</p>
                  </div>

                  <div class="m-t-sm">
                    <a href="#/doctor_charge/doctor_charge_confirm" @click="chargeConfirmClick(data_item)"><button class="charge_btn">收费详情</button></a>
                  </div>
                </div>

                <div v-show="data_item.isEmergency == 1" class="patient_state_img"><img src="../../../../static/img/emergency.png" alt=""></div>

              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--底部分页-->
    <pagination v-show="data_items.length >= 9"></pagination>

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

  .charge_btn {
    width: 100%;
    height: 28px;
    background-color: #314268;
    color: white;
    border: 1px solid #314268;
    border-radius: 2px;
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
  .search_background{
    width: 230px;
    height: 32px;
    background-color: white;
    margin-top: 15px;
    margin-left: 95px;
    border-radius: 3px;
  }

  .serach_box{
    margin-top: 7px;
    margin-left: 15px;
    outline: none;
    background-color: inherit;
    border: none;
  }

</style>

<script>

  import screen_title from '../doctor_clinic/screen_content_title.vue'
  import pagination from '../doctor_clinic/bottom_pagination.vue'

  export default{
    data(){
      return {
        data_items:[],
        waitParams:{
          doctorName: '',
          userName: '',
          pageIndex: '',
          pageSize: 9,
        },
      }
    },

    created(){
      this.chargeOrderList();
    },

    methods:{
      chargeOrderList:function () {
        var that=this;
        this.$api.get(this,this.$requestApi.chargeOrderList,this.waitParams,function  (data) {
          if(data.status=='200'){
            that.data_items = data.body.data;
          }else{
            console.log(data.body.msg);
          }
        },function (err) {
          console.log(err);
        });
      },
      chargeConfirmClick: function (data_item) {
        this.$store.dispatch('is_charge_data',  2);
        this.$store.dispatch('show_charge_data',  data_item.registeredOrdId);
      },
    },

    //组件注册
    components: {
      screen_title, 
      pagination
    },
  }

</script>
