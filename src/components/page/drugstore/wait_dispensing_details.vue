<template>
  <div>
    <!--顶部信息栏-->
    <div class="row white-bg" style="padding: 0 20px; height: 35px">
      <div class="col-sm-12">
        <div class="ibox-title no-top-border pull-left" style="padding-left: 0;min-height: 35px;padding-top: 10px">
          <h5 class="red-bg" style="margin: 1px 10px 0 0;">急</h5>
          <small>{{data.patientName}}</small>
          <small class="m-l-sm" style="color: #999">{{data.age}}岁 / {{data.sex == 0 ? '男' : '女'}} / {{data.tele}}</small>
          <small class="m-l-sm" style="margin-left: 30px;">门诊号: {{data.outpatientNum}}</small>
          <small class="m-l-sm" style="margin-left: 30px;">科室: {{data.department}}</small>
          <small class="m-l-sm" style="margin-left: 30px;">医生: {{data.doctorName}}</small>
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
        <!--复选框--西/成药-->
        <div class="checkbox-div">
          <input type="checkbox" value="0" style="vertical-align: top" class="checkbox-gray"><span
          class="lightgray-width" style="margin-left: 10px;font-size: 14px">西/成药</span>
        </div>
        <!--西/成药表格-->
        <div class="m-r-md" style="margin-top: 5px">
          <table class="table no-margins white-bg" style="border-top: 2px solid #999999">
            <thead>
            <tr>
              <th class="text-center n_b_border">序号</th>
              <th class="text-center n_b_border l_r_border">通用名称</th>
              <th class="text-center n_b_border">库存</th>
              <th class="text-center n_b_border l_r_border">数量</th>
              <th class="text-center n_b_border">单位</th>
              <th class="text-center n_b_border l_r_border">备注说明</th>
              <th class="text-center n_b_border">是否收费</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(data, index) in dispensingWestData">
              <td style="" class="text-center">{{index + 1}}</td>
              <td style="" class="text-center l_r_border">{{data.nomalName}}</td>
              <td style="" class="text-center">{{data.repertory}}</td>
              <td style="" class="text-center l_r_border">{{data.numbers}}</td>
              <td style="" class="text-center">{{data.unit}}</td>
              <td style="" class="text-center l_r_border">{{data.remark}}</td>
              <td style="" class="text-center">{{data.chargeSituation == 0 ? '未收费' : '已收费'}}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <!--复选框--中药-->
        <div class="checkbox-div" style="margin-top: 10px">
          <input type="checkbox" value="0" style="vertical-align: top" class="checkbox-gray"><span
          class="lightgray-width" style="margin-left: 10px;font-size: 14px">中药</span>
        </div>
        <!--中药表格-->
        <div class="m-r-md" style="margin-top: 5px">
          <table class="table no-margins white-bg" style="border-top: 2px solid #999999">
            <thead>
            <tr>
              <th class="text-center n_b_border">序号</th>
              <th class="text-center n_b_border l_r_border">通用名称</th>
              <th class="text-center n_b_border">库存</th>
              <th class="text-center n_b_border l_r_border">数量</th>
              <th class="text-center n_b_border">单位</th>
              <th class="text-center n_b_border l_r_border">备注说明</th>
              <th class="text-center n_b_border">是否收费</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(data, index) in dispensingChinaData">
              <td style="" class="text-center">{{index + 1}}</td>
              <td style="" class="text-center l_r_border">{{data.nomalName}}</td>
              <td style="" class="text-center">{{data.repertory}}</td>
              <td style="" class="text-center l_r_border">{{data.numbers}}</td>
              <td style="" class="text-center">{{data.unit}}</td>
              <td style="" class="text-center l_r_border">{{data.remark}}</td>
              <td style="" class="text-center">{{data.chargeSituation == 0 ? '未收费' : '已收费'}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--中药-用法-频次-天数-总副数-->
        <div class="m-r-md" style="margin-top: 10px">
          <div style="background-color: white;height: 30px">
            <span class="dispensing-title" style="margin-left: 20px">用法:</span><input class="dispensing-input"
                                                                                      placeholder="请输入用法"
                                                                                      v-model="data.usage">
            <span class="dispensing-title">频次:</span><input class="dispensing-input" placeholder="请输入频次"
                                                            v-model="data.frequency">
            <span class="dispensing-title">天数:</span><input class="dispensing-input" placeholder="请输入天数"
                                                            v-model="data.days">
            <span class="dispensing-title">总副数:</span><input class="dispensing-input" placeholder="请输入总副数"
                                                             v-model="data.pairs">
          </div>
        </div>

        <div style="text-align: center">
          <button @click="back" class="btn_save dispensing-complete-btn">发药</button>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
  import 'staticjs/plugins/print/printThis'
  export default{
    data(){
      return {
        data: '',
        dispensingWestData: [],
        dispensingChinaData: [],
        registeredOrdId:'',
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
        this.registeredOrdId = this.$store.getters.getRegisteredOrdId;
        console.log(this.registeredOrdId);
        var that = this;
        this.$api.get(this, this.$requestApi.dispensingDetails, "", function (data) {
          if (data.status == '200') {
            that.data = data.body;
            that.dispensingWestData = data.body.westData;
            that.dispensingChinaData = data.body.chinaData;
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

      print: function () {
        $(".print_wrapper").printThis({
          importCSS: true,
          loadCSS: "//cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
        });
      }
    },
  }
</script>
