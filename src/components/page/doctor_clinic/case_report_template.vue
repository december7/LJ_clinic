<template>
  <div class="case_container">
    <div :class="showAssistInquiry ? 'col-sm-8' : 'col-sm-12' ">
      <!--患者体格检查-->
      <div class="col-md-12 no-padding">
        <div class="ibox float-e-margins no-margins border-bottom">
          <div class="ibox-title no-borders msg_item_title">
            <h5>患者体格检查</h5>
            <div class="ibox-tools">
              <a class="collapse-link">
                <i class="fa fa-chevron-up"></i>
              </a>
            </div>
          </div>
          <div class="ibox-content no-borders no_top_padding">
            <form method="get" class="form-horizontal m-l-md">
              <div class="form-group">
                <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding">
                  <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                       class="pull-left no-padding left_text_tips">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高

                  </div>
                  <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                    <input v-model="patientCaseList.height" type="text" placeholder="身高(cm)" readonly="readonly"
                           :disabled="editable" class="form-control  input_circular_corner">
                  </div>
                </div>

                <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding">
                  <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                       class="pull-left no-padding left_text_tips">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重
                  </div>
                  <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                    <input v-model="patientCaseList.weight" type="text" placeholder="体重(kg)" readonly="readonly"
                           :disabled="editable" class="form-control   input_circular_corner">
                  </div>
                </div>

                <div :class="showAssistInquiry ? 'col-md-6 m-t' : 'col-md-4' " class="no-padding">
                  <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                       class="pull-left no-padding left_text_tips">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温
                  </div>
                  <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                    <input v-model="patientCaseList.temperature" type="text" placeholder="体温(℃)" readonly="readonly"
                           :disabled="editable" class="form-control   input_circular_corner">
                  </div>
                </div>

                <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding m-t">
                  <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                       class="pull-left no-padding left_text_tips">BMI&nbsp;&nbsp;&nbsp;指&nbsp;&nbsp;&nbsp;数
                  </div>
                  <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                    <input v-model="patientCaseList.bmiNum" type="text" placeholder="BMI指数" readonly="readonly"
                           :disabled="editable" class="form-control   input_circular_corner">
                  </div>
                </div>

                <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding m-t">
                  <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                       class="pull-left no-padding left_text_tips">呼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;吸
                  </div>
                  <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                    <input v-model="patientCaseList.breathing" type="text" placeholder="呼吸(次/分钟)" readonly="readonly"
                           :disabled="editable" class="form-control   input_circular_corner">
                  </div>
                </div>

                <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding m-t">
                  <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                       class="pull-left no-padding left_text_tips">氧&nbsp;&nbsp;饱&nbsp;&nbsp;和&nbsp;&nbsp;度
                  </div>
                  <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                    <input v-model="patientCaseList.oxygen" type="text" placeholder="氧饱和度(％)"
                           :disabled="editable" class="form-control gray-bg input_circular_corner">
                  </div>
                </div>

                <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding m-t">
                  <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                       class="pull-left no-padding left_text_tips">脉&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;搏
                  </div>
                  <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                    <input v-model="patientCaseList.pulse" type="text" placeholder="脉搏(次/分钟)"
                           :disabled="editable" class="form-control gray-bg input_circular_corner">
                  </div>
                </div>

                <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding m-t">
                  <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                       class="pull-left no-padding left_text_tips">疼&nbsp;&nbsp;痛&nbsp;&nbsp;评&nbsp;&nbsp;分
                  </div>
                  <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                    <input v-model="patientCaseList.painScore" type="text" placeholder="疼痛评分(0-10)"
                           :disabled="editable" class="form-control gray-bg input_circular_corner">
                  </div>
                </div>

                <div class="col-sm-12 no-padding">
                  <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding m-t">
                    <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">收&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;缩&nbsp;&nbsp;&nbsp;&nbsp;压
                    </div>
                    <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input v-model="patientCaseList.systolicPressure" type="text" placeholder="收缩压(mmHg)"
                             :disabled="editable" class="form-control gray-bg input_circular_corner">
                    </div>
                  </div>

                  <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding m-t">
                    <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                         class="pull-left no-padding left_text_tips">舒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;张&nbsp;&nbsp;&nbsp;&nbsp;压
                    </div>
                    <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                      <input v-model="patientCaseList.diastolicPressure" type="text" placeholder="疼痛评分(0-10)"
                             :disabled="editable" class="form-control gray-bg input_circular_corner">
                    </div>
                  </div>
                </div>

              </div>

            </form>
          </div>
        </div>
      </div>
      <!--病史信息-->
      <div class="col-md-12 no-padding">
        <div class="ibox float-e-margins no-margins border-bottom">
          <div class="ibox-title no-top-border msg_item_title">
            <h5>病史信息</h5>
            <div class="ibox-tools">
              <a class="collapse-link">
                <i class="fa fa-chevron-up"></i>
              </a>
            </div>
          </div>
          <div class="ibox-content no-borders no_top_padding">
            <form method="get" class="form-horizontal m-r-md m-l-md">
              <div class="form-group">
                <p :class="showAssistInquiry ? 'col-md-2' : 'col-md-1' "
                   class="no-padding left_text_tips">过&nbsp;&nbsp;&nbsp;&nbsp;敏&nbsp;&nbsp;&nbsp;&nbsp;史:</p>
                <div class="col-md-6">
                  <div class="radio radio-info radio-inline">
                    <input :disabled="editable"  type="radio" id="inlineRadio1"
                           v-model="hasAllergys" value="true" name="radioInline"
                           style="margin-top: 1px">
                    <label for="inlineRadio1">是</label>
                  </div>
                  <div class="radio radio-inline">
                    <input :disabled="editable"   type="radio" id="inlineRadio2"
                           v-model="hasAllergys" value="false" name="radioInline"
                           style="margin-top: 1px">
                    <label for="inlineRadio2">否</label>
                  </div>
                </div>
              </div>

              <div  v-for="(item, index) in allergy_data" class="form-group" v-show="hasAllergys=='true'">
                <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding">
                  <p :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                     class="no-padding left_text_tips">过&nbsp;&nbsp;&nbsp;&nbsp;敏&nbsp;&nbsp;&nbsp;&nbsp;源:</p>
                  <div :class="showAssistInquiry ? 'col-md-8' : 'col-md-6' ">
                    <div class="input-group-btn">
                      <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{getAllergyThing(item.allergyThing)}}<span class="goods_tips_down caret"></span>
                      </button>
                      <ul class="dropdown-menu" style="width: 100%" >
                        <li @click="selectAllergyThingItem(i,index)" v-for="(titleItem, i) in $enumeration.getALLERGY_THING()">
                          <a :class="{selected_item : item.allergyThing == i}" class="no-padding" style="text-align: center">{{titleItem}}</a>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>

                <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding">
                  <p :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                     class="no-padding left_text_tips">过&nbsp;敏&nbsp;反&nbsp;应:</p>
                  <div :class="showAssistInquiry ? 'col-md-8' : 'col-md-6' ">
                    <div class="input-group-btn">
                      <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{getAllergyReaction(item.allergyReaction)}}<span class="goods_tips_down caret"></span>
                      </button>
                      <ul class="dropdown-menu" style="width: 100%" >
                        <li @click="selectAllergyReactionItem(i,index)" v-for="(titleItem, i) in $enumeration.getALLERGY_REACTION()">
                          <a :class="{selected_item : item.allergyReaction == i}" class="no-padding" style="text-align: center">{{titleItem}}</a>
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>

                <div :class="showAssistInquiry ? 'col-md-12 m-t-sm' : 'col-md-4' " class="no-padding">
                  <p :class="showAssistInquiry ? 'col-md-2' : 'col-md-3' "
                     class="no-padding left_text_tips">过&nbsp;敏&nbsp;程&nbsp;&nbsp;度:</p>
                  <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-6' ">
                    <div class="input-group-btn">
                      <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{getAllergyDegree(item.allergyDegree)}}<span class="goods_tips_down caret"></span>
                      </button>
                      <ul class="dropdown-menu" style="width: 100%" >
                        <li @click="selectSingleUnitItem(i,index)" v-for="(titleItem, i) in $enumeration.getALLERGY_DEGREE()">
                          <a :class="{selected_item : item.allergyDegree == i}" class="no-padding" style="text-align: center">{{titleItem}}</a>
                        </li>

                      </ul>
                    </div>
                  </div>
                  <div class="pull-right" style="line-height: 34px; padding-right: 15px">
                    <a @click="addItem()" style="padding: 0 10px;" v-show="allergy_data.length == (index + 1)">➕</a>
                    <a @click="removeItem(index)" v-show="allergy_data.length > 1">➖</a>
                  </div>

                </div>

              </div>

              <div class="form-group">
                <p :class="showAssistInquiry ? 'col-md-2' : 'col-md-1' " class="no-padding left_text_tips">个&nbsp;&nbsp;&nbsp;&nbsp;人&nbsp;&nbsp;&nbsp;&nbsp;史:</p>
                <div :class="showAssistInquiry ? 'col-md-10' : 'col-md-11' "><input :disabled="editable"
                  v-model="userMedical.userHistory" type="text" placeholder="请填写您的个人史"
                  class="form-control gray-bg input_circular_corner">
                </div>
              </div>

              <div class="form-group">
                <p :class="showAssistInquiry ? 'col-md-2' : 'col-md-1' " class="no-padding left_text_tips">家&nbsp;&nbsp;&nbsp;&nbsp;族&nbsp;&nbsp;&nbsp;&nbsp;史:</p>
                <div :class="showAssistInquiry ? 'col-md-10' : 'col-md-11' ">
                  <input :disabled="editable" v-model="userMedical.familyHistory" type="text" placeholder="请填写您的家族史"
                         class="form-control gray-bg input_circular_corner">
                </div>
              </div>

              <div class="form-group">
                <p :class="showAssistInquiry ? 'col-md-2' : 'col-md-1' " class="no-padding left_text_tips">疫苗接种史:</p>
                <div :class="showAssistInquiry ? 'col-md-10' : 'col-md-11' ">
                  <input :disabled="editable" v-model="userMedical.immunisationHistory" type="text" placeholder="请填写您的疫苗接种史"
                         class="form-control gray-bg input_circular_corner">
                </div>
              </div>

              <div class="form-group">
                <p :class="showAssistInquiry ? 'col-md-2' : 'col-md-1' " class="no-padding left_text_tips">月&nbsp;&nbsp;&nbsp;&nbsp;经&nbsp;&nbsp;&nbsp;&nbsp;史:</p>
                <div :class="showAssistInquiry ? 'col-md-10' : 'col-md-11' ">
                  <input :disabled="editable" v-model="userMedical.menstruationHistory" type="text" placeholder="请填写您的月经史"
                         class="form-control gray-bg input_circular_corner">
                </div>
              </div>

              <div class="form-group">
                <p :class="showAssistInquiry ? 'col-md-2' : 'col-md-1' " class="no-padding left_text_tips">婚&nbsp;&nbsp;&nbsp;&nbsp;育&nbsp;&nbsp;&nbsp;&nbsp;史:</p>
                <div :class="showAssistInquiry ? 'col-md-10' : 'col-md-11' ">
                  <input :disabled="editable" v-model="userMedical.marriageHistory" type="text" placeholder="请填写您的婚育史"
                         class="form-control gray-bg input_circular_corner">
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
      <!--病历信息-->
      <div class="col-md-12 no-padding">
        <div class="ibox float-e-margins no-margins border-bottom">
          <div class="ibox-title no-top-border msg_item_title">
            <h5>病历信息</h5>
          </div>
          <div class="ibox-content no-top-border no_top_padding">
            <form method="get" class="form-horizontal m-r-md m-l-md">

              <div class="form-group">
                <p :class="showAssistInquiry ? 'col-md-2' : 'col-md-1' "
                   class="no-padding left_text_tips">主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诉:</p>
                <div :class="showAssistInquiry ? 'col-md-10' : 'col-md-11' ">
                              <textarea :disabled="editable" v-model="medical.chiefComplaint" id="main_suit" name="main_suit"
                                        class="form-control gray-bg input_circular_corner" rows="5"
                                        required="" aria-required="true" placeholder="请填写主诉"></textarea>
                </div>
              </div>

              <div class="form-group">
                <p :class="showAssistInquiry ? 'col-md-2' : 'col-md-1' "
                   class="no-padding left_text_tips">现&nbsp;&nbsp;病&nbsp;&nbsp;史:</p>
                <div :class="showAssistInquiry ? 'col-md-10' : 'col-md-11' ">
                              <textarea :disabled="editable" v-model="medical.medicalInfo" id="patient_history"
                                        name="patient_history"
                                        class="form-control gray-bg input_circular_corner" rows="5" required=""
                                        aria-required="true" placeholder="请填写现病史"></textarea>
                </div>
              </div>

              <div class="form-group">
                <p :class="showAssistInquiry ? 'col-md-2' : 'col-md-1' "
                   class="no-padding left_text_tips">初步诊断:</p>
                <div :class="showAssistInquiry ? 'col-md-10' : 'col-md-11' ">
                              <textarea :disabled="editable" v-model="medical.diagnosis" id="primary_diag"
                                        name="primary_diag" class="form-control gray-bg input_circular_corner"
                                        rows="5" required="" aria-required="true" placeholder="请填写初步诊断结果"></textarea>
                  <!--<select id="select" name="select"  multiple  data-selectator-keep-open="true">-->
                    <!--<optgroup label="Group one" class="group_one">-->
                      <!--<option value="1" class="option_one" data-subtitle="Et" data-left="<img src='images/ingi.png'>" data-right="1">One</option>-->
                      <!--<option value="2" class="option_two" data-subtitle="To" data-left="<img src='images/runa.png'>" data-right="2">Two</option>-->
                    <!--</optgroup>-->
                    <!--<optgroup label="Group two" class="group_two">-->
                      <!--<option value="3" class="option_three" data-subtitle="Tre" data-left="<img src='images/jogvan.png'>" data-right="3">Three</option>-->
                      <!--<option value="4" class="option_four" selected data-left="<img src='images/noimage.png'>" data-right="4">Four</option>-->
                      <!--<option value="5" class="option_five" selected data-left="<img src='images/noimage.png'>" data-right="5">Five</option>-->
                      <!--<option value="6" class="option_six">Six</option>-->
                    <!--</optgroup>-->
                    <!--<optgroup label="Group three" class="group_three">-->
                      <!--<option value="7" class="option_seven">Seven</option>-->
                    <!--</optgroup>-->
                    <!--<option value="8" class="option_eight" data-subtitle="Otte">Eight</option>-->
                    <!--<option value="9" class="option_nine">Nine</option>-->
                    <!--<option value="10" class="option_ten" selected>Ten</option>-->
                    <!--<option value="11" class="option_eleven" selected>Eleven</option>-->
                    <!--<option value="12" class="option_twelve">Twelve</option>-->
                    <!--<option value="13" class="option_thirteen">Thirteen</option>-->
                    <!--<option value="14" class="option_fourteen">Fourteen</option>-->
                  <!--</select>-->

                </div>
              </div>



              <div class="form-group">
                <p :class="showAssistInquiry ? 'col-md-2' : 'col-md-1' "
                   class="no-padding left_text_tips">体格检查:</p>
                <div :class="showAssistInquiry ? 'col-md-10' : 'col-md-11' ">
                              <textarea :disabled="editable" v-model="medical.physiqueInfo" id="health_checkout"
                                        name="health_checkout"
                                        class="form-control gray-bg input_circular_corner" rows="5" required=""
                                        aria-required="true" placeholder="请填写提体格检查结果"></textarea>
                </div>
              </div>

              <div class="form-group">
                <p :class="showAssistInquiry ? 'col-md-2' : 'col-md-1' "
                   class="no-padding left_text_tips">治疗意见:</p>
                <div :class="showAssistInquiry ? 'col-md-10' : 'col-md-11' ">
                              <textarea :disabled="editable" v-model="medical.treatmentAdvice" id="advice" name="advice"
                                        class="form-control gray-bg input_circular_corner" required=""
                                        rows="5" aria-required="true" placeholder="请填写治疗意见"></textarea>
                </div>
              </div>

              <div v-show="!editable" class="text-center m-t-xl">
                <button id="btn_print_case" type="button" class="btn btn-w-m btn-primary">打印</button>
                <button id="btn_save_case" type="button" class="btn btn-w-m btn-white" @click="submitData">{{registeredOrd}}保存</button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
    <!--右侧辅助问诊部分-->
    <div v-show="showAssistInquiry" class="assist_inquiry_page col-sm-4" style="padding-left: 0">
      <div class="ibox float-e-margins">
        <div class="ibox-title no-top-border">
          <h5>辅助问诊</h5>
          <div class="ibox-tools">
            <a @click="btn_close" class="btn_close un_skip_link">&#10005</a>
          </div>
        </div>
        <div class="ibox-content no_top_padding" style="padding-left: 10px; padding-bottom: 10px">
          <div class="file-manager">
            <ul class="tag-list" style="padding: 0;">
              <li><a>头疼</a></li>
              <li><a>恶心</a></li>
              <li><a>咳嗽</a></li>
              <li><a>流鼻涕</a></li>
              <li><a>咽痛</a></li>

              <li><a>头疼</a></li>
              <li><a>恶心</a></li>
              <li><a>咳嗽</a></li>
              <li><a>流鼻涕</a></li>
              <li><a>咽痛</a></li>

              <li><a>头疼</a></li>
              <li><a>恶心</a></li>
              <li><a>咳嗽</a></li>
              <li><a>流鼻涕</a></li>
              <li><a>咽痛</a></li>

              <li><a>头疼</a></li>
              <li><a>恶心</a></li>
              <li><a>咳嗽</a></li>
              <li><a>流鼻涕</a></li>
              <li><a>咽痛</a></li>
            </ul>
            <h5 class="tag-title" style="display: inline-block;"><a>急性上呼吸道感染</a></h5>
            <ul class="tag-list" style="padding: 0;">
              <li><a>扁桃体肿大</a></li>
              <li><a>咽喉出血</a></li>
              <li><a>季节性流感</a></li>

              <li><a>感冒</a></li>
              <li><a>发热</a></li>
              <li><a>季节性流感</a></li>
              <li><a>过敏性鼻炎</a></li>

              <li><a>感冒</a></li>
              <li><a>发热</a></li>
              <li><a>季节性流感</a></li>
              <li><a>过敏性鼻炎</a></li>

              <li><a>感冒</a></li>
              <li><a>发热</a></li>
              <li><a>季节性流感</a></li>
              <li><a>过敏性鼻炎</a></li>
            </ul>
            <h5 class="tag-title" style="display: inline-block;"><a>急性上呼吸道感染</a></h5>
            <ul class="tag-list" style="padding: 0;">
              <li><a>扁桃体肿大</a></li>
              <li><a>咽喉出血</a></li>
              <li><a>季节性流感</a></li>

              <li><a>感冒</a></li>
              <li><a>发热</a></li>
              <li><a>季节性流感</a></li>
              <li><a>过敏性鼻炎</a></li>

              <li><a>感冒</a></li>
              <li><a>发热</a></li>
              <li><a>季节性流感</a></li>
              <li><a>过敏性鼻炎</a></li>

              <li><a>感冒</a></li>
              <li><a>发热</a></li>
              <li><a>季节性流感</a></li>
              <li><a>过敏性鼻炎</a></li>
            </ul>
            <h5 class="tag-title" style="display: inline-block;"><a>急性上呼吸道感染</a></h5>
            <ul class="tag-list" style="padding: 0;">
              <li><a>扁桃体肿大</a></li>
              <li><a>咽喉出血</a></li>
              <li><a>季节性流感</a></li>

              <li><a>感冒</a></li>
              <li><a>发热</a></li>
              <li><a>季节性流感</a></li>
              <li><a>过敏性鼻炎</a></li>

              <li><a>感冒</a></li>
              <li><a>发热</a></li>
              <li><a>季节性流感</a></li>
              <li><a>过敏性鼻炎</a></li>

              <li><a>感冒</a></li>
              <li><a>发热</a></li>
              <li><a>季节性流感</a></li>
              <li><a>过敏性鼻炎</a></li>
            </ul>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>

</style>
<script>
  export default{

    data(){
      return {
        patientCaseList: '',
        allergy_data: [{allergen: 1, allergicDegree: 1, anaphylaxis: 1}],
        allergyState: 0,
        userMedical:{
          marriageHistory:"",
          userHistory:"",
          immunisationHistory:"",
          familyHistory:"",
          menstruationHistory:"",
        },
        registeredOrdId:"",
        userAllergys:[1,2],
        userAllergyStrs:"",
        hasAllergys:false,
        hasUserMedical:false,
        diagnosisIdStrs:[113943],//初步诊断结果编号数组
        medical:{
          treatmentAdvice:"",
          physiqueInfo:"",
          diagnosis:"",
          medicalInfo:"",
          chiefComplaint:"",
        },
        singleUnit:1,

      }
    },

    mounted: function () {
      $('#select').selectator({
        prefix: 'selectator_',             // CSS class prefix
        height: 'auto',                    // auto or element
        useDimmer: false,                  // dims the screen when option list is visible
        useSearch: true,                   // if false, the search boxes are removed and//   `showAllOptionsOnFocus` is forced to true
        keepOpen: false,                   // if true, then the dropdown will not close when
                  //   selecting options, but stay open until losing focus
        showAllOptionsOnFocus: false,      // shows all options if input box is empty
        selectFirstOptionOnSearch: true,   // selects the topmost option on every search
        searchCallback: function(value){}, // Callback function when enter is pressed and
                                           //   no option is active in multi select box
        labels: {
          search: 'Search...'            // Placeholder text in search box in single select box
        }
      });

      $('.collapse-link').click(function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
          ibox.resize();
          ibox.find('[id^=map-]').resize();
        }, 50);
      });

      /*病例打印*/
      $("#btn_print_case").click(function () {
        $(".case_print_wrapper").printThis();
      });

    },

    created(){
      this.registeredOrdId=localStorage.getItem(this.$names.registeredOrdId);
      console.log( " this.registeredOrdId"+this.registeredOrdId);
      this.request_case();

    },

    computed: {
      showAssistInquiry: function () {
        return this.$store.getters.getWeatherShowAssistInquiry;
      }, isHasAllergys: function () {
        return this.hasAllergys;
      },

      editable: function () {
        return this.$store.getters.getMsgEditable;
      },
      editable1: function () {
        console.log( parent.vueRoot.$store);
        return  parent.vueRoot.$store.getters.getToday;
      },
      registeredOrd(){
        let registeredOrdId=  this.$store.getters.getCompileSuppliersNo;
        if (registeredOrdId){
          this.registeredOrdId=registeredOrdId;
        this.request_case();
        }
        console.log( " this.registeredOrdId"+this.registeredOrdId);
      }
    },

    methods: {
      /*关闭辅助问诊*/
      btn_close: function () {
        this.$store.dispatch('setWeatherShowAssistInquiry', false);
      },

      /*病例数据*/
      request_case: function () {
        var that = this;
        this.$api.get(this, this.$requestApi.showMedical+this.registeredOrdId, "", function (data) {
          if (data.status == '200') {
            that.patientCaseList = data.body.physique;
            if (data.body.userMedical){
            that.userMedical = data.body.userMedical;

            } if (data.body.medical){
              that.medical = data.body.medical;
         }

            that.$parent.hasUserMedical = data.body.hasUserMedical;
            that.$parent.patientCaseList = data.body.data;

          } else {
            console.log(data.body.msg);
          }

        }, function (err) {
          console.log(err);

        });
      },

      addItem: function () {
        if (this.editable) {
          return;
        }
        this.allergy_data.push({allergen: 1, allergicDegree: 1, anaphylaxis: 1})
      },
      submitData: function () {
        let that = this;
        that.$api.post(that, that.$requestApi.orderMedical+that.registeredOrdId,
          {
            bmiNum:that.patientCaseList.bmiNum,
            breathing:that.patientCaseList.breathing,
            chiefComplaint:that.medical.chiefComplaint,
            diastolicPressure:that.patientCaseList.diastolicPressure,
            oxygen:that.patientCaseList.oxygen,
            painScore:that.patientCaseList.painScore,
            physiqueInfo:that.medical.physiqueInfo,
            height:that.patientCaseList.height,
            familyHistory:that.userMedical.familyHistory,
            marriageHistory:that.userMedical.marriageHistory,
            immunisationHistory:that.userMedical.immunisationHistory,
            medicalInfo:that.medical.medicalInfo,
            menstruationHistory:that.userMedical.menstruationHistory,
            hasAllergys:that.hasAllergys,
            diagnosisIdStrs:JSON.stringify(that.diagnosisIdStrs),
            systolicPressure:that.patientCaseList.systolicPressure,
            temperature:that.patientCaseList.temperature,
            treatmentAdvice:that.medical.treatmentAdvice,
            userAllergyStrs:that.userAllergyStrs,
            userHistory:that.userMedical.userHistory,
            weight:that.patientCaseList.weight,

          }, function (data) {
            if(data.body.code==='00'){
              swal({   title: data.body.msg,   text: "", type:that.$enumerationType.success,  timer: that.$enumerationType.timers,   showConfirmButton: false });
            } else {
            console.log(data.body.msg);
          }

        }, function (err) {
          console.log(err);

        });
      },
      selectSingleUnitItem:function (selectedIndex,index) {
       this.allergy_data[index].allergyDegree = selectedIndex;
        this.allergy_data.splice(index, 1,  this. allergy_data[index]);

      },
      getAllergyDegree:function ( allergyDegree) {
        if (typeof allergyDegree==='undefined'){
          return  this. $enumeration.getALLERGY_DEGREE()[1];
        }else {
          let content= this. $enumeration.getALLERGY_DEGREE()[allergyDegree]
         if (content.length>5){
           return  content.substring(0,5)+"...";
         }else {
           return  this. $enumeration.getALLERGY_DEGREE()[allergyDegree];
         }
}
      },
      selectAllergyThingItem:function (selectedIndex,index) {
       this.allergy_data[index].allergyThing = selectedIndex;
        this.allergy_data.splice(index, 1,  this. allergy_data[index]);

      },
      getAllergyThing:function ( allergything) {
        if (typeof allergything==='undefined'){
          return  this. $enumeration.getALLERGY_THING()[1];
        }else {
          let content= this. $enumeration.getALLERGY_THING()[allergything]
         if (content.length>5){
           return  content.substring(0,5)+"...";
         }else {
           return  this. $enumeration.getALLERGY_THING()[allergything];
         }
}
      },
      selectAllergyReactionItem:function (selectedIndex,index) {
       this.allergy_data[index].allergyReaction = selectedIndex;
        this.allergy_data.splice(index, 1,  this. allergy_data[index]);

      },
      getAllergyReaction:function ( allergyreaction) {
        if (typeof allergyreaction==='undefined'){
          return  this. $enumeration.getALLERGY_REACTION()[1];
        }else {
          let content= this. $enumeration.getALLERGY_REACTION()[allergyreaction]
         if (content.length>5){
           return  content.substring(0,5)+"...";
         }else {
           return  this. $enumeration.getALLERGY_REACTION()[allergyreaction];
         }
}
      },
      removeItem: function (index) {
        if (this.editable) {
          return;
        }
        this.allergy_data.splice(index, 1);
      },

    }

  }
</script>
