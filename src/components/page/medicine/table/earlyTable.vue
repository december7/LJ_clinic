<!--采购审核表格-->

<template>
  <table class="table table-striped table-bordered table-hover dataTables-example">
    <thead>

    <tr >
      <th  v-for="item in items" class="text-center">{{item.name}}</th>
    </tr>
    </thead>
    <tbody  v-show="selectedIndex==0">
    <tr class="gradeC" v-for="(storageItem ,index) in auditContent">
      <td class="text-center" >{{++index}}</td>
      <td class="text-center" >{{storageItem.prodName}}</td>
      <td class="text-center" >{{storageItem.prodSpec}}</td>
      <td class="text-center" >{{storageItem.manufacturer}}</td>
      <td class="text-center" >{{storageItem.supplierName}}</td>
      <td class="text-center" >{{storageItem.stockWarning}}</td>
      <td class="text-center" >{{storageItem.alarmNum}}</td>
      <td class="text-center" >{{$enumeration. getGoodsPrice(storageItem.retailPrice)}}</td>
    </tr>
    </tbody>

    <tbody  v-show="selectedIndex==1">
    <tr class="gradeC" v-for="(storageItem ,index) in auditContent">
      <td class="text-center" >{{++index}}</td>
      <td class="text-center" >{{storageItem.prodName}}</td>
      <td class="text-center" >{{storageItem.prodSpec}}</td>
      <td class="text-center" >{{storageItem.manufacturer}}</td>
      <td class="text-center" >{{storageItem.supplierName}}</td>
      <td class="text-center" >{{storageItem.batchNumber}}</td>
      <td class="text-center" >{{$stringUtils.dateFormat(storageItem.expireDate)}}</td>
      <td class="text-center"  >{{$enumeration. getGoodsPrice(storageItem.retailPrice)}}</td>
    </tr>
    </tbody>
    <tbody v-if="auditContent.length===0" ><tr class="gradeC"> <td class="text-center" :colspan="items.length"  >{{$toastContent.toastTableContent}}</td></tr></tbody>
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

  }
</script>
