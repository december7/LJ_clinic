<!--审核-->
<template>
<div class="body_audit">
  <div>
    <ul class="audit_item">
      <li @click="clickSelectedAudit(index)" v-for="(item, index) in selectedAudit" :class="{selected_audit_item : item.selected}">
        <a style="color:#212733">{{item.title}}</a>
      </li>
    </ul>
  </div>
<div class="table_switch_tab fadeInRight animated">
  <table class="table table-striped table-bordered table-hover dataTables-example">
    <thead>
      <tr >
        <th v-for="(item,index) in itemAudit" class="text-center">{{index == 1 || index == 3 || index == 4 ? ostockTypeName+item:item}}</th>
      </tr>
    </thead>
    <tbody>
      <tr class="gradeC" v-for="(data_item,index) in data_items">
        <td class="text-center">{{pageIndexNo()+index}}</td>
        <td class="text-center">{{data_item.ostockId}}</td>
        <td class="text-center">{{$stringUtils.dateFormat(data_item.createDate)}}</td>
        <td class="text-center">{{data_item.operatorName}}</td>
        <td class="text-center">{{data_item.billId}}</td>
        <td class="text-center">{{data_item.supplierName}}</td>
        <td class="text-center">{{data_item.remark}}</td>
        <td class="text-center">{{data_item.auditOpinion}}</td>
        <td class="text-center">{{$enumeration.getState(data_item.state)}}</td>
        <td class="text-center"><a @click="checkOrderDetailClick(data_item)" href="#/medicine/popup/checkOrderDetail">{{data_item.state == 2 || data_item.state == 3 ? '查看明细并审核':'查看明细'}}</a></td>
      </tr>
    </tbody>
  </table>
</div>
<pagination v-show="data_items.length > 0"></pagination>
</div>
</template>


<script>
  import pagination from 'components/page/doctor_clinic/bottom_pagination.vue';

  export default {
    components: {
      pagination
    },
    data(){
      return {
        selectedAudit: [
          {title: "采购审核",selected: true,},
          {title: "入库审核",selected: false,},
          {title: "出库审核",selected: false,},
          {title: "退货审核",selected: false,},
          {title: "盘点审核",selected: false,}
        ],
        itemAudit:["序号","单号","订单日期","人员","人员电话","供应商","备注","审核意见","状态","操作",],
        selectedIndex:0,
        mode:1,
        data_items:[],
        ostockType: this.$enumerationType.procurementType,
        ostockTypeName: '采购',
        requestParams: {
          iDisplayStart :'',
          iDisplayLength :this.$enumerationType.iDisplayLength,
        },
      }

    },
    created(){
      this.request_list();
    },
    methods:{
      pageIndexNo:function(){
        return (this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.$enumerationType.iDisplayLength+1;
      },
      request_list:function () {
        var that=this;
        that.requestParams.iDisplayStart =  this.pageIndexNo();
        this.$api.get(this,this.$requestApi.stockSearch+this.ostockType,this.requestParams,function  (data) {
          if(data.status=='200'){
            that.data_items = data.body.data;
            that.$store.dispatch('setPageCount',that.$enumerationType.getPageIDisplayLength(data.body.iTotalRecords));
            console.log(data.body.data);
          }else{
            console.log(data.body.msg);
          }
        },function (err) {
          console.log(err);
        });
      },
      clickSelectedAudit:function (index) {
        if ( this.selectedIndex!=index){
          this.selectedAudit[index].selected=true;
          this.selectedAudit[this.selectedIndex].selected=false;
          this.selectedIndex=index;
        }
        switch(index){
          case 0 :{
            this.ostockType = this.$enumerationType.procurementType;
            this.request_list();
            break;
          }
          case 1 :{
            this.ostockType = this.$enumerationType.storageType;
            this.request_list();
            break;
          }
          case 2 :{
            this.ostockType = this.$enumerationType.outputType;
            this.request_list();
            break;
          }
          case 3 :{
            this.ostockType = this.$enumerationType.returnsType;
            this.request_list();
            break;
          }
          case 4 :{
            this.ostockType = this.$enumerationType.inventoryType;
            this.request_list();
            break;
          }
        }
        if (this.ostockType == this.$enumerationType.procurementType){
          this.ostockTypeName="采购";
        }else if (this.ostockType == this.$enumerationType.storageType){
          this.ostockTypeName="入库";
        }else if (this.ostockType == this.$enumerationType.outputType){
          this.ostockTypeName="出库";
        }else if (this.ostockType == this.$enumerationType.returnsType){
          this.ostockTypeName="退货";
        }else if (this.ostockType == this.$enumerationType.inventoryType){
          this.ostockTypeName="盘点";
        }
      },

      checkOrderDetailClick: function (data_item) {
        this.$store.dispatch('show_stock_ostocktype',  this.ostockType);
        this.$store.dispatch('show_stock_ostockid',  data_item.ostockId);
      }
    },
  }
</script>
<style>
  .procurement_display{
    display: none;
  }
  .body_audit{
    margin: 0 10px 10px 10px;

  }
  .audit_item li{
    float: left;
    list-style: none;
    padding: 10px 20px 10px 20px;
    color:#212733;
  }
  .selected_audit_item{
    border-bottom:2px solid #314268;
  }
  .audit_item{
    overflow: hidden;
  }
  .table-margin-r-5{
    margin-right: 5px;
  }
</style>
