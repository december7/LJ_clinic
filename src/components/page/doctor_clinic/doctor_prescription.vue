<template>
    <div  style="padding: 0 15px;" class="prescription_container">
        <div>
            <div class="radio radio-info radio-inline">
                <input type="radio" id="western_medicine" value="1" v-model="prescription_type" name="radioInline"
                       style="margin-top: 1px">
                <label for="western_medicine" class="no-padding">西/成药处方</label>
            </div>
            <div class="radio radio-inline">
                <input id="chinese_medicine" type="radio" value="2" v-model="prescription_type" name="radioInline"
                       style="margin-top: 1px">
                <label for="chinese_medicine" class="no-padding">中药处方</label>
            </div>
        </div>
        <!--西/成药处方-->
        <div v-show="prescription_type == 1">
            <table class="table text-center no-margins white-bg">
                <thead>
                <tr>
                    <th class="text-center" style="border-bottom: none">药品名称</th>
                    <th class="text-center l_r_border" style="border-bottom: none">库存</th>
                    <th class="text-center" style="border-bottom: none">价格</th>
                    <th class="text-center l_r_border" style="border-bottom: none">剂量(次)</th>
                    <th class="text-center" style="border-bottom: none">单位(次)</th>
                    <th class="text-center l_r_border" style="border-bottom: none">用法</th>
                    <th class="text-center" style="border-bottom: none">用药频次</th>
                    <th class="text-center l_r_border" style="border-bottom: none">天数</th>
                    <th class="text-center r_border" style="border-bottom: none">数量</th>
                    <th class="text-center " style="border-bottom: none">单位</th>
                    <th class="text-center l_r_border" style="border-bottom: none">备注说明</th>
                    <th class="text-center r_border" style="border-bottom: none">状态</th>
                    <th class="text-center "  >操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(western_prescription_item, index) in western_prescription_items">
                    <td :class="{focus_border : western_prescription_item.focus && currentFocusIndex == 0}" style="width: 160px">
                        <input @input="getDataList(western_prescription_item.prodName)" @focus="getFocus(western_prescription_item, 0)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="western_prescription_item.prodName">
                        <div v-show="western_prescription_item.focus && currentFocusIndex == 0" class="list_menu">
                            <div v-if="dataList.length == 0" class="red-bg">暂无该处方</div>
                            <ul v-else class="no-margins">
                                <li @mousedown="selectWesternMedicine(data, western_prescription_item)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.prodName}}</a></li>
                            </ul>
                        </div>
                    </td>
                    <td class="l_border prescription_little_item"><input class="form-control white-bg no-padding text-center no-borders" readonly type="text" style="height: auto; background-color: white" v-model="western_prescription_item.stockNum"></td>
                    <td class="l_border cure_little_item"><input class="form-control white-bg no-padding text-center no-borders" readonly type="text" style="height: auto; background-color: white" v-model="western_prescription_item.retailPrice"></td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 1 ? 'focus_border' : 'l_border' " class="cure_little_item"> <input @focus="getFocus(western_prescription_item, 1)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model=" western_prescription_item.singleDose"></td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 2 ? 'focus_border' : 'l_border' " class="cure_little_item"> <span @focus="getFocus(western_prescription_item, 2)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" >{{ getUnit(western_prescription_item.doseUnit) }}</span></td>
                    <td class="l_border prescription_little_item"> <span class="form-control white-bg no-padding text-center no-borders" readonly type="text" style="height: auto; background-color: white"  >{{getUsageType(western_prescription_item.usageType) }}</span></td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' " class="cure_little_item"> <span @focus="getFocus(western_prescription_item, 3)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;">{{ getFrequency(western_prescription_item.frequency)}}</span></td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 4 ? 'focus_border' : 'l_border' " class="prescription_little_item"> <input @focus="getFocus(western_prescription_item, 4)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="western_prescription_item.dayNum"></td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 5 ? 'focus_border' : 'l_border' " class="prescription_little_item"> <input @focus="getFocus(western_prescription_item, 5)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="western_prescription_item.amount"></td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 7 ? 'focus_border' : 'l_border' " class="prescription_little_item"> <span @focus="getFocus(western_prescription_item, 7)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;">{{getProdUnit(western_prescription_item.unit)}}</span></td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 6 ? 'focus_border' : 'l_r_border' "><input @focus="getFocus(western_prescription_item, 6)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" placeholder="点击添加备注说明" style="height: auto;" v-model="western_prescription_item.remark"></td>
                    <td class="l_border text-danger">{{western_prescription_item.state==1?'待发药':'已发药'}}</td>
                    <td class="l_border"><a @click="delete_western_prescription_item(western_prescription_item,index)">删除</a></td>
                </tr>

                <tr>
                    <td @click="add_western_medicine_prescription" id="add_western_medicine_prescription">
                        <a class="un_skip_link">新增</a>
                    </td>
                    <td class="l_r_border"></td>
                    <td></td>
                    <td class="l_r_border"></td>
                    <td></td>
                    <td class="l_r_border"></td>
                    <td></td>
                    <td class="l_r_border"></td>
                    <td></td>
                    <td class="l_r_border"></td>
                    <td class="r_border"></td>
                    <td class="r_border"></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--中药处方-->
        <div v-show="prescription_type == 2">
            <table class="table text-center no-margins white-bg">
                <thead>
                <tr>
                    <th class="text-center" style="border-bottom: none">药品名</th>
                    <th class="text-center l_r_border" style="border-bottom: none">库存</th>
                    <th class="text-center" style="border-bottom: none">零售价(元)</th>
                    <th class="text-center l_r_border" style="border-bottom: none">剂量(次)</th>
                    <th class="text-center" style="border-bottom: none">单位(次)</th>
                    <th class="text-center l_r_border" style="border-bottom: none">备注说明</th>
                    <th class="text-center r_border" style="border-bottom: none">状态</th>
                    <th class="text-center">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(chinese_prescription_item, index) in chinese_prescription_items">
                    <td :class="{focus_border : chinese_prescription_item.focus && currentFocusIndex == 0}" style="width: 160px">
                        <input @input="getDataList(chinese_prescription_item.prodName)" @focus="getFocus(chinese_prescription_item, 0,chinese_prescription_item.prodName)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="chinese_prescription_item.prodName">
                        <div v-show="chinese_prescription_item.focus && currentFocusIndex == 0" class="list_menu">
                            <div v-if="dataList.length == 0" class="red-bg">暂无该处方</div>
                            <ul v-else  class="no-margins">
                                <li @mousedown="selectChinesePrescription(data, chinese_prescription_item)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.prodName}}</a></li>
                            </ul>
                        </div>
                    </td>
                    <td class="l_border little_item"><input class="form-control white-bg no-padding text-center no-borders" readonly type="text" style="height: auto; background-color: white" v-model="chinese_prescription_item.stockNum"></td>
                    <td class="l_border little_item"><input class="form-control white-bg no-padding text-center no-borders" type="text" readonly style="height: auto; background-color: white" v-model="chinese_prescription_item.retailPrice"></td>
                    <td :class="chinese_prescription_item.focus && currentFocusIndex == 1 ? 'focus_border' : 'l_border' " class="little_item"> <input @focus="getFocus(chinese_prescription_item, 1)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;"  v-model="chinese_prescription_item.singleDose"> </input></td>
                    <td :class="chinese_prescription_item.focus && currentFocusIndex == 2 ? 'focus_border' : 'l_border' " class="little_item"> <span @focus="getFocus(chinese_prescription_item, 2)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;"  > {{ getUnit(chinese_prescription_item.doseUnit) }}</span></td>
                    <td :class="chinese_prescription_item.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' "><input @focus="getFocus(chinese_prescription_item, 3)" @blur="loseFocus(chinese_prescription_item)" class="form-control white-bg no-padding text-center no-borders" placeholder="点击添加备注说明" type="text" style="height: auto;" v-model="chinese_prescription_item.remark"></td>
                    <td class="l_border text-danger">{{chinese_prescription_item.state==1?'待发药':'已发药'}}</td>
                    <td class="l_border"><a @click="delete_chinese_prescription_item(chinese_prescription_item,index)">删除</a></td>
                </tr>

                <tr>
                    <td @click="add_chinese_medicine_prescription" id="add_chinese_medicine_prescription">
                        <a>新增</a>
                    </td>
                    <td class="l_r_border"></td>
                    <td></td>
                    <td class="l_r_border"></td>
                    <td></td>
                    <td class="l_r_border"></td>
                    <td class="r_border"></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
            <div class="col-md-12 no-padding m-t-sm">
                <form method="get" class="form-horizontal">
                    <div class="form-group white-bg no-margins">
                        <div class="col-md-3">
                            <label class="col-md-2 control-label bottom_item">用法:</label>
                            <div class="col-md-8 no-padding">
                                <!--<input type="text" class="form-control no-padding no-borders">-->
                                <div class="input-group-btn">
                                    <button data-toggle="dropdown" style="width: 100%; border: 1px solid white;" class="form-control    " type="button">{{$enumerationType.usageTypeItems[usageType].titleName}}<span class=" caret goods_tips_down"></span>
                                    </button>
                                    <ul class="dropdown-menu" style="width: 100%" >
                                        <li @click="selectUsageTypeItem(index)" v-for="(titleItem, index) in $enumerationType.usageTypeItems">
                                            <a :class="{selected_item :  usageType== index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <label class="col-md-2 control-label bottom_item">频次:</label>
                            <div class="col-md-8 no-padding">
                                <!--<input type="text" class="form-control no-padding no-borders">-->
                                <div class="input-group-btn">
                                    <button data-toggle="dropdown" style="width: 100%;border: 1px solid white;" class="form-control    " type="button">{{$enumerationType.frequencyItems[ frequency].titleName}}<span class=" caret goods_tips_down"></span>
                                    </button>
                                    <ul class="dropdown-menu" style="width: 100%" >
                                        <li @click="selectFrequencyItem(index)" v-for="(titleItem, index) in $enumerationType.frequencyItems">
                                            <a :class="{selected_item :  frequency== index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <label class="col-md-2 control-label bottom_item">天数:</label>
                            <div class="col-md-8 no-padding">
                                <input  @input=" getForChinese" type="text" class="form-control no-padding no-borders" v-model="dayNum">
                            </div>
                        </div>

                        <div class="col-md-3">
                            <label class="col-md-3 control-label bottom_item">总副数:</label>
                            <div class="col-md-8 no-padding">
                                <input  @input=" getForChinese"  type="text" class="form-control no-padding no-borders" v-model="amount">
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
        <div class="col-md-12 text-center p-lg gray-bg">
            <button type="button" id="btn_print_prescription" class="btn btn-w-m btn-primary">打印</button>
            <button type="button" id="btn_save_prescription" class="btn btn-w-m btn-white" @click="savePrescription">{{registeredOrd}}保存</button>
        </div>
    </div>

</template>
<script>
    export  default{

        created(){
            this.registeredOrdId=localStorage.getItem(this.$names.registeredOrdId);
            this.request();
        },
        computed:  {
            registeredOrd(){
                let registeredOrdId=  this.$store.getters.getCompileSuppliersNo;
                if (registeredOrdId){
                    if (registeredOrdId!=this.registeredOrdId){
                        this.registeredOrdId=registeredOrdId;
                        this.request();
                    }

                }   }
        },

        data(){
            return{
                prescription_type:1,
                currentFocusIndex:0,
                western_prescription_items: [],
                chinese_prescription_items: [],
                dataList: [],
                deleteWesternItems:[],
                deleteChineseItems:[],
                registeredOrdId:"",
                usageType:0,
                frequency:0,
                amount:"",
                dayNum:"",

            }
        },
        methods:{
            request:function () {
                let that=this;
                that.$api.get(that,that.$requestApi.orderProdInfo+that.registeredOrdId+"/"+that.prescription_type
                        ,{ },function  (data) {
                            if(data.body.code=='00'){
                                that  .western_prescription_items  =data.body.prodInfos;
                                for (let i=0,j=data.body.prodInfos.length;i<j;i++){
                                    that .western_prescription_items[i].operType=4;
                                }
                            }else{
                                console.log(data.body.msg);
                            }

                        },function (err) {
                            console.log(err);
                        });
                that.$api.get(that,that.$requestApi.orderProdInfo+that.registeredOrdId+"/2"
                        ,{ },function  (data) {
                            if(data.body.code=='00'){
                                that .chinese_prescription_items  =data.body.prodInfos;
                                for (let i=0,j=data.body.prodInfos.length;i<j;i++){
                                    that .chinese_prescription_items[i].operType=4;
                                    that.usageType=   that .chinese_prescription_items[i].usageType;
                                    that.frequency=   that .chinese_prescription_items[i].frequency;
                                    that.amount=   that .chinese_prescription_items[i].amount;
                                    that.dayNum=   that .chinese_prescription_items[i].dayNum;
                                }
                                if (data.body.prodInfos.length==0){
                                    that.usageType=0;
                                    that.frequency= 0;
                                    that.amount=  "";
                                    that.dayNum= "";
                                }
                            }else{
                                console.log(data.body.msg);
                            }

                        },function (err) {
                            console.log(err);
                        });
            },
            getFocus:function (item, focusIndex,prodName) {
                this.currentFocusIndex = focusIndex;
                item.focus = true;
                if (focusIndex===0){

                this.getDataList(prodName);
                }
                if (this.prescription_type==1){
                    if (focusIndex==4||focusIndex==1||focusIndex==5||focusIndex==6){
                        if (item.prodOrdId){
                            item.operType=2;
                        }

                    }
                }else  {
                    if (focusIndex==3||focusIndex==1){
                        if (item.prodOrdId){
                            item.operType=2;
                        }

                    }
                }

            },

            loseFocus:function (item) {
                item.focus = false;
                this.dataList = [];
            },
            /*新增中药处方*/
            add_chinese_medicine_prescription: function () {
                this.chinese_prescription_items.push({
                    name: '',
                    repertory: '',
                    price: '',
                    dosage: '',
                    doseUnit: '',
                    unit: '',
                    state: 1,
                    operType: 1,
                    explain: '',
                    focus: false
                })
            },

            delete_western_prescription_item: function (western_prescription_item,currentIndex) {
                this.western_prescription_items.splice(currentIndex, 1);
                if (western_prescription_item.prodOrdId) {
                    western_prescription_item.operType = 3;
                    this.deleteWesternItems.push(western_prescription_item);
                }
            },

            delete_chinese_prescription_item: function (chinese_prescription_item,currentIndex) {
                this.chinese_prescription_items.splice(currentIndex, 1);
                if (chinese_prescription_item.prodOrdId) {
                    chinese_prescription_item.operType = 3;
                    this.deleteChineseItems.push(chinese_prescription_item);
                }
            },
            selectUsageTypeItem:function (selectedIndex) {
                this.usageType=selectedIndex;
            },  selectFrequencyItem:function (selectedIndex) {
                this.frequency=selectedIndex;
            },
            /*增加西药处方*/
            add_western_medicine_prescription: function () {
                this.western_prescription_items.push({
                    prodName: '',
                    repertory: '',
                    price: '',
                    dosage: '',
                    unit: '',
                    usage: '',
                    frequency: '',
                    usageType: '',
                    remark: '',
                    state: 1,
                    operType: 1,
                    prodUnit: '',
                    focus: false
                });
            },
            getDataList:function (prodName) {
                let that=this;
                that.$api.get(that, that.$requestApi.goodsSearch,{
                    prodType:that.  prescription_type,
                    iDisplayLength:that.$enumerationType.iDisplayLength,
                    iDisplayStart:1,
                    prodNameOrGenericNameOrEnglishName:prodName,
                    state:1,
                },function  (data) {
                    if(data.body.code=='00'){
                        that .dataList=data.body.data
                    }else{
                        console.log(data.body.msg);
                    }

                },function (err) {
                    console.log(err);

                });
            },
            selectWesternMedicine:function (data, itemData) {
                itemData.prodName = data.prodName;
                itemData.retailPrice = data.retailPrice;
                itemData.doseUnit = data.singleUnit;
                itemData.prodId = data.prodId;
                itemData.stockNum = data.stockNum;
                itemData.singleDose = data.singleDose;
                itemData.usageType = data.usageType;
                itemData.operType = 1;
                itemData.unit = data.prodUnit;
                itemData.state = 1;
                itemData.frequency = data.frequency;
            },
            selectChinesePrescription:function (data, itemData) {
                itemData.prodName = data.prodName;
                itemData.stockNum = data.stockNum;
                itemData.doseUnit = data.singleUnit;
                itemData.prodId = data.prodId;
                itemData.state = 1;
                itemData.operType = 1;
                itemData.retailPrice = data.retailPrice;
            },
            savePrescription:function () {

                let that=this;
                let treatProjectStrs="";
                let url="";
                let data={};
                if (that.prescription_type==1){
                 treatProjectStrs=that.getWesternMedicine();
                    url=that.$requestApi.westMedicine;
                    if (treatProjectStrs.length===0){
                        return  swal({   title: "数据未修改",   text: "", type:that.$enumerationType.error,  timer: that.$enumerationType.timers,   showConfirmButton: false });
                    }
                    data={westMedicineStrs:JSON.stringify(treatProjectStrs)};
                }else {
                 treatProjectStrs=that.getChineseMedicine();
                    if (treatProjectStrs.length===0){
                        return  swal({   title: "数据未修改",   text: "", type:that.$enumerationType.error,  timer: that.$enumerationType.timers,   showConfirmButton: false });
                    }
                    url=that.$requestApi.tradMedicine;
                    data={
                        amount:that.amount,
                        dayNum:that.dayNum,
                        frequency:that.frequency,
                        usageType:that.usageType,
                        tradMedicineStrs:JSON.stringify(treatProjectStrs),
                    };
                }

                that.$api.post(that,url+that.registeredOrdId
                        , data,function  (data) {
                            if(data.body.code=='00'){
                                swal({   title: data.body.msg,   text: "", type:that.$enumerationType.success,  timer: that.$enumerationType.timers,   showConfirmButton: false });

                            }else{
                                swal({   title: data.body.msg,   text: "", type:that.$enumerationType.error,  timer: that.$enumerationType.timers,   showConfirmButton: false });

                                console.log(data.body.msg);
                            }

                        },function (err) {
                            console.log(err);

                        });

            },
            /**西药*/
            getWesternMedicine:function () {
                let that=this;
                let treatProjectStrs=[];
                console.log(JSON.stringify(that.western_prescription_items));
                for (let i=0,j=that.western_prescription_items.length;i<j;i++){
                    let treatProject={};
                    if ( that.western_prescription_items[i].operType!=4){
                        treatProject={
                            remark:that.western_prescription_items[i].remark,
                            prodId:that.western_prescription_items[i].prodId,
                            operType:that.western_prescription_items[i].operType,
                            amount:that.western_prescription_items[i].amount,
                            dayNum:that.western_prescription_items[i].dayNum,
                            singleDose:that.western_prescription_items[i].singleDose,
                            unit:that.western_prescription_items[i].unit,
                            usageType:that.western_prescription_items[i].usageType,
                            frequency:that.western_prescription_items[i].frequency,
                            doseUnit:that.western_prescription_items[i].doseUnit
                        };

                        if (that.western_prescription_items[i].operType!=1){
                            treatProject.prodOrdId=that.western_prescription_items[i].prodOrdId;
                        }
                        treatProjectStrs.push(treatProject);
                    }
                };
                for( let d=0,k= that.deleteWesternItems.length;d<k;d++){
                    treatProjectStrs.push({
                        dayNum:that.deleteWesternItems[d].dayNum,
                        singleDose:that.deleteWesternItems[d].singleDose,
                        unit:that.deleteWesternItems[d].unit,
                        usageType:that.deleteWesternItems[d].usageType,
                        frequency:that.deleteWesternItems[d].frequency,
                        doseUnit:that.deleteWesternItems[d].doseUnit,
                        remark:that.deleteWesternItems[d].remark,
                        prodId:that.deleteWesternItems[d].prodId,
                        operType:that.deleteWesternItems[d].operType,
                        amount:that.deleteWesternItems[d].amount,
                        prodOrdId:that.deleteWesternItems[d].prodOrdId,});
                }
                console.log(JSON.stringify(treatProjectStrs));

                return treatProjectStrs;
            }, /**中药*/
            getChineseMedicine:function () {
                let that=this;
                let treatProjectStrs=[];
                console.log(JSON.stringify(that.chinese_prescription_items));
                for (let i=0,j=that.chinese_prescription_items.length;i<j;i++){
                    let treatProject={};
                    if ( that.chinese_prescription_items[i].operType!=4){
                        treatProject={
                            remark:that.chinese_prescription_items[i].remark,
                            prodId:that.chinese_prescription_items[i].prodId,
                            operType:that.chinese_prescription_items[i].operType,
                            singleDose:that.chinese_prescription_items[i].singleDose,
                            doseUnit:that.chinese_prescription_items[i].doseUnit
                        };

                        if (that.chinese_prescription_items[i].operType!=1){
                            treatProject.prodOrdId=that.chinese_prescription_items[i].prodOrdId;
                        }
                        treatProjectStrs.push(treatProject);
                    }


                };
                for( let d=0,k= that.deleteChineseItems.length;d<k;d++){
                    treatProjectStrs.push({
                        dayNum:that.deleteChineseItems[d].dayNum,
                        singleDose:that.deleteChineseItems[d].singleDose,
                        doseUnit:that.deleteChineseItems[d].doseUnit,
                        remark:that.deleteChineseItems[d].remark,
                        prodId:that.deleteChineseItems[d].prodId,
                        operType:that.deleteChineseItems[d].operType,
                        prodOrdId:that.deleteChineseItems[d].prodOrdId,});
                }
                console.log(JSON.stringify(treatProjectStrs));

                return treatProjectStrs;

            },
            getForChinese:function () {
                let that=this;
                for (let i=0,j=that.chinese_prescription_items.length;i<j;i++){
                    if (   that .chinese_prescription_items[i].operType==4){

                    that .chinese_prescription_items[i].operType=2;
                    }
                }
            },
            getUnit:function (unit) {
                if (typeof  unit!="undefined"&&unit!=''&&unit>=0){
              return this.$enumerationType.splitUnitItems[unit].titleName;

                }else {
                    return "";
                }
            },  getFrequency:function (frequency) {
                if (this.prescription_type==2){
                    this.getForChinese();
                }
                if (typeof  frequency!="undefined"&&frequency!=''&&frequency>=0){
              return this.$enumerationType.frequencyItems[frequency].titleName;
                }else {
                    return "";
                }

            },
            getUsageType:function (usageType) {
                if (this.prescription_type==2){
                    this.getForChinese();
                }
                if (typeof  usageType!="undefined"&&usageType!=''&&usageType>=0){
              return this.$enumerationType.usageTypeItems[usageType].titleName;
                }else {
                    return "";
                }


            }, getProdUnit:function (prodUnit) {
                if (typeof  prodUnit!="undefined"&&prodUnit!=''&&prodUnit>=0){
              return this.$enumerationType.splitUnitItems[prodUnit].titleName;
                }else {
                    return "";
                }
            },



        }
    }
</script>