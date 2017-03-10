<template>
  <div class="ibox-content">
    <div style="margin: 3px 3px">
      <!--按钮-->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addnew">选择科室</button>
      <!--模态弹窗开始--选择科室-->
      <div class="modal inmodal fade" id="addnew" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" style="width: 480px;">
          <div class="modal-content">
            <div class="tc-title-div">选择科室</div>
            <button type="button" class="close" data-dismiss="modal" style="margin: 11.5px 15px 0 0;"><span
              aria-hidden="true">&times;</span></button>
            <div class="hr-tcline"></div>
            <div style='margin:10px'>
              <button id='1' class='form-btn-gray'>内科</button><button id='2' class='form-btn-gray'>外科</button>
              <button id='3' class='form-btn-gray'>妇产科</button><button id='4' class='form-btn-gray'>儿科</button>
              <button id='5' class='form-btn-gray'>全科</button><button id='6' class='form-btn-gray'>生殖中心</button>
              <button id='7' class='form-btn-gray'>骨外科</button><button id='8' class='form-btn-gray'>五官科</button>
              <button id='9' class='form-btn-gray'>肿瘤科</button><button id='10' class='form-btn-gray'>皮肤性病科</button>
              <button id='11' class='form-btn-gray'>精神心理科</button><button id='12' class='form-btn-gray'>中医科</button>
              <button id='13' class='form-btn-gray'>传染病科</button><button id='14' class='form-btn-gray'>其他科室</button>
            </div>
            <button style='margin: 30px 10px 30px 135px;' class='form-btn-black'>确定</button>
            <button class='layui-layer-close form-btn-white' data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>序号</th>
        <th>科室</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(data_item,index) in data_items">
        <td>{{index+1}}</td>
        <td>{{departArr[index]}}</td>
        <td>{{data_item.depState == 1 ? '正常' : '停用'}}</td>
        <td><a href="javascript:;" data-toggle="modal" data-target="#edit">{{data_item.depState == 1 ? '停用' : '启用'}}</a></td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
  export default{
    data(){
      return {
        departArr:['全科','外科','妇科','内科'],
        data_items:[],
      }
    },

    created(){
      this.department_manage();
    },

    methods: {
      department_manage: function () {
        var that = this;
        this.$api.get(this, this.$requestApi.departmentManage, "", function (data) {
          console.log("请求的数据:" + JSON.stringify(data));
          if (data.status == '200') {
            that.data_items = data.body.data;
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


<style>
  /*@import "../../style/xzy_css/xzycss.css";*/

  /*分割线*/
  .hr-tcline{
    border: 0;
    border-bottom: 1px solid #e7eaec;
    /*border-style: solid !important;*/
  }

  .form-btn-gray{
    border: 0px;
    border-radius: 1px;
    color: #666;
    background: #e8e8e8;
    font-size: 14px;
    width: 90px;
    height: 30px;
    margin: 20px 0px 0px 20px;
    outline: none;
  }
  .form-btn-gray:focus{
    border: 0px;
    border-radius: 1px;
    color: #fff;
    background: #1F2A44;
    font-size: 14px;
    width: 90px;
    height: 30px;
    margin: 20px 0px 0px 20px;
    outline: none;
  }
  .form-btn-grayClick{
    border: 0px;
    border-radius: 1px;
    color: #fff;
    background: #1F2A44;
    font-size: 14px;
    width: 90px;
    height: 30px;
    margin: 20px 0px 0px 20px;
    outline: none;
  }

</style>
