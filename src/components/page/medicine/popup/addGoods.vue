<template>
    <div  >
      <div class="add_body" >
        <div class="fixed-div">
        <div class="tc-title-div">新增商品</div>
        <button type="button" class="btn_close" @click="returnPage" style="margin: 11.5px 15px 0 0;">
          <a>返回上一级</a></button>
        </div>
        <!--详细内容-->
        <div class="common-body">
          <div class="common-height-40f9" ></div>
          <div class="common-body-white">
          <div  >

            <div class="msg_item_title"><h5>商品基本信息</h5></div>
            <div class="col-md-12 no-padding">
              <div class="ibox-content no-borders no_top_padding">
                <div  class="form-horizontal m-l-md">
                  <div class="form-group">
                    <div class="no-padding col-md-12 procurement_form-div_margin">
                      <div class=" col-md-1 pull-left no-padding left_text_tips"> 选择供应商<span class="span-red">*</span> </div>
                      <div class="col-md-11 col-md-11-padding-r"   >
                        <div class="input-group-btn">
                          <input  data-toggle="dropdown" type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入选择供应商" v-model="goodsData.supplierName"  @focus="getSupplierName(goodsData.supplierName)" @input="getSupplierName(goodsData.supplierName)">
                          <ul    class="attopic dropdown-menu" style="width: 100%" >
                            <li @click="selectSupplierNameItem(index)" v-for="(titleItem, index) in supplierNameItems">
                              <a  class="no-padding" style="text-align: center">{{titleItem.supplierName}}</a>
                            </li>
                          </ul>
                        </div>
                      </div></div>

                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">通用名<span class="span-red">*</span></div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  class="form-control gray-bg input_circular_corner" placeholder="请输入通用名" v-model="goodsData.genericName">


                      </div>
                    </div>

                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">商品名<span class="span-red">*</span></div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  class="form-control gray-bg input_circular_corner" placeholder="请输入商品名" v-model="goodsData.prodName">
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">英文名称</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  class="form-control gray-bg input_circular_corner" placeholder="请输入英文名称" v-model="goodsData.englishName">
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">生产厂家</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  class="form-control gray-bg input_circular_corner" placeholder="请输入生产厂家" v-model="goodsData.manufacturer">
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">药品条形码</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  class="form-control gray-bg input_circular_corner" placeholder="请输入药品条形码" v-model="goodsData.barCode">
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class=" goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">批准文号</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  class="form-control gray-bg input_circular_corner" placeholder="请输入批准文号" v-model="goodsData.approvalNumber">
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">药品类型:</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                            <div class="input-group-btn">
                              <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{prodTypeItems[goodsData.prodType ]}}<span class="goods_tips_down caret"></span>
                              </button>
                              <ul   class="dropdown-menu  " style="width: 100%" >
                                <li @click="selectProdTypeItem(index)" v-for="(titleItem, index) in prodTypeItems">
                                  <a :class="{selected_item : goodsData.prodType == index}" class="no-padding" style="text-align: center">{{titleItem}}</a>
                                </li>

                              </ul>
                            </div>
                      </div>
                    </div>


                  </div>


                </div>
              </div>

            </div>
            <div class="msg_item_title"><h5>商品规格信息</h5></div>
            <div class="col-md-12 no-padding">
              <div class="ibox-content no-borders no_top_padding">
                <div  class="form-horizontal m-l-md">
                  <div class="form-group">
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">规格:</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  class="form-control gray-bg input_circular_corner"  placeholder="请输入商品规格信息" v-model="goodsData.prodSpec">
                      </div>
                    </div>

                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">单位<span class="span-red">*</span></div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <div class="input-group-btn">
                          <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{splitUnitItems[goodsData.prodUnit]}}<span class="goods_tips_down caret"></span>
                          </button>
                          <ul   class="attopic dropdown-menu" style="width: 100%" >
                            <li @click="selectProdUnitItem(index)" v-for="(titleItem, index) in splitUnitItems">
                              <a :class="{selected_item : goodsData.prodUnit == index}" class="no-padding" style="text-align: center">{{titleItem}}</a>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">剂型</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <div class="input-group-btn">
                          <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{dosageFormItems[goodsData.dosageForm]}}<span class="goods_tips_down caret"></span>
                          </button>
                          <ul    class="attopic dropdown-menu" style="width: 100%" >
                            <li @click="selectDosageFormItem(index)" v-for="(titleItem, index) in dosageFormItems">
                              <a :class="{selected_item : goodsData.dosageForm == index}" class="no-padding" style="text-align: center">{{titleItem}}</a>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>

                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">零售价<span class="span-red">*</span></div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input @input="getIsRetailPrice(goodsData.retailPrice)"  :class="{'is-danger':isRetailPrice}  "  type="text"  class="form-control gray-bg input_circular_corner"  placeholder="请输入零售价" v-model="goodsData.retailPrice">
                        <toast-error   v-show="isRetailPrice " :toastContent="$toastContent.toastPrice"></toast-error>

                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">采购价</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  @input="getIsCostPrice(goodsData.costPrice)"  :class="{'is-danger':isRetailPrice}  "  type="text"  class="form-control gray-bg input_circular_corner"  placeholder="请输入采购价" v-model="goodsData.costPrice">
                        <toast-error   v-show="isCostPrice " :toastContent="$toastContent.toastPrice"></toast-error>

                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">是否拆零</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <div class="input-group-btn">
                          <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{isSplitItems[goodsData.isSplit].titleName}}<span class="goods_tips_down caret"></span>
                          </button>
                          <ul   class="  dropdown-menu" style="width: 100%" >
                            <li @click="selectIsSplitItem(index)" v-for="(titleItem, index) in isSplitItems">
                              <a :class="{selected_item : goodsData.isSplit == index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>


                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding" v-show="goodsData.isSplit==1">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">拆零数量</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <div class="input-group-btn">
                          <input  type="text" style="width: 65%;    float: left;" class="form-control gray-bg input_circular_left_radius" placeholder="请输入拆零数量" v-model="goodsData.splitNum"  >
                          <button data-toggle="dropdown" style="width: 35%;  float: right;" class="form-control gray-bg     input_circular_right_radius   " type="button">  {{splitUnitItems[ goodsData.splitUnit]}}<span class=" caret goods_tips_down"></span>
                          </button>

                          <ul   class="attopic dropdown-menu" style="margin-left: 65%;min-width: 35%;" >
                            <li @click="selectSplitUnitItem(index)" v-for="(titleItem, index) in splitUnitItems">
                              <a :class="{selected_item : goodsData.splitUnit == index}" class="no-padding" style="text-align: center">{{titleItem}}</a>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding" v-show="goodsData.isSplit==1">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">拆零售价</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input   @input="getIsSplitPrice(goodsData.splitPrice)"  :class="{'is-danger':isRetailPrice}  " type="text"  class="form-control gray-bg input_circular_corner"  placeholder="请输入拆零售价" v-model="goodsData.splitPrice">
                        <toast-error   v-show="isSplitPrice " :toastContent="$toastContent.toastPrice"></toast-error>

                      </div>
                    </div>


                  </div>


                </div>
              </div>

            </div>
            <div class="msg_item_title"><h5>商品用法</h5></div>
            <div class="col-md-12 no-padding">
              <div class="ibox-content no-borders no_top_padding">
                <div  class="form-horizontal m-l-md">
                  <div class="form-group">

                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">默认用法</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <div class="input-group-btn">
                          <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{usageTypeItems[ goodsData.usageType]}}<span class=" caret goods_tips_down"></span>
                          </button>
                          <ul   class="attopic dropdown-menu" style="width: 100%" >
                            <li @click="selectUsageTypeItem(index)" v-for="(titleItem, index) in usageTypeItems">
                              <a :class="{selected_item : goodsData.usageType== index}" class="no-padding" style="text-align: center">{{titleItem}}</a>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">单次剂量</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <div class="input-group-btn">
                          <input  type="text" style="width: 65%;    float: left;" class="form-control gray-bg input_circular_left_radius" placeholder="请输入单次剂量" v-model="goodsData.singleDose">
                        <button data-toggle="dropdown" style="width: 35%;  float: right;" class="form-control gray-bg     input_circular_right_radius   " type="button">  {{singleUnitItems[goodsData.singleUnit]}}<span class=" caret goods_tips_down"></span>
                        </button>

                          <ul   class="attopic dropdown-menu" style="margin-left: 65%;min-width: 35%;" >
                          <li @click="selectSingleUnitItem(index)" v-for="(titleItem, index) in singleUnitItems">
                            <a :class="{selected_item : goodsData.singleUnit == index}" class="no-padding" style="text-align: center">{{titleItem}}</a>
                          </li>

                        </ul>
                      </div>
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">默认频次</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <div class="input-group-btn">
                          <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{frequencyItems[ goodsData.frequency]}}<span class=" caret goods_tips_down"></span>
                          </button>
                          <ul   class="attopic dropdown-menu" style="width: 100%" >
                            <li @click="selectFrequencyItem(index)" v-for="(titleItem, index) in frequencyItems">
                              <a :class="{selected_item : goodsData.frequency== index}" class="no-padding" style="text-align: center">{{titleItem}}</a>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">药品有效期预警时间</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  style="width: 80%;float: left" class="form-control gray-bg input_circular_left_radius" placeholder="请输入预警时间" v-model="goodsData.validWarning">
                        <label  class="form-control gray-bg     input_circular_right_radius   " style="width: 20%;    float: right;">月</label>
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">药品库存的预警数量</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  style="width: 80%;float: left" class="form-control gray-bg input_circular_left_radius" placeholder="请输入预警数量" v-model="goodsData.stockWarning">
                        <label  class="form-control gray-bg     input_circular_right_radius   " style="width: 20%;    float: right;">{{getStockWarning}}</label>
                      </div>
                    </div>

                    <div   class="no-padding col-md-12 goods_form-div_margin">
                      <div   class=" col-md-1 pull-left no-padding left_text_tips"> 备注 </div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  class="form-control gray-bg input_circular_corner" placeholder="请输入备注" v-model="goodsData.remark" >
                      </div>
                    </div>

                  </div>


                </div>
              </div>

            </div>
          </div>

        <button  style='margin: 30px 10px 30px 335px;' class='form-btn-black ' @click="createGoods" :disabled="isDisabled">完成</button>
        <button class='layui-layer-close form-btn-white ' @click="abandon" >放弃{{compileSuppliers}}</button>
        </div>
          <div style="background: #F9F9F9; height: 20px" ></div>
        </div>
      </div>

    </div>
</template>

<script>
  import toastError from "components/commonView/toastError.vue";

  export default {
    components: {
      //注册组件
      toastError
    },
    mounted(){
//    this.$nextTick(() => $(window).scrollTop(0));
    },
    data(){
      return {
        assist_inquiry_show: false,
        isDisabled: false,
        isRetailPrice:false,
        isCostPrice:false,
        isSplitPrice:false,
        assist_inquiry_showed:false,
        compileSuppliersNo:"",
        suppliersIndex: 0,
        prodTypeItems:this.$enumeration.getPROD_TYPE(),
        usageTypeItems: this.$enumeration.getUSAGE_TYPE(),
        supplierNameItems: [ ],
        frequencyItems:this.$enumeration.getPROD_FREQUENCY(),
        splitUnitItems:this.$enumeration.getPROD_UNITE(),
        singleUnitItems:this.$enumeration.getPROD_UNITE(),
        dosageFormItems: this.$enumeration.getDOSAGE_FORM(),
        isSplitItems:[
          {titleName: '否'},
          {titleName: '是'},
         ] ,
        addGood:{
          commonName:""
        },
        goodsData:{
          approvalNumber: "",
          barCode: "",
          doneCode: "",
          dosageForm: 1,
          englishName: "",
          frequency: 1,
          genericName: "",
          supplierName: "",
          hosId: "",
          hospitalId:"",
          isSplit: 0,
          manufacturer: "",
          operId:"" ,
          phoneticCode: "",
          prodId: "",
          prodName: "",
          prodSpec: "",
          prodType: 1,
          prodUnit: 1,
          remark:"" ,
          retailPrice: "",
          singleDose: "",
          singleUnit: 1,
          splitNum: "",
          splitPrice: "",
          splitUnit: 1,
          stockWarning: "",
          supplierId: "",
          usageType: 1,
          validWarning: ""

        }

      }
    },
    computed : {

      compileSuppliers(){
        this. compileSuppliersNo=this.$store.getters.getCompileSuppliersNo;
        if (this. compileSuppliersNo){
          return this.goodsView( this. compileSuppliersNo);
        }else {
          return "";
        }
      },
      getStockWarning(){
        let  that=this;
        if (that.goodsData.isSplit==0){
          return that.splitUnitItems[that.goodsData.prodUnit]
        }else {
          return that.splitUnitItems[that.goodsData.splitUnit]

        }
      }

    },
    created(){
    },

    methods: {
      goodsView:function (compileSuppliersNo) {
      var that = this;
      this.$api.get(this, this.$requestApi.goodsView+compileSuppliersNo,"", function (data) {
        if (data.body.code == '00') {
          let goodsData=  data.body.data;
           goodsData.retailPrice=that.$enumeration.getGoodsPrice(   goodsData.retailPrice);
          goodsData.costPrice=that.$enumeration.getGoodsPrice(   goodsData.costPrice);
          goodsData.splitPrice=that.$enumeration.getGoodsPrice(  goodsData.splitPrice);
          delete goodsData['createDate'];
          delete goodsData['doneDate'];
          return that.goodsData= goodsData;

        } else {
          console.log(data.body.msg);
        }

      }, function (err) {
        console.log(err);

      });
    },

      getSupplierName:function (supplierName) {
        let that = this;
        that.$api.get(that, that.$requestApi.goodsSupplierQuery ,{ supplierNameOrContactName:  supplierName,iDisplayLength:20}, function (data) {
          if (data.body.code == '00') {
            that.supplierNameItems=data.body.data;
          } else {
            console.log(data.body.msg);
          }

        }, function (err) {
          console.log(err);

        });

      },
      createGoods:function () {
        let that = this;
        if ( that.goodsData.supplierId==""){
          return   swal({   title:that.$toastContent.toastSupplierId ,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

        } if ( that.goodsData.retailPrice==""||that.$stringUtils.checkMoney(that.goodsData.retailPrice)){
          return   swal({   title:that.$toastContent.toastRetailPrice ,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

        }if ( that.goodsData.costPrice=="" ||that.$stringUtils.checkMoney(that.goodsData.costPrice)){
          return   swal({   title:that.$toastContent.toastCostPrice ,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

        }
        if ( that.goodsData.isSplit==1 ){
          if (that.goodsData.splitNum=="" ){
            return   swal({   title:that.$toastContent.toastSplitNum ,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

          } if (that.goodsData.splitPrice==""){
            return   swal({   title:that.$toastContent.toastSplitPrice,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

          }
        }
         if ( that.goodsData.genericName==""){
           return   swal({   title:that.$toastContent.toastGenericName ,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
         }
        if (that.goodsData.isSplit==0){
          delete that. goodsData['splitUnit']
        }
       that.goodsData.retailPrice=that.$enumeration.getComputePricet( that. goodsData.retailPrice);
       that.goodsData.costPrice=that.$enumeration.getComputePricet( that. goodsData.costPrice);
       that.goodsData.splitPrice=that.$enumeration.getComputePricet( that. goodsData.splitPrice);
        that.isDisabled=true;
        this.$api.post(that,that.compileSuppliersNo?that.$requestApi.goodsUpdate+  that. compileSuppliersNo:that.$requestApi.createGoods , that.goodsData, function (data) {
          that.isDisabled=false;

          if (data.body.code == '00') {
            swal({   title: data.body.msg,   text: "", type: "success",  timer: 2000,   showConfirmButton: false });
            that.returnPage();
          } else {
            that. setDefaultGoodsData();
            swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
          }

        }, function (err) {
          that.isDisabled=false;

          that. setDefaultGoodsData();
          console.log(err);

        });
      },
      //默认数据
        setDefaultGoodsData:function () {
          let that=this;
          that.  goodsData.retailPrice= that.$enumeration. getGoodsPrice(that.goodsData.retailPrice);
          that.  goodsData.costPrice= that.$enumeration. getGoodsPrice(that.goodsData.costPrice);
          that.  goodsData.splitPrice= that.$enumeration. getGoodsPrice(that.goodsData.splitPrice);

        },
      getIsRetailPrice:function(price){
        return this.isRetailPrice= this.$stringUtils.checkMoney( price);
      },
      getIsCostPrice:function(price){
        return this.isCostPrice= this.$stringUtils.checkMoney( price);
      },  getIsSplitPrice:function(price){
        return this.isSplitPrice= this.$stringUtils.checkMoney( price);
      },
      change_phone: function () {
        this.inputState=false;
      },
      change_password: function () {
        this.pwInputState=false;
      },
      abandon: function () {
        this.returnPage();
      },
      returnPage: function () {
        console.log("returnPage");
//        this.$store.dispatch('medicine_add_goods', "addReturnedGoods.vue" + Math.random());
//        window.history.go(-1)
           this.$router.back();

//        document.frames['iframe15'].history.back()
      },
      loseFocus:function () {
        this.inputState = true;
      },
      pwLoseFocus:function () {
        this.pwInputState = true;
      },
       selectProdTypeItem:function (selectedIndex) {
        this.goodsData.prodType= selectedIndex;
      },
      selectDosageFormItem:function (selectedIndex) {
        this.goodsData.dosageForm = selectedIndex;
      }, selectSplitUnitItem:function (selectedIndex) {
        this.goodsData.splitUnit = selectedIndex;
      },
        selectSingleUnitItem:function (selectedIndex) {
        this.goodsData.singleUnit = selectedIndex;
      },selectIsSplitItem:function (selectedIndex) {
        this.goodsData.isSplit = selectedIndex;
      },selectFrequencyItem:function (selectedIndex) {
        this.goodsData.frequency = selectedIndex;
      },selectSupplierNameItem:function (selectedIndex) {
        this.goodsData.supplierName=this.supplierNameItems[selectedIndex].supplierName;
        this.goodsData.supplierId=this.supplierNameItems[selectedIndex].supplierId;
      },selectProdUnitItem:function (selectedIndex) {
        this.goodsData.prodUnit=selectedIndex;

      },selectUsageTypeItem:function (selectedIndex) {
        this.goodsData.usageType=selectedIndex;

      },

    },

  }

</script>
<style>
  .add_goods_body{
    padding: 10px;
  }
  .goods_form-div_margin{
    margin-bottom: 10px;
  }
.goods_tips_down{
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
  .common-body{
    background: #F9F9F9;
  }
  .common-body-white{
    background: white;
    margin: 15px;
    padding: 10px

  }
  .fixed-div{
    position: fixed;
    width: 100%;
    top: 0;
    background: white;
    z-index: 3;
  }
  .common-height-40f9{
    height: 40px ;background: #F9F9F9
  }
</style>
