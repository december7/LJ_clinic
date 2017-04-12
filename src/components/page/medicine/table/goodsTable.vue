<template>

    <table class="table table-striped table-bordered table-hover dataTables-example">
      <thead>
      <tr >
        <th   v-for="goodsName in goodsNames " class="text-center">{{goodsName.name}}</th>
      </tr>
      </thead>
      <tbody v-show="selectedIndex==0">
      <tr class="gradeC" v-for="(medicineItem ,index) in medicineItems">
        <td class="text-center">{{++index}}</td>
        <td class="text-center">{{$stringUtils.dateFormat(medicineItem.createDate)}}</td>
        <td class="text-center">{{medicineItem.prodName}}</td>
        <td class="text-center">{{medicineItem.prodSpec}}</td>
        <td class="text-center">{{medicineItem.manufacturer}}</td>
        <td class="text-center">{{medicineItem.supplierName}}</td>
        <td class="text-center">{{medicineItem.preStockNum}}</td>
        <td class="text-center">{{$enumeration. getGoodsPrice(medicineItem.prodCostPrice)}}</td>
        <td class="text-center">{{$enumeration. getNumMoney(medicineItem.preStockNum,medicineItem.prodCostPrice)}}</td>
        <td class="text-center">{{$enumeration. getGoodsPrice(medicineItem.retailPrice)}}</td>
        <td class="text-center">{{$enumeration. getGoodsPrice(medicineItem.totalPrice)}}</td>
      </tr>
      </tbody><tbody v-show="selectedIndex==1">
      <tr class="gradeC" v-for="(medicineItem ,index) in medicineItems">
        <td class="text-center">{{++index}}</td>
        <td class="text-center">{{$stringUtils.dateFormat(medicineItem.createDate)}}</td>
        <td class="text-center">{{medicineItem.prodName}}</td>
        <td class="text-center">{{medicineItem.prodSpec}}</td>
        <td class="text-center">{{medicineItem.manufacturer}}</td>
        <td class="text-center">{{medicineItem.supplierName}}</td>
        <td class="text-center">{{$enumeration. getProjectUnit(medicineItem.prodUnit)}}</td>
        <td class="text-center">{{ medicineItem.batchNumber}}</td>
        <td class="text-center">{{$stringUtils.dateFormat(medicineItem.expireDate)}}</td>
        <td class="text-center">{{ medicineItem. stockNum}}</td>
        <td class="text-center">{{$enumeration. getGoodsPrice(medicineItem.stockPrice)}}</td>
        <td class="text-center">{{medicineItem.surplusStockNum}}</td>
      </tr>
      </tbody>
      <tbody v-if="medicineItems.length===0" ><tr class="gradeC"> <td class="text-center" :colspan="goodsNames.length"  >{{$toastContent.toastTableContent}}</td></tr></tbody>

    </table>

</template>
<script>
  export default {
    props: {
      goodsNames:{
        default: []
      },
      medicineItems:{
        default: []
      }, selectedIndex:{
        default: 0
      }, currentPageNo:{
        default: 0
      },
    },
    data(){
      return {
      }

    },
    computed : {
//      medicineItems(){
//      return  this.$store.getters.getMedicineTable;
//      }
      currentPageNo:function () {

        return this.$store.getters.getCurrentPageNo;
      }

    },
    mounted: function () {
      console.log("goodsTable.vue");
    }
  }
</script>


