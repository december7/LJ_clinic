<template>
  <!--采购单-->
  <div class="modal inmodal fade" id="selectGoods" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg" style="width: 1000px;">
      <div class="modal-content">
        <div class="tc-title-div">选择商品</div>
        <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
          aria-hidden="true">&times;</span></button>
        <div class="hr-tcline"></div>
        <!--弹窗详细内容-->
        <div class="add_procurement_body">
          <div class="col-md-12 no-padding">
            <div class="ibox-content no-borders no_top_padding">
              <div  class="form-horizontal m-l-md">
                <div class="form-group">

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">商品名称:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input   @input="getSuppliers()" type="text"  class="form-control gray-bg input_circular_corner" v-model="suppliersData.suppliers">
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="col-md-12 no-padding">
            <table class="table no-margins text-center white-bg">
              <thead>

              <tr >
                <th  v-for="(item,index) in procurement" :class="{right_border:index==procurement.length-1}"  class=" l_border bottom_border text-center top_border" style="border-bottom: none;">{{item.name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="gradeC"   v-for="(chinese_prescription_item, index) in auditContent" >
                <td    class="text-center l_border  bottom_border " >
                  <div class="checkbox checkbox-info goods_checkbox ">
                  <input  :index="index" type="checkbox" :checked="chinese_prescription_item.selectFlag" >
                </div></td>
                <td    class="text-center l_border  bottom_border " >{{chinese_prescription_item.orderNumber}}</td>
                <td    class="text-center l_border  bottom_border " >{{chinese_prescription_item.goodsName}}</td>
                <td    class="text-center l_border  bottom_border " >{{chinese_prescription_item.specification}}</td>
                <td    class="text-center l_border  bottom_border " >{{chinese_prescription_item.manufacturer}}</td>
                <td    class="text-center l_border  bottom_border " >{{chinese_prescription_item.lotNumber}}</td>
                <td    class="text-center l_border  bottom_border " >{{chinese_prescription_item.expiryDate}}</td>
                <td    class="text-center l_border  bottom_border " >{{chinese_prescription_item.onhand}}</td>
                <td    class="text-center l_border  bottom_border " >{{chinese_prescription_item.purchasePrice}}</td>
                <td    class="text-center l_border  bottom_border right_border " >{{chinese_prescription_item.sellingPrice}}</td>
                 </tr>
              </tbody>
            </table>

          </div>
        </div>
        <button style='margin: 30px 10px 30px 335px;' class='form-btn-black' data-dismiss="modal" @click="accomplish">完成</button>
        <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
      </div>
      <!--<div  class="modal-content"></div>-->
    </div>
  </div>
</template>

<script>
  export default {
    created(){
    },

    data(){
      return {
        assist_inquiry_show: false,
        assist_inquiry_showed:false,
        currentFocusIndex:0,
        focus: false,
        suppliersData:{
          suppliers:"",
          purchaser:"",
          purchaserPhone:""

        },
        suppliersList:[],
        suppliersItems: [
          {titleName: '西药'},
          {titleName: '中药'},
        ],
        dataList: [],
        suppliersIndex: 0,
        procurement:[
          {  name: '选择',},
          {  name: '序号',},
          {  name:"商品名称",},
          {  name:"规格",},
          {  name:"生产厂家",},
          {  name:"批号",},
          {  name:"有效期",},
          {  name:"库存数量",},
          {  name:"采购价(元)"},
          {  name:"销售价(元)"},
        ],
        auditContent:[],
      }
    },



    methods: {
      change_phone: function () {
        this.inputState=false;
      },
      change_password: function () {
        this.pwInputState=false;
      },

      loseFocus:function (item) {
        item.focus = false;
        this.dataList = [];
      },
      getInputSelect:function (index) {
        console.log(index);
      },
      getFocus:function (item, focusIndex) {
        this.currentFocusIndex = focusIndex;
        item.focus = true;
      },
      pwLoseFocus:function () {
        this.pwInputState = true;
      },

      selectChinesePrescription:function (data, itemData) {
        itemData.procurementName = data.drugName;
        itemData.retailPrice = data.price;
        itemData.recentlyProcurementPrice = data.price;
        itemData.lowestProcurementPrice = data.price;
        itemData.procurementQuantity = data.price;
        itemData.procurementUnits = data.unit;
        itemData.procurementManufacturer = data.unit;
        itemData.procurementOperation = data.state;
        itemData.dosage = data.dosage;
        itemData.recentlyProcurementPrice = data.repertory;
      },
      selectSuppliers:function (data) {
       this.suppliersData.suppliers = data.drugName;
          this.suppliersData.purchaser = data.price;
          this.suppliersData.purchaserPhone = data.price;
          this.suppliersList=[];
      },

      getDataList:function (type) {
        var that=this;
        var url = '';
        if (type == 0) {//治疗
          url = this.$requestApi.cureInfo;
        } else if (type == 1) {// 中药处方
          url = this.$requestApi.chinesePrescription;
        } else if (type == 2) {//西药处方
          url = this.$requestApi.westernMedicine;
        } else if (type == 3) {//其他收费
          url = this.$requestApi.otherCharge;
        }

        this.$api.get(this, url,"",function  (data) {
          if(data.status=='200'){
            that.dataList = data.body.data;
            console.log(JSON.stringify(that.dataList));
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
      },
      getSuppliers:function () {
       this.auditContent.push({
         orderNumber:"11111",
         goodsName:"22222",
         specification:"33333",
         manufacturer:"3333",
         lotNumber:"safasdf",
         expiryDate:"sdfaf",
         onhand:"sdfaf",
         purchasePrice:"sfdaf",
         sellingPrice:"sdfa",
       });
      },
      accomplish:function () {
        var that=this;
        $("input").each(function() {
        if($(this).prop("checked") == true){
          console.log(  that.auditContent[$(this).attr('index')])

          that.$store.dispatch('medicine_select_goods',  that.auditContent[$(this).attr('index')]);
        }
        });

        this.auditContent=[];
      },

      deleteProcurements: function (currentIndex) {
        this.auditContent.splice(currentIndex, 1);
      },
      addProcurement:function () {
        this.auditContent.push( {
          no: ' ',
          procurementName:"       ",
          procurementSpecification:"                   ",
          procurementManufacturer:" ",
          procurementUnits:" ",
          recentlyProcurementPrice:" ",
          lowestProcurementPrice:"",
          retailPrice:" ",
          procurementQuantity:" ",
          procurementPrice:" ",
          procurementMoney:" ",
          procurementRemarks:" ",
          procurementOperation:"删除",
          focus: false
        });
      }

    },

  }

</script>
<style>
  .add_procurement_body{
    padding: 10px;
  }
  .procurement_form-div_margin{
    margin-bottom: 10px;
  }
  .procurement_tips_down{
    position: absolute;
    right: 10px;
    top: 15px;
  }
  .top_border{
    border-top: 1px solid #ddd !important;
  }
  .right_border{
    border-right: 1px solid #ddd !important;
  }
  .bottom_border{
    border-bottom: 1px solid #ddd !important;
  }
  .input_circular_left_radius{
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
  .input_circular_right_radius{
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
  .goods_checkbox{
    margin-top: 2px;
    margin-left: 20px;
  }
</style>
