<template>
    <div   >
      <div class="add_body"  >
        <div class="tc-title-div">{{compileAuditContent.title}}</div>
        <button type="button" class="btn_close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;" @click="returnAudit">
          <a>返回上一级</a></button>
        <div class="hr-tcline"></div>
        <!--弹窗详细内容-->
        <div class="add_procurement_body">
          <div class="col-md-12 no-padding">
            <div class="ibox-content no-borders no_top_padding">
              <div  class="form-horizontal m-l-md">
                <div class="form-group">

                  <div  v-if="compileAuditContent.suppliers" :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">{{compileAuditContent.suppliers}}:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input   @input="getSuppliers(1)" type="text"  data-toggle="dropdown"   class="form-control gray-bg input_circular_corner" v-model="suppliersData.suppliers">
                      <ul  v-show="suppliersList.length>0" class="attopic dropdown-menu" style="width: 100%" >
                        <li @mousedown="selectSuppliers(titleItem)" v-for="(titleItem, index) in suppliersList">
                          <a  class="no-padding" style="text-align: center">{{titleItem.supplierName}}</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">{{compileAuditContent.purchaser}}:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input  type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.purchaser">
                    </div>
                  </div>
                  <div  :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">{{compileAuditContent.purchaserPhone}}:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input  type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.purchaserPhone">
                    </div>
                  </div>
                  <div v-if="compileAuditContent.storage" :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">{{compileAuditContent.storage}}:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input  type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.purchaserPhone">
                    </div>
                  </div>
                  <div  v-if="compileAuditContent.storagePhone" :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">{{compileAuditContent.storagePhone}}:</div>
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
          <div><h3>{{compileAuditContent.details}}</h3></div>
          <div class="col-md-12 no-padding">
            <table class="table no-margins text-center white-bg">
              <thead>

              <tr >
                <th  v-for="(item,index) in compileAuditContent.tableNames" :class="{right_border:index==compileAuditContent.tableNames.length-1}"  class=" l_border bottom_border text-center top_border" style="border-bottom: none;">{{item.name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="gradeC"   v-for="(chinese_prescription_item, index) in auditContent"   >
                <td class="text-center  bottom_border l_border" ></td>
                <td class="text-center  bottom_border l_border" ></td>
                <td class="text-center  bottom_border l_border" ></td>
                <td class="text-center  bottom_border l_border" ></td>
                <td class="text-center  bottom_border l_border" ></td>
                <td class="text-center  bottom_border l_border" ></td>
                <td class="text-center  bottom_border l_border" ></td>
                <td class="text-center  bottom_border l_border" ></td>
                <td class="text-center  bottom_border l_border" ></td>
                <td class="text-center  bottom_border l_border" ></td>
                <td class="text-center  bottom_border l_border" ></td>

                <td  class="l_border text-center bottom_border right_border"     ></td>
              </tr>


              </tbody>
            </table>

          </div>
        </div>
        <button style='margin: 30px 10px 30px 335px;' class='form-btn-black' :disabled="isDisabled" >完成</button>
        <button class='layui-layer-close form-btn-white' data-dismiss="modal" >取消</button>
      </div>
    </div>
</template>

<script>
  export default {
    components:{
    },
    created(){
    },

    data(){
      return {
        assist_inquiry_show: false,
        isDisabled:false,
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
        compileAuditContents:[
          {
            title:"采购单",
            suppliers:"供应商",
            purchaser:"采购员",
            purchaserPhone:"采购员电话",
            details:"采购明细",
            tableNames:[
              {  name: '序号',},
              {  name:"商品名称",},
              {  name:"规格",},
              {  name:"生产厂家",},
              {  name:"单位",},
              {  name:"最近采购价(元)",},
              {  name:"最低采购价(元)",},
              {  name:"零售价(元)",},
              {  name:"采购数量",},
              {  name:"采购价(元)",},
              {  name:"采购金额(元)"},
              {  name:"备注"},
            ]
          },    {
            title:"入库单",
            suppliers:"供应商",
            purchaser:"采购员",
            purchaserPhone:"采购员电话",
            storage:"入库员",
            storagePhone:"入库员电话",
            details:"入库明细",
            tableNames:[
              {  name: '序号',},
              {  name:"商品名称",},
              {  name:"规格",},
              {  name:"生产厂家",},
              {  name:"单位",},
              {  name:"采购数量",},
              {  name:"到货数量",},
              {  name:"采购价(元)",},
              {  name:"批号"},
              {  name:"有效期"},
              {  name:"采购金额(元)"},
              {  name:"备注"},
            ]
          },    {
            title:"出库单",
            purchaser:"出库员",
            purchaserPhone:"出库员电话",
            details:"出库明细",
            tableNames:[
              {  name: '序号',},
              {  name:"商品名称",},
              {  name:"规格",},
              {  name:"生产厂家",},
              {  name:"库存数量",},
              {  name:"零售价(元)",},
              {  name:"成本价(元)",},
              {  name:"出库数量",},
              {  name:"出库单位",},
              {  name:"备注"},
            ]
          },    {
            title:"退货单",
            suppliers:"供应商",
            purchaser:"退货员",
            purchaserPhone:"退货员电话",
            details:"退货明细",
            tableNames:[
              {  name: '序号',},
              {  name:"商品名称",},
              {  name:"规格",},
              {  name:"生产厂家",},
              {  name:"批号",},
              {  name:"有效期",},
              {  name:"采购价",},
              {  name:"库存数量",},
              {  name:"退货数量",},
              {  name:"退货单位",},
              {  name:"备注"},
            ]
          },    {
            title:"盘点单",
            purchaser:"盘点员",
            purchaserPhone:"盘点员电话",
            details:"盘点差异记录",
            tableNames:[
              {  name: '序号',},
              {  name:"商品名称",},
              {  name:"规格",},
              {  name:"生产厂家",},
              {  name:"批号",},
              {  name:"有效期",},
              {  name:"单位",},
              {  name:"库存数量",},
              {  name:"零售价(元)",},
              {  name:"实盘",},
              {  name:"差异数量",},
              {  name:"差异金额(元)",},
              {  name:"备注"},
              {  name:"操作"},
            ]
          },
          ]

      }
    },

    computed : {

      compileAuditContent(){
     var  selectedIndex  =this.$store.getters.getSelectedIndex
      return this.compileAuditContents[selectedIndex]
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
      returnAudit:function () {
        this.$store.dispatch('medicine_add_goods', "addReturnedGoods.vue"+Math.random());
        this.$router.replace('/medicine/audit');
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

</style>
