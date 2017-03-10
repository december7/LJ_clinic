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
      <td class="text-center"v-if="storageItem.no">{{storageItem.no}}</td>
      <td class="text-center"v-if="storageItem.storageOdd">{{storageItem.storageOdd}}</td>
      <td class="text-center"v-if="storageItem.storageDate">{{storageItem.storageDate}}</td>
      <td class="text-center"v-if="storageItem.storageSingle">{{storageItem.storageSingle}}</td>
      <td class="text-center"v-if="storageItem.storageMember">{{storageItem.storageMember}}</td>
      <td class="text-center"v-if="storageItem.storagePhone">{{storageItem.storagePhone}}</td>
      <td class="text-center"v-if="storageItem.storageRemarks">{{storageItem.storageRemarks}}</td>
      <td class="text-center" v-if="storageItem.storageSuppliers">{{storageItem.storageSuppliers}}</td>
      <td class="text-center" v-if="storageItem.storageStatus">{{storageItem.storageStatus}}</td>
      <td class="text-center"v-if="storageItem.storageDelete"><a @click="auditDelete(index)" class="table-margin-r-5">{{storageItem.storageDelete}}</a><router-link :to="{ path: 'compile_audit'}" append> <span @click="auditCompile(index)">{{storageItem.storageCompile}}</span></router-link></td>

    </tr>

    </tbody>
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
