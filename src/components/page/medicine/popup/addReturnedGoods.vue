<template>
  <!--模态弹窗开始--个人信息-->
      <div class="add_body"  >
        <div class="fixed-div">
        <div class="tc-title-div">退货单</div>
        <button type="button" class="btn_close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;" @click="addGoods">
          <a>返回上一级</a></button>
      </div>
        <!--详细内容-->
        <div class="common-body">
          <div class="common-height-40f9" ></div>
          <div class="common-body-white">
        <div >
          <div class="col-md-12 no-padding">
            <div class="ibox-content no-borders no_top_padding">
              <div  class="form-horizontal m-l-md">
                <div class="form-group">

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">供应商:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input   @input="getSuppliers(1)" type="text"  class="form-control gray-bg input_circular_corner" v-model="suppliersData.suppliers">
                      <div v-show="suppliersList.length>0" class="list_menu" style=" margin: auto;">
                        <ul class="no-margins">
                          <li @mousedown="selectSuppliers(data)" class="item_list_normal" v-for="(data, index) in suppliersList"><a>{{data.drugName}} </a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">退货员:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input  type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.purchaser">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">退货员电话:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input  type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.purchaserPhone">
                    </div>
                  </div>

                  <div   class="no-padding col-md-12 procurement_form-div_margin">
                    <div   class=" col-md-1 pull-left no-padding left_text_tips"> 备注 </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-11' " style="padding-right: 23px">
                      <input  type="text"  class="form-control gray-bg input_circular_corner">

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div><h3>退货明细</h3></div>
          <div class="col-md-12 no-padding">
            <table class="table no-margins text-center white-bg">
              <thead>

              <tr >
                <th  v-for="(item,index) in procurement" :class="{right_border:index==procurement.length-1}"  class=" l_border text-center top_border" style="border-bottom: none;">{{item.name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="gradeC"   v-for="(chinese_prescription_item, index) in auditContent" >
                <td class="text-center  l_border" ><input @focus="getFocus(chinese_prescription_item, 1)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;"v-model="chinese_prescription_item.no"></td>

                <td  :class="chinese_prescription_item.focus && currentFocusIndex == 2 ? 'focus_border' : 'l_border' "  class="text-center  l_border">
                  <input  @input="getDataList(1)"  @focus="getFocus(chinese_prescription_item, 2)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="chinese_prescription_item.procurementName">
                  <div v-show="chinese_prescription_item.focus " class="list_menu">
                    <ul class="no-margins">
                      <li @mousedown="selectChinesePrescription(data, chinese_prescription_item)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.drugName}} </a></li>
                    </ul>
                  </div>
                </td>
                <td  :class="chinese_prescription_item.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' " class="text-center " ><input @focus="getFocus(chinese_prescription_item, 3)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="chinese_prescription_item.procurementSpecification"></td>
                <td :class="chinese_prescription_item.focus && currentFocusIndex == 4? 'focus_border' : 'l_border' " class="  text-center"><input @focus="getFocus(chinese_prescription_item, 4)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;"v-model="chinese_prescription_item.procurementFactory"></td>
                <td  :class="chinese_prescription_item.focus && currentFocusIndex == 5? 'focus_border' : 'l_border' "class="   text-center" ><input @focus="getFocus(chinese_prescription_item, 5)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="chinese_prescription_item.procurementUnits"> </td>
                <td :class="chinese_prescription_item.focus && currentFocusIndex == 6? 'focus_border' : 'l_border' "  class="   text-center"><input @focus="getFocus(chinese_prescription_item, 6)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto; width: 100%;"v-model="chinese_prescription_item.recentlyProcurementPrice"> </td>
                <td :class="chinese_prescription_item.focus && currentFocusIndex == 8 ? 'focus_border' : 'l_border' "   class="   text-center"><input @focus="getFocus(chinese_prescription_item, 8)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="chinese_prescription_item.retailPrice"> </td>
                <td :class="chinese_prescription_item.focus && currentFocusIndex == 9 ? 'focus_border' : 'l_border' " class="   text-center"><input @focus="getFocus(chinese_prescription_item, 9)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="chinese_prescription_item.procurementQuantity"> </td>
                <td :class="chinese_prescription_item.focus && currentFocusIndex == 10 ? 'focus_border' : 'l_border' "  class="   text-center"><input @focus="getFocus(chinese_prescription_item, 10)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="chinese_prescription_item.procurementPrice"> </td>
                <td :class="chinese_prescription_item.focus && currentFocusIndex == 11? 'focus_border' : 'l_border' "  class="   text-center"><input @focus="getFocus(chinese_prescription_item, 11)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="chinese_prescription_item.procurementMoney"> </td>
                <td  :class="chinese_prescription_item.focus && currentFocusIndex == 12? 'focus_border' : 'l_border' " class="   text-center"><input @focus="getFocus(chinese_prescription_item, 12)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="chinese_prescription_item.procurementRemarks"> </td>
                <td  class="l_border text-center right_border" @click="deleteProcurements"    ><a class="un_skip_link">{{chinese_prescription_item.procurementOperation}}</a></td>
              </tr>

              <tr id="add_cure_line">
                <td class=" bottom_border l_border text-center"   id="addProcurement"><a type="button"  data-toggle="modal" data-target="#selectGoods">选择商品</a>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"> </td>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class="  bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class="  bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" l_border bottom_border right_border text-center"></td>
              </tr>

              </tbody>
            </table>

          </div>
        </div>
        <button style='margin: 30px 10px 30px 335px;' class='form-btn-black'>完成</button>
        <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
          </div>
          <div class="add_body_bottom" ></div>
        </div>
        <select-goods></select-goods>

      </div>
</template>

<script>
  import selectGoods from "components/page/medicine/popup/selectGoods.vue";
  export default {
    components:{
      selectGoods},
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
          {  name: '序号',},
          {  name:"商品名称",},
          {  name:"规格",},
          {  name:"生产厂家",},
          {  name:"批号",},
          {  name:"有效期",},
          {  name:"采购价(元)"},
          {  name:"库存数量"},
          {  name:"退货数量"},
          {  name:"退货单位"},
          {  name:"备注"},
          {  name:"操作"},
        ],
        auditContent:[  ],
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
      addGoods:function () {
              console.log("addGoods");
        this.$store.dispatch('medicine_add_goods', "addReturnedGoods.vue"+Math.random());
        this.$router.replace('/medicine/returned_goods');
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
      getSuppliers:function (type) {
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
            that.suppliersList = data.body.data;
            console.log(JSON.stringify(that.dataList));
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
      },

      selectSuppliersItem:function (selectedIndex) {
        this.suppliersIndex = selectedIndex;
        console.log( this.suppliersIndex);
      },
      deleteProcurements: function (currentIndex) {
        this.auditContent.splice(currentIndex, 1);
      },
      addProcurement:function () {

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
  .add_body{
    width: 100%;
    height: 100%;
    background: white;
  }
</style>
