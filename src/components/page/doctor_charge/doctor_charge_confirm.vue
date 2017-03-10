<template>
  <div>
  <!--确认收费弹窗-->
  <doctor_charge_pay :paysPrice="paysPrice"></doctor_charge_pay>
    <!--顶部信息栏-->
    <div class="row white-bg" style="padding: 0 20px; height: 35px">
      <div class="col-sm-12">
        <div class="ibox-title no-top-border pull-left" style="padding-left: 0;min-height: 35px;padding-top: 10px">
          <h5 v-show="data_item.isEmergency == 1" class="red-bg" style="margin: 1px 10px 0 0;">急</h5>
          <small>{{data_item.userName}}</small>
          <small class="m-l-sm">26岁 / {{data_item.userSex == 1 ? '男' : '女'}} / {{data_item.billId}}</small>
          <small class="m-l-sm">门诊号: {{data_item.registeredOrdId}}</small>
          <small class="m-l-sm">科室: {{data_item.departName}}</small>
          <small class="m-l-sm">医生: {{data_item.doctorName}}</small>
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
        <div class="col-sm-2 no-padding" style="line-height: 48px">
          <small>初步诊断:</small>
          <small class="m-l-xs" style="color: lightgray"></small>
        </div>


        <div class="m-r-md">
          <table id="tableId" class="table no-margins white-bg" style="border-top: 2px solid #999999">
            <thead>
              <tr>
                <th class="text-center n_b_border l_r_border">选择</th>
                <th class="text-center n_b_border l_r_border">序号</th>
                <th class="text-center n_b_border l_r_border">收费项目</th>
                <th class="text-center n_b_border l_r_border">状态</th>
                <th class="text-center n_b_border l_r_border">单位</th>
                <th class="text-center n_b_border l_r_border">单价</th>
                <th class="text-center n_b_border l_r_border">数量</th>
                <th class="text-center n_b_border l_r_border">总价</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(table_item, index) in table_items">
                <td class="text-center"><input @click="selectCheckboxBtnClick" type="checkbox" checked="table_item.state"></td>
                <td class="text-center l_r_border">{{index + 1}}</td>
                <td class="text-center">{{table_item.feeName}}</td>
                <td class="text-center l_r_border">{{table_item.state == 1 ? '未完成' : '已完成'}}</td>
                <td class="text-center l_r_border">次</td>
                <td class="text-center l_r_border">{{table_item.retailPrice}}元</td>
                <td class="text-center l_r_border">{{table_item.unit}}</td>
                <td class="text-center l_r_border" style="color: #ED6777">{{table_item.totalPrice}}</td>
              </tr>
            </tbody>
          </table>

          <div class="col-sm-12" style="margin-top: 15px; margin-left: -30px;">
            <div class="col-sm-6" style="color: #ED6777; font-size: 10px">注: 带 * 项目状态为已完成, 必须缴费, 其余项目可选择收费</div>
            <div class="col-sm-6">&nbsp;</div>
          </div>

          <div style="width: 100%; height: 50px; background-color: white; margin-top: 15px; margin-bottom: 10px;" class="col-sm-12">
              <div class="col-sm-3" style="margin: 16px 0px 0px -20px">
                总金额: ￥{{paysPrice.dataTotalPrice}}
              </div>
              <div v-show="is_charged == 1" class="col-sm-3" style="margin: 11px 0px 0px -90px">总金额折扣:
                <input id="couponPrice" v-model="paysPrice.dataCouponPrice" type="text" class="charge_input_conpus">
                <span style="color: #66ABD4; margin-left: 5px">折</span>
              </div>
              <div v-show="is_charged == 1" class="col-sm-3" style="margin: 10px 0px 0px 0px">总金额折后价:
                <span style="color: #ED6777; font-size: 18px">￥{{paysPrice.dataPayPrice}}</span>
              </div>
              <div class="col-sm-3" style="margin-top: 12px; float: right; margin-right: -40px;">
                <button @click="print()" type="button" class="charge_print">打印收费单{{chargeConfirmData}}</button>
                <button v-show="is_charged == 1" type="button" class="charge_confirm" data-toggle="modal" data-target="#doctor_charge_pay">确认收费</button>
                <button v-show="is_charged == 2" type="button" class="charge_confirm_gray">确认收费</button>
              </div>
          </div>

          <div v-show="is_charged == 2" v-for="(pays_item,index) in pays_items" style="background-color: white;" class="col-sm-12">
            <div class="col-sm-2" style="margin: 5px 0px 5px -20px">收银员：{{pays_item.operName}}</div>
            <div class="col-sm-2" style="margin: 5px 0px 5px 0px">收费方式：{{getPayType(pays_item.payType)}}</div>
            <div class="col-sm-2" style="margin: 5px 0px 5px 0px">应收：{{pays_item.receivableAmount}}</div>
            <div class="col-sm-2" style="margin: 5px 0px 5px 0px">优惠金额：{{pays_item.depositRate}}</div>
            <div class="col-sm-2" style="margin: 5px 0px 5px 0px">实收：{{pays_item.payAmount}}</div>
            <div class="col-sm-2" style="margin: 5px 0px 5px 0px">时间：{{$stringUtils.dateFormat(pays_item.doneDate)}}</div>
          </div>

        </div>
      </div>
    </div>

    <!--打印预览部分-->
    <div class="print_wrapper white-bg block_hidden">
      <div class="ibox no-margins print_content">
        <div class="ibox-title no-borders no-padding">
          <img src="">
          <div>
            <span style="width:33%;border:1px solid #f4f4f4;height: 1px;display: inline-block;"></span><h6
            style="display: inline-block;width: 33%;vertical-align: sub;text-align: center">邻家好医诊所门诊治疗</h6><span
            style="width:33%;border:1px solid #f4f4f4;height: 1px;display: inline-block;"></span>
          </div>

        </div>
        <div class="ibox-content no-borders no-padding">
          <div class="form-group" style="margin-top: 15px">
            <div style="display: inline-block">
              <h6 style="display: inline-block; margin: 0;">{{data_item.patientName}}</h6>
              <h6 style="display: inline-block; margin: 0 0 10px 10px;">{{data_item.age}}岁 / {{data_item.sex == 0 ? '男' : '女'}}</h6>
            </div>
            <div style="display: inline-block">
              <small style="font-size: 12px">病案号: {{data_item.patientNum}}</small>
              <small style="font-size: 12px; padding-left: 10px; padding-right: 10px">科室: {{data_item.administrative}}</small>
              <small style="font-size: 12px">日期: {{data_item.time}}</small>
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
                <tr style="font-size: 12px" v-for="(data, index) in table_items">
                  <td>{{data_item.treatmentProject}}</td>
                  <td>{{data_item.remark}}</td>
                  <td>{{data_item.chargeSituation == 0 ? '未收费' : '已收费'}}</td>
                  <td>{{data_item.treatmentProject}}</td>
                  <td>{{data_item.remark}}</td>
                  <td>{{data_item.chargeSituation == 0 ? '未收费' : '已收费'}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="form-group" style="margin: 0;">
            <label style="font-size: 12px">治疗总额(元):</label>
            <label style="margin-left: 10px; font-size: 12px">220元</label>
          </div>

          <div class="form-group" style="margin-bottom: 0px">
            <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
              <label style="margin: 0; font-size: 12px">医师:</label>
              <p style="display: inline-block; margin-left: 10px; font-size: 12px">李彬</p>
            </div>
            <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
              <label style="margin: 0; font-size: 12px">审核:</label>
              <p style="display: inline-block; margin-left: 10px; font-size: 12px">李彬</p>
            </div>
            <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
              <label style="margin: 0; font-size: 12px">执行:</label>
              <p style="display: inline-block;margin-left: 10px; font-size: 12px">李彬</p>
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

  .charge_confirm{
    width: 45%;
    height: 28px;
    background-color: #324367;
    color: white;
    border: 1px solid #324367;
    border-radius: 2px;
  }

  .charge_confirm_gray{
    width: 45%;
    height: 28px;
    background-color: #cccccc;
    color: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 2px;
  }

  .charge_print{
    width: 45%;
    height: 28px;
    background-color: white;
    color: #324367;
    border: 1px solid #324367;
    border-radius: 2px;
  }
  
  .charge_input_conpus{
    width: 35%; 
    height: 28px; 
    text-align: center; 
    border: solid 1px #66ABD4; 
    border-radius: 2px; 
    color: #66ABD4;
    margin-left: 5px;
  }
</style>
<script>
  import 'staticjs/plugins/print/printThis';
  import doctor_charge_pay from "./doctor_charge_pay";
  export default{
    data(){
      return {
        is_charged: '',
        registerOrderId: '',
        data_item:'',
        table_items:[],
        pays_items:[],
        paysPrice: {
          dataTotalPrice: '0',
          dataPayPrice: '0',
          dataCouponPrice: 10,
          feeDetailOrdIdStrs: [],
          registerOrderId: '',
        },
      }
    },

    created() {
    },

    components:{
      doctor_charge_pay,
		},

    mounted: function(){
			var that=this;
      $("#couponPrice").bind('input propertychange', function(){
        that.dataPayPrice = that.dataTotalPrice*(that.dataCouponPrice/10);
      });
		},

    computed: {
      chargeConfirmData:function () {
        this.is_charged = this.$store.getters.getIsChargeData;
        this.registerOrderId = this.$store.getters.getChargeData;
        this.requestData();
        return "";
      },
      
    },

    methods: {

      back: function () {
        history.back();
      },

      getPayType: function (payType) {
        if (payType == 1){
          return '现金';
        } else if(payType == 2){
          return '支付宝';
        } else if(payType == 3){
          return '微信';
        } else if(payType == 4){
          return '银行卡';
        }else{
          return '';
        }
      },

      selectCheckboxBtnClick: function () {
        console.log(this.dataTotalPrice);
      },

      requestData: function () {
        var that = this;
        if (this.is_charged == 1) {
          this.$api.get(this, this.$requestApi.chargeWaitConfirm+this.registerOrderId, '', function (data) {
          if (data.status == '200') {
            that.data_item = data.body.data;
            that.table_items = data.body.feeDetails;

            //总价和实际支付价格
            that.paysPrice.dataTotalPrice = data.body.data.waitPay;
            that.paysPrice.dataPayPrice = data.body.data.waitPay;
            that.paysPrice.registerOrderId = that.registerOrderId;

            //费用明细编号数组
            for (let index in  that.table_items) {
              that.paysPrice.feeDetailOrdIdStrs.push(that.table_items[index].feeDetailOrdId);
            }
            console.log(data.body.data);
          } else {
            console.log(data.body.msg);
          }
          }, function (err) {
            console.log(err);
          });
        }else{
          this.$api.get(this, this.$requestApi.chargeListConfirm+this.registerOrderId, '', function (data) {
          if (data.status == '200') {
            that.data_item = data.body.data;
            that.table_items = data.body.feeDetails;
            that.pays_items = data.body.pays;

            that.paysPrice.dataTotalPrice = data.body.data.hasPay;
            console.log(data.body.data);
          } else {
            console.log(data.body.msg);
          }
          }, function (err) {
            console.log(err);
          });
        }
        
      },

      finishTreatment: function (data_item) {
        data_item.operation = 0;
      },

      print:function () {
        $(".print_wrapper").printThis({importCSS: true,loadCSS:"//cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"});
      }
    },
  }
</script>
