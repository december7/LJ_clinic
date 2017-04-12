<template xmlns:v-validate="http://www.w3.org/1999/xhtml">

  <div class="modal inmodal fade" id="add_patient" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <h4 style="margin: 15px 25px; display: inline-block">添加患者</h4>
        <button @click="close" type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
          aria-hidden="true">&times;</span></button>
        <div class="hr-tcline"></div>

        <div class="ibox-title no-borders msg_item_title">
          <h5>患者基本信息</h5>
          <small class="m-l-sm text-danger" v-if="false">&#9888 该患者有费用未缴</small>
        </div>

        <!--弹窗详细内容-->
        <div class="ibox-content no-borders" style="margin-top: -20px">
          <form method="get" class="form-horizontal m-l-md">
            <div class="form-group">
              <div class="col-md-4 no-padding">
                <div class="col-md-3 pull-left no-padding left_text_tips">患者姓名<span class="text-danger"
                                                                                    style="margin-left: 2px">*</span>
                </div>
                <div class="col-md-8" style="padding-right: 0;">
                  <input @input="showPatientList(itemData.userName)" @focus="getFocus()" @blur="loseFocus()" maxlength="10"
                         data-toggle="dropdown"    v-model="itemData.userName" type="text" placeholder="请填写真实姓名" :disabled="isEditable "
                         class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
                    <ul v-show="dataItems.length > 0 " class="attopic dropdown-menu" style="width: 93%;margin-left: -8px">
                      <li style="text-align: center;list-style: none" @mousedown="selectedName(data)"
                          v-for="(data, index) in dataItems"><a>{{data.userName}}</a></li>
                    </ul>
                </div>
              </div>

              <div class="col-md-4 no-padding">
                <div class="pull-left col-md-3 no-padding left_text_tips">出生年月<span class="text-danger"
                                                                                    style="margin-left: 2px">*</span>
                </div>
                <div class="col-md-8 no-padding" style="margin-left: -5px">
                  <div class="col-md-11 no-padding    gray-bg" style="line-height: 34px; border-radius: 4px; border: 1px solid #e5e6e7;">
                    <div class="pull-left col-md-9 no-padding">
                      <input  @click="$stringUtils.layDateUi()" class="form-control layer-date"   style="background-color: #F4F4F4; height: 16px; width: 100%;padding-left: 12px;border: none;"id="birthdayDate" readonly
                             type="text" placeholder="请选择出生年月">
                    </div>
                    <span @click="$stringUtils.layDateUi('#birthdayDate')" style="margin-top: 2px; background-color: #F4F4F4;" class="pull-left input-group-addon no-borders m-t-xxs" id="startDate"><i class="fa fa-calendar"></i></span>
                  </div>
                </div>
              </div>

              <div class="col-md-4 no-padding" style="margin-top: 0px">
                <div class="form-group">
                  <p class="col-md-2 no-padding left_text_tips" style="margin-left: 15px">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别
                    :</p>
                  <div class="col-md-8">
                    <div class="radio radio-info radio-inline">
                      <input :checked="itemData.userSex == 1" type="radio" id="Radio1" value="1" v-model="itemData.userSex" name="radioInline"
                       style="margin-top: 2px">
                      <label for="radio1" style="padding-left: 0">男</label>
                    </div>
                    <div class="radio radio-inline" style="margin-left: 8px">
                      <input :checked="itemData.userSex == 2" type="radio" id="Radio2" value="2"  v-model="itemData.userSex"name="radioInline"
                              style="margin-top: 2px" >
                      <label for="Radio2" style="padding-left: 0">女</label>
                    </div>
                    <div class="radio radio-inline" style="margin-left: 8px">
                      <input :checked="itemData.userSex == 9" type="radio" id="Radio3" value="9" v-model="itemData.userSex" name="radioInline"
                             style="margin-top: 2px">
                      <label for="Radio3" style="padding-left: 0px">未知</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-4 no-padding" style="margin-top: 8px">
                <div class="pull-left col-md-3 no-padding left_text_tips">身份证号</div>
                <div class="col-md-8" style="padding-right: 0">
                  <input v-model="itemData.idCardNo" maxlength="18" type="text" placeholder="请填写真实身份证号"

                         class="form-control gray-bg input_circular_corner" style="margin-left: -20px">

                </div>
              </div>

              <div class="col-md-4 no-padding" style="margin-top: 8px">
                <div class="pull-left col-md-3 no-padding left_text_tips">手机号码<span class="text-danger"
                                                                                    style="margin-left: 2px">*</span>
                </div>
                <div class="col-md-8" style="padding-right: 0">
                  <input   v-model="itemData.billId" class=" input form-control gray-bg input_circular_corner"
                         :class="{'is-danger':isBillId}  " type="tel" @input="getIsDanger(itemData.billId)"
                         placeholder="请输入手机号码" maxlength="11"
                          style="margin-left: -20px">
                  <toast-error   v-show="isBillId " :toastContent="placeholder.toastPhone"></toast-error>


                </div>
              </div>


            </div>

          </form>
        </div>

        <div class="ibox-title no-borders msg_item_title" style="margin-top: -30px">
          <h5>就诊信息</h5>
        </div>


        <div class="ibox-content no-borders" style="margin-top: -20px">
          <form method="get" class="form-horizontal m-l-md">
            <div class="form-group">

              <div class="col-md-4 no-padding">
                <div class="pull-left col-md-3 no-padding left_text_tips">接诊类型<span class="text-danger"
                                                                                    style="margin-left: 2px">*</span>

                </div>
                <div class="col-md-8 no-padding" style="margin-left: -5px;    padding-right: 15px !important;">
                  <div class="input-group-btn">
                    <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{prodTypeItems[ registeredType ].titleName}}<span class="goods_tips_down caret"></span>
                    </button>
                    <ul v-show="prodTypeItems.length>0" class="  dropdown-menu" style="width: 100%" >
                      <li @click="selectProdTypeItem(index)" v-for="(titleItem, index) in prodTypeItems">
                        <a :class="{selected_item : registeredType == index}" class="no-padding" style="text-align: center">{{titleItem.titleName}}</a>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-md-4 no-padding">
                <div class="pull-left col-md-3 no-padding left_text_tips">是否急诊</div>
                <div class="radio radio-info radio-inline">
                  <input type="radio" value="2" name="radioInline"
                         :checked="itemData.isEmergency == 2" style="margin-top: 2px"   v-model="itemData.isEmergency">
                  <label style="padding-left: 0">是</label>
                </div>
                <div class="radio radio-inline">
                  <input :checked="itemData.isEmergency == 1" type="radio" value="1" v-model="itemData.isEmergency" name="radioInline"
                         style="margin-top: 2px">
                  <label style="padding-left: 0">否</label>
                </div>
              </div>

              <div class="col-md-4 no-padding">
                <div class="pull-left col-md-3 no-padding left_text_tips">挂&nbsp;&nbsp;号&nbsp;&nbsp;费</div>
                <div class="col-md-8" style="padding-right: 0">
                  <input v-model="itemData.registeredFee" type="text" placeholder="请填写挂号费  (元)" maxlength="5"
                         class="form-control gray-bg input_circular_corner" style="margin-left: -20px">

                </div>
              </div>
              <!--<div class="col-md-4 no-padding" style="margin-top: 8px">-->
                <!--<div class="pull-left col-md-3 no-padding left_text_tips">选择科室<span class="text-danger" style="margin-left: 2px">*</span></div>-->
                <!--<div class="col-md-9" style="padding-right: 0; margin-left: -20px">-->
                  <!--<input   readonly v-model="itemData.departName" placeholder="选择科室" data-toggle="dropdown" style="width: 100%; text-align: left;" class="form-control gray-bg input_circular_corner" type="text"><span class="goods_tips_down caret"></span>-->
                <!--</div>-->
              <!--</div>-->

              <!--<div class="col-md-4 no-padding" style="margin-top: 8px">-->
                <!--<div class="pull-left col-md-3 no-padding left_text_tips">选择医生<span class="text-danger" style="margin-left: 2px">*</span></div>-->
                <!--<div class="col-md-9" style="padding-right: 0; margin-left: -20px">-->
                  <!--<input  readonly v-model="itemData.doctorName"   data-toggle="dropdown" style="width: 100%; text-align: left;" class="form-control gray-bg input_circular_corner" type="text"><span class="goods_tips_down caret"></span>-->
                <!--</div>-->
              <!--</div>-->


            </div>
          </form>
        </div>


        <div style="text-align: center; margin-bottom: 20px; margin-top: 20px">
          <button class="btn_save"  @click="savePatient">确认新增</button>
          <button class="btn_cancel" data-dismiss="modal" @click="close">放弃</button>
        </div>
      </div>
    </div>
  </div>

</template>
<style>
  .btn_save {
    width: 100px;
    height: 28px;
    background-color: #324367;
    color: white;
    border: 1px solid #324367;
    border-radius: 2px;
    margin-left: 0px;
  }

  .btn_cancel {
    width: 100px;
    height: 28px;
    background-color: white;
    color: #324367;
    border: 1px solid #324367;
    border-radius: 2px;
  }

  .menu_list {
    box-shadow: rgb(102, 102, 102) 0px 0px 5px;
    margin-top: 5px;
    left: -5px;
    line-height: 30px;
    margin-left: 0;
    padding-left: 0;
    background-color: #F4F4F4;
    position: absolute;
    z-index: 999;
    width: 91%;
  }
</style>
<script>
  import toastError from "components/commonView/toastError.vue";
  export default{
    computed : {

    },

    components: {
      //注册组件
      toastError
    },
    data(){
      return {
        placeholder: {
          toastPhone: "请输入正确的手机号码!",
//          toastIdCardNo: "请输入正确的身份证号码!",

        },
        dataItems: [],
        billId: "",
        prodTypeItems:[
          {
            titleName:"初诊",
          },
          {
            titleName:"复诊",
          }],
        focus: false,
        isEditable: false,
        userId: "",
        itemData: {
          userName: '',
          birthdayDate: '',
          idCardNo: '',
          registeredType: 0,
          registeredFee: 0,
          userSex: 9,
          billId: '',
          isEmergency: 1
        },
        registeredType:0,
        isBillId:false,
        isIdCardNo:false,

      }
    },

    created(){
    },

    mounted: function () {
      $(function () { $('#add_patient').on('hidden.bs.modal', function () {
        this.isEditable=true;
        this.itemData={
          userName: '',
          birthdayDate: '',
          idCardNo: '',
          registeredType: 0,
          registeredFee: '',
          userSex: 9,
          billId: '',
          isEmergency: 1
        };
        this.registeredType=0;
        this.isBillId=false;
        this.isIdCardNo=false;
        this. billId="";
        })
      });
    },

    methods: {
      getIsDanger:function(billId){
        return this.isBillId= !this.$stringUtils.checkPhone( billId);
      },
//      getIdCardNo:function(idCardNo){
//        return this.isIdCardNo= !this.$stringUtils.checkLegalCard( idCardNo);
//      },
      request_list: function () {
        var that = this;
        this.$api.get(this, this.$requestApi.addPatient, "", function (data) {
          if(data.body.code == '00'){
            that.dataItems = data.body.data;
            console.log('获取到的数据:' + that.dataItems);
          } else {
            console.log(data.body.msg);
          }

        }, function (err) {
          console.log(err);

        });
      },
      selectProdTypeItem:function (selectedIndex) {
        this.registeredType= selectedIndex;
      },
      savePatient:function () {
        let that = this;
        that.itemData.birthdayDate= $('#birthdayDate').val();
        if (that.itemData.userName==""){
          swal({title: that.$toastContent.toastUserName, text: "", type: that.$enumerationType.error, timer: that.$enumerationType.timers, showConfirmButton: false});
          return ;
        }if (  that.itemData.birthdayDate=="" ){
          swal({title: that.$toastContent.toastBirthdayDate, text: "", type: that.$enumerationType.error, timer: that.$enumerationType.timers, showConfirmButton: false});
          return ;
        }
        if (!that.$stringUtils.checkPhone(that.itemData.billId)){
          swal({title: that.placeholder.toastPhone, text: "", type: that.$enumerationType.error, timer: that.$enumerationType.timers, showConfirmButton: false});
          return ;
        }
        let url="";
        if(that.isEditable){
          url=that.$requestApi.receivePatient+that.userId;
        }else {
          url = that.$requestApi.addPatient;
        }
        this.itemData.registeredType=  this.registeredType==0?1:2;
        that.$api.post(that, url, that.itemData, function (data) {
          if (data.body.code == '00') {
            $('#add_patient').modal('hide')
            swal({title: data.body.msg, text: "", type: that.$enumerationType.success, timer: that.$enumerationType.timers, showConfirmButton: false});
            that.close();
            that.$parent.request();
          } else {
            swal({title: data.body.msg, text: "", type: that.$enumerationType.error, timer: that.$enumerationType.timers, showConfirmButton: false});

            console.log(data.body.msg);
          }

        }, function (err) {
          console.log(err);

        });
      },
      showPatientList: function (userName) {
        let that = this;

        that.$api.post(that, that.$requestApi.searchbyname, {userName:userName}, function (data) {
          if (data.body.code == '00') {
            that.dataItems=data.body.data;
          }

        }, function (err) {
          console.log(err);

        });
      },
      getUserInfor: function () {
        let that = this;
        that.$api.get(that, that.$requestApi.userinfo, "", function (data) {
          if (data.body.code == '00') {

          } else {
            console.log(data.body.msg);
          }

        }, function (err) {
          console.log(err);

        });

      },
      close: function () {
        this.isEditable=false;
        $('#birthdayDate').val("");
        this.itemData= {
          userName: '',
            birthdayDate: '',
            idCardNo: '',
            registeredType: 0,
            registeredFee: '',
            userSex: 1,
            billId: '',
            isEmergency: 1
        };
        this.registeredType=0;

      },
      selectedName: function (selectData) {

        this.itemData.userName = selectData.userName;
        this.userId = selectData.userId;
        this.itemData.birthdayDate = selectData.birthdayDate;
        this.itemData.idCardNo = selectData.idCardNo;
        this.itemData.registeredFee = selectData.registeredFee;
        this.itemData.userSex = selectData.userSex;
        this.itemData.billId = selectData.billId;
        this.itemData.address = selectData.address;
        this.itemData.cityCode = selectData.cityCode;
        this.itemData.company = selectData.company;
        this.itemData.email = selectData.email;
        this.itemData.isMarital = selectData.isMarital;
        this.itemData.nation = selectData.nation;
        this.itemData.privCode = selectData.privCode;
        this.itemData.remark = selectData.remark;
        this.registeredType = 1;
        $('#birthdayDate').val(this.$stringUtils.dateFormat(this.itemData.birthdayDate));
        this.focus = false;
        this.isEditable=true;
      },
      getFocus: function () {
        this.focus = true;
      },

      loseFocus: function () {
        this.dataItems = [];
        this.focus = false;
      }
    },
  }
</script>
