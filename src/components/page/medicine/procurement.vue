<!--采购-->

<template>
  <div class="goods_manage_body">
    <div class="goods_manage_title_add"><router-link :to="{ path: 'add_procurement'}" append>
      <img src="../../../../static/img/set_manage_img/add.png" class="add_img"><span class="add_title"> 新增采购单</span></router-link></div>

    <table class="table table-striped table-bordered table-hover dataTables-example">
      <thead>

      <tr >
        <th  v-for="item in goods" class="text-center">{{item.name}}</th>
      </tr>
      </thead>
      <tbody>
      <tr class="gradeC" v-for="(goodsItem,index) in auditContent">
        <td class="text-center" >{{++index}}</td>
        <td class="text-center" >{{goodsItem.ostockId}}</td>
        <td class="text-center" >{{$stringUtils.dateFormat(goodsItem.createDate)}}</td>
        <td class="text-center" >{{goodsItem.supplierName}}</td>
        <td class="text-center" >{{goodsItem.operatorName}}</td>
        <td class="text-center" >{{goodsItem. billId }}</td>
        <td class="text-center" >{{goodsItem.remark}}</td>
        <td class="text-center" >{{goodsItem.auditOpinion}}</td>
        <td class="text-center"  :class="goodsItem.state==1?'goods-gray':'goods-red'" >{{$enumeration.getState(goodsItem.state)}}</td>
        <td class="text-center" >
        <router-link v-if="goodsItem.state==1||goodsItem.state==2" class="table-margin-r-5" :to="{ path: 'add_procurement'}" append><span @click="compileSuppliers(goodsItem.ostockId)">编辑</span></router-link>
        <router-link  v-if="goodsItem.state==0" class="table-margin-r-5" :to="{ path: 'add_procurement'}" append><span @click="viewSuppliers(goodsItem.ostockId)">查看</span></router-link>
        <a  v-if="goodsItem.state!=0" @click="selectIndex(index,goodsItem.ostockId)" data-toggle="modal" data-target="#selfinfo">删除</a></td>
      </tr>

      </tbody>
    </table>
    <pagination v-show="auditContent.length > 0"></pagination>
    <delete-toast :selectedIndex="selectedIndex" ></delete-toast>
  </div>
</template>


<script>
  import pagination from 'components/page/doctor_clinic/bottom_pagination.vue'
  import deleteToast from 'components/page/medicine/deleteAlert/deleteToast.vue'
  export default{
    components:{
      pagination,
      deleteToast
    },
    created(){
      this.request();
    },
    data(){
      return {
        goods:[
          {  name: '序号',},
          {  name:"采购单号",},
          {  name:"订单日期",},
          {  name:"供应商",},
          {  name:"采购员",},
          {  name:"采购员电话",},
          {  name:"备注",},
          {  name:"审核意见"},
          {  name:"状态"},
          {  name:"操作"},
        ],
        auditContent:[
        ],
        ostockId:0,
        data_items:[],
        selectedIndex:0,
        goodsIndex:0,
      }
    },
    methods:{
      compileSuppliers:function (no) {
        //编辑
        this.$store.dispatch('medicine_compile_suppliers_no',  [no,1]);
        console.log(no);
      },
      viewSuppliers:function (no) {
        //查看
        this.$store.dispatch('medicine_compile_suppliers_no',  [no,2]);
        console.log(no);
      },
      request :function () {
        let that=this;
        that.$api.get(that,that.$requestApi.stockSearch+that.$enumerationType.procurementType,{iDisplayLength:that.$enumerationType.iDisplayLength},function  (data) {
          if(data.body.code=='00'){
            that.auditContent=data.body.data
            that.$store.dispatch('setPageCount',that.$enumerationType.getPageNumber(   data.body.iTotalRecords));
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });

      },
//      searchRequest:function (state,searchKeywords) {
//        let data={};
//        let that=this;
//        console.log("state"+state);
//        that.suppliersIndex=state;
//        if (0===state||""===state){
//          data= { iDisplayLength:this.iDisplayLength,supplierNameOrContactName:searchKeywords}
//        }else {
//          data= { state:state,iDisplayLength:this.iDisplayLength,supplierNameOrContactName:searchKeywords}
//        }
//        this.$api.get(this,this.$requestApi.goodsSearch,data,function  (data) {
//          if(data.body.code=='00'){
//            that.auditContent=data.body.data
//            that.$store.dispatch('setPageCount',Math.ceil(Number(data.body.iTotalRecords)/that.iDisplayLength));
//          }else{
//            console.log(data.body.msg);
//          }
//
//        },function (err) {
//          console.log(err);
//
//        });
//      },
      request_list:function () {
        let that=this;
        let  data={};
        if ( that.suppliersIndex===0||that.suppliersIndex===""){
          data= { iDisplayLength:that.$enumerationType.iDisplayLength,iDisplayStart:(this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.iDisplayLength+1}
        }else {
          data= {state:that.suppliersIndex, iDisplayLength:that.$enumerationType.iDisplayLength,iDisplayStart:(this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.iDisplayLength+1}
        }
        this.$api.get(this,this.$requestApi.stockSearch+that.$enumerationType.procurementType,data,function  (data) {
          if(data.body.code=='00'){
            that.auditContent=data.body.data
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });

      },

      procurementDelete:function (index) {
        let that=this;
        that.$api.post(that,that.$requestApi.stockDelete+this.ostockId ,{},function  (data) {
          console.log(data.body.iTotalRecords);
          if(data.body.code=='00'){
            that.auditContent.splice(index, 1);
            swal({   title: data.body.msg,   text: "", type: "success",  timer: 2000,   showConfirmButton: false });
          }else{
            swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
          }

        },function (err) {
          swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

        });




      },
      selectIndex:function (index,ostockId) {
        this.selectedIndex=index;
        this.ostockId=ostockId;
        console.log("点击"+index);
      }

    },
    computed: {
    }

  }
</script>
<style>
  .goods-gray{
    color: #999999;
  }
  .goods-red{
    color: red;
  }
</style>
