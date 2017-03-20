<template>
  <div>
    <!--顶部操作栏-->
    <switch_tab></switch_tab>

    <!--内容部分-治疗-->
    <div v-show="indexChoose == 0" class="case_container">
      <div class="ibox-content padding-lr-10 gray-bg">
        <!--按钮-->
        <div style="display: inline-block;margin-top: 10px">
          <a @click="addNewFunc" type="button" class="addnewBtn" data-toggle="modal" data-target="#addnew_cure"><img style="width:15px;height: 15px " src="../../../../static/img/set_manage_img/add.png">&nbsp;新增</a>
        </div>
        <div class="pull-right search_input" style="margin-top: 5px;margin-right: 0">
          <input placeholder="请输入模板名称" type="text" style="outline: none;width:200px;border: none;">
          <img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png">
        </div>
        <!--模态弹窗开始--新增治疗项目-->
        <div class="modal inmodal fade" id="addnew_cure" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg" style="width: 830px;">
            <div class="modal-content">
              <div class="tc-title-div">新增治疗模板</div>
              <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                      aria-hidden="true">&times;</span></button>
              <div class="hr-tcline"></div>
              <!--弹窗详细内容-->
              <div class='form-labeldiv'>模板名称</div>
              <input style='width: 200px' class='form-tcinput' placeholder='模板名称' v-model="item_json.templateName">

              <!--治疗-->
              <div class="cure_container" style="width: 780px;margin: 10px 20px 0 20px;">
                <table class="table text-center no-margins" style="border: 1px solid #F4F4F4">
                  <thead>
                  <tr>
                    <th class="text-center r_border" style="border-bottom: none">序号</th>
                    <th class="text-center r_border" style="border-bottom: none">名称</th>
                    <th class="text-center r_border" style="border-bottom: none">单位</th>
                    <th class="text-center r_border" style="border-bottom: none">数量</th>
                    <th class="text-center r_border" style="border-bottom: none">备注说明</th>
                    <th class="text-center" style="border-bottom: none; border-right: 1px solid #F4F4F4">操作</th>
                  </tr>
                  </thead>
                  <tbody>

                  <tr v-for="(cure_item, index) in cure_items">
                    <td class="l_border cure_little_item" >{{index+1}}</td>
                    <td :class="{focus_border : cure_item.focus && currentFocusIndex == 0}" class="l_border no-padding" style="width: 160px">
                      <input @input="getDataList(0,cure_item.projectName)" @focus="getFocus(cure_item, 0)" @blur="loseFocus(cure_item)" class="form-control white-bg no-padding text-center no-borders" style="height: auto;" type="text" v-model="cure_item.projectName">
                      <div v-show="cure_item.focus && currentFocusIndex == 0" class="list_menu" style="margin-left: 70px;">
                        <ul class="no-margins">
                          <li @mousedown="selectedName(data, cure_item)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.projectName}}</a></li>
                        </ul>
                      </div>
                    </td>
                    <td class="l_border little_item">{{unit_array[cure_item.projectUnit-1]}}</td>
                    <td class="l_border cure_little_item"><input class="form-control white-bg no-padding text-center no-borders" style="height: auto; background-color: white" v-model="cure_item.projectNum" type="number"></td>
                    <td :class="cure_item.focus && currentFocusIndex == 1 ? 'focus_border' : 'l_r_border' "> <input @focus="getFocus(cure_item, 1)" @blur="loseFocus(cure_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="cure_item.projectTemplateRemark"></td>
                    <td class="l_r_border"><a @click="delete_cure_item(index)" class="un_skip_link">删除</a></td>
                  </tr>
                  <tr>
                    <td class="l_r_border"></td>
                    <td @click="tc_add_cure"><a class="un_skip_link">添加治疗</a>
                    <td class="l_r_border"></td>
                    <td></td>
                    <td class="l_r_border"></td>
                    <td class="r_border"></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!--确定取消按钮-->
              <button @click="saveCureItem(item_json,cure_items)" style='margin: 30px 10px 30px 310px;' class='form-btn-black' data-dismiss="modal">确定</button><button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>

            </div>
          </div>
        </div>
        <!--治疗表格-->
        <table class="table border-top-2 table-margintop white-bg">
          <thead>
          <tr>
            <th class="text-center width_50">序号</th>
            <th class="text-center l_r_border">模板名称</th>
            <th class="text-center width_300">模板项目</th>
            <th class="text-center l_r_border">状态</th>
            <th class="text-center"></th>
            <th class="text-center l_r_border">操作</th>
            <th class="text-center"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(data_item,index) in cure_data_items">
            <td class="text-center">{{index+1}}</td>
            <td class="text-center l_r_border">{{data_item.templateName}}</td>
            <td class="text-center" style="width: 200px">{{data_item.templateDesc}}</td>
            <td class="text-center l_r_border">{{data_item.state == 1 ? '正常' : '停用'}}</td>
            <td @click="editCureFunc(data_item,index)" class="text-center"><a href="javascript:;" data-toggle="modal" data-target="#editcure">编辑</a></td>
            <td class="text-center l_r_border"><a @click="stopTemplate(cure_data_items,data_item,index)" href="javascript:;" data-toggle="modal" data-target="#startstop">{{data_item.state == 1 ? '停用' : '启用'}}</a></td>
            <td class="text-center"><a @click="delete_list(cure_data_items,data_item,index)" class="un_skip_link">删除</a></td>
          </tr>
          </tbody>
        </table>
      </div>
      <pagination v-show="cure_data_items.length > 0"></pagination>
    </div>

    <!--模态弹窗开始--编辑治疗项目-->
    <div class="modal inmodal fade" id="editcure" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg" style="width: 830px;">
        <div class="modal-content">
          <div class="tc-title-div">编辑治疗模板</div>
          <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
            aria-hidden="true">&times;</span></button>
          <div class="hr-tcline"></div>
          <!--弹窗详细内容-->
          <div class='form-labeldiv'>模板名称</div>
          <input style='width: 200px' class='form-tcinput' placeholder='模板名称' v-model="template_name">

          <!--治疗-->
          <div class="cure_container" style="width: 780px;margin: 10px 20px 0 20px;">
            <table class="table text-center no-margins" style="border: 1px solid #F4F4F4">
              <thead>
              <tr>
                <th class="text-center r_border" style="border-bottom: none">序号</th>
                <th class="text-center r_border" style="border-bottom: none">名称</th>
                <th class="text-center r_border" style="border-bottom: none">单位</th>
                <th class="text-center r_border" style="border-bottom: none">数量</th>
                <th class="text-center r_border" style="border-bottom: none">备注说明</th>
                <th class="text-center" style="border-bottom: none; border-right: 1px solid #F4F4F4">操作</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="(cure_item, index) in cure_items">
                <td class="l_border cure_little_item" >{{index+1}}</td>
                <td :class="{focus_border : cure_item.focus && currentFocusIndex == 0}" class="l_border no-padding" style="width: 160px">
                  <input @input="getDataList(0,cure_item.projectName)" @focus="getFocus(cure_item, 0)" @blur="loseFocus(cure_item)" class="form-control white-bg no-padding text-center no-borders" style="height: auto;" type="text" v-model="cure_item.projectName">
                  <div v-show="cure_item.focus && currentFocusIndex == 0" class="list_menu" style="margin-left: 70px;">
                    <ul class="no-margins">
                      <li @mousedown="selectedName(data, cure_item)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.projectName}}</a></li>
                    </ul>
                  </div>
                </td>
                <td class="l_border little_item">{{unit_array[cure_item.projectUnit-1]}}</td>
                <td class="l_border cure_little_item"><input class="form-control white-bg no-padding text-center no-borders" style="height: auto; background-color: white" v-model="cure_item.projectNum" type="number"></td>
                <td :class="cure_item.focus && currentFocusIndex == 1 ? 'focus_border' : 'l_r_border' "> <input @focus="getFocus(cure_item, 1)" @blur="loseFocus(cure_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="cure_item.projectTemplateRemark"></td>
                <td class="l_r_border"><a @click="delete_cure_item(index)" class="un_skip_link">删除</a></td>
              </tr>
              <tr>
                <td class="l_r_border"></td>
                <td @click="tc_add_cure"><a class="un_skip_link">添加治疗</a>
                <td class="l_r_border"></td>
                <td></td>
                <td class="l_r_border"></td>
                <td class="r_border"></td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--确定取消按钮-->
          <button @click="saveEditCure(cure_items,cure_select_index)" style='margin: 30px 10px 30px 310px;' class='form-btn-black' data-dismiss="modal">确定</button><button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>




    <!--内容部分-西/成药处方模板-->
    <div v-show="indexChoose == 1" class="case_container">
      <div class="ibox-content padding-lr-10 gray-bg">
        <!--按钮-->
        <div style="display: inline-block;margin-top: 10px">
          <a @click="addNewFunc" type="button" class="addnewBtn" data-toggle="modal" data-target="#addnew_west"><img style="width:15px;height: 15px " src="../../../../static/img/set_manage_img/add.png">&nbsp;新增</a>
        </div>
        <div class="pull-right search_input" style="margin-top: 5px;margin-right: 0">
          <input placeholder="请输入模板名称" type="text" style="outline: none;width:200px;border: none;">
          <img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png">
        </div>
        <!--模态弹窗开始--新增西/成药模板-->
        <div class="modal inmodal fade" id="addnew_west" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg" style="width: 930px;">
            <div class="modal-content">
              <div class="tc-title-div">新增西/成药处方模板</div>
              <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                      aria-hidden="true">&times;</span></button>
              <div class="hr-tcline"></div>
              <!--弹窗详细内容-->
              <div class='form-labeldiv'>模板名称</div>
              <input style='width: 200px' class='form-tcinput' placeholder='模板名称' v-model="item_json.templateName">

              <!--添加西/成药表格-->
              <div class="cure_container" style="width: 880px;margin: 10px 20px 0 20px;">
                <table class="table text-center no-margins" style="border: 1px solid #F4F4F4">
                  <thead>
                  <tr>
                    <th class="text-center r_border" style="border-bottom: none">序号</th>
                    <th class="text-center r_border" style="border-bottom: none">药品名</th>
                    <th class="text-center r_border" style="border-bottom: none">剂量(次)</th>
                    <th class="text-center r_border" style="border-bottom: none">单位(次)</th>
                    <th class="text-center r_border" style="border-bottom: none">用法</th>
                    <th class="text-center r_border" style="border-bottom: none">用药频次</th>
                    <th class="text-center r_border" style="border-bottom: none">天数</th>
                    <th class="text-center r_border" style="border-bottom: none">数量</th>
                    <th class="text-center r_border" style="border-bottom: none">单位</th>
                    <th class="text-center r_border" style="border-bottom: none">备注</th>
                    <th class="text-center" style="border-bottom: none">操作</th>
                  </tr>
                  </thead>
                  <tbody>

                  <tr v-for="(western_prescription_item, index) in western_prescription_items">
                    <td class="l_border cure_little_item" >{{index+1}}</td>
                    <td :class="{focus_border : western_prescription_item.focus && currentFocusIndex == 0}" class="l_border no-padding" style="width: 160px">
                      <input @input="getDataList(2,western_prescription_item.prodName)" @focus="getFocus(western_prescription_item, 0)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="western_prescription_item.prodName">
                      <div v-show="western_prescription_item.focus && currentFocusIndex == 0" class="list_menu" style="margin-left: 75px">
                        <ul class="no-margins">
                          <li @mousedown="selectWesternMedicine(data, western_prescription_item)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.prodName}}</a></li>
                        </ul>
                      </div>
                    </td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 1 ? 'focus_border' : 'l_border' " class="cure_little_item"> <input @focus="getFocus(western_prescription_item, 1)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="western_prescription_item.singleDose"></td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 2 ? 'focus_border' : 'l_border' " class="cure_little_item"> <input @focus="getFocus(western_prescription_item, 2)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="usage_array[western_prescription_item.doseUnit]"></td>
                    <td class="l_border prescription_little_item"><div class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto; background-color: white">{{usage_array[western_prescription_item.usageType]}}</div></td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' " class="cure_little_item"> <input @focus="getFocus(western_prescription_item, 3)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="western_prescription_item.frequency"></td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 4 ? 'focus_border' : 'l_border' " class="prescription_little_item"> <input @focus="getFocus(western_prescription_item, 4)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="number" style="height: auto;" v-model="western_prescription_item.dayNum"></td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 5 ? 'focus_border' : 'l_border' " class="prescription_little_item"> <input @focus="getFocus(western_prescription_item, 5)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="number" style="height: auto;" v-model="western_prescription_item.prodNum"></td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 6 ? 'focus_border' : 'l_border' " class="cure_little_item"> <input @focus="getFocus(western_prescription_item, 6)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="usage_array[western_prescription_item.prodUnit]"></td>
                    <td :class="western_prescription_item.focus && currentFocusIndex == 7 ? 'focus_border' : 'l_border' "><input @focus="getFocus(western_prescription_item, 7)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="western_prescription_item.projectTemplateRemark"></td>
                    <td class="l_r_border"><a @click="delete_western_prescription_item(index)">删除</a></td>
                  </tr>

                  <tr>
                    <td class="l_r_border"></td>
                    <td @click="tc_add_west"><a class="un_skip_link">添加西/成药</a>
                    <td class="l_r_border"></td>
                    <td></td>
                    <td class="l_r_border"></td>
                    <td></td>
                    <td class="l_r_border"></td>
                    <td></td>
                    <td class="l_r_border"></td>
                    <td></td>
                    <td class="r_border"></td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <!--确定取消按钮-->
              <button @click="saveWestItem(item_json,western_prescription_items)" style='margin: 30px 10px 30px 360px;' class='form-btn-black' data-dismiss="modal">确定</button><button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>

            </div>
          </div>
        </div>

        <!--西/成药处方模板表格-->
        <table class="table border-top-2 table-margintop white-bg">
          <thead>
          <tr>
            <th class="text-center width_50">序号</th>
            <th class="text-center l_r_border">模板名称</th>
            <th class="text-center width_300">模板项目</th>
            <th class="text-center l_r_border">状态</th>
            <th class="text-center"></th>
            <th class="text-center l_r_border">操作</th>
            <th class="text-center"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(data_item,index) in west_data_items">
            <td class="text-center">{{index+1}}</td>
            <td class="text-center l_r_border">{{data_item.templateName}}</td>
            <td class="text-center">{{data_item.templateDesc}}</td>
            <td class="text-center l_r_border">{{data_item.state == 1 ? '正常' : '停用'}}</td>
            <td @click="editWestFunc(data_item,index)" class="text-center"><a href="javascript:;" data-toggle="modal" data-target="#editwest">编辑</a></td>
            <td class="text-center l_r_border"><a @click="stopTemplate(west_data_items,data_item,index)" href="javascript:;" data-toggle="modal" data-target="#startstop">{{data_item.state == 1 ? '停用' : '启用'}}</a></td>
            <td class="l_r_border text-center"><a @click="delete_list(west_data_items,data_item,index)">删除</a></td>
          </tr>
          </tbody>
        </table>
      </div>
      <pagination v-show="west_data_items.length > 0"></pagination>
    </div>

    <!--模态弹窗开始--编辑西/成药模板-->
    <div class="modal inmodal fade" id="editwest" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg" style="width: 930px;">
        <div class="modal-content">
          <div class="tc-title-div">编辑西/成药处方模板</div>
          <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
            aria-hidden="true">&times;</span></button>
          <div class="hr-tcline"></div>
          <!--弹窗详细内容-->
          <div class='form-labeldiv'>模板名称</div>
          <input style='width: 200px' class='form-tcinput' placeholder='模板名称' v-model="template_name">

          <!--添加西/成药表格-->
          <div class="cure_container" style="width: 880px;margin: 10px 20px 0 20px;">
            <table class="table text-center no-margins" style="border: 1px solid #F4F4F4">
              <thead>
              <tr>
                <th class="text-center r_border" style="border-bottom: none">序号</th>
                <th class="text-center r_border" style="border-bottom: none">药品名</th>
                <th class="text-center r_border" style="border-bottom: none">剂量(次)</th>
                <th class="text-center r_border" style="border-bottom: none">单位(次)</th>
                <th class="text-center r_border" style="border-bottom: none">用法</th>
                <th class="text-center r_border" style="border-bottom: none">用药频次</th>
                <th class="text-center r_border" style="border-bottom: none">天数</th>
                <th class="text-center r_border" style="border-bottom: none">数量</th>
                <th class="text-center r_border" style="border-bottom: none">单位</th>
                <th class="text-center r_border" style="border-bottom: none">备注</th>
                <th class="text-center" style="border-bottom: none">操作</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="(western_prescription_item, index) in western_prescription_items">
                <td class="l_border cure_little_item" >{{index+1}}</td>
                <td :class="{focus_border : western_prescription_item.focus && currentFocusIndex == 0}" class="l_border no-padding" style="width: 160px">
                  <input @input="getDataList(2,western_prescription_item.prodName)" @focus="getFocus(western_prescription_item, 0)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="western_prescription_item.prodName">
                  <div v-show="western_prescription_item.focus && currentFocusIndex == 0" class="list_menu" style="margin-left: 75px">
                    <ul class="no-margins">
                      <li @mousedown="selectWesternMedicine(data, western_prescription_item)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.prodName}}</a></li>
                    </ul>
                  </div>
                </td>
                <td :class="western_prescription_item.focus && currentFocusIndex == 1 ? 'focus_border' : 'l_border' " class="cure_little_item"> <input @focus="getFocus(western_prescription_item, 1)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="western_prescription_item.singleDose"></td>
                <td :class="western_prescription_item.focus && currentFocusIndex == 2 ? 'focus_border' : 'l_border' " class="cure_little_item"> <input @focus="getFocus(western_prescription_item, 2)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="usage_array[western_prescription_item.doseUnit]"></td>
                <td class="l_border prescription_little_item"><div class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto; background-color: white">{{usage_array[western_prescription_item.usageType]}}</div></td>
                <td :class="western_prescription_item.focus && currentFocusIndex == 3 ? 'focus_border' : 'l_border' " class="cure_little_item"> <input @focus="getFocus(western_prescription_item, 3)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="western_prescription_item.frequency"></td>
                <td :class="western_prescription_item.focus && currentFocusIndex == 4 ? 'focus_border' : 'l_border' " class="prescription_little_item"> <input @focus="getFocus(western_prescription_item, 4)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="number" style="height: auto;" v-model="western_prescription_item.dayNum"></td>
                <td :class="western_prescription_item.focus && currentFocusIndex == 5 ? 'focus_border' : 'l_border' " class="prescription_little_item"> <input @focus="getFocus(western_prescription_item, 5)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="number" style="height: auto;" v-model="western_prescription_item.prodNum"></td>
                <td :class="western_prescription_item.focus && currentFocusIndex == 6 ? 'focus_border' : 'l_border' " class="cure_little_item"> <input @focus="getFocus(western_prescription_item, 6)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="usage_array[western_prescription_item.prodUnit]"></td>
                <td :class="western_prescription_item.focus && currentFocusIndex == 7 ? 'focus_border' : 'l_border' "><input @focus="getFocus(western_prescription_item, 7)" @blur="loseFocus(western_prescription_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="western_prescription_item.projectTemplateRemark"></td>
                <td class="l_r_border"><a @click="delete_western_prescription_item(index)">删除</a></td>
              </tr>

              <tr>
                <td class="l_r_border"></td>
                <td @click="tc_add_west"><a class="un_skip_link">添加西/成药</a>
                <td class="l_r_border"></td>
                <td></td>
                <td class="l_r_border"></td>
                <td></td>
                <td class="l_r_border"></td>
                <td></td>
                <td class="l_r_border"></td>
                <td></td>
                <td class="r_border"></td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--确定取消按钮-->
          <button @click="saveEditWest(western_prescription_items,cure_select_index)" style='margin: 30px 10px 30px 360px;' class='form-btn-black' data-dismiss="modal">确定</button><button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>

        </div>
      </div>
    </div>







    <!--内容部分-中药处方模板-->
    <div v-show="indexChoose == 2" class="case_container">
      <div class="ibox-content padding-lr-10 gray-bg">
        <!--按钮-->
        <div style="display: inline-block;margin-top: 10px">
          <a @click="addNewFunc" type="button" class="addnewBtn" data-toggle="modal" data-target="#addnew_china"><img style="width:15px;height: 15px " src="../../../../static/img/set_manage_img/add.png">&nbsp;新增</a>
        </div>
        <div class="pull-right search_input" style="margin-top: 5px;margin-right: 0">
          <input placeholder="请输入模板名称" type="text" style="outline: none;width:200px;border: none;">
          <img style="width: 15px;height: 15px;margin-right: 5px" src="../../../../static/img/set_manage_img/search.png">
        </div>
        <!--模态弹窗开始--新增中药模板-->
        <div class="modal inmodal fade" id="addnew_china" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg" style="width: 830px;">
            <div class="modal-content">
              <div class="tc-title-div">新增中药处方模板</div>
              <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                aria-hidden="true">&times;</span></button>
              <div class="hr-tcline"></div>
              <!--弹窗详细内容-->
              <div class='form-labeldiv'>模板名称</div>
              <input style='width: 200px' class='form-tcinput' placeholder='模板名称' v-model="item_json.templateName">

              <!--中药-->
              <div class="cure_container" style="width: 780px;margin: 10px 20px 0 20px;">
                <table class="table text-center no-margins" style="border: 1px solid #F4F4F4">
                  <thead>
                  <tr>
                    <th class="text-center r_border" style="border-bottom: none">序号</th>
                    <th class="text-center r_border" style="border-bottom: none">药品名</th>
                    <th class="text-center r_border" style="border-bottom: none">剂量(次)</th>
                    <th class="text-center r_border" style="border-bottom: none">单位 (次)</th>
                    <th class="text-center r_border" style="border-bottom: none">备注说明</th>
                    <th class="text-center" style="border-bottom: none; border-right: 1px solid #F4F4F4">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(china_item, index) in chinese_prescription_items">
                    <td class="l_border cure_little_item" >{{index+1}}</td>
                    <td :class="{focus_border : china_item.focus && currentFocusIndex == 0}" class="l_border no-padding" style="width: 160px">
                      <input @input="getDataList(1,china_item.prodName)" @focus="getFocus(china_item, 0)" @blur="loseFocus(china_item)" class="form-control white-bg no-padding text-center no-borders" style="height: auto;" type="text" v-model="china_item.prodName">
                      <div v-show="china_item.focus && currentFocusIndex == 0" class="list_menu" style="margin-left: 68px;">
                        <ul class="no-margins">
                          <li @mousedown="selectChinesePrescription(data, china_item)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.prodName}}</a></li>
                        </ul>
                      </div>
                    </td>
                    <td class="l_border cure_little_item"><input class="form-control white-bg no-padding text-center no-borders" style="height: auto; background-color: white" v-model="china_item.singleDose"></td>
                    <td :class="china_item.focus && currentFocusIndex == 1 ? 'focus_border' : 'l_border' "> <input @focus="getFocus(china_item, 1)" @blur="loseFocus(china_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="usage_array[china_item.doseUnit]"></td>
                    <td :class="china_item.focus && currentFocusIndex == 2 ? 'focus_border' : 'l_r_border' "> <input @focus="getFocus(china_item, 2)" @blur="loseFocus(china_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="china_item.remark"></td>
                    <td class="l_r_border"><a @click="delete_china_item(index)" class="un_skip_link">删除</a></td>
                  </tr>
                  <tr>
                    <td class="l_r_border"></td>
                    <td @click="tc_add_china"><a class="un_skip_link">添加中药</a>
                    <td class="l_r_border"></td>
                    <td></td>
                    <td class="l_r_border"></td>
                    <td class="r_border"></td>
                  </tr>
                  </tbody>
                </table>
                <div class='form-labeldiv-china'>用法:</div><input @input="getUsageList(usage_json.usageName)" @focus="getUsageFocus(usage_json)" @blur="loseUsageFocus(usage_json)" style='width: 140px;margin-top: 10px' class='form-tcinput' placeholder='请输入用法' v-model="usage_json.usageName">
                <div v-show="usage_json.focus" class="list_menu" style="margin-left: 40px;">
                  <ul class="no-margins">
                    <li @mousedown="selectUsageName(data,usage_json)" class="item_list_normal" v-for="(data, index) in usageList"><a>{{data.codeValue}}</a></li>
                  </ul>
                </div>
                <div class='form-labeldiv-china'>频次:</div><input style='width: 140px;margin-top: 10px' class='form-tcinput' placeholder='请输入用药频次' v-model="item_json.frequency">
                <div class='form-labeldiv-china'>天数:</div><input style='width: 140px;margin-top: 10px' class='form-tcinput' placeholder='请输入天数' v-model="item_json.dayNum" type="number">
                <div class='form-labeldiv-china'>总副数:</div><input style='width: 140px;margin-top: 10px' class='form-tcinput' placeholder='请输入总副数' v-model="item_json.prodNum" type="number">
              </div>

              <!--确定取消按钮-->
              <button @click="saveChinaItem(item_json,chinese_prescription_items)" style='margin: 30px 10px 30px 310px;' class='form-btn-black' data-dismiss="modal">确定</button><button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>

            </div>
          </div>
        </div>


        <!--中药处方模板表格-->
        <table class="table border-top-2 table-margintop white-bg">
          <thead>
          <tr>
            <th class="text-center width_50">序号</th>
            <th class="text-center l_r_border">模板名称</th>
            <th class="text-center width_300">模板项目</th>
            <th class="text-center l_r_border">状态</th>
            <th class="text-center"></th>
            <th class="text-center l_r_border">操作</th>
            <th class="text-center"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(data_item,index) in china_data_items">
            <td class="text-center">{{index+1}}</td>
            <td class="text-center l_r_border">{{data_item.templateName}}</td>
            <td class="text-center">{{data_item.templateDesc}}</td>
            <td class="text-center l_r_border">{{data_item.state == 1 ? '正常' : '停用'}}</td>
            <td @click="editChinaFunc(data_item,index)" class="text-center"><a href="javascript:;" data-toggle="modal" data-target="#editchina">编辑</a></td>
            <td class="text-center l_r_border"><a @click="stopTemplate(china_data_items,data_item,index)" href="javascript:;" data-toggle="modal" data-target="#startstop">{{data_item.state == 1 ? '停用' : '启用'}}</a></td>
            <td class="text-center"><a @click="delete_list(china_data_items,data_item,index)" class="un_skip_link">删除</a></td>
          </tr>
          </tbody>
        </table>


        <!--模态弹窗开始--编辑中药模板-->
        <div class="modal inmodal fade" id="editchina" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg" style="width: 830px;">
            <div class="modal-content">
              <div class="tc-title-div">编辑中药处方模板</div>
              <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                aria-hidden="true">&times;</span></button>
              <div class="hr-tcline"></div>
              <!--弹窗详细内容-->
              <div class='form-labeldiv'>模板名称</div><input style='width: 200px' class='form-tcinput' placeholder='模板名称' v-model="template_name">

              <!--中药-->
              <div class="cure_container" style="width: 780px;margin: 10px 20px 0 20px;">
                <table class="table text-center no-margins" style="border: 1px solid #F4F4F4">
                  <thead>
                  <tr>
                    <th class="text-center r_border" style="border-bottom: none">序号</th>
                    <th class="text-center r_border" style="border-bottom: none">药品名</th>
                    <th class="text-center r_border" style="border-bottom: none">剂量(次)</th>
                    <th class="text-center r_border" style="border-bottom: none">单位 (次)</th>
                    <th class="text-center r_border" style="border-bottom: none">备注说明</th>
                    <th class="text-center" style="border-bottom: none; border-right: 1px solid #F4F4F4">操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(china_item, index) in chinese_prescription_items">
                    <td class="l_border cure_little_item" >{{index+1}}</td>
                    <td :class="{focus_border : china_item.focus && currentFocusIndex == 0}" class="l_border no-padding" style="width: 160px">
                      <input @input="getDataList(1,china_item.prodName)" @focus="getFocus(china_item, 0)" @blur="loseFocus(china_item)" class="form-control white-bg no-padding text-center no-borders" style="height: auto;" type="text" v-model="china_item.prodName">
                      <div v-show="china_item.focus && currentFocusIndex == 0" class="list_menu" style="margin-left: 68px;">
                        <ul class="no-margins">
                          <li @mousedown="selectChinesePrescription(data, china_item)" class="item_list_normal" v-for="(data, index) in dataList"><a>{{data.prodName}}</a></li>
                        </ul>
                      </div>
                    </td>
                    <td class="l_border cure_little_item"><input class="form-control white-bg no-padding text-center no-borders" style="height: auto; background-color: white" v-model="china_item.singleDose"></td>
                    <td :class="china_item.focus && currentFocusIndex == 1 ? 'focus_border' : 'l_border' " class="cure_little_item"> <input @focus="getFocus(china_item, 1)" @blur="loseFocus(china_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="usage_array[china_item.doseUnit]"></td>
                    <td :class="china_item.focus && currentFocusIndex == 2 ? 'focus_border' : 'l_r_border' "> <input @focus="getFocus(china_item, 2)" @blur="loseFocus(china_item)" class="form-control white-bg no-padding text-center no-borders" type="text" style="height: auto;" v-model="china_item.remark"></td>
                    <td class="l_r_border"><a @click="delete_china_item(index)" class="un_skip_link">删除</a></td>
                  </tr>
                  <tr>
                    <td class="l_r_border"></td>
                    <td @click="tc_add_china"><a class="un_skip_link">添加中药</a>
                    <td class="l_r_border"></td>
                    <td></td>
                    <td class="l_r_border"></td>
                    <td class="r_border"></td>
                  </tr>
                  </tbody>
                </table>
                <div class='form-labeldiv-china'>用法:</div><input @input="getUsageList(usage_json.usageName)" @focus="getUsageFocus(usage_json)" @blur="loseUsageFocus(usage_json)" style='width: 140px;margin-top: 10px' class='form-tcinput' placeholder='请输入用法' v-model="usage_json.usageName">
                <div v-show="usage_json.focus" class="list_menu" style="margin-left: 40px;">
                  <ul class="no-margins">
                    <li @mousedown="selectUsageName(data,usage_json)" class="item_list_normal" v-for="(data, index) in usageList"><a>{{data.codeValue}}</a></li>
                  </ul>
                </div>
                <div class='form-labeldiv-china'>频次:</div><input style='width: 140px;margin-top: 10px' class='form-tcinput' placeholder='请输入用药频次' v-model="item_json.frequency">
                <div class='form-labeldiv-china'>天数:</div><input style='width: 140px;margin-top: 10px' class='form-tcinput' placeholder='请输入天数' v-model="item_json.dayNum" type="number">
                <div class='form-labeldiv-china'>总副数:</div><input style='width: 140px;margin-top: 10px' class='form-tcinput' placeholder='请输入总副数' v-model="item_json.prodNum" type="number">
              </div>
              <!--确定取消按钮-->
              <button @click="saveEditChina(chinese_prescription_items,cure_select_index)" style='margin: 30px 10px 30px 310px;' class='form-btn-black' data-dismiss="modal">确定</button><button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>

            </div>
          </div>
        </div>
      </div>
      <pagination v-show="china_data_items.length > 0"></pagination>
    </div>

  </div>
</template>

<script>
  import switch_tab from '../doctor_clinic/switch_tab_template.vue'
  import pagination from '../doctor_clinic/bottom_pagination.vue';

  export default{
    components:{switch_tab, pagination},
    data() {
      return{
        titles:[
          {titleName: '治疗', selected: true, listCount: 0},
          {titleName: '西/成药处方模板', selected: false, listCount: 0},
          {titleName: '中药处方模板', selected: false, listCount: 0},
        ],

        unit_array:[
          "袋", "片", "支", "粒", "瓶", "mg", "g", "ml", "l", "ug", "IU", "U", "包", "盒", "枚", "丸", "喷", "颗", "滴", "cm", "少许", "适量", "对", "个", "条", "板", "件", "套", "卷", "副", "只", "根", "箱", "台", "贴", "万单位",
        ],
        usage_array:[
          "","口服", "直肠用药", "舌下用药","注射用药","皮下注射","皮内注射","肌肉注射","静脉滴注","吸入用药","局部用药","椎管内用药","关节腔内用药","胸膜腔用药","腹腔用药","阴道用药","气管内用药","滴眼","滴鼻","喷喉","含化","敷伤口","擦皮肤","其他局部用药途径","其他用药途径",
        ],

        selects:[
          {selectName: ''},
        ],

        dataList: [],
        usageList: [],

//        弹窗中的表格数据
        cure_items: [],
        western_prescription_items: [],
        chinese_prescription_items: [],

//        页面表格的数据
        cure_data_items:[],
        west_data_items:[],
        china_data_items:[],

        item_json:{
          templateName:'',
          templateDesc:'',
          frequency: '',
          dayNum: '',
          prodNum: '',
        },

        usage_json: {
          focus:false,
          usageName: '',
          usageType: '',
        },

        tc_cure_items:[],

        tabindex:"1",

        currentFocusIndex: 0,

        template_name:'', //模板名称

        cure_select_index:-100,
        waitParams:{
          iDisplayLength:this.$enumerationType.pageSize,
          iDisplayStart:'',
          templateName:'',
        },
        tabClick:false,

      }
    },

    computed: {
      indexChoose () {
        var that=this;
        this.tabindex = this.$store.getters.getCurrentIndex + 1;
        console.log("tab页面------->" + this.tabindex);
        this.item_template_set('');
        this.tabClick = true;
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
      pageIndexNo:function(){
        this.tabClick = false;
        return (this.$store.getters.getCurrentPageNo==0?0:this.$store.getters.getCurrentPageNo-1)*this.$enumerationType.pageSize+1;
      },
      item_template_set: function (search_template) {
        this.waitParams.iDisplayStart = this.pageIndexNo();
        this.waitParams.templateName = search_template;
        var that = this;
        this.$api.get(this, this.$requestApi.searchTemplateList + this.tabindex, this.waitParams, function (data) {
          if (data.body.code == '00') {
            if (that.tabindex == '1') { //治疗项目
              that.cure_data_items = data.body.data;
              that.$store.dispatch('setPageCount',that.$enumerationType.getPageNumber(data.body.iTotalRecords));
            }else if (that.tabindex == '2'){
              that.west_data_items = data.body.data;
              that.$store.dispatch('setPageCount',that.$enumerationType.getPageNumber(data.body.iTotalRecords));
            }else {
              that.china_data_items = data.body.data;
              that.$store.dispatch('setPageCount',that.$enumerationType.getPageNumber(data.body.iTotalRecords));
            }
          } else {

          }
        });
      },
      // 分页点击调用
      request_list:function (index) {
        if(!this.tabClick) {
          this.item_template_set('');
        }
      },
      // 新增
      addNewFunc:function () {
        this.template_name = '';
        this.item_json = {
          templateName:'',
          templateDesc:'',
          frequency: '',
          dayNum: '',
          prodNum: '',
        };
        this.usage_json = {
          focus:false,
          usageName: '',
          usageType: '',
        };
        this.cure_items = [];
        this.western_prescription_items = [];
        this.chinese_prescription_items = [];
      },

      /*弹窗中的--添加治疗*/
      tc_add_cure: function () {
        this.cure_items.push({
          projectName: '',
          projectNum: '',
          projectId: '',
          projectDesc: '',
          projectUnit: '',
          projectTemplateRemark: '',
          focus: false,
        })
      },
      /*弹窗中的--添加西/成药模板*/
      tc_add_west: function () {
        this.western_prescription_items.push({
          prodName: '',
          prodId: '',
          doseUnit: '', //单次单位
          singleDose: '', //单次剂量
          usageType: '', //用法
          frequency: '', //频次
          prodUnit:'', //单位
          dayNum: '', //天数
          prodNum: '', //数量
          projectTemplateRemark: '',
          focus: false,
        })
      },
      /*弹窗中的--添加中药*/
      tc_add_china: function () {
        this.chinese_prescription_items.push({
          prodName: '',
          prodId: '',
          doseUnit: '', //单次单位
          singleDose: '', //单次剂量
          usageType: '', //用法
          frequency: '', //频次
          prodUnit:'', //单位
          dayNum: '', //天数
          prodNum: '', //数量
          remark: '',
          focus: false,
        });
      },

      /*删除弹窗中的列表行*/
      delete_cure_item: function (currentIndex) {
        this.cure_items.splice(currentIndex, 1);
      },
      delete_western_prescription_item: function (currentIndex) {
        this.western_prescription_items.splice(currentIndex, 1);
      },
      delete_china_item: function (currentIndex) {
        this.chinese_prescription_items.splice(currentIndex, 1);
      },

      /*保存(新增)治疗模板*/
      saveCureItem:function (item_json,cure_items) {
        var templateDesc = '';
        var json = {"projectId":'',"projectNum":'',"remark":""};
        var jsonProjects = [];
        console.log('+++++治疗项目---->' + cure_items + '数组个数:' + cure_items.length);
        for (var i = 0;i < cure_items.length;i++){
          console.log('______治疗项目---->' + cure_items[i].projectName);
          templateDesc += cure_items[i].projectName;
          jsonProjects.push({
            "projectId":cure_items[i].projectId,
            "projectNum":cure_items[i].projectNum,
            "remark":cure_items[i].projectTemplateRemark,
          });
          console.log('+++++projectId---->' + cure_items[i].projectId + '======>' + jsonProjects[i].projectId);
          if (i != cure_items.length-1){
            templateDesc += '|';
          };
        };
        console.log('治疗项目---->' + templateDesc + '--jsonProjects:' + jsonProjects);
        var that=this;
        this.$api.post(this,this.$requestApi.addNewCureTemp, {"jsonProjects":JSON.stringify(jsonProjects),"templateDesc":templateDesc,"templateName":item_json.templateName},function (data) {
          if(data.body.code == '00'){
            console.log("添加成功");
            that.item_template_set('');
          }else{

          }
        });
      },
      /*保存(新增)西/成药处方模板*/
      saveWestItem:function (item_json,western_prescription_items) {
        var templateDesc = '';
        var json = {
          "prodId":"",
          "singleDose":"",
          "doseUnit":"",
          "usageType":"",
          "frequency":"",
          "dayNum":"",
          "prodNum":"",
          "prodUnit":"",
          "remark":"",
        };
        var jsonProds = [];
        console.log('+++++西/成药项目---->' + western_prescription_items + '数组个数:' + western_prescription_items.length);
        for (var i = 0;i < western_prescription_items.length;i++){
          console.log('______西/成药项目---->' + western_prescription_items[i].prodName);
          templateDesc += western_prescription_items[i].prodName;
          jsonProds.push({
            "prodId":western_prescription_items[i].prodId,
            "singleDose":western_prescription_items[i].singleDose,
            "doseUnit":western_prescription_items[i].doseUnit,
            "usageType":western_prescription_items[i].usageType,
            "frequency":western_prescription_items[i].frequency,
            "dayNum":western_prescription_items[i].dayNum,
            "prodNum":western_prescription_items[i].prodNum,
            "prodUnit":western_prescription_items[i].prodUnit,
            "remark":western_prescription_items[i].projectTemplateRemark,
          });
          if (i != western_prescription_items.length-1){
            templateDesc += '|';
          };
        };
        console.log('西/成药项目---->' + templateDesc + '--jsonProds:' + jsonProds);
        var that=this;
        this.$api.post(this,this.$requestApi.addNewWCTemplate + "2", {"jsonProds":JSON.stringify(jsonProds),"templateDesc":templateDesc,"templateName":item_json.templateName},function (data) {
          if(data.body.code == '00'){
            console.log("添加成功");
            that.item_template_set('');
          }else{

          }
        });
      },
      /*保存(新增)中药处方模板*/
      saveChinaItem:function (item_json,chinese_prescription_items) {
        var templateDesc = '';
        var jsonProds = [];
        console.log('+++++中药项目---->' + chinese_prescription_items + '数组个数:' + chinese_prescription_items.length);
        for (var i = 0;i < chinese_prescription_items.length;i++){
          console.log('______中药项目---->' + chinese_prescription_items[i].prodName);
          templateDesc += chinese_prescription_items[i].prodName;
          jsonProds.push({
            "prodId":chinese_prescription_items[i].prodId,
            "singleDose":chinese_prescription_items[i].singleDose,
            "doseUnit":chinese_prescription_items[i].doseUnit,
            "usageType":this.usage_json.usageType,
            "frequency":item_json.frequency,
            "dayNum":item_json.dayNum,
            "prodNum":item_json.prodNum,
//            "prodUnit":chinese_prescription_items[i].prodUnit,
            "remark":item_json.remark,
          });
          if (i != chinese_prescription_items.length-1){
            templateDesc += '|';
          };
        };
        console.log('中药项目---->' + templateDesc + '--jsonProds:' + jsonProds);
        var that=this;
        this.$api.post(this,this.$requestApi.addNewWCTemplate + "3", {"jsonProds":JSON.stringify(jsonProds),"templateDesc":templateDesc,"templateName":item_json.templateName},function (data) {
          if(data.body.code == '00'){
            console.log("添加成功");
            that.item_template_set('');
          }else{

          }
        });
      },

//      启用停用项目模板
      stopTemplate: function (data_items,data_item,index) {
        if(data_item.state=='1'){//当前状态为启用状态
          var that=this;
          this.$api.post(this,this.$requestApi.stopTemplate + data_item.templateId, "",function (data) {
            if(data.body.code == '00'){
              console.log("停用成功");
              data_items[index].state = 0;
            }else{
              console.log("data.body");
            }
          });
        }else {//当前状态为停用状态
          var that=this;
          this.$api.post(this,this.$requestApi.startTemplate + data_item.templateId, "",function (data) {
            if(data.body.code == '00'){
              console.log("启用成功");
              data_items[index].state = 1;
            }else{

            }
          });
        }
      },


      /*点击"编辑"治疗模板按钮*/
      editCureFunc:function (data_item,index) {
        this.template_name = data_item.templateName;
        this.cure_select_index = index;
        this.cure_items = [];
        var itemsArray = [];
        var templateItemsArr = [];
        var itemsString = data_item.templateDesc;
        console.log('------>' + itemsString + 'templateId--->' + data_item.templateId);
        var regex = '|';
        var that = this;
        this.$api.get(this,this.$requestApi.searchTemp + data_item.templateId, "",function (data) {
          if(data.body.code == '00'){
            console.log("查询成功");
            templateItemsArr = data.body.templateItems;
            if(itemsString.indexOf("|") >= 0){ //判断是否含有竖线号
              itemsArray = itemsString.split(regex);
              console.log('编辑模板-->' + itemsArray);
              console.log('templateItemsArr------>' + templateItemsArr);
              for (var i = 0;i < itemsArray.length;i++){
                that.cure_items.push({
                  projectName: itemsArray[i],
                  projectNum: templateItemsArr[i].projectNum,
                  projectId: templateItemsArr[i].projectId,
                  projectTemplateRemark: templateItemsArr[i].projectTemplateRemark,
                  projectUnit: templateItemsArr[i].projectUnit,
                  focus: false,
                });
              };
            }else {
              that.cure_items.push({
                projectName: itemsString,
                projectNum: templateItemsArr[0].projectNum,
                projectId: templateItemsArr[0].projectId,
                projectTemplateRemark: templateItemsArr[0].projectTemplateRemark,
                projectUnit: templateItemsArr[0].projectUnit,
                focus: false,
              });
            };
          }else{

          }
        });
      },
      editWestFunc:function (data_item,index) {
        this.template_name = data_item.templateName;
        this.cure_select_index = index;
        this.western_prescription_items = [];
        var itemsArray = [];
        var templateItemsArr = [];
        var itemsString = data_item.templateDesc;
        console.log('------>' + itemsString + 'templateId--->' + data_item.templateId);
        var regex = '|';
        var that = this;
        this.$api.get(this,this.$requestApi.searchTemp + data_item.templateId, "",function (data) {
          if(data.body.code == '00'){
            console.log("查询成功");
            templateItemsArr = data.body.templateItems;
            if(itemsString.indexOf("|") >= 0){ //判断是否含有竖线号
              itemsArray = itemsString.split(regex);
              console.log('编辑模板-->' + itemsArray);
              console.log('templateItemsArr------>' + templateItemsArr);
              for (var i = 0;i < itemsArray.length;i++){
                that.western_prescription_items.push({
                  prodName:itemsArray[i],
                  prodId: templateItemsArr[i].prodId,
                  singleDose: templateItemsArr[i].prodTemplateSingleDose,
                  doseUnit: templateItemsArr[i].prodTemplateDoseUnit,
                  usageType: templateItemsArr[i].prodTemplateUsageType,
                  frequency: templateItemsArr[i].prodTemplateFrequency,
                  dayNum: templateItemsArr[i].prodTemplateDayNum,
                  prodNum: templateItemsArr[i].prodTemplateProdNum,
                  prodUnit: templateItemsArr[i].prodTemplateProdUnit,
                  projectTemplateRemark: templateItemsArr[i].prodTemplateRemark,
                  focus: false,
                });
              };
            }else {
              that.western_prescription_items.push({
                prodName: itemsString,
                prodId: templateItemsArr[0].prodId,
                singleDose: templateItemsArr[0].prodTemplateSingleDose,
                doseUnit: templateItemsArr[0].prodTemplateDoseUnit,
                usageType: templateItemsArr[0].prodTemplateUsageType,
                frequency: templateItemsArr[0].prodTemplateFrequency,
                dayNum: templateItemsArr[0].prodTemplateDayNum,
                prodNum: templateItemsArr[0].prodTemplateProdNum,
                prodUnit: templateItemsArr[0].prodTemplateProdUnit,
                projectTemplateRemark: templateItemsArr[0].prodTemplateRemark,
                focus: false,
              });
            };
          }else{

          };
        });
      },
      editChinaFunc:function (data_item,index) {
        this.template_name = data_item.templateName;
        this.cure_select_index = index;
        this.chinese_prescription_items = [];
        var itemsArray = [];
        var templateItemsArr = [];
        var itemsString = data_item.templateDesc;
        console.log('------>' + itemsString + 'templateId--->' + data_item.templateId);
        var regex = '|';
        var that = this;
        this.$api.get(this,this.$requestApi.searchTemp + data_item.templateId, "",function (data) {
          if(data.body.code == '00'){
            console.log("查询成功");
            templateItemsArr = data.body.templateItems;
            if(itemsString.indexOf("|") >= 0){ //判断是否含有竖线号
              itemsArray = itemsString.split(regex);
              console.log('编辑模板-->' + itemsArray);
              console.log('templateItemsArr------>' + templateItemsArr);
              for (var i = 0;i < itemsArray.length;i++){
                that.chinese_prescription_items.push({
                  prodName:itemsArray[i],
                  prodId: templateItemsArr[i].prodId,
                  singleDose: templateItemsArr[i].prodTemplateSingleDose,
                  doseUnit: templateItemsArr[i].prodTemplateDoseUnit,
                  usageType: templateItemsArr[i].prodTemplateUsageType,
                  frequency: templateItemsArr[i].prodTemplateFrequency,
                  dayNum: templateItemsArr[i].prodTemplateDayNum,
                  prodNum: templateItemsArr[i].prodTemplateProdNum,
                  prodUnit: templateItemsArr[i].prodTemplateProdUnit,
                  projectTemplateRemark: templateItemsArr[i].prodTemplateRemark,
                  focus: false,
                });
                that.usage_json.usageType = templateItemsArr[i].prodTemplateUsageType;
                that.usage_json.usageName = that.usage_array[templateItemsArr[i].prodTemplateUsageType];
                that.item_json.frequency = templateItemsArr[i].prodTemplateFrequency;
                that.item_json.dayNum = templateItemsArr[i].prodTemplateDayNum;
                that.item_json.prodNum = templateItemsArr[i].prodTemplateProdNum;
              };
            }else {
              that.chinese_prescription_items.push({
                prodName: itemsString,
                prodId: templateItemsArr[0].prodId,
                singleDose: templateItemsArr[0].prodTemplateSingleDose,
                doseUnit: templateItemsArr[0].prodTemplateDoseUnit,
                usageType: templateItemsArr[0].prodTemplateUsageType,
                frequency: templateItemsArr[0].prodTemplateFrequency,
                dayNum: templateItemsArr[0].prodTemplateDayNum,
                prodNum: templateItemsArr[0].prodTemplateProdNum,
                prodUnit: templateItemsArr[0].prodTemplateProdUnit,
                projectTemplateRemark: templateItemsArr[0].prodTemplateRemark,
                focus: false,
              });
            };
          }else{

          }
        });
      },




      /*保存编辑模板弹框*/
      saveEditCure:function (cure_items,index) {
        var templateDesc = '';
        var json = {"projectId":'',"projectNum":'',"remark":""};
        var jsonProjects = [];
        console.log('+++++治疗项目---->' + cure_items + '数组个数:' + cure_items.length);
        for (var i = 0;i < cure_items.length;i++){
          console.log('______治疗项目---->' + cure_items[i].projectName);
          templateDesc += cure_items[i].projectName;
          jsonProjects.push({
            "projectId":cure_items[i].projectId,
            "projectNum":cure_items[i].projectNum,
            "remark":cure_items[i].projectTemplateRemark,
          });
          if (i != cure_items.length-1){
            templateDesc += '|';
          };
        };
        console.log('治疗项目---->' + templateDesc + '--jsonProjects:' + jsonProjects);
        var that = this;
        this.$api.post(this,this.$requestApi.changeCureTemp + this.cure_data_items[index].templateId, {"jsonProjects":JSON.stringify(jsonProjects),"templateDesc":templateDesc,"templateName":that.template_name},function (data) {
          if(data.body.code == '00'){
            console.log("修改成功");
            that.item_template_set('');
            // that.cure_data_items[index].templateName = that.template_name;
            // that.cure_data_items[index].templateDesc = templateDesc;
          }else{

          }
        });
      },
      saveEditWest:function (western_prescription_items,index) {
        var templateDesc = '';
        var jsonProds = [];
        console.log('+++++西/成药处方项目---->' + western_prescription_items + '数组个数:' + western_prescription_items.length);
        for (var i = 0;i < western_prescription_items.length;i++){
          console.log('______西/成药处方项目---->' + western_prescription_items[i].prodName);
          templateDesc += western_prescription_items[i].prodName;
          jsonProds.push({
            "prodId":western_prescription_items[i].prodId,
            "singleDose":western_prescription_items[i].singleDose,
            "doseUnit":western_prescription_items[i].doseUnit,
            "usageType":western_prescription_items[i].usageType,
            "frequency":western_prescription_items[i].frequency,
            "dayNum":western_prescription_items[i].dayNum,
            "splitNum":western_prescription_items[i].prodNum,
            "prodUnit":western_prescription_items[i].prodUnit,
            "remark":western_prescription_items[i].projectTemplateRemark,
          });
          if (i != western_prescription_items.length-1){
            templateDesc += '|';
          };
        };
        console.log('西/成药处方项目---->' + templateDesc + '--jsonProds:' + jsonProds);
        var that = this;
        this.$api.post(this,this.$requestApi.changeProdTemp + this.west_data_items[index].templateId, {"jsonProds":JSON.stringify(jsonProds),"templateDesc":templateDesc,"templateName":that.template_name},function (data) {
          if(data.body.code == '00'){
            console.log("修改成功");
            that.item_template_set('');
            // that.west_data_items[index].templateName = that.template_name;
            // that.west_data_items[index].templateDesc = templateDesc;
          }else{

          }
        });
      },
      saveEditChina:function (china_items,index) {
        var templateDesc = '';
        var jsonProds = [];
        console.log('+++++中药处方项目---->' + china_items + '数组个数:' + china_items.length);
        for (var i = 0;i < china_items.length;i++){
          console.log('______中药处方项目---->' + china_items[i].prodName);
          templateDesc += china_items[i].prodName;
          jsonProds.push({
            "prodId":china_items[i].prodId,
            "singleDose":china_items[i].singleDose,
            "doseUnit":china_items[i].doseUnit,
            "usageType":this.usage_json.usageType,
            "frequency":this.item_json.frequency,
            "dayNum":this.item_json.dayNum,
            "prodNum":this.item_json.prodNum,
//            "prodUnit":chinese_prescription_items[i].prodUnit,
            "remark":this.item_json.remark,
          });
          if (i != china_items.length-1){
            templateDesc += '|';
          };
        };
        console.log('中药处方项目---->' + templateDesc + '--jsonProds:' + jsonProds);
        var that = this;
        this.$api.post(this,this.$requestApi.changeProdTemp + this.china_data_items[index].templateId, {"jsonProds":JSON.stringify(jsonProds),"templateDesc":templateDesc,"templateName":that.template_name},function (data) {
          if(data.body.code == '00'){
            console.log("修改成功");
            that.item_template_set('');
            // that.china_data_items[index].templateName = that.template_name;
            // that.china_data_items[index].templateDesc = templateDesc;
          }else{

          }
        });


//        var templateDesc = '';
//        var dosageString = '';
//        for (var i = 0;i < china_items.length;i++){
//          templateDesc += china_items[i].drugName;
//          dosageString += china_items[i].dosage;
//          if (i != china_items.length-1){
//            templateDesc += ',';
//            dosageString += ',';
//          };
//        };
//        var data = {
//          templateName:this.template_name,
//          templateDesc:templateDesc,
//          dosage:dosageString,
//        };
//        this.china_data_items[index].templateName = data.templateName;
//        this.china_data_items[index].templateDesc = data.templateDesc;
//        this.china_data_items[index].dosage = data.dosage;
      },

      /*删除页面中的列表行*/
      delete_list: function (data_items,data_item,currentIndex) {
        var that=this;
        this.$api.post(this,this.$requestApi.deleteTemplate + data_item.templateId, "",function (data) {
          if(data.body.code == '00'){
            console.log("删除成功");
            data_items.splice(currentIndex, 1);
          }else{

          }
        });
      },

      loseFocus:function (item) {
        item.focus = false;
        this.dataList = [];
      },

      getFocus:function (item, focusIndex) {
        this.currentFocusIndex = focusIndex;
        item.focus = true;
      },

      selectedName:function (data, cureitemData) {
        cureitemData.projectName = data.projectName;
        cureitemData.projectUnit = data.projectUnit;
        cureitemData.projectDesc = data.projectDesc;
        cureitemData.projectId = data.projectId;
      },
      selectWesternMedicine:function (data, itemData) {
        itemData.prodName = data.prodName;
        itemData.prodId = data.prodId;
        itemData.doseUnit = data.singleUnit;
        itemData.singleDose = data.singleDose;
        itemData.usageType = data.usageType;
        itemData.frequency = data.frequency;
        itemData.prodUnit = data.prodUnit;
        itemData.dayNum = data.dayNum;
        itemData.prodNum = data.prodNum;
        itemData.remark = data.remark;
      },
      selectChinesePrescription:function (data, itemData) {
        itemData.prodName = data.prodName;
        itemData.prodId = data.prodId;
        itemData.doseUnit = data.singleUnit;
        itemData.singleDose = data.singleDose;
        itemData.usageType = data.usageType;
        itemData.frequency = data.frequency;
        itemData.prodUnit = data.prodUnit;
        itemData.dayNum = data.dayNum;
        itemData.prodNum = data.prodNum;
        itemData.remark = data.remark;
      },

      getDataList:function (type,projectName) {
        var that=this;
        var url = '';
        if (type == 0) {//治疗模板
          url = this.$requestApi.itemManageList + "1";
          this.$api.get(this, url,{"projectName":projectName},function  (data) {
            if(data.status=='200'){
              that.dataList = data.body.data;
            }else{
              console.log(data.body.msg);
            }
          });
        } else if (type == 1) {// 中药模板
          url = this.$requestApi.searchProdsList;
          this.$api.get(this, url,{"prodNameOrGenericNameOrEnglishName":projectName,"state":"1","prodType":"2"},function  (data) {
            if(data.status=='200'){
              that.dataList = data.body.data;
            }else{
              console.log(data.body.msg);
            }
          });
        } else if (type == 2) {//西药模板
          url = this.$requestApi.searchProdsList;
          this.$api.get(this, url,{"prodNameOrGenericNameOrEnglishName":projectName,"state":"1","prodType":"1"},function  (data) {
            if(data.status=='200'){
              that.dataList = data.body.data;
            }else{
              console.log(data.body.msg);
            }
          });
        } else if (type == 3) {//其他收费
          url = this.$requestApi.otherCharge;
        }
      },

      getUsageList: function () {
        var that = this;
        var url = this.$requestApi.staticDataList;
        this.$api.get(this, url,{"codeType":"USAGE_TYPE"},function  (data) {
          if(data.status=='200'){
            that.usageList = data.body.data;
          }else{
            console.log(data.body.msg);
          }
        });
      },
      getUsageFocus: function (usage_json) {
        usage_json.focus = true;
      },
      loseUsageFocus: function (usage_json) {
        usage_json.focus = false;
      },
      selectUsageName: function (data,usage_json) {
        usage_json.usageName = data.codeValue;
        usage_json.usageType = data.codeKey;
      },

    },

  }
</script>

<style>
    /*@import "../../style/xzy_css/xzycss.css";*/

    /*弹窗表单*/
    .form-labeldiv-china{
      margin:5px 5px 0 10px;
      display: inline-block;
      /*width: 85px;*/
    }

    .l_r_border {
      border-left: 1px solid #f4f4f4;
      border-right: 1px solid #f4f4f4;
    }

    .r_border {
      border-right:1px solid #f4f4f4;
    }

    .little_item {
      width: 10%;
    }

    .cure_little_item {
      width: 8%;
    }

    .item_list_normal {
      list-style: none;
      line-height: 35px;
      border-bottom: 1px solid gainsboro;
    }
    .list_menu {
      box-shadow: rgb(102, 102, 102) 0px 0px 10px;
      margin-top: 12px;
      left: 15px;
      line-height: 30px;
      background-color: white;
      position: absolute;
      z-index: 999;
      width: 160px;
    }

    .focus_border {
      border: 1px solid #5FA8D4 !important;
    }

    .width_50 {
      width: 50px;
    }
    .width_300 {
      width: 300px;
    }

</style>
