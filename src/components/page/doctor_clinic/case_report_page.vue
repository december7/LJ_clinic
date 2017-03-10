<template>
  <div>
    <!--顶部操作栏-->
    <div class="today_patient_top_container">
      <!--左侧切换标题栏-->
      <div class="today_patient_top_left">
        <p class="pull-left m-l-md" style="line-height: 40px;">病例</p>
      </div>
      <div class="pull-right m-r-md" style="line-height: 40px">
        <a @click="back">返回上一级</a>
      </div>
      <!--中间内容部分-->
      <div class="wrapper wrapper-content animated fadeInRight" style="padding: 0 20px;">
        <div class="row" style="padding: 0 15px;">
          <!--顶部信息栏-->
          <div class="col-sm-12 no-padding bg-white">
            <div class="ibox-title no-top-border gray-bg pull-left" style="padding-left: 0;">
              <h5 class="red-bg" style="margin: 2px 10px 0 0;">急</h5>
              <a class="un_skip_link" data-toggle="modal" data-target="#perfect_information_modal"
                 style="border-bottom: 1px solid blue">
                <small>{{historyCaseList.patientName}}</small>
                <small class="m-l-sm">{{historyCaseList.age}}岁 / {{historyCaseList.sex == 0 ? '男' : '女'}} /
                  {{historyCaseList.tele}}
                </small>
              </a>
              <small class="m-l-sm text-danger">该患者有过敏史!</small>
            </div>
          </div>
        </div>
      </div>

      <case_report></case_report>

    </div>
  </div>
</template>
<style>
  body {
    background-color: #ff0000;
  }
</style>
<script>
  import case_report from './case_report_template.vue';
  export default{
    data(){
      return {
        historyCaseList: '',
      }
    },

    created() {
      this.$store.dispatch('setMsgEditable', true);
    },

    components:{case_report},

    methods:{
      back:function () {
        history.back();
      },
    }
  }
</script>
