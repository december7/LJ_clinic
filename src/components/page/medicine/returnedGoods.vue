<!--退货-->

<template>
  <div class="goods_manage_body">
    <div class="goods_manage_title_add">   <router-link :to="{ path: 'add_returned_goods'}" append>
      <img src="../../../../static/img/set_manage_img/add.png" class="add_img"><span class="add_title patient_add_btn"> 新增退货单</span></router-link></div>

    <table class="table table-striped table-bordered table-hover dataTables-example">
      <thead>

      <tr >
        <th  v-for="item in goods" class="text-center">{{item.name}}</th>
      </tr>
      </thead>
      <tbody>
      <tr class="gradeC" v-for="(goodsItem,index) in auditContent">
        <td class="text-center" >{{pageIndexNo()+index}}</td>
        <td class="text-center" >{{goodsItem.ostockId}}</td>
        <td class="text-center" >{{$stringUtils.dateFormat(goodsItem.createDate)}}</td>
        <td class="text-center" >{{goodsItem.operatorName}}</td>
        <td class="text-center" >{{goodsItem. billId }}</td>
        <td class="text-center" >{{goodsItem.remark}}</td>
        <td class="text-center" >{{goodsItem.auditOpinion}}</td>
        <td class="text-center"  :class="goodsItem.state==2?  'goods-red':'goods-gray'" >{{$enumeration.getState(goodsItem.state)}}</td>
        <td class="text-center" >
          <router-link v-if=" goodsItem.state==2 " class="table-margin-r-5" :to="{ path: 'add_returned_goods'}" append><span @click="compileSuppliers(goodsItem.ostockId)">编辑</span></router-link>
          <router-link  v-if="goodsItem.state==0||goodsItem.state==1" class="table-margin-r-5" :to="{ path: 'add_returned_goods'}" append><span @click="viewSuppliers(goodsItem.ostockId)">查看</span></router-link>
          <router-link v-if="goodsItem.state==3"  :to="{ path: 'add_returned_goods'}" append><span @click="compileSuppliers(goodsItem.ostockId)">查看</span></router-link>

          <a  v-if=" goodsItem.state==2" @click="selectIndex(index,goodsItem.ostockId)" data-toggle="modal" data-target="#selfinfo">撤销</a></td>

      </tr>

      </tbody>
      <tbody v-if="auditContent.length===0" ><tr class="gradeC"> <td class="text-center" :colspan="goods.length" >{{$toastContent.toastTableContent}}</td></tr></tbody>

    </table>
    <pagination v-show="auditContent.length > 0" :iDisplayLength="auditContent.length"></pagination>
    <delete-toast :selectedIndex="selectedIndex" :selectedTitle="selectedTitle" :selectedContent="selectedContent" ></delete-toast>

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
      this.request();
    },
    data(){
      return {
        selectedTitle:"退货单",
        selectedContent:"确定撤销该退货单吗?<br/>撤销后将不能恢复",

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
        auditContent:[],
        data_items:[],
        selectedIndex:0,
        ostockId:0,
      }
    },
    methods:{
      pageIndexNo:function(){
        return (this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.$enumerationType.iDisplayLength+1;
      },
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
        that.$api.get(that,that.$requestApi.stockSearch+that.$enumerationType.returnsType,{iDisplayLength:that.$enumerationType.iDisplayLength},function  (data) {
          if(data.body.code=='00'){
            that.auditContent=data.body.data
            that.$store.dispatch('setPageCount',that.$enumerationType.getPageIDisplayLength(   data.body.iTotalRecords));
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });

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
      },
    },
    computed:{
      getSelectedItem:function () {
        return this.$store.getters.getAddGoods;

      },
    }

  }
</script>
