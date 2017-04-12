<template>
  <div>
    <!--顶部信息栏-->
    <div class="row white-bg" style="padding: 0 20px; height: 35px">
      <div class="col-sm-12 fixed-div">
        <div class="ibox-title no-top-border pull-left" style="padding-left: 0;min-height: 35px;padding-top: 10px">
          <h5 v-show="data.isEmergency == 2" class="red-bg" style="margin: 1px 10px 0 0;">急</h5>
          <small>{{data.userName}}</small>
          <small class="m-l-sm" style="color: #999">{{$stringUtils.dateAge(data.birthdayDate)}}岁 / {{data.userSex == 1 ? '男' : '女'}} / {{data.billId}}</small>
          <small class="m-l-sm" style="margin-left: 30px;">门诊号: {{data.sortNo}}</small>
          <small class="m-l-sm" style="margin-left: 30px;">科室: {{data.departName}}</small>
          <small class="m-l-sm" style="margin-left: 30px;">医生: {{data.doctorName}}</small>
        </div>

        <div class="pull-right m-r-md" style="line-height: 35px">
          <a href="#/drugstore/dispensing_list">返回上一级</a>
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
            <a @click="reception(data.userId)" style="color: #1c2b44;">查看病历</a>
          </div>
        </div>

        <div v-show="dispensingWestData.length != 0">
          <!--西/成药--标签-->
          <div class="checkbox-div">
            <span class="lightgray-width" style="margin-left: -5px;font-size: 14px">西/成药</span>
          </div>
          <!--西/成药表格-->
          <div class="m-r-md" style="margin-top: 5px">
            <table class="table no-margins white-bg" style="border-top: 2px solid #999999">
              <thead>
              <tr>
                <th class="text-center n_b_border">序号</th>
                <th class="text-center n_b_border l_r_border">药品名称</th>
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
                <td style="" class="text-center l_r_border">{{data.prodName}}</td>
                <td style="" class="text-center">{{data.preStockNum}}</td>
                <td style="" class="text-center l_r_border">{{data.amount}}</td>
                <td style="" class="text-center">{{unit_array[data.unit]}}</td>
                <td style="" class="text-center l_r_border">{{data.remark}}</td>
                <td style="" class="text-center">{{data.payState == 1 ? '未收费' : '已收费'}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-show="dispensingChinaData.length != 0">
          <!--中药--标签-->
          <div class="checkbox-div" style="margin-top: 10px">
            <span class="lightgray-width" style="margin-left: -5px;font-size: 14px">中药</span>
          </div>
          <!--中药表格-->
          <div class="m-r-md" style="margin-top: 5px">
            <table class="table no-margins white-bg" style="border-top: 2px solid #999999">
              <thead>
              <tr>
                <th class="text-center n_b_border">序号</th>
                <th class="text-center n_b_border l_r_border">药品名称</th>
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
                <td style="" class="text-center l_r_border">{{data.prodName}}</td>
                <td style="" class="text-center">{{data.preStockNum}}</td>
                <td style="" class="text-center l_r_border">{{data.singleDose}}</td>
                <td style="" class="text-center">{{unit_array[data.doseUnit]}}</td>
                <td style="" class="text-center l_r_border">{{data.remark}}</td>
                <td style="" class="text-center">{{data.payState == 1 ? '未收费' : '已收费'}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--中药-用法-频次-天数-总副数-->
          <div class="m-r-md" style="margin-top: 10px">
            <div style="background-color: white;height: 30px">
              <span class="dispensing-title" style="margin-left: 20px">用法:</span><input readonly class="dispensing-noinput" placeholder="请输入用法" v-model="usage_json.usageName">
              <span class="dispensing-title">频次:</span><input readonly class="dispensing-noinput" placeholder="请输入频次"
                                                              v-model="frequency">
              <span class="dispensing-title">天数:</span><input readonly class="dispensing-noinput" placeholder="请输入天数"
                                                              v-model="dayNum">
              <span class="dispensing-title">总副数:</span><input readonly class="dispensing-noinput" placeholder="请输入总副数"
                                                               v-model="pairs">
            </div>
          </div>
        </div>

        <!--<div style="text-align: center">-->
          <!--<button @click="back" class="btn_save dispensing-complete-btn">返回</button>-->
        <!--</div>-->

      </div>
    </div>

  </div>

</template>
<script>
  import 'staticjs/plugins/print/printThis'
  export default{
    data(){
      return {
        unit_array:[
          "","袋", "片", "支", "粒", "瓶", "mg", "g", "ml", "l", "ug", "IU", "U", "包", "盒", "枚", "丸", "喷", "颗", "滴", "cm", "少许", "适量", "对", "个", "条", "板", "件", "套", "卷", "副", "只", "根", "箱", "台", "贴", "万单位",
        ],
        usage_array:[
          "","口服", "直肠用药", "舌下用药","注射用药","皮下注射","皮内注射","肌肉注射","静脉滴注","吸入用药","局部用药","椎管内用药","关节腔内用药","胸膜腔用药","腹腔用药","阴道用药","气管内用药","滴眼","滴鼻","喷喉","含化","敷伤口","擦皮肤","其他局部用药途径","其他用药途径",
        ],
        data:'',
        dispensingWestData: [],
        dispensingChinaData: [],
        registeredOrdId:'',
        pairs:'',
        dayNum:'',
        frequency:'',
        usage_json: {
          focus:false,
          usageName: '',
          usageType: '',
        },
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
        console.log("registeredOrdId--->" + this.registeredOrdId);
        var that = this;
        var medicines = [];
        this.$api.get(this, this.$requestApi.hasMediDetails + this.registeredOrdId, "", function (data) {
          if(data.body.code == '00'){
            medicines = data.body.medicines;
            that.data = data.body.data;
            for (var i = 0;i<medicines.length;i++) {
              if(medicines[i].prodType == '1') {
                that.dispensingWestData.push(medicines[i]);
              }else {
                that.dispensingChinaData.push(medicines[i]);
              }
            }
            if (that.dispensingChinaData.length != 0) {
              that.pairs = that.dispensingChinaData[0].amount/that.dispensingChinaData[0].singleDose;
              that.dayNum = that.dispensingChinaData[0].dayNum;
              that.frequency = that.dispensingChinaData[0].frequency;
              that.usage_json.usageName = that.usage_array[that.dispensingChinaData[0].usageType];
            }
            console.log("dispensingChinaData--->" + that.dispensingChinaData);
          } else {
            console.log(data.body.msg);
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
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

      finishTreatment: function (data) {
        data.operation = 0;
      },

      print: function () {
        $(".print_wrapper").printThis({
          importCSS: true,
          loadCSS: "//cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
        });
      },

      reception:function (userId) {
        this.$store.dispatch('medicine_compile_user_id',  userId);
        this.$router.push('/doctor_clinic/history_case');
      },

    },
  }
</script>

<style>
  .l_r_border {
    border-left: 1px solid #f4f4f4;
    border-right: 1px solid #f4f4f4;
  }

  .n_b_border {
    border-bottom: none !important;
  }

  .dispensing-title {
    margin: 7px 0 7px 50px;
    display: inline-block;
    font-size: 12px;
  }

  .dispensing-noinput {
    width: 12%;
    height: 30px;
    margin: 0px 0 7px 15px;
    display: inline-block;
    border: 0;
    text-align: center;
    font-size: 12px;
    color: #333;
  }

  .dispensing-noinput:focus {
    border-color: white;
    outline: 0;
  }

  .dispensing-input {
    width: 12%;
    height: 30px;
    margin: 0px 0 7px 15px;
    display: inline-block;
    border: 0;
    text-align: center;
    font-size: 12px;
    color: #5FA8D4;
  }

  .dispensing-input:focus {
    border-color: #5FA8D4;
    outline: 0;
    -webkit-box-shadow:0 0 1px 1px #5FA8D4;
    -moz-box-shadow:0 0 1px 1px #5FA8D4;
    box-shadow:0 0 1px 1px #5FA8D4;
  }

  .checkbox-blue {
    -webkit-appearance: none;
    cursor: pointer;
    width: 15px;
    height: 15px;
    display: inline-block;
    outline: none !important;
    border: none;
    vertical-align: bottom;
    background: url(../../../../static/img/set_manage_img/hook_gray.png) no-repeat;
  }

  .checkbox-blue:checked {
    vertical-align: bottom;
    display: inline-block;
    outline: none;
    border: none;
    width: 15px;
    height: 15px;
    background: url(../../../../static/img/set_manage_img/hook_select.png) no-repeat;
  }

  .form-whitebg-input {
    background: white;
    background-image: none;
    border: 0px;
    border-radius: 1px;
    box-shadow: none;
    color: inherit;
    display: inline-block;
    margin-left: 5px;
    padding-left: 15px;
    /*-webkit-transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;*/
    /*transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;*/
    width: 210px;
    height: 30px;
    font-size: 12px;
  }

  .form-whitebg-input:focus {
    border-color: #5FA8D4;
    outline: 0;
    -webkit-box-shadow: 0 0 1px 1px #5FA8D4;
    -moz-box-shadow: 0 0 1px 1px #5FA8D4;
    box-shadow: 0 0 1px 1px #5FA8D4;
  }

  .dispensing-complete-btn {
    margin-top: 30px;
  }

</style>
