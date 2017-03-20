<!--库存管理-->

<template>
  <div >
    <div  style="background: white; height: 50px;padding: 10px 10px 0 26px" >
      <div class="select_screen_container">
<div style="float: left; margin-right: 30px">
  <a style="margin-right: 20px;" class="border-bottom-337ab7">导出excel表</a><a class="border-bottom-337ab7" >导入excel表</a></div>

        <p>筛选: </p>
        <div class="white-bg select_items_btn">
          <div class="btn-group roll-nav roll-right" style="right: 0px">
            <div class="input-group-btn">
              <button data-toggle="dropdown" style="width: 130px !important;" class="btn btn-white dropdown-toggle no-padding no-borders no-margins search_text" type="button">{{factoryItems[factoryIndex].titleName}}<span class="drop_tips caret"></span>
              </button>
              <ul class="dropdown-menu" style="min-width: 130px;"     >
                <li @click="selectFactoryItem(index)" v-for="(titleItem, index) in factoryItems">
                  <a :class="{selected_item : factoryIndex == index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      <ul class="audit_item">
        <li @click="clickSelectedAudit(index)" v-for="(title, index) in selectedAudit" :class="{selected_audit_item : title.selected}">
          <a> {{title.name}}</a>
        </li>
      </ul>
    </div>

    <div class="goods_manage_body">
      <div class="col-sm-12">
        <div class="ibox float-e-margins">
          <goods-table :goodsNames="title.itemAudit" :medicineItems="title.auditContent"  v-for="title in selectedAudit"  v-show="title.selected"  :selectedIndex="selectedIndex"  ></goods-table>

        </div>
      </div>
    </div>
    <pagination v-show=" selectedAudit[0].auditContent.length > 0&&selectedIndex==0" ></pagination>
    <pagination v-show="  selectedAudit[1].auditContent.length > 0&&selectedIndex==1"></pagination>
  </div>
</template>


<script>
import goodsTable from "components/page/medicine/table/goodsTable.vue";
import pagination from 'components/page/doctor_clinic/bottom_pagination.vue'

export default {
  components: {
    goodsTable,
    pagination
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
        {titleName: '选择供应商'},
        {titleName: '选择供应商'},
        {titleName: '选择供应商'},
        {titleName: '选择供应商'}
      ],
      suppliersIndex: 0,
      factoryItems: [
        {titleName: '按库存排序'},
        {titleName: '按销售金额'},
      ],
      factoryIndex: 0,
      data_items:[],
      selectedIndex:0,
    };
  },
  mounted:function(){
  },
  methods:{
    request_list:function (state) {
      console.log("state"+state);
      var that=this;
      this.$api.get(this,that.selectedIndex==0?this.$requestApi.listInventory:this.$requestApi.stockDetails,{iDisplayLength:that.$enumerationType.iDisplayLength,iDisplayStart:(this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*that.$enumerationType.iDisplayLength+1,orderBy:state},function  (data) {
        if(data.body.code=='00'){
          that.selectedAudit[that.selectedIndex].auditContent=data.body.data;
          that.$store.dispatch('setPageCount', that.$enumerationType.getPageNumber(data.body.iTotalRecords));
        }else{
          console.log(data.body.msg);
        }
      },function (err) {
        console.log(err);
      });
    },
    selectFactoryItem:function (selectedIndex) {
      this.factoryIndex = selectedIndex;
      this. request_list(++selectedIndex);
    },
    selectSuppliersItem:function (selectedIndex) {
      this.suppliersIndex = selectedIndex;
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
          that.factoryItems=[{titleName: '按库存排序'}, {titleName: '按销售金额'},];
          that.factoryIndex=0;
        }else {
          that. request_list(1);
          that.factoryItems=[{titleName: '按入库时间'}, {titleName: '按库存数量'},{titleName: '按商品名称'},];
          that.factoryIndex=0;

        }
      }
    },
          method1:  function (tableid) {//整个表格拷贝到EXCEL中
        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject("Excel.Application");
        //创建AX对象excel
        var oWB = oXL.Workbooks.Add();
        //获取workbook对象
        var xlsheet = oWB.Worksheets(1);
        //激活当前sheet
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        //把表格中的内容移到TextRange中
        sel.select();
        //全选TextRange中内容
        sel.execCommand("Copy");
        //复制TextRange中内容
        xlsheet.Paste();
        //粘贴到活动的EXCEL中
        oXL.Visible = true;
        //设置excel可见属性

        try {
          var fname = oXL.Application.GetSaveAsFilename("将Table导出到Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
          print("Nested catch caught " + e);
        } finally {
          oWB.SaveAs(fname);

          oWB.Close(savechanges = false);
          //xls.visible = false;
          oXL.Quit();
          oXL = null;
          //结束excel进程，退出完成
          //window.setInterval("Cleanup();",1);
          idTmr = window.setInterval("Cleanup();", 1);

        }
      },
      Cleanup: function () {
        window.clearInterval(idTmr);
        CollectGarbage();
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
    console.log("md5"+this.$md5("value"));
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
