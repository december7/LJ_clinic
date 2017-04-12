<!--库存管理-->

<template>
  <div >
    <div  style=" height: 50px;padding: 10px 10px 0 26px" >

        <selected-search   style="margin-top: 3px" class=" right_select" :suppliersItems="suppliersItems" :placeholderData="placeholderData" :suppliersIndex="suppliersIndex"></selected-search>
      <ul class="audit_item">
        <li @click="clickSelectedAudit(index)" v-for="(title, index) in selectedAudit" :class="{selected_audit_item : title.selected}">
          <a> {{title.name}}</a>
        </li>
        <a style="margin-right: 15px;float: right;     margin-top: 10px;  border-bottom: 1px solid #314268"  @click="exportExcel" >导出excel表</a>

      </ul>

    </div>

    <div class="goods_manage_body">
      <div class="col-sm-12">
        <div class="ibox float-e-margins">
          <goods-table :goodsNames="title.itemAudit" :medicineItems="title.auditContent"  v-for="title in selectedAudit"  v-show="title.selected"  :selectedIndex="selectedIndex"  ></goods-table>

        </div>
      </div>
    </div>
    <pagination v-show=" selectedAudit[0].auditContent.length > 0&&selectedIndex==0"  :iDisplayLength=" selectedAudit[0].auditContent.length "></pagination>
    <pagination v-show="  selectedAudit[1].auditContent.length > 0&&selectedIndex==1"  :iDisplayLength=" selectedAudit[1].auditContent.length "></pagination>
  </div>
</template>


<script>
import goodsTable from "components/page/medicine/table/goodsTable.vue";
import pagination from 'components/page/doctor_clinic/bottom_pagination.vue'
import selectedSearch from 'components/commonView/selectedSearch.vue'
import xlsx from  'xlsx' ;
import fileSaver from 'file-saver'
export default {
  components: {
    goodsTable,
    pagination,
    selectedSearch,
  },
  data(){
    return {
      selectedAudit:[
        {
          name:"库存管理",
          selected:true,
          itemAudit:[
            {  name: '序号',},
            {  name:"入库日期",},
            {  name:"商品名称",},
            {  name:"规格",},
            {  name:"生产厂家",},
            {  name:"供应商名称",},
            {  name:"库存数量",},
            {  name:"成本价(元)",},
            {  name:"库存金额(元)",},
            {  name:"销售价(元)"},
            {  name:"销售金额(元)"},
          ],
          auditContent:[  ]
        },
        {
          name:"批号维护",
          selected:false,
          itemAudit:[
            {  name: '序号',},
            {  name: '入库日期',},
            {  name:"商品名称",},
            {  name:"规格",},
            {  name:"生产厂家",},
            {  name:"供应商名称",},
            {  name:"单位",},
            {  name:"批号",},
            {  name:"有效期",},
            {  name:"入库数量",},
            {  name:"采购价(元)",},
            {  name:"现库存数量",},
          ],
          auditContent:[ ]
        },
      ],

      suppliersItems: [
        {titleName: '按库存排序'},
        {titleName: '按销售金额'},
      ],
      placeholderData:"商品名称",
      suppliersIndex: 0,

      data_items:[],
      selectedIndex:0,
    };
  },
  mounted:function(){
  },
  methods:{
    exportExcel: function () {
      let that = this;
      var sheetName = '';
      if (this.selectedIndex == 0) {
        var headLine = that.selectedAudit[0].itemAudit.map((i) => i.name);
        sheetName = that.selectedAudit[0].name;
        var index = 0;
        var bodyLines = that.selectedAudit[0].auditContent.map((i) => {
          return [
            ++index,
            that. $stringUtils.dateFormat(i.createDate),
            i.prodName,
            i.prodSpec,
            i.manufacturer,
            i.supplierName,
            i.preStockNum,
            that.$enumeration.getGoodsPrice(i.prodCostPrice),
            that. $enumeration.getNumMoney(i.preStockNum,i.prodCostPrice),
            that.$enumeration.getGoodsPrice(i.retailPrice),
            that.$enumeration.getGoodsPrice(i.totalPrice),
          ];
        })
      } else {
        var headLine = that.selectedAudit[1].itemAudit.map((i) => i.name);
        sheetName = that.selectedAudit[1].name;
        var index = 0;
        var bodyLines = that.selectedAudit[1].auditContent.map((i) => {
          return [
            ++index,
             that.$stringUtils.dateFormat(i.createDate),
            i.prodName,
            i.prodSpec,
            i.manufacturer,
            i.supplierName,
            that. $enumeration. getProjectUnit(i.prodUnit),
            i.batchNumber,
            that. $stringUtils.dateFormat(i.expireDate),
            that.$enumeration.getGoodsPrice(i.stockNum),
            that.$enumeration.getGoodsPrice(i.stockPrice),
            i.surplusStockNum,
          ];
        })
      }
      bodyLines.unshift(headLine)
      var worksheet = xlsx.utils.aoa_to_sheet(bodyLines);
      var workBook = {
        SheetNames: [sheetName],
        Sheets: {}
      };
      workBook.Sheets[sheetName] = worksheet

      var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
      var wbout = xlsx.write(workBook, wopts);

      function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }

      fileSaver.saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), sheetName + ".xlsx");
    },
    request_list:function (state,searchKeywords) {
      console.log("state"+state);
      var that=this;



      this.$api.get(this,that.selectedIndex==0?this.$requestApi.listInventory:this.$requestApi.stockDetails,{iDisplayLength:that.$enumerationType.iDisplayLength,iDisplayStart:(this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*that.$enumerationType.iDisplayLength+1,orderBy:state,prodNameOrGenericNameOrEnglishName:searchKeywords},function  (data) {
        if(data.body.code=='00'){
          that.selectedAudit[that.selectedIndex].auditContent=data.body.data;
          that.$store.dispatch('setPageCount', that.$enumerationType.getPageIDisplayLength(data.body.iTotalRecords));
        }else{
          console.log(data.body.msg);
        }
      },function (err) {
        console.log(err);
      });
    },

    searchRequest:function (selectedIndex,searchKeywords) {
      this.suppliersIndex = selectedIndex;
      this. request_list(++selectedIndex,searchKeywords);
    },
    addTables:function (data) {
      this.$store.dispatch('medicine_table_data', data);
    },
    clickSelectedAudit:function (index) {
      let that=this;
      if ( this.selectedIndex!=index){
        this.selectedAudit[index].selected=true;
        this.selectedAudit[ this.selectedIndex].selected=false;
        this.selectedIndex=index;
        if (index==0){
          that. request_list(1);
          that.suppliersItems=[{titleName: '按库存排序'}, {titleName: '按销售金额'},];
          that.suppliersIndex=0;
        }else {
          that. request_list(1);
          that.suppliersItems=[{titleName: '按入库时间'}, {titleName: '按库存数量'},{titleName: '按商品名称'},];
          that.suppliersIndex=0;

        }
      }
    },
//    getHttpTables:function () {
//      var  that=this;
//      that.$api.get(this,this.$requestApi.getStockManage,"",function  (msg) {
//        console.info("存入数据"+JSON.stringify(msg.body.data));
////        if(data.body.code==='00'){
//        that.addTables(msg.body.data)
//          //set('user', this.name, date, '/', window.location.hostname)
////        }else{
////          console.log(data.body.msg);
//////          swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
////        }
//
//      },function (err) {
//        console.log(err);
//
//      });
//
//    }
  },
  created: function () {
    // 组件创建
//    goodsTable.medicineItems
    this.request_list(1);
  },
}
</script>
<style>

  .select_screen_container {
    line-height: 30px;
    float: right;
    width: 40%;
    padding-bottom: 15px;
  }

  .select_screen_container p {
    display: inline;
    float: left;
    margin-right: 10px
  }

  .select_items_btn {
    float: left;
    width: 130px;
    margin-right: 10px;
  }
  .border-bottom-337ab7{
    border-bottom: 1px solid #337ab7; padding-bottom:5px;
  }
</style>
