<template>
<div class="ibox-content padding-lr-10 gray-bg">
    <!--顶部栏-->
      <!--按钮-->
  <div style="display: inline-block;margin-top: 10px">
    <a @click="addNewClick" type="button" class="addnewBtn" data-toggle="modal" data-target="#addnew"><img style="width:15px;height: 15px " src="../../../../static/img/set_manage_img/add.png">&nbsp;新增挂号设置</a>
  </div>
  <div class="pull-right search_input" style="margin-top: 5px;margin-right: 0">
    <input placeholder="医生姓名" type="text" style="outline: none;width:200px;border: none;" v-model="search_docName">
    <a @click="searchDocName(search_docName)"><img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png"></a>
  </div>
      <!--模态弹窗开始--新增挂号设置-->
      <div class="modal inmodal fade" id="addnew" tabindex="-1" role="dialog" aria-hidden="true" >
        <div class="modal-dialog modal-lg" style="width: 360px;">
          <div class="modal-content">
            <div class="tc-title-div">新增挂号设置</div>
            <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span aria-hidden="true">&times;</span></button>
            <div class="hr-tcline"></div>
              <div>
              <div class='form-labeldiv'>医生名称: </div>
                <select class='form-tcinput' id="addnew_doc_sId">
                  <option v-for="(doctor_item,index) in doctor_items" :index="index">{{doctor_item.operatorName}}</option>
                </select>
              </div>
              <div>
              <div class='form-labeldiv'>科室名称: </div>
                <select class='form-tcinput' id="addnew_dep_sId">
                  <option v-for="(department_item,index) in department_items" :index="index">{{department_item.departName}}</option>
                </select>
              </div>
              <div class='form-labeldiv'>挂&nbsp号&nbsp费&nbsp: </div>
              <input style='width: 210px' class='form-tcinput' type="number" placeholder='请输入挂号费(元)' v-model="cost_json.ghcost">
              <button @click="saveAddNewCost(cost_json)" style='margin: 30px 10px 30px 75px;' class='form-btn-black' data-dismiss="modal">保存</button>
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
            <td class="text-center">{{index+1}}</td>
            <td class="text-center l_r_border">{{data_item.doctorName}}</td>
            <td class="text-center">{{data_item.departname}}</td>
            <td class="text-center l_r_border">{{data_item.registrationFee/100}}</td>
            <td class="text-center"><a href="javascript:;" data-toggle="modal" data-target="#edit" @click="editCost(data_item,index)">编辑</a></td>
        </tr>
        </tbody>
    </table>
  <!--模态弹窗开始--编辑挂号设置-->
  <div class="modal inmodal fade" id="edit" tabindex="-1" role="dialog" aria-hidden="true">
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
        <input style='width: 210px' class='form-tcinput' type="number" placeholder='请输入挂号费(元)' v-model="registrationFee">
        <button @click="saveEditCost(item_data_line)" style='margin: 30px 10px 30px 75px;' class='form-btn-black' data-dismiss="modal">保存</button><button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
      </div>
    </div>
  </div>
  <!--模态弹窗结束-->

</div>
</template>

<script>

  export default {

    data(){
      return {
        data_items: [],
        doctor_items:[],
        department_items:[],

        search_docName:'',

        item_data_line: {},
        cost_json: {
          doctorName: '',
          departname: '',
          registrationFee: 0,
        },
        registrationFee: 0,
        select_edit_index: -100,

      }
    },

    created(){
      this.cost_set();
    },

    methods: {
//      挂号设置列表
      cost_set: function () {
        var that = this;
        this.$api.get(this, this.$requestApi.costSetList, {"pageNo": "1", "pageSize": "20","doctorName":""}, function (data) {
          if (data.body.code==='00') {
            that.data_items = data.body.data;
          } else {

          }
        });
      },
//      搜索挂号设置
      searchDocName:function (search_docName) {
        var that = this;
        this.$api.get(this, this.$requestApi.costSetList, {"pageNo": "1", "pageSize": "20","doctorName":search_docName}, function (data) {
          if (data.body.code==='00') {
            that.data_items = data.body.data;
          } else {

          }
        });
      },
//      点击新增挂号设置按钮
      addNewClick:function () {
        var that = this;
        this.$api.get(this, this.$requestApi.costDocList, "", function (data) {
          if (data.body.code==='00') {
            that.doctor_items = data.body.data;
          } else {

          }
        });
        this.$api.get(this, this.$requestApi.costDepList, "", function (data) {
          if (data.body.code==='00') {
            that.department_items = data.body.data;
          } else {

          }
        });
      },
//      点击新增挂号设置的保存按钮
      saveAddNewCost: function (cost_json) {
        var obj_doc_S = document.getElementById("addnew_doc_sId");
        var obj_dep_S = document.getElementById("addnew_dep_sId");
        var operatorId = this.doctor_items[obj_doc_S.selectedIndex].operatorId;
        var doctorName = this.doctor_items[obj_doc_S.selectedIndex].operatorName;
        var departId = this.department_items[obj_dep_S.selectedIndex].departId;
        var departname = this.department_items[obj_dep_S.selectedIndex].departName;

        console.log("departname-->" + departname);
        console.log("departId-->" + departId);
        console.log("doctorName-->" + doctorName);
        console.log("operatorId-->" + operatorId);
        var that=this;
        this.$api.post(this,this.$requestApi.addNewCost + operatorId, {"departId":departId,"departname":departname,"registrationFee":parseInt(cost_json.ghcost*100)},function (data) {
          if(data.body.code==='00'){
            console.log("添加成功");
            that.cost_set();
          }else{

          }
        });

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
          if(data.body.code==='00'){
            console.log("修改成功");
            that.cost_set();
          }else{

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
