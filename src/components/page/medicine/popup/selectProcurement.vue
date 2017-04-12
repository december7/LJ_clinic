<template>
  <!--提取采购单-->
  <div class="modal inmodal fade" id="selectProcurement" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-lg" style="width: 1000px;">
      <div class="modal-content">
        <div class="tc-title-div">提取采购单</div>
        <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
          aria-hidden="true">&times;</span></button>
        <div class="hr-tcline"></div>
        <!--弹窗详细内容-->
        <div class="add_procurement_body">
          <div class="col-md-12 no-padding">
            <table class="table no-margins text-center white-bg">
              <thead>

              <tr >
                <th  v-for="(item,index) in procurement" :class="{right_border:index==procurement.length-1}"  class=" l_border bottom_border text-center top_border" style="border-bottom: none;">{{item.name}}</th>
              </tr>
              </thead>
              <tbody>
              <tr class="gradeC"   v-for="(procurementData, index) in procurementDatas" >
                <td    class="text-center l_border  bottom_border " >
                  <div class="checkbox checkbox-info goods_checkbox ">
                  <input  @click="selectCheckbox(index,$event)"  :index="index" type="checkbox" name="checkbox"  :checked="procurementData.selectFlag" >

                </div></td>
                <td    class="text-center l_border  bottom_border " >{{++index}}</td>
                <td    class="text-center l_border  bottom_border " >{{procurementData.ostockId}}</td>
                <td    class="text-center l_border  bottom_border " >{{$stringUtils.dateFormat(procurementData.createDate)}}</td>
                <td    class="text-center l_border  bottom_border " >{{procurementData.supplierName}}</td>
                <td    class="text-center l_border  bottom_border " >{{procurementData.operatorName}}</td>
                <td    class="text-center l_border  bottom_border " >{{procurementData.billId}}</td>
                <td    class="text-center l_border  bottom_border " >{{procurementData.remark}}</td>
                <td    class="text-center l_border  bottom_border right_border" >{{$enumeration.getState (procurementData.state)}}</td>
                 </tr>
              </tbody>
              <tbody v-if="procurementDatas.length===0" ><tr class="gradeC"> <td class="text-center" colspan="8" >{{$toastContent.toastTableContent}}</td></tr></tbody>

            </table>

          </div>
        </div>
        <button style='margin: 30px 10px 30px 335px;' class='form-btn-black' data-dismiss="modal" @click="accomplish"  :disabled="isDisabled" >完成</button>
        <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
      </div>
      <!--<div  class="modal-content"></div>-->
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      procurementDatas:{
        default: []
      },
    },
    created(){
    },
    mounted: function(){

    },

    data(){
      return {
        selectFlagIndex: -1,
        isDisabled: false,
        procurement:[
          {  name: '选择',},
          {  name: '序号',},
          {  name:"采购单号",},
          {  name:"订单日期",},
          {  name:"供应商",},
          {  name:"采购员",},
          {  name:"采购员电话",},
          {  name:"备注",},
          {  name:"状态"},
        ],
      }
    },



    methods: {
      selectCheckbox: function (i,e) {
        var event = $(e.currentTarget);
        let that=this;
        if (that.selectFlagIndex!=-1){
          $(event).attr('checked',true);
          $(that.selectFlagIndex).attr('checked',false);
        }else {
          $(event).attr('checked',true);
        }
        that.selectFlagIndex=event;
      },
      accomplish:function () {
        var that=this;
        if (  that.selectFlagIndex!=-1){
          that.$parent.getViewGoods($( that.selectFlagIndex).attr('index'))
          that.selectFlagIndex=-1;
        }
      },

    },

  }

</script>
<style>

</style>
