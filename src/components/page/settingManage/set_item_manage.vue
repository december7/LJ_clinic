<template>
  <div>
    <!--顶部操作栏-->
    <switch_tab></switch_tab>

    <!--内容部分-治疗项目管理-->
    <div v-show="indexChoose == 0" class="case_container">
      <div class="ibox-content padding-lr-10 gray-bg">
        <!--按钮-->
        <div style="display: inline-block;margin-top: 10px">
          <a @click="addNewFunc" type="button" class="addnewBtn" data-toggle="modal" data-target="#addnew_cure"><img style="width:15px;height: 15px " src="../../../../static/img/set_manage_img/add.png">&nbsp;新增</a>
        </div>
        <div class="pull-right search_input" style="margin-top: 5px;margin-right: 0">
          <input @keyup.enter="searchItem(cure_search_item)" placeholder="请输入治疗名称" type="text" style="outline: none;width:200px;border: none;" v-model="cure_search_item">
          <a @click="searchItem(cure_search_item)"><img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png"></a>
        </div>
        <!--模态弹窗开始--新增治疗项目-->
        <div class="modal inmodal fade" id="addnew_cure" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
          <div class="modal-dialog modal-lg" style="width: 630px;">
            <div class="modal-content">
              <div class="tc-title-div">新增治疗项目</div>
              <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                aria-hidden="true">&times;</span></button>
              <div class="hr-tcline"></div>
              <!--弹窗详细内容-->
              <div class='form-labeldiv'>治疗名称<span style="color: red;">*</span></div>
              <input maxlength="20" style='width: 210px' class='form-tcinput' placeholder='请输入治疗名称' v-model="cure_project_json.projectName">
              <div class='form-labeldiv'>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位<span style="color: red;">*</span></div>
              <input @click="clickUnitList" readonly v-model="unitCV" placeholder="请选择单位" data-toggle="dropdown" style="border-radius: 3px" class="form-tcinput" type="text">
              <ul class="attopic dropdown-menu" style="width: 210px;top:90px;left:391px;">
                <li @mousedown="selectUnit(unit,index)" v-for="(unit, index) in unit_list">
                  <a class="no-padding" style="text-align: center">{{unit.codeValue}}</a>
                </li>
              </ul>
              <img @click="clickUnitList" data-toggle="dropdown" style="position: absolute;width: 10px;height: 10px;margin-top:25px;right:35px" src="../../../../static/img/LoginAndRegister/register_arrow_gray.png">
              <div class='form-labeldiv'>成&nbsp;本&nbsp;价<span style="color: red;">*</span></div>
              <number decimals="2" maxlength='7' @focus="getFocus(cure_project_json.costPrice)" @blur="loseFocus(cure_project_json.costPrice)" style='width: 210px' class='form-tcinput' placeholder='请输入成本价(元)' v-model="cure_project_json.costPrice"></number>
              <div class='form-labeldiv'>零&nbsp;售&nbsp;价<span style="color: red;">*</span></div>
              <number decimals="2" maxlength='7' @focus="getFocus(cure_project_json.retailPrice)" @blur="loseFocus(cure_project_json.retailPrice)" style='width: 210px' class='form-tcinput' placeholder='请输入零售价(元)' v-model="cure_project_json.retailPrice"></number>
              <div class='form-labeldiv'>说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</div>
              <input maxlength="140" style='width: 512px' class='form-tcinput' placeholder='添加说明' v-model="cure_project_json.projectDesc">
              <button @click="saveCureProject(cure_project_json)" style='margin: 30px 10px 30px 210px;' class='form-btn-black'>确定</button>
              <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
        <!--治疗项目表格-->
        <table class="table border-top-2 table-margintop white-bg">
          <thead>
          <tr>
            <th class="text-center">序号</th>
            <th class="text-center l_r_border">治疗名称</th>
            <th class="text-center">单位</th>
            <th class="text-center l_r_border">成本价</th>
            <th class="text-center">零售价</th>
            <th class="text-center l_r_border">备注</th>
            <th class="text-center" style="width:50px">状态</th>
            <th class="text-center l_r_border" style="width:50px"></th>
            <th class="text-center r_border" style="width:50px">操作</th>
            <th class="text-center" style="width:50px"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(data_item,index) in cure_data_items">
            <td class="text-center">{{waitParams.iDisplayStart+index}}</td>
            <td class="text-center l_r_border">{{data_item.projectName}}</td>
            <td class="text-center">{{unit_array[data_item.projectUnit]}}</td>
            <td class="text-center l_r_border">{{data_item.costPrice/100}}</td>
            <td class="text-center">{{data_item.retailPrice/100}}</td>
            <td class="text-center l_r_border">{{data_item.projectDesc}}</td>
            <td class="text-center">{{data_item.state == 1 ? '正常' : '停用'}}</td>
            <td class="text-center l_r_border"><a @click="editProject(data_item,index)" href="###" data-toggle="modal" data-target="#edit_cure">编辑</a></td>
            <td class="text-center r_border"><a @click="stopItem(cure_data_items,data_item,index)" href="###" data-toggle="modal" data-target="#change_cure_state">{{data_item.state == 1 ? '停用' :
              '启用'}}</a></td>
            <td class="text-center"><a @click="delete_list(data_item)" data-toggle="modal" data-target="#selfinfo" class="un_skip_link">删除</a></td>
          </tr>
          </tbody>
        </table>
        <!--模态弹窗开始--编辑治疗项目-->
        <div class="modal inmodal fade" id="edit_cure" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
          <div class="modal-dialog modal-lg" style="width: 630px;">
            <div class="modal-content">
              <div class="tc-title-div">编辑治疗项目</div>
              <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                aria-hidden="true">&times;</span></button>
              <div class="hr-tcline"></div>
              <!--弹窗详细内容-->
              <div class='form-labeldiv'>治疗名称</div>
              <div class='form-labeldiv' style="width: 210px;padding-left: 10px">{{item_line.projectName}}</div>
              <div class='form-labeldiv'>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位</div>
              <div class='form-labeldiv' style="width: 210px;padding-left: 10px">{{unit_array[item_line.projectUnit]}}</div>
              <div class='form-labeldiv'>成&nbsp;本&nbsp;价<span style="color: red;">*</span></div>
              <number decimals="2" maxlength='7' @focus="getFocus(costPrice)" @blur="loseFocus(costPrice)" style='width: 210px' class='form-tcinput' placeholder='请输入成本价(元)' v-model="costPrice"></number>
              <div class='form-labeldiv'>零&nbsp;售&nbsp;价<span style="color: red;">*</span></div>
              <number decimals="2" maxlength='7' @focus="getFocus(retailPrice)" @blur="loseFocus(retailPrice)" style='width: 210px' class='form-tcinput' placeholder='请输入零售价(元)' v-model="retailPrice"></number>
              <div class='form-labeldiv'>说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</div>
              <input maxlength="140" style='width: 512px' class='form-tcinput' placeholder='添加说明' v-model="projectDesc">
              <button @click="saveEditItem(cure_data_items)" style='margin: 30px 10px 30px 210px;' class='form-btn-black'>确定</button>
              <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
      </div>
      <pagination v-show="cure_data_items.length > 0" :iDisplayLength="cure_data_items.length"></pagination>
    </div>

    <!--内容部分-其他收费管理-->
    <div v-show="indexChoose == 1" class="case_container">
      <div class="ibox-content padding-lr-10 gray-bg">
        <!--按钮-->
        <div style="display: inline-block;margin-top: 10px">
          <a @click="addNewFunc" type="button" class="addnewBtn" data-toggle="modal" data-target="#addnew_others"><img style="width:15px;height: 15px " src="../../../../static/img/set_manage_img/add.png">&nbsp;新增</a>
        </div>
        <div class="pull-right search_input" style="margin-top: 5px;margin-right: 0">
          <input @keyup.enter="searchItem(others_search_item)" placeholder="请输入收费名称" type="text" style="outline: none;width:200px;border: none;" v-model="others_search_item">
          <a @click="searchItem(others_search_item)"><img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png"></a>
        </div>
        <!--模态弹窗开始--新增其他收费管理-->
        <div class="modal inmodal fade" id="addnew_others" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
          <div class="modal-dialog modal-lg" style="width: 630px;">
            <div class="modal-content">
              <div class="tc-title-div">新增其他收费</div>
              <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                aria-hidden="true">&times;</span></button>
              <div class="hr-tcline"></div>
              <!--弹窗详细内容-->
              <div class='form-labeldiv'>收费名称<span style="color: red;">*</span></div>
              <input maxlength="20" style='width: 210px' class='form-tcinput' placeholder='请输入收费名称' v-model="others_project_json.projectName">
              <div class='form-labeldiv'>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位<span style="color: red;">*</span></div>
              <input @click="clickUnitList" readonly v-model="unitCV" placeholder="请选择单位" data-toggle="dropdown" style="border-radius: 3px" class="form-tcinput" type="text">
              <ul class="attopic dropdown-menu" style="width: 210px;top:90px;left:391px;">
                <li @mousedown="selectUnit(unit,index)" v-for="(unit, index) in unit_list">
                  <a class="no-padding" style="text-align: center">{{unit.codeValue}}</a>
                </li>
              </ul>
              <img @click="clickUnitList" data-toggle="dropdown" style="position: absolute;width: 10px;height: 10px;margin-top:25px;right:35px" src="../../../../static/img/LoginAndRegister/register_arrow_gray.png">
              <div class='form-labeldiv'>成&nbsp;本&nbsp;价<span style="color: red;">*</span></div>
              <number decimals="2" @focus="getFocus(others_project_json.costPrice)" @blur="loseFocus(others_project_json.costPrice)" style='width: 210px' class='form-tcinput' placeholder='请输入成本价(元)' v-model="others_project_json.costPrice"></number>
              <div class='form-labeldiv'>零&nbsp;售&nbsp;价<span style="color: red;">*</span></div>
              <number decimals="2" @focus="getFocus(others_project_json.retailPrice)" @blur="loseFocus(others_project_json.retailPrice)" style='width: 210px' class='form-tcinput' placeholder='请输入零售价(元)' v-model="others_project_json.retailPrice"></number>
              <div class='form-labeldiv'>说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</div>
              <input maxlength="140" style='width: 512px' class='form-tcinput' placeholder='添加说明' v-model="others_project_json.projectDesc">
              <button @click="saveOthersProject(others_project_json)" style='margin: 30px 10px 30px 210px;' class='form-btn-black' data-dismiss="modal">确定</button>
              <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
        <!--其他收费表格-->
        <table class="table border-top-2 table-margintop white-bg">
          <thead>
          <tr>
            <th class="text-center">序号</th>
            <th class="text-center l_r_border">收费名称</th>
            <th class="text-center">单位</th>
            <th class="text-center l_r_border">成本价</th>
            <th class="text-center">零售价</th>
            <th class="text-center l_r_border">备注</th>
            <th class="text-center" style="width:50px">状态</th>
            <th class="text-center l_r_border" style="width:50px"></th>
            <th class="text-center r_border" style="width:50px">操作</th>
            <th class="text-center" style="width:50px"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(data_item,index) in others_data_items">
            <td class="text-center">{{waitParams.iDisplayStart+index}}</td>
            <td class="text-center l_r_border">{{data_item.projectName}}</td>
            <td class="text-center">{{unit_array[data_item.projectUnit]}}</td>
            <td class="text-center l_r_border">{{data_item.costPrice/100}}</td>
            <td class="text-center">{{data_item.retailPrice/100}}</td>
            <td class="text-center l_r_border">{{data_item.projectDesc}}</td>
            <td class="text-center">{{data_item.state == 1 ? '正常' : '停用'}}</td>
            <td class="text-center l_r_border"><a href="javascript:;" data-toggle="modal" data-target="#edit_others" @click="editProject(data_item,index)">编辑</a></td>
            <td class="text-center r_border"><a @click="stopItem(others_data_items,data_item,index)" href="javascript:;" data-toggle="modal" data-target="#change_others_state">{{data_item.state == 1 ? '停用' :
              '启用'}}</a></td>
            <td class="text-center"><a @click="delete_list(data_item)" data-toggle="modal" data-target="#selfinfo" class="un_skip_link">删除</a></td>
          </tr>
          </tbody>
        </table>
        <!--模态弹窗开始--编辑其他收费-->
        <div class="modal inmodal fade" id="edit_others" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
          <div class="modal-dialog modal-lg" style="width: 630px;">
            <div class="modal-content">
              <div class="tc-title-div">编辑其他收费</div>
              <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                aria-hidden="true">&times;</span></button>
              <div class="hr-tcline"></div>
              <!--弹窗详细内容-->
              <div class='form-labeldiv'>收费名称</div>
              <div class='form-labeldiv' style="width: 210px;padding-left: 10px">{{item_line.projectName}}</div>
              <div class='form-labeldiv'>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位</div>
              <div class='form-labeldiv' style="width: 210px;padding-left: 10px">{{unit_array[item_line.projectUnit]}}</div>
              <div class='form-labeldiv'>成&nbsp;本&nbsp;价<span style="color: red;">*</span></div>
              <number decimals="2" @focus="getFocus(costPrice)" @blur="loseFocus(costPrice)" style='width: 210px' class='form-tcinput' placeholder='请输入成本价(元)' v-model="costPrice"></number>
              <div class='form-labeldiv'>零&nbsp;售&nbsp;价<span style="color: red;">*</span></div>
              <number decimals="2" @focus="getFocus(retailPrice)" @blur="loseFocus(retailPrice)" style='width: 210px' class='form-tcinput' placeholder='请输入零售价(元)' v-model="retailPrice"></number>
              <div class='form-labeldiv'>说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明</div>
              <input maxlength="140" style='width: 512px' class='form-tcinput' placeholder='添加说明' v-model="projectDesc">
              <button @click="saveEditItem(others_data_items)" style='margin: 30px 10px 30px 210px;' class='form-btn-black'>确定</button>
              <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>

      </div>
      <pagination v-show="others_data_items.length > 0" :iDisplayLength="others_data_items.length"></pagination>
    </div>
    <delete-toast :selectedIndex="selectedIndex" :selectedTitle="selectedTitle" :selectedContent="selectedContent"></delete-toast>
  </div>
</template>

<script>
import switch_tab from '../settingManage/setting_switch_tab.vue'
import pagination from '../doctor_clinic/bottom_pagination.vue';
import deleteToast from "../medicine/deleteAlert/deleteToast.vue";
import number from '../../commonView/number.vue';

  export default{
    components: {
      switch_tab,pagination,deleteToast,number
    },

    data() {
      return {
        titles: [
          {titleName: '治疗项目管理', selected: true},
          {titleName: '其他收费管理', selected: false},
        ],
        selects: [
          {selectName: ''},
        ],

        cure_data_items: [],
        others_data_items: [],
        unit_list: [], //单位列表
        unitCV:'',

        cure_search_item:'',
        others_search_item:'',

        unit_array: [
          "","袋", "片", "支", "粒", "瓶", "mg", "g", "ml", "l", "ug", "IU", "U", "包", "盒", "枚", "丸", "喷", "颗", "滴", "cm", "少许", "适量", "对", "个", "条", "板", "件", "套", "卷", "副", "只", "根", "箱", "台", "贴", "万单位",
        ],

        cure_project_json:{
          projectName:'',
          projectUnit:'',
          costPrice:'',
          retailPrice:'', //零售价
          projectDesc:'',
          unitCodeKey:'',
        },
        others_project_json:{
          projectName:'',
          projectUnit:'',
          costPrice:'',
          retailPrice:'', //零售价
          projectDesc:'',
          unitCodeKey:'',
        },

        costPrice:'',
        retailPrice:'',
        projectDesc:'',
        select_edit_index:-100,

        item_line:{},

        tabindex:"1",
        waitParams:{
          iDisplayLength:this.$enumerationType.pageSize,
          iDisplayStart:'',
          projectName:'',
        },
        cure_search_memory:"",
        other_search_memory:"",
        selectedIndex: 0,
				selectedTitle: '项目设置',
				selectedContent: '确定要删除吗？',
        deleteDataItem:'',
      }
    },

    computed: {
      indexChoose () {
        return this.$store.getters.getCurrentIndex;
      }
    },

    created(){
      this.$store.dispatch('addSwitchTabs', this.titles);
      this.$store.dispatch('addSelectStates', this.selects);
      this.$store.dispatch('showRightSearch', false);
      this.$store.dispatch('showListCount', false);
      this.item_set_list();
    },

    methods: {
//      获得单位列表
      clickUnitList:function () {
        var that = this;
        this.$api.get(this, this.$requestApi.staticData, {"codeType":"PROD_UNIT"}, function (data) {
          if (data.body.code == '00') {
            that.unit_list = data.body.data;
          } else {
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        });
      },
      selectUnit: function(unit,index){
        this.cure_project_json.unitCodeKey = unit.codeKey;
        this.unitCV = unit.codeValue;
      },
      pageIndexNo:function(){
        return (this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.$enumerationType.pageSize+1;
      },

//      查询治疗列表和其他收费列表
      item_set_list: function (search_item) {
        console.log("search_item-->" + search_item);
        this.waitParams.iDisplayStart = this.pageIndexNo();
        this.waitParams.projectName = search_item;
        var that = this;
        console.error("this.tabindex"+this.tabindex)
        this.$api.get(this, this.$requestApi.itemManageList + this.tabindex, this.waitParams, function (data) {
          if (data.body.code == '00') {
            if (that.tabindex == '1') { //治疗项目
              that.cure_data_items = data.body.data;
              that.$store.dispatch('setPageCount',that.$enumerationType.getPageNumber(data.body.iTotalRecords));
            }else { //其他收费项目
              that.others_data_items = data.body.data;
              that.$store.dispatch('setPageCount',that.$enumerationType.getPageNumber(data.body.iTotalRecords));
            }
          }else{
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        });
      },
      // 分页点击调用
      request_list:function (index) {
        console.log("------------------>?>?>?>?>");
        this.item_set_list('');
      },
      // 分页点击调用
      request:function (index) {
        console.log("~~~~~~~~~~~>>");
        this.$store.dispatch('setCurrentPageNo',1);
        this.tabindex = ++index;
        let searchKey = "";
        if(this.tabindex == 1){
          searchKey = this.cure_search_memory;
        }else{
          searchKey = this.other_search_memory;
        }
        this.item_set_list(searchKey);
      },
//      搜索项目
      searchItem: function (search_item) {
        if(this.tabindex==1){
          this.cure_search_memory = search_item;
        }else{
          this.other_search_memory = search_item;
        }
        this.item_set_list(search_item);
      },
//      新增项目的点击事件(清空输入的历史)
      addNewFunc:function () {
        var data = {
          projectName:'',
          projectUnit:'',
          costPrice:'',
          retailPrice:'', //零售价
          projectDesc:'',
          unitCodeKey:'',
        };
        this.cure_project_json = data;
        this.others_project_json = data;
        this.unitCV = '';
      },
//      新增项目接口方法
      postNewProject:function (project_json) {
        if(project_json.projectName && project_json.unitCodeKey && project_json.costPrice && project_json.retailPrice){
          var regu = "^[0-9]+(.[0-9]{1,2})?$";
          var re = new RegExp(regu);
          if(!re.test(project_json.costPrice||!project_json.costPrice)){//成本价
            swal({title: "成本价填写错误", text: "", type: "error", timer: 1000, showConfirmButton: false});
          }else if (!re.test(project_json.retailPrice||!project_json.retailPrice)){
            swal({title: "零售价填写错误", text: "", type: "error", timer: 1000, showConfirmButton: false});
          }else {
            var that=this;
            this.$api.post(this,this.$requestApi.addNewItem + this.tabindex, {"costPrice":parseInt(project_json.costPrice*100),"projectDesc":project_json.projectDesc,"projectName":project_json.projectName,"projectUnit":project_json.unitCodeKey,"retailPrice":parseInt(project_json.retailPrice*100)},function (data) {
              if(data.body.code==='00'){
                console.log("添加成功");
                that.item_set_list('');
                swal({title: "添加成功", text: "", type: "success", timer: 1000, showConfirmButton: false});
                if(that.tabindex==1) $("#addnew_cure").modal('hide');
                else $("#addnew_others").modal('hide');
              }else{
                swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
              }
            });
          }
        }else {
          if(!project_json.projectName) swal({title: "名称未填写", text: "", type: "error", timer: 1000, showConfirmButton: false});
          else if(!project_json.unitCodeKey) swal({title: "单位未选择", text: "", type: "error", timer: 1000, showConfirmButton: false});
          else if(!project_json.costPrice) swal({title: "成本价未填写", text: "", type: "error", timer: 1000, showConfirmButton: false});
          else if(!project_json.retailPrice) swal({title: "零售价未填写", text: "", type: "error", timer: 1000, showConfirmButton: false});
          else swal({title: "内容未填写完整", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }
      },
//      保存新增项目--治疗
      saveCureProject:function (cure_project_json) {
        this.postNewProject(cure_project_json);
      },
//      保存新增项目--其他收费
      saveOthersProject:function (others_project_json) {
        this.postNewProject(others_project_json);
      },
//      编辑单行
      editProject:function (data_item,index) {
        this.item_line = data_item;
        this.costPrice = data_item.costPrice/100;
        this.retailPrice = data_item.retailPrice/100;
        this.projectDesc = data_item.projectDesc;
        this.select_edit_index = index;
      },
//      编辑项目接口方法
      postEditProject:function (data_items) {
        if(this.costPrice && this.retailPrice){
          var regu = "^[0-9]+(.[0-9]{1,2})?$";
          var re = new RegExp(regu);
          if(!re.test(this.costPrice||!this.costPrice)){//成本价
            swal({title: "成本价填写错误", text: "", type: "error", timer: 1000, showConfirmButton: false});
          }else if (!re.test(this.retailPrice||!this.retailPrice)){
            swal({title: "零售价填写错误", text: "", type: "error", timer: 1000, showConfirmButton: false});
          }else {
            var that=this;
            this.$api.post(this,this.$requestApi.editItem + data_items[this.select_edit_index].projectId, {"costPrice":parseInt(this.costPrice*100),"projectDesc":this.projectDesc,"retailPrice":parseInt(this.retailPrice*100)},function (data) {
              if(data.body.code==='00'){
                console.log("修改成功");
                that.item_set_list('');
                swal({title: data.body.msg, text: "", type: "success", timer: 1000, showConfirmButton: false});
                if(that.tabindex==1) $("#edit_cure").modal('hide');
                else $("#edit_others").modal('hide');
              }else{
                swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
              }
            });
          }
        }else {
          swal({title: "内容未填写完整", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }
      },
//      保存编辑治疗或其他收费项目
      saveEditItem:function (data_items) {
        this.postEditProject(data_items);
      },
//      停用项目接口方法
      postStopProject:function (data_items,index) {
        this.$api.post(this,this.$requestApi.stopItem + data_items[index].projectId,"", function (data) {
          if(data.body.code==='00'){
            console.log("停用成功");
            data_items[index].state = 0;
            swal({title: data.body.msg, text: "", type: "success", timer: 1000, showConfirmButton: false});
          }else{
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        });
      },
//      启用项目接口方法
      postStartProject:function (data_items,index) {
        this.$api.post(this,this.$requestApi.startItem + data_items[index].projectId,"", function (data) {
          if(data.body.code==='00'){
            console.log("启用成功");
            data_items[index].state = 1;
            swal({title: data.body.msg, text: "", type: "success", timer: 1000, showConfirmButton: false});
          }else{
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        });
      },
//      停用或启用治疗项目
      stopItem:function (data_items,data_item,index) {
        if(data_item.state=='1') {//当前状态为启用状态
          this.postStopProject(data_items,index);
        }else {
          this.postStartProject(data_items,index);
        }
      },
      selectItem:function (selectedIndex) {
				this.selectedIndex = selectedIndex;
			},
//      删除列表行
      delete_list:function (data_item) {
        this.deleteDataItem = data_item;
      },
      procurementDelete: function(){
        var that = this;
        this.$api.post(this,this.$requestApi.deleteItem + this.deleteDataItem.projectId,"", function (data) {
          if(data.body.code==='00'){
            console.log("删除成功");
            // data_items.splice(currentIndex, 1);
            that.$store.dispatch('setCurrentPageNo',1);
            that.item_set_list('');
            swal({title: data.body.msg, text: "", type: "success", timer: 1000, showConfirmButton: false});
          }else{
            swal({title: data.body.msg, text: "", type: "error", timer: 1000, showConfirmButton: false});
          }
        });
      },
      getFocus:function(price){
        console.log("getFocus~~~");
      },
      loseFocus:function(price){
        console.log("loseFocus~~~~");
        var regu = "^[0-9]+(.[0-9]{1,2})?$";
        var re = new RegExp(regu);
        console.log("--------->" + price + "-------->" + re.test(price));
        if(!re.test(price||!price)){
          swal({title: "价格填写错误", text: "", type: "error", timer: 1000, showConfirmButton: false});
        }
      },

    },

  }

</script>

<style>
  /*@import "../../style/xzy_css/xzycss.css";*/

  /*弹窗表单*/
  .form-labeldiv {
    padding: 20px 0 0 20px;
    display: inline-block;
    width: 85px;
  }

  /*分割线*/
  .hr-tcline {
    border: 0;
    border-bottom: 1px solid #e7eaec;
    /*border-style: solid !important;*/
  }

</style>
