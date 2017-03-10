<template>
  <div class="ibox-content padding-lr-10 gray-bg">
    <!--按钮-->
    <div style="display: inline-block;margin-top: 10px">
      <a type="button" class="addnewBtn" data-toggle="modal" data-target="#addnew"><img style="width:15px;height: 15px " src="../../../../static/img/set_manage_img/add.png">&nbsp;增加角色</a>
    </div>
    <div class="pull-right search_input" style="margin-top: 5px;margin-right: 0">
      <input placeholder="请输入角色名称" type="text" style="outline: none;width:200px;border: none;" v-model="search_role_name">
      <a @click="searchRole(search_role_name)"><img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png"></a>
    </div>
    <!--模态弹窗开始--增加角色-->
    <div class="modal inmodal fade" id="addnew" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg" style="width: 360px;">
        <div class="modal-content">
          <div class="tc-title-div">增加角色</div>
          <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
            aria-hidden="true">&times;</span></button>
          <div class="hr-tcline"></div><!--分隔线-->
          <input style='width: 300px' class='form-tcinput form-alone-input' placeholder='请输入需要增加的角色名称' v-model="add_role_name">
          <button @click="saveAddRole(add_role_name)" style='margin: 80px 10px 30px 75px;' class='form-btn-black' data-dismiss="modal">保存</button>
          <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
    <!--模态弹窗结束-->
    <table class="table border-top-2 table-margintop white-bg">
      <thead>
      <tr>
        <th class="text-center">序号</th>
        <th class="text-center">角色名称</th>
        <th class="text-right">操作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
        <th class="text-right">&nbsp;</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(data_item,index) in data_items">
        <td class="text-center">{{index+1}}</td>
        <td class="text-center">{{data_item.roleName}}</td>
        <td class="text-right"><a v-if="data_item.hospitalId!=0 && data_item.roleType!=1" href="javascript:;" data-toggle="modal" data-target="#edit" @click="editRole(data_item,index)">编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a v-if="data_item.isAdmin!=1" href="javascript:;" data-toggle="modal" data-target="#powerSet">权限设置</a></td>
        <td class="text-right">&nbsp;</td>
      </tr>

      </tbody>
    </table>

    <!--模态弹窗开始--修改名称-->
    <div class="modal inmodal fade" id="edit" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg" style="width: 360px;">
        <div class="modal-content">
          <div class="tc-title-div">修改名称</div>
          <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
            aria-hidden="true">&times;</span></button>
          <div class="hr-tcline"></div><!--分隔线-->
          <input style='width: 300px' class='form-tcinput form-alone-input' placeholder='请输入新的角色名称' v-model="edit_role_name">
          <button @click="saveEditRole(edit_role_name)" style='margin: 80px 10px 30px 75px;' class='form-btn-black' data-dismiss="modal">保存</button>
          <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
    <!--模态弹窗结束-->

    <!--模态弹窗开始--权限设置-->
    <div class="modal inmodal fade" id="powerSet" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg" style="width: 920px;">
        <div class="modal-content">
          <div class="tc-title-div">权限设置</div>
          <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
            aria-hidden="true">&times;</span></button>
          <div class="hr-tcline"></div><!--分隔线-->
          <div class='tc-block-div'>
            <div class='tc-darkgray-div'>
              <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">挂号</span></div>
            </div>
            <!--灰色部分复选框-->
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">新增挂号</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">挂号列表</span></div>
          </div>
          <div class='tc-block-div'>
            <div class='tc-darkgray-div'>
              <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">收费</span></div>
            </div>
            <!--灰色部分复选框-->
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">待收费</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">收费列表</span></div>
          </div>
          <div class='tc-block-div'>
            <div class='tc-darkgray-div'>
              <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">医生门诊</span></div>
              <!--<a  href="#" style="float: right;font-size: 12px;margin-top: 5px"  data-toggle="modal" data-target="#selfinfo">查看更多</a>-->

            </div>
            <!--灰色部分复选框-->
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">今日患者</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">历史患者</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">医生接诊工作台</span></div>
          </div>
          <div class='tc-block-div'>
            <div class='tc-darkgray-div'>
              <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">治疗室</span></div>
            </div>
            <!--灰色部分复选框-->
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">待治疗</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">已完成</span></div>
          </div>
          <div class='tc-block-div'>
            <div class='tc-darkgray-div'>
              <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">药房</span></div>
            </div>
            <!--灰色部分复选框-->
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">待发药</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">已完成</span></div>
          </div>
          <div class='tc-block-div'>
            <div class='tc-darkgray-div'>
              <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">药品进销存</span></div>
            </div>
            <!--灰色部分复选框-->
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">首营管理</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">库存管理</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">采购</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">采购入库</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">出库</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">盘点</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">审核</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">预警</span></div>
          </div>
          <div class='tc-block-div'>
            <div class='tc-darkgray-div'>
              <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">患者管理</span></div>
            </div>
            <!--灰色部分复选框-->
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">患者列表</span></div>
          </div>
          <div class='tc-block-div'>
            <div class='tc-darkgray-div'>
              <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">数据统计</span></div>
            </div>
            <!--灰色部分复选框-->
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">接诊量</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">收益</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">收益分析</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">药品分析</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">患者年龄分析</span></div>
          </div>
          <div class='tc-block-div'>
            <div class='tc-darkgray-div'>
              <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">设置管理</span></div>
            </div>
            <!--灰色部分复选框-->
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">诊所信息</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">角色管理</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">员工管理</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">挂号设置</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">项目管理</span></div>
            <div class="checkbox-div"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="0"><span class="lightgray-width">项目模板设置</span></div>
          </div>
          <button style='margin: 30px 10px 30px 355px;' class='form-btn-black'>保存</button><button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
    <!--模态弹窗结束-->
<delete-toast></delete-toast>
  </div>

</template>



<script>

//  import screen_title from '../doctor_clinic/screen_content_title.vue'
import deleteToast from 'components/page/settingManage/alert_role.vue'

export default {
  components:{
    deleteToast
  },
    data(){
      return {
        data_items:[],
        item_data_line:{},
        add_role_name:'',
        edit_role_name:'',
        edit_role_id:'',
        click_index:'',
        search_role_name:'',
      }
    },

    created(){
//      this.$store.dispatch('showListCount', false);
//      this.$store.dispatch('showSearchView', true);
      this.role_manage();
    },

    methods: {
      role_manage: function () {
        var that = this;
        this.$api.get(this, this.$requestApi.roleManage, {"pageSize":20,"pageNo":1,"roleName":""}, function (data) {
          if (data.body.code==='00') {
            that.data_items = data.body.data;
          } else {
            console.log(data.body.msg);

          }

        }, function (err) {
          console.log(err);

        });
      },
//      搜索角色
      searchRole:function (search_role_name) {
        var that = this;
        this.$api.get(this, this.$requestApi.roleManage, {"roleName":search_role_name}, function (data) {
          if (data.body.code==='00') {
            that.data_items = data.body.data;
          } else {
            console.log(data.body.msg);

          }

        });
      },
//      保存新增的角色
      saveAddRole: function (add_role_name) {
        if(add_role_name == ''){
          console.log("没填写角色名");
        }else {
          var that=this;
          this.$api.post(this,this.$requestApi.addNewRole, {"roleName":add_role_name,"roleType":"2"},function  (data) {
            if(data.body.code==='00'){
              that.role_manage();
            }else{

            }
          });
        }
      },

      editRole:function (data_item,index) {
        this.edit_role_name = data_item.roleName;
        this.edit_role_id = data_item.roleId;
        this.click_index = index;
      },
//      保存编辑的角色
      saveEditRole:function (edit_role_name) {
        console.log("编辑后的角色名------>" + edit_role_name + "点击的rollId---->" + this.edit_role_id + "index---->" + this.click_index);
        if(edit_role_name == ''){
          console.log("没填写角色名");
        }else {
          var that=this;
          this.$api.post(this,this.$requestApi.updateRole, {"roleName":edit_role_name,"roleId":this.edit_role_id},function  (data) {
            if(data.body.code==='00'){
              that.role_manage();
            }else{

            }
          });
        }
      },



    },

//    components: {screen_title},
  }

</script>


<style>
  /*@import "../../style/xzy_css/xzycss.css";*/

  .padding-lr-10{
    padding:0 30px 0 10px;
  }

  .border-top-2{
    border-top: 2px solid #cacaca;
  }

  .addnewBtn{
    color: #1F2B45;
    font-size: 14px;
    vertical-align: top;
  }

  .table-margintop{
    margin-top: 10px;
  }

  .tc-block-div{
    width: 270px;
    height: 170px;
    float: left;
    background: #F4F4F4;
    margin:20px 0 0 25px;
  }
  .tc-darkgray-div{
    width:270px;
    height:30px;
    display: inline-block;
    background: #ddd;
  }
  /*分割线*/
  .hr-tcline{
    border: 0;
    border-bottom: 1px solid #e7eaec;
    /*border-style: solid !important;*/
  }
  .form-alone-input{
    margin: 20px 0px 0px 20px;
  }

  /*复选框*/
  .checkbox-div {
    /*cursor: pointer;*/
    /*color: #666;*/
    display: inline-block;
    margin:3px 0 0px 10px;
    /*vertical-align: bottom;*/
  }
  .checkbox-div span {
    /*display: inline-block;*/
    margin-left: 5px;
    font-size: 13px;
  }


  .checkbox-gray {
    -webkit-appearance: none;
    cursor: pointer;
    width: 15px;
    height: 15px;
    display: inline-block;
    outline: none !important;
    border: none;
    vertical-align: bottom;
    background: url(../../../../static/img/set_manage_img/select_nor.png) no-repeat;
  }
  .checkbox-gray:checked{
    vertical-align: bottom;
    display: inline-block;
    outline:none;
    border: none;
    width: 15px;
    height: 15px;
    background: url(../../../../static/img/set_manage_img/select.png) no-repeat;
  }


  .lightgray-width{
    width: 70px;
  }


</style>
