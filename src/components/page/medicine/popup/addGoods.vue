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
                          <ul class="dropdown-menu" style="width: 100%" >
                            <li @click="selectSupplierNameItem(index)" v-for="(titleItem, index) in supplierNameItems">
                              <a  class="no-padding" style="text-align: center">{{titleItem.supplierName}}</a>
                            </li>
                          </ul>
                        </div>
                      </div></div>

                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">通用名<span class="span-red">*</span>:</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  class="form-control gray-bg input_circular_corner" placeholder="请输入通用名" v-model="goodsData.genericName">


                      </div>
                    </div>

                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">商品名</div>
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
                              <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{prodTypeItems[goodsData.prodType ].titleName}}<span class="goods_tips_down caret"></span>
                              </button>
                              <ul class="dropdown-menu" style="width: 100%" >
                                <li @click="selectProdTypeItem(index)" v-for="(titleItem, index) in prodTypeItems">
                                  <a :class="{selected_item : goodsData.prodType == index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
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
                          <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{splitUnitItems[goodsData.prodUnit].titleName}}<span class="goods_tips_down caret"></span>
                          </button>
                          <ul class="dropdown-menu" style="width: 100%" >
                            <li @click="selectProdUnitItem(index)" v-for="(titleItem, index) in splitUnitItems">
                              <a :class="{selected_item : goodsData.prodUnit == index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">剂型</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <div class="input-group-btn">
                          <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{dosageFormItems[goodsData.dosageForm].titleName}}<span class="goods_tips_down caret"></span>
                          </button>
                          <ul class="dropdown-menu" style="width: 100%" >
                            <li @click="selectDosageFormItem(index)" v-for="(titleItem, index) in dosageFormItems">
                              <a :class="{selected_item : goodsData.dosageForm == index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>

                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">零售价<span class="span-red">*</span></div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  class="form-control gray-bg input_circular_corner"  placeholder="请输入零售价" v-model="goodsData.retailPrice">
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">采购价</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  class="form-control gray-bg input_circular_corner"  placeholder="请输入采购价" v-model="goodsData.costPrice">
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">是否拆零</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <div class="input-group-btn">
                          <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{isSplitItems[goodsData.isSplit].titleName}}<span class="goods_tips_down caret"></span>
                          </button>
                          <ul class="dropdown-menu" style="width: 100%" >
                            <li @click="selectIsSplitItem(index)" v-for="(titleItem, index) in isSplitItems">
                              <a :class="{selected_item : goodsData.isSplit == index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>


                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">拆零数量</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <div class="input-group-btn">
                          <input  type="text" style="width: 65%;    float: left;" class="form-control gray-bg input_circular_left_radius" placeholder="请输入拆零数量" v-model="goodsData.splitNum"  >
                          <button data-toggle="dropdown" style="width: 35%;  float: right;" class="form-control gray-bg     input_circular_right_radius   " type="button">  {{splitUnitItems[ goodsData.splitUnit].titleName}}<span class=" caret goods_tips_down"></span>
                          </button>

                          <ul class="dropdown-menu" style="margin-left: 65%;min-width: 35%;" >
                            <li @click="selectSplitUnitItem(index)" v-for="(titleItem, index) in splitUnitItems">
                              <a :class="{selected_item : goodsData.splitUnit == index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">拆零售价</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  class="form-control gray-bg input_circular_corner"  placeholder="请输入拆零售价" v-model="goodsData.splitPrice">
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
                          <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{usageTypeItems[ goodsData.usageType].titleName}}<span class=" caret goods_tips_down"></span>
                          </button>
                          <ul class="dropdown-menu" style="width: 100%" >
                            <li @click="selectUsageTypeItem(index)" v-for="(titleItem, index) in usageTypeItems">
                              <a :class="{selected_item : goodsData.usageType== index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
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
                        <button data-toggle="dropdown" style="width: 35%;  float: right;" class="form-control gray-bg     input_circular_right_radius   " type="button">  {{singleUnitItems[goodsData.singleUnit].titleName}}<span class=" caret goods_tips_down"></span>
                        </button>

                          <ul class="dropdown-menu" style="margin-left: 65%;min-width: 35%;" >
                          <li @click="selectSingleUnitItem(index)" v-for="(titleItem, index) in singleUnitItems">
                            <a :class="{selected_item : goodsData.singleUnit == index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
                          </li>

                        </ul>
                      </div>
                      </div>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">默认频次</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <div class="input-group-btn">
                          <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{frequencyItems[ goodsData.frequency].titleName}}<span class=" caret goods_tips_down"></span>
                          </button>
                          <ul class="dropdown-menu" style="width: 100%" >
                            <li @click="selectFrequencyItem(index)" v-for="(titleItem, index) in frequencyItems">
                              <a :class="{selected_item : goodsData.frequency== index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
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
                      <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' " class="pull-left no-padding left_text_tips">药品库存的预警天数</div>
                      <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                        <input  type="text"  style="width: 80%;float: left" class="form-control gray-bg input_circular_left_radius" placeholder="请输入预警天数" v-model="goodsData.stockWarning">
                        <label  class="form-control gray-bg     input_circular_right_radius   " style="width: 20%;    float: right;">天</label>
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

        <button  style='margin: 30px 10px 30px 335px;' class='form-btn-black ' @click="createGoods">完成</button>
        <button class='layui-layer-close form-btn-white ' @click="abandon" >放弃{{compileSuppliers}}</button>
        </div>
          <div style="background: #F9F9F9; height: 20px" ></div>
        </div>
      </div>

    </div>
</template>

<script>
  export default {
    mounted(){
    this.$nextTick(() => $(window).scrollTop(0));
    },
    data(){
      return {
        assist_inquiry_show: false,
        assist_inquiry_showed:false,
        compileSuppliersNo:"",
        suppliersItems: [
          {titleName: '西药'},
          {titleName: '中药'},
        ],
        suppliersIndex: 0,
        prodTypeItems: [
          {titleName: '西/成药'},
          {titleName: '中药'},
          {titleName: '器械/药材'},
        ],
        usageTypeItems: [
          {titleName: '口服'},
          {titleName: '直肠用药'},
          {titleName: '舌下用药'},
          {titleName: '注射用药'},
          {titleName: '皮下注射'},
          {titleName: '皮内注射'},
          {titleName: '肌肉注射'},
          {titleName: '静脉滴注'},
          {titleName: '吸入用药'},
          {titleName: '局部用药'},
          {titleName: '椎管内用药'},
          {titleName: '关节腔内用药'},
          {titleName: '胸膜腔用药'},
          {titleName: '腹腔用药'},
          {titleName: '阴道用药'},
          {titleName: '气管内用药'},
          {titleName: '滴眼'},
          {titleName: '滴鼻'},
          {titleName: '喷喉'},
          {titleName: '含化'},
          {titleName: '敷伤口'},
          {titleName: '擦皮肤'},
          {titleName: '其他局部用药途径'},
          {titleName: '其他用药途径'},
        ],
        supplierNameItems: [ ],
        frequencyItems: [
          {titleName:'每天一次(qd)'},
          {titleName:'每天二次(bid)'},
          {titleName:'每天三次(tid)'},
          {titleName:'每天四次(qid)'},
          {titleName:'每天五次(Quingid)'},
          {titleName:'每周一次(qw)'},
          {titleName:'每周二次(biw)'},
          {titleName:'每周三次(tiw)'},
          {titleName:'每半小时一次(q1/2h)'},
          {titleName:'每小时一次(qh)'},
          {titleName:'每2时一次(q2h)'},
          {titleName:'每3时一次(q3h)'},
          {titleName:'每4时一次(q4h)'},
          {titleName:'每5时一次(q5h)'},
          {titleName:'每6时一次(q6h)'},
          {titleName:'每8时一次(q8h)'},
          {titleName:'每12时一次(q12h)'},
          {titleName:'每晚一次(qn)'},
          {titleName:'隔天一次(qod)'},
          {titleName:'五天一次(q5d)'},
          {titleName:'十天一次(q10d)'},
          {titleName:'每三天一次(q3d)'},
          {titleName:'每二周一次(2w)'},
          {titleName:'12小时维持'},
          {titleName:'24小时维持'},
          {titleName:'立即(st)'},
          {titleName:'必要时使用(prn)'},
          {titleName:'其他'},
          {titleName:'Q4D(一次/4 天)'},
          {titleName:'Q90M(1 个半小时一次'},
          {titleName:'QID7(7 次/日。6:00-9:00)'},
          {titleName:'QMON(每月 1 次)'},
          {titleName:'QOD/BID(2 次/隔日 8-4)'},
          {titleName:'QOD/TID(3 次/隔日 8-12-4)'},
          {titleName:'QW(3)BID(每周 3 天每日 2 次)'},
          {titleName:'W5D(周一～～周五 8am)'},
          {titleName:'W6D(周一～～周六 8am)'},
        ],
        splitUnitItems: [
          {titleName: '袋'},
          {titleName: '片'},
          {titleName: '支'},
          {titleName: '粒'},
          {titleName: '瓶'},
          {titleName: 'mg'},
          {titleName: 'ml'},
          {titleName: 'l'},
          {titleName: 'ug'},
          {titleName: 'IU'},
          {titleName: 'U'},
          {titleName: '包'},
          {titleName: '盒'},
          {titleName: '枚'},
          {titleName: '丸'},
          {titleName: '喷'},
          {titleName: '颗'},
          {titleName: '滴'},
          {titleName: 'cm'},
          {titleName: '少许'},
          {titleName: '适量'},
          {titleName: '对'},
          {titleName: '个'},
          {titleName: '条'},
          {titleName: '条'},
          {titleName: '板'},
          {titleName: '件'},
          {titleName: '套'},
          {titleName: '卷'},
          {titleName: '副'},
          {titleName: '只'},
          {titleName: '根'},
          {titleName: '箱'},
          {titleName: '台'},
          {titleName: '贴'},
          {titleName: '万单位'},
        ],
        singleUnitItems: [
          {titleName: '袋'},
          {titleName: '片'},
          {titleName: '支'},
          {titleName: '粒'},
          {titleName: '瓶'},
          {titleName: 'mg'},
          {titleName: 'ml'},
          {titleName: 'l'},
          {titleName: 'ug'},
          {titleName: 'IU'},
          {titleName: 'U'},
          {titleName: '包'},
          {titleName: '盒'},
          {titleName: '枚'},
          {titleName: '丸'},
          {titleName: '喷'},
          {titleName: '颗'},
          {titleName: '滴'},
          {titleName: 'cm'},
          {titleName: '少许'},
          {titleName: '适量'},
          {titleName: '对'},
          {titleName: '个'},
          {titleName: '条'},
          {titleName: '条'},
          {titleName: '板'},
          {titleName: '件'},
          {titleName: '套'},
          {titleName: '卷'},
          {titleName: '副'},
          {titleName: '只'},
          {titleName: '根'},
          {titleName: '箱'},
          {titleName: '台'},
          {titleName: '贴'},
          {titleName: '万单位'},
        ],
        dosageFormItems: [
          {titleName: '注射液'},
          {titleName: '肠溶片'},
          {titleName: '滴剂'},
          {titleName: '滴眼剂'},
          {titleName: '冻干粉针剂'},
          {titleName: '粉针剂'},
          {titleName: '含片'},
          {titleName: '混悬剂'},
          {titleName: '胶浆剂'},
          {titleName: '胶囊剂'},
          {titleName: '颗粒剂'},
          {titleName: '凝胶'},
          {titleName: '泡腾片'},
          {titleName: '喷剂'},
          {titleName: '喷雾'},
          {titleName: '片剂'},
          {titleName: '溶液'},
          {titleName: '乳膏剂'},
          {titleName: '软膏剂'},
          {titleName: '散剂'},
          {titleName: '栓剂'},
          {titleName: '糖浆'},
          {titleName: '贴膜'},
          {titleName: '眼膏'},
          {titleName: '针剂'},
          {titleName: '注射剂'},
          {titleName: '口服液'},
          {titleName: '软膏'},
          {titleName: '乳膏'},
          {titleName: '粉剂'},
          {titleName: '丸剂'},
          {titleName: '干混悬剂'},
          {titleName: '洗剂'},
          {titleName: '饮片'},
          {titleName: '中药配方颗粒'},
          {titleName: '汤剂'},
        ],
        isSplitItems:[
          {titleName: '是'},
          {titleName: '否'},
         ] ,
        addGood:{
          commonName:""
        },
        goodsData:{
          approvalNumber: "",
          barCode: "",
          doneCode: "",
          dosageForm: 0,
          englishName: "",
          frequency: 0,
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
          prodType: 0,
          prodUnit: 0,
          remark:"" ,
          retailPrice: "",
          singleDose: "",
          singleUnit: 0,
          splitNum: "",
          splitPrice: "",
          splitUnit: 0,
          stockWarning: "",
          supplierId: "",
          usageType: 0,
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
        this.$api.get(that, that.$requestApi.goodsSupplierQuery ,{ supplierNameOrContactName:supplierName}, function (data) {
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
        this.$api.post(that,that.compileSuppliersNo?that.$requestApi.goodsUpdate+  that. compileSuppliersNo:that.$requestApi.createGoods , that.goodsData, function (data) {
          if (data.body.code == '00') {
            swal({   title: data.body.msg,   text: "", type: "success",  timer: 2000,   showConfirmButton: false });
            that.returnPage();
          } else {
            swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
          }

        }, function (err) {
          console.log(err);

        });
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
    padding-top: 10px

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
