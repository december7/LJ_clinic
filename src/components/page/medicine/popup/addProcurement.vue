<template>
  <!--采购单-->
      <div class="add_body">
        <div class="fixed-div">
        <div class="tc-title-div">采购单</div>
        <button type="button" class="btn_close" @click="returnPage" style="margin: 11.5px 15px 0 0;"> <a>返回上一级</a></button>
       </div>
        <!--弹窗详细内容-->
        <div class="common-body">
          <div class="common-height-40f9" ></div>
          <div class="common-body-white">
        <div >
          <div class="col-md-12 no-padding">
            <div class="ibox-content no-borders no_top_padding">
              <div  class="form-horizontal m-l-md">
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">采购员:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input :disabled=" goodsType"  type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.operatorName">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">采购员电话:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input :disabled=" goodsType" type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.billId">
                    </div>
                  </div>
                <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                  <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">供应商:</div>
                  <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                    <div class="input-group-btn">
                      <input :disabled=" goodsType" data-toggle="dropdown" type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入选择供应商" v-model="suppliersData.supplierName"  @focus="getSuppliers(suppliersData.supplierName)" @input="getSuppliers(suppliersData.supplierName)">
                      <ul v-show="suppliersList.length>0" class="attopic dropdown-menu" style="width: 100%" >
                        <li @click="selectSuppliers(titleItem)" v-for="(titleItem, index) in suppliersList">
                          <a  class="no-padding" style="text-align: center">{{titleItem.supplierName}}</a>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

                  <div   class="no-padding col-md-12 procurement_form-div_margin">
                    <div   class=" col-md-1 pull-left no-padding left_text_tips"> 备注 </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-11' " style="padding-right: 23px">
                      <input  :disabled=" goodsType" type="text"  class="form-control gray-bg input_circular_corner" v-model="suppliersData.remark">

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div><h3>采购明细</h3></div>
          <div class="col-md-12 no-padding" style="margin-bottom: 20px; ">
            <table class="table no-margins text-center white-bg">
              <thead>

              <tr  :class="{'bottom_border': procurementDatas.length==0}">
                <th  v-for="(item,index) in procurement"   v-if="!getTitleShow(goodsType,procurement,index) "  class=" right_border l_border text-center top_border" style="border-bottom: none;">{{item.name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="gradeC"   v-for="(procurementData, index) in procurementDatas"  :class=" {'bottom_border':goodsId[1]==2}">
                <td class="text-center  l_border" ><span   class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;">{{++index}}</span></td>

                <td  :class="procurementData.focus && currentFocusIndex == 2 ? 'focus_border' : 'l_border' "  class="text-center  l_border">
                  <input :disabled=" goodsType" @input="getGoodsData(procurementData.prodName)"  @focus="getFocus(procurementData, 2)" @blur="loseFocus(procurementData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="procurementData.prodName">
                  <div v-show="procurementData.focus " class="list_menu goods-margin-left5 attopic">
                    <ul class="no-margins">
                      <li @mousedown="selectChinesePrescription(data, procurementData)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.prodName}} </a></li>
                    </ul>
                  </div>
                </td>
                <td  :class="procurementData.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border'" class="text-center " ><span @focus="getFocus(procurementData, 3)" @blur="loseFocus(procurementData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;" >{{procurementData.prodSpec}}</span></td>
                <td :class="procurementData.focus && currentFocusIndex == 4? 'focus_border' : 'l_border' " class="  text-center"><span @focus="getFocus(procurementData, 4)" @blur="loseFocus(procurementData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;">{{procurementData.manufacturer}}</span></td>
                <td  :class="procurementData.focus && currentFocusIndex == 5? 'focus_border' : 'l_border' "class="   text-center" ><span class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;" > {{$enumeration.getProjectUnit(procurementData.prodUnit)}}</span></td>
                <td  :class="procurementData.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' " class="text-center " ><span @focus="getFocus(procurementData, 3)" @blur="loseFocus(procurementData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;" >{{$enumeration. getGoodsPrice(procurementData. lastPrice )}}</span></td>
                <td  :class="procurementData.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' " class="text-center " ><span @focus="getFocus(procurementData, 3)" @blur="loseFocus(procurementData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;" >{{$enumeration. getGoodsPrice(procurementData.minimumPrice)}}</span></td>
                <td :class="procurementData.focus && currentFocusIndex == 8 ? 'focus_border' : 'l_border' "   class="   text-center"><span @focus="getFocus(procurementData, 8)" @blur="loseFocus(procurementData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;">{{$enumeration. getGoodsPrice(procurementData.retailPrice)}}</span></td>
                <td :class="procurementData.focus && currentFocusIndex == 9 ? 'focus_border' : 'l_border' " class="   text-center"><input :disabled=" goodsType" @focus="getFocus(procurementData, 9)" @blur="loseFocus(procurementData)" class="form-control white-bg no-padding text-center no-borders" type="tel" style="height: auto;width: 100%;"v-model="procurementData.purchaseNum"> </td>
                <td :class="procurementData.focus && currentFocusIndex == 10 ? 'focus_border' : 'l_border' "  class="   text-center"><input :disabled=" goodsType" @focus="getFocus(procurementData, 10)" @blur="loseFocus(procurementData)" class="form-control white-bg no-padding text-center no-borders" type="tel" style="height: auto;width: 100%;"v-model="procurementData.purchasePrice"  /> </td>
                <td :class="procurementData.focus && currentFocusIndex == 11? 'focus_border' : 'l_border' "  class="   text-center"><span @focus="getFocus(procurementData, 11)" @blur="loseFocus(procurementData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;" > {{getPrice(procurementData)}}</span></td>
                <td  :class="procurementData.focus && currentFocusIndex == 12? 'focus_border' : 'l_border' " class="  right_border  text-center"><span @focus="getFocus(procurementData, 12)" @blur="loseFocus(procurementData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;" >{{procurementData.remark}} </span></td>
                <td  v-if="!goodsType" class="l_border text-center right_border" @click="deleteProcurements"    ><a class="un_skip_link">删除</a></td>
              </tr>

              <tr id="add_cure_line"  v-if="goodsId[1]!=2" >
                <td class=" bottom_border l_border text-center" colspan="2" @click="addProcurement" id="addProcurement"><a class="un_skip_link">添加商品</a>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"> </td>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class="  bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" l_border bottom_border right_border text-center"></td>
              </tr>


              </tbody>

            </table>

          </div>

            <div  ><h3 >采购金额:{{typeof totalPrice=="number"?"":totalPrice}}</h3></div>
        </div>
        <button style='margin: 30px 10px 30px 335px;' class='form-btn-black' @click="compileProcurement"v-if="goodsId[1]!=2" :disabled="isDisabled" >完成</button>
        <button class='layui-layer-close form-btn-white' data-dismiss="modal"  v-if="goodsId[1]!=2" @click="returnPage">取消{{no}}</button>
          </div>
          <div class="add_body_bottom" ></div>
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
        isDisabled:false,
        currentFocusIndex:0,
        focus: false,
        suppliersData:{
          supplierName:"",
          supplierId:"",
          operatorName:localStorage.getItem(this.$names.AUTH_ACCESS_USER_OPERATOR_NAME),
          billId:localStorage.getItem(this.$names.AUTH_ACCESS_USER_BILLID),
          remark:"",
          totalPrice:"",

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
          {  name:"最近采购价(元)",},
          {  name:"最低采购价(元)",},
          {  name:"零售价(元)"},
          {  name:"采购数量"},
          {  name:"采购价(元)"},
          {  name:"采购金额(元)"},
          {  name:"备注"},
          {  name:"操作"},
        ],
        procurementDatas:[  ],
        goodsId:[]
      }
    },

    computed : {
      no(){
        this. goodsId=  this.$store.getters.getCompileSuppliersNo;
        console.log(  this. goodsId);
        if (this.goodsId!=""&&this.goodsId.length==2 ) {
          this.getViewProcurement();
        }

        return "";

      },

      totalPrice(){
        let that=this;
        let datas= that.procurementDatas;
        let totalPrice= 0;
        for (let i=0,j=datas.length;i<j;i++){
          totalPrice   +=Number(datas[i].procurementMoney);
        }
        return totalPrice.toFixed(2);
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
     mounted:function () {
     },
    methods: {
      getTitleShow:function(goodsType,procurement,index){
        return goodsType&&procurement.length-1==index;
      },
      getViewProcurement:function () {
        let that=this;
        this.$api.get(that,that.$requestApi.stockView + that.goodsId[0] ,{}, function (data) {
          if (data.body.code == '00') {
            that.procurementDatas=data.body.prods;
            for(let i in  that.procurementDatas ){
              that.procurementDatas[i].focus=false;
              that.procurementDatas  [i].purchasePrice= that.$enumeration. getGoodsPrice(that.procurementDatas [i].purchasePrice);
            }
            that.suppliersData=data.body.data;

          } else {
            swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
          }

        }, function (err) {
            swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

        });
      },
      compileProcurement:function () {
        let that=this;
        let prods=[];
        console.log(JSON.stringify(that.procurementDatas));
        for (let i in that.procurementDatas){
          prods.push({
           purchaseNum :that.procurementDatas[i].purchaseNum,
           prodId :that.procurementDatas[i].prodId,
           purchasePrice :(that.procurementDatas[i].purchasePrice*100).toFixed(0),
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
          totalPrice:  (that.totalPrice*100).toFixed(0),
        };
        that.isDisabled=true;
       let url=  that.goodsId==""?that.$requestApi.createPurchase:that.$requestApi.updatePurchase+that.goodsId[0];
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
      getPrice: function (procurementDatas) {
        let storageNum=   procurementDatas  .purchaseNum;
        let purchasePrice=   procurementDatas  .purchasePrice;

        if (storageNum>0&&purchasePrice>0){
          procurementDatas.procurementMoney= ( storageNum* purchasePrice).toFixed(2);
          return  procurementDatas.procurementMoney;
        }else {
          return 0;
        }
      },
      getFocus:function (item, focusIndex) {
        this.currentFocusIndex = focusIndex;
        item.focus = true;
      },
      pwLoseFocus:function () {
        this.pwInputState = true;
      },
      returnPage: function () {
        console.log("returnPage");
//        this.$store.dispatch('medicine_add_goods', "addReturnedGoods.vue" + Math.random());
        this.$store.dispatch('medicine_compile_suppliers_no',  "");
        this.$router.back();
      },
      selectChinesePrescription:function (data, itemData) {
        itemData.prodName = data.prodName;
        itemData.prodId = data.prodId;
        itemData.retailPrice = data.retailPrice;
        itemData.prodSpec = data.prodSpec;
        itemData.manufacturer = data.manufacturer;
        itemData.prodUnit = data.prodUnit;
        itemData.minimumPrice = data.minimumPrice;
        itemData.lastPrice = data.lastPrice;
        itemData.remark = data.remark;
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
      getGoodsData:function (goodsName) {

        var that=this;
        if (goodsName==""){
          that.goodsDatas[index].prodName="";
          that.goodsDatas[index].prodId="";
          that.goodsDatas[index].prodSpec="";
          that.goodsDatas[index].retailPrice="";
          that.goodsDatas[index].manufacturer="";
          that.goodsDatas[index].prodUnit="";
          that.goodsDatas[index].minimumPrice=0;
          that.goodsDatas[index].lastPrice="";
          that.goodsDatas[index].remark="";
          that.goodsDatas[index].focus=false;
          that. goodsDatas.splice(index, 1,  that.goodsDatas[index]);
          return;
        }
        this.$api.get(this, this.$requestApi.goodsHistory,{prodNameOrGenericNameOrEnglishName:goodsName,state:1},function  (data) {
          if(data.body.code=='00'){
            that.dataList = data.body.data;
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
        this.procurementDatas.splice(currentIndex, 1);
      },
      addProcurement:function () {
        this.procurementDatas.push( {
          prodName:"",
          prodSpec:"",
          manufacturer:"",
          prodUnit:"",
          recentlypurchasePrice:"",
          lowestpurchasePrice:"",
          retailPrice:"",
          purchaseNum:"",
          purchasePrice:"",
          procurementMoney:"",
          remark:"",
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

  .input_circular_left_radius{
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
  .input_circular_right_radius{
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }

  .add_body_bottom{
     background: #F9F9F9;
    height: 20px;
  }
  .goods-margin-left5{
    margin-left: 5%;
  }
</style>
