<template>
  <div class="ibox-content padding-lr-10 gray-bg">
      <!--按钮-->
    <div style="display: inline-block;margin-top: 10px">
      <a @click="addNewClick" type="button" class="addnewBtn" data-toggle="modal" data-target="#addnew"><img style="width:15px;height: 15px " src="../../../../static/img/set_manage_img/add.png">&nbsp;添加员工</a>
    </div>
    <div class="pull-right search_input" style="margin-top: 5px;margin-right: 0">
      <input placeholder="姓名/手机号" type="text" style="outline: none;width:200px;border: none;" v-model="search_staff">
      <a @click="searchStaff(search_staff)"><img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png"></a>
    </div>
      <!--模态弹窗开始--添加员工-->
      <div class="modal inmodal fade" id="addnew" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="width: 360px;">
          <div class="modal-content">
            <div class="tc-title-div">添加员工</div>
            <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
              aria-hidden="true">&times;</span></button>
            <div class="hr-tcline"></div>
            <div>
              <div class='tc-form-labeldiv'>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名&nbsp<span style="color: red;">&#10045</span></div>
              <input style='width: 210px' class='form-tcinput' placeholder='请输入真实姓名' v-model="staff_json.operatorName">
            </div>
            <div>
              <div class='tc-form-labeldiv'>手&nbsp&nbsp机&nbsp&nbsp号&nbsp<span style="color: red;">&#10045</span></div>
              <input style='width: 210px' class='form-tcinput' type="number" placeholder='请输入手机号码' v-model="staff_json.billId">
            </div>
            <div>
              <div class='tc-form-labeldiv'>邮&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp箱&nbsp</div>
              <input style='width: 210px' class='form-tcinput' placeholder='请输入邮箱地址' v-model="staff_json.email">
            </div>
            <div>
              <div class='tc-form-labeldiv'>微&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp信&nbsp</div>
              <input style='width: 210px' class='form-tcinput' placeholder='请输入员工微信号' v-model="staff_json.wechatNo">
            </div>
            <div>
              <div class='tc-form-labeldiv'>角&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp色&nbsp<span style="color: red;">&#10045</span></div>
              <select class='form-tcinput' id="pid">
                <option v-for="(roles_item,index) in roles_items" :index="index">{{roles_item.roleName}}</option>
              </select>
            </div>
            <button @click="saveAddNewStaff(staff_json)" style='margin: 30px 10px 30px 75px;' class='form-btn-black' data-dismiss="modal">确定</button>
            <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    <table class="table border-top-2 table-margintop white-bg">
      <thead>
      <tr>
        <th class="text-center">序号</th>
        <th class="text-center l_r_border">姓名</th>
        <th class="text-center">手机号</th>
        <th class="text-center l_r_border">邮箱</th>
        <th class="text-center">微信</th>
        <th class="text-center l_r_border">角色</th>
        <th class="text-center">状态</th>
        <th class="text-center l_r_border">操作</th>
        <th  class="text-center">操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(data_item,index) in data_items">
        <td class="text-center">{{index+1}}</td>
        <td class="text-center l_r_border">{{data_item.operatorName}}</td>
        <td class="text-center">{{data_item.billId}}</td>
        <td class="text-center l_r_border">{{data_item.email}}</td>
        <td class="text-center">{{data_item.wechatNo}}</td>
        <td class="text-center l_r_border">{{data_item.roleName}}</td>
        <td class="text-center"><span v-if="data_item.isAdmin!=1">{{data_item.state == 1 ? '正常' : '停用'}}</span></td>
        <td class="text-center l_r_border"><a v-if="data_item.isAdmin!=1" href="javascript:;" data-toggle="modal" data-target="#edit" @click="editstaff(data_item,index)">编辑</a></td>
        <td class="text-center"><a @click="stopStaff(data_item,index)" v-if="data_item.isAdmin!=1" href="javascript:;" data-toggle="modal" data-target="#stop">{{data_item.state == 1 ? '停用' : '启用'}}</a></td>
      </tr>
      </tbody>
    </table>

    <!--模态弹窗开始--修改员工-->
    <div class="modal inmodal fade" id="edit" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg" style="width: 360px;">
        <div class="modal-content">
          <div class="tc-title-div">编辑员工信息</div>
          <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                  aria-hidden="true">&times;</span></button>
          <div class="hr-tcline"></div>
          <div>
            <div class='tc-form-labeldiv'>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名&nbsp<span style="color: red;">&#10045</span></div>
            <div class='form-labeldiv' style="width: 210px;padding-left: 10px">{{staff_json.operatorName}}</div>
          </div>
          <div>
            <div class='tc-form-labeldiv'>手&nbsp&nbsp机&nbsp&nbsp号&nbsp<span style="color: red;">&#10045</span></div>
            <div class='form-labeldiv' style="width: 210px;padding-left: 10px">{{staff_json.billId}}</div>
          </div>
          <div>
            <div class='tc-form-labeldiv'>邮&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp箱&nbsp</div>
            <input style='width: 210px' class='form-tcinput' placeholder='请输入邮箱地址' v-model="edit_json_email">
          </div>
          <div>
            <div class='tc-form-labeldiv'>微&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp信&nbsp</div>
            <input style='width: 210px' class='form-tcinput' placeholder='请输入员工微信号' v-model="edit_json_wechatNo">
          </div>
          <div>
            <div class='tc-form-labeldiv'>角&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp色&nbsp<span style="color: red;">&#10045</span></div>
            <select class='form-tcinput' id="edit_select_id">
              <option v-for="(roles_item,index) in roles_items" :index="index">{{roles_item.roleName}}</option>
            </select>
          </div>
          <button @click="saveEditStaff(staff_json)" style='margin: 30px 10px 30px 75px;' class='form-btn-black' data-dismiss="modal">确定</button>
          <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>


  export default {

    data(){
      return {
        data_items:[],
        roles_items:[],
        search_staff:'',
        edit_json_email:'',
        edit_json_wechatNo:'',
        staff_json:{
          operatorName:'',
          billId:'',
          email:'',
          wechatNo:'',
        },
        select_edit_index:-100,
      }
    },

    created(){
      this.staff_manage();
    },

    methods: {
      staff_manage: function () {
        var that = this;
        this.$api.get(this, this.$requestApi.staffManage, {"pageSize":40,"pageNo":1,"billId":"","operatorName":""}, function (data) {
          if (data.body.code==='00') {
            that.data_items = data.body.data;
          } else {
            console.log(data.body.msg);
          }
        }, function (err) {
          console.log(err);
        });
      },
//      搜索员工
      searchStaff:function (search_staff) {
        var that = this;
        var billId;
        var operatorName;
        if (search_staff.length==11){
          billId = search_staff;
          operatorName = '';
        }else {
          billId = '';
          operatorName = search_staff;
        }
        console.log(billId + "------" + operatorName);
        this.$api.get(this, this.$requestApi.staffManage, {"billId":billId,"operatorName":operatorName}, function (data) {
          if (data.body.code==='00') {
            that.data_items = data.body.data;
          } else {
            console.log(data.body.msg);
          }
        }, function (err) {
          console.log(err);
        });
      },
//      点击了添加员工
      addNewClick:function () {
        this.staff_json = {};
        var that = this;
        this.$api.get(this, this.$requestApi.roleManage, "", function (data) {
          console.log("请求的数据:" + JSON.stringify(data));
          if (data.body.code==='00') {
            that.roles_items = data.body.data;
          } else {

          }
        }, function (err) {

        });
      },
//      保存添加员工
      saveAddNewStaff:function (staffjson) {
        var objS = document.getElementById("pid");
        var roleName = this.roles_items[objS.selectedIndex].roleName;
        var roleId = this.roles_items[objS.selectedIndex].roleId;
        console.log(roleId);
        if(staffjson.operatorName==''||staffjson.billId==''){
          console.log("没填完");
        }else {
          var that=this;
          this.$api.post(this,this.$requestApi.addNewStaff, {"operatorName":staffjson.operatorName,"billId":staffjson.billId,"email":staffjson.email,"wechatNo":staffjson.wechatNo,"roleId":roleId},function (data) {
            if(data.body.code==='00'){
              console.log("添加成功");
              that.staff_manage();
            }else{

            }
          });
        }
      },
//      点击员工列表的编辑按钮
      editstaff:function (data_item,index) {
        this.staff_json = data_item;
        this.edit_json_email = data_item.email;
        this.edit_json_wechatNo = data_item.wechatNo;
        this.select_edit_index = index;
        var that = this;
        this.$api.get(this, this.$requestApi.roleManage, "", function (data) {
          console.log("请求的数据:" + JSON.stringify(data));
          if (data.body.code==='00') {
            that.roles_items = data.body.data;
          } else {
            console.log(data.body.msg);
          }
        }, function (err) {
          console.log(err);
        });
      },
//      点击编辑框的保存按钮
      saveEditStaff:function (staff_json) {
        var objS = document.getElementById("edit_select_id");
        var roleName = this.roles_items[objS.selectedIndex].roleName;
        var roleId = this.roles_items[objS.selectedIndex].roleId;
        var operatorId = this.data_items[this.select_edit_index].operatorId;
        var that=this;
        this.$api.post(this,this.$requestApi.updateStaff, {"email":that.edit_json_email,"wechatNo":that.edit_json_wechatNo,"roleId":roleId,"operatorId":operatorId},function (data) {
          if(data.body.code==='00'){
            console.log("编辑成功");
            console.log(roleName);
            that.staff_manage();
          }else{

          }
        });
      },
//      启用停用员工
      stopStaff:function (data_item,index) {
        if(data_item.state=='1'){//当前状态为启用状态
          var that=this;
          this.$api.post(this,this.$requestApi.stopStaff, {"operatorId":data_item.operatorId},function (data) {
            if(data.body.code==='00'){
              console.log("停用成功");
              that.data_items[index].state = 0;
            }else{

            }
          });
        }else {//当前状态为停用状态
          var that=this;
          this.$api.post(this,this.$requestApi.startStaff, {"operatorId":data_item.operatorId},function (data) {
            if(data.body.code==='00'){
              console.log("启用成功");
              that.data_items[index].state = 1;
            }else{

            }
          });
        }
      },

//      selectRole:function (index,role) {
//        console.log('下标----->' + index);
//        this.data_items[index].role = role;
//      },

    },
  }




</script>

<style>
  /*@import "../../style/xzy_css/xzycss.css";*/

  /*分割线*/
  .hr-tcline{
    border: 0;
    border-bottom: 1px solid #e7eaec;
    /*border-style: solid !important;*/
  }
  /*弹窗表单*/
  .form-labeldiv{
    padding:20px 0 0 20px;
    display: inline-block;
    width: 85px;
  }


</style>
