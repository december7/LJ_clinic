<template>
  <div>
    <div class="row white-bg" style="padding: 0 20px; height: 35px">
      <div class="col-sm-12">
        <div class="ibox-title no-top-border pull-left" style="padding-left: 0;min-height: 35px;padding-top: 10px">{{ostockTypeName}}审核</div>

        <div class="pull-right m-r-md" style="line-height: 35px">
          <a @click="$router.back()">返回上一级</a>
        </div>
      </div>
    </div>

    <!--中间内容区-->
    <div class="wrapper wrapper-content animated fadeInRight no_top_padding" style="margin-top: 20px">
      <div class="ibox float-e-margins no-margins border-bottom">
				<div class="ibox-title no-borders msg_item_title">
					<h5>{{ostockTypeName}}单</h5>
				</div>
        <div class="ibox-content no-borders col-sm-12">
          <div class="col-sm-4" style="margin-top:-15px">{{ostockTypeName}}员 : {{data_item.operatorName}}</div>
          <div class="col-sm-4" style="margin-top:-15px">{{ostockTypeName}}员电话 : {{data_item.billId}}</div>
          <div class="col-sm-12" style="margin-top:15px">备注信息 : {{data_item.remark}}</div>
        </div>

        <div class="ibox-title no-borders msg_item_title col-sm-12" style="margin-top:-15px">
					<h5>{{ostockTypeName}}明细</h5>
				</div>

        <div class="ibox-content no-borders col-sm-12" style="margin-top:-15px">
          <table class="table table-striped table-bordered table-hover dataTables-example">
            <thead>
              <tr>
                <th v-for="item in tableTitles" class="text-center">{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="gradeC" v-for="(data_prod,index) in data_prods">
                <td class="text-center">{{index+1}}</td>
                <td class="text-center">{{data_prod.genericName}}</td>
                <td class="text-center">{{data_prod.prodSpec}}</td>
                <td class="text-center">{{$enumeration.getProjectUnit(data_prod.prodUnit)}}</td>
                <td class="text-center">{{data_prod.supplierName}}</td>
                <td class="text-center">{{data_prod.minimumPrice}}</td>
                <td class="text-center">{{data_prod.purchasePrice}}</td>
                <td class="text-center">{{data_prod.minimumPrice}}</td>
                <td class="text-center">{{data_prod.storageNum}}</td>
                <td class="text-center">{{data_prod.minimumPrice}}</td>
                <td class="text-center">{{data_prod.expireDate}}</td>
                <td class="text-center"><a>删除</a></td>
              </tr>
            </tbody>
          </table>
          <h4>总额 (元) : <span style="color: #ED6777; font-size: 18px">1000</span></h4>

          <div class="col-sm-12" style="text-align: center">
            <button @click="stockCheckDetail(3)" type="button" class="white_btn">审核不通过{{getOstockId}}</button>
            <button @click="stockCheckDetail(1)" type="button" class="blue_btn">审核通过</button>
            <button type="button" class="blue_btn">打印</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .blue_btn{
		width: 100px;
		height: 28px;
		background-color: #324367;
		color: white;
		border: 1px solid #324367;
		border-radius: 2px;
	}
	.white_btn{
		width: 100px;
		height: 28px;
		background-color: white;
		color: #324367;
		border: 1px solid #324367;
		border-radius: 2px;
	}
</style>
<script>
  export default {
    data(){
      return {
        tableTitles: [
          "序号","通用名","规格","单位","生产厂家",
          "零售价","成本价","成本合价","数量",
          "批号","有效期","操作",
        ],
        ostockId: '',
        ostockType: '',
        ostockTypeName: '',
        data_item: '',
        data_prods: [],
      }
    },
    methods: {
      getDetail:function () {
        var that=this;
        this.$api.get(this,this.$requestApi.stockViewDetail+this.ostockId,'',function  (data) {
          if(data.status=='200'){
            that.data_item = data.body.data;
            that.data_prods = data.body.prods;
            console.log(data.body.data);
          }else{
            console.log(data.body.msg);
          }
        },function (err) {
          console.log(err);
        });
      },
      stockCheckDetail: function (stateValue){
        var that=this;
        this.$api.post(this,this.$requestApi.stockCheckDetail+this.ostockId,{state:stateValue},function  (data) {
          if(data.status=='200'){
              swal({title:data.body.msg,text:"",type:"success",timer:2000,showConfirmButton:false});
              that.back();
            console.log(data.body.data);
          }else{
            console.log(data.body.msg);
          }
        },function (err) {
          console.log(err);
        });
      },
      back: function () {
        history.back();
      },
    },
    computed: {
      getOstockId:function () {
        this.ostockType = this.$store.getters.getOstockType;
        this.ostockId = this.$store.getters.getOstockId;
        this.getDetail();
        if (this.ostockType == 1){
          this.ostockTypeName="采购";
        }else if (this.ostockType == 2){
          this.ostockTypeName="入库";
        }else if (this.ostockType == 3){
          this.ostockTypeName="出库";
        }else if (this.ostockType == 4){
          this.ostockTypeName="退货";
        }else if (this.ostockType == 5){
          this.ostockTypeName="盘点";
        }
        return "";
      },

    },
  }
</script>
