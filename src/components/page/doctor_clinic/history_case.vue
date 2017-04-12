<template>
   <div>
     <!--顶部操作栏-->
     <div class="today_patient_top_container">
       <!--左侧切换标题栏-->
       <div class="today_patient_top_left">
         <p class="pull-left m-l-md" style="line-height: 40px;">历史病历</p>
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
             <h5 class="red-bg" style="margin: 2px 10px 0 0;" v-if=" historyCaseList.isEmergency==2" >急</h5>
             <a class="un_skip_link" data-toggle="modal" data-target="#perfect_information_modal" @click="prefectUser(historyCaseList.userId)" style="border-bottom: 1px solid blue">
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
                             <div class="col-md-6">{{$enumeration.getParseValue($enumeration.getALLERGY_THING(),usrAllergy.allergyThing) }}</div>
                           </div>

                           <div class="col-md-4 no-padding">
                             <p class="col-md-3 no-padding">过敏反应:</p>
                             <div class="col-md-6">{{$enumeration.getParseValue($enumeration.getALLERGY_REACTION(),usrAllergy.allergyReaction) }} </div>
                           </div>

                           <div  class="col-md-4 no-padding">
                             <p class="col-md-3 no-padding"  >过敏程度:</p>
                             <div class="col-md-6">  {{$enumeration.getParseValue($enumeration.getALLERGY_DEGREE(),usrAllergy.allergyDegree) }} </div>
                           </div>

                         </div>

                         <div v-if="getUsrMedicalInfor(usrMedical.userHistory) " class="form-group item_line no-m-b">
                           <p class="col-md-1 no-padding">个人史:</p>
                           <div class="col-md-11">
                             {{usrMedical.userHistory}}
                           </div>
                         </div>
                         <div v-if="usrMedical=='' " class="form-group item_line no-m-b">无
                         </div>

                         <div  v-if="getUsrMedicalInfor(usrMedical.familyHistory) " class="form-group item_line no-m-b">
                           <p class="col-md-1 no-padding">家族史:</p>
                           <div class="col-md-11">
                             {{usrMedical.familyHistory}}
                           </div>
                         </div>

                         <div v-if="getUsrMedicalInfor(usrMedical.immunisationHistory)  " class="form-group item_line no-m-b">
                           <p class="col-md-1 no-padding">疫苗接种史:</p>
                           <div class="col-md-11">
                             {{usrMedical.immunisationHistory}}
                           </div>
                         </div>

                         <div v-if="getUsrMedicalInfor(usrMedical.menstruationHistory) " class="form-group item_line no-m-b" style="margin-bottom: 0">
                           <p class="col-md-1 no-padding">月经史:</p>
                           <div class="col-md-11">
                             {{usrMedical.menstruationHistory}}
                           </div>
                         </div>

                         <div v-if="getUsrMedicalInfor(usrMedical.marriageHistory)  " class="form-group item_line no-m-b" style="border-bottom: none !important;">
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
                 <div  v-for="(itemData,index) in registereds" class="col-md-12 no-padding" style="margin-bottom: 10px; border: 1px solid #e7eaec;">
                   <div class="ibox float-e-margins no-margins">
                     <div class="ibox-title no-top-border msg_item_title border-bottom">
                       <h5>{{$stringUtils.dateFormat(itemData.createDate)}} / {{itemData.departName}} / {{itemData.userName}}</h5>

                       <p class="pull-left wrapper text-danger" v-if="getUsrMedicalInfor( itemData.diagnosis)  ">[{{itemData.diagnosis}}]</p>
                       <a v-if="getUsrMedicalInfor( itemData.diagnosis)  " @click="add_suggest(itemData.registeredOrdId)" data-toggle="modal" data-target="#layer" style="border-bottom: 1px solid #00b7ee">增加建议</a>
                       <div class="ibox-tools">
                         <a @click="collapseRegistered($event,itemData)" class="collapse-link">
                           <i class="fa fa-chevron-down"></i>
                         </a>
                       </div>
                     </div>
                     <div v-if="getUsrMedicalInfor( itemData.diagnosis)  " class="ibox-content no-borders no-padding" style="display: none"  >

                       <form method="get"   class="form-horizontal">

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
                                   {{registered.physique.height}}cm
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips text-center">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{registered.physique.weight}}kg
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips text-center">体&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{registered.physique.temperature}}℃
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips">BMI指数</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{registered.physique.bmiNum}}
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips text-center">呼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;吸</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{registered.physique.breathing}} 次/分钟
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips text-center">氧饱和度</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{registered.physique.oxygen}}%
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips">疼痛评分</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{registered.physique.painScore}}分
                                 </div>
                               </div>

                               <div class="col-md-4 no-padding" style="line-height: 40px">
                                 <div class="pull-left col-md-3 no-padding text_tips text-center">脉&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;搏</div>
                                 <div class="col-md-8" style="padding-right: 0">
                                   {{registered.physique.pulse}} 次/分钟
                                 </div>
                               </div>

                               <div class="col-sm-12 no-padding" style="line-height: 40px">
                                 <div class="col-md-4 no-padding">
                                   <div class="pull-left col-md-3 no-padding text_tips">血&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;压</div>
                                   <div class="col-md-8" style="padding-right: 0">
                                     {{registered.physique.systolicPressure}}mmHg / {{registered.physique.diastolicPressure}}mmHg
                                   </div>
                                 </div>
                               </div>

                             </div>
                           </div>
                         </div>

                         <div class="item_line" style="margin-left: 25px">病历信息</div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诉:</p>
                           <div class="col-md-11">
                             {{registered.usrMedical.chiefComplaint}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">现&nbsp;&nbsp;病&nbsp;&nbsp;史:</p >
                           <div class="col-md-11">
                             {{registered.usrMedical.medicalInfo}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">体格检查:</p>
                           <div class="col-md-11">
                             {{registered.usrMedical.physiqueInfo}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">初步诊断:</p>
                           <div class="col-md-11">
                             {{registered.usrMedical.diagnosis}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">治疗意见:</p>
                           <div class="col-md-11">
                             {{registered.usrMedical.treatmentAdvice}}
                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">治&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疗:</p>
                           <div class="col-md-11">

                             <div v-for="(item, position) in registered.projects" class="col-md-12 no-padding">
                               <div class="col-md-4 no-padding">
                                 {{position + 1}}.{{item.feeName}}
                               </div>
                               <div class="col-md-4 no-padding">
                                 {{item.amount}}天
                               </div>
                               <div :class="{'text-danger' : item.state == 1}" class="col-md-1 pull-right">
                                 {{item.state == 1 ? '未完成' : '已完成'}}
                               </div>
                             </div>

                           </div>
                         </div>

                   <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">西药处方:</p>
                           <div class="col-md-11">

                             <div v-for="(item, position) in registered.westernMedicine" class="col-md-12 no-padding">
                               <div class="col-md-4 no-padding">
                                 {{position + 1}}.{{item.prodName}}
                               </div>
                               <div class="col-md-3 no-padding">
                                 {{item.amount}}{{ $enumeration.getParseValue($enumeration.getPROD_UNITE(),item.doseUnit) }}

                               </div>
                               <div class="col-md-3 no-padding">
                                 {{$enumeration.getParseValue($enumeration.getUSAGE_TYPE(),item.usageType)  }},  {{$enumeration.getParseValue($enumeration.getPROD_FREQUENCY(),item.frequency)  }},
                               </div>
                               <div :class="{'text-danger' : item.state == 1}" class="col-md-1 pull-right">
                                 {{item.state == 1 ? '未领取' : '已领取'}}
                               </div>
                             </div>

                           </div>
                         </div>

                         <div class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">中药处方:</p>
                           <div class="col-md-11">

                             <div v-for="(item, position) in registered.chineseMedicine" class="col-md-12 no-padding">
                               <div class="col-md-4 no-padding">
                                 {{position + 1}}.{{item.prodName}}
                               </div>
                               <div class="col-md-3 no-padding">
                                 {{item.singleDose}}{{ $enumeration.getParseValue($enumeration.getPROD_UNITE(),item.doseUnit) }}
                               </div>
                               <div class="col-md-3 no-padding">
                                 {{$enumeration.getParseValue($enumeration.getUSAGE_TYPE(),item.usageType)  }},  {{$enumeration.getParseValue($enumeration.getPROD_FREQUENCY(),item.frequency)  }},

                               </div>
                               <div :class="{'text-danger' : item.state == 1}" class="col-md-1 pull-right">
                                 {{item.state == 1 ? '未领取' : '已领取'}}
                               </div>
                             </div>

                           </div>
                         </div>

                         <div v-show="registered.usrMedical.doctorSuggest " class="form-group item_line no-m-b" style="margin-left: 25px; padding-right: 15px">
                           <p class="col-md-1 no-padding text_tips">增加建议:</p>
                           <div class="col-md-11">
                             <div>
                              {{registered.usrMedical.doctorSuggest}}
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
             <h5 class="modal-title" >增加建议</h5>
           </div>
           <div class="modal-body no-padding">

             <div style="width: 100%; padding: 10px 20px">
               <textarea v-model=" doctorSuggest" class="model_input"></textarea>
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
     <prefect :userId="userId"></prefect>
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
          proposal:'',
          userId:0,
          doctorSuggest:"",
          usrAllergys:[],
          compileSuppliersNo:"",
          hasUserMedical:"",
          registereds:[],
          usrMedical:"",
          registeredOrdId:"",
          registered:{
            usrMedical:{},
            physique:{},
            westernMedicine:[],
            chineseMedicine:[],
            projects:[],
          },

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
          this. compileSuppliersNo=this.$store.getters.getCompileUserId;
          if (this. compileSuppliersNo){
            return  this.request_history_case(this. compileSuppliersNo);
          }else {
            return "";
          }
        }

      },
      methods:{
        getUsrMedicalInfor:function(userInfor){
          if (typeof  userInfor!="undefined"){
          return userInfor .length>0
          }
        },
        back:function () {
          this.$router.back();
        },

        add_suggest:function (registeredOrdId) {
          this.registeredOrdId = registeredOrdId;
          this.proposal = '';
        },

        prefectUser:function (userId) {
          this.userId = userId;
        },
        saveSuggest:function () {
          if (this. doctorSuggest  ) {
            let that=this;
            that.$api.post(that,that.$requestApi.doctorSuggest+that.registeredOrdId,{doctorSuggest:this.doctorSuggest},function  (data) {
              if(data.data.code=='00'){
                swal({   title: data.body.msg,   text: "", type: "success",  timer: 2000,   showConfirmButton: false });

              }else{
                swal({   title: data.body.msg,   text: "", type: "error",  timer: 2000,   showConfirmButton: false });

                console.log(data.body.msg);

              }

            },function (err) {
              console.log(err);

            });
          }
        },
        collapseRegistered:function (event,itemData ) {
          this.collapse(event);
          let that=this;
          that.$api.get(that,that.$requestApi.historyMedical+itemData.registeredOrdId,"",function  (data) {
            if(data.data.code=='00'){
              that.registered.physique = data.body.physique;
              that.registered.usrMedical = data.body.data;
              that.registered.projects = data.body.projects;
              let prods = data.body.prods;
              for (let i  in prods){
                if (prods[i].prodType==1){
                  that .registered.westernMedicine.push(prods[i]);
                }else {
                  that.registered. chineseMedicine.push(prods[i]);
                }
              }
            }else{
              console.log(data.body.msg);
            }

          },function (err) {
            console.log(err);

          });

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
          that.$api.get(that,that.$requestApi.historyMedicals+registeredOrdId,"",function  (data) {
            if(data.data.code=='00'){
              that.historyCaseList = data.body.data;
              that.usrMedical = data.body.usrMedical;
              that.hasUserMedical = data.body.hasUserMedical;
              that.usrAllergys = data.body.usrAllergys;
              that.registereds = data.body.registereds;
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
