<!--库存管理-->

<template>
  <div >
    <div  style="background: white; height: 50px;padding: 10px 10px 0 26px" >
      <div class="select_screen_container">
<div style="float: left; margin-right: 30px">
  <a style="margin-right: 20px;" class="border-bottom-337ab7">导出excel表</a><a class="border-bottom-337ab7">导入excel表</a></div>

        <p>筛选: </p>
        <div class="white-bg select_items_btn">
          <div class="btn-group roll-nav roll-right" style="right: 0px">
            <div class="input-group-btn">
              <button data-toggle="dropdown" style="width: 130px !important;" class="btn btn-white dropdown-toggle no-padding no-borders no-margins search_text" type="button">{{factoryItems[factoryIndex].titleName}}<span class="drop_tips caret"></span>
              </button>
              <ul class="dropdown-menu" style="min-width: 130px;" >
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
          <goods-table :goodsNames="title.itemAudit" :medicineItems="title.auditContent"  v-for="title in selectedAudit"  v-show="title.selected" ></goods-table>

        </div>
      </div>
    </div>
    <pagination v-show="data_items.length > 0"></pagination>
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
            {  name:"采购价",},
            {  name:"库存金额",},
            {  name:"销售价"},
            {  name:"销售金额"},
          ],
          auditContent:[
            {
              no: '001',
              storageOdd:"采购单号",
              storageDate:"2018-01-09",
              storageSingle:"采购001",
              storageMember:"张三",
              storagePhone:"13026306662",
              storageSuppliers:"哈药制作",
              storageRemarks:"123",
              storageStatus:"审核失败",
              storageDelete:"编辑  删除"

            },
          ]
        },
        {
          name:"批号维护",
          selected:false,
          itemAudit:[
            {  name: '序号',},
            {  name:"商品名称",},
            {  name:"规格",},
            {  name:"生产厂家",},
            {  name:"供应商名称",},
            {  name:"变更时间",},
            {  name:"原批号",},
            {  name:"现批号",},
          ],
          auditContent:[
            {
              no: '001',
              storageOdd:"入库单号",
              storageDate:"2018-01-09",
              storageSingle:"采购001",
              storageMember:"张三",
              storagePhone:"13026306662",
              storageRemarks:"123",
              storageStatus:"审核失败",
            },
          ]
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
        {titleName: '选择生产厂家'},
        {titleName: '选择生产厂家'},
        {titleName: '选择生产厂家'},
        {titleName: '选择生产厂家'}
      ],
      factoryIndex: 0,
      data_items:[],
      selectedIndex:0,
    };
  },
  mounted:function(){
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
    },
    selectFactoryItem:function (selectedIndex) {
      this.factoryIndex = selectedIndex;

    },
    selectSuppliersItem:function (selectedIndex) {
      this.suppliersIndex = selectedIndex;
    },
    addTables:function (data) {
      this.$store.dispatch('medicine_table_data', data);

    },
    clickSelectedAudit:function (index) {
      if ( this.selectedIndex!=index){
        this.selectedAudit[index].selected=true;
        this.selectedAudit[ this.selectedIndex].selected=false;
        this.selectedIndex=index;
      }
    },
    getHttpTables:function () {
      var  that=this;
      that.$api.get(this,this.$requestApi.getStockManage,"",function  (msg) {
        console.info("存入数据"+JSON.stringify(msg.body.data));
//        if(data.body.code==='00'){
        that.addTables(msg.body.data)
          //set('user', this.name, date, '/', window.location.hostname)
//        }else{
//          console.log(data.body.msg);
////          swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });
//        }

      },function (err) {
        console.log(err);

      });

    }
  },
  created: function () {
    // 组件创建
//    goodsTable.medicineItems
    this.request_list();

    this.getHttpTables();

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
