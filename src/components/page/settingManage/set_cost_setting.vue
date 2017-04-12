<template>
<div class="ibox-content padding-lr-10 gray-bg">
    <!--顶部栏-->
      <!--按钮-->
  <div style="display: inline-block;margin-top: 10px">
    <a @click="addNewClick" type="button" class="addnewBtn" data-toggle="modal" data-target="#addnew_cost"><img style="width:15px;height: 15px " src="../../../../static/img/set_manage_img/add.png">&nbsp;新增挂号设置</a>
  </div>
  <div class="pull-right search_input" style="margin-top: 5px;margin-right: 0">
    <input @keyup.enter="searchDocName(search_docName)" placeholder="医生姓名" type="text" style="outline: none;width:200px;border: none;" v-model="search_docName">
    <a @click="searchDocName(search_docName)"><img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png"></a>
  </div>
      <!--模态弹窗开始--新增挂号设置-->
      <div class="modal inmodal fade" id="addnew_cost" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="width: 360px;">
          <div class="modal-content">
            <div class="tc-title-div">新增挂号设置</div>
            <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span aria-hidden="true">&times;</span></button>
            <div class="hr-tcline"></div>
              <div>
              <div class='form-labeldiv'><span style="color: red;">*</span>医生名称: </div>
              <input @click="clickDocNameList" readonly v-model="docName" placeholder="请选择医生" data-toggle="dropdown" style="border-radius: 3px" class="form-tcinput" type="text">
              <ul  v-show="doctor_items.length>0" class="attopic dropdown-menu" style="width: 210px;top:90px;left:89px;">
                <li @click="selectDocName(doctor_item,index)" v-for="(doctor_item, index) in doctor_items">
                  <a class="no-padding" style="text-align: center">{{doctor_item.operatorName}}</a>
                </li>
              </ul>
              <img @click="clickDocNameList" data-toggle="dropdown" style="position: absolute;width: 10px;height: 10px;margin-top:25px;right:65px" src="../../../../static/img/LoginAndRegister/register_arrow_gray.png">
              </div>
              <div>
              <div class='form-labeldiv'><span style="color: red;">*</span>科室名称: </div>
              <input @click="clickDepartNameList" readonly v-model="departName" placeholder="请选择科室" data-toggle="dropdown" style="border-radius: 3px" class="form-tcinput" type="text">
              <ul v-show="department_items.length>0" class="attopic dropdown-menu" style="width: 210px;top:134px;left:89px;">
                <li @click="selectDepartName(department_item,index)" v-for="(department_item, index) in department_items">
                  <a class="no-padding" style="text-align: center">{{department_item.departName}}</a>
                </li>
              </ul>
              <img @click="clickDepartNameList" data-toggle="dropdown" style="position: absolute;width: 10px;height: 10px;margin-top:25px;right:65px" src="../../../../static/img/LoginAndRegister/register_arrow_gray.png">
              </div>
              <div class='form-labeldiv'>&nbsp挂&nbsp号&nbsp费&nbsp: </div>
              <number decimals="2" maxlength='7' style='width: 210px' class='form-tcinput' placeholder='请输入挂号费(元)' v-model="registrationFee"></number>
              <button @click="saveAddNewCost(cost_json)" style='margin: 30px 10px 30px 75px;' class='form-btn-black'>保存</button>
              <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
      <!--模态弹窗结束-->
    <!--顶部栏结束-->
    <table class="table border-top-2 table-margintop white-bg">
        <thead>
        <tr>
            <th class="text-center">序号</th>
            <th class="text-center l_r_border">医生名称</th>
            <th class="text-center">科室名称</th>
            <th class="text-center l_r_border">挂号费 (元)</th>
            <th class="text-center">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(data_item,index) in data_items">
            <td class="text-center">{{waitParams.pageNo+index}}</td>
            <td class="text-center l_r_border">{{data_item.doctorName}}</td>
            <td class="text-center">{{data_item.departname}}</td>
            <td class="text-center l_r_border">{{data_item.registrationFee/100}}</td>
            <td class="text-center"><a href="javascript:;" data-toggle="modal" data-target="#edit_cost" @click="editCost(data_item,index)">编辑</a></td>
        </tr>
        </tbody>
    </table>
  <!--模态弹窗开始--编辑挂号设置-->
  <div class="modal inmodal fade" id="edit_cost" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg" style="width: 360px;">
      <div class="modal-content">
        <div class="tc-title-div">修改挂号设置</div>
        <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span aria-hidden="true">&times;</span></button>
        <div class="hr-tcline"></div>
        <div>
          <div class='form-labeldiv'>医生名称: </div>
          <div class='form-labeldiv' style="width: 210px;padding-left: 10px">{{item_data_line.doctorName}}</div>
        </div>
        <div>
          <div class='form-labeldiv'>医生科室: </div>
          <div class='form-labeldiv' style="width: 210px;padding-left: 10px">{{item_data_line.departname}}</div>
        </div>
        <div class='form-labeldiv'>挂&nbsp号&nbsp费&nbsp: </div>
        <number decimals="2" maxlength='7' style='width: 210px' class='form-tcinput' placeholder='请输入挂号费(元)' v-model="registrationFee"></number>
        <button @click="saveEditCost(item_data_line)" style='margin: 30px 10px 30px 75px;' class='form-btn-black'>保存</button><button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
      </div>
    </div>
  </div>
  <!--模态弹窗结束-->
  <pagination v-show="data_items.length > 0" :iDisplayLength="data_items.length"></pagination>

  <div v-show="data_items.length <= 0" style="width:100%; height:100%; text-align:center; margin-top:150px">
    <img src="../../../../static/img/patient_nor.png">
    <h5>暂无此医生</h5>
  </div>
      
</div>
</template>

<script>
import pagination from '../doctor_clinic/bottom_pagination.vue';
import number from '../../commonView/number.vue';

  export default {
    components:{
      pagination,
      number
    },

    data(){
      return {
        data_items: [],
        doctor_items:[],
        department_items:[],

        search_docName:'',

        item_data_line: {},
        cost_json: {
          operatorId:'',
          departId:'',
        },
        docName:'',
        departName:'',
        registrationFee: '',
        select_edit_index: -100,
        waitParams:{
          pageSize:this.$enumerationType.pageSize,
          pageNo:'',
          doctorName:'',
        }
      }
    },

    created(){
      this.cost_set_list();
    },

    methods: {
      pageIndexNo:function(){
        		return (this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.$enumerationType.pageSize+1;
      },
//      挂号设置列表
      cost_set_list: function (search_docName) {
        this.waitParams.pageNo = this.pageIndexNo();
        this.waitParams.doctorName = search_docName;
        var that = this;
        this.$api.get(this, this.$requestApi.costSetList, this.waitParams, function (data) {
          if(data.body.code == '00'){
            that.data_items = data.body.data;
            that.$store.dispatch('setPageCount',that.$enumerationType.getPageNumber(data.body.iTotalRecords));
          } else {
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        });
      },
      // 分页点击调用
      request_list:function (index) {
				this.cost_set_list();
      },
//      搜索挂号设置
      searchDocName:function (search_docName) {
        this.$store.dispatch('setCurrentPageNo',1);
        this.cost_set_list(search_docName);
      },
//      点击新增挂号设置按钮
      addNewClick:function () {
        this.docName = '';
        this.departName = '';
        this.registrationFee = '',
        this.cost_json = {
          operatorId:'',
          departId:'',
        };
      },
      // 获取医生列表
      clickDocNameList:function (){
        var that = this;
        this.$api.get(this, this.$requestApi.costDocList, "", function (data) {
          if(data.body.code == '00'){
            that.doctor_items = data.body.data;
          } else {
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        });
      },
      // 获取科室列表
      clickDepartNameList:function(){
        var that = this;
        this.$api.get(this, this.$requestApi.costDepList, "", function (data) {
          if(data.body.code == '00'){
            that.department_items = data.body.data;
          } else {
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        });
      },
      selectDocName:function(doctor_item,index){
        this.cost_json.operatorId = doctor_item.operatorId;
        this.docName = doctor_item.operatorName;
      },
      selectDepartName:function(department_item,index){
        this.cost_json.departId = department_item.departId;
        this.departName = department_item.departName;
        console.log(this.departName);
      },
      getFocus:function(registrationFee){
        console.log("getFocus~~~");
      },
      loseFocus:function(registrationFee){
        console.log("loseFocus~~~~");
        var regu = "^[0-9]+(.[0-9]{1,2})?$";
        var re = new RegExp(regu);
        console.log("--------->" + this.registrationFee + "-------->" + re.test(this.registrationFee));
        if(!re.test(this.registrationFee||!this.registrationFee)){
          this.registrationFee = '';
          swal({title: "挂号费填写错误", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }
      },
//      点击新增挂号设置的保存按钮
      saveAddNewCost: function (cost_json) {
        if(cost_json.operatorId && cost_json.departId) {
          var that=this;
          this.$api.post(this,this.$requestApi.addNewCost + cost_json.operatorId, {"departId":cost_json.departId,"departname":this.departName,"registrationFee":parseInt(this.registrationFee*100)},function (data) {
            if(data.body.code == '00'){
              console.log("添加成功");
              that.cost_set_list();
              swal({title: data.body.msg, text: "", type: "success", timer: 1000, showConfirmButton: false});
              $("#addnew_cost").modal('hide');
            }else{
              swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
            }
          });
        }else {
          console.log("fee-->"+this.registrationFee+" operatorId-->"+cost_json.operatorId+" departId-->"+cost_json.departId);
          swal({title: "必填项未填写完整", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }
      },
//      点击编辑按钮
      editCost: function (data_item, index) {
        this.item_data_line = data_item;
        this.registrationFee = data_item.registrationFee/100;
        this.select_edit_index = index;
      },
//      点击编辑窗口的保存按钮
      saveEditCost: function (item_data_line) {
          var that=this;
          this.$api.post(this,this.$requestApi.editCost + item_data_line.doctorId, {"registrationFee":parseInt(this.registrationFee*100)},function (data) {
            if(data.body.code == '00'){
              console.log("修改成功");
              that.cost_set_list();
              swal({title: data.body.msg, text: "", type: "success", timer: 1000, showConfirmButton: false});
              $("#edit_cost").modal('hide');
            }else{
              swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
            }
          });
      },

    },
  }

</script>

<style>
    /*@import "../../style/xzy_css/xzycss.css";*/

    /*弹窗中的div*/
    .tc-title-div{
        margin: 15px 0px 10px 20px;
        font-size: 14px;
        display: inline-block;
    }
    .form-labeldiv{
        display: inline-block;
        width: 85px;
    }

    /*分割线*/
    .hr-tcline{
        border: 0;
        border-bottom: 1px solid #e7eaec;
        /*border-style: solid !important;*/
    }
    .form-tcinput{
        background: #F9F9F9;
        background-image: none;
        border: 0px;
        border-radius: 1px;
        box-shadow: none;
        color: inherit;
        display: inline-block;
        padding: 6px 12px;
        /*-webkit-transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;*/
        /*transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;*/
        width: 210px;
        font-size: 12px;
    }
    .form-tcinput:focus {
        border-color: #5FA8D4;
        outline: 0;
        -webkit-box-shadow:0 0 1px 1px #5FA8D4;
        -moz-box-shadow:0 0 1px 1px #5FA8D4;
        box-shadow:0 0 1px 1px #5FA8D4;
    }

    .form-btn-black{
        border: 0px;
        border-radius: 1px;
        color: white;
        background: #1F2A44;
        font-size: 14px;
        width: 100px;
        height: 30px;
        margin: 20px 10px 0px 195px;
        outline: none;
        text-align: center;
    }
    .form-btn-white{
        border: 1px solid #0B0608;
        border-radius: 1px;
        color: #0B0608;
        background: white;
        font-size: 14px;
        width: 100px;
        height: 30px;
        outline: none;
        position: relative;
        text-align: center;
    }
    .top_right {
        display: inline-block;
        float: right;
    }

</style>
