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
          <div><h3>入库明细 <a data-toggle="modal" data-target="#selectProcurement" @click="selectProcurement" style="border-bottom:1px solid #23527c ; margin-left: 12px;font-size: 14px;    padding-bottom: 2px;">提取采购单</a></h3> </div>
          <div class="col-md-12 no-padding" style="margin-bottom: 20px; ">
            <table class="table no-margins text-center white-bg">
              <thead>

              <tr  :class="{'bottom_border': auditContent.length==0}">
                <th  v-for="(item,index) in procurement" :class="{right_border:index==procurement.length-1}"  class=" l_border text-center top_border" style="border-bottom: none;">{{item.name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="gradeC"   v-for="(storageItem, index) in auditContent"  :class=" {'bottom_border':goodsId[1]==2}" >
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
                <td :class="storageItem.focus && currentFocusIndex == 4? 'focus_border' : 'l_border' " class="  text-center"><span @focus="getFocus(storageItem, 4)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" >{{storageItem.prodSpec}}</span></td>
                <td :class="storageItem.focus && currentFocusIndex == 5? 'focus_border' : 'l_border' "class="   text-center" ><span @focus="getFocus(storageItem, 5)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;" >{{storageItem.supplierName}} </span></td>
                <td :class="storageItem.focus && currentFocusIndex == 6? 'focus_border' : 'l_border' "  class="   text-center"><span @focus="getFocus(storageItem, 6)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto; width: 100%;" >{{$enumeration.getProjectUnit(storageItem.prodUnit)}}</span> </td>
                <td :class="storageItem.focus && currentFocusIndex == 7 ? 'focus_border' : 'l_border' " class="   text-center"><input @focus="getFocus(storageItem, 7)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="storageItem.purchaseNum" > </td>
                <td  :class="storageItem.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' " class="text-center " ><input @focus="getFocus(storageItem, 3)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="storageItem .storageNum" @input="getPrice(storageItem)"></td>
                <td :class="storageItem.focus && currentFocusIndex == 8 ? 'focus_border' : 'l_border' "   class="   text-center"><input @focus="getFocus(storageItem, 8)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%; " v-model="storageItem.purchasePrice" @input="getPrice(storageItem)"> </td>
                <td :class="storageItem.focus && currentFocusIndex == 10 ? 'focus_border' : 'l_border' "  class="   text-center"><input @focus="getFocus(storageItem, 10)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text"  style="height: auto;width: 100%;"  v-model="storageItem.batchNumber"></td>
                <td :class="storageItem.focus && currentFocusIndex == 9 ? 'focus_border' : 'l_border' " class="   text-center"  >
                  <div   id="data_2">
                    <div class="input-group date">
                      <span class="input-group-addon " style="display: none;"><i class="fa fa-calendar"></i></span>
                      <input @focus="getFocus(storageItem, 9)" @blur="loseFocus(storageItem)" class="  gray-bg form-control white-bg no-padding text-center no-borders" type="text"  id="expireDate" >
                    </div>
                  </div>
                </td>

                <td :class="storageItem.focus && currentFocusIndex == 11? 'focus_border' : 'l_border' "  class="   text-center"><span style="height: auto;width: 100%;"> {{ storageItem.storageItemPrice}}</span></td>
                <td   :class="storageItem.focus && currentFocusIndex == 12? 'focus_border' : 'l_border'  " class="   text-center"><input @focus="getFocus(storageItem, 12)" @blur="loseFocus(storageItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="storageItem.remark"> </td>
                <td  class="l_border text-center right_border" @click="deleteProcurements(index)"    ><a class="un_skip_link">删除</a></td>
              </tr>

              <tr id="add_cure_line"v-show="goodsId[1]!=2">
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
          <div  ><h3 >入库金额:  {{totalPrices}}</h3></div>
        </div>
        <button style='margin: 30px 10px 30px 335px;' class='form-btn-black' @click="createProcurementStorage">完成</button>
        <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消{{no}}</button>
          </div>
          <div class="add_body_bottom" ></div>
        </div>
        <select-procurement :procurementDatas="procurementDatas"></select-procurement>
      </div>
</template>

<script>
import selectProcurement from 'components/page/medicine/popup/selectProcurement.vue'
  export default {
    components :{selectProcurement},
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


    },
    data(){
      return {
        totalPrices:0,
        goodsId:[],
        procurementDatas:[],
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
      totalPrice:function(){
        let that=this;
        let datas= that.auditContent;
        let totalPrice= 0;
        for (let i=0,j=datas.length;i<j;i++){
          console.error("datas"+datas[i].storageItemPrice);
          if (typeof datas[i].storageItemPrice !="undefined"){
            totalPrice   +=Number(datas[i].storageItemPrice);
          }
        }
        that.totalPrices=totalPrice.toFixed(2);
        return totalPrice.toFixed(2);

      },
      selectProcurement:function () {
        let that=this;
        that.$api.get(that,that.$requestApi.stockSearch + that.$enumerationType.procurementType ,{state:1}, function (data) {
          if (data.body.code == '00') {
            that.procurementDatas=data.body.data;
          } else {
            swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
          }
        }, function (err) {
          swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

        });
      },
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
        console.error(JSON.stringify(storageItem));
        let storageNum=   storageItem  .storageNum;
        let purchasePrice=   storageItem  .purchasePrice;
        let that=this;
        if (storageNum>0&&purchasePrice>0){
          storageItem.storageItemPrice=  ( storageNum* purchasePrice).toFixed(2);
        }else {
          storageItem.storageItemPrice=0;
        }
        that.totalPrice();
        return storageItem. storageItemPrice;
      },
      getViewProcurement:function () {
        let that=this;
        this.$api.get(that,that.$requestApi.stockView + that.goodsId[0] ,{}, function (data) {
          if (data.body.code == '00') {
            that.procurementStorageData.contactName=data.body.data.contactName;
            that.procurementStorageData.contactPhone=data.body.data.contactPhone;
            that.procurementStorageData.supplierId=data.body.data.supplierId;
            that.procurementStorageData.operatorId=data.body.data.operatorId;
            that.procurementStorageData.supplierName=data.body.data.supplierName;
            that.procurementStorageData.remark=data.body.data.remark;
            that.procurementStorageData.operatorName=data.body.data.operatorName;
            that.procurementStorageData.billId=data.body.data.billId;
            that.auditContent =data.body.prods;
            that.$nextTick(() => $('[id=expireDate]').each(function (index) {
              console.log("expireDate");
              $(this).val(that.$stringUtils.dateFormat(that.auditContent[index].expireDate ));
              that.auditContent[index].purchasePrice= that.$enumeration.getGoodsPrice( that.auditContent[index].purchasePrice);
              that. auditContent.splice(index, 1,  that.auditContent[index]);
              that.getPrice(that.auditContent[index]);
            }));
            that.$nextTick(() =>that.datepickerDate());
          } else {
            swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
          }
        }, function (err) {
          swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

        });
      },
     getViewGoods:function (index) {
        let that=this;
        this.$api.get(that,that.$requestApi.stockView + that.procurementDatas[index]. ostockId ,{}, function (data) {
          if (data.body.code == '00') {
            that.procurementStorageData.contactName=data.body.data.operatorName;
            that.procurementStorageData.contactPhone=data.body.data.billId;
            that.procurementStorageData.supplierName=data.body.data.supplierName;
            that.procurementStorageData.supplierId=data.body.data.supplierId;
            let price= that.auditContent.length;
          for (let i in   data.body.prods){
            that.auditContent.push(data.body.prods[i]);
          }

          for (let i=price ,j=that.auditContent.length;i<j;i++){
              that.auditContent[i].storageItemPrice=0;
              that.auditContent[i].purchasePrice=  that.$enumeration.getGoodsPrice( that.auditContent[i].purchasePrice);

            }
            console.log(JSON.stringify(that.auditContent));

            that.$nextTick(() =>that.datepickerDate());
          } else {
            swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
          }
        }, function (err) {
          swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

        });
      },

      createProcurementStorage:function () {
        let that=this;
        that.procurementStorageData.totalPrice=that.totalPrices*100;
        that.procurementStorageData.prods=that.auditContent;
        let  prods=[];
        for (let i in that.auditContent){
          console.log("that.auditContent[i].remark"+that.auditContent[i].remark);
        prods.push({
          prodId:that.auditContent[i].prodId,
          batchNumber:that.auditContent[i].batchNumber,
          purchaseDetailId:that.auditContent[i].purchaseDetailId,
          storageNum:that.auditContent[i].storageNum,
          purchaseNum:that.auditContent[i].purchaseNum,
          purchasePrice:that.auditContent[i].purchasePrice*100,
          remark:that.auditContent[i].remark,
          expireDate:"",
        })
        }
        $('[id=expireDate]').each(function (index) {
          prods[index].expireDate =$(this).val();
        });
        that.procurementStorageData.prods=JSON.stringify(prods);
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
        itemData.batchNumber = data.approvalNumber;
      },
      selectSuppliers:function (data) {
       this.procurementStorageData.supplierId = data.supplierId;
       this.procurementStorageData.supplierName = data.supplierName;
          this.suppliersList=[];
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
      deleteProcurements: function (currentIndex) {
        console.log("currentIndex"+currentIndex);
        this.auditContent.splice(currentIndex, 1);
        this.totalPrice();
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
