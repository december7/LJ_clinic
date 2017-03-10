<template>
  <div>
    <!--顶部信息栏-->
    <div class="row white-bg" style="padding: 0 20px; height: 35px">
      <div class="col-sm-12">
        <div class="ibox-title no-top-border pull-left" style="padding-left: 0;min-height: 35px;padding-top: 10px">
          <h5 class="red-bg" style="margin: 1px 10px 0 0;">急</h5>
          <small>{{data.patientName}}</small>
          <small class="m-l-sm">{{data.age}}岁 / {{data.sex == 0 ? '男' : '女'}} / {{data.tele}}</small>
          <small class="m-l-xl">门诊号: {{data.outpatientNum}}</small>
          <small class="m-l-xl">科室: {{data.administrative}}</small>
          <small class="m-l-xl">医生: {{data.doctorName}}</small>
        </div>

        <div class="pull-right m-r-md" style="line-height: 35px">
          <a @click="back">返回上一级</a>
        </div>
      </div>

    </div>

    <!--中间内容区-->
    <div class="wrapper wrapper-content animated fadeInRight no_top_padding">
      <div class="row" style="padding: 0 15px;">
        <!--顶部信息栏-->
        <div class="col-sm-12 no-padding">
          <div class="col-sm-2 no-padding" style="line-height: 48px">
            <small>初步诊断:</small>
            <small class="m-l-xs" style="color: black">{{data.diagnose}}</small>
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
              <th class="text-center n_b_border">操作</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(data, index) in treatmentData">
              <td style="width: 20%;" class="text-center">{{index + 1}}</td>
              <td style="width: 20%;" class="text-center l_r_border">{{data.treatmentProject}}</td>
              <td style="width: 20%;" class="text-center">{{data.remark}}</td>
              <td style="width: 20%;" class="text-center l_r_border">{{data.chargeSituation == 0 ? '未收费' : '已收费'}}</td>
              <td style="width: 20%;" class="text-center">
                <small v-show="data.operation == 0">已完成</small>
                <a @click="finishTreatment(data)" v-show="data.operation == 1">点击完成</a></td>
            </tr>
            </tbody>
          </table>
          <!--打印按钮-->
          <div class="m-t-xl">
            <div style="text-align: right">
              <button @click="print()" type="button" class="btn btn-primary" style="width: 80px; padding: 4px 0;">打印</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--打印预览部分-->
    <div class="print_wrapper white-bg block_hidden">
      <div class="ibox no-margins print_content">
        <div class="ibox-title no-borders no-padding">
          <img src="img/locked.png">
          <div>
            <span style="width:33%;border:1px solid #f4f4f4;height: 1px;display: inline-block;"></span><h6
            style="display: inline-block;width: 33%;vertical-align: sub;text-align: center">邻家好医诊所门诊治疗</h6><span
            style="width:33%;border:1px solid #f4f4f4;height: 1px;display: inline-block;"></span>
          </div>

        </div>
        <div class="ibox-content no-borders no-padding">
          <div class="form-group" style="margin-top: 15px">
            <div style="display: inline-block">
              <h6 style="display: inline-block; margin: 0;">{{data.patientName}}</h6>
              <h6 style="display: inline-block; margin: 0 0 10px 10px;">{{data.age}}岁 / {{data.sex == 0 ? '男' : '女'}}</h6>
            </div>
            <div style="display: inline-block; float: right">
              <small style="font-size: 12px">病案号: {{data.patientNum}}</small>
              <small style="font-size: 12px; padding-left: 10px; padding-right: 10px">科室: {{data.administrative}}</small>
              <small style="font-size: 12px">日期: {{data.time}}</small>
            </div>
          </div>

          <div>
            <div>
              <p style="margin-bottom: 4px; font-size: 12px">初步诊断:</p>
              <table class="table table-bordered text-center">
                <thead>
                <tr style="font-size: 12px">
                  <th class="text-center">名称</th>
                  <th class="text-center">单价</th>
                  <th class="text-center">单位</th>
                  <th class="text-center">次数</th>
                  <th class="text-center">金额</th>
                  <th class="text-center">说明</th>
                </tr>
                </thead>
                <tbody>
                <tr style="font-size: 12px" v-for="(data, index) in treatmentData">
                  <td>{{data.treatmentProject}}</td>
                  <td>{{data.remark}}</td>
                  <td>{{data.chargeSituation == 0 ? '未收费' : '已收费'}}</td>
                  <td>{{data.treatmentProject}}</td>
                  <td>{{data.remark}}</td>
                  <td>{{data.chargeSituation == 0 ? '未收费' : '已收费'}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="form-group" style="margin: 0;">
            <label style="font-size: 12px">治疗总额(元):</label>
            <label style="margin-left: 10px; font-size: 12px">25元</label>
          </div>

          <div class="form-group" style="margin-bottom: 0px">
            <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
              <label style="margin: 0; font-size: 12px">医师:</label>
              <p style="display: inline-block; margin-left: 10px; font-size: 12px">小辛</p>
            </div>
            <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
              <label style="margin: 0; font-size: 12px">审核:</label>
              <p style="display: inline-block; margin-left: 10px; font-size: 12px">小辛</p>
            </div>
            <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
              <label style="margin: 0; font-size: 12px">执行:</label>
              <p style="display: inline-block;margin-left: 10px; font-size: 12px">小辛</p>
            </div>

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
        data:'',
        treatmentData: [],
      }
    },

    created() {
      this.requestData();
    },

    methods: {
      back: function () {
        history.back();
      },

      requestData: function () {
        var that = this;
        this.$api.get(this, this.$requestApi.treatmentDetails, "", function (data) {
          if (data.status == '200') {
            that.data = data.body;
            that.treatmentData = data.body.data;
            console.log(that.treatmentData);
          } else {
            console.log(data.body.msg);
          }

        }, function (err) {
          console.log(err);

        });
      },

      finishTreatment: function (data) {
        data.operation = 0;
      },

      print:function () {
        $(".print_wrapper").printThis({importCSS: true,loadCSS:"//cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"});
      }
    },
  }
</script>
