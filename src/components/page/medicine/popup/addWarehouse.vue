<template>
    <div  >
      <div class="add_body">
        <div class="fixed-div" >
        <div class="tc-title-div">出库单</div>
        <button type="button" class="btn_close"  @click="returnPage"  style="margin: 11.5px 15px 0 0;"> <a>返回上一级</a></button>
        </div>
        <!--弹窗详细内容-->
        <div class="common-body">
          <div class="common-height-40f9" ></div>
          <div class="common-body-white">
        <div  >
          <div class="col-md-12 no-padding">
            <div class="ibox-content no-borders no_top_padding">
              <div  class="form-horizontal m-l-md">
                <div class="form-group">
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">出库员:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input  :disabled=" goodsType"  type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.operatorName">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">出库员电话:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input   :disabled=" goodsType" type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.billId" >
                    </div>
                  </div>
                  <div   class="no-padding col-md-12 procurement_form-div_margin">
                    <div   class=" col-md-1 pull-left no-padding left_text_tips"> 备注 </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-11' " style="padding-right: 23px">
                      <input   :disabled=" goodsType" type="text"  class="form-control gray-bg input_circular_corner" v-model="suppliersData.remark" >

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div><h3>出库明细</h3></div>
          <div class="col-md-12 no-padding" style="margin-bottom: 20px; ">
            <table class="table no-margins text-center white-bg">
              <thead>

              <tr >
                <th  v-for="(item,index) in procurement"   v-if="!getTitleShow(goodsType,procurement,index) "  class=" right_border l_border text-center top_border" style="border-bottom: none;">{{item.name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="gradeC" v-for="(warehouseData, index) in warehouseDatas"  :class=" {'bottom_border':goodsId[1]==2}">
                <td class="text-center l_border" ><span @focus="getFocus(warehouseData, 1)" @blur="loseFocus(warehouseData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;">{{++index}}</span></td>

                <td  :class="warehouseData.focus && currentFocusIndex == 2 ? 'focus_border' : 'l_border' "  class="text-center  l_border">
                  <input  :disabled=" goodsType"  @input="getGoodsData(warehouseData.prodName)"  @focus="getFocus(warehouseData, 2)" @blur="loseFocus(warehouseData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="warehouseData.prodName">
                  <div v-show="dataList.length>0 " class="list_menu  attopic" style="margin-left: 3%">
                    <ul class="no-margins">
                      <li @mousedown="selectChinesePrescription(data, warehouseData)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.prodName}} </a></li>
                    </ul>
                  </div>
                </td>
                <td :class="warehouseData.focus && currentFocusIndex == 6? 'focus_border' : 'l_border' "  class="   text-center"><span @focus="getFocus(warehouseData, 6)" @blur="loseFocus(warehouseData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto; width: 100%;" >{{ warehouseData.prodSpec}} </span></td>
                <td :class="warehouseData.focus && currentFocusIndex == 6? 'focus_border' : 'l_border' "  class="   text-center"><span @focus="getFocus(warehouseData, 6)" @blur="loseFocus(warehouseData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto; width: 100%;" >{{ warehouseData.manufacturer}} </span></td>
                <td :class="warehouseData.focus && currentFocusIndex == 6? 'focus_border' : 'l_border' "  class="   text-center"><span @focus="getFocus(warehouseData, 6)" @blur="loseFocus(warehouseData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto; width: 100%;" >{{ warehouseData.preStockNum}} </span></td>
                <td :class="warehouseData.focus && currentFocusIndex == 6? 'focus_border' : 'l_border' "  class="   text-center"><span @focus="getFocus(warehouseData, 6)" @blur="loseFocus(warehouseData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto; width: 100%;" >{{$enumeration. getGoodsPrice(warehouseData.retailPrice)}} </span></td>
                <td :class="warehouseData.focus && currentFocusIndex == 6? 'focus_border' : 'l_border' "  class="   text-center"><span @focus="getFocus(warehouseData, 6)" @blur="loseFocus(warehouseData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto; width: 100%;" >{{$enumeration. getGoodsPrice(warehouseData.splitPrice)}} </span></td>
                <td :class="warehouseData.focus && currentFocusIndex == 8 ? 'focus_border' : 'l_border' "   class="   text-center"><input  :disabled=" goodsType"  @focus="getFocus(warehouseData, 8)" @blur="loseFocus(warehouseData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="warehouseData.useNum"  @input="getPrice(warehouseData)"> </td>
                <td :class="warehouseData.focus && currentFocusIndex == 9 ? 'focus_border' : 'l_border' " class="   text-center">
                  <div class="input-group-btn">
                    <a data-toggle="dropdown" style="width: 100%;    border: 1px solid white;" class="form-control  "  type="button">{{ getParseValue(warehouseData,index)}}
                    </a>
                    <ul  v-show="warehouseData.splitUnitItems.length>0" class="attopic dropdown-menu" style="width: 100%" >
                      <li @click="selectProdUnitItem(i,index)" v-for="(titleItem, i) in  warehouseData.splitUnitItems">
                        <a :class="{selected_item :warehouseData.useUnit == i}" class="no-padding" style="text-align: center">{{titleItem}}</a>
                      </li>
                    </ul>
                  </div>
                </td>
                <td  :class="warehouseData.focus && currentFocusIndex == 12? 'focus_border' : 'l_border' " class="right_border   text-center"><input  :disabled=" goodsType"  @focus="getFocus(warehouseData, 12)" @blur="loseFocus(warehouseData)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;"v-model="warehouseData.remark"> </td>
                <td  v-if="!goodsType" class="l_border text-center right_border" @click="deleteProcurements"    ><a class="un_skip_link">删除</a></td>
              </tr>

              <tr id="add_cure_line"  v-if="goodsId[1]!=2">
                <td class=" bottom_border l_border text-center"  colspan="2"  @click="addProcurement" id="addProcurement"><a class="un_skip_link">添加商品</a>
                <td class=" bottom_border l_border text-center"> </td>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class="  bottom_border l_border text-center"></td>
                <td class="  bottom_border l_border text-center"></td>
                <td class=" bottom_border l_border text-center"></td>
                <td class="  bottom_border l_border text-center"></td>
                <td class=" l_border bottom_border right_border text-center"></td>
              </tr>
              </tbody>

            </table>
          </div>
          <div  ><h3 >出库金额: {{typeof totalPrices=="number"?0:totalPrices}}</h3></div>
        </div>
        <button style='margin: 30px 10px 30px 335px;' class='form-btn-black'  @click="compileWarehouse" v-if="goodsId[1]!=2"   :disabled="isDisabled">完成</button>
        <button class='layui-layer-close form-btn-white' data-dismiss="modal" v-if="goodsId[1]!=2"  @click="returnPage">取消{{no}}</button>
          </div>
          <div class="add_body_bottom" ></div>
        </div>
      </div>
      <!--<div  class="modal-content"></div>-->
    </div>
</template>

<script>

  export default {
    created(){
    },
    computed : {
      no(){
         this. goodsId=  this.$store.getters.getCompileSuppliersNo;
        console.log(" this. goodsId"+  this. goodsId);
        if (this.goodsId!=""&&this.goodsId.length==2 ) {

          this.getViewWarehouse();


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
        assist_inquiry_show: false,
        isDisabled:false,
        assist_inquiry_showed:false,
        currentFocusIndex:0,
        totalPrices:0,
        focus: false,
        suppliersData:{
          operatorName:localStorage.getItem(this.$names.AUTH_ACCESS_USER_OPERATOR_NAME),
          billId:localStorage.getItem(this.$names.AUTH_ACCESS_USER_BILLID),
          remark:"",

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
          {  name:"库存数量",},
          {  name:"零售价(元)",},
          {  name:"拆零售价(元)",},
          {  name:"出库数量"},
          {  name:"出库单位"},
          {  name:"备注"},
          {  name:"操作"},
        ],
        warehouseDatas:[  ],
        goodsId:[]
      }
    },

    methods: {
      getTitleShow:function(goodsType,procurement,index){
        return goodsType&&procurement.length-1==index;
      },
      getViewWarehouse:function () {
        let that=this;
//        console.log(" this. goodsId"+JOSN.stringify( this. goodsId));
        this.$api.get(that,that.$requestApi.stockView + that.goodsId[0] ,{}, function (data) {
          if (data.body.code == '00') {
            let  datas=data.body.prods;

            for (let index in  datas){
              datas[index].splitUnitItems=[];
              datas[index].splitUnitItems[datas[index].prodUnit]= that.$enumeration.getProjectUnit( datas[index].prodUnit);
              if ( datas[index].isSplit=="1"){
                datas[index].splitUnitItems[datas[index].splitUnit]= that.$enumeration.getProjectUnit( datas[index].splitUnit);
              }
            }
            that. warehouseDatas=datas;
            that.suppliersData=data.body.data;

            that.$nextTick(() => {
              for (let i in  that. warehouseDatas){
                that.getPrice( that. warehouseDatas[i])
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
      getPrice: function (warehouseData) {
        let  that=this;
        let useNum=   warehouseData  .useNum;
        let retailPrice=   warehouseData.retailPrice;
        let splitPrice=   warehouseData  .splitPrice;
        if (warehouseData.useUnit==warehouseData.prodUnit){
        if (useNum>0&&retailPrice>0) {
          warehouseData.procurementMoney= ( useNum* retailPrice/100).toFixed(2);
        }else {
          warehouseData.procurementMoney=0;
        }
        }else {
          if (splitPrice>0&&useNum>0) {
            warehouseData.procurementMoney= ( splitPrice* useNum/100).toFixed(2);
          }else {
            warehouseData.procurementMoney=0;
          }
        }
        that.totalPrice();

      },
      totalPrice:function(){
        let that=this;
        let datas= that.warehouseDatas;
        let price= 0;
        for (let i=0,j=datas.length;i<j;i++){
          if (typeof datas[i].procurementMoney !="undefined"){
            price+=Number(datas[i].procurementMoney);
          }
        }
        that.totalPrices=price.toFixed(2);

      },
      compileWarehouse:function () {

        let that=this;
        let prods=[];
        for (let i in that.warehouseDatas){
          console.log(that.warehouseDatas[i].useNum);
          console.log(that.warehouseDatas[i].prodId);
          console.log(that.warehouseDatas[i].useUnit);
          prods.push({
            useNum :that.warehouseDatas[i].useNum,
            prodId :that.warehouseDatas[i].prodId,
            useUnit :that.warehouseDatas[i].useUnit,
          });
        }
          console.log(JSON.stringify(prods));

        let  data={
          billId:that.suppliersData.billId,
          operatorName:that.suppliersData.operatorName,
          remark:that.suppliersData.remark,
          operatorId:localStorage.getItem(that.$names.AUTH_ACCESS_USER_OPERATOR_ID),
          prods:JSON.stringify(prods),
          totalPrice:  (that.totalPrices*100).toFixed(0),
        };
        let url=  that.goodsId==""?that.$requestApi.createOutbound:that.$requestApi.updateOutbound+that.goodsId[0];
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

      getFocus:function (item, focusIndex) {
        this.currentFocusIndex = focusIndex;
        item.focus = true;
      },
      getParseValue:function (itemData,index) {
        let that=this;
        if (this.goodsId!=""&&this.goodsId.length==2){
            return this.$enumeration.getProjectUnit(itemData.useUnit);
        }else {
          console.log("----333");
        if ( itemData.splitUnitItems.length>0||  itemData.useUnit!=''){
        return  itemData.splitUnitItems[itemData.useUnit];
        }
        }

      },
      pwLoseFocus:function () {
        this.pwInputState = true;
      },

      selectChinesePrescription:function (data, itemData) {
        itemData.prodName = data.prodName;
        itemData.prodId = data.prodId;
        itemData.costPrice = data.costPrice;
        itemData.retailPrice = data.retailPrice;
        itemData.splitPrice = data.splitPrice;
        itemData.prodSpec = data.prodSpec;
        itemData.manufacturer = data.manufacturer;
        itemData.preStockNum = data.preStockNum;
        itemData.remark = data.remark;
        itemData.prodUnit = data.prodUnit;
        itemData.splitUnit = data.splitUnit;
        itemData.splitUnitItems[data.prodUnit]= this.$enumeration.getProjectUnit( data.prodUnit);
        itemData.useUnit =data.prodUnit;
        if ( data.isSplit=="1"){
        itemData.splitUnitItems[data.splitUnit]= this.$enumeration.getProjectUnit( data.splitUnit);
        }
      },

      getGoodsData:function (goodsName) {

        var that=this;

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
      returnPage: function () {
        this.$store.dispatch('medicine_compile_suppliers_no',  "");
        this.$router.back();
      },
      selectProdUnitItem:function (selectedIndex,i) {
        console.log("selectedIndex"+selectedIndex);
        console.log("index"+index);
        let that=this;
        let index=i-1;
        that.warehouseDatas[index].useUnit=selectedIndex;
        this.getPrice(that.warehouseDatas[index]);
        that. warehouseDatas.splice(index, 1,  that.warehouseDatas[index]);
      },

      deleteProcurements: function (currentIndex) {
        this.warehouseDatas.splice(currentIndex, 1);
      },
      addProcurement:function () {
        this.warehouseDatas.push( {
          prodName:"",
          prodSpec:"",
          procurementMoney:"",
          preStockNum:"",
          costPrice:"",
          lowestProcurementPrice:"",
          splitUnitItems:{},
          useUnit:"",
          procurementQuantity:"",
          procurementRemarks:"",
          procurementOperation:"删除",
          focus: false
        });

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

  .input_circular_left_radius{
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
  .input_circular_right_radius{
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }
</style>
