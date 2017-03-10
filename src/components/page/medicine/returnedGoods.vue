<!--退货-->

<template>
  <div class="goods_manage_body">
    <div class="goods_manage_title_add">   <router-link :to="{ path: 'add_returned_goods'}" append>
      <img src="../../../../static/img/set_manage_img/add.png" class="add_img"><span class="add_title"> 新增退货单</span></router-link></div>

    <table class="table table-striped table-bordered table-hover dataTables-example">
      <thead>

      <tr >
        <th  v-for="item in goods" class="text-center">{{item.name}}</th>
      </tr>
      </thead>
      <tbody>
      <tr class="gradeC" v-for="(goodsItem,index) in auditContent">
        <td class="text-center" >{{goodsItem.no}}</td>
        <td class="text-center" >{{goodsItem.goodsName}}</td>
        <td class="text-center" >{{goodsItem.goodsSpecification}}</td>
        <td class="text-center" >{{goodsItem.goodsStorage}}</td>
        <td class="text-center" >{{goodsItem. supplierPhone }}</td>
        <td class="text-center" >{{goodsItem.retailPrice}}</td>
        <td class="text-center" >{{goodsItem.costPrice}}</td>
        <td class="text-center"  :class="goodsItem.goodsStatus==2?'goods-gray':'goods-red'" >{{goodsItem.goodsStatus==0?'待审核':goodsItem.goodsStatus==1?'审核失败':'已审核'}}</td>
        <td class="text-center" >
          <router-link v-if="goodsItem.goodsStatus!=2" class="table-margin-r-5" :to="{ path: 'add_returned_goods'}" append><span @click="compileSuppliers(goodsItem.no)">编辑</span></router-link>
          <router-link  class="table-margin-r-5" v-if="goodsItem.goodsStatus==2" :to="{ path: 'add_returned_goods'}" append ><span @click="compileSuppliers(goodsItem.no)">查看</span></router-link>

          <a  @click="selectIndex(index)" data-toggle="modal" data-target="#selfinfo">删除</a></td>

      </tr>

      </tbody>
    </table>
    <a>{{getSelectedItem}}</a>
    <pagination v-show="data_items.length > 0"></pagination>
    <delete-toast :selectedIndex="selectedIndex" ></delete-toast>
  </div>
</template>


<script>
  import deleteToast from 'components/page/medicine/deleteAlert/deleteToast.vue'
  import pagination from 'components/page/doctor_clinic/bottom_pagination.vue'
  export default{
    components:{
      pagination,
      deleteToast
    },
    created(){
      this.request_list();
    },
    data(){
      return {
        goods:[
          {  name: '序号',},
          {  name:"退货单号",},
          {  name:"订单日期",},
          {  name:"退货员",},
          {  name:"退货员电话",},
          {  name:"备注",},
          {  name:"审核意见"},
          {  name:"状态"},
          {  name:"操作"},
        ],
        auditContent:[
          {
            no: '001',
            goodsName:"退货单号",
            goodsSpecification:"订单日期",
            goodsStorage:"退货员",
            supplierPhone:"退货员电话",
            retailPrice:"备注",
            costPrice:"审核意见",
            goodsStatus:"状态",
            goodsOperation:"编辑  删除"
          },
        ],
        data_items:[],
        selectedIndex:0
      }
    },
    methods:{
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
        this.$api.get(this,this.$requestApi.procurementStorage,"",function  (data) {
          if(data.status=='200'){
            that.auditContent = data.body.data;
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
      },
      procurementDelete:function (index) {
        this.auditContent.splice(index, 1);
      },
      selectIndex:function (index) {
        this.selectedIndex=index;
        console.log("点击"+index);
      },
      compileSuppliers:function (no) {
        this.$store.dispatch('medicine_compile_suppliers_no',  no);
        console.log(no);
      },
    },
    computed:{
      getSelectedItem:function () {
        return this.$store.getters.getAddGoods;

      },
    }

  }
</script>
