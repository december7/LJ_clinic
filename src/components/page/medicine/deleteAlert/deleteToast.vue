<template>
    <!--模态弹窗开始--个人信息-->
    <div class="modal inmodal fade" id="selfinfo" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="width: 300px;">
            <div class="modal-content">
                <div class="tc-title-div">个人信息</div>
                <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
                        aria-hidden="true">&times;</span></button>
                <div class="hr-tcline"></div>
                <!--弹窗详细内容-->
              <div style="    padding: 12px;line-height: 20px;text-align: center; font-size: 13px">确定删除该采购单吗?<br/>
                   删除后将不能恢复</div>
              <div style="    padding: 15px;">
                <button  class='alert-btn-black'  data-dismiss="modal" @click="complete">完成</button>
                <button class='layui-layer-close alert-btn-white' data-dismiss="modal">取消</button>
              </div>
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
      props: {
        selectedIndex:{
          default: 0
        },


      },

        data(){
            return {

            }
        },

        created(){

        },

        methods: {
          complete:function () {
            this.$parent.procurementDelete(this.selectedIndex);
          }
        },
    }

</script>
<style>
  .alert-btn-black{
    border: 0px;
    border-radius: 1px;
    color: white;
    background: #1F2A44;
    font-size: 14px;
    width: 100px;
    height: 30px;
    outline: none;
    text-align: center;
  }
  .alert-btn-white{
    border: 1px solid #0B0608;
    border-radius: 1px;
    color: #0B0608;
    background: white;
    font-size: 14px;
    width: 100px;
    height: 30px;
    outline: none;
    position: relative;
    float: right;
    text-align: center;
  }
</style>
