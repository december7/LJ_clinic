<template>
  <div>
    <!--顶部信息栏-->
    <div class="row white-bg" style="padding: 0 20px; height: 35px">
      <div class="col-sm-12">
        <div class="ibox-title no-top-border pull-left" style="padding-left: 0;min-height: 35px;padding-top: 10px">
          <h5 v-show="data_item.isEmergency == 1" class="red-bg" style="margin: 1px 10px 0 0;">急</h5>
          <small>{{data_item.userName}}</small>
          <small class="m-l-sm">26岁 / {{data_item.userSex == 9 ? '未知' : data_item.userSex == 1 ? '男' : '女'}} / {{data_item.billId}}</small>
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
                <td class="text-center"><input class="checkbox-myblue" type="checkbox" checked="checked" disabled="disabled"></td>
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
              <div class="col-sm-3" style="margin: 16px 0px 0px -20px">
                总金额: ￥{{paysPrice.dataTotalPrice/100}}
              </div>
              <div class="col-sm-3" style="margin-top: 12px; float: right; margin-right:-130px;">
                <button @click="print()" type="button" class="charge_print">打印收费单{{chargeConfirmData}}</button>
              </div>
          </div>

          <div v-for="(pays_item,index) in pays_items" style="background-color: white;" class="col-sm-12">
            <div class="col-sm-2" style="margin: 5px 0px 5px -20px">收银员：{{pays_item.operName}}</div>
            <div class="col-sm-2" style="margin: 5px 0px 5px 0px">收费方式：{{getPayType(pays_item.payType)}}</div>
            <div class="col-sm-2" style="margin: 5px 0px 5px 0px">应收：{{(pays_item.receivableAmount/100).toFixed(2)}}</div>
            <div class="col-sm-2" style="margin: 5px 0px 5px 0px">优惠金额：{{((pays_item.receivableAmount-pays_item.payAmount)/100).toFixed(2)}}</div>
            <div class="col-sm-2" style="margin: 5px 0px 5px 0px">实收：{{(pays_item.payAmount/100).toFixed(2)}}</div>
            <div class="col-sm-2" style="margin: 5px -50px 5px 0px;">时间：{{$stringUtils.dateFormat(pays_item.doneDate)}}</div>
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

      requestData: function () {
        var that = this;
        this.$api.get(this, this.$requestApi.chargeListConfirm+this.registerOrderId, '', function (data) {
          if(data.body.code == '00'){
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
      },
    },
  }
</script>
