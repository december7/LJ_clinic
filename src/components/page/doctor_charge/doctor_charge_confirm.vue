<template>
  <div>
  <!--确认收费弹窗-->
  <doctor_charge_pay :paysPrice="paysPrice"></doctor_charge_pay>
    <!--顶部信息栏-->
    <div class="row white-bg" style="padding: 0 20px; height: 35px">
      <div class="col-sm-12">
        <div class="ibox-title no-top-border pull-left" style="padding-left: 0;min-height: 35px;padding-top: 10px">
          <h5 v-show="data_item.isEmergency == 2" class="red-bg" style="margin: 1px 10px 0 0;">急</h5>
          <small>{{data_item.userName}}</small>
          <small class="m-l-sm">{{$stringUtils.dateAge(data_item.birthdayDate)}}岁 / {{data_item.userSex == 9 ? '未知' : data_item.userSex == 1 ? '男' : '女'}} / {{data_item.billId}}</small>
          <small class="m-l-sm">门诊号: {{data_item.registeredOrdId}}</small>
          <small class="m-l-sm">科室: {{data_item.departName}}</small>
          <small class="m-l-sm">医生: {{data_item.doctorName}}</small>
        </div>

        <div class="pull-right m-r-md" style="line-height: 35px">
          <a @click="back()">返回上一级</a>
        </div>
      </div>

    </div>

    <!--中间内容区-->
    <div class="wrapper wrapper-content animated fadeInRight no_top_padding">
      <div class="row" style="padding: 0 15px;">
        <!--顶部信息栏-->
        <div class="col-sm-2 no-padding" style="line-height: 48px;width: 50%">
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
                <td class="text-center"><input @click="selectCheckboxBtnClick(index,table_item,$event)" v-model="paysPrice.feeDetailOrdIdStrs" :value="table_item.feeDetailOrdId" class="checkbox-myblue" type="checkbox"></td>
                <td class="text-center l_r_border">{{index + 1}}</td>
                <td class="text-center">{{table_item.feeName}}</td>
                <td class="text-center l_r_border">{{table_item.payState == 1 ? '未完成' : '已完成'}}</td>
                <td class="text-center l_r_border">{{$enumeration.getProjectUnit(table_item.unit)}}</td>
                <td class="text-center l_r_border">{{table_item.retailPrice/100}}元</td>
                <td class="text-center l_r_border">{{table_item.amount}}</td>
                <td class="text-center l_r_border" style="color: #ED6777">{{table_item.totalPrice/100}}</td>
              </tr>
            </tbody>
          </table>

          <div style="width: 100%; height: 50px; background-color: white; margin-top: 15px; margin-bottom: 10px;" class="col-sm-12">
            <div class="col-sm-3" style="margin: 16px 0px 0px -20px;">
              总金额: ￥{{parseInt(paysPrice.dataTotalPrice)/100}}
            </div>
            <div class="col-sm-3" style="margin: 11px 0px 0px -90px">总金额折扣:
              <input @input="couponPriceInput()" v-model="paysPrice.dataCouponPrice" type="text" class="charge_input_conpus">
              <span style="color: #66ABD4; margin-left: 5px">折</span>
            </div>
            <div class="col-sm-3" style="margin: 10px 0px 0px 0px">总金额折后价:
              <span style="color: #ED6777; font-size: 18px">￥{{parseInt(paysPrice.dataPayPrice)/100}}</span>
            </div>
            <div class="col-sm-3" style="margin-top: 12px; float: right; margin-right: -40px;">
              <button @click="print()" type="button" class="charge_print">打印收费单{{chargeConfirmData}}</button>
              <button type="button" class="charge_confirm" data-toggle="modal" data-target="#doctor_charge_pay" data-backdrop="static">确认收费</button>
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
          dataCouponPrice: '',
          feeDetailOrdIdStrs: [],
          registerOrderId: '',
        },
      }
    },

    components:{
      doctor_charge_pay,
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

      //打折计算
      couponPriceInput: function () {
        if (this.paysPrice.dataCouponPrice >= 1 && this.paysPrice.dataCouponPrice <= 9) {
          this.paysPrice.dataPayPrice = this.paysPrice.dataTotalPrice*(this.paysPrice.dataCouponPrice/10);
        }else{
          this.paysPrice.dataPayPrice = this.paysPrice.dataTotalPrice;
          this.paysPrice.dataCouponPrice = '';
        }
      },

      selectCheckboxBtnClick: function (index,table_item,event) {
        let e = $(event.currentTarget);
        if (e.is(':checked')){
          this.paysPrice.dataTotalPrice += parseInt(table_item.totalPrice);
        }else{
          this.paysPrice.dataTotalPrice -= parseInt(table_item.totalPrice);
        }
        this.couponPriceInput();
      },

      requestData: function () {
        var that = this;
        this.$api.get(this, this.$requestApi.chargeWaitConfirm+this.registerOrderId, '', function (data) {
          if(data.body.code == '00'){
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
      },
    },
  }
</script>
