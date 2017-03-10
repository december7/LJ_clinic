<template>
   <div>
     <!--顶部操作栏-->
     <div class="today_patient_top_container">
       <!--左侧切换标题栏-->
       <div class="today_patient_top_left">
         <p class="pull-left m-l-md" style="line-height: 40px;">历史病例</p>
       </div>
       <div class="pull-right m-r-md" style="line-height: 40px">
         <a @click="back">返回上一级</a>
       </div>
     </div>

     <!--中间内容部分-->
     <div class="wrapper wrapper-content animated fadeInRight no_top_padding">
       <div class="row" style="padding: 0 15px;">
         <!--顶部信息栏-->
         <div class="col-sm-12 no-padding">
           <div class="ibox-title no-top-border gray-bg pull-left" style="padding-left: 0;">
             <h5 class="red-bg" style="margin: 2px 10px 0 0;" v-if=" historyCaseList.isEmergency==1" >急</h5>
             <a class="un_skip_link" data-toggle="modal" data-target="#perfect_information_modal" style="border-bottom: 1px solid blue">
               <small>{{historyCaseList.userName}}</small>
               <small class="m-l-sm">{{$stringUtils.dateAge(historyCaseList.birthdayDate)}}岁 / {{ $stringUtils.dateSex(historyCaseList.userSex )}} / {{historyCaseList.billId}}</small>
             </a>
             <small class="m-l-sm text-danger" v-if="hasUserMedical">该患者有过敏史!</small>
           </div>
         </div>
         <!--内容区-->
         <div class="ibox float-e-margins">
           <div class="ibox-content no-padding no-borders gray-bg">
             <div class="row">
               <div class="col-sm-12">
                 <!--病史信息-->
                 <div class="col-md-12 no-padding" style="margin-bottom: 10px">
                   <div class="ibox float-e-margins no-margins item_module">
                     <div class="ibox-title no-top-border msg_item_title border-bottom">
                       <h5>病史信息</h5>
                     </div>
                     <div class="ibox-content no-borders no_top_padding" style="padding-bottom: 0">
                       <form method="get" class="form-horizontal m-r-md m-l-md">

                         <div class="form-group item_line no-m-b" v-for="usrAllergy in usrAllergys">
                           <div class="col-md-4 no-padding">
                             <p class="col-md-3 no-padding">过敏史:</p>
                             <div class="col-md-6">{{usrAllergy.allergyThing}}青霉素过敏</div>
                           </div>

                           <div class="col-md-4 no-padding">
                             <p class="col-md-3 no-padding">过敏反应:</p>
                             <div class="col-md-6">{{usrAllergy.allergyReaction}}呕吐 休克</div>
                           </div>

                           <div class="col-md-4 no-padding">
                             <p class="col-md-3 no-padding">过敏程度:</p>
                             <div class="col-md-6">{{usrAllergy.allergyDegree}}非常严重</div>
                           </div>

                         </div>

                         <div class="form-group item_line no-m-b">
                           <p class="col-md-1 no-padding">个人史:</p>
                           <div class="col-md-11">
                             {{usrMedical.userHistory}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b">
                           <p class="col-md-1 no-padding">家族史:</p>
                           <div class="col-md-11">
                             {{usrMedical.familyHistory}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b">
                           <p class="col-md-1 no-padding">疫苗接种史:</p>
                           <div class="col-md-11">
                             {{usrMedical.immunisationHistory}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-bottom: 0">
                           <p class="col-md-1 no-padding">月经史:</p>
                           <div class="col-md-11">
                             {{usrMedical.menstruationHistory}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="border-bottom: none !important;">
                           <p class="col-md-1 no-padding">婚育史:</p>
                           <div class="col-md-11">
                             {{usrMedical.marriageHistory}}
                           </div>
                         </div>

                       </form>
                     </div>
                   </div>

                 </div>
                 <!--病例详情-->
                 <div v-for="itemData in registereds" class="col-md-12 no-padding" style="margin-bottom: 10px; border: 1px solid #e7eaec;">
                   <div class="ibox float-e-margins no-margins">
                     <div class="ibox-title no-top-border msg_item_title border-bottom">
                       <h5>{{$stringUtils.dateFormat(itemData.createDate)}} / itemData.departName / {{itemData.userName}}</h5>

                       <p class="pull-left wrapper text-danger">[感冒]</p>
                       <a @click="add_suggest(itemData.suggest)" data-toggle="modal" data-target="#layer" style="border-bottom: 1px solid #00b7ee">增加建议</a>
                       <div class="ibox-tools">
                         <a @click="collapse($event)" class="collapse-link">
                           <i class="fa fa-chevron-down"></i>
                         </a>
                       </div>
                     </div>
                     <div class="ibox-content no-borders no-padding"  >

                       <form method="get" class="form-horizontal">

                         <div class="ibox float-e-margins no-margins m-r-md m-l-md">
                           <div class="ibox-title no-top-border no-padding border-bottom" style="margin-left: 25px; line-height: 40px; min-height: 40px !important;">
                             <p style="display: inline-block;">基本信息</p>
                             <div class="ibox-tools" style="padding-right: 15px">
                               <a @click="collapse($event)">
                                 <i style="display: none;" class="fa fa-chevron-up"></i>
                                 <small class="collapse_text" style="color: #00a2d4">展示</small>
                               </a>
                             </div>
                           </div>
                           <div class="ibox-content no-top-border" style="padding: 0 30px 10px 40px;">
                             <div class="form-group" >
                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="col-md-3 pull-left no-padding text_tips">身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;高</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{itemData.stature}}cm
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips text-center">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{itemData.weight}}kg
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips text-center">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{itemData.heat}}℃
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips">BMI指数</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{itemData.massIndex}}
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips text-center">呼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;吸</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{itemData.breathe}} 次/分钟
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips text-center">氧饱和度</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{itemData.oxygenSaturation}}%
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips">疼痛评分</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{itemData.painScore}}
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips text-center">脉&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;搏</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{itemData.pulse}}
                                 </div>
                               </div>

                               <div class="col-sm-12 no-padding" style="line-height: 40px">
                                 <div class="col-md-4 no-padding">
                                   <div class="pull-left col-md-3 no-padding text_tips">血&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;压</div>
                                   <div class="col-md-8" style="padding-right: 0">
                                     {{itemData.systolicPressure}}mmHg / {{itemData.diastolicPressure}}mmHg
                                   </div>
                                 </div>
                               </div>

                             </div>
                           </div>
                         </div>

                         <div class="item_line" style="margin-left: 25px">病例信息</div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诉:</p>
                           <div class="col-md-11">
                             {{itemData.mainSuit}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">现&nbsp;&nbsp;病&nbsp;&nbsp;史:</p >
                           <div class="col-md-11">
                             {{itemData.presentIllness}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">体格检查:</p>
                           <div class="col-md-11">
                             {{itemData.physicalExamination}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">初步诊断:</p>
                           <div class="col-md-11">
                             {{itemData.tentativeDiagnosis}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">治疗意见:</p>
                           <div class="col-md-11">
                             {{itemData.treatmentSuggest}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">治&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疗:</p>
                           <div class="col-md-11">

                             <div v-for="(item, position) in itemData.treatmentList" class="col-md-12 no-padding">
                               <div class="col-md-4 no-padding">
                                 {{position + 1}}.{{item.treatmentName}}
                               </div>
                               <div class="col-md-4 no-padding">
                                 {{item.treatemntDays}}天
                               </div>
                               <div :class="{'text-danger' : item.treatmentState == 0}" class="col-md-1 pull-right">
                                 {{item.treatmentState == 0 ? '未完成' : '已完成'}}
                               </div>
                             </div>

                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">西药处方:</p>
                           <div class="col-md-11">

                             <div v-for="(item, position) in itemData.westernMedicine" class="col-md-12 no-padding">
                               <div class="col-md-4 no-padding">
                                 {{position + 1}}.{{item.medicineName}}
                               </div>
                               <div class="col-md-3 no-padding">
                                 {{item.medicineCount}}盒
                               </div>
                               <div class="col-md-3 no-padding">
                                 {{item.medicineUsage}}
                               </div>
                               <div :class="{'text-danger' : item.medicineState == 0}" class="col-md-1 pull-right">
                                 {{item.medicineState == 0 ? '未领取' : '已领取'}}
                               </div>
                             </div>

                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">中药处方:</p>
                           <div class="col-md-11">

                             <div v-for="(item, position) in itemData.chineseMedicine" class="col-md-12 no-padding">
                               <div class="col-md-4 no-padding">
                                 {{position + 1}}.{{item.medicineName}}
                               </div>
                               <div class="col-md-3 no-padding">
                                 {{item.medicineCount}}g
                               </div>
                               <div class="col-md-3 no-padding">
                                 {{item.medicineUsage}}
                               </div>
                               <div :class="{'text-danger' : item.medicineState == 0}" class="col-md-1 pull-right">
                                 {{item.medicineState == 0 ? '未领取' : '已领取'}}
                               </div>
                             </div>

                           </div>
                         </div>

                         <div v-show="itemData.suggest.length > 0" class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">增加建议:</p>
                           <div class="col-md-11">
                             <div v-for="(item, position) in itemData.suggest">
                               {{position + 1}}. {{item.suggestContent}}
                             </div>
                           </div>

                         </div>
                       </form>
                     </div>
                   </div>
                 </div>

               </div>
             </div>
           </div>

         </div>

       </div>
     </div>

     <!--增加建议模态框-->
     <div class="modal fade" role="dialog" id="layer">
       <div class="modal-dialog">
         <div class="modal-content">
           <div class="modal-header">
             <button type="button" class="close" data-dismiss="modal">
               <span>&times;</span>
             </button>
             <h5 class="modal-title">增加建议</h5>
           </div>
           <div class="modal-body no-padding">

             <div style="width: 100%; padding: 10px 20px">
               <textarea v-model="proposal" class="model_input"></textarea>
             </div>
             <div id="dialog-body" class="text-center m-b">
               <button @click="saveSuggest()" class="btn btn-primary btn-w-m" data-dismiss="modal">{{compileSuppliers}}完成</button>
               <button class="btn btn-default btn-w-m" data-dismiss="modal">取消</button>
             </div>

           </div>
         </div>
       </div>
     </div>

     <!--完善信息模态框-->
     <prefect></prefect>
   </div>
</template>

<style>
  * {
    margin:0;
    padding: 0;
  }

  p {
    margin:0;
  }

  button {
    outline: none !important;
  }

  .today_patient_top_container {
    width:100%;
    height: 40px;
    background-color: white;
  }

  .today_patient_top_left {
    display: inline-block;
  }

  .today_patient_top_left ul {
    margin-bottom: 0;
  }

  .today_patient_top_left ul li {
    display: inline-block;
    margin:0 10px;
    padding: 0 10px;
    line-height: 39px;
  }

  /*.text_tips {*/
    /*cursor: pointer;*/
  /*}*/

  .item_line{
    line-height: 40px;
    border-bottom: 1px solid #F4F4F4;
  }


  .today_patient_top_left ul li:first-child {
    margin-left: 20px;
  }

  .search_patient_container input {
    border:0;
    margin:0;
    padding: 0;
    outline: none;
  }

  .ibox_title_patient_msg p {
    display: inline;
  }

  .patient_state_img img {
    width: 35px;
    height: 35px;
  }

  .history_patient_title_left_container p {
    display: inline;
    float: left;
    margin-right: 10px
  }

  .history_patient_title_right_container input {
    border: none;
    outline: none;
    width: 120px;
    height: 20px;
    text-align: center;
    border-bottom: 1px solid #333333
  }

  .doctor_workbench_top_right p {
    line-height: 30px;
    font-size: 16px;
    color: deepskyblue;
  }

  .content_top_right_container p {
    line-height: 30px;
  }

  .item_module {
    padding-bottom: 0;
    margin-bottom: 10px;
    border-radius: 5px;
    /*border: 1px solid #999999;*/
  }

  .msg_item_title {
    padding-left: 0;
  }

  .msg_item_title h5 {
    padding-left: 20px;
    border-left: 4px solid #314268;
  }

  .no_top_padding {
    padding-top: 0;
  }

  .no-m-b {
    margin-bottom: 0 !important;
  }

  .text_tips {
    display: inline-block;
  }

  .input_border{
    border-radius: 5px;
    border:none;
  }

  .model_input{
    border: none;
    width: 100%;
    height: 200px;
    background-color: #F4F4F4;
    outline: none;
    padding: 10px;
  }

</style>
<script>
  import prefect from '../doctor_registered/registered_modal_perfect.vue'
    export default{

      data(){
        return{
          historyCaseList: '',
          suggest:[],
          proposal:'',
          itemSuggest:[],
          usrAllergys:[{}],
          compileSuppliersNo:"",
          hasUserMedical:"",
          registereds:"",
          usrMedical:""
        }
      },

      mounted: function() {
      },

      created() {

        this.$store.dispatch('setEditable', true);
      },

      components:{prefect},
      computed : {

        compileSuppliers(){
          this. compileSuppliersNo=this.$store.getters.getCompileSuppliersNo;
          if (this. compileSuppliersNo){
            return  this.request_history_case(this. compileSuppliersNo);
          }else {
            return "";
          }
        }

      },
      methods:{
        back:function () {
          history.back();
        },

        add_suggest:function (suggest) {
          this.itemSuggest = suggest;
          this.proposal = '';
        },

        saveSuggest:function () {
          if (this.proposal != null) {
            this.itemSuggest.push({suggestContent: this.proposal})
          }
        },

        collapse:function (event) {

          var ibox = $(event.currentTarget).closest('div.ibox');
          var button = $(event.currentTarget).find('i');
          var content = ibox.find('div.ibox-content');
          content.slideToggle(300);
          button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
          if (button.hasClass('fa-chevron-up')) {
            $(event.currentTarget).find("small").html('展示');
          } else {
            $(event.currentTarget).find('small').html('收起');
          }
          ibox.toggleClass('').toggleClass('border-bottom');
          setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
          }, 50);
        },

        request_history_case:function (registeredOrdId) {
          var that=this;
          this.$api.get(this,this.$requestApi.historyMedicals+registeredOrdId,"",function  (data) {
            if(data.status=='200'){
              that.historyCaseList = data.body.data;
              that.usrMedical = data.body.usrMedical;
              that.hasUserMedical = data.body.hasUserMedical;
              that.usrAllergys = data.body.usrAllergys;
              that.registereds = data.body.registereds;
              console.log(that.historyCaseList);
            }else{
              console.log(data.body.msg);
            }

          },function (err) {
            console.log(err);

          });
        },
      }
    }
</script>
