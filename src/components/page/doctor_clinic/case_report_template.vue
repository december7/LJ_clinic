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
                    <input v-model="patientCaseList.height" type="text" placeholder="身高(cm)"
                           :disabled="editable" class="form-control gray-bg input_circular_corner">
                  </div>
                </div>

                <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding">
                  <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                       class="pull-left no-padding left_text_tips">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重
                  </div>
                  <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                    <input v-model="patientCaseList.weight" type="text" placeholder="体重(kg)"
                           :disabled="editable" class="form-control gray-bg  input_circular_corner">
                  </div>
                </div>

                <div :class="showAssistInquiry ? 'col-md-6 m-t' : 'col-md-4' " class="no-padding">
                  <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                       class="pull-left no-padding left_text_tips">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温
                  </div>
                  <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                    <input v-model="patientCaseList.temperature" type="text" placeholder="体温(℃)"
                           :disabled="editable" class="form-control gray-bg  input_circular_corner">
                  </div>
                </div>

                <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding m-t">
                  <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                       class="pull-left no-padding left_text_tips">BMI&nbsp;&nbsp;&nbsp;指&nbsp;&nbsp;&nbsp;数
                  </div>
                  <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                    <input v-model="patientCaseList.bmiNum" type="text" placeholder="BMI指数"
                           :disabled="editable" class="form-control gray-bg  input_circular_corner">
                  </div>
                </div>

                <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding m-t">
                  <div :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                       class="pull-left no-padding left_text_tips">呼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;吸
                  </div>
                  <div :class="showAssistInquiry ? 'col-md-7' : 'col-md-8' " style="padding-right: 0">
                    <input v-model="patientCaseList.breathing" type="text" placeholder="呼吸(次/分钟)"
                           :disabled="editable" class="form-control gray-bg  input_circular_corner">
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

              <div  v-for="(item, index) in userAllergys" class="form-group" v-show="String(hasAllergys)=='true'">
                <div :class="showAssistInquiry ? 'col-md-6' : 'col-md-4' " class="no-padding">
                  <p :class="showAssistInquiry ? 'col-md-4' : 'col-md-3' "
                     class="no-padding left_text_tips">过&nbsp;&nbsp;&nbsp;&nbsp;敏&nbsp;&nbsp;&nbsp;&nbsp;源:</p>
                  <div :class="showAssistInquiry ? 'col-md-8' : 'col-md-6' ">
                    <div class="input-group-btn">
                      <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{getAllergyThing(item.allergyThing)}}<span class="goods_tips_down caret"></span>
                      </button>
                      <ul  class="dropdown-menu attopic" style="width: 100%" >
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
                      <ul class="dropdown-menu attopic" style="width: 100%" >
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
                      <ul class="dropdown-menu attopic" style="width: 100%" >
                        <li @click="selectSingleUnitItem(i,index)" v-for="(titleItem, i) in $enumeration.getALLERGY_DEGREE()">
                          <a :class="{selected_item : item.allergyDegree == i}" class="no-padding" style="text-align: center">{{titleItem}}</a>
                        </li>

                      </ul>
                    </div>
                  </div>
                  <div class="pull-right" style="line-height: 34px; padding-right: 15px">
                    <a @click="addItem()" style="padding: 0 10px;" v-show="userAllergys.length == (index + 1)">➕</a>
                    <a @click="removeItem(index)" v-show="userAllergys.length > 1">➖</a>
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

                  <div class="input-group-btn">
                    <input  data-toggle="dropdown"  placeholder="请填写初步诊断结果" type="text" class="form-control gray-bg input_circular_corner"  v-model="medical.diagnosis"  @focus="getListDiseaseName(medical.diagnosis)" @input="getListDiseaseName(medical.diagnosis)">
                    <ul  v-show="symptomInfo.length>0"  class="attopic dropdown-menu" style="width: 100%"  >
                      <li @click="selectDosageFormItem(titleItem,index)" v-for="(titleItem, index) in symptomInfo">
                        <a  class="no-padding" style="text-align: center">{{titleItem.symptomName}}</a>
                      </li>
                    </ul>


                  </div>


                </div>
              </div>
              <div class="form-group" v-show="selects.length>0">
                <p :class="showAssistInquiry ? 'col-md-2' : 'col-md-1' "
                   class="no-padding left_text_tips"> </p>
                <div :class="showAssistInquiry ? 'col-md-10' : 'col-md-11' ">
                  <span  style="margin-right: 10px"  v-for="(select,index) in selects">{{select.symptomName}}  <a   @click="deleteSelect(index)" class="fa fa-times-circle"></a></span>

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
                <button id="btn_save_case" type="button" class="btn btn-w-m btn-white" @click="submitData">{{preliminaryDiagnosis}}{{chiefComplaint}}{{registeredOrd}}保存</button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
    <!--右侧辅助问诊部分-->
    <assist-inquiry v-show="showAssistInquiry"></assist-inquiry>
  </div>
</template>
<style>

</style>
<script>
  import assistInquiry from './assistInquiry.vue';
  export default{
    components:{
      assistInquiry
    },

    data(){
      return {
        patientCaseList: {
          bmiNum:"",
          breathing:"",
          diastolicPressure:"",
          oxygen:"",
          painScore:"",
          height:"",
          systolicPressure:"",
          temperature:"",
          weight:"",
          pulse:"",

        },
        allergyState: 0,
        selects: [],
        userMedical:{
          marriageHistory:"",
          userHistory:"",
          immunisationHistory:"",
          familyHistory:"",
          menstruationHistory:"",
        },
        registeredOrdId:"",
        userAllergys:[{allergyDegree: 1, allergyReaction: 1, allergyThing: 1}],
        hasAllergys:'false',
        diagnosisIdStrs:[],//初步诊断结果编号数组
        medical:{
          treatmentAdvice:"",
          physiqueInfo:"",
          diagnosis:"",
          medicalInfo:"",
          chiefComplaint:"",
        },
        singleUnit:1,
        symptomInfo:[],

      }
    },

    mounted: function () {
      var that=this;
      $(".selectator_input").bind('input porpertychange',function(){
       that.getListDiseaseName($(this).val());
        console.log("==============");

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
      },
      getHasAllergys: function () {
        console.log(this.hasAllergys+"");
        console.log( String(this.hasAllergys)=='true');
        return  String(this.hasAllergys)=='true';
      },

      editable: function () {
        return this.$store.getters.getMsgEditable;
      },
      chiefComplaint: function () {
        let data=this.$store.getters.getChiefComplaint[0];
        let index=-1;
        if (typeof(data) != "undefined"){
          let chiefComplaints =this. medical.chiefComplaint.split(" ");
          if (chiefComplaints.length==1){
            this.medical.chiefComplaint += data + " ";
          }else {
            this.medical.chiefComplaint="";
            for (let i in  chiefComplaints) {
              if (chiefComplaints[i] === data) {
                chiefComplaints.splice(i, 1);
                index=i;
              } else {
                this.medical.chiefComplaint += chiefComplaints[i] + " ";
              }

            };
            if (index==-1){
              this.medical.chiefComplaint += data + " ";
            }
          }
        }
        this.$store.dispatch('set_chief_complaint', []);
        return;
      },
      preliminaryDiagnosis: function () {
        let data=   this.$store.getters.getPreliminaryDiagnosis[0];
        let that=this;
        let index=-1;
        let dataArr=[];

        if (typeof (data)!= "undefined"){
          if ( that.selects.length===0){
            that.selects.push(data);
          }else {
            dataArr=  that.selects;
            that.selects=[];
            for (let i in  dataArr) {

              if (  dataArr[i].symptomName === data.symptomName) {
                dataArr.splice(i, 1);
                index=i;
              }

            };
            that.selects=  dataArr;
            if (index==-1){

              that.selects .push( data);
            }
          }

        }
        that.$store.dispatch('set_preliminary_diagnosis', []);
        return "";
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

      selectDosageFormItem:function (symptom,selectedIndex) {
        console.log(selectedIndex);
        console.log(JSON.stringify(symptom));
        this.medical.diagnosis='';
        this.selects.push(symptom);
        console.log(console.log(this.selects));
      },
      getListDiseaseName:function (name) {
        let that = this;
        that.$api.get(that, that.$requestApi.listdiseaseName, {keyLike:name}, function (data) {
          if (data.body.code == '00') {
           that.  symptomInfo= data.body.data;
          } else {
            console.log(data.body.msg);
          }

        }, function (err) {
          console.log(err);
        });
      },

      /*病例数据*/
      request_case: function () {
        var that = this;
        this.$api.get(this, this.$requestApi.showMedical+this.registeredOrdId, "", function (data) {
          if(data.body.code == '00'){
            if ( data.body.physique){

            that.patientCaseList = data.body.physique;
            }else {
              that.patientCaseList={
                bmiNum:"",
                breathing:"",
                diastolicPressure:"",
                oxygen:"",
                painScore:"",
                height:"",
                systolicPressure:"",
                temperature:"",
                weight:"",
                pulse:"",

              }
            }
            if (data.body.userMedical){
            that.userMedical = data.body.userMedical;
              that.selects=[];
            } else {
                 that.userMedical={
                   marriageHistory:"",
                   userHistory:"",
                   immunisationHistory:"",
                   familyHistory:"",
                   menstruationHistory:"",
                 }
              that.selects=[];
            }
            if (data.body.medical){
              that.medical = data.body.medical;
         }else {
              that.medical=   {
                treatmentAdvice:"",
                  physiqueInfo:"",
                diagnosis:"",
                medicalInfo:"",
                chiefComplaint:"",
              };
            }

            that.$parent.hasAllergys = data.body.hasUserMedical;
            that.hasAllergys =data.body.hasUserMedical;
            for (let i in data.body.userAllergys){
              that.userAllergys[i]={
                allergyDegree:  data.body.userAllergys[i].allergyDegree,
                allergyReaction:  data.body.userAllergys[i].allergyReaction,
                allergyThing:  data.body.userAllergys[i].allergyThing,
              };
            }
            console.error( that.hasAllergys);
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
        this.userAllergys.push({allergyDegree: 1, allergyReaction: 1, allergyThing: 1})
      },
      submitData: function () {
        let that = this;
        for (let item in that.selects){
          that. diagnosisIdStrs.push(that.selects[item].symptomId);
        }
 if (that.diagnosisIdStrs.length==0){
   return   swal({title: that.$toastContent.toastDiagnosisIdStrs, text: "", type: that.$enumerationType.error, timer: that.$enumerationType.timers, showConfirmButton: false});

 }
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
            userAllergyStrs:JSON.stringify(that.userAllergys),
            userHistory:that.userMedical.userHistory,
            weight:that.patientCaseList.weight,
            pulse:that.patientCaseList.pulse,

          }, function (data) {
            if(data.body.code == '00'){
              swal({   title: data.body.msg,   text: "", type:that.$enumerationType.success,  timer: that.$enumerationType.timers,   showConfirmButton: false });
            } else {
              swal({   title: data.body.msg,   text: "", type:that.$enumerationType.error,  timer: that.$enumerationType.timers,   showConfirmButton: false });

            }

        }, function (err) {
            swal({   title: that.$toastContent.requestError,   text: "", type:that.$enumerationType.error,  timer: that.$enumerationType.timers,   showConfirmButton: false });

          });
      },
      selectSingleUnitItem:function (selectedIndex,index) {
       this.userAllergys[index].allergyDegree = selectedIndex;
        this.userAllergys.splice(index, 1,  this. userAllergys[index]);

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
       this.userAllergys[index].allergyThing = selectedIndex;
        this.userAllergys.splice(index, 1,  this. userAllergys[index]);

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
       this.userAllergys[index].allergyReaction = selectedIndex;
        this.userAllergys.splice(index, 1,  this. userAllergys[index]);

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
        this.userAllergys.splice(index, 1);
      },
      deleteSelect: function (index) {
        this.selects.splice(index, 1 );
        console.log("deleteSelect");
      },

    }

  }
</script>
