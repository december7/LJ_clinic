<template>
  <!--模态弹窗开始--个人信息-->
      <div class="add_body"  >
        <div class="fixed-div">
        <div class="tc-title-div">退货单</div>
        <button type="button" class="btn_close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;" @click="returnPage">
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
                      <div class="input-group-btn">
                        <input   :disabled=" goodsType"   data-toggle="dropdown" type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入选择供应商" v-model="suppliersData.supplierName"  @focus="getSuppliers(suppliersData.supplierName)" @input="getSuppliers(suppliersData.supplierName)">
                        <ul  v-show="suppliersList.length>0"  class="attopic dropdown-menu" style="width: 100%" >
                          <li @click="selectSuppliers(titleItem)" v-for="(titleItem, index) in suppliersList">
                            <a  class="no-padding" style="text-align: center">{{titleItem.supplierName}}</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">退货员:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input   :disabled=" goodsType"   type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.operatorName">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">退货员电话:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input   :disabled=" goodsType"   type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.billId">
                    </div>
                  </div>

                  <div   class="no-padding col-md-12 procurement_form-div_margin">
                    <div   class=" col-md-1 pull-left no-padding left_text_tips"> 备注 </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-11' " style="padding-right: 23px">
                      <input  type="text"  class="form-control gray-bg input_circular_corner" v-model="suppliersData.remark">

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div><h3>退货明细</h3></div>
          <div class="col-md-12 no-padding"  style="margin-bottom: 20px; ">
            <table class="table no-margins text-center white-bg">
              <thead>

              <tr >
                <th  v-for="(item,index) in procurement"  v-if="!getTitleShow(goodsType,procurement,index) "  class=" l_border text-center top_border right_border" style="border-bottom: none;">{{item.name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="gradeC"   v-for="(goodsItem, index) in goodDatas"   :class=" {'bottom_border':goodsId[1]==2}">
                <td class="text-center  l_border" ><span @focus="getFocus(goodsItem, 1)" @blur="loseFocus(goodsItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;">{{++index}}</span></td>

                <td  :class="goodsItem.focus && currentFocusIndex == 2 ? 'focus_border' : 'l_border' "  class="text-center  l_border">
                  <input  :disabled=" goodsType" @focus="getFocus(goodsItem, 2)" @blur="loseFocus(goodsItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="goodsItem.prodName">
                </td>
                <td  :class="goodsItem.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' " class="text-center " ><span @focus="getFocus(goodsItem, 3)" @blur="loseFocus(goodsItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;" >{{goodsItem.prodSpec}}</span></td>
                <td  :class="goodsItem.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' " class="text-center " ><span @focus="getFocus(goodsItem, 3)" @blur="loseFocus(goodsItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;" >{{goodsItem.supplierName}}</span></td>
                <td  :class="goodsItem.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' " class="text-center " ><span @focus="getFocus(goodsItem, 3)" @blur="loseFocus(goodsItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;" >{{goodsItem.batchNumber}}</span></td>
                <td  :class="goodsItem.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' " class="text-center " ><span @focus="getFocus(goodsItem, 3)" @blur="loseFocus(goodsItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;" >{{$stringUtils.dateFormat(goodsItem.expireDate)}}</span></td>
                <td :class="goodsItem.focus && currentFocusIndex == 6? 'focus_border' : 'l_border' "  class="   text-center"><span @focus="getFocus(goodsItem, 6)" @blur="loseFocus(goodsItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto; width: 100%;" >{{$enumeration.getGoodsPrice(goodsItem.stockPrice)}} </span></td>
                <td :class="goodsItem.focus && currentFocusIndex == 6? 'focus_border' : 'l_border' "  class="   text-center"><span @focus="getFocus(goodsItem, 6)" @blur="loseFocus(goodsItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto; width: 100%;" >{{ goodsItem.surplusStockNum}} </span></td>
                <td :class="goodsItem.focus && currentFocusIndex == 8 ? 'focus_border' : 'l_border' "   class="   text-center"><input :disabled=" goodsType" @focus="getFocus(goodsItem, 8)" @blur="loseFocus(goodsItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="goodsItem.retreatNum"  @input="getPrice(goodsItem)"> </td>
                <td :class="goodsItem.focus && currentFocusIndex == 9 ? 'focus_border' : 'l_border' " class="   text-center"><span @focus="getFocus(goodsItem, 9)" @blur="loseFocus(goodsItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"> {{$enumeration.getProjectUnit(goodsItem.prodUnit)}}</span></td>
                <td :class="goodsItem.focus && currentFocusIndex == 10 ? 'focus_border' : 'l_border' "  class=" right_border  text-center"><input :disabled=" goodsType" @focus="getFocus(goodsItem, 10)" @blur="loseFocus(goodsItem)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="goodsItem.remark"> </td>
                <td   v-if="!goodsType" class="l_border text-center right_border" @click="deleteProcurements"    ><a class="un_skip_link">删除</a></td>
              </tr>

              <tr id="add_cure_line"  v-if="goodsId[1]!=2">
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
          <div  ><h3 >退货金额: {{totalPrices}}</h3></div>
        </div>
        <button style='margin: 30px 10px 30px 335px;' class='form-btn-black' @click="compileGoods"  v-if="goodsId[1]!=2" :disabled="isDisabled" >完成</button>
        <button class='layui-layer-close form-btn-white' data-dismiss="modal" @click="returnPage"  v-if="goodsId[1]!=2">{{no}}取消</button>
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
      selectGoods
    },
    created(){
    },
    computed : {
      no(){
        this.goodsId = this.$store.getters.getCompileSuppliersNo;
        console.log(this.goodsId);
        if (this.goodsId != "" && this.goodsId.length == 2) {
          this.getViewGoodDatas();
        }

        return "";
      },
      goodsType(){
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
        goodsId:[],
        totalPrices:0,
        assist_inquiry_show: false,
        isDisabled: false,
        assist_inquiry_showed:false,
        currentFocusIndex:0,
        focus: false,
        suppliersData:{
          supplierName:"",
          supplierId:"",
          operatorName:localStorage.getItem(this.$names.AUTH_ACCESS_USER_OPERATOR_NAME),
          billId:localStorage.getItem(this.$names.AUTH_ACCESS_USER_BILLID),
          remark:""
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
        goodDatas:[ ],
      }
    },



    methods: {
      getTitleShow:function(goodsType,procurement,index){
        return goodsType&&procurement.length-1==index;
      },
      getPrice: function (storageItem) {
        let storageNum=   storageItem  .retreatNum;
        let purchasePrice=   storageItem  .stockPrice;
        let that=this;
        if (storageNum>0&&purchasePrice>0){
          storageItem.storageItemPrice=  ( storageNum* purchasePrice/100).toFixed(2);
        }else {
          storageItem.storageItemPrice=0;
        }
        that.totalPrice();
      },
      getViewGoodDatas:function () {
        console.log("调用");
        let that=this;
        this.$api.get(that,that.$requestApi.stockView + that.goodsId[0] ,{}, function (data) {
          if (data.body.code == '00') {
            that.goodDatas=data.body.prods;
            that.suppliersData=data.body.data;
            that.$nextTick(() => {
              for (let i in  that. goodDatas){
                that.getPrice( that. goodDatas[i])
              }
              that.totalPrice();
            });
          } else {
            swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
          }

        }, function (err) {
          swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

        });
      },
      totalPrice:function(){
        let that=this;
        let datas= that.goodDatas;
        let totalPrice= 0;
        for (let i=0,j=datas.length;i<j;i++){
          console.error("datas"+datas[i].storageItemPrice);
          if (typeof datas[i].storageItemPrice !="undefined"){
            totalPrice   +=Number(datas[i].storageItemPrice);
          }
        }
        that.totalPrices=totalPrice.toFixed(2);

      },
      selectSuppliers:function (data) {
        this.suppliersData.supplierName = data.supplierName;
        this.suppliersData.supplierId = data.supplierId;
      },
      getSuppliers:function (supplierName) {
        var that=this;

        this.$api.get(this, this.$requestApi.supplierSearch,{supplierNameOrContactName:supplierName},function  (data) {
          if(data.body.code=='00'){
            that.suppliersList = data.body.data;

          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
      },
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
      compileGoods:function () {
        let that=this;
        let prods=[];
        console.log(JSON.stringify(that.goodDatas));
        for (let i in that.goodDatas){
          prods.push({
            pstockDetailId :that.goodDatas[i].pstockDetailId,
            retreatNum :that.goodDatas[i].retreatNum,
            prodId :that.goodDatas[i].prodId,
            batchNumber :that.goodDatas[i].batchNumber,
          });
        }
        let  data={
          billId:that.suppliersData.billId,
          operatorName:that.suppliersData.operatorName,
          remark:that.suppliersData.remark,
          supplierId:that.suppliersData.supplierId,
          supplierName:that.suppliersData.supplierName,
          operatorId:localStorage.getItem(that.$names.AUTH_ACCESS_USER_OPERATOR_ID),
          prods:JSON.stringify(prods),
          totalPrice:  (that.totalPrices*100).toFixed(0),
        };
        let url=  that.goodsId==""?that.$requestApi.createCancel:that.$requestApi.updateCancel+that.goodsId[0];
        that.isDisabled=true;
        this.$api.post(that,url ,data, function (data) {
          that.isDisabled=false;

          if (data.body.code == '00') {
            swal({   title: data.body.msg,   text: "", type: "success",  timer: 2000,   showConfirmButton: false });
            that.returnPage();
          } else {
            swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
          }

        }, function (err) {
          that.isDisabled=false;

          swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

        });

      },
      getFocus:function (item, focusIndex) {
        this.currentFocusIndex = focusIndex;
        item.focus = true;
      },
      pwLoseFocus:function () {
        this.pwInputState = true;
      },
      returnPage:function(){
        this.$store.dispatch('medicine_compile_suppliers_no',  "");
      this.$router.back();
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
      selectSuppliersItem:function (selectedIndex) {
        this.suppliersIndex = selectedIndex;
        console.log( this.suppliersIndex);
      },
      deleteProcurements: function (currentIndex) {
        this.goodDatas.splice(currentIndex, 1);
      },

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
