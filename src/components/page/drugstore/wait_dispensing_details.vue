<template>
  <div>
    <!--顶部信息栏-->
    <div class="row white-bg" style="padding: 0 20px; height: 35px">
      <div class="col-sm-12 fixed-div">
        <div class="ibox-title no-top-border pull-left" style="padding-left: 0;min-height: 35px;padding-top: 10px">
          <h5 v-show="data.isEmergency == 1" class="red-bg" style="margin: 1px 10px 0 0;">急</h5>
          <small>{{data.userName}}</small>
          <small class="m-l-sm" style="color: #999">{{age}}岁 / {{data.userSex == 1 ? '男' : '女'}} / {{data.billId}}</small>
          <small class="m-l-sm" style="margin-left: 30px;">门诊号: {{data.sortNo}}</small>
          <small class="m-l-sm" style="margin-left: 30px;">科室: {{data.departName}}</small>
          <small class="m-l-sm" style="margin-left: 30px;">医生: {{data.doctorName}}</small>
        </div>

        <div class="pull-right m-r-md" style="line-height: 35px">
          <a href="#/drugstore/wait_dispensing">返回上一级</a>
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
            <small class="m-l-xs" style="color: black;">{{data.diagnosis}}</small>
          </div>
          <div class="pull-right m-r-md" style="line-height: 48px">
            <a style="color: #1c2b44;" href="#/doctor_clinic/history_case">查看病历</a>
          </div>
        </div>
        <div v-show="dispensingWestData.length != 0">
          <!--复选框--西/成药-->
          <div v-show="westState=='1'" class="checkbox-div">
            <input id="west_checkbox_id" type="checkbox" style="vertical-align: top" class="checkbox-gray" v-model="west_clickCheck"><span
            class="lightgray-width" style="margin-left: 10px;font-size: 14px">西/成药</span>
          </div>
          <div v-show="westState=='2'" class="checkbox-div">
            <span class="lightgray-width" style="margin-left: -5px;font-size: 14px">西/成药(已发药)</span>
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
                <td style="" class="text-center l_r_border">{{data.prodName}}</td>
                <td style="" class="text-center">{{data.stockNum}}</td>
                <td style="" class="text-center l_r_border">{{data.amount}}</td>
                <td style="" class="text-center">{{unit_array[data.unit]}}</td>
                <td style="" class="text-center l_r_border">{{data.remark}}</td>
                <td style="" class="text-center">{{data.payState == 0 ? '未收费' : '已收费'}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-show="dispensingChinaData.length != 0">
          <!--复选框--中药-->
          <div v-show="chinaState=='1'" class="checkbox-div" style="margin-top: 10px">
            <input id="china_checkbox_id" type="checkbox" style="vertical-align: top" class="checkbox-gray" v-model="china_clickCheck"><span
            class="lightgray-width" style="margin-left: 10px;font-size: 14px">中药</span>
          </div>
          <div v-show="chinaState=='2'" class="checkbox-div" style="margin-top: 10px">
            <span class="lightgray-width" style="margin-left: -5px;font-size: 14px">中药(已发药)</span>
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
                <td style="" class="text-center l_r_border">{{data.prodName}}</td>
                <td style="" class="text-center">{{data.stockNum}}</td>
                <td style="" class="text-center l_r_border">{{data.singleDose}}</td>
                <td style="" class="text-center">{{unit_array[data.doseUnit]}}</td>
                <td style="" class="text-center l_r_border">{{data.remark}}</td>
                <td style="" class="text-center">{{data.payState == 0 ? '未收费' : '已收费'}}</td>
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

        <div style="text-align: center">
          <button @click="dispensingClick" :class="(west_clickCheck||china_clickCheck)==true ? 'btn_save dispensing-complete-btn':'btn_cant_gray dispensing-complete-btn'">发药</button>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
  export default{
    data(){
      return {
        unit_array:[
          "袋", "片", "支", "粒", "瓶", "mg", "g", "ml", "l", "ug", "IU", "U", "包", "盒", "枚", "丸", "喷", "颗", "滴", "cm", "少许", "适量", "对", "个", "条", "板", "件", "套", "卷", "副", "只", "根", "箱", "台", "贴", "万单位",
        ],
        usage_array:[
          "","口服", "直肠用药", "舌下用药","注射用药","皮下注射","皮内注射","肌肉注射","静脉滴注","吸入用药","局部用药","椎管内用药","关节腔内用药","胸膜腔用药","腹腔用药","阴道用药","气管内用药","滴眼","滴鼻","喷喉","含化","敷伤口","擦皮肤","其他局部用药途径","其他用药途径",
        ],
        data:'',
        dispensingWestData: [],
        dispensingChinaData: [],
        registeredOrdId:'',
        age:'',
        pairs:'',
        dayNum:'',
        frequency:'',
        chinaState:'', //中药发药状态 1待发药 2已发药
        westState:'', //西药发药状态 1待发药 2已发药
        usage_json: {
          focus:false,
          usageName: '',
          usageType: '',
        },
        usageList:[],
        west_clickCheck:'',
        china_clickCheck:'',
      }
    },

    created() {
      this.requestData();
    },

    methods: {
//      请求页面数据
      requestData: function () {
        this.registeredOrdId = this.$store.getters.getRegisteredOrdId;
        console.log("registeredOrdId--->" + this.registeredOrdId);
        var that = this;
        var medicines = [];
        this.$api.get(this, this.$requestApi.dispensingDetails + this.registeredOrdId, "", function (data) {
          if(data.body.code == '00'){
            medicines = data.body.medicines;
            that.data = data.body.data;
            that.age = that.getAge(that.data.birthdayDate);
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
              that.chinaState = that.dispensingChinaData[0].state;
              console.log("chinaState--->" + that.chinaState);
            }
            if (that.dispensingWestData.length != 0) {
              that.westState = that.dispensingWestData[0].state;
              console.log("westState--->" + that.westState);
            }

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

      getUsageList: function () {
        var that = this;
        var url = this.$requestApi.staticDataList;
        this.$api.get(this, url,{"codeType":"USAGE_TYPE"},function  (data) {
          if(data.status=='200'){
            that.usageList = data.body.data;
          }else{
            console.log(data.body.msg);
          }
        });
      },
      getUsageFocus: function (usage_json) {
        usage_json.focus = true;
        console.log("点击了输入框");
      },
      loseUsageFocus: function (usage_json) {
        usage_json.focus = false;
      },
      selectUsageName: function (data,usage_json) {
        usage_json.usageName = data.codeValue;
        usage_json.usageType = data.codeKey;
        console.log("-------->" + data.codeKey + "---->" + usage_json.usageType);
      },

      dispensingClick: function () {
//        console.log("china_clickCheck-->"+this.china_clickCheck);
        if (this.china_clickCheck || this.west_clickCheck) {
          var json = '';
          if (this.west_clickCheck && !this.china_clickCheck) {
            json = {
              prodType:"1",
            };
          }else if (this.china_clickCheck && !this.west_clickCheck) {
            json = {
              prodType:"2",
            };
          }else if (this.west_clickCheck && this.china_clickCheck) {
            json = "";
          }
          console.log("json======>" + json + "--->" + json.prodType);
          this.$api.post(this,this.$requestApi.sendMedicines + this.registeredOrdId, json,function (data) {
            if(data.body.code == '00'){
              console.log("发药成功");
              history.back();
            }else{

            }
          });
        }else { //按钮灰色状态----弹窗提示未选择中西药

        }
      },
      clickWaitDispensing: function (data_item,index) {
        this.$store.dispatch('show_registeredOrdId', data_item.registeredOrdId);
      },

    },
  }
</script>

<style>
  .btn_cant_gray {
    width: 100px;
    height: 28px;
    background-color: #ccc;
    color: white;
    border: 0px solid #324367;
    border-radius: 2px;
    margin-left: 0px;
  }
</style>
