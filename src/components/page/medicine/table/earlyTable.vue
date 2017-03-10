<!--采购审核表格-->

<template>
  <table class="table table-striped table-bordered table-hover dataTables-example">
    <thead>

    <tr >
      <th  v-for="item in items" class="text-center">{{item.name}}</th>
    </tr>
    </thead>
    <tbody>
    <tr class="gradeC" v-for="storageItem in auditContent">
      <td class="text-center"v-if="storageItem.no">{{storageItem.no}}</td>
      <td class="text-center"v-if="storageItem.storageOdd">{{storageItem.storageOdd}}</td>
      <td class="text-center"v-if="storageItem.storageDate">{{storageItem.storageDate}}</td>
      <td class="text-center"v-if="storageItem.storageSingle">{{storageItem.storageSingle}}</td>
      <td class="text-center"v-if="storageItem.storageMember">{{storageItem.storageMember}}</td>
      <td class="text-center"v-if="storageItem.storagePhone">{{storageItem.storagePhone}}</td>
      <td class="text-center"v-if="storageItem.storageRemarks">{{storageItem.storageRemarks}}</td>
      <td class="text-center" v-if="storageItem.storageSuppliers">{{storageItem.storageSuppliers}}</td>
      <td class="text-center" v-if="storageItem.storageStatus">{{storageItem.storageStatus}}</td>
      <td class="text-center"v-if="storageItem.storageDelete">{{storageItem.storageDelete}}</td>

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
    },
    data(){
      return {

      };
    },
    computed : {
    },

  }
</script>
