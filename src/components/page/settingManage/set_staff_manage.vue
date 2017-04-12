<template>
  <div class="ibox-content padding-lr-10 gray-bg">
      <!--按钮-->
    <div style="display: inline-block;margin-top: 10px">
      <a @click="addNewClick" type="button" class="addnewBtn" data-toggle="modal" data-target="#addnew_staff"><img style="width:15px;height: 15px " src="../../../../static/img/set_manage_img/add.png">&nbsp;添加员工</a>
    </div>
    <div class="pull-right search_input" style="margin-top: 5px;margin-right: 0">
      <input @keyup.enter="searchStaff(search_staff)" placeholder="姓名/手机号" type="text" style="outline: none;width:200px;border: none;" v-model="search_staff">
      <a @click="searchStaff(search_staff)"><img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png"></a>
    </div>
      <!--模态弹窗开始--添加员工-->
      <div class="modal inmodal fade" id="addnew_staff" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-lg" style="width: 360px;">
          <div class="modal-content">
            <div class="tc-title-div">添加员工</div>
            <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
              aria-hidden="true">&times;</span></button>
            <div class="hr-tcline"></div>
            <div>
              <div class='tc-form-labeldiv'>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名&nbsp<span style="color: red;">*</span></div>
              <input maxlength="20" style='width: 210px' class='form-tcinput' placeholder='请输入真实姓名' v-model="staff_json.operatorName">
            </div>
            <div>
              <div class='tc-form-labeldiv'>手&nbsp&nbsp机&nbsp&nbsp号&nbsp<span style="color: red;">*</span></div>
              <input style='width: 210px' class='form-tcinput' type="tel" placeholder='请输入手机号码' v-model="staff_json.billId" maxlength="11">
            </div>
            <div>
              <div class='tc-form-labeldiv'>邮&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp箱&nbsp</div>
              <input maxlength="32" style='width: 210px' class='form-tcinput' placeholder='请输入邮箱地址' v-model="staff_json.email">
            </div>
            <div>
              <div class='tc-form-labeldiv'>微&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp信&nbsp</div>
              <input maxlength="20" style='width: 210px' class='form-tcinput' placeholder='请输入员工微信号' v-model="staff_json.wechatNo">
            </div>
            <div>
              <div class='tc-form-labeldiv'>角&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp色&nbsp<span style="color: red;">*</span></div>
              <input @click="clickRoleNameList" readonly v-model="roleName" placeholder="请选择角色" data-toggle="dropdown" style="border-radius: 3px" class="form-tcinput" type="text">
              <ul class="attopic dropdown-menu" style="width: 210px;top:265px;left:104px;">
                <li @click="selectRoleName(role_item,index)" v-for="(role_item, index) in roles_items">
                  <a class="no-padding" style="text-align: center">{{role_item.roleName}}</a>
                </li>
              </ul>
              <img @click="clickRoleNameList" data-toggle="dropdown" style="position: absolute;width: 10px;height: 10px;margin-top:25px;right:52px" src="../../../../static/img/LoginAndRegister/register_arrow_gray.png">
            </div>
            <button @click="saveAddNewStaff(staff_json)" style='margin: 30px 10px 30px 75px;' class='form-btn-black'>确定</button>
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
        <td class="text-center">{{waitParams.pageNo+index}}</td>
        <td class="text-center l_r_border">{{data_item.operatorName}}</td>
        <td class="text-center">{{data_item.billId}}</td>
        <td class="text-center l_r_border">{{data_item.email}}</td>
        <td class="text-center">{{data_item.wechatNo}}</td>
        <td class="text-center l_r_border">{{data_item.roleName}}</td>
        <td class="text-center"><span v-if="data_item.isAdmin!=1">{{data_item.state == 1 ? '正常' : '停用'}}</span></td>
        <td class="text-center l_r_border"><a v-if="data_item.isAdmin!=1" href="javascript:;" data-toggle="modal" data-target="#edit_staff" @click="editstaff(data_item,index)">编辑</a></td>
        <td class="text-center"><a @click="stopStaff(data_item,index)" v-if="data_item.isAdmin!=1" href="javascript:;" data-toggle="modal" data-target="#stop">{{data_item.state == 1 ? '停用' : '启用'}}</a></td>
      </tr>
      </tbody>
    </table>

    <!--模态弹窗开始--修改员工-->
    <div class="modal inmodal fade" id="edit_staff" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
      <div class="modal-dialog modal-lg" style="width: 360px;">
        <div class="modal-content">
          <div class="tc-title-div">编辑员工信息</div>
          <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                  aria-hidden="true">&times;</span></button>
          <div class="hr-tcline"></div>
          <div>
            <div class='tc-form-labeldiv'>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名&nbsp</div>
            <div class='form-labeldiv' style="width: 210px;padding-left: 10px">{{staff_json.operatorName}}</div>
          </div>
          <div>
            <div class='tc-form-labeldiv'>手&nbsp&nbsp机&nbsp&nbsp号&nbsp</div>
            <div class='form-labeldiv' style="width: 210px;padding-left: 10px">{{staff_json.billId}}</div>
          </div>
          <div>
            <div class='tc-form-labeldiv'>邮&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp箱&nbsp</div>
            <input maxlength="32" style='width: 210px' class='form-tcinput' placeholder='请输入邮箱地址' v-model="edit_json_email">
          </div>
          <div>
            <div class='tc-form-labeldiv'>微&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp信&nbsp</div>
            <input maxlength="20" style='width: 210px' class='form-tcinput' placeholder='请输入员工微信号' v-model="edit_json_wechatNo">
          </div>
          <div>
            <div class='tc-form-labeldiv'>角&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp色&nbsp<span style="color: red;">*</span></div>
            <input @click="clickRoleNameList" readonly v-model="roleName" placeholder="请选择角色" data-toggle="dropdown" style="border-radius: 3px" class="form-tcinput" type="text">
              <ul class="attopic dropdown-menu" style="width: 210px;top:254px;left:104px;">
                <li @click="selectRoleName(role_item,index)" v-for="(role_item, index) in roles_items">
                  <a class="no-padding" style="text-align: center">{{role_item.roleName}}</a>
                </li>
              </ul>
              <img @click="clickRoleNameList" data-toggle="dropdown" style="position: absolute;width: 10px;height: 10px;margin-top:25px;right:52px" src="../../../../static/img/LoginAndRegister/register_arrow_gray.png">
          </div>
          <button @click="saveEditStaff(staff_json)" style='margin: 30px 10px 30px 75px;' class='form-btn-black'>确定</button>
          <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>

    <pagination v-show="data_items.length > 0" :iDisplayLength="data_items.length"></pagination>
  </div>
</template>

<script>
import pagination from '../doctor_clinic/bottom_pagination.vue';

  export default {
    components:{
      pagination
    },

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
          roleId:'',
        },
        roleName:'',
        select_edit_index:-100,
        waitParams:{
          pageSize:this.$enumerationType.pageSize,
          pageNo:'',
          operatorNameOrBillId:'',
        }
      }
    },

    created(){
      this.staff_manage_list();
    },

    methods: {
      pageIndexNo:function(){
        		return (this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.$enumerationType.pageSize+1;
      		},
      staff_manage_list: function () {
        this.waitParams.pageNo = this.pageIndexNo();
        var that = this;
        this.$api.get(this, this.$requestApi.staffManage, this.waitParams, function (data) {
          if (data.body.code == '00') {
            that.data_items = data.body.data;
            that.$store.dispatch('setPageCount',that.$enumerationType.getPageNumber(data.body.iTotalRecords));
          } else {
            console.log(data.body.msg);
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        }, function (err) {
          console.log(err);
        });
      },
      // 分页点击调用
      request_list:function (index) {
				this.staff_manage_list();
      },
//      搜索员工
      searchStaff:function (search_staff) {
        var that = this;
        this.waitParams.operatorNameOrBillId = search_staff;
        this.$api.get(this, this.$requestApi.staffManage, this.waitParams, function (data) {
          if (data.body.code == '00') {
            that.data_items = data.body.data;
            that.$store.dispatch('setPageCount',that.$enumerationType.getPageNumber(data.body.iTotalRecords));
          } else {
            console.log(data.body.msg);
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        }, function (err) {
          console.log(err);
        });
      },
//      点击了添加员工
      addNewClick:function () {
        this.staff_json = {
          operatorName:'',
          billId:'',
          email:'',
          wechatNo:'',
          roleId:'',
        };
        this.roleName = '';
        // var that = this;
        // this.$api.get(this, this.$requestApi.roleManage, "", function (data) {
        //   console.log("请求的数据:" + JSON.stringify(data));
        //   if (data.body.code == '00') {
        //     that.roles_items = data.body.data;
        //   } else {

        //   }
        // });
      },
      // 点击了选择角色
      clickRoleNameList:function (){
        var that = this;
        this.$api.get(this, this.$requestApi.roleManage, "", function (data) {
          console.log("请求的数据:" + JSON.stringify(data));
          if (data.body.code == '00') {
            that.roles_items = data.body.data;
          } else {
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        });
      },
      // 选择角色
      selectRoleName: function (role_item,index){
        this.staff_json.roleId = role_item.roleId;
        this.roleName = role_item.roleName;
      },
//      保存添加员工
      saveAddNewStaff:function (staffjson) {
        console.log("roleId--->"+staffjson.roleId);
        if(staffjson.operatorName && staffjson.billId && staffjson.roleId) {
          if(this.$stringUtils.checkPhone(staffjson.billId)){
            var that=this;
            this.$api.post(this,this.$requestApi.addNewStaff, {"operatorName":staffjson.operatorName,"billId":staffjson.billId,"email":staffjson.email,"wechatNo":staffjson.wechatNo,"roleId":staffjson.roleId},function (data) {
              if(data.body.code == '00'){
                console.log("添加成功");
                swal({title: data.body.msg, text: "", type: "success", timer: 1000, showConfirmButton: false});
                that.staff_manage_list();
                $("#addnew_staff").modal('hide');
              }else{
                swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
              }
            });
          }else {
            swal({title: "错误的手机号", text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        }else {
          swal({title: "必填项未填写完整", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }
      },
//      点击员工列表的编辑按钮
      editstaff:function (data_item,index) {
        this.staff_json = data_item;
        this.roleName = data_item.roleName;
        this.edit_json_email = data_item.email;
        this.edit_json_wechatNo = data_item.wechatNo;
        this.select_edit_index = index;
      },
//      点击编辑框的保存按钮
      saveEditStaff:function (staff_json) {
        var operatorId = this.data_items[this.select_edit_index].operatorId;
        var that=this;
        this.$api.post(this,this.$requestApi.updateStaff, {"email":that.edit_json_email,"wechatNo":that.edit_json_wechatNo,"roleId":staff_json.roleId,"operatorId":operatorId},function (data) {
          if(data.body.code == '00'){
            console.log("编辑成功");
            swal({title: data.body.msg, text: "", type: "success", timer: 1000, showConfirmButton: false});
            that.staff_manage_list();
            $("#edit_staff").modal('hide');
          }else{
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        });
      },
//      启用停用员工
      stopStaff:function (data_item,index) {
        if(data_item.state=='1'){//当前状态为启用状态
          var that=this;
          this.$api.post(this,this.$requestApi.stopStaff, {"operatorId":data_item.operatorId},function (data) {
            if(data.body.code == '00'){
              console.log("停用成功");
              swal({title: "停用成功", text: "", type: "success", timer: 1000, showConfirmButton: false});
              that.data_items[index].state = 0;
            }else{
              swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
            }
          });
        }else {//当前状态为停用状态
          var that=this;
          this.$api.post(this,this.$requestApi.startStaff, {"operatorId":data_item.operatorId},function (data) {
            if(data.body.code == '00'){
              console.log("启用成功");
              swal({title: "启用成功", text: "", type: "success", timer: 1000, showConfirmButton: false});
              that.data_items[index].state = 1;
            }else{
              swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
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
