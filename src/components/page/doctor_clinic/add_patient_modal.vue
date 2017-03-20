<template>

  <div class="modal inmodal fade" id="add_patient" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">

        <h4 style="margin: 15px 25px; display: inline-block">添加患者</h4>
        <button @click="close" type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
          aria-hidden="true">&times;</span></button>
        <div class="hr-tcline"></div>

        <div class="ibox-title no-borders msg_item_title">
          <h5>患者基本信息</h5>
          <small class="m-l-sm text-danger">&#9888 该患者有费用未缴</small>
        </div>

        <!--弹窗详细内容-->
        <div class="ibox-content no-borders" style="margin-top: -20px">
          <form method="get" class="form-horizontal m-l-md">
            <div class="form-group">
              <div class="col-md-4 no-padding">
                <div class="col-md-3 pull-left no-padding left_text_tips">患者姓名<span class="text-danger"
                                                                                    style="margin-left: 2px">※</span>
                </div>
                <div class="col-md-8" style="padding-right: 0;">
                  <input @input="showPatientList(itemData.userName)" @focus="getFocus()" @blur="loseFocus()"
                         v-model="itemData.userName" type="text" placeholder="请填写真实姓名" :disabled="isEditable "
                         class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
                  <div v-show="dataItems.length > 0 && focus" class="menu_list">
                    <ul class="no-margins">
                      <li style="text-align: center;list-style: none" @mousedown="selectedName(data)"
                          v-for="(data, index) in dataItems"><a>{{data.userName}}</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-md-4 no-padding">
                <div class="pull-left col-md-3 no-padding left_text_tips">出生年月<span class="text-danger"
                                                                                    style="margin-left: 2px">※</span>
                </div>
                <div class="col-md-8 no-padding" id="data_1" style="margin-left: -5px">
                  <div class="col-md-11 no-padding input-group date gray-bg" style="line-height: 34px; border-radius: 4px; border: 1px solid #e5e6e7;">
                    <div class="pull-left col-md-9 no-padding">
                      <input style="background-color: #F4F4F4; height: 20px; width: 100%;padding-left: 12px;border: none;"id="birthdayDate" readonly
                             type="text" placeholder="请选择出生年月">
                    </div>
                    <span style="margin-top: 2px; background-color: #F4F4F4;" class="pull-left input-group-addon no-borders m-t-xxs" id="startDate"><i class="fa fa-calendar"></i></span>
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
                  <input v-model="itemData.idCardNo" type="text" placeholder="请填写真实身份证号" :disabled="isEditable "
                         class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
                </div>
              </div>

              <div class="col-md-4 no-padding" style="margin-top: 8px">
                <div class="pull-left col-md-3 no-padding left_text_tips">手机号码<span class="text-danger"
                                                                                    style="margin-left: 2px">※</span>
                </div>
                <div class="col-md-8" style="padding-right: 0">
                  <input v-model="itemData.billId" type="text" placeholder="请输入手机号码" :disabled="isEditable "
                         class="form-control gray-bg input_circular_corner" style="margin-left: -20px">
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
                                                                                    style="margin-left: 2px">※</span>

                </div>
                <div class="col-md-8 no-padding" style="margin-left: -5px;    padding-right: 15px !important;">
                  <div class="input-group-btn">
                    <button data-toggle="dropdown" style="width: 100%" class="form-control gray-bg     input_circular_corner   " type="button">{{prodTypeItems[ registeredType ].titleName}}<span class="goods_tips_down caret"></span>
                    </button>
                    <ul class="dropdown-menu" style="width: 100%" >
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
                         :checked="itemData.isEmergency == 2" style="margin-top: 2px" v-model="itemData.isEmergency">
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
                  <input v-model="itemData.registeredFee" type="text" placeholder="请填写挂号费  (元)"
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
          <button class="btn_save" data-dismiss="modal" @click="savePatient">确认新增</button>
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
  import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css';
  import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js';
  import 'bootstrap-datepicker/dist/locales/bootstrap-datepicker.zh-CN.min';
  export default{
    data(){
      return {
        dataItems: [],
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
          registeredFee: '',
          userSex: 1,
          billId: '',
          isEmergency: 1
        },
        registeredType:0
      }
    },

    created(){
      this.getUserInfor();
    },

    mounted: function () {
      $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: false,
        autoclose: true,
        todayHighlight: true,
        language: "zh-CN",
        format:"yyyy/mm/dd"
      });
    },

    methods: {
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
        let url="";
        if(that.isEditable){
          url=that.$requestApi.receivePatient+that.userId;


        }else {
          url = that.$requestApi.addPatient;
        }
        this.itemData.registeredType=  this.registeredType==0?1:2;
        this.itemData.birthdayDate= $('#birthdayDate').val();
        that.$api.post(that, url, that.itemData, function (data) {
          if (data.body.code == '00') {
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
          } else {
            console.log(data.body.msg);
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
