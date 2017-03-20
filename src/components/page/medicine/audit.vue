<!--审核-->
<template>
<div class="body_audit">
  <ul class="audit_item">
    <li @click="clickSelectedAudit(index)" v-for="(item, index) in selectedAudit" :class="{selected_audit_item : item.selected}">
      <a> {{item.title}}</a>
    </li>
  </ul>
<div class="table_switch_tab">
  <table v-if="ostockType==$enumerationType.procurementType" class="table table-striped table-bordered table-hover dataTables-example">
    <thead>
      <tr >
        <th v-for="item in itemAudit1" class="text-center">{{item}}</th>
      </tr>
    </thead>
    <tbody>
      <tr class="gradeC" v-for="(data_item,index) in data_items">
        <td class="text-center">{{index+1}}</td>
        <td class="text-center">{{data_item.ostockId}}</td>
        <td class="text-center">{{$stringUtils.dateFormat(data_item.createDate)}}</td>
        <td class="text-center">{{data_item.operatorName}}</td>
        <td class="text-center">{{data_item.billId}}</td>
        <td class="text-center">{{data_item.supplierName}}</td>
        <td class="text-center">{{data_item.remark}}</td>
        <td class="text-center">{{data_item.storageSuppliers}}</td>
        <td class="text-center">{{$enumeration.getState(data_item.state)}}</td>
        <td class="text-center"><a @click="checkOrderDetailClick(data_item)" href="#/medicine/popup/checkOrderDetail">{{data_item.state == 2 ? '查看明细并审核':'查看明细'}}</a></td>
      </tr>
    </tbody>
  </table>
  <table v-if="ostockType==$enumerationType.storageType" class="table table-striped table-bordered table-hover dataTables-example">
    <thead>
      <tr >
        <th v-for="item in itemAudit2" class="text-center">{{item}}</th>
      </tr>
    </thead>
    <tbody>
      <tr class="gradeC" v-for="(data_item,index) in data_items">
        <td class="text-center">{{index+1}}</td>
        <td class="text-center">{{data_item.ostockId}}</td>
        <td class="text-center">{{$stringUtils.dateFormat(data_item.createDate)}}</td>
        <td class="text-center">{{data_item.operatorName}}</td>
        <td class="text-center">{{data_item.billId}}</td>
        <td class="text-center">{{data_item.supplierName}}</td>
        <td class="text-center">{{data_item.remark}}</td>
        <td class="text-center">{{data_item.storageSuppliers}}</td>
        <td class="text-center">{{$enumeration.getState(data_item.state)}}</td>
        <td class="text-center"><a @click="checkOrderDetailClick(data_item)" href="#/medicine/popup/checkOrderDetail">{{data_item.state == 2 ? '查看明细并审核':'查看明细'}}</a></td>
      </tr>
    </tbody>
  </table>
  <table v-if="ostockType==$enumerationType.outputType" class="table table-striped table-bordered table-hover dataTables-example">
    <thead>
      <tr >
        <th v-for="item in itemAudit3" class="text-center">{{item}}</th>
      </tr>
    </thead>
    <tbody>
      <tr class="gradeC" v-for="(data_item,index) in data_items">
        <td class="text-center">{{index+1}}</td>
        <td class="text-center">{{data_item.ostockId}}</td>
        <td class="text-center">{{$stringUtils.dateFormat(data_item.createDate)}}</td>
        <td class="text-center">{{data_item.operatorName}}</td>
        <td class="text-center">{{data_item.billId}}</td>
        <td class="text-center">{{data_item.supplierName}}</td>
        <td class="text-center">{{data_item.remark}}</td>
        <td class="text-center">{{data_item.storageSuppliers}}</td>
        <td class="text-center">{{$enumeration.getState(data_item.state)}}</td>
        <td class="text-center"><a @click="checkOrderDetailClick(data_item)" href="#/medicine/popup/checkOrderDetail">{{data_item.state == 2 ? '查看明细并审核':'查看明细'}}</a></td>
      </tr>
    </tbody>
  </table>
  <table v-if="ostockType==$enumerationType.returnsType" class="table table-striped table-bordered table-hover dataTables-example">
    <thead>
      <tr >
        <th v-for="item in itemAudit4" class="text-center">{{item}}</th>
      </tr>
    </thead>
    <tbody>
      <tr class="gradeC" v-for="(data_item,index) in data_items">
        <td class="text-center">{{index+1}}</td>
        <td class="text-center">{{data_item.ostockId}}</td>
        <td class="text-center">{{$stringUtils.dateFormat(data_item.createDate)}}</td>
        <td class="text-center">{{data_item.operatorName}}</td>
        <td class="text-center">{{data_item.billId}}</td>
        <td class="text-center">{{data_item.supplierName}}</td>
        <td class="text-center">{{data_item.remark}}</td>
        <td class="text-center">{{data_item.storageSuppliers}}</td>
        <td class="text-center">{{$enumeration.getState(data_item.state)}}</td>
        <td class="text-center"><a @click="checkOrderDetailClick(data_item)" href="#/medicine/popup/checkOrderDetail">{{data_item.state == 2 ? '查看明细并审核':'查看明细'}}</a></td>
      </tr>
    </tbody>
  </table>
  <table v-if="ostockType==$enumerationType.inventoryType" class="table table-striped table-bordered table-hover dataTables-example">
    <thead>
      <tr >
        <th v-for="item in itemAudit5" class="text-center">{{item}}</th>
      </tr>
    </thead>
    <tbody>
      <tr class="gradeC" v-for="(data_item,index) in data_items">
        <td class="text-center">{{index+1}}</td>
        <td class="text-center">{{data_item.ostockId}}</td>
        <td class="text-center">{{$stringUtils.dateFormat(data_item.createDate)}}</td>
        <td class="text-center">{{data_item.operatorName}}</td>
        <td class="text-center">{{data_item.billId}}</td>
        <td class="text-center">{{data_item.supplierName}}</td>
        <td class="text-center">{{data_item.remark}}</td>
        <td class="text-center">{{data_item.storageSuppliers}}</td>
        <td class="text-center">{{$enumeration.getState(data_item.state)}}</td>
        <td class="text-center"><a @click="checkOrderDetailClick(data_item)" href="#/medicine/popup/checkOrderDetail">{{data_item.state == 2 ? '查看明细并审核':'查看明细'}}</a></td>
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
        itemAudit1:["序号","采购单号","订单日期","采购人员","采购人员电话","供应商","备注","审核意见","状态","操作",],
        itemAudit2:["序号","入库单号","订单日期","入库人员","入库人员电话","供应商","备注","审核意见","状态","操作",],
        itemAudit3:["序号","出库单号","订单日期","出库人员","出库人员电话","供应商","备注","审核意见","状态","操作",],
        itemAudit4:["序号","退货单号","订单日期","退货人员","退货人员电话","供应商","备注","审核意见","状态","操作",],
        itemAudit5:["序号","盘点单号","订单日期","盘点人员","盘点人员电话","供应商","备注","审核意见","状态","操作",],
        selectedIndex:0,
        mode:1,
        data_items:[],
        ostockType: this.$enumerationType.procurementType,
      }

    },
    created(){
      this.request_list();
    },
    methods:{
      request_list:function () {
        var that=this;
        this.$api.get(this,this.$requestApi.stockSearch+this.ostockType,{iDisplayStart :1,iDisplayLength :10},function  (data) {
          if(data.status=='200'){
            that.data_items = data.body.data;
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
          this.selectedAudit[ this.selectedIndex].selected=false;
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
    padding: 10px;

  }
  .selected_audit_item{
    border-bottom:  1px solid #314268;;

  }
  .audit_item{
    overflow: hidden;
  }
  .table-margin-r-5{
    margin-right: 5px;
  }
</style>
