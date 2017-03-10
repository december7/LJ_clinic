<template>

    <table class="table table-striped table-bordered table-hover dataTables-example">
      <thead>
      <tr >
        <th   v-for="goodsName in goodsNames " class="text-center">{{goodsName.name}}</th>
      </tr>
      </thead>
      <tbody>
      <tr class="gradeC" v-for="medicineItem in medicineItems">
        <td class="text-center">{{medicineItem.no}}</td>
        <td class="text-center">{{medicineItem.medicineName}}</td>
        <td class="text-center">{{medicineItem.medicineSpecification}}</td>
        <td class="text-center">{{medicineItem.medicineUnits}}</td>
        <td class="text-center">{{medicineItem.manufacturer}}</td>
        <td class="text-center">{{medicineItem.suppliers}}</td>
        <td class="text-center">{{medicineItem.lotNumber}}</td>
        <td class="text-center">{{medicineItem.validity}}</td>
        <td class="text-center">{{medicineItem.onhand}}</td>
        <td class="text-center">{{medicineItem.costPrice}}</td>
        <td class="text-center">{{medicineItem.retail}}</td>

      </tr>

      </tbody>
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
      },
    },
    data(){
      return {
      }

    },
    computed : {
      medicineItems(){
      return  this.$store.getters.getMedicineTable;
      }

    },
    mounted: function () {
      console.log("goodsTable.vue");
    }
  }
</script>


