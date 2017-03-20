<template>

      <div class="add_body"  >
        <div class="fixed-div">
        <div class="tc-title-div">盘点</div>
        <button type="button" class="btn_close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;" @click="returnPage">
          <a>返回上一级</a></button>
          </div>
        <div class="common-body">
          <div class="common-height-40f9" ></div>
          <div class="common-body-white">
        <!--弹窗详细内容-->
        <div >
          <div class="col-md-12 no-padding">
            <div class="ibox-content no-borders no_top_padding">
              <div  class="form-horizontal m-l-md">
                <div class="form-group">


                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">盘点人员:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input  type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.purchaser">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">盘点员电话:</div>
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
          <div><h3>盘点差异记录</h3></div>
          <div class="col-md-12 no-padding add_inventory_bottom">
            <table class="table no-margins text-center white-bg">
              <thead>

              <tr   >
                <th  v-for="(item,index) in procurement" :class="{right_border:index==procurement.length-1}"  class=" l_border   text-center top_border" style="border-bottom: none;">{{item.name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="gradeC"   v-for="(auditContent, index) in auditContents" >

                <td class="text-center  l_border" >{{auditContent.orderNumber}}</td>
                <td class="text-center  l_border" >{{auditContent.goodsName}}</td>
                <td class="text-center  l_border" >{{auditContent.specification}}</td>
                <td class="text-center  l_border" >{{auditContent.lotNumber}}</td>
                <td class="text-center  l_border" >{{auditContent.lotNumber}}</td>
                <td class="text-center  l_border" >{{auditContent.lotNumber}}</td>
                <td class="text-center  l_border" >{{auditContent.lotNumber}}</td>
                <td class="text-center  l_border" >{{auditContent.lotNumber}}</td>
                <td class="text-center  l_border" >{{auditContent.lotNumber}}</td>
                <td class="text-center  l_border" >{{auditContent.expiryDate}}</td>
                <td class="text-center  l_border" >{{auditContent.onhand}}</td>
                <td class="text-center  l_border" >{{auditContent.purchasePrice}}</td>
                <td class="text-center  l_border" >{{auditContent.sellingPrice}}</td>

                <td  class="l_border text-center right_border" @click="deleteProcurements(index)"    ><a class="un_skip_link">删除 </a></td>
              </tr>

              <tr id="add_cure_line">
                <td class=" bottom_border l_border text-center"   id="addProcurement"><a type="button"  data-toggle="modal" data-target="#selectGoods">选择商品</a>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"> </td>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
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
          <div  ><h3 >盘损金额:-1000.00</h3></div>
        </div>
        <button style='margin: 30px 10px 30px 335px;' class='form-btn-black' >完成</button>
        <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
          </div>
          <div style="background: #F9F9F9; height: 20px" ></div>
        </div>
        <select-goods></select-goods>
      </div>


</template>

<script>
  import selectGoods from "components/page/medicine/popup/selectGoods.vue";
  export default {

      components: {
        selectGoods
      },
      created(){
      },

      data(){
        return {
          assist_inquiry_show: false,
          assist_inquiry_showed: false,
          currentFocusIndex: 0,
          focus: false,
          suppliersData: {
            suppliers: "",
            purchaser: "",
            purchaserPhone: ""

          },
          suppliersList: [],
          suppliersItems: [
            {titleName: '西药'},
            {titleName: '中药'},
          ],
          dataList: [],
          suppliersIndex: 0,
          procurement: [
            {name: '序号',},
            {name: "商品名称",},
            {name: "规格",},
            {name: "生产厂家",},
            {name: "批号",},
            {name: "有效期",},
            {name: "单位"},
            {name: "库存数量"},
            {name: "零售价(元)"},
            {name: "实盘"},
            {name: "差异数量"},
            {name: "差异金额(元)"},
            {name: "备注"},
            {name: "操作"},
          ],
        }
      },


      methods: {
        change_phone: function () {
          this.inputState = false;
        },
        change_password: function () {
          this.pwInputState = false;
        },

        loseFocus: function (item) {
          item.focus = false;
          this.dataList = [];
        },
        returnPage: function () {
          console.log("returnPage");

          this.$store.dispatch('medicine_add_goods', "addReturnedGoods.vue" + Math.random());
          this.$router.replace('/medicine/inventory');
        },
        getFocus: function (item, focusIndex) {
          this.currentFocusIndex = focusIndex;
          item.focus = true;
        },
        pwLoseFocus: function () {
          this.pwInputState = true;
        },

        selectChinesePrescription: function (data, itemData) {
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
        selectSuppliers: function (data) {
          this.suppliersData.suppliers = data.drugName;
          this.suppliersData.purchaser = data.price;
          this.suppliersData.purchaserPhone = data.price;
          this.suppliersList = [];
        },

        getDataList: function (type) {
          var that = this;
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

          this.$api.get(this, url, "", function (data) {
            if(data.body.code == '00'){
              that.dataList = data.body.data;
              console.log(JSON.stringify(that.dataList));
            } else {
              console.log(data.body.msg);
            }

          }, function (err) {
            console.log(err);

          });
        },
        getSuppliers: function (type) {
          var that = this;
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

          this.$api.get(this, url, "", function (data) {
            if(data.body.code == '00'){
              that.suppliersList = data.body.data;
              console.log(JSON.stringify(that.dataList));
            } else {
              console.log(data.body.msg);
            }

          }, function (err) {
            console.log(err);

          });
        },

        selectSuppliersItem: function (selectedIndex) {
          this.suppliersIndex = selectedIndex;
          console.log(this.suppliersIndex);
        },
        deleteProcurements: function (index) {
          this.$store.dispatch('medicine_select_delete_goods',  index);


        },
        addProcurement: function () {

        }

      },

    computed: {
      auditContents: function () {
        console.log(this.$store.getters.getSelectGoods);
        return this.$store.getters.getSelectGoods;

      },
    }
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
  .add_inventory_bottom{
    margin-bottom: 15px;
  }
</style>
