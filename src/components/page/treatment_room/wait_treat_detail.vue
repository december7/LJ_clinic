<template>
  <div>
    <!--顶部信息栏-->
    <div class="row white-bg" style="padding: 0 20px; height: 35px">
      <div class="col-sm-12 fixed-div">
        <div class="ibox-title no-top-border pull-left" style="padding-left: 0;min-height: 35px;padding-top: 10px">
          <h5 v-show="data.isEmergency == 1" class="red-bg" style="margin: 1px 10px 0 0;">急</h5>
          <small>{{data.userName}}</small>
          <small class="m-l-sm">{{age}}岁 / {{data.userSex == 1 ? '男' : '女'}} / {{data.billId}}</small>
          <small class="m-l-xl">门诊号: {{data.sortNo}}</small>
          <small class="m-l-xl">科室: {{data.departName}}</small>
          <small class="m-l-xl">医生: {{data.doctorName}}</small>
        </div>

        <div class="pull-right m-r-md" style="line-height: 35px">
          <a href="#/treatment_room/waiting_treatment">返回上一级</a>
        </div>
      </div>

    </div>

    <!--中间内容区-->
    <div class="wrapper wrapper-content animated fadeInRight no_top_padding">
      <div class="row" style="padding: 0 15px;">
        <!--顶部信息栏-->
        <div class="col-sm-12 no-padding">
          <div class="col-sm-2 no-padding" style="line-height: 48px;width: 50%">
            <small>初步诊断:</small>
            <small class="m-l-xs" style="color: black">{{data.diagnosis}}</small>
          </div>
          <div class="pull-right m-r-md" style="line-height: 48px">
            <a style="color: #1c2b44;" href="#/doctor_clinic/history_case">查看病历</a>
          </div>
        </div>

        <div class="m-r-md">
          <table class="table no-margins white-bg" style="border-top: 2px solid #999999">
            <thead>
            <tr>
              <th class="text-center n_b_border">序号</th>
              <th class="text-center n_b_border l_r_border">治疗项目</th>
              <th class="text-center n_b_border">备注</th>
              <th class="text-center n_b_border l_r_border">收费情况</th>
              <th class="text-center n_b_border">进度</th>
              <th class="text-center n_b_border l_r_border">操作</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(subData, index) in treatmentData">
              <td class="text-center">{{index + 1}}</td>
              <td class="text-center l_r_border">{{subData.projectName}}</td>
              <td class="text-center">{{subData.remark}}</td>
              <td class="text-center l_r_border">{{subData.payState == 0 ? '未收费' : '已收费'}}</td>
              <td class="text-center">{{subData.amount}}/{{subData.finishAmount}}</td>
              <td class="text-center l_r_border">
                <small v-show="subData.amount == subData.finishAmount">已完成</small>
                <a @click="finishTreatment(subData,index)" v-show="subData.amount != subData.finishAmount">点击完成</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>
<style>
  .l_r_border {
    border-left: 1px solid #f4f4f4;
    border-right: 1px solid #f4f4f4;
  }

  .n_b_border {
    border-bottom: none !important;
  }
</style>
<script>
  import 'staticjs/plugins/print/printThis'
  export default{
    data(){
      return {
        data: '',
        treatmentData: [],
        age:'',
      }
    },

    created() {
      this.requestData();
    },

    methods: {
      requestData: function () {
        var registeredOrdId = this.$store.getters.getRegisteredOrdId;
        var that = this;
        this.$api.get(this, this.$requestApi.waitTreatDetail + registeredOrdId, "", function (data) {
          if(data.body.code == '00'){
            that.data = data.body.data;
            that.treatmentData = data.body.treatments;
            that.age = that.getAge(that.data.birthdayDate);
          } else {
            console.log(data.body.msg);
          }

        }, function (err) {
          console.log(err);

        });
      },
//      计算年龄
      getAge:function (timestamp) {
        var now = new Date().getTime();
        var hours = Math.abs(now - timestamp)/1000/60/60;
        var years =  parseInt(hours / (24 * 30 * 12));
        console.log("years-------->" + years);
        return years;
      },


      finishTreatment: function (data,index) {
        var that = this;
        this.$api.post(this,this.$requestApi.finishTreat + this.treatmentData[index].feeDetailOrdId, "" ,function (data) {
          if(data.body.code == '00'){
            console.log("治疗成功");
            that.requestData();
          }else{

          }
        });
      },

      print: function () {
        $(".print_wrapper").printThis({
          importCSS: true,
          loadCSS: "//cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
        });
      }
    },
  }
</script>
