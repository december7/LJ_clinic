<!--今日患者-->
<template>
  <div>
    <!--顶部操作栏-->
    <switch_tab></switch_tab>
    <!--中间列表-->
    <div class="wrapper wrapper-content animated fadeInRight" style="padding-top: 0">
      <div class="col-sm-12 no-padding" style="line-height: 40px">
        <a data-toggle="modal" data-target="#add_patient"><i class="glyphicon glyphicon-plus"></i><span style="display: inline-block;margin-left: 10px" class="patient_add_btn">添加患者</span></a>
      </div>
      <!--<patient_msg_list></patient_msg_list>-->
      <div class="col-sm-12 no-padding">
        <ul>
          <li v-for="(data_item,index) in data_items" class="col-sm-4 item_list">
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
                    <p class="patient_msg_title">挂号时间:</p>
                    <p class="patient_msg_content">{{$stringUtils.dateFormat(data_item.createDate)}}</p>
                    <p class="pull-right" :class=" {'text-danger' : data_item.state == 1} ">{{$stringUtils.registeredState(data_item.state)}}</p>
                  </div>
                </div>

                <div class="m-t-sm">
                  <button @click="reception(data_item.state == 1,data_item.registeredOrdId,index)" :class="data_item.state == 1 ? 'receptioned' : 'wait_reception' " class="list_reception_btn" type="button">{{$stringUtils.buttonState(data_item.state)}}</button>
                </div>

                <div v-if="data_item.isEmergency == 2" class="patient_state_img"><img src="../../../../static/img/emergency.png" alt=""></div>

              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <default-interface v-show="data_items.length === 0"   ></default-interface>

    <!--底部分页-->
    <pagination v-show="data_items.length > 0" :iDisplayLength=" data_items.length "></pagination>

    <!--添加患者模态框 开始-->
    <add_patient_modal></add_patient_modal>
    <!--模态框 结束-->

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

  .list_reception_btn {
    width: 100% !important;
    height: 30px;
    outline: none;
    border-radius: 2px;
    border: 1px solid #314268;
  }

  .receptioned {
    background-color: #314268;
    color: white;
  }

  .receptioned:hover {
    background-color: white;
    color: #314268;
  }

  .wait_reception {
    background-color: white;
    color: #314268;
  }

  .wait_reception:hover {
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
  import pagination from './bottom_pagination.vue'
  import switch_tab from './switch_tab_template.vue'
  import add_patient_modal from './add_patient_modal'
  import defaultInterface from 'components/commonView/defaultInterface.vue'

  export default{
    data() {
      return{
        titles:[
          {titleName: '全部', selected: true, listCount: 0},
          {titleName: '待接诊', selected: false, listCount: 0},
          {titleName: '已接诊', selected: false, listCount: 0},
        ],
        selects:[
          {selectName: '全部'},
          {selectName: '患者'},
          {selectName: '医生'},
        ],

        data_items:[],
        count:0
      }
    },

    computed: {
    },

    methods: {

      request:function () {
        let that=this;
        that.$api.get(that,that.$requestApi.todayPatient,
          { pageIndex:(that.$store.getters.getCurrentPageNo==0?0:that.$store.getters.getCurrentPageNo-1)*that.$enumerationType.pageSize+1,pageSize:that.$enumerationType.pageSize},
          function  (data) {
          if(data.status=='200'){
            that.data_items = data.body.data;
            that.$store.dispatch('setPageCount',Math.ceil(Number(data.body.iTotalRecords)/that.$enumerationType.pageSize));
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
      },
      request_list:function (index) {
        let that=this;
        let  data={};
        if (index==1||index==2){
          data=  {state:index, pageIndex:(that.$store.getters.getCurrentPageNo==0?0:that.$store.getters.getCurrentPageNo-1)*that.$enumerationType.pageSize+1,pageSize:that.$enumerationType.pageSize};
        }else {
          data=  { pageIndex:(that.$store.getters.getCurrentPageNo==0?0:that.$store.getters.getCurrentPageNo-1)*that.$enumerationType.pageSize+1,pageSize:that.$enumerationType.pageSize};

        }
        that.$api.get(that,that.$requestApi.todayPatient,data,
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

      reception:function (received,registeredOrdId,index) {
        let that=this;
        if (received) {//未接诊
          that.$api.post(that,that.$requestApi.orderDoctorRreat+registeredOrdId,{},
            function  (data) {
              if(data.body.code == '00'){
                that.data_items[index].state=0;
                that. data_items.splice(index, 1,  that.data_items[index]);
                localStorage.setItem(that.$names.registeredOrdId,registeredOrdId);
                swal({   title: data.body.msg,   text: "", type:that.$enumerationType.success,  timer: that.$enumerationType.timers,   showConfirmButton: false });
                parent.document.getElementById("39").click();

              }else{
                console.log(data.body.msg);
              }

            },function (err) {
              console.log(err);

            });
        } else {//已经接诊了
           localStorage.setItem(that.$names.registeredOrdId,registeredOrdId);
           parent.document.getElementById("39").click();

//          parent.vueRoot.$store.dispatch("medicine_compile_suppliers_no",registeredOrdId);

//          this.$store.dispatch('medicine_compile_suppliers_no',  registeredOrdId);
//
//          this.$router.push('/doctor_clinic/doctor_workbench');
        }
      }
    },

    created(){
      this.$store.dispatch('addSwitchTabs', this.titles);
      this.$store.dispatch('addSelectStates', this.selects);

      this.request();
    },

    components:{defaultInterface,switch_tab, pagination, add_patient_modal}
  }
</script>
