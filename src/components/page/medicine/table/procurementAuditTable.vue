<!--采购审核表格-->

<template>
  <table class="table table-striped table-bordered table-hover dataTables-example">
    <thead>

    <tr >
      <th  v-for="item in items" class="text-center">{{item.name}}</th>
    </tr>
    </thead>
    <tbody>
    <tr class="gradeC" v-for="(storageItem,index) in auditContent">
      <td class="text-center">{{storageItem.no}}</td>
      <td class="text-center">{{storageItem.storageOdd}}</td>
      <td class="text-center">{{storageItem.storageDate}}</td>
      <td class="text-center">{{storageItem.storageSingle}}</td>
      <td class="text-center">{{storageItem.storageMember}}</td>
      <td class="text-center">{{storageItem.storagePhone}}</td>
      <td class="text-center">{{storageItem.storageRemarks}}</td>
      <td class="text-center">{{storageItem.storageSuppliers}}</td>
      <td class="text-center">{{storageItem.storageStatus}}</td>
    </tr>

    </tbody>
    <tbody v-if="auditContent.length===0" ><tr class="gradeC"> <td class="text-center" :colspan="items.length" >{{$toastContent.toastTableContent}}</td></tr></tbody>

  </table>

</template>
<script>
  export  default{
    props: {
     items:{
       default: []
     },
      auditContent:{
        default: []
      },
      selectedIndex:{
        default: 0
      },
    },
    data(){
      return {

      };
    },
    computed : {
    },
    methods:{
      auditDelete:function (index) {
        this.auditContent.splice(index, 1);
        console.log("删除"+index+"selectedIndex"+this.selectedIndex);
      },
      auditCompile:function (index) {
        this.$store.dispatch('audit_table_selected_index',this. selectedIndex);
        console.log("修改"+index+"selectedIndex"+this.selectedIndex);

      }

}
  }
</script>
<style>
  .table-margin-r-5{
    margin-right: 5px;
  }
</style>
