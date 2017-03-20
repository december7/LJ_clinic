<template>
<div class="row">
    <!--<div class="col-sm-9">-->
        <!--<div class="wrapper wrapper-content animated fadeInUp">-->
            <div class="ibox" style="margin-left: 30px;margin-top: 15px;width: 92%">
                <div class="ibox-content" style="padding: 0px">
                    <div>
                        <div class="info-title" style="padding-top: 10px">&nbsp;&nbsp;诊所信息</div>
                    </div>
                    <div class="hr-tcline" style="margin-top: 10px"></div>
                    <div>
                        <div class="info-title-front">▎</div><div class="info-title">基本信息</div>
                    </div>
                    <div>
                        <div style="display: inline-block;"><img alt="image" class="info-smallimg" :src="hospitalUrl"></div>

                        <div style="display: inline-block; vertical-align: middle">
                          <div>
                            <div class="info-label-front" >诊所名称:</div><div class="info-label" >{{data_item.hospitalName}}</div>
                          </div>
                          <div>
                            <div class="info-label-front" style="padding: 15px 0">诊所类型:</div><div class="info-label" >{{clinicTypeArr[data_item.hospitalType]}}</div>
                          </div>
                          <div>
                            <div class="info-label-front" >诊所地址:</div><div class="info-label" >{{data_item.address}}</div>
                          </div>
                        </div>
                    </div>
                    <div class="hr-tcline" style="margin-top: 20px"></div>
                    <div>
                        <div class="info-title-front">▎</div><div class="info-title">法人信息</div>
                    </div>
                    <div>
                        <div class="owner-info-front">法人姓名:</div><div class="owner-info-label">{{data_item.legalName}}</div>
                    </div>
                    <div>
                        <div class="owner-info-front">法人身份证:</div><div class="owner-info-label">{{data_item.legalCard}}</div>
                    </div>
                    <div class="hr-tcline" style="margin-top: 20px"></div>
                    <div>
                        <div class="info-title-front">▎</div><div class="info-title">营业执照</div>
                    </div>
                    <img alt="image" class="info-bigimg" :src="data_item.busiLicenceUrl">
                    <div class="info-centerlabel">修改信息请联系客服: 400-0900-360</div>
                    <!--<div class="info-centerlabel" style="font-size: 12px;">Copyright © 2016 格格医疗科技(上海)有限公司 使用协议</div>-->
                </div>
            </div>
        <!--</div>-->
        <div class="info-centerlabel" style="font-size: 12px;">Copyright © 2016 格格医疗科技(上海)有限公司 使用协议</div>
    <!--</div>-->
</div>
</template>

<style>
    /*@import "../../style/xzy_css/xzycss.css";*/

    .owner-info-front{
        display: inline-block;
        margin: 10px 0 0 15px;
        color: #999;
    }
    .owner-info-label{
        display: inline-block;
        margin-left: 5px;
    }

    .info-title{
        color: #999;
    }
    /*分割线*/
    .hr-tcline{
        border: 0;
        border-bottom: 1px solid #e7eaec;
        /*border-style: solid !important;*/
    }

    /*正文表单*/
    .info-title-front,
    .info-title{
        padding: 15px 0 0 0;
        color: #1F2A44;
        font-size: 14px;
        display: inline-block;
    }
    .info-title{
        color: #999;
    }

    .info-bigimg,
    .info-smallimg{
        margin: 10px 0 0 15px;
        width: 120px;
        height: 160px;
    }
    .info-smallimg{
        height: 120px;
    }

    .info-label-front {
      display: inline-block;
      color: #999;
      font-size: 12px;
      margin-left: 40px;
    }
    .info-label{
        /*margin: 10px 0 0 5px;*/
        margin-left: 5px;
        font-size: 12px;
        color: #666;
        display: inline-block;
    }

    .info-centerlabel{
        margin:10px auto;
        padding-bottom: 10px;
        text-align: center;
        width: 100%;
        color: #666;
        font-size: 13px;
    }

</style>

<script>

    export default {

        data(){
            return {
                data_item:'',
                clinicTypeArr: [
                    "",
                    "中医诊所",
                    "西医诊所",
                    "中西医结合",
                    "专科诊所",
                    "综合门诊部",
                ],
                hospitalUrl:'',
            }
        },

        created(){
            this.clinic_info();
        },

        methods: {
            clinic_info: function () {
                var that = this;
                this.$api.get(this, this.$requestApi.clinicInfo, "", function (data) {
//                    console.log("请求的数据:" + JSON.stringify(data));
                  if(data.body.code == '00'){
                        that.data_item = data.body.data;
                        if(!that.data_item.hospitalUrl) {
                            that.hospitalUrl = "../../../static/img/LoginAndRegister/clinic_logo.png";
                        }else {
                            that.hospitalUrl = that.data_item.hospitalUrl;
                        }
                    } else {
                        console.log(data.body.msg);
                    }

                }, function (err) {
                    console.log(err);

                });
            }
        },
    }


</script>



