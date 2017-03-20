<template>
    <div  >
      <div class="add_body"  >
        <div class="fixed-div" >
        <div class="tc-title-div">新增供应商</div>
        <button type="button" class="btn_close"  @click="returnPage" style="margin: 11.5px 15px 0 0;"> <a>返回上一级</a></button>
          </div>
        <div class="common-body">
           <div class="common-height-40f9" ></div>
           <div class="common-body-white">
        <div >
          <div class="col-md-12 no-padding">
            <div class="ibox-content no-borders no_top_padding">
              <div class="form-horizontal m-l-md">
                <div class="form-group">
                  <div class="no-padding col-md-12 procurement_form-div_margin">
                    <div class=" col-md-1 pull-left no-padding left_text_tips"> 单位名称 <span class="span-red">*</span></div>
                    <div class="col-md-11 col-md-11-padding-r"   >
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入单位名称" v-model="suppliersData.supplierName"  ></div></div>
                  <div class="no-padding col-md-12 procurement_form-div_margin">
                    <div class=" col-md-1 pull-left no-padding left_text_tips"> 公司地址 </div>
                    <div class="col-md-11 col-md-11-padding-r"   >
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入公司地址" v-model="suppliersData.companyAddress"></div></div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">是否销售<span class="span-red">*</span>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <div class="input-group-btn">
                        <button data-toggle="dropdown" style="width: 100%"
                                class="form-control gray-bg     input_circular_corner   " type="button">
                          {{saleItems[ suppliersData.isSale].titleName}}<span class=" caret goods_tips_down"></span>
                        </button>
                        <ul class="dropdown-menu" style="width: 100%">
                          <li @click="selectSaleItem(index)" v-for="(titleItem, index) in saleItems">
                            <a :class="{selected_item : suppliersData.isSale == index}" class="no-padding"
                               style="text-align: center">{{titleItem.titleName}}</a>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </div>


                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">税号
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入税号"   v-model="suppliersData.dutyNum">
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">业务员<span class="span-red">*</span>
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <div class="input-group-btn">
                        <button data-toggle="dropdown" style="width: 100%"
                                class="form-control gray-bg     input_circular_corner   " type="button">
                          {{  getOperatorIdItems(operatorIdItems[operatorIdItemsIndex])}}<span class=" caret goods_tips_down"></span>
                        </button>
                        <ul class="dropdown-menu" style="width: 100%">
                          <li @click="operatorIdItem(index,titleItem.operatorId)" v-for="(titleItem, index) in operatorIdItems">
                            <a :class="{selected_item :operatorIdItemsIndex == index}" class="no-padding"
                               style="text-align: center">{{titleItem.roleName}}</a>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">开户户名
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入开户户名"   v-model="suppliersData.accountName">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">开户银行
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入开户银行"  v-model="suppliersData.accountBank">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' "
                       class=" goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">银行账号
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入银行账号"v-model="suppliersData.accountNo">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' "
                       class=" goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">联系人
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入联系人姓名" v-model="suppliersData.contactName">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' "
                       class=" goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">电话
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入联系人电话" v-model="suppliersData.contactPhone">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' "
                       class=" goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <span type="text" class="form-control  input_circular_corner" style="    border: 1px solid white;" placeholder=" "></span>
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' "
                       class=" goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">法人姓名
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入法人姓名" v-model="suppliersData.legalPerson">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' "
                       class=" goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">身份证号
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入身份证号" v-model="suppliersData.idcardNo">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding "
                       id="data_7">
                    <label :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                           class="pull-left no-padding left_text_tips font-noraml margin-right-100">期限</label>
                    <div class="input-group date  padding-right-15" :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' "
                        >
                      <span class="form-control gray-bg   input-group-addon input_circular_right_radius   "
                            style="width: 20%;   line-height:  1.5; float: right;"><i class="fa fa-calendar"></i></span>
                      <input type="text" style="width: 80%;float: left ;" placeholder="委托书期限"  id="entrustDate"
                             class="form-control gray-bg input_circular_left_radius">
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' "
                       class=" goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">营业执照
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入营业执照号" v-model="suppliersData.businessLicence">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' "
                       class=" goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">发证机关
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入营业执照发证机关" v-model="suppliersData.issuingAuthority">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding "
                       id="data_6">
                    <label :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                           class="pull-left no-padding left_text_tips font-noraml margin-right-100">有效期</label>
                    <div class="input-group date   padding-right-15" :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' "
                        >
                      <span class="form-control gray-bg   input-group-addon input_circular_right_radius   "
                            style="width: 20%;   line-height:  1.5; float: right;"><i class="fa fa-calendar"></i></span>
                      <input type="text" style="width: 80%;float: left ;" placeholder="营业执照有效期"
                             class="form-control gray-bg input_circular_left_radius"  id="licenseValidDate">
                    </div>
                  </div>


                  <div class="no-padding col-md-12 procurement_form-div_margin">
                    <div class=" col-md-1 pull-left no-padding left_text_tips"> 经营范围 </div>
                    <div class="col-md-11 col-md-11-padding-r"   >
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入营业执照经营范围" v-model="suppliersData.businessScope"></div></div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding "
                       id="data_5">
                    <label :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                           class="pull-left no-padding left_text_tips font-noraml margin-right-100">协议效期</label>
                    <div class="input-group date   padding-right-15" :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' "
                        >
                      <span class="form-control gray-bg   input-group-addon input_circular_right_radius   "
                            style="width: 20%;   line-height:  1.5; float: right;"><i class="fa fa-calendar"></i></span>
                      <input type="text" style="width: 80%;float: left ;" placeholder="质量协议效期" id="qualityValidDate"
                             class="form-control gray-bg input_circular_left_radius">
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding "
                       id="data_4">
                    <label :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                           class="pull-left no-padding left_text_tips font-noraml margin-right-100">特殊药品</label>
                    <div class="input-group date   padding-right-15" :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' "
                        >
                      <span class="form-control gray-bg   input-group-addon input_circular_right_radius   "
                            style="width: 20%;   line-height:  1.5; float: right;"><i class="fa fa-calendar"></i></span>
                      <input type="text" style="width: 80%;float: left ;" placeholder="委托书期限" id="specialEntrustDate"
                             class="form-control gray-bg input_circular_left_radius">
                    </div>
                  </div>

                <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">停售
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <div class="input-group-btn">
                        <button data-toggle="dropdown" style="width: 100%"
                                class="form-control gray-bg     input_circular_corner   " type="button">
                          {{saleFlagItems[ suppliersData.saleFlag].titleName}}<span class=" caret goods_tips_down"></span>
                        </button>
                        <ul class="dropdown-menu" style="width: 100%">
                          <li @click="saleFlagItem(index)" v-for="(titleItem, index) in saleFlagItems">
                            <a :class="{selected_item : suppliersData.saleFlag == index}" class="no-padding"
                               style="text-align: center">{{titleItem.titleName}}</a>
                          </li>

                        </ul>
                      </div>
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' "
                       class=" goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">收货人
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入收货人姓名" v-model="suppliersData.consigneePerson">
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' "
                       class=" goods_form-div_margin no-padding">

                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">收货电话
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入收货电话 "  v-model="suppliersData.deliveryPhone">
                    </div>
                  </div>
                  <div class="no-padding col-md-12 procurement_form-div_margin">
                    <div class=" col-md-1 pull-left no-padding left_text_tips"> 送货地址 </div>
                    <div class="col-md-11 col-md-11-padding-r"   >
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入收货地址" v-model="suppliersData.deliveryAddress"></div></div>
                 <!-- <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">停售:
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <div class="input-group-btn">
                        <button data-toggle="dropdown" style="width: 100%"
                                class="form-control gray-bg     input_circular_corner   " type="button">
                          {{saleFlagItems[suppliersData.businessState].titleName}}<span class=" caret goods_tips_down"></span>
                        </button>
                        <ul class="dropdown-menu" style="width: 100%">
                          <li @click="saleFlagItem(index)" v-for="(titleItem, index) in saleFlagItems">
                            <a :class="{selected_item : suppliersData.businessState == index}" class="no-padding"
                               style="text-align: center">{{titleItem.titleName}}</a>
                          </li>

                        </ul>
                      </div>
                    </div>

                  </div>
-->                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding "
                       id="data_8">
                    <label :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                           class="pull-left no-padding left_text_tips font-noraml margin-right-100">建档日期</label>
                    <div class="input-group date  padding-right-15" :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' "
                      >
                      <span class="form-control gray-bg   input-group-addon input_circular_right_radius   "
                            style="width: 20%;   line-height:  1.5; float: right;"><i class="fa fa-calendar"></i></span>
                      <input type="text" style="width: 80%;float: left ;" id="createdDate"
                             class="form-control gray-bg input_circular_left_radius"placeholder="请选择建档日期"  >
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' "
                       class=" goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">许可证号
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="医疗器械许可证号"  v-model="suppliersData.armariumLicense">
                    </div>
                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding "
                       id="data_3">
                    <label :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                           class="pull-left no-padding left_text_tips font-noraml margin-right-100">有效期</label>
                    <div class="input-group date     padding-right-15" :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' "
                      >
                      <span class="form-control gray-bg   input-group-addon input_circular_right_radius   "
                            style="width: 20%;   line-height:  1.5; float: right;"><i class="fa fa-calendar"></i></span>
                      <input type="text" style="width: 80%;float: left ;" placeholder="医疗许可证号有效期"  id="armariumDate"
                             class="form-control gray-bg input_circular_left_radius">
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding "
                       id="data_2">
                    <label :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                           class="pull-left no-padding left_text_tips font-noraml margin-right-100">进货合同</label>
                    <div class="input-group date    padding-right-15" :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' "
                     >
                      <span class="form-control gray-bg   input-group-addon input_circular_right_radius   "
                            style="width: 20%;   line-height:  1.5; float: right;"><i class="fa fa-calendar"></i></span>
                      <input type="text" style="width: 80%;float: left ;" placeholder="进货合同有效期"   id="purchaseValidDate"
                             class="form-control gray-bg input_circular_left_radius">
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding "
                       id="data_1">
                    <label :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                           class="pull-left no-padding left_text_tips font-noraml margin-right-100">销售合同</label>
                    <div class="input-group date    padding-right-15" :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' "
                          >
                      <span class="form-control gray-bg   input-group-addon input_circular_right_radius   "
                            style="width: 20%;   line-height:  1.5; float: right;"><i class="fa fa-calendar"></i></span>
                      <input type="text" style="width: 80%;float: left ;" placeholder="销售合同有效期"   id="saleValidDate"
                             class="form-control gray-bg input_circular_left_radius">
                    </div>
                  </div>

                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">首营状态
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <div class="input-group-btn">
                        <button data-toggle="dropdown" style="width: 100%"
                                class="form-control gray-bg     input_circular_corner   " type="button">
                          {{businessStateItems[suppliersData. businessState].titleName}}<span class=" caret goods_tips_down"></span>
                        </button>
                        <ul class="dropdown-menu" style="width: 100%">
                          <li @click="businessStateItem(index)" v-for="(titleItem, index) in businessStateItems">
                            <a :class="{selected_item :suppliersData. businessState == index}" class="no-padding"
                               style="text-align: center">{{titleItem.titleName}}</a>
                          </li>

                        </ul>
                      </div>
                    </div>

                  </div>
                  <div :class="assist_inquiry_show ? 'col-md-6' : 'col-md-4' " class="goods_form-div_margin no-padding">
                    <div :class="assist_inquiry_show ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">客户类别
                    </div>
                    <div :class="assist_inquiry_show ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <div class="input-group-btn">
                        <button data-toggle="dropdown" style="width: 100%"
                                class="form-control gray-bg     input_circular_corner   " type="button">
                          {{custTypeItems[suppliersData. custType ].titleName}}<span class=" caret goods_tips_down"></span>
                        </button>
                        <ul class="dropdown-menu" style="width: 100%">
                          <li @click="custTypeItem(index)" v-for="(titleItem, index) in custTypeItems">
                            <a :class="{selected_item :suppliersData. custType == index}" class="no-padding"
                               style="text-align: center">{{titleItem.titleName}}</a>
                          </li>

                        </ul>
                      </div>
                    </div>

                  </div>

                  <div class="no-padding col-md-12 procurement_form-div_margin">
                    <div class=" col-md-1 pull-left no-padding left_text_tips"> 采购部意见 </div>
                    <div class="col-md-11 col-md-11-padding-r"   >
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入采购部意见" v-model="suppliersData.purchaseOpinion"></div></div>


                  <div class="no-padding col-md-12 procurement_form-div_margin">
                    <div class=" col-md-1 pull-left no-padding left_text_tips"> 质管部意见 </div>
                    <div class="col-md-11 col-md-11-padding-r"   >
                      <input type="text" class="form-control gray-bg input_circular_corner" placeholder="请输入质管部意见" v-model="suppliersData.qualityOpinion"></div></div>
                </div>


              </div>
            </div>

          </div>

        </div>
        <button style='margin: 30px 10px 30px 335px;' class='form-btn-black' @click="createSuppliers ">完成</button>
        <button class='layui-layer-close form-btn-white' data-dismiss="modal">放弃{{compileSuppliers}}</button>
            </div>
          <div class="add_body_bottom" ></div>
            </div>
      </div>
    </div>
</template>

<script>
  import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'
  import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
  import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min'
  export default {
    mounted: function () {
      $('#data_1 .input-group.date').datepicker(this.datepickerData);
      $('#data_2 .input-group.date').datepicker(this.datepickerData);
      $('#data_3 .input-group.date').datepicker(this.datepickerData);
      $('#data_4 .input-group.date').datepicker(this.datepickerData);
      $('#data_5 .input-group.date').datepicker(this.datepickerData);
      $('#data_6 .input-group.date').datepicker(this.datepickerData);
      $('#data_7 .input-group.date').datepicker(this.datepickerData);
      $('#data_8 .input-group.date').datepicker(this.datepickerData);
      $('#data_9 .input-group.date').datepicker(this.datepickerData);
      this.$nextTick(() => $(window).scrollTop(0));


    },

    data(){
      return {
        assist_inquiry_show: false,
        assist_inquiry_showed: false,
        suppliersItems: [
          {titleName: '否'},
          {titleName: '是'},
        ],
        saleItems: [
          {titleName: '否'},
          {titleName: '是'},
        ],
        operatorIdItems: [],
        operatorIdItemsIndex:0,

        saleFlagItems: [
          {titleName: '否'},
          {titleName: '是'},
        ], businessStateItems: [
          {titleName: '否'},
          {titleName: '是'},
        ],custTypeItems: [
          {titleName: '否'},
          {titleName: '是'},
        ],
        suppliersIndex: 0,
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

        compileSuppliersNo:"",
        suppliersData:{
           supplierName:"",
           isSale:0,
           dutyNum:"",
           operatorId:0,
           companyAddress:"",
           accountName:"",
           accountBank:"",
           accountNo:"",
           contactName:"",
           contactPhone:"",
           legalPerson:"",
           idcardNo:"",
           entrustDate:"",
           businessLicence:"",
           issuingAuthority:"",
           licenseValidDate:"",
           businessScope:"",
           qualityValidDate:"",
           specialEntrustDate:"",
           consigneePerson:"",
           deliveryPhone:"",
           deliveryAddress:"",
           saleFlag:0,
           createdDate:"",
           armariumDate:"",
           armariumLicense:"",
           purchaseValidDate:"",
           saleValidDate:"",
           businessState:0,
           custType:0,
           qualityOpinion:"",
           purchaseOpinion:"",
         }


      }
    },

    created(){
      this.queryOpers();

    },

    computed : {

      compileSuppliers(){
      this. compileSuppliersNo=this.$store.getters.getCompileSuppliersNo;
     if (this. compileSuppliersNo){
       return this.supplierView( this. compileSuppliersNo);
     }else {
       return "";
     }
      }

    },
    methods: {
      queryOpers:function () {
        let that = this;
        this.$api.get(this, this.$requestApi.queryOperList,"", function (data) {
          if (data.body.code == '00') {
            that. operatorIdItems= data.body.data;
          } else {
            console.log(data.body.msg);
          }
        }, function (err) {
          console.log(err);
        });
      },
      getOperatorIdItems:function (operatorIdItem) {
        if (operatorIdItem){
          return  operatorIdItem .roleName;
        }

      },
      supplierView:function (compileSuppliersNo) {
        var that = this;
        this.$api.get(this, this.$requestApi.supplierView+compileSuppliersNo,"", function (data) {
          if (data.body.code == '00') {
           let suppliersData=  data.body.data;
            $("#entrustDate").val( that.$stringUtils.dateFormat(suppliersData.entrustDate));
            $("#qualityValidDate").val( that.$stringUtils.dateFormat(suppliersData.qualityValidDate));
            $("#specialEntrustDate").val(that.$stringUtils.dateFormat(suppliersData.specialEntrustDate));
            $("#licenseValidDate").val(that.$stringUtils.dateFormat(suppliersData.licenseValidDate));
            $("#createdDate").val(that.$stringUtils.dateFormat(suppliersData.createdDate));
            $("#armariumDate").val(suppliersData.armariumDate);
            $("#purchaseValidDate").val(that.$stringUtils.dateFormat(suppliersData.purchaseValidDate) );
            $("#saleValidDate").val(that.$stringUtils.dateFormat(suppliersData.saleValidDate));
            for(let i=0,j=that. operatorIdItems.length;i<j;i++){
              if (that. operatorIdItems[i].operatorId==that.suppliersData.operatorId){
                that.operatorIdItemsIndex=i;
                break;
              }

            }
            delete suppliersData['createDate'];
            delete suppliersData['doneDate'];
           return that.suppliersData= suppliersData;

          } else {
            console.log(data.body.msg);
          }

        }, function (err) {
          console.log(err);

        });
      },

      createSuppliers:function () {
        if ($("#entrustDate").val()==""){
          delete this.suppliersData ['entrustDate'];
        }else {
          this.suppliersData.entrustDate=$("#entrustDate").val();
        }
        if ($("#qualityValidDate").val()==""){
          delete this.suppliersData ['qualityValidDate'];
        }else {
          this.suppliersData.entrustDate=$("#qualityValidDate").val();
        }
        if ($("#specialEntrustDate").val()==""){
          delete this.suppliersData ['specialEntrustDate'];
        }else {
          this.suppliersData.entrustDate=$("#specialEntrustDate").val();
        }if ($("#licenseValidDate").val()==""){
          delete this.suppliersData ['licenseValidDate'];
        }else {
          this.suppliersData.entrustDate=$("#licenseValidDate").val();
        }if ($("#createdDate").val()==""){
          delete this.suppliersData ['createdDate'];
        }else {
          this.suppliersData.entrustDate=$("#createdDate").val();
        }if ($("#armariumDate").val()==""){
          delete this.suppliersData ['armariumDate'];
        }else {
          this.suppliersData.entrustDate=$("#armariumDate").val();
        }if ($("#purchaseValidDate").val()==""){
          delete this.suppliersData ['purchaseValidDate'];
        }else {
          this.suppliersData.entrustDate=$("#purchaseValidDate").val();
        }if ($("#saleValidDate").val()==""){
          delete this.suppliersData ['saleValidDate'];
        }else {
          this.suppliersData.entrustDate=$("#saleValidDate").val();
        }
        var that = this;
        this.$api.post(this,this.compileSuppliersNo?this.$requestApi.supplierUpdate+  this. compileSuppliersNo:this.$requestApi.createSuppliers , this.suppliersData, function (data) {
          if (data.body.code == '00') {
            that.returnPage();
            swal({   title: data.body.msg,   text: "", type: "success",  timer: 2000,   showConfirmButton: false });
          } else {
            swal({   title: data.body.msg,   text: "", type: "success",  timer: 2000,   showConfirmButton: false });
          }

        }, function (err) {
          console.log(err);

        });
      },

      change_phone: function () {
        this.inputState = false;
      },
      change_password: function () {
        this.pwInputState = false;
      },

      loseFocus: function () {
        this.inputState = true;
      },
      pwLoseFocus: function () {
        this.pwInputState = true;
      },

      selectSaleItem: function (selectedIndex) {
        this.suppliersData.isSale = selectedIndex;
        console.log(selectedIndex);
      }, saleFlagItem: function (selectedIndex) {
        this.suppliersData.saleFlag = selectedIndex;
        console.log(selectedIndex);
      },businessStateItem: function (selectedIndex) {
        this.suppliersData.businessState = selectedIndex;
        console.log(selectedIndex);
      },custTypeItem: function (selectedIndex) {
        this.suppliersData.custType = selectedIndex;
        console.log(selectedIndex);
      },
      operatorIdItem: function (index,operatorId) {
        this.operatorIdItemsIndex= index;

        this.suppliersData.operatorId = operatorId;
        console.log(index);
      },
      returnPage: function () {
        console.log("returnPage");
//        this.$store.dispatch('medicine_add_goods', "addReturnedGoods.vue" + Math.random());
//        this.$router.replace('/medicine/suppliers_manage');
        this.$store.dispatch('medicine_compile_suppliers_no',  "");
        this.$router.back();
      },
    },

  }

</script>
<style>
  .add_goods_body {
    padding: 10px;
  }

  .goods_form-div_margin {
    margin-bottom: 10px;
  }

  .goods_tips_down {
    position: absolute;
    right: 10px;
    top: 15px;
  }

  .input_circular_left_radius {
    border-bottom-left-radius: 5px !important;
    border-top-left-radius: 5px !important;
  }

  .input_circular_right_radius {
    border-bottom-right-radius: 5px !important;
    border-top-right-radius: 5px !important;
  }
  .span-red{
    color: red;
  }
  .form-control{
    font-size: 12px;
  }
  .col-md-11-padding-r{
    padding-right: 27px;
  }
  .margin-right-100{
    margin-right: 4.5%  !important ;
    /*margin-left: 29.5%   !important ;*/
    /*margin:0  0 0 29.5%;*/
    /**margin:0  0 0 29.5%;*/

  }
  .padding-right-15{
    padding-right: 15px !important;
  }

</style>
