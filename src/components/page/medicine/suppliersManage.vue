<!--供应商管理-->

<template>
  <div class="suppliers_manage_body">
    <div class="suppliers_manage_title_add">
      <router-link  :to="{ path: 'add_suppliers'}" append>
        <img src="../../../../static/img/set_manage_img/add.png" class="add_img"><span class="add_title patient_add_btn"> 新增供应商</span></router-link>

        <selected-search class="right_select" :suppliersItems="selectedItems" :placeholderData="placeholderData" :suppliersIndex="suppliersIndex"></selected-search>
    </div>
    <table class="table table-striped table-bordered table-hover dataTables-example">
      <thead>
      <tr >
        <th  v-for="item in suppliers" class="text-center">{{item.name}}</th>
      </tr>
      </thead>
      <tbody>
      <tr class="gradeC" v-for="(suppliersItem ,index) in auditContent">
        <td class="text-center" >{{pageIndexNo()+index}}</td>
        <td class="text-center" >{{$stringUtils.dateFormat(suppliersItem.createdDate)}}</td>
        <td class="text-center" >{{suppliersItem.supplierName}}</td>
        <td class="text-center" >{{suppliersItem.businessLicence}}</td>
        <td class="text-center" >{{$stringUtils.dateFormat(suppliersItem.licenseValidDate)}}</td>
        <td class="text-center" >{{suppliersItem. accountName}}</td>
        <td class="text-center" >{{suppliersItem.accountBank}}</td>
        <td class="text-center" >{{suppliersItem.accountNo}}</td>
        <td class="text-center" >{{suppliersItem.contactName}}</td>
        <td class="text-center" >{{suppliersItem.contactPhone}}</td>
        <td class="text-center" >{{suppliersItem.state==1?'正常':'停用'}}</td>
        <td class="text-center" ><span v-if="suppliersItem.state==1"><router-link class="table-margin-r-5" :to="{ path: 'add_suppliers'}" append><span @click="compileSuppliers( suppliersItem.supplierId)">编辑</span></router-link><a @click="outageGoods(index ,suppliersItem.supplierId)">停用</a> </span><a v-else @click="enabledGoods(index,suppliersItem.supplierId)">启用</a></td>

      </tr>

      </tbody>
      <tbody v-if="auditContent.length===0" ><tr class="gradeC"> <td class="text-center":colspan="suppliers.length">{{$toastContent.toastTableContent}}</td></tr></tbody>

    </table>
    <pagination v-show="auditContent.length > 0" :iDisplayLength="auditContent.length"></pagination>

  </div>
</template>


<script>
  import pagination from 'components/page/doctor_clinic/bottom_pagination.vue';
  import selectedSearch from 'components/commonView/selectedSearch.vue';

  export default{
    components:{
      pagination,
      selectedSearch
    },
    data(){
      return {
        assist_inquiry_show: false,
        suppliersItems: [
          {titleName: '西药'},
          {titleName: '中药'},
        ],
        selectedItems: [
          {titleName: '全部'},
          {titleName: '正常'},
          {titleName: '停用'},
        ],
        suppliersIndex: 0,
        placeholderData:"供应商名称/联系人",
        suppliers:[
          {  name: '序号',},
          {  name:"新增时间",},
          {  name:"供应商名称",},
          {  name:"营业执照号",},
          {  name:"营业执照有效期",},
          {  name:"开户姓名",},
          {  name:"开户银行",},
          {  name:"银行账号"},
          {  name:"联系人"},
          {  name:"联系人电话"},
          {  name:"状态"},
          {  name:"操作"},
        ],
        auditContent:[],
        data_items:[],
        iDisplayLength:10,
      }
    },
    created(){
      this.request();
    },
    methods:{
      pageIndexNo:function(){
        return (this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.$enumerationType.iDisplayLength+1;
      },
      request :function () {
        var that=this;
        this.$api.get(this,this.$requestApi.supplierSearch,{iDisplayLength:this.iDisplayLength},function  (data) {
          console.log(data.body.iTotalRecords);
          if(data.body.code=='00'){
            that.auditContent=data.body.data
            that.$store.dispatch('setPageCount',that.$enumerationType.getPageIDisplayLength(data.body.iTotalRecords));
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
        this.$api.get(this,this.$requestApi.supplierSearch,data,function  (data) {
          console.log(data.body.iTotalRecords);
          if(data.body.code=='00'){
            that.auditContent=data.body.data
            that.$store.dispatch('setPageCount',Math.ceil(Number(data.body.iTotalRecords)/that.iDisplayLength));
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
        if ( that.suppliersIndex===0){
          data= { iDisplayLength:this.iDisplayLength,iDisplayStart:(this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.iDisplayLength+1}
        }else {
          data= {state:that.suppliersIndex, iDisplayLength:this.iDisplayLength,iDisplayStart:(this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.iDisplayLength+1}
        }
        this.$api.get(this,this.$requestApi.supplierSearch,data,function  (data) {
          if(data.body.code=='00'){
            that.auditContent=data.body.data
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });

      },
      getstate:function (state) {

      },
      enabledGoods:function (index,supplierId) {
        console.log(index);


        var that=this;
        this.$api.post(this,this.$requestApi.supplierDisable+supplierId,"",function  (data) {
          if(data.body.code=='00'){
            that.auditContent[index].state=1;
            that. auditContent.splice(index, 1,  that.auditContent[index]);

            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
       },
      //停用
      outageGoods:function (index ,supplierId) {
        console.log(supplierId);

        var that=this;
        this.$api.post(this,this.$requestApi.supplierEnable+supplierId, "",function  (data) {
          if(data.body.code=='00'){
            that.auditContent[index].state=0;
            that. auditContent.splice(index, 1,  that.auditContent[index]);

          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });



      },
      compileSuppliers:function (supplierId) {
        this.$store.dispatch('medicine_compile_suppliers_no',  supplierId);
      },


    },
    mounted: function () {
      $('#data_2 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: false,
        autoclose: true,
        todayHighlight: true,
        enable:true,
        language: "zh-CN",
        minDate: 0,
        format:"mm/dd/yyyy",
        zIndexOffset:8888,
        beforeShow: function (input, inst) {
          $.datepicker._pos = $.datepicker._findPos(input);
          $.datepicker._pos[1] += input.offsetHeight + document.body.scrollTop; // 加入body的scrollTop修正jquery在ie7中定位不準的問題
          inst.dpDiv.css('font-size' ,'70%');
        }
      })
      ;
    },
  }
</script>
<style>
  .suppliers_manage_title_add{
    padding: 10px;
  }
  .suppliers_manage_body{
    padding: 10px;
  }
  .right_select{
    float: right;
    width: 330px;
    background: white;
    height: 32px;
    margin-top: -5px;
    margin-right: 15px;
    border-radius: 2px;
    margin-bottom: 10px;
  }
  .left-a{
    float: left;
  }
  .el-select .el-input {
    width: 90px;
    font-size: 12px;
  }
  .el-select-dropdown__item{
    font-size: 12px;
  }
</style>
