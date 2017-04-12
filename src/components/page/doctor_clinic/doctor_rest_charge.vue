<!--其他收费项目-->
<template>
    <div   style="padding: 0 15px;" class="other_charge_container">
        <table class="table no-margins text-center white-bg">
            <thead>
            <tr>
                <th class="text-center" style="border-bottom: none">名称</th>
                <th class="text-center l_r_border" style="border-bottom: none">单位</th>
                <th class="text-center" style="border-bottom: none">数量</th>
                <th class="text-center l_r_border" style="border-bottom: none">单价</th>
                <th class="text-center" style="border-bottom: none">金额</th>
                <th class="text-center l_r_border" style="border-bottom: none">备注说明</th>
                <th class="text-center" style="border-bottom: none">操作</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="(other_charge_item, index) in other_charge_items">
                <td :class="{focus_border : other_charge_item.focus && currentFocusIndex == 0}" style="width: 160px">
                    <input @input="getDataList(other_charge_item.projectName)" @focus="getFocus(other_charge_item, 0,other_charge_item.projectName)" @blur="loseFocus(other_charge_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="other_charge_item.projectName">
                        <ul  class="list_menu attopic">
                            <li @mousedown="selectOtherCharge(data, other_charge_item)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.projectName}}</a></li>
                        </ul>
                </td>
                <td :class="other_charge_item.focus && currentFocusIndex == 1 ? 'focus_border' : 'l_border' " class="little_item"><span @focus="getFocus(other_charge_item, 1)" @blur="loseFocus(other_charge_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" >{{$enumeration.getProjectUnit(other_charge_item.projectUnit) }}</span></td>
                <td :class="other_charge_item.focus && currentFocusIndex == 2 ? 'focus_border' : 'l_border' " class="little_item"><input @focus="getFocus(other_charge_item, 2)" @blur="loseFocus(other_charge_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="other_charge_item.amount"></td>
                <td :class="other_charge_item.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' " class="little_item"><span @focus="getFocus(other_charge_item, 3)" @blur="loseFocus(other_charge_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;"  >{{$enumeration.getGoodsPrice(other_charge_item.retailPrice)}}</span></td>
                <td :class="other_charge_item.focus && currentFocusIndex == 4 ? 'focus_border' : 'l_border' " class="little_item"><span @focus="getFocus(other_charge_item, 4)" @blur="loseFocus(other_charge_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" >{{$enumeration.getCountMoney(other_charge_item.amount,other_charge_item.retailPrice)}}</span></td>
                <td :class="other_charge_item.focus && currentFocusIndex == 5 ? 'focus_border' : 'l_border' " ><input @focus="getFocus(other_charge_item, 5)" @blur="loseFocus(other_charge_item)" class="form-control white-bg no-padding text-center no-borders" placeholder="点击添加备注说明" type="text" style="height: auto;" v-model="other_charge_item.remark"></td>
                <td class="l_border"><a @click="delete_other_charge_item(other_charge_item,index)">删除</a></td>
            </tr>
            <tr>
                <td @click="add_other_charge" id="add_other_charge">
                    <a class="un_skip_link">新增其他费用</a>
                </td>
                <td class="l_r_border"></td>
                <td></td>
                <td class="l_r_border"></td>
                <td></td>
                <td class="l_r_border"></td>
                <td></td>
            </tr>
            </tbody>
        </table>
        <div class="text-center p-lg gray-bg">
            <button type="button" id="btn_print_add_other_charge" class="btn btn-w-m btn-primary">打印</button>
            <button type="button" id="btn_save_add_other_charge" class="btn btn-w-m btn-white" @click="saveRestCharge">{{getTemplate}}保存</button>
        </div>
    </div>
</template>
<script>
    export default{
        created(){
            this.registeredOrdId=localStorage.getItem(this.$names.registeredOrdId);
            this.request();
        },
        computed:  {
            registeredOrd(){
                let registeredOrdId=  this.$store.getters.getCompileSuppliersNo;
                if (registeredOrdId){
                    this.registeredOrdId=registeredOrdId;
                    this.request();
                }  },
          getTemplate(){
            console.log("getTemplate--------------------");
            let getTemplateContent=  this.$store.getters.getTemplateContent;
            let getTemplateType=  this.$store.getters.getTemplateType;
            if (getTemplateType==4){
              for (let i in getTemplateContent){
                this.other_charge_items.push({
                  projectName: getTemplateContent[i].projectName,
                  retailPrice: getTemplateContent[i].retailPrice,
                  projectId: getTemplateContent[i].projectId,
                  projectUnit: getTemplateContent[i].projectUnit,
                  remark: getTemplateContent[i].projectDesc,
                  state:  1,
                  count: '',
                  feeDetailOrdId: '',
                  operType: 1,
                  focus: false
                })
              }
              this.$store.dispatch('setTemplateContentType', -1);
              this.$store.dispatch('setTemplateContent', "");
            }

            return "";
          },
        },
        data(){
            return {
                other_charge_items: [],
                currentFocusIndex:0,
                dataList: [],
                deleteOtherItems:[],
            }
        },
        methods:{
            getPrice:function (amount,retailPrice) {
                if (Number(amount)>=0&&Number(retailPrice)>=0){
                    return amount*retailPrice;
                }else {
                    return "";
                }

            },
            request:function () {
                let that=this;
                that.$api.get(that,that.$requestApi.orderProjectInfo+that.registeredOrdId+"/"+that.$enumerationType.projectOther
                        ,{ },function  (data) {
                            if(data.body.code=='00'){
                                that  .other_charge_items  =data.body.projectInfos;
                                for (let i=0,j=data.body.projectInfos.length;i<j;i++){
                                    that  .other_charge_items[i]. projectUnit=data.body.projectInfos[i].unit;
                                    that  .other_charge_items[i].operType=4;
                                }
                            }else{
                                console.log(data.body.msg);
                            }

                        },function (err) {
                            console.log(err);

                        });
            },
            getFocus:function (item, focusIndex,projectName) {
                this.currentFocusIndex = focusIndex;
                item.focus = true;
                if (focusIndex===0){
                    this.getDataList(projectName);
                }else  if (focusIndex==5||focusIndex==1){
                    if (item.feeDetailOrdId){
                        item.operType=2;
                        this.deleteOtherItems.push(item);
                    }

                }
            },
            saveRestCharge:function () {

                let that=this;
                let treatProjectStrs=[];
                for (let i=0,j=that.other_charge_items.length;i<j;i++){
                    console.log(JSON.stringify(that.other_charge_items));
                    let treatProject={};
                    if ( that.other_charge_items[i].operType!=4){
                        treatProject={
                            remark:that.other_charge_items[i].remark,
                            projectId:that.other_charge_items[i].projectId,
                            operType:that.other_charge_items[i].operType,
                            amount:that.other_charge_items[i].amount
                        };

                        if (that.other_charge_items[i].operType!=1){
                            treatProject.feeDetailOrdId=that.other_charge_items[i].feeDetailOrdId;
                        }
                        treatProjectStrs.push(treatProject);
                    }
                };
                for( let d=0,k= that.deleteOtherItems.length;d<k;d++){
                    treatProjectStrs.push({
                        remark:that.deleteOtherItems[d].remark,
                        projectId:that.deleteOtherItems[d].projectId,
                        operType:that.deleteOtherItems[d].operType,
                        amount:that.deleteOtherItems[d].amount,
                        feeDetailOrdId:that.deleteOtherItems[d].feeDetailOrdId,});
                }
                if (treatProjectStrs.length===0){
                    return  swal({   title: "数据未修改",   text: "", type:that.$enumerationType.error,  timer: that.$enumerationType.timers,   showConfirmButton: false });
                }
                that.$api.post(that,that.$requestApi.otherChargesStrs+that.registeredOrdId
                        ,{
                            otherChargesStrs:JSON.stringify(treatProjectStrs),
                        },function  (data) {
                            if(data.body.code=='00'){

                                swal({   title: data.body.msg,   text: "", type:that.$enumerationType.success,  timer: that.$enumerationType.timers,   showConfirmButton: false });
                                that.setDefaultData();
                            }else{
                              swal({   title: data.body.msg,   text: "", type:that.$enumerationType.error,  timer: that.$enumerationType.timers,   showConfirmButton: false });

                              console.log(data.body.msg);
                            }

                        },function (err) {
                            console.log(err);

                        });
            },
            setDefaultData:function () {
                this.deleteOtherItems=[];
                this.request();
            },
            loseFocus:function (item) {
                item.focus = false;
                this.dataList = [];
            },

            getDataList:function (projectName) {
                let that=this;
                that.$api.get(that,that.$requestApi.itemManageList+that.$enumerationType.projectOther
                        ,{          iDisplayLength:that.$enumerationType.iDisplayLength,
                            iDisplayStart:1,
                            state:1,
                            projectName:projectName
                        },function  (data) {
                            if(data.body.code=='00'){
                                that.dataList=data.body.data;

                            }else{
                                console.log(data.body.msg);
                            }

                        },function (err) {
                            console.log(err);

                        });
            },
            delete_other_charge_item: function (other_charge_item,currentIndex) {
                this.other_charge_items.splice(currentIndex, 1);
                if (other_charge_item.feeDetailOrdId) {
                    other_charge_item.operType = 3;
                    this.deleteOtherItems.push(other_charge_item);
                }
            },
            selectOtherCharge:function (data, itemData) {
                itemData.projectName = data.projectName;
                itemData.projectUnit = data.projectUnit;
                itemData.retailPrice = data.retailPrice;
                itemData.projectId = data.projectId;
            },
            /*新增其他收费*/
            add_other_charge: function () {
                this.other_charge_items.push({
                    projectName: '',
                    retailPrice: '',
                    projectId: '',
                    operType: 1,
                    amount: '',
                    remark: '',
                    focus: false
                })
            },
            getUnit:function (unit) {
                if (typeof  unit!="undefined"&&unit!=''&&unit>=0){
                    return this.$enumerationType.splitUnitItems[unit].titleName;

                }else {
                    return "";
                }
            },

        }
    }
</script>
