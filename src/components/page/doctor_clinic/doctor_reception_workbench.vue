<!--医生接诊工作台-->
<template>
  <div>
    <!--顶部操作栏-->
    <switch_tab></switch_tab>

    <!--中间内容部分-->
    <div class="wrapper wrapper-content animated fadeInRight no_top_padding">

      <div class="row" style="padding: 0 15px;">
        <!--顶部信息栏-->
        <div class="col-sm-12 no-padding">
          <div class="ibox-title no-top-border gray-bg pull-left" style="padding-left: 0;">
            <h5 class="red-bg" style="margin: 2px 10px 0 0;" v-if=" patientCaseList.isEmergency==2" >急</h5>
            <a style="border-bottom: 1px solid blue" data-toggle="modal" data-target="#perfect_information_modal" @click="prefectUser(patientCaseList.userId)">
              <small>{{patientCaseList.userName}}</small>
              <small class="m-l-sm">{{ $stringUtils.dateAge(patientCaseList.birthdayDate)}}岁 /{{ $stringUtils.dateSex(patientCaseList.userSex )}} / {{patientCaseList.billId}}</small>
            </a>
            <small class="m-l-sm text-danger" v-if="hasAllergys">&#9888 该患者有过敏史!</small>
          </div>

          <div class="ibox-tools" style="line-height: 48px">
            <a class="wrapper un_skip_link" style="color: black"  @click="historyCase">查看历史病历</a>
            <a v-if="indexChoose == 0" @click="open_assist_inquiry" class="un_skip_link" style="text-decoration: underline; color: #00b7ee">辅助问诊</a>
            <button @click="showModel()" data-toggle="modal" data-target="#layer" v-else type="button" class="btn btn-w-m btn-primary">选择模板</button>
          </div>
        </div>

        <!--内容区-->
        <div class="ibox float-e-margins">
          <div class="ibox-content no-padding no-borders gray-bg">
            <div class="row">
              <!--病例-->
              <case_report v-show="indexChoose == 0"  ></case_report>
              <!--治疗-->
              <doctor_treatment v-show="indexChoose == 1" ></doctor_treatment>
              <!--处方-->
              <doctor_prescription v-show="indexChoose == 2"  ></doctor_prescription>

              <!--其他收费-->
              <doctor_rest_charge v-show="indexChoose == 3" ></doctor_rest_charge>


            </div>
          </div>
        </div>

      </div>

    </div>

    <!--打印预览部分 block_hidden-->
    <div class="print_container">
      <!--治疗打印预览-->
      <div class="cure_print_wrapper white-bg block_hidden">
        <div class="ibox no-margins print_content">
          <div class="ibox-title no-borders no-padding">
            <img src="img/locked.png">
            <div>
              <span style="width:33%;border:1px solid #f4f4f4;height: 1px;display: inline-block;"></span><h6
              style="display: inline-block;width: 33%;vertical-align: sub;text-align: center">邻家好医诊所门诊治疗</h6><span
              style="width:33%;border:1px solid #f4f4f4;height: 1px;display: inline-block;"></span>
            </div>

          </div>
          <div class="ibox-content no-borders no-padding">
            <div class="form-group" style="margin-top: 15px">
              <div style="display: inline-block">
                <h6 style="display: inline-block; margin: 0;">小小熊</h6>
                <h6 style="display: inline-block; margin: 0 0 10px 10px;">20岁 / 女</h6>
              </div>
              <div style="display: inline-block; float: right">
                <small style="font-size: 12px">病案号: 2016112520125581</small>
                <small style="font-size: 12px; padding-left: 10px; padding-right: 10px">科室: 口腔内科</small>
                <small style="font-size: 12px">日期: 2016.12.30</small>
              </div>
            </div>

            <div>
              <div>
                <p style="margin-bottom: 4px; font-size: 12px">初步诊断:</p>
                <table class="table table-bordered text-center">
                  <thead>
                  <tr style="font-size: 12px">
                    <th class="text-center">名称</th>
                    <th class="text-center">单价</th>
                    <th class="text-center">单位</th>
                    <th class="text-center">次数</th>
                    <th class="text-center">金额</th>
                    <th class="text-center">说明</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr style="font-size: 12px" v-for="(cure_item, index) in cure_items">
                    <td>{{cure_item.illnessName}}</td>
                    <td>{{cure_item.price}}</td>
                    <td>{{cure_item.unit}}</td>
                    <td>{{cure_item.count}}</td>
                    <td>{{cure_item.money}}</td>
                    <td>{{cure_item.declare}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="form-group" style="margin: 0;">
              <label style="font-size: 12px">治疗总额(元):</label>
              <label style="margin-left: 10px; font-size: 12px">25元</label>
            </div>

            <div class="form-group" style="margin-bottom: 0px">
              <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
                <label style="margin: 0; font-size: 12px">医师:</label>
                <p style="display: inline-block; margin-left: 10px; font-size: 12px">小辛</p>
              </div>
              <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
                <label style="margin: 0; font-size: 12px">审核:</label>
                <p style="display: inline-block; margin-left: 10px; font-size: 12px">小辛</p>
              </div>
              <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
                <label style="margin: 0; font-size: 12px">执行:</label>
                <p style="display: inline-block;margin-left: 10px; font-size: 12px">小辛</p>
              </div>

            </div>

          </div>
        </div>
      </div>
      <!--处方打印预览-->
      <div class="prescription_print_wrapper white-bg block_hidden">
        <div class="ibox no-margins print_content">
          <div class="ibox-title no-borders no-padding">
            <img src="img/locked.png">
            <div>
              <span style="width:33%;border:1px solid #f4f4f4;height: 1px;display: inline-block;"></span><h5
              style="display: inline-block;width: 33%;vertical-align: sub;text-align: center">邻家好医诊所处方单</h5><span
              style="width:33%;border:1px solid #f4f4f4;height: 1px;display: inline-block;"></span>
            </div>
          </div>
          <div class="ibox-content no-borders no-padding">
            <div>
              <div style="display: inline-block">
                <h5 style="display: inline-block; margin: 0;">小小熊</h5>
                <h5 style="display: inline-block; margin: 0 0 10px 10px;">20岁 / 女</h5>
              </div>
              <div style="display: inline-block;float: right">
                <small style="font-size: 12px">病案号: 2016112520125581</small>
                <small style="font-size: 12px; padding-left: 10px; padding-right: 10px">科室: 口腔内科</small>
                <small style="font-size: 12px">日期: 2016.12.30</small>
              </div>
            </div>

            <div>
              <div class="no-padding" style="display: inline-block;margin-right: 30%">
                <label style="font-size: 12px" class="no-margins">诊断:</label>
                <p class="m-l-sm" style="display: inline-block; font-size: 12px">小辛</p>
              </div>

              <div class="no-padding" style="display: inline-block;">
                <label style="font-size: 12px" class="no-margins">过敏史:</label>
                <p class="m-l-sm" style="display: inline-block; font-size: 12px">狂犬病</p>
              </div>

            </div>

            <div class="form-group" style="border-top: 1px solid black; border-bottom: 1px solid black; margin-bottom: 15px">
              <p style="width: 100%; height: 250px;">Rp</p>
              <div style="text-align: right; margin-bottom: 15px; margin-right: 10%">
                <span style="margin-right: 10px; font-size: 12px">医师: </span>
                <span style="font-size: 12px;">小辛</span>
              </div>
            </div>

            <div class="form-group" style="margin: 0;">
              <label style="font-size: 12px">药品总额(元):</label>
              <label style="margin-left: 10px; font-size: 12px">25元</label>
            </div>

            <div class="form-group" style="margin-bottom: 0px">
              <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
                <label style="margin: 0; font-size: 12px">药师审核:</label>
                <p style="display: inline-block; margin-left: 10px; font-size: 12px">小辛</p>
              </div>
              <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
                <label style="margin: 0; font-size: 12px">配药药师:</label>
                <p style="display: inline-block; margin-left: 10px; font-size: 12px">小辛</p>
              </div>
              <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
                <label style="margin: 0; font-size: 12px">核对发药:</label>
                <p style="display: inline-block;margin-left: 10px; font-size: 12px">小辛</p>
              </div>

            </div>

          </div>
        </div>

      </div>
      <!--病例打印预览-->
      <div class="case_print_wrapper white-bg block_hidden">
        <div class="ibox no-margins print_content">
          <div class="ibox-title no-borders no-padding">
            <img src="img/locked.png">
            <div>
              <span style="width:33%;border:1px solid #f4f4f4;height: 1px;display: inline-block;"></span><h5
              style="display: inline-block;width: 33%;vertical-align: sub;text-align: center">邻家好医诊所门诊病历</h5><span
              style="width:33%;border:1px solid #f4f4f4;height: 1px;display: inline-block;"></span>
            </div>

          </div>
          <div class="ibox-content no-borders no-padding">
            <div class="form-group">
              <div style="display: inline-block">
                <h5 style="display: inline-block; margin: 0;">小小熊</h5>
                <h5 style="display: inline-block; margin: 0 0 10px 10px;">20岁 / 女</h5>
              </div>
              <div style="display: inline-block; float: right">
                  <small style="font-size: 12px">病案号: 2016112520125581</small>
                  <small style="font-size: 12px; padding-left: 10px; padding-right: 10px">科室: 口腔内科</small>
                  <small style="font-size: 12px">日期: 2016.12.30</small>
              </div>
            </div>

            <div class="form-group">
              <div class="print_title no-padding">
                <label style="font-size: 12px" class="no-margins">临床诊断:</label>
                <p class="m-l-sm" style="display: inline-block; font-size: 12px">小辛</p>
              </div>

            </div>

            <div class="form-group" style="border-top: 1px solid black; border-bottom: 1px solid black; margin-bottom: 15px">
              <p style="width: 100%; height: 250px">Rp</p>
            </div>

            <div class="form-group no-margins">
              <label style="font-size: 12px">医师:</label>
              <label style="font-size: 12px" class="m-l-sm">小辛</label>
            </div>

          </div>

        </div>
      </div>
      <!--其他收费打印预览-->
      <div class="other_charge_print_wrapper white-bg block_hidden">
        <div class="ibox no-margins print_content">
          <div class="ibox-title no-borders no-padding">
            <img src="img/locked.png">
            <div>
              <span style="width:33%;border:1px solid #f4f4f4;height: 1px;display: inline-block;"></span><h6
              style="display: inline-block;width: 33%;vertical-align: sub;text-align: center">邻家好医其他收费单</h6><span
              style="width:33%;border:1px solid #f4f4f4;height: 1px;display: inline-block;"></span>
            </div>

          </div>
          <div class="ibox-content no-borders no-padding">
            <div class="form-group" style="margin-top: 15px">
              <div style="display: inline-block;">
                <h6 style="display: inline-block; margin: 0;">小小熊</h6>
                <h6 style="display: inline-block; margin: 0 0 10px 10px;">20岁 / 女</h6>
              </div>
              <div style="display: inline-block; float: right">
                <small style="font-size: 12px">病案号: 2016112520125581</small>
                <small style="font-size: 12px; padding-left: 10px; padding-right: 10px">科室: 口腔内科</small>
                <small style="font-size: 12px">日期: 2016.12.30</small>
              </div>
            </div>

            <div>
              <div>
                <p style="margin-bottom: 4px; font-size: 12px">初步诊断:</p>
                <table class="table table-bordered text-center">
                  <thead>
                  <tr style="font-size: 12px">
                    <th class="text-center">名称</th>
                    <th class="text-center">单价</th>
                    <th class="text-center">单位</th>
                    <th class="text-center">数量</th>
                    <th class="text-center">金额</th>
                    <th class="text-center">说明</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr style="font-size: 12px" v-for="(other_charge_item, index) in other_charge_items">
                    <td>{{other_charge_item.name}}</td>
                    <td>{{other_charge_item.price}}</td>
                    <td>{{other_charge_item.unit}}</td>
                    <td>{{other_charge_item.count}}</td>
                    <td>{{other_charge_item.money}}</td>
                    <td>{{other_charge_item.explain}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div style="margin: 0;">
              <label style="font-size: 12px">收费总额(元):</label>
              <label style="margin-left: 10px; font-size: 12px">25元</label>
            </div>

            <div>
              <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
                <label style="margin: 0; font-size: 12px">医师:</label>
                <p style="display: inline-block; margin-left: 10px; font-size: 12px">小辛</p>
              </div>
              <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
                <label style="margin: 0; font-size: 12px">审核:</label>
                <p style="display: inline-block; margin-left: 10px; font-size: 12px">小辛</p>
              </div>
              <div style="display: inline-block;width: 30%;vertical-align: sub;padding: 0;">
                <label style="margin: 0; font-size: 12px">执行:</label>
                <p style="display: inline-block;margin-left: 10px; font-size: 12px">小辛</p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>

    <!--模态窗开始-->
    <treatment-model :prescription_type="prescription_type" :cure_template_currentIndex="cure_template_currentIndex"   ></treatment-model>
    <!--模态窗结束-->

    <!--完善信息模态框-->
    <prefect :userId="userId"></prefect>

  </div>
</template>
<style>
  button {
    outline: none !important;
  }

  .left_text_tips {
    cursor: pointer;
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

  .l_r_border {
    border-left: 1px solid #f4f4f4;
    border-right: 1px solid #f4f4f4;
  }

  .l_border {
    border-left: 1px solid #f4f4f4;
  }

  .r_border {
    border-right:1px solid #f4f4f4;
  }

  .title_line {
    width:33.33%;
    border:1px solid #f4f4f4;
    height: 1px;
    display: inline-block;
  }

  .print_title {
    display: inline-block;
    width: 33.33%;
    vertical-align: sub;
  }

  .print_content {
    padding: 20px 15px 15px 15px;
  }

  .block_hidden {
    display: none;
  }

  .little_item {
    width: 10%;
  }

  .cure_little_item {
    width: 8%;
  }

  .prescription_little_item{
    width:6%;
  }


  .bottom_item {
    padding-left: 0;
    text-align: left !important;
    padding-right: 0
  }

  .left_text_tips {
    display: inline-block;
    margin-top: 7px
  }

  .input_circular_corner{
    border-radius: 5px;
  }

  .focus_border {
    border: 1px solid #5FA8D4 !important;
  }

  .list_menu {
    box-shadow: rgb(102, 102, 102) 0px 0px 10px;
    margin-top: 12px;
    left: 15px;
    margin-left: 5px;
    line-height: 30px;
    background-color: white;
    position: absolute;
    z-index: 999;
    min-width: 160px;
     width: 160px;
  }

  .item_list_normal {
    list-style: none; line-height: 35px; border-bottom: 1px solid gainsboro
  }

  .template_list li {
    line-height: 30px;
    list-style: none;
    padding:0 15px;
  }

  .template_list_selected{
    background-color: #F4F4F4;
  }

  .modal_search_input{
    outline: none;
    border: none;
    background-color: #F4F4F4;
    line-height: 30px;
    width: 84%;
  }

</style>
<script>
  import switch_tab from './switch_tab_template.vue';
  import 'staticjs/plugins/print/printThis';
  import prefect from '../doctor_registered/registered_modal_perfect.vue';
  import case_report from './case_report_template.vue';
  import doctor_treatment from './doctor_treatment.vue';
  import treatmentModel from './treatmentModel.vue';
  import doctor_prescription from './doctor_prescription.vue';
  import doctor_rest_charge from './doctor_rest_charge.vue';
  export default{
    data(){

      return {
        titles: [
          {titleName: '病历', selected: true},
          {titleName: '治疗', selected: false},
          {titleName: '处方', selected: false},
          {titleName: '其他收费', selected: false}
        ],

        selects:[
          {selectName: ''},
          {selectName: ''},
          {selectName: ''},
        ],
        dataList: [],
        searchName:'',
        patientCaseList: '',
        hasAllergys: false,
//        assist_inquiry_show: false,
//        assist_inquiry_showed:false,
        prescription_type:1,
        currentFocusIndex:0,
        cure_items: [],
        other_charge_items: [],
        userId:0,
//        allergy_data: [],


        cure_template_currentIndex: -100,

        cure_currentIndex: -100,
        western_prescription_currentIndex: -100,
        chinese_prescription_currentIndex: -100,
        other_charge_currentIndex: -100,

        focus: false,

//        allergyState: 0,

      }
    },
    computed: {
      indexChoose () {
//        if (this.$store.getters.getCurrentIndex == 0 && this.assist_inquiry_showed) {
//          this.assist_inquiry_show = true;
//        } else {
//          this.assist_inquiry_show = false;
//        }
        return this.$store.getters.getCurrentIndex;
      },
//        registeredOrdId(){
//       return parent.vueRoot.$store.getters.getCompileSuppliersNo;
//
//  }

    },
    components:{switch_tab, prefect, case_report,doctor_treatment,treatmentModel,doctor_prescription,doctor_rest_charge},
    created(){

      this.$store.dispatch('addSwitchTabs', this.titles);
      this.$store.dispatch('addSelectStates', this.selects);
      this.$store.dispatch('showRightSearch', false);
      this.$store.dispatch('showListCount', false);
      this.$store.dispatch('changeTabState', this.indexChoose);
      this.$store.dispatch('setEditable', true);
      this.$store.dispatch('setMsgEditable', false);
//      this.request_case();

    },

    mounted: function() {
//      $('.collapse-link').click(function () {
//        console.log(    "___"+ parent.vueRoot.$store.getters.getToday );
//        var ibox = $(this).closest('div.ibox');
//        var button = $(this).find('i');
//        var content = ibox.find('div.ibox-content');
//        content.slideToggle(200);
//        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
//        ibox.toggleClass('').toggleClass('border-bottom');
//        setTimeout(function () {
//          ibox.resize();
//          ibox.find('[id^=map-]').resize();
//        }, 50);
//      });
//
//      /*病例打印*/
//      $("#btn_print_case").click(function () {
//        $(".case_print_wrapper").printThis();
//      });

      /*治疗打印*/
      $("#btn_print_add_cure").click(function () {
        $(".cure_print_wrapper").printThis({importCSS: true,loadCSS:"//cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"});
      });

      /*处方打印*/
      $("#btn_print_prescription").click(function () {
        $(".prescription_print_wrapper").printThis();
      });

      /*其他收费打印*/
      $("#btn_print_add_other_charge").click(function () {
        $(".other_charge_print_wrapper").printThis({importCSS: true,loadCSS:"//cdn.bootcss.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"});
      });
        var that=this;
      var store = localStorage.getItem("to_day_data");
      console.log(("====" + store));
      if (window.addEventListener) {
        window.addEventListener("storage", handle_storage, false);

      } else if (window.attachEvent) {
        window.attachEvent("onstorage", handle_storage);
      }
      function handle_storage(e) {
        console.log("获取到数据");
        console.log(e);

        if (!e) {
          e = window.event;
        }
      }

            // 监听数据变化,当数据发生变化时,同步数据显示
     window.onstorage = function(event){
                var status = {}
                status.key = event.key;
                status.oldValue = event.oldValue;
                status.newValue = event.newValue;
                status.url = event.url;
                status.storage = event.storageArea;
//                that.registeredOrdId=status.newValue;
                that.$store.dispatch("medicine_compile_suppliers_no", status.newValue);
console.log(status);
//       执行同步数据处理...
    }
    },

    methods: {
      historyCase:function () {
        console.log(" this.patientCaseList.userId)"+ this.patientCaseList.userId);
        this.$store.dispatch('medicine_compile_user_id',  this.patientCaseList.userId);
        this.$router.push('/doctor_clinic/history_case');
      },

      prefectUser:function (userId) {
        this.userId = userId;
      },
      request_list:function () {
      },


      /*打开辅助问诊*/
//     request_case

      /*删除列表行*/
      delete_cure_item: function (currentIndex) {
        this.cure_items.splice(currentIndex, 1);
      },





      getFocus:function (item, focusIndex) {
        this.currentFocusIndex = focusIndex;
        item.focus = true;
      },

      loseFocus:function (item) {
        item.focus = false;
        this.dataList = [];
      },

      selectedName:function (data, itemData) {
        itemData.illnessName = data.illnessName;
        itemData.price = data.price;
        itemData.unit = data.unit;
        itemData.count = data.count;
        itemData.money = Number(itemData.price) * Number(itemData.count);
        itemData.state = data.state;
      },

//      /*病例数据*/
//      request_case:function () {
//        var that=this;
//        this.$api.get(this,this.$requestApi.patientCase,"",function  (data) {
//          if(data.status=='200'){
//            that.patientCaseList = data.body;
//            that.allergy_data = data.body.allergy;
//          }else{
//            console.log(data.body.msg);
//          }
//
//        },function (err) {
//          console.log(err);
//
//        });
//      },

      selectChinesePrescription:function (data, itemData) {
        itemData.drugName = data.drugName;
        itemData.price = data.price;
        itemData.unit = data.unit;
        itemData.state = data.state;
        itemData.dosage = data.dosage;
        itemData.repertory = data.repertory;
      },

      selectWesternMedicine:function (data, itemData) {
        itemData.drugName = data.drugName;
        itemData.price = data.price;
        itemData.unit = data.unit;
        itemData.dosage = data.dosage;
        itemData.repertory = data.repertory;
        itemData.count = data.count;
        itemData.days = data.days;
        itemData.usage = data.usage;
        itemData.state = data.state;
        itemData.frequency = data.frequency;
      },

      selectOtherCharge:function (data, itemData) {
        itemData.count = data.count;
        itemData.money = data.money;
        itemData.price = data.price;
        itemData.name = data.name;
        itemData.unit = data.unit;
      },



      showModel:function () {
        this.cure_template_currentIndex = -100;
        this.cure_template_list = [];
      },

      /*打开辅助问诊*/
      open_assist_inquiry: function () {
        this.$store.dispatch('setWeatherShowAssistInquiry', true);
      },




      getDataList:function (type) {
        var that=this;
        var url = '';
        if (type == 0) {//治疗
          url = this.$requestApi.cureInfo;
        } else if (type == 1) {// 中药处方
          url = this.$requestApi.chinesePrescription;
        } else if (type == 2) {//西药处方
          url = this.$requestApi.westernMedicine;
        } else if (type == 3) {//其他收费
          url = this.$requestApi.otherCharge;
        }

        this.$api.get(this, url,"",function  (data) {
          if(data.status=='200'){
            that.dataList = data.body.data;
            console.log(JSON.stringify(that.dataList));
          }else{
            console.log(data.body.msg);
          }

        },function (err) {
          console.log(err);

        });
      },

    }
  };
</script>
