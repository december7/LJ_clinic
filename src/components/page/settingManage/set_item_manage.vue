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
          <input placeholder="请输入治疗名称" type="text" style="outline: none;width:200px;border: none;" v-model="search_cure_item">
          <a @click="searchItem(search_cure_item)"><img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png"></a>
        </div>
        <!--模态弹窗开始--新增治疗项目-->
        <div class="modal inmodal fade" id="addnew_cure" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg" style="width: 630px;">
            <div class="modal-content">
              <div class="tc-title-div">新增治疗项目</div>
              <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                aria-hidden="true">&times;</span></button>
              <div class="hr-tcline"></div>
              <!--弹窗详细内容-->
              <div class='form-labeldiv'>治疗名称</div>
              <input style='width: 210px' class='form-tcinput' placeholder='请输入治疗名称' v-model="cure_project_json.projectName">
              <div class='form-labeldiv'>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位</div>
              <select class='form-tcinput' id="addnew_cure_sId">
                <option v-for="(unit,index) in unit_list" :index="index">{{unit.codeValue}}</option>
              </select>
              <div class='form-labeldiv'>成&nbsp;本&nbsp;价</div>
              <input style='width: 210px' class='form-tcinput' type="number" placeholder='请输入成本价(元)' v-model="cure_project_json.costPrice">
              <div class='form-labeldiv'>零&nbsp;售&nbsp;价</div>
              <input style='width: 210px' class='form-tcinput' type="number" placeholder='请输入零售价(元)' v-model="cure_project_json.retailPrice">
              <div class='form-labeldiv'>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</div>
              <input style='width: 512px' class='form-tcinput' placeholder='添加备注' v-model="cure_project_json.projectDesc">
              <button @click="saveCureProject(cure_project_json)" style='margin: 30px 10px 30px 210px;' class='form-btn-black' data-dismiss="modal">确定</button>
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
            <th class="text-center">状态</th>
            <th class="text-center l_r_border"></th>
            <th class="text-center r_border">操作</th>
            <th class="text-center"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(data_item,index) in cure_data_items">
            <td class="text-center">{{index+1}}</td>
            <td class="text-center l_r_border">{{data_item.projectName}}</td>
            <td class="text-center">{{unit_array[data_item.projectUnit-1]}}</td>
            <td class="text-center l_r_border">{{data_item.costPrice/100}}</td>
            <td class="text-center">{{data_item.retailPrice/100}}</td>
            <td class="text-center l_r_border">{{data_item.projectDesc}}</td>
            <td class="text-center">{{data_item.state == 1 ? '正常' : '停用'}}</td>
            <td class="text-center l_r_border"><a @click="editProject(data_item,index)" href="javascript:;" data-toggle="modal" data-target="#edit_cure">编辑</a></td>
            <td class="text-center r_border"><a @click="stopItem(cure_data_items,data_item,index)" href="javascript:;" data-toggle="modal" data-target="#change_cure_state">{{data_item.state == 1 ? '停用' :
              '启用'}}</a></td>
            <td class="text-center"><a @click="delete_list(cure_data_items,index)" class="un_skip_link">删除</a></td>
          </tr>
          </tbody>
        </table>
        <!--模态弹窗开始--编辑治疗项目-->
        <div class="modal inmodal fade" id="edit_cure" tabindex="-1" role="dialog" aria-hidden="true">
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
              <div class='form-labeldiv' style="width: 210px;padding-left: 10px">{{unit_array[item_line.projectUnit-1]}}</div>
              <div class='form-labeldiv'>成&nbsp;本&nbsp;价</div>
              <input style='width: 210px' class='form-tcinput' type="number" placeholder='请输入成本价(元)' v-model="costPrice">
              <div class='form-labeldiv'>零&nbsp;售&nbsp;价</div>
              <input style='width: 210px' class='form-tcinput' type="number" placeholder='请输入零售价(元)' v-model="retailPrice">
              <div class='form-labeldiv'>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</div>
              <input style='width: 512px' class='form-tcinput' placeholder='添加备注' v-model="projectDesc">
              <button @click="saveEditItem(cure_data_items)" style='margin: 30px 10px 30px 210px;' class='form-btn-black' data-dismiss="modal">确定</button>
              <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!--内容部分-其他收费管理-->
    <div v-show="indexChoose == 1" class="case_container">
      <div class="ibox-content padding-lr-10 gray-bg">
        <!--按钮-->
        <div style="display: inline-block;margin-top: 10px">
          <a @click="addNewFunc" type="button" class="addnewBtn" data-toggle="modal" data-target="#addnew_others"><img style="width:15px;height: 15px " src="../../../../static/img/set_manage_img/add.png">&nbsp;新增</a>
        </div>
        <div class="pull-right search_input" style="margin-top: 5px;margin-right: 0">
          <input placeholder="请输入收费名称" type="text" style="outline: none;width:200px;border: none;" v-model="search_others_item">
          <a @click="searchItem(search_others_item)"><img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png"></a>
        </div>
        <!--模态弹窗开始--新增其他收费管理-->
        <div class="modal inmodal fade" id="addnew_others" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg" style="width: 630px;">
            <div class="modal-content">
              <div class="tc-title-div">新增其他收费</div>
              <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                aria-hidden="true">&times;</span></button>
              <div class="hr-tcline"></div>
              <!--弹窗详细内容-->
              <div class='form-labeldiv'>收费名称</div>
              <input style='width: 210px' class='form-tcinput' placeholder='请输入收费名称' v-model="others_project_json.projectName">
              <div class='form-labeldiv'>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位</div>
              <select class='form-tcinput' id="addnew_others_sId">
                <option v-for="(unit,index) in unit_list" :index="index">{{unit.codeValue}}</option>
              </select>
              <div class='form-labeldiv'>成&nbsp;本&nbsp;价</div>
              <input style='width: 210px' class='form-tcinput' type="number" placeholder='请输入成本价(元)' v-model="others_project_json.costPrice">
              <div class='form-labeldiv'>零&nbsp;售&nbsp;价</div>
              <input style='width: 210px' class='form-tcinput' type="number" placeholder='请输入零售价(元)' v-model="others_project_json.retailPrice">
              <div class='form-labeldiv'>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</div>
              <input style='width: 512px' class='form-tcinput' placeholder='添加备注' v-model="others_project_json.projectDesc">
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
            <th class="text-center">状态</th>
            <th class="text-center l_r_border"></th>
            <th class="text-center r_border">操作</th>
            <th class="text-center"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(data_item,index) in others_data_items">
            <td class="text-center">{{index+1}}</td>
            <td class="text-center l_r_border">{{data_item.projectName}}</td>
            <td class="text-center">{{unit_array[data_item.projectUnit-1]}}</td>
            <td class="text-center l_r_border">{{data_item.costPrice/100}}</td>
            <td class="text-center">{{data_item.retailPrice/100}}</td>
            <td class="text-center l_r_border">{{data_item.projectDesc}}</td>
            <td class="text-center">{{data_item.state == 1 ? '正常' : '停用'}}</td>
            <td class="text-center l_r_border"><a href="javascript:;" data-toggle="modal" data-target="#edit_others" @click="editProject(data_item,index)">编辑</a></td>
            <td class="text-center r_border"><a @click="stopItem(others_data_items,data_item,index)" href="javascript:;" data-toggle="modal" data-target="#change_others_state">{{data_item.state == 1 ? '停用' :
              '启用'}}</a></td>
            <td class="text-center"><a @click="delete_list(others_data_items,index)" class="un_skip_link">删除</a></td>
          </tr>
          </tbody>
        </table>
        <!--模态弹窗开始--编辑其他收费-->
        <div class="modal inmodal fade" id="edit_others" tabindex="-1" role="dialog" aria-hidden="true">
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
              <div class='form-labeldiv' style="width: 210px;padding-left: 10px">{{unit_array[item_line.projectUnit-1]}}</div>
              <div class='form-labeldiv'>成&nbsp;本&nbsp;价</div>
              <input style='width: 210px' class='form-tcinput' type="number" placeholder='请输入成本价(元)' v-model="costPrice">
              <div class='form-labeldiv'>零&nbsp;售&nbsp;价</div>
              <input style='width: 210px' class='form-tcinput' type="number" placeholder='请输入零售价(元)' v-model="retailPrice">
              <div class='form-labeldiv'>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</div>
              <input style='width: 512px' class='form-tcinput' placeholder='添加备注' v-model="projectDesc">
              <button @click="saveEditItem(others_data_items)" style='margin: 30px 10px 30px 210px;' class='form-btn-black' data-dismiss="modal">确定</button>
              <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

  import switch_tab from '../doctor_clinic/switch_tab_template.vue'

  export default{
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

        search_cure_item:'',
        search_others_item:'',

        unit_array: [
          "袋", "片", "支", "粒", "瓶", "mg", "g", "ml", "l", "ug", "IU", "U", "包", "盒", "枚", "丸", "喷", "颗", "滴", "cm", "少许", "适量", "对", "个", "条", "板", "件", "套", "卷", "副", "只", "根", "箱", "台", "贴", "万单位",
        ],

        cure_project_json:{
          projectName:'',
          projectUnit:'',
          costPrice:'',
          retailPrice:'', //零售价
          projectDesc:'',
        },
        others_project_json:{
          projectName:'',
          projectUnit:'',
          costPrice:'',
          retailPrice:'', //零售价
          projectDesc:'',
        },

        costPrice:'',
        retailPrice:'',
        projectDesc:'',
        select_edit_index:-100,

        item_line:{},

        tabindex:"1",
      }
    },

    computed: {
      indexChoose () {
        var that=this;
        that.tabindex = this.$store.getters.getCurrentIndex+1;
        console.log("tab页面------->" + that.tabindex);
        this.item_set('');
        return this.$store.getters.getCurrentIndex;
      }
    },

    created(){
      this.$store.dispatch('addSwitchTabs', this.titles);
      this.$store.dispatch('addSelectStates', this.selects);
      this.$store.dispatch('showRightSearch', false);
      this.$store.dispatch('showListCount', false);
    },

    methods: {
//      获得单位列表
      getUnitList:function () {
        var that = this;
        this.$api.get(this, this.$requestApi.enumerationList, {"codeType":"PROD_UNIT"}, function (data) {
          if (data.body.code==='00') {
            that.unit_list = data.body.data;
          } else {

          }
        });
      },
//      查询治疗列表和其他收费列表
      item_set: function (search_item) {
        var that = this;
        this.$api.get(this, this.$requestApi.itemManageList + this.tabindex, {"iDisplayLength":"20","iDisplayStart":"1","projectName":search_item}, function (data) {
          if (data.body.code==='00') {
            if (that.tabindex == '1') { //治疗项目
              that.cure_data_items = data.body.data;
            }else { //其他收费项目
              that.others_data_items = data.body.data;
            }
          } else {

          }
        });
      },
//      搜索项目
      searchItem: function (search_item) {
        this.item_set(search_item);
      },
//      新增项目的点击事件(清空输入的历史)
      addNewFunc:function () {
        var data = {
          projectName:'',
          projectUnit:'',
          costPrice:'',
          retailPrice:'', //零售价
          projectDesc:'',
        };
        this.cure_project_json = data;
        this.others_project_json = data;

        this.getUnitList();
      },
//      新增项目接口方法
      postNewProject:function (sId,project_json,project_items) {
        var objS = document.getElementById(sId);
        var codeKey = this.unit_list[objS.selectedIndex].codeKey;
        var codeValue = this.unit_list[objS.selectedIndex].codeValue;
        console.log("codeKey------>" + codeKey);
        console.log("单位------>" + this.unit_array[objS.selectedIndex]);
        var that=this;
        this.$api.post(this,this.$requestApi.addNewItem + this.tabindex, {"costPrice":parseInt(project_json.costPrice*100),"projectDesc":project_json.projectDesc,"projectName":project_json.projectName,"projectUnit":codeKey,"retailPrice":parseInt(project_json.retailPrice*100)},function (data) {
          if(data.body.code==='00'){
            console.log("添加成功");
            that.item_set('');
          }else{

          }
        });
      },
//      保存新增项目--治疗
      saveCureProject:function (cure_project_json) {
        this.postNewProject("addnew_cure_sId",cure_project_json,this.cure_data_items);
      },
//      保存新增项目--其他收费
      saveOthersProject:function (others_project_json) {
        this.postNewProject("addnew_others_sId",others_project_json,this.others_data_items);
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
        var that=this;
        this.$api.post(this,this.$requestApi.editItem + data_items[this.select_edit_index].projectId, {"costPrice":parseInt(this.costPrice*100),"projectDesc":this.projectDesc,"retailPrice":parseInt(this.retailPrice*100)},function (data) {
          if(data.body.code==='00'){
            console.log("修改成功");
            that.item_set('');
          }else{

          }
        });
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
          }else{

          }
        });
      },
//      启用项目接口方法
      postStartProject:function (data_items,index) {
        this.$api.post(this,this.$requestApi.startItem + data_items[index].projectId,"", function (data) {
          if(data.body.code==='00'){
            console.log("启用成功");
            data_items[index].state = 1;
          }else{

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
//      删除列表行
      delete_list:function (data_items,currentIndex) {
        this.$api.post(this,this.$requestApi.deleteItem + data_items[currentIndex].projectId,"", function (data) {
          if(data.body.code==='00'){
            console.log("删除成功");
            data_items.splice(currentIndex, 1);
          }else{

          }
        });
      },

    },

    components: {switch_tab}
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
