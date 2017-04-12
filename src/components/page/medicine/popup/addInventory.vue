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
                      <input :disabled=" goodsType"  type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.operatorName">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="procurement_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">盘点员电话:</div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input :disabled=" goodsType" type="text"  class="form-control gray-bg input_circular_corner"  v-model="suppliersData.billId">
                    </div>
                  </div>

                  <div   class="no-padding col-md-12 procurement_form-div_margin">
                    <div   class=" col-md-1 pull-left no-padding left_text_tips"> 备注 </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-11' " style="padding-right: 23px">
                      <input  :disabled=" goodsType" type="text"  class="form-control gray-bg input_circular_corner">

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
                <th  v-for="(item,index) in procurement"   v-if="!getTitleShow(goodsType,procurement,index) "    class=" l_border right_border  text-center top_border" style="border-bottom: none;">{{item.name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="gradeC"   v-for="(auditContent, index) in goodDatas"  :class=" {'bottom_border':goodsId[1]==2}" >

                <td class="text-center  l_border" >{{++index}}</td>
                <td class="text-center  l_border" >{{auditContent.prodName}}</td>
                <td class="text-center  l_border" >{{auditContent.prodSpec}}</td>
                <td class="text-center  l_border" >{{auditContent.supplierName}}</td>
                <td class="text-center  l_border" >{{auditContent.batchNumber}}</td>
                <td class="text-center  l_border" >{{$stringUtils.dateFormat(auditContent.expireDate)}}</td>
                <td class="text-center  l_border" >{{ getProdUnit(auditContent)}}</td>
                <td class="text-center  l_border" >{{getIsStockNum(auditContent)}}</td>
                <td class="text-center  l_border" >{{$enumeration.getGoodsPrice( auditContent.stockPrice) }}</td>
                <td :class="auditContent.focus && currentFocusIndex == 8 ? 'focus_border' : 'l_border' "   class="   text-center"><input :disabled=" goodsType" @focus="getFocus(auditContent, 8)" @blur="loseFocus(auditContent)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;width: 100%;" v-model="auditContent.realStockNum" @input="realStockNum(auditContent,index)"></td>
                <td class="text-center  l_border" >{{auditContent.countNum}}</td>

                <td class="text-center  l_border" >{{auditContent.countNumPrice}}</td>
                <td class="text-center  l_border right_border" >{{auditContent.remark}}</td>

                <td  v-if="!goodsType" class="l_border text-center right_border" @click="deleteProcurements(index)"    ><a class="un_skip_link">删除 </a></td>
              </tr>

              <tr id="add_cure_line"  v-if="goodsId[1]!=2">
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
          <div  ><h3 >盘损金额:{{totalPrices}}  </h3></div>
        </div>
        <button style='margin: 30px 10px 30px 335px;' class='form-btn-black' @click="compileGoods" :disabled="isDisabled">完成</button>
        <button class='layui-layer-close form-btn-white' data-dismiss="modal"  @click="returnPage">{{no}}取消</button>
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
          isDisabled: false,
          assist_inquiry_showed: false,
          currentFocusIndex: 0,
          totalPrices: 0,
          goodsId: [],
          focus: false,
          suppliersData:{
            supplierName:"",
            supplierId:"",
            operatorName:localStorage.getItem(this.$names.AUTH_ACCESS_USER_OPERATOR_NAME),
            billId:localStorage.getItem(this.$names.AUTH_ACCESS_USER_BILLID),
            remark:"",
            totalPrice:"",

          },
          suppliersList: [],
          suppliersItems: [
            {titleName: '西药'},
            {titleName: '中药'},
          ],
          goodDatas: [],
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
            {name: "入库价(元)"},
            {name: "实盘"},
            {name: "差异数量"},
            {name: "差异金额(元)"},
            {name: "备注"},
            {name: "操作"},
          ],
        }
      },


      methods: {
        getTitleShow:function(goodsType,procurement,index){
          return goodsType&&procurement.length-1==index;
        },
        change_phone: function () {
          this.inputState = false;
        },
        getProdUnit: function (auditContent) {
          let  that=this;
          if (auditContent.isSplit==1){
          return   that.$enumeration. getProjectUnit(auditContent.splitUnit)
          }else {
            return that.$enumeration. getProjectUnit(auditContent.prodUnit)
          }
        },
        getIsStockNum: function (auditContent) {
          let surplusStockNum=  auditContent.surplusStockNum;
          let splitNum=  auditContent.splitNum;
//          if( auditContent.isSplit==1){
//          return  (surplusStockNum/splitNum).toFixed(2);
//          }else {
            return surplusStockNum;
//          }
        },

        getStockPrice: function (auditContent) {
//          let stockPrice= ;
//          let splitNum=  auditContent.splitNum;
//          if( auditContent.isSplit==1){
//            splitNum.surplusStockNum/splitNum
//
//            return
//          }else {
//            return surplusStockNum;
//          }
        },
        change_password: function () {
          this.pwInputState = false;
        },
        totalPrice:function(){
          let that=this;
          let datas= that.goodDatas;
          let totalPrice= 0;
          for (let i=0,j=datas.length;i<j;i++){
            if (typeof datas[i].countNumPrice !="undefined"){
              totalPrice   +=Number(datas[i].countNumPrice);
            }else {
              totalPrice   +=0;
            }
          }
          that.totalPrices=totalPrice.toFixed(2);

        },
        returnPage:function(){
          this.$store.dispatch('medicine_compile_suppliers_no',  "");
          this.$router.back();
        },
        getFocus: function (item, focusIndex) {
          this.currentFocusIndex = focusIndex;
          item.focus = true;
        },
        pwLoseFocus: function () {
          this.pwInputState = true;
        },
        loseFocus:function (item) {
          item.focus = false;
          this.dataList = [];
        },
        realStockNum:function (item,i) {
          let  index=i-1;
          let  that=this;
          if (item.realStockNum>0&&item.surplusStockNum>0){

          let  countNum=item.realStockNum-item.surplusStockNum;
          let  stockPrice =item.stockPrice;
          let  splitNum =item.splitNum;
            let countNumPrice=0;
            if( item.isSplit==1){
              stockPrice=(stockPrice/splitNum/100).toFixed(2);
              countNumPrice= (countNum*stockPrice).toFixed(2);
            }else {
             countNumPrice= (countNum*stockPrice/100).toFixed(2);
            }
          that.goodDatas[index] .countNum=countNum;
          that.goodDatas[index] .countNumPrice=countNumPrice;
          that.goodDatas.splice(index, 1,   that.goodDatas[index]);
            that.totalPrice();
          }else {
            that.goodDatas[index] .countNum=0;
            that.goodDatas[index] .countNumPrice=0;
            that.goodDatas.splice(index, 1,   that.goodDatas[index]);
            that.totalPrice();
          }

        }, getRealStockNum:function (item,index) {
          let  that=this;
          if (item.realStockNum>0&&item.surplusStockNum>0){

          let  countNum=item.realStockNum-item.surplusStockNum;
          let countNumPrice= (countNum*item.stockPrice/100).toFixed(2);

          that.goodDatas[index] .countNum=countNum;
          that.goodDatas[index] .countNumPrice=countNumPrice;
          that.goodDatas.splice(index, 1,   that.goodDatas[index]);
            that.totalPrice();
          }

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


        deleteProcurements: function (currentIndex) {
          this.goodDatas.splice(currentIndex, 1);

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
                  that.getRealStockNum( that. goodDatas[i],i)
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
        compileGoods:function () {
          let that=this;
          let prods=[];
          console.log(JSON.stringify(that.goodDatas));
          for (let i in that.goodDatas){
            prods.push({
              pstockDetailId :that.goodDatas[i].pstockDetailId,
              currStockNum :that.goodDatas[i].surplusStockNum,
              prodId :that.goodDatas[i].prodId,
              batchNumber :that.goodDatas[i].batchNumber,
              realStockNum :that.goodDatas[i].realStockNum,
            });
          }
          let  data={
            billId:that.suppliersData.billId,
            operatorName:that.suppliersData.operatorName,
            remark:that.suppliersData.remark,
            operatorId:localStorage.getItem(that.$names.AUTH_ACCESS_USER_OPERATOR_ID),
            prods:JSON.stringify(prods),
            totalPrice:Math.abs(that.totalPrices*100),
          };
          let url=  that.goodsId==""?that.$requestApi.createCheck:that.$requestApi.updateCheck+that.goodsId[0];
          this.isDisabled=true;
          this.$api.post(that,url ,data, function (data) {
            that.isDisabled=false;

            if (data.body.code == '00') {
              swal({   title: data.body.msg,   text: "", type: "success",  timer: 2000,   showConfirmButton: false });
              that.returnPage();
            } else {
              swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
            }

          }, function (err) {
            swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

          });

        },

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
    border-top: 1px solid #e7eaec !important;
  }
  .right_border{
    border-right: 1px solid #e7eaec !important;
  }
  .bottom_border{
    border-bottom: 1px solid #e7eaec !important;
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
