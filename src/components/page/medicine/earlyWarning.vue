<!--预警-->

<template>
  <div class="body_audit">
    <ul class="audit_item">
      <li @click="clickSelectedAudit(index)" v-for="(title, index) in selectedAudit" :class="{selected_audit_item : title.selected}">
       <a> {{title.name}}</a>
      </li>
    </ul>
    <div class="table_switch_tab">
      <early-table :items="title.itemAudit" :auditContent="title.auditContent"  v-for="title in selectedAudit"  v-show="title.selected" ></early-table>
    </div>
    <pagination v-show="data_items.length > 0"></pagination>
  </div>
</template>


<script>
  import earlyTable from "components/page/medicine/table/earlyTable.vue";
  import pagination from 'components/page/doctor_clinic/bottom_pagination.vue'
  export  default{
  components: {
    earlyTable,
    pagination
  },
  data(){
    return {
      selectedAudit:[
        {
          name:"库存预警",
          selected:true,
          itemAudit:[
            {  name: '序号',},
            {  name:"商品名称",},
            {  name:"规格",},
            {  name:"生产厂家",},
            {  name:"单位",},
            {  name:"供应商",},
            {  name:"批号",},
            {  name:"有效期",},
            {  name:"成本价",},
            {  name:"零售价"},
          ],
          auditContent:[
            {
              no: '001',
              storageOdd:"采购单号",
              storageDate:"2018-01-09",
              storageSingle:"采购001",
              storageMember:"张三",
              storagePhone:"13026306662",
              storageSuppliers:"哈药制作",
              storageRemarks:"123",
              storageStatus:"审核失败",
              storageDelete:"编辑  删除"

            },
          ]
        },
        {
          name:"效期预警",
          selected:false,
          itemAudit:[
            {  name: '序号',},
            {  name:"商品名称",},
            {  name:"规格",},
            {  name:"生产厂家",},
            {  name:"供应商名称",},
            {  name:"批号",},
            {  name:"有效期",},
            {  name:"销售价",},
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
    clickSelectedAudit:function (index) {
      if ( this.selectedIndex!=index){
        this.selectedAudit[index].selected=true;
        this.selectedAudit[ this.selectedIndex].selected=false;
        this.selectedIndex=index;
      }
    },
    request_list:function () {
      var that=this;
      this.$api.get(this,this.$requestApi.todayPatient,"",function  (data) {
        if(data.status=='200'){
          that.data_items = data.body.data;
          that.$store.dispatch('setPageCount', Number(data.body.pageCount));
        }else{
          console.log(data.body.msg);
        }

      },function (err) {
        console.log(err);

      });
      this.$api.get(this,this.$requestApi.inventory,"",function  (data) {
        if(data.status=='200'){
          console.log(JSON.stringify(data.body.data));
          that.selectedAudit[0].auditContent = data.body.data;
        }else{
          console.log(data.body.msg);
        }

      },function (err) {
        console.log(err);

      });
      this.$api.get(this,this.$requestApi.effective,"",function  (data) {
        if(data.status=='200'){
          console.log(JSON.stringify(data.body.data));
          that.selectedAudit[1].auditContent = data.body.data;
        }else{
          console.log(data.body.msg);
        }

      },function (err) {
        console.log(err);

      });
    },

  },

}
</script>
