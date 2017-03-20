<template>
  <div class="modal inmodal fade" id="doctor_charge_pay" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg" style="width: 500px;">
      <div class="modal-content">
        <div class="tc-title-div">收费</div>
        <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
          aria-hidden="true">&times;</span></button>
        <div class="hr-tcline"></div><!--分隔线-->
        <!--内容-->
        <div style="margin:20px 20px 0px 20px">
          <div>应收金额:<span style="color:#ED6777; font-size:20px; vertical-align: middle;"> ¥ {{paysPrice.dataPayPrice}} </span></div>
          <div style="margin-top:10px">合计金额: ¥ {{paysPrice.dataTotalPrice}}</div>
          <div style="margin-top:10px; margin-bottom:20px;">优惠金额: ¥ {{paysPrice.dataTotalPrice-paysPrice.dataPayPrice}}</div>

          <div class="hr-tcline"></div><!--分隔线-->

          <div class="col-sm-12" style="margin-top:15px">
            <div class="col-sm-3">
              <input v-model="paysType" type="radio" name="payType" value="1" style="margin:0px 8px 0px -20px"> 现金
            </div>
            <div class="col-sm-3">
              <input v-model="paysType" type="radio" name="payType" value="2" style="margin:0px 8px 0px -20px"> 微信
            </div>
            <div class="col-sm-3">
              <input v-model="paysType" type="radio" name="payType" value="3" style="margin:0px 8px 0px -20px"> 支付宝
            </div>
            <div class="col-sm-3">
              <input v-model="paysType" type="radio" name="payType" value="4" style="margin:0px 8px 0px -20px"> 银行卡
            </div>
          </div>

          <div class="col-sm-12" style="margin-top:20px">
            <div class="col-sm-6" style="font-size: 18px; margin-left: -15px">
              实收(元): <input v-model="inputPrice" type="text" class="chargePrice">
            </div>
            <div class="col-sm-6" style="font-size: 18px">
              找零(元): ¥ {{inputPrice > 0 ? inputPrice-paysPrice.dataPayPrice : 0}}
            </div>
          </div>

          <div style="text-align:center; margin:100px 0px 20px 0px">
            <button @click="payBtnClicked()" class="modalOKBtn">确认收费</button>
            <button data-dismiss="modal" class="modalCancelBtn">取消</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .modalOKBtn{
    width:100px;
    height:28px;
    background-color: #324367;
    color: white;
    border: 1px solid #324367;
    border-radius: 2px;
  }
  .modalCancelBtn{
    width:100px;
    height:28px;
    background-color: white;
    color: #324367;
    border: 1px solid #324367;
    border-radius: 2px;
  }
  .chargePrice{
    width: 100px;
    height: 30px;
    background-color: #E5E6E7;
    border: none;
    text-align: center;
  }
</style>

<script>
  export default {
    data(){
      return {
        paysType: '1',
        inputPrice: '',
      }
    },
    props: {
			paysPrice:{
				default: ""
			},
		},
    methods: {
      payBtnClicked: function () {

        if (this.inputPrice == ''){
          swal({title:"请输入支付金额",text:"",type: "error",timer:2000,showConfirmButton:false});
          return;
        }

        this.sendPayRequest();
        console.log("发起支付");
      },
      sendPayRequest: function () {
        var that = this;
        var params = {
          depositRate:'',
          feeDetailOrdIdStrs:JSON.stringify(this.paysPrice.feeDetailOrdIdStrs),
          payAmount:this.paysPrice.dataPayPrice,
          payType:this.paysType
        };
        this.$api.post(this, this.$requestApi.chargeSendPayRequest+this.paysPrice.registerOrderId, params, function (data) {
          if(data.body.code == '00'){
            swal({title:data.body.msg,text:"",type:"success",timer:2000,showConfirmButton:false});
            $("#doctor_charge_pay").modal('hide');
            that.$parent.back();
            console.log(data.body.data);
          } else {
            swal({title:data.body.msg,text:"",type: "error",timer:2000,showConfirmButton:false});
            console.log(data.body.msg);
          }}, function (err) {
          console.log(err);
        });
      },
    },
  }
</script>
