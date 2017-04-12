<!--预警-->

<template>
  <div class="body_audit">
    <div  class="audit_item" style="height: 50px">
      <ul>
        <li @click="clickSelectedAudit(index)" v-for="(title, index) in selectedAudit" :class="{selected_audit_item : title.selected}">
          <a> {{title.name}}</a>
        </li>
      </ul>
      <a style="margin-right: 15px;float: right;   border-bottom: 1px solid #314268"  @click="exportExcel" >导出excel表</a>
    </div>
    <div class="table_switch_tab">
      <early-table :items="title.itemAudit" :auditContent="title.auditContent"  v-for="(title,i) in selectedAudit"  v-show="title.selected" :selectedIndex="selectedIndex" :id="'exportExcel'+i"></early-table>
    </div>
    <pagination v-show=" selectedAudit[0].auditContent.length > 0&&selectedIndex==0" :iDisplayLength="selectedAudit[0].auditContent.length" ></pagination>
    <pagination v-show="  selectedAudit[1].auditContent.length > 0&&selectedIndex==1" :iDisplayLength="selectedAudit[1].auditContent.length"></pagination>

  </div>
</template>


<script>
  import earlyTable from "components/page/medicine/table/earlyTable.vue";
  import pagination from 'components/page/doctor_clinic/bottom_pagination.vue'
  import xlsx from  'xlsx' ;
  import fileSaver from 'file-saver'
  export  default{
    components: {
      earlyTable,
      pagination
    },
    data(){
      return {
        selectedAudit:[
          {
            name:"库存预警",
            selected:true,
            itemAudit:[
              {  name: '序号',},
              {  name:"商品名称",},
              {  name:"规格",},
              {  name:"生产厂家",},
              {  name:"供应商名称",},
              {  name:"预警数量",},
              {  name:"库存数量",},
              {  name:"销售价(元)",},
            ],
            auditContent:[]
          },
          {
            name:"效期预警",
            selected:false,
            itemAudit:[
              {  name: '序号',},
              {  name:"商品名称",},
              {  name:"规格",},
              {  name:"生产厂家",},
              {  name:"供应商名称",},
              {  name:"批号",},
              {  name:"有效期",},
              {  name:"销售价(元)",},
            ],
            auditContent:[]
          },
        ]
        ,
        selectedIndex:0,
        mode:1,
        data_items:[],
      }

    },
    created(){
      this.request_list();
    },
    methods:{
      clickSelectedAudit:function (index) {
        if ( this.selectedIndex!=index){
          this.selectedAudit[index].selected=true;
          this.selectedAudit[ this.selectedIndex].selected=false;
          this.selectedIndex=index;
          this.request_list();
        }
      },
      exportExcel: function () {
        let that = this;
        var sheetName = '';
        if (this.selectedIndex == 0) {
          var headLine = that.selectedAudit[0].itemAudit.map((i) => i.name);
          sheetName = that.selectedAudit[0].name;
          var index = 0;
          var bodyLines = that.selectedAudit[0].auditContent.map((i) => {
            index++;
            return [
              index,
              i.prodName,
              i.prodSpec,
              i.manufacturer,
              i.supplierName,
              i.stockWarning,
              i.alarmNum,
              that.$enumeration.getGoodsPrice(i.retailPrice)
            ];
          })
        } else {
          var headLine = that.selectedAudit[1].itemAudit.map((i) => i.name);
          sheetName = that.selectedAudit[1].name;
          var index = 0;
          var bodyLines = that.selectedAudit[1].auditContent.map((i) => {
            index++;
            return [
              index,
              i.prodName,
              i.prodSpec,
              i.manufacturer,
              i.supplierName,
              i.batchNumber,
              that.$stringUtils.dateFormat(i.expireDate),
              that.$enumeration.getGoodsPrice(i.retailPrice)
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
      request_list:function () {
        var that=this;

        that.$api.get(that, that.selectedIndex ===0?that.$requestApi.listStock:that.$requestApi.listPeriod,"",function  (data) {
          if(data.body.code=='00'){
            if (that.selectedIndex ===0){
              that.selectedAudit[0].auditContent = data.body.data;
            }else {
              that.selectedAudit[1].auditContent = data.body.data;

            }


            that.$store.dispatch('setPageCount',that.$enumerationType.getPageIDisplayLength(   data.body.iTotalRecords));
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });

      },

    },

  }
</script>
