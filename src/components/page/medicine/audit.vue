<!--审核-->

<template>
<div class="body_audit">
  <ul class="audit_item">
    <li @click="clickSelectedAudit(index)" v-for="(title, index) in selectedAudit" :class="{selected_audit_item : title.selected}">
     <a> {{title.name}}</a>
    </li>
  </ul>
<div class="table_switch_tab">
  <procurement-audit-table :items="title.itemAudit" :selectedIndex="selectedIndex" :auditContent="title.auditContent"  v-for="title in selectedAudit"  v-show="title.selected" ></procurement-audit-table>
</div>
  <pagination v-show="data_items.length > 0"></pagination>
</div>
</template>


<script>
  import procurementAuditTable from "components/page/medicine/table/procurementAuditTable.vue";
  import pagination from 'components/page/doctor_clinic/bottom_pagination.vue'

  export default {
    components: {
      procurementAuditTable,
      pagination
    },
    data(){
      return {
        selectedAudit:[
          {
            name:"采购审核",
            selected:true,
            itemAudit:[
              {  name: '序号',},
              {  name:"采购单号",},
              {  name:"订单日期",},
              {  name:"采购员",},
              {  name:"采购员电话",},
              {  name:"供应商",},
              {  name:"备注",},
              {  name:"状态"},
              {  name:"操作"},
          ],
            auditContent:[
              {
                no: '001',
                storageOdd:"采购单号",
                storageDate:"2018-01-09",
                storageMember:"张三",
                storagePhone:"13026306662",
                storageSuppliers:"哈药制作",
                storageRemarks:"123",
                storageStatus:"审核失败",
                storageDelete:"  删除" ,
                storageCompile:"编辑  "

              },
            ]
           },
          {
            name:"入库审核",
            selected:false,
            itemAudit:[
              {  name: '序号',},
              {  name:"入库单号",},
              {  name:"订单日期",},
              {  name:"供应商",},
              {  name:"入库员",},
              {  name:"入库员电话",},
              {  name:"备注",},
              {  name:"状态",},
              {  name:"操作"},
            ],
            auditContent:[
              {
                no: '001',
                storageOdd:"入库单号",
                storageDate:"2018-01-09",
                storageSingle:"采购001",
                storageMember:"张三",
                storagePhone:"13026306662",
                storageRemarks:"123",
                storageStatus:"审核失败",
                storageDelete:" 删除",
                storageCompile:"编辑  "

              },
            ]
           },{
            name:"出库审核",
            selected:false,
            itemAudit:[
              {  name: '序号',},
              {  name:"出库单号",},
              {  name:"订单日期",},
              {  name:"出库人员",},
              {  name:"出库人员电话",},
              {  name:"备注",},
              {  name:"审核意见",},
              {  name:"状态",},
              {  name:"操作"},
            ],
            auditContent:[
              {
                no: '001',
                storageOdd:"出库单号",
                storageDate:"2018-01-09",
                storageSingle:"出库方式",
                storageMember:"儿科",
                storagePhone:"张三",
                storageRemarks:"123",
                storageStatus:"审核失败",
                storageDelete:" 删除",
                storageCompile:"编辑  "

              },
            ]
           },{
            name:"退货审核",
            selected:false,
            itemAudit:[
              {  name: '序号',},
              {  name:"退货单号",},
              {  name:"订单日期",},
              {  name:"退货人员",},
              {  name:"退货人员电话",},
              {  name:"备注",},
              {  name:"审核意见",},
              {  name:"状态",},
              {  name:"操作"},
            ],
            auditContent:[
              {
                no: '001',
                storageOdd:"退货单号",
                storageDate:"2018-01-09",
                storageMember:" 13026306662",
                storageSingle:"张三",
                storagePhone:"备注",
                storageRemarks:"123",
                storageStatus:"审核失败",
                storageDelete:"  删除",
                storageCompile:"编辑  "

              },
            ]
           },{
            name:"盘点审核",
            selected:false,
            itemAudit:[
              {  name: '序号',},
              {  name:"盘点单号",},
              {  name:"盘点日期",},
              {  name:"盘点人员",},
              {  name:"盘点人员电话",},
              {  name:"备注",},
              {  name:"审核意见",},
              {  name:"状态",},
              {  name:"操作"},
            ],
            auditContent:[
              {
                no: '001',
                storageOdd:"入库单号",
                storageDate:"2018-01-09",
                storageMember:"13026308883",
                storageRemarks:"123",
                storageSingle:"张三",
                storagePhone:"备注",
                storageStatus:"审核失败",
                storageDelete:"删除  ",
                storageCompile:"编辑  "

              },
            ]
           },
        ]
        ,
        selectedIndex:0,
        mode:1,
        data_items:[],
      }

    },
    created(){
      this.request_list();
    },
    methods:{
      request_list:function () {
        var that=this;
        this.$api.get(this,this.$requestApi.todayPatient,"",function  (data) {
          if(data.status=='200'){
            that.data_items = data.body.data;
            that.$store.dispatch('setPageCount', Number(data.body.pageCount));
            var counts = [(Number(data.body.receivedCount) + Number(data.body.waitReceiveCount)), data.body.receivedCount, data.body.waitReceiveCount];
            that.$store.dispatch('changeTitleCount', counts);
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
  .table_switch_tab{
    /*width: 100%;*/
    /*height: 100%;*/
    /*background: #ffffff;*/
  }

</style>
