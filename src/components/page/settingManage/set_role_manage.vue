<template>
  <div class="ibox-content padding-lr-10 gray-bg">
    <!--按钮-->
    <div style="display: inline-block;margin-top: 10px">
      <a @click="addRoleClick" type="button" class="addnewBtn" data-toggle="modal" data-target="#addnew_role"><img style="width:15px;height: 15px " src="../../../../static/img/set_manage_img/add.png">&nbsp;增加角色</a>
    </div>
    <div class="pull-right search_input" style="margin-top: 5px;margin-right: 0">
      <input @keyup.enter="searchRole(search_role_name)" placeholder="请输入角色名称" type="text" style="outline: none;width:200px;border: none;" v-model="search_role_name">
      <a @click="searchRole(search_role_name)"><img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png"></a>
    </div>
    <!--模态弹窗开始--增加角色-->
    <div class="modal inmodal fade" id="addnew_role" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
      <div class="modal-dialog modal-lg" style="width: 360px;">
        <div class="modal-content">
          <div class="tc-title-div">增加角色</div>
          <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
            aria-hidden="true">&times;</span></button>
          <div class="hr-tcline"></div><!--分隔线-->
          <input maxlength='20' style='width: 300px' class='form-tcinput form-alone-input' placeholder='请输入需要增加的角色名称' v-model="add_role_name">
          <button @click="saveAddRole(add_role_name)" style='margin: 80px 10px 30px 75px;' class='form-btn-black'>保存</button>
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
        <td class="text-center">{{waitParams.pageNo+index}}</td>
        <td class="text-center">{{data_item.roleName}}</td>
        <td class="text-right">
          <a v-if="data_item.hospitalId!=0 && data_item.roleType!=1" href="javascript:;" data-toggle="modal" data-target="#edit_role" @click="editRole(data_item,index)">编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a @click="powerClick(data_item,index)" v-if="data_item.hospitalId!=0 && data_item.roleType!=1" data-toggle="modal" data-target="#powerSet">权限设置</a>
          <a @click="powerClick(data_item,index)" v-if="data_item.hospitalId==0 && data_item.roleType==1" data-toggle="modal" data-target="#powerSet">查看权限</a>
          </td>
        <td class="text-right">&nbsp;</td>
      </tr>

      </tbody>
    </table>

    <!--模态弹窗开始--修改名称-->
    <div class="modal inmodal fade" id="edit_role" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
      <div class="modal-dialog modal-lg" style="width: 360px;">
        <div class="modal-content">
          <div class="tc-title-div">修改名称</div>
          <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
            aria-hidden="true">&times;</span></button>
          <div class="hr-tcline"></div><!--分隔线-->
          <input style='width: 300px' class='form-tcinput form-alone-input' placeholder='请输入新的角色名称' v-model="edit_role_name">
          <button @click="saveEditRole(edit_role_name)" style='margin: 80px 10px 30px 75px;' class='form-btn-black'>保存</button>
          <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
    <!--模态弹窗结束-->

    <!--模态弹窗开始--权限设置-->
    <div class="modal inmodal fade" id="powerSet" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
      <div class="modal-dialog modal-lg" style="width: 920px;">
        <div class="modal-content">
          <div class="tc-title-div">权限设置</div>
          <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
            aria-hidden="true">&times;</span></button>
          <div class="hr-tcline"></div><!--分隔线-->
          <div class='tc-block-div' v-for="(data,index) in datas">
            <div class='tc-darkgray-div'>
              <div class="checkbox-div"><input @click="registerClick(index)" class="checkbox-gray" type="checkbox" name="checkInfo" :checked='data.checkboxDiv' value="0" id="all" :disabled="isDisabled"><span class="lightgray-width">{{data.title}}</span></div>
            </div>
            <!--灰色部分复选框-->
            <div class="checkbox-div" v-for="(content,i) in  data.content"><input class="checkbox-gray" type="checkbox" name="checkInfo" value="4" :checked='content.checkboxDiv'  @click="registerClick1(index,i)" :disabled="isDisabled"><span class="lightgray-width">{{content.title}}</span></div>
           </div>        
          <button @click="saveRolePower" style='margin: 30px 10px 30px 355px;' class='form-btn-black' :disabled="isDisabled">保存</button><button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
    <!--模态弹窗结束-->
    <pagination v-show="data_items.length > 0" :iDisplayLength="data_items.length"></pagination>

    <div v-show="data_items.length <= 0" style="width:100%; height:100%; text-align:center; margin-top:150px">
      <img src="../../../../static/img/patient_nor.png">
      <h5>暂无此角色</h5>
    </div>

<!--<delete-toast></delete-toast>-->
  </div>

</template>



<script>

//  import screen_title from '../doctor_clinic/screen_content_title.vue'
import deleteToast from 'components/page/settingManage/alert_role.vue';
import pagination from '../doctor_clinic/bottom_pagination.vue';

export default {
    components:{
      deleteToast,pagination
    },
    data(){
      return {
        datas:[
          {
            title:"挂号",
            checkboxDiv:false,
            privId:'3',
            content:[
              { 
                title:"新增挂号",
                checkboxDiv:false,
                privId:'4',
                
              },{
                title:"挂号列表",
                checkboxDiv:false,
                privId:'17',
              }
            ]
          },
          {
            title:"收费",
            checkboxDiv:false,
            privId:'1',
            content:[
              { 
                title:"待收费",
                checkboxDiv:false,
                privId:'2',
                
              },{
                title:"收费列表",
                checkboxDiv:false,
                privId:'16',
              }
            ]
          },
          {
            title:"医生门诊",
            checkboxDiv:false,
            privId:'10',
            content:[
              { 
                title:"今日患者",
                checkboxDiv:false,
                privId:'11',
                
              },{
                title:"历史患者",
                checkboxDiv:false,
                privId:'12',
              }
            ]
          },
          {
            title:"治疗室",
            checkboxDiv:false,
            privId:'18',
            content:[
              { 
                title:"待治疗",
                checkboxDiv:false,
                privId:'19',
                
              },{
                title:"治疗列表",
                checkboxDiv:false,
                privId:'21',
              }
            ]
          },
          {
            title:"药房",
            checkboxDiv:false,
            privId:'5',
            content:[
              { 
                title:"待发药",
                checkboxDiv:false,
                privId:'14',
                
              },{
                title:"发药列表",
                checkboxDiv:false,
                privId:'15',
              }
            ]
          },
          {
            title:"药品进销存",
            checkboxDiv:false,
            privId:'23',
            content:[
              { 
                title:"商品管理",
                checkboxDiv:false,
                privId:'24',
                
              },{
                title:"供应商管理",
                checkboxDiv:false,
                privId:'25',
              },{
                title:"库存管理",
                checkboxDiv:false,
                privId:'26',
              },{
                title:"预警",
                checkboxDiv:false,
                privId:'27',
              },{
                title:"采购",
                checkboxDiv:false,
                privId:'28',
              },{
                title:"入库",
                checkboxDiv:false,
                privId:'30',
              },{
                title:"出库",
                checkboxDiv:false,
                privId:'29',
              },{
                title:"退货",
                checkboxDiv:false,
                privId:'31',
              },{
                title:"盘点",
                checkboxDiv:false,
                privId:'32',
              },{
                title:"审核",
                checkboxDiv:false,
                privId:'33',
              },
            ]
          },
          {
            title:"患者管理",
            checkboxDiv:false,
            privId:'6',
            content:[
              { 
                title:"患者列表",
                checkboxDiv:false,
                privId:'13',
                
              },
            ]
          },
          {
            title:"设置管理",
            checkboxDiv:false,
            privId:'7',
            content:[
              { 
                title:"诊所信息",
                checkboxDiv:false,
                privId:'34',
                
              },{
                title:"角色管理",
                checkboxDiv:false,
                privId:'8',
              },{
                title:"员工管理",
                checkboxDiv:false,
                privId:'9',
              },{
                title:"挂号设置",
                checkboxDiv:false,
                privId:'35',
              },{
                title:"项目设置",
                checkboxDiv:false,
                privId:'36',
              },{
                title:"项目模板设置",
                checkboxDiv:false,
                privId:'37',
              },
            ]
          },
        ],
        data_items:[],
        item_data_line:{},
        add_role_name:'',
        edit_role_name:'',
        edit_role_id:'',
        click_index:'',
        search_role_name:'',

        power_arr:[],
        checkboxDiv:false,
         checkboxDiv1:false,
         checked1:false,
         checkboxDivmodel:0,
         checkboxDiv1model:0,
         checked1model:0,

        waitParams:{
          pageSize:this.$enumerationType.pageSize,
          pageNo:'',
          roleName:'',
        },
        isDisabled:false,

      }
    },

    created(){
//      this.$store.dispatch('showListCount', false);
//      this.$store.dispatch('showSearchView', true);
      this.role_manage_list();
    },

    methods: {
      pageIndexNo:function(){
        return (this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.$enumerationType.pageSize+1;
      },
      role_manage_list: function (search_role_name) {
        this.waitParams.roleName = search_role_name;
        this.waitParams.pageNo = this.pageIndexNo();
        var that = this;
        console.log("this.waitParams.pageNo-->" + this.waitParams.pageNo);
        this.$api.get(this, this.$requestApi.roleManage, this.waitParams, function (data) {
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
				this.role_manage_list();
      },
//      搜索角色
      searchRole:function (search_role_name) {
        this.$store.dispatch('setCurrentPageNo',1);
        this.role_manage_list(search_role_name);
      },
      // 点击新增角色
      addRoleClick: function (){
        this.add_role_name = '';
      },
//      保存新增的角色
      saveAddRole: function (add_role_name) {
        if(add_role_name == ''){
          console.log("没填写角色名");
          swal({title: "未填写角色名", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }else {
          var that=this;
          this.$api.post(this,this.$requestApi.addNewRole, {"roleName":add_role_name,"roleType":"2"},function  (data) {
            if(data.body.code == '00'){
              that.role_manage_list();
              swal({title: data.body.msg, text: "", type: "success", timer: 1000, showConfirmButton: false});
              $("#addnew_role").modal('hide');
            }else{
              swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
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
          swal({title: "未填写角色名", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }else if (edit_role_name == this.data_items[this.click_index].roleName){
          swal({title: "并未修改角色名", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }else {
          var that=this;
          this.$api.post(this,this.$requestApi.updateRole, {"roleName":edit_role_name,"roleId":this.edit_role_id},function  (data) {
            if(data.body.code == '00'){
              that.role_manage_list();
              swal({title: data.body.msg, text: "", type: "success", timer: 1000, showConfirmButton: false});
              $("#edit_role").modal('hide');
            }else{
              swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
            }
          });
        }
      },
      // 点击权限设置按钮
      powerClick: function (data_item,index) {
        // 重置源数据
        for (var i in this.datas){
          this.datas[i].checkboxDiv = false;
          for (var j in this.datas[i].content){
            this.datas[i].content[j].checkboxDiv = false;
          }
        }
        this.edit_role_name = data_item.roleName;
        this.edit_role_id = data_item.roleId;
        this.click_index = index;
        var that = this;
        this.$api.get(this, this.$requestApi.queryRolePower, {"roleId":this.edit_role_id}, function (data) {
          if (data.body.code == '00') {
            var powerData = data.body.data;
            for (var i in powerData){
              for (var j in that.datas){
                if (powerData[i].privId == that.datas[j].privId){
                  that.datas[j].checkboxDiv = true;
                }
                if (powerData[i].childPrivs){
                  for (var k in powerData[i].childPrivs){
                    for (var a in that.datas[j].content){
                      if (powerData[i].childPrivs[k].privId == that.datas[j].content[a].privId){
                        that.datas[j].content[a].checkboxDiv = true;
                      }
                    }
                  }
                }
              }
            }
          }else {
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        });
        if(data_item.hospitalId==0 && data_item.roleType==1){
          this.isDisabled = true;
        }else {
          this.isDisabled = false;
        }
      },

      

      registerClick:function (index) {
        let contents= this.datas[index].content;
        this.datas[index].checkboxDiv=! this.datas[index].checkboxDiv;
    
        for(let j in contents){
          contents[j].checkboxDiv=this.datas[index].checkboxDiv;
        }
        this.datas[index].content=contents;
},
      registerClick1:function (index ,i) {
       this.datas[index].content[i].checkboxDiv=! this.datas[index].content[i].checkboxDiv;
       let contents= this.datas[index].content;
       let flag=0;
       console.log(JSON.stringify(contents));
       for(let j in contents){
        if(!contents[j].checkboxDiv){
          flag++;
        }
       }

      this.datas[index].checkboxDiv=(flag<=contents.length-1);
      
    },
    // 保存角色权限
    saveRolePower: function() {
      // console.log("---->" + this.datas);
      var power = '';
      for(var i in this.datas){
        console.log(this.datas[i].title + "--->" + this.datas[i].checkboxDiv + "----->" + this.datas[i].privId);
        if (this.datas[i].checkboxDiv) {
          power += this.datas[i].privId;
          power += ',';
        }
        for (var j in this.datas[i].content){
          console.log(this.datas[i].content[j].title + "--->" + this.datas[i].content[j].checkboxDiv + "----->" + this.datas[i].content[j].privId)
          if (this.datas[i].content[j].checkboxDiv) {
            power += this.datas[i].content[j].privId;
            power += ',';
          }
        }
      }
      if (power.length){
        power=power.substring(0,power.length-1);
      }
      console.log("power-->" + power);
      var that=this;
      this.$api.post(this,this.$requestApi.saveRolePower, {"privIds":power,"roleId":this.edit_role_id} ,function (data) {
        if(data.body.code == '00'){
          swal({title: "保存成功!", text: "", type: "success", timer: 1000, showConfirmButton: false});
          $("#powerSet").modal('hide');
        }else {
          swal({title: "保存失败!", text: "", type: "error", timer: 1000, showConfirmButton: false});
        };
      });
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
