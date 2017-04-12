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
                      <input   @input="getGoodsData(suppliersData.goodsName)" type="text"  class="form-control gray-bg input_circular_corner" v-model="suppliersData.goodsName">
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
              <tr class="gradeC"   v-for="(goodsItem, index) in auditContent" >
                <td    class="text-center l_border  bottom_border " >
                  <div class="checkbox checkbox-info goods_checkbox ">
                  <input  :index="index" type="checkbox" :checked="goodsItem.selectFlag" >
                </div></td>
                <td    class="text-center l_border  bottom_border " >{{++index}}</td>
                <td    class="text-center l_border  bottom_border " >{{goodsItem.prodName}}</td>
                <td    class="text-center l_border  bottom_border " >{{goodsItem.prodSpec}}</td>
                <td    class="text-center l_border  bottom_border " >{{goodsItem.manufacturer}}</td>
                <td    class="text-center l_border  bottom_border " >{{goodsItem.batchNumber}}</td>
                <td    class="text-center l_border  bottom_border " >{{$stringUtils.dateFormat(goodsItem.expireDate)}}</td>
                <td    class="text-center l_border  bottom_border " >{{goodsItem.surplusStockNum}}</td>
                <td    class="text-center l_border  bottom_border " >{{$enumeration. getGoodsPrice(goodsItem.stockPrice)}}</td>
                <td    class="text-center l_border  bottom_border right_border " >{{$enumeration. getGoodsPrice(goodsItem.retailPrice)}}</td>
                 </tr>
              </tbody>
              <tbody v-if="auditContent.length===0" ><tr class="gradeC"> <td class="text-center" colspan="8" >{{$toastContent.toastTableContent}}</td></tr></tbody>

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
          goodsName:"",
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



      getGoodsData:function (goodsName) {

        var that=this;

        this.$api.get(this, this.$requestApi.stockDetails,{prodNameOrGenericNameOrEnglishName:goodsName,iDisplayLength:20},function  (data) {
          if(data.body.code=='00'){
            that.auditContent = data.body.data;
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
      },
      accomplish:function () {
        var that=this;
        $("input").each(function() {
        if($(this).prop("checked") == true){
          let  index= $(this).attr('index');
          that.$parent.goodDatas.push(that.auditContent[index]);
        }
        });

//        that.$store.dispatch('medicine_select_goods',goods  );
        that.suppliersData.goodsName="";
        this.auditContent=[];
      },

      deleteProcurements: function (currentIndex) {
        this.auditContent.splice(currentIndex, 1);
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
  .goods_checkbox{
    margin-top: 2px;
    margin-left: 20px;
  }
</style>
