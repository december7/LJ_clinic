<!--治疗-->
<template>
    <div  style="padding: 0 15px;" class="cure_container">
        <table class="table text-center no-margins white-bg">
            <thead>
            <tr>
                <th class="text-center" style="border-bottom: none">名称</th>
                <th class="text-center l_r_border" style="border-bottom: none">单价</th>
                <th class="text-center" style="border-bottom: none">单位</th>
                <th class="text-center l_r_border" style="border-bottom: none">数量</th>
                <th class="text-center" style="border-bottom: none">金额</th>
                <th class="text-center l_r_border" style="border-bottom: none">说明</th>
                <th class="text-center r_border" style="border-bottom: none">治疗进度</th>
                <th class="text-center" style="border-bottom: none">操作</th>
            </tr>
            </thead>
            <tbody class="cure_table_container">

            <tr v-for="(cure_item, index) in cure_items" >
                <td :class="{focus_border : (cure_item.focus && currentFocusIndex == 0&&cure_item.operType!=4)}" class="no-padding" style="width: 160px">
                    <input @input="getDataList(cure_item.projectName)" @focus="getFocus(cure_item, 0,cure_item.projectName)"   @blur="loseFocus(cure_item)"   class="form-control white-bg no-padding text-center no-borders" style="height: auto; background: white" type="text" v-model="cure_item.projectName">
                    <div v-show="cure_item.focus && currentFocusIndex == 0" class="list_menu">
                        <div v-if="dataList.length == 0&&cure_item.operType!=4" class="red-bg">暂无该治疗</div>
                        <ul  v-else  class="no-margins attopic">
                            <li @mousedown="selectedName(data, cure_item)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.projectName}}</a></li>
                        </ul>
                    </div>
                </td>
                <td class="l_r_border cure_little_item no-padding"><span class="form-control white-bg no-padding text-center no-borders" readonly="readonly"  style="height: auto; background-color: white">{{$enumeration.getGoodsPrice (cure_item.retailPrice)}}</span></td>
                <td class="little_item"><span class="form-control white-bg no-padding text-center no-borders" readonly="readonly" type="text" style="height: auto;background-color: white" >{{$enumeration.getProjectUnit(cure_item.projectUnit)}}</span></td>
                <td class="l_r_border cure_little_item" :class="cure_item.focus && currentFocusIndex == 2? 'focus_border' : 'l_r_border' "> <input class="form-control white-bg no-padding text-center no-borders"  @focus="getFocus(cure_item, 2)" @blur="loseFocus(cure_item)"    type="text" style="height: auto;" v-model="cure_item.amount"></td>
                <td class="cure_little_item"><span class="form-control white-bg no-padding text-center no-borders" readonly="readonly" style="height: auto;background-color: white" >{{$enumeration.getCountMoney(cure_item.retailPrice,cure_item.amount)}}</span></td>
                <td :class="cure_item.focus && currentFocusIndex == 1 ? 'focus_border' : 'l_r_border' "> <input @focus="getFocus(cure_item, 1)" @blur="loseFocus(cure_item)" placeholder="点击添加备注说明" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="cure_item.remark"></td>
                <td class="r_border text-danger">{{cure_item.state==1?'待治疗':'已治疗'}}</td>
                <td><a @click="delete_cure_item(cure_item,index)" class="un_skip_link">删除</a></td>
            </tr>

            <tr id="add_cure_line">
                <td @click="add_cure" id="add_cure"><a class="un_skip_link">新增治疗</a>
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
        <div class="text-center p-lg gray-bg">
            <button type="button" id="btn_print_add_cure" class="btn btn-w-m btn-primary">打印</button>
            <button type="button" id="btn_save_add_cure" class="btn btn-w-m btn-white" @click="saveTreatment">{{registeredOrd}}{{getTemplate}}保存</button>
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
                }},
          getTemplate(){
                  console.log("getTemplate--------------------");
                let getTemplateContent=  this.$store.getters.getTemplateContent;
                let getTemplateType=  this.$store.getters.getTemplateType;
                if (getTemplateType==1){
                  for (let i in getTemplateContent){
                    this.cure_items.push({
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
                isCreated:false,
                cure_items: [],
                dataList: [],

                deleteCureItems:[],
                registeredOrdId:""
            }
        },
        methods:{
            money:function(retailPrice,count){
                if (retailPrice>0&&count>0){
                    return retailPrice*count;
                }else {
                    return "";
                }
            },
            /*新增治疗*/
            add_cure: function () {
                this.cure_items.push({
                    projectName: '',
                    retailPrice: '',
                    projectUnit: '',
                    count: '',
                    remark: '',
                    state: 1,
                    feeDetailOrdId: '',
                    operType: 1,
                    focus: false
                })
            },
            getDataList:function (projectName) {


                let that=this;
                that.$api.get(that,that.$requestApi.itemManageList+that.$enumerationType.projectTreatment
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
            request:function () {
                let that=this;
                that.$api.get(that,that.$requestApi.orderProjectInfo+that.registeredOrdId+"/"+that.$enumerationType.projectTreatment
                ,{ },function  (data) {
                    if(data.body.code=='00'){
                    that  .cure_items  =data.body.projectInfos;
                   for (let i=0,j=data.body.projectInfos.length;i<j;i++){
                    that  .cure_items[i]. projectUnit=data.body.projectInfos[i].unit;
                    that  .cure_items[i].operType=4;
                }
                    }else{
                        console.log(data.body.msg);
                    }

                },function (err) {
                    console.log(err);

                });
            },
            saveTreatment:function () {

                let that=this;
                let treatProjectStrs=[];
                for (let i=0,j=that.cure_items.length;i<j;i++){
                    console.log(JSON.stringify(that.cure_items));
                    let treatProject={};
                   if ( that.cure_items[i].operType!=4){
                       treatProject={
                           remark:that.cure_items[i].remark,
                           projectId:that.cure_items[i].projectId,
                           operType:that.cure_items[i].operType,
                           amount:that.cure_items[i].amount
                       };

                       if (that.cure_items[i].operType!=1){
                           treatProject.feeDetailOrdId=that.cure_items[i].feeDetailOrdId;
                       }
                    treatProjectStrs.push(treatProject);


                   }


                };

                for( let d=0,k= that.deleteCureItems.length;d<k;d++){
                treatProjectStrs.push({
                           remark:that.deleteCureItems[d].remark,
                            projectId:that.deleteCureItems[d].projectId,
                            operType:that.deleteCureItems[d].operType,
                            amount:that.deleteCureItems[d].amount,
                            feeDetailOrdId:that.deleteCureItems[d].feeDetailOrdId,});
                    }
                if (treatProjectStrs.length===0){
                    return  swal({   title: "数据未修改",   text: "", type:that.$enumerationType.error,  timer: that.$enumerationType.timers,   showConfirmButton: false });
                }
                that.$api.post(that,that.$requestApi.treatProject+that.registeredOrdId
                        ,{
                            treatProjectStrs:JSON.stringify(treatProjectStrs),
                        },function  (data) {
                            if(data.body.code=='00'){

                                swal({   title: data.body.msg,   text: "", type:that.$enumerationType.success,  timer: that.$enumerationType.timers,   showConfirmButton: false });
                              that.request();
                              that.cure_items=[];
                              that.deleteCureItems=[];
                            }else{
                              swal({   title: data.body.msg,   text: "", type:that.$enumerationType.error,  timer: that.$enumerationType.timers,   showConfirmButton: false });

                              console.log(data.body.msg);
                            }

                        },function (err) {
                            console.log(err);

                        });

            },
            getFocus:function (item, focusIndex,projectName) {
                this.currentFocusIndex = focusIndex;
                item.focus = true;
                if (focusIndex==0){
                  this.  getDataList(projectName)
                }else  if (focusIndex==2||focusIndex==1){
                    if (item.feeDetailOrdId){
                        item.operType=2;
                      this.deleteCureItems.push(item);
                    }

                }
            },

            loseFocus:function (item) {
                item.focus = false;
                this.dataList = [];
            },
            /*删除列表行*/
            delete_cure_item: function (cure_item,currentIndex) {
                this.cure_items.splice(currentIndex, 1);
                if (cure_item.feeDetailOrdId) {
                    cure_item.operType = 3;
                    this.deleteCureItems.push(cure_item);
                }
            },
            selectedName:function (data, itemData) {
                itemData.projectName = data.projectName;
                itemData.projectId = data.projectId;
                itemData.retailPrice = data.retailPrice;
                itemData.projectUnit = data.projectUnit;
                itemData.operType = 1;
                itemData.state =1;
            },



        }
    }
</script>
<style>
    .bg-white{
        background: white;
    }
</style>
