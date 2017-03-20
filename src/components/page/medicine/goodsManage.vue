<!--药品管理-->

<template>
<div class="goods_manage_body">
  <div class="goods_manage_title_add">
    <router-link   :to="{ name:'add_goods'}" append >
    <img src="../../../../static/img/set_manage_img/add.png" class="add_img"><span class="add_title"> 新增商品</span></router-link>

    <div    class=" right_select"  >
      <selected-search :suppliersItems="suppliersItems" :placeholderData="placeholderData" :suppliersIndex="suppliersIndex"></selected-search>

    </div>
  <table class="table table-striped table-bordered table-hover dataTables-example">
    <thead>

    <tr >
      <th  v-for="item in goods" class="text-center">{{item.name}}</th>
    </tr>
    </thead>
    <tbody>
    <tr class="gradeC" v-for="(goodsItem ,index) in goodsData">
      <td class="text-center" >{{goodsItem. prodId}}</td>
      <td class="text-center" >{{goodsItem.prodName}}</td>
      <td class="text-center" >{{goodsItem.prodSpec}}</td>
      <td class="text-center" >{{$enumeration.getProjectUnit(goodsItem.prodUnit)}}</td>
      <td class="text-center" >{{goodsItem.manufacturer}}</td>
      <td class="text-center" >{{goodsItem. supplierName}}</td>
      <td class="text-center" >{{$enumeration.getGoodsPrice(goodsItem.retailPrice)}}</td>
      <td class="text-center" >{{$enumeration.getGoodsPrice(goodsItem.costPrice)}}</td>
      <td class="text-center" >{{goodsItem.remark}}</td>
      <td class="text-center" >{{goodsItem.state==1?'正常':'停用'}}</td>
      <td class="text-center" ><span v-if="goodsItem.state==1"><router-link class="table-margin-r-5" :to="{ path: 'add_goods'}" append><span @click="compileSuppliers(goodsItem.prodId)">编辑</span></router-link><a @click="outageGoods(index ,goodsItem.prodId)">停用</a> </span><a @click="enabledGoods(index ,goodsItem.prodId)" v-else >启用</a></td>
    </tr>
    </tbody>
  </table>
</div>
  <pagination v-show="goodsData.length > 0"></pagination>
  </div>
</template>


<script>
  import pagination from 'components/page/doctor_clinic/bottom_pagination.vue'
  import selectedSearch from 'components/commonView/selectedSearch.vue'
  export default{
    data(){
      return {
        goods:[
          {  name: '序号',},
          {  name:"商品名称",},
          {  name:"规格",},
          {  name:"单位",},
          {  name:"生产厂家",},
          {  name:"供应商名称",},
          {  name:"零售价(元)",},
          {  name:"采购价(元)"},
          {  name:"备注"},
          {  name:"状态"},
          {  name:"操作"},
        ],
        goodsData:[],
        data_items:[],
        suppliersItems: [
          {titleName: '全部'},
          {titleName: '正常'},
          {titleName: '停用'},
        ],
        placeholderData:"商品名称",
        suppliersIndex: 0,
        iDisplayLength:10,
      }
    },
    components:{
      pagination,
      selectedSearch
    },
    created(){
      this.request();
    },
 /*   mounted(){
      // 如果从详情返回并且之前存有对应的查询条件和参数
      // 则直接渲染之前的数据
      if (window.window.sessionStorage.goodsData ) {
        this.goodsData=JSON.parse(window.window.sessionStorage.goodsData) ;
        this.data_items=JSON.parse(window.window.sessionStorage.data_items) ;
        this.$nextTick(() => $(window).scrollTop(window.window.sessionStorage.scrollTop));
      } else {
        this.request();
      }
    },
    beforeRouteLeave(to, from, next) {
      // 如果跳转到详情页面，则记录关键数据
      // 方便从详情页面返回到该页面的时候继续加载之前位置的数据
      console.log("-beforeRouteLeave--"+to.name );
//      console.log("--beforeRouteLeave-"+  JSON.stringify(from));
      if (to.name ==="add_goods") {
      window.window.sessionStorage.scrollTop = $(window).scrollTop();
      window.window.sessionStorage.goodsData = JSON.stringify( this.goodsData );
      window.window.sessionStorage.data_items = JSON.stringify( this.data_items );
      }
      next();
    },
    beforeRouteEnter(to, from, next) {
      console.log("--beforeRouteEnter-"+  JSON.stringify(from.name));
//      console.log("--beforeRouteEnter-"+   to);
      if (from.name !=="add_goods") {
      if ( window.window.sessionStorage.goodsData ){
        window.window.sessionStorage.removeItem('goodsData');
        window.window.sessionStorage.removeItem('data_items');
      }
      }
      next();
    },
*/
    methods:{
      compileSuppliers:function (prodId) {
        this.$store.dispatch('medicine_compile_suppliers_no',  prodId);
        console.log(prodId);

      },
      request :function () {
        var that=this;
        this.$api.get(this,this.$requestApi.goodsSearch,{iDisplayLength:this.iDisplayLength},function  (data) {
          console.log(data.body.iTotalRecords);
          if(data.body.code=='00'){
            that.goodsData=data.body.data
            that.$store.dispatch('setPageCount',that.$enumerationType.getPageNumber(data.body.iTotalRecords));
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });

      },
      searchRequest:function (state,searchKeywords) {
        let data={};
        let that=this;
        that.suppliersIndex=state;
        if (0===state||""===state){
          data= { iDisplayLength:this.iDisplayLength,supplierNameOrContactName:searchKeywords}
        }else {
          data= { state:state,iDisplayLength:this.iDisplayLength,supplierNameOrContactName:searchKeywords}
        }
        this.$api.get(this,this.$requestApi.goodsSearch,data,function  (data) {
          if(data.body.code=='00'){
            that.goodsData=data.body.data
            that.$store.dispatch('setPageCount',that.$enumerationType.getPageNumber(   data.body.iTotalRecords));
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
      },
      request_list:function () {
        let that=this;
        let  data={};
        if ( that.suppliersIndex===0||that.suppliersIndex===""){
          data= { iDisplayLength:this.iDisplayLength,iDisplayStart:(this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.iDisplayLength+1}
        }else {
          data= {state:that.suppliersIndex, iDisplayLength:this.iDisplayLength,iDisplayStart:(this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.iDisplayLength+1}
        }
        this.$api.get(this,this.$requestApi.goodsSearch,data,function  (data) {
          if(data.body.code=='00'){
            that.goodsData=data.body.data
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });

      },

      enabledGoods:function (index,supplierId) {
        console.log(index);


        let that=this;
        this.$api.post(this,this.$requestApi.goodsDisable+supplierId,"",function  (data) {
          if(data.body.code=='00'){
            that.goodsData[index].state=1;
            that. goodsData.splice(index, 1,  that.goodsData[index]);

            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
      },
      //停用
      outageGoods:function (index ,supplierId) {
        console.log(supplierId);

        let that=this;
        this.$api.post(this,this.$requestApi.goodsEnable+supplierId, "",function  (data) {
          if(data.body.code=='00'){
            that.goodsData[index].state=0;
            that. goodsData.splice(index, 1,  that.goodsData[index]);

          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });



      },

    }

}
</script>
<style>
  .goods_manage_title_add{
    padding: 8px;
    vertical-align: middle;
  }
  .goods_manage_body{
    padding: 10px;
  }
  .add_img{
    width: 15px;
  }
  .add_title{
    line-height: 30px;
    vertical-align: middle;
  }
  .goods_manage_tips_down{
       position: absolute;
       top: 15px;
     }

 .form-control2 {
    border-radius: 1px;
    color: inherit;
    display: block;
   height: 32px;
   font-size: 12px;
   border: 1px solid transparent;
   background: white;
  }
  .goods-search_background{
    width: 230px;
    height: 32px;
    background-color: white;
    margin-top: 15px;
    margin-left: 95px;
  }
</style>
