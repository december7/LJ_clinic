<template>
  <div>
    <div class="row white-bg" style="padding: 0 20px; height: 35px">
      <div class="col-sm-12">
        <div class="ibox-title no-top-border pull-left" style="padding-left: 0;min-height: 35px;padding-top: 10px;">{{ostockTypeName}}审核</div>

        <div class="pull-right m-r-md" style="line-height: 35px">
          <a @click="$router.back()">返回上一级</a>
        </div>
      </div>
    </div>

    <!--中间内容区-->
    <div class="wrapper wrapper-content animated fadeInRight no_top_padding" style="margin-top: 20px">
      <div class="ibox float-e-margins no-margins border-bottom">
				<div class="ibox-title no-borders msg_item_title">
					<h5>{{data_item.ostockType==$enumerationType.storageType ? '采购入库单':ostockTypeName+'单'}}</h5>
				</div>
        <div class="ibox-content no-borders col-sm-12">
          <div v-show="data_item.ostockType == $enumerationType.procurementType || data_item.ostockType == $enumerationType.storageType" class="col-sm-4" style="margin-top:-15px">供应商 : {{data_item.supplierName}}</div>
          <div class="col-sm-4" style="margin-top:-15px">{{ostockTypeName}}员 : {{data_item.operatorName}}</div>
          <div class="col-sm-4" style="margin-top:-15px">{{ostockTypeName}}员电话 : {{data_item.billId}}</div>
          <div class="col-sm-12" style="margin-top:15px">备注信息 : {{data_item.remark}}</div>
        </div>

        <div class="ibox-title no-borders msg_item_title col-sm-12" style="margin-top:-15px">
					<h5>{{data_item.ostockType == $enumerationType.inventoryType ? '盘点差异记录': ostockTypeName+'明细'}}</h5>
				</div>

        <div class="ibox-content no-borders col-sm-12" style="margin-top:-15px">
          <table v-show="ostockType == $enumerationType.procurementType && data_prods.length > 0" class="table table-striped table-bordered table-hover dataTables-example">
            <thead>
              <tr>
                <th v-for="item in tableTitles.caigou" class="text-center">{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="gradeC" v-for="(data_prod,index) in data_prods">
                <td class="text-center">{{index+1}}</td>
                <td class="text-center">{{data_prod.prodName}}</td>
                <td class="text-center">{{data_prod.prodSpec}}</td>
                <td class="text-center">{{data_prod.manufacturer}}</td>
                <td class="text-center">{{$enumeration.getProjectUnit(data_prod.prodUnit)}}</td>
                <td class="text-center">{{data_prod.lastPrice/100}}</td>
                <td class="text-center">{{data_prod.purchasePrice/100}}</td>
                <td class="text-center">{{data_prod.retailPrice/100}}</td>
                <td class="text-center">{{data_prod.purchaseNum}}</td>
                <td class="text-center">{{data_prod.purchasePrice/100}}</td>
                <td class="text-center">{{data_prod.purchaseNum * Number(data_prod.purchasePrice/100)}}</td>
                <td class="text-center">{{data_prod.prodRemark}}</td>
              </tr>
            </tbody>
          </table>
          <table v-show="ostockType == $enumerationType.storageType && data_prods.length > 0" class="table table-striped table-bordered table-hover dataTables-example">
            <thead>
              <tr>
                <th v-for="item in tableTitles.ruku" class="text-center">{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="gradeC" v-for="(data_prod,index) in data_prods">
                <td class="text-center">{{index+1}}</td>
                <td class="text-center">{{data_prod.prodName}}</td>
                <td class="text-center">{{data_prod.prodSpec}}</td>
                <td class="text-center">{{$enumeration.getProjectUnit(data_prod.prodUnit)}}</td>
                <td class="text-center">{{data_prod.manufacturer}}</td>
                <td class="text-center">{{data_prod.purchaseNum}}</td>
                <td class="text-center">{{data_prod.storageNum}}</td>
                <td class="text-center">{{data_prod.purchasePrice/100}}</td>
                <td class="text-center">{{data_prod.batchNumber}}</td>
                <td class="text-center">{{$stringUtils.dateFormat(data_prod.expireDate)}}</td>
                <td class="text-center">{{data_prod.storageNum * Number(data_prod.purchasePrice/100)}}</td>
                <td class="text-center">{{data_prod.prodRemark}}</td>
              </tr>
            </tbody>
          </table>
          <table v-show="ostockType == $enumerationType.outputType && data_prods.length > 0" class="table table-striped table-bordered table-hover dataTables-example">
            <thead>
              <tr>
                <th v-for="item in tableTitles.chuku" class="text-center">{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="gradeC" v-for="(data_prod,index) in data_prods">
                <td class="text-center">{{index+1}}</td>
                <td class="text-center">{{data_prod.prodName}}</td>
                <td class="text-center">{{data_prod.prodSpec}}</td>
                <td class="text-center">{{data_prod.manufacturer}}</td>
                <td class="text-center">{{data_prod.preStockNum}}</td>
                <td class="text-center">{{data_prod.retailPrice/100}}</td>
                <td class="text-center">{{data_prod.splitPrice/100}}</td>
                <td class="text-center">{{data_prod.useNum}}</td>
                <td class="text-center">{{$enumeration.getProjectUnit(data_prod.prodUnit)}}</td>
                <td class="text-center">{{data_prod.prodRemark}}</td>
              </tr>
            </tbody>
          </table>
          <table v-show="ostockType == $enumerationType.returnsType && data_prods.length > 0" class="table table-striped table-bordered table-hover dataTables-example">
            <thead>
              <tr>
                <th v-for="item in tableTitles.tuihuo" class="text-center">{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="gradeC" v-for="(data_prod,index) in data_prods">
                <td class="text-center">{{index+1}}</td>
                <td class="text-center">{{data_prod.prodName}}</td>
                <td class="text-center">{{data_prod.prodSpec}}</td>
                <td class="text-center">{{data_prod.manufacturer}}</td>
                <td class="text-center">{{data_prod.batchNumber}}</td>
                <td class="text-center">{{$stringUtils.dateFormat(data_prod.expireDate)}}</td>
                <td class="text-center">{{data_prod.stockPrice/100}}</td>
                <td class="text-center">{{data_prod.surplusStockNum}}</td>
                <td class="text-center">{{data_prod.retreatNum}}</td>
                <td class="text-center">{{$enumeration.getProjectUnit(data_prod.prodUnit)}}</td>
                <td class="text-center">{{data_prod.prodRemark}}</td>
              </tr>
            </tbody>
          </table>
          <table v-show="ostockType == $enumerationType.inventoryType && data_prods.length > 0" class="table table-striped table-bordered table-hover dataTables-example">
            <thead>
              <tr>
                <th v-for="item in tableTitles.pandian" class="text-center">{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="gradeC" v-for="(data_prod,index) in data_prods">
                <td class="text-center">{{index+1}}</td>
                <td class="text-center">{{data_prod.prodName}}</td>
                <td class="text-center">{{data_prod.prodSpec}}</td>
                <td class="text-center">{{data_prod.manufacturer}}</td>
                <td class="text-center">{{data_prod.batchNumber}}</td>
                <td class="text-center">{{$stringUtils.dateFormat(data_prod.expireDate)}}</td>
                <td class="text-center">{{$enumeration.getProjectUnit(data_prod.prodUnit)}}</td>
                <td class="text-center">{{data_prod.surplusStockNum}}</td>
                <td class="text-center">{{data_prod.stockPrice/100}}</td>
                <td class="text-center">{{data_prod.realStockNum}}</td>
                <td class="text-center">{{data_prod.realStockNum-data_prod.surplusStockNum}}</td>
                <td class="text-center">{{(data_prod.realStockNum-data_prod.surplusStockNum)*data_prod.stockPrice/100}}</td>
                <td class="text-center">{{data_prod.prodRemark}}</td>
              </tr>
            </tbody>
          </table>

          <div class="col-sm-6">
            <h4>总额 (元) : <span style="color: #ED6777; font-size: 18px;">{{(data_item.totalPrice/100).toFixed(2)}}</span></h4>
          </div>

          <div class="col-sm-6" style="margin-top:5px;">
            <button type="button" class="blue_btn" style="float:right; margin-left:10px;">打印</button>
            <button v-show="data_item.state == 2 || data_item.state == 3" @click="stockAuditNumber(1)" type="button" class="blue_btn" style="float:right; margin-left:10px;" data-toggle="modal" data-target="#auditOpinion" data-backdrop="static">审核通过</button>
            <button v-show="data_item.state == 2 || data_item.state == 3" @click="stockAuditNumber(3)" type="button" class="white_btn" style="float:right" data-toggle="modal" data-target="#auditOpinion" data-backdrop="static">审核不通过{{getOstockId}}</button>
          </div>
        </div>
      </div>
    </div>
    <!--审核意见模态框-->
     <div class="modal fade" role="dialog" id="auditOpinion">
       <div class="modal-dialog">
         <div class="modal-content">
           <div class="modal-header">
             <button type="button" class="close" data-dismiss="modal">
               <span>&times;</span>
             </button>
             <h5 class="modal-title">审核意见</h5>
           </div>
           <div class="modal-body no-padding">

             <div style="width: 100%; padding: 10px 20px">
               <textarea v-model="auditOpinion" class="model_input"></textarea>
             </div>
             <div id="dialog-body" class="text-center m-b">
               <button @click="stockCheckDetail(auditNumber)" class="btn btn-primary btn-w-m" data-dismiss="modal" >完成</button>
               <button class="btn btn-default btn-w-m" data-dismiss="modal">取消</button>
             </div>

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
        tableTitles: {
          caigou: ["序号","商品名称","规格","生产厂家","单位",
          "最近采购价(元)","最低采购价(元)","零售价(元)","采购数量",
          "采购价(元)","采购金额(元)","备注"],
          ruku: ["序号","商品名称","规格","单位","生产厂家",
          "采购数量","到货数量","采购价(元)","批号",
          "有效期","采购金额(元)","备注"],
          chuku: ["序号","商品名称","规格","生产厂家",
          "库存数量","零售价(元)","入库价(元)","出库数量",
          "出库单位","备注"],
          tuihuo: ["序号","商品名称","规格","生产厂家",
          "批号","有效期","采购价(元)","库存数量",
          "退货数量","退货单位","备注"],
          pandian: ["序号","商品名称","规格","生产厂家","批号",
          "有效期","单位","库存数量","入库价(元)","实盘","差异数量",
          "差异金额(元)","备注"],
        },
        ostockId: '',
        ostockType: '',
        ostockTypeName: '',
        data_item: '',
        data_prods: [],
        auditOpinion: '',
        auditNumber: '',
      }
    },
    methods: {
      stockAuditNumber: function (num) {
        this.auditNumber = num;
      },
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
        this.$api.post(this,this.$requestApi.stockCheckDetail+this.ostockId,{state:stateValue,auditOpinion:this.auditOpinion},function  (data) {
          if(data.body.code =='00'){
            swal({title:data.body.msg,text:"",type:"success",timer:2000,showConfirmButton:false});
            that.back();
            console.log(data.body.data);
          }else{
            swal({title:data.body.msg,text:"",type:"error",timer:2000,showConfirmButton:false});
            that.back();
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
        if (this.ostockType == this.$enumerationType.procurementType){
          this.ostockTypeName="采购";
        }else if (this.ostockType == this.$enumerationType.storageType){
          this.ostockTypeName="入库";
        }else if (this.ostockType == this.$enumerationType.outputType){
          this.ostockTypeName="出库";
        }else if (this.ostockType == this.$enumerationType.returnsType){
          this.ostockTypeName="退货";
        }else if (this.ostockType == this.$enumerationType.inventoryType){
          this.ostockTypeName="盘点";
        }
        return "";
      },

    },
  }
</script>
