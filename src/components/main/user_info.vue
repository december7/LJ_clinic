<template>
    <!--模态弹窗开始--个人信息-->
    <div class="modal inmodal fade" id="selfinfo" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="width: 880px;">
            <div class="modal-content">
                <div class="tc-title-div">个人信息</div>
                <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                        aria-hidden="true">&times;</span></button>
                <div class="hr-tcline"></div>
                <!--弹窗详细内容-->
                <div>
                    <div class='tc-form-labeldiv'>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名&nbsp<span style="color: red;">&#10045</span></div>
                    <div class="tc-form-content">{{data_item.operatorName}}</div>
                    <div class='tc-form-labeldiv'>微&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp信</div>
                    <div class="tc-form-content">{{data_item.wechatNo}}</div>
                    <div class='tc-form-labeldiv'>邮&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp箱</div>
                    <div class="tc-form-content">{{data_item.email}}</div>
                    <div class='tc-form-labeldiv'>电&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp话&nbsp<span style="color: red;">&#10045</span></div>
                    <div class="form-inputbg">
                        <input @blur="loseFocus()" v-bind:readonly="inputState" class="form-inputbg-input" v-model="data_item.billId">
                        <span style="color: #ccc;">|</span>
                        <button class="form-inputbg-button" @click="change_phone">更换</button>
                    </div>
                    <div class='tc-form-labeldiv'>角&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp色</div>
                    <div class="tc-form-content">{{data_item.roleName}}</div>
                    <!--<div class='tc-form-labeldiv'>科&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp室</div>-->
                    <!--<div class="tc-form-content">{{data_item.department}}</div>-->
                </div>
                <div class="hr-dashed"></div>
                <div>
                    <div class='tc-form-labeldiv'>登录账号&nbsp<span style="color: red;">&#10045</span></div>
                    <div class="tc-form-content">{{data_item.billId}}</div>
                </div>
                <div>
                    <div class='tc-form-labeldiv'>登录密码&nbsp<span style="color: red;">&#10045</span></div>
                    <div class="form-inputbg">
                        <input @blur="pwLoseFocus()" v-bind:readonly="pwInputState" class="form-inputbg-input" type="password" v-model="data_item.password">
                        <span style="color: #ccc;">|</span>
                        <button class="form-inputbg-button" @click="change_password">修改密码</button>
                    </div>
                </div>
                <button @click="saveUserInfo(data_item)" style='margin: 30px 10px 30px 335px;' class='form-btn-black' data-dismiss="modal">完成</button>
                <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
            </div>
        </div>
    </div>
</template>
<style>
    /*弹窗表单*/
    .tc-form-labeldiv{
        padding:20px 0 0 30px;
        display: inline-block;
        width: 100px;
    }
    .tc-form-content{
        padding:20px 0 0 10px;
        display: inline-block;
        width: 320px;
    }

    .form-inputbg{
        background: #F9F9F9;
        border-radius: 1px;
        border: 0px;
        display: inline-block;
        padding: 6px 12px;
        width: 320px;
    }
    .form-inputbg-input{
        background: #F9F9F9;
        width: 200px;
        display: inline-block;
        border: 0px;
    }
    .form-inputbg-input:focus {
        border: 0;
        outline: 0;
    }
    .form-inputbg-button{
        background-color: transparent;
        border:0;
        color: #4ca7d2;
        text-align: center;
        width:80px;
        font-size: 12px;
    }


    /*虚线分割线*/
    .hr-dashed{
        border: 1px dashed #e7eaec;
        margin:40px 30px 10px 30px;
    }
</style>
<script>

    export default {

        data(){
            return {
                data_item:'',
                inputState: true,
                pwInputState: true,
                userPhone:'',
                userPassword:'',
            }
        },

        created(){
            this.user_info();
        },

        methods: {
            user_info: function () {
                var that = this;
                this.$api.get(this, this.$requestApi.userinfo, "", function (data) {
                    if (data.body.code == '00') {
                        that.data_item = data.body.data;
                        that.userPhone = that.data_item.billId;
                        that.userPassword = that.data_item.password;
                    } else {
                        console.log(data.body.msg);
                    }
                }, function (err) {
                    console.log(err);

                });
            },
          saveUserInfo :function (data_item) {
            if(data_item.billId!=this.userPhone) {
              console.log("修改过了账号");
            }
            if(data_item.password!=this.userPassword) {
              console.log("修改过了密码");
            }
          },

            change_phone: function () {
                this.inputState=false;
            },
            change_password: function () {
                this.pwInputState=false;
            },

            loseFocus:function () {
                this.inputState = true;
            },
            pwLoseFocus:function () {
                this.pwInputState = true;
            }

        },
    }

</script>
