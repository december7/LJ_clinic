<template>
  <!--模态弹窗开始--个人信息-->
      <div class="add_body">
        <div class="fixed-div">
        <div class="tc-title-div">入库单</div>
        <button type="button" class="btn_close" @click="returnPage"  style="margin: 11.5px 15px 0 0;"> <a>返回上一级</a></button>
       </div>
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
                      <input   @input="getSupplierName()" type="text"  class="form-control gray-bg input_circular_corner" v-model="procurementStorageData.supplierName">
                      <div v-show="suppliersList.length>0" class="list_menu" style=" margin: auto; width: 100%">
                        <ul class="no-margins">
                          <li @mousedown="selectSuppliers(data)" class="item_list_normal" v-for="(data, index) in suppliersList"><a>{{data.supplierName}} </a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">采购员:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input  type="text"  class="form-control gray-bg input_circular_corner"  v-model="procurementStorageData.contactName">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">采购员电话:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input  type="text"  class="form-control gray-bg input_circular_corner"  v-model="procurementStorageData.contactPhone">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">入库员:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input  type="text"  class="form-control gray-bg input_circular_corner"  v-model="procurementStorageData.operatorName">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">入库员电话:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input  type="text"  class="form-control gray-bg input_circular_corner"  v-model="procurementStorageData.billId">
                    </div>
                  </div>

                  <div   class="no-padding col-md-12 procurement_form-div_margin">
                    <div   class=" col-md-1 pull-left no-padding left_text_tips"> 备注 </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-11' " style="padding-right: 23px">
                      <input  type="text"  class="form-control gray-bg input_circular_corner" placeholder="请输入备注" v-model="procurementStorageData.remark" >

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div><h3>入库明细</h3></div>
          <div class="col-md-12 no-padding" style="margin-bottom: 20px; ">
            <table class="table no-margins text-center white-bg">
              <thead>

              <tr >
                <th  v-for="(item,index) in procurement" :class="{right_border:index==procurement.length-1}"  class=" l_border text-center top_border" style="border-bottom: none;">{{item.name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="gradeC"   v-for="(storageItem, index) in auditContent" :class="{ bottom_border:goodsType}" >
                <td class="text-center  l_border" >
                  <span   class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;">{{getIndex(index)}}</span></td>
                <td  :class="storageItem.focus && currentFocusIndex == 2 ? 'focus_border' : 'l_border' "  class="text-center  l_border">
                  <input  @input="searchRequest(storageItem.procurementName)"  @focus="getFocus(storageItem,2)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="storageItem.prodName">
                  <div v-show="storageItem.focus " class="list_menu">
                    <ul class="no-margins">
                      <li @mousedown="selectChinesePrescription(data, storageItem)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.prodName}} </a></li>
                    </ul>
                  </div>
                </td>
                <td :class="storageItem.focus && currentFocusIndex == 4? 'focus_border' : 'l_border' " class="  text-center"><input @focus="getFocus(storageItem, 4)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;"v-model="storageItem.prodSpec"></td>
                <td :class="storageItem.focus && currentFocusIndex == 5? 'focus_border' : 'l_border' "class="   text-center" ><input @focus="getFocus(storageItem, 5)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="storageItem.supplierName"> </td>
                <td :class="storageItem.focus && currentFocusIndex == 6? 'focus_border' : 'l_border' "  class="   text-center"><input @focus="getFocus(storageItem, 6)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto; width: 100%;"v-model="storageItem.prodUnit"> </td>
                <td :class="storageItem.focus && currentFocusIndex == 7 ? 'focus_border' : 'l_border' " class="   text-center"><input @focus="getFocus(storageItem, 7)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="storageItem.purchaseNum"> </td>
                <td  :class="storageItem.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' " class="text-center " ><input @focus="getFocus(storageItem, 3)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="storageItem .storageNum "></td>
                <td :class="storageItem.focus && currentFocusIndex == 8 ? 'focus_border' : 'l_border' "   class="   text-center"><input @focus="getFocus(storageItem, 8)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="storageItem.purchasePrice"> </td>
                <td :class="storageItem.focus && currentFocusIndex == 10 ? 'focus_border' : 'l_border' "  class="   text-center"><input @focus="getFocus(storageItem, 10)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text"  style="height: auto;width: 100%;" v-model="storageItem.batchNumber"> </td>
                <td :class="storageItem.focus && currentFocusIndex == 9 ? 'focus_border' : 'l_border' " class="   text-center"  >
                  <div   id="data_2">
                    <div class="input-group date">
                      <span class="input-group-addon " style="display: none;"><i class="fa fa-calendar"></i></span>
                      <input @focus="getFocus(storageItem, 9)" @blur="loseFocus(storageItem)" class="  gray-bg form-control white-bg no-padding text-center no-borders" type="text"  id="expireDate" >
                    </div>
                  </div>
                </td>

                <td :class="storageItem.focus && currentFocusIndex == 11? 'focus_border' : 'l_border' "  class="   text-center"><span style="height: auto;width: 100%;"> {{getPrice(storageItem)}}</span></td>
                <td   :class="storageItem.focus && currentFocusIndex == 12? 'focus_border' : 'l_border'  " class="   text-center"><input @focus="getFocus(storageItem, 12)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="storageItem.remark"> </td>
                <td  class="l_border text-center right_border" @click="deleteProcurements"    ><a class="un_skip_link">{{storageItem.procurementOperation}}</a></td>
              </tr>

              <tr id="add_cure_line" v-if="!goodsType">
                <td class=" bottom_border l_border text-center"  @click="addProcurement" id="addProcurement"><a class="un_skip_link">添加商品</a>
                <td class=" bottom_border l_border text-center"> </td>
                <td class=" bottom_border l_border text-center"> </td>
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
          <div  ><h3 >入库金额:{{totalPrice}}</h3></div>
        </div>
        <button style='margin: 30px 10px 30px 335px;' class='form-btn-black' @click="createProcurementStorage">完成</button>
        <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消{{no}}</button>
          </div>
          <div class="add_body_bottom" ></div>
        </div>
      </div>
</template>

<script>

  export default {
    created(){

      console.log("=="+this.$store.getters.getOperatorId);
      console.log("=="+localStorage.getItem("AUTH_ACCESS_USER_OPERATOR_ID"));
      console.log("=="+localStorage.getItem("AUTH_ACCESS_USER_OPERATOR_NAME"));
      console.log("=="+localStorage.getItem("AUTH_ACCESS_USER_BILLID"));

    },
    mounted: function () {
   this.datepickerDate();
    },
    computed : {
      no(){
        this. goodsId=  this.$store.getters.getCompileSuppliersNo;
        console.log(  this. goodsId);
        if (this.goodsId!=""&&this.goodsId.length==2 ) {
          this.getViewProcurement();
        }

        return "";
      },goodsType(){
        let  goodsId=  this.$store.getters.getCompileSuppliersNo;
        if (goodsId!=""&&goodsId.length==2 ) {
          console.log("goodsId"+goodsId[1]);
         return goodsId[1]==2;
        }

        return false;
      },
      totalPrice(){
        let that=this;
        let datas= that.auditContent;
        let totalPrice= 0;
        that.procurementStorageData.totalPrice=0;
        for (let i=0,j=datas.length;i<j;i++){
          totalPrice   +=Number(datas[i].storageItemPrice);
        }
       return totalPrice;
      }


    },
    data(){
      return {
        goodsId:[],
        datepickerData:{
          todayBtn: "linked",
          keyboardNavigation: false,
          forceParse: false,
          calendarWeeks: false,
          autoclose: true,
          todayHighlight: true,
          enable:true,
          language: "zh-CN",
          minDate: 0,
          format:"yyyy/mm/dd",
        },
        assist_inquiry_show: false,
        assist_inquiry_showed:false,
        currentFocusIndex:0,
        focus: false,
        procurementStorageData:{
          contactName:"",
          contactPhone:"",
          supplierId:"",
          operatorId:localStorage.getItem("AUTH_ACCESS_USER_OPERATOR_ID"),
          supplierName:"",
          remark:"",
          operatorName:localStorage.getItem("AUTH_ACCESS_USER_OPERATOR_NAME"),
          billId:localStorage.getItem("AUTH_ACCESS_USER_BILLID"),
          prods:[]
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
          {  name:"单位",},
          {  name:"采购数量",},
          {  name:"到货数量",},
          {  name:"采购价(元)"},
          {  name:"批号"},
          {  name:"有效期"},
          {  name:"采购金额(元)"},
          {  name:"备注"},
          {  name:"操作"},
        ],
        auditContent:[ ],
        auditContentLength:1,
        goodsIndex:0
      }
    },



    methods: {
      getIndex:function (index) {
        return  this.goodsIndex=++index;
      },
      change_phone: function () {
        this.inputState=false;
      },
      datepickerDate: function () {
        $('#data_2 .input-group.date').datepicker(this.datepickerData);
      },
      change_password: function () {
        this.pwInputState=false;
      },
      getPrice: function (storageItem) {
        let storageNum=   storageItem  .storageNum;
        let purchasePrice=   storageItem  .purchasePrice;

        if (storageNum>0&&purchasePrice>0){
          storageItem.storageItemPrice=  storageNum* purchasePrice;
          return storageItem. storageItemPrice;
        }else {
          return 0;
        }
      },
      getViewProcurement:function () {
        let that=this;
        this.$api.get(that,that.$requestApi.stockView + that.goodsId[0] ,{}, function (data) {
          if (data.body.code == '00') {
            that.procurementStorageData=data.body.data;
            that.auditContent =data.body.prods;
            $('[id=expireDate]').each(function (index) {
              $(this).val(that.auditContent[index].expireDate );
            });
          } else {
            swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
          }
        }, function (err) {
          swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

        });
      },

      createProcurementStorage:function () {
        let that=this;
        that.procurementStorageData.totalPrice=that.totalPrice;
        that.procurementStorageData.prods=that.auditContent;
        for (let i=0,j=that.procurementStorageData.prods.length;i<j;i++){
          let prod=that.procurementStorageData.prods[i];
          delete  prod['no'];
          delete prod['focus'];
          delete prod['procurementOperation'];
          delete prod['storageItemPrice'];
        }
        $('[id=expireDate]').each(function (index) {
          that.procurementStorageData.prods[index].expireDate =$(this).val();
        });
        that.procurementStorageData.prods=JSON.stringify(that.procurementStorageData.prods);
//        that.goodsId[1]==2
        console.log("that.goodsId"+that.goodsId);
        that.$api.post(that, that.goodsId==""?that.$requestApi.stockCreate:that.$requestApi.stockUpdateInbound+that.goodsId[0],that.procurementStorageData ,function  (data) {
          if(data.body.code=='00'){
            that.returnPage();
            swal({   title: data.body.msg,   text: "", type: "success",  timer: 2000,   showConfirmButton: false });


          }else{
            swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
      },
      loseFocus:function (item) {
        item.focus = false;
        this.dataList = [];
      },

      getFocus:function (item, focusIndex) {
        this.currentFocusIndex = focusIndex;
        item.focus = true;
      },
      pwLoseFocus:function () {
        this.pwInputState = true;
      },
      searchRequest:function (procurementName) {
        let that=this;
        that.$api.get(that,that.$requestApi.goodsSearch,{state:1, iDisplayLength:that.iDisplayLength,supplierNameOrContactName:procurementName},function  (data) {
          if(data.body.code=='00'){
            that.dataList=data.body.data
            that.$store.dispatch('setPageCount',Math.ceil(Number(data.body.iTotalRecords)/that.iDisplayLength));
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
      },
      selectChinesePrescription:function (data, itemData) {
        itemData.prodName = data.prodName;
        itemData.prodSpec = data.prodSpec;
        itemData.supplierName = data.supplierName;
        itemData.prodId = data.prodId;
        itemData.prodUnit = data.prodUnit;
//        itemData.costPrice = data.costPrice;
        itemData.batchNumber = data.batchNumber;
        itemData.remark = data.remark;
      },
      selectSuppliers:function (data) {
       this.procurementStorageData.supplierId = data.supplierId;
       this.procurementStorageData.supplierName = data.supplierName;
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
      getSupplierName:function () {
        let that = this;
        this.$api.get(that, that.$requestApi.goodsSupplierQuery ,{ supplierNameOrContactName:that.procurementStorageData.supplierName}, function (data) {
          if (data.body.code == '00') {
            that.suppliersList=data.body.data;

          } else {
            console.log(data.body.msg);
          }

        }, function (err) {
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
      returnPage: function () {
//        console.log("returnPage");
//        this.$store.dispatch('medicine_add_goods', "addReturnedGoods.vue" + Math.random());
//        this.$router.replace('/medicine/procurement_storage');
        this.$store.dispatch('medicine_compile_suppliers_no',  "");
        this.$router.back();
      },
      addProcurement:function () {
        this.auditContent.push( {
          no: this.auditContentLength ++ ,
          storageItemPrice:0,
          procurementOperation:"删除",
          focus: false
        });
        this.$nextTick(() =>this.datepickerDate());
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
</style>
