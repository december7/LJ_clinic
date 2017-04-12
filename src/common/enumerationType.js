/**
 * Created by imac on 17/3/3.
 */
export  default {


  /**分页条数*/
  iDisplayLength:10,
    /**分页条数*/
  pageSize:9,
  /**采购*/
  procurementType:1,
 /**入库*/
 storageType:2,
  /**出库*/
  outputType:4,
  /**退货*/
  returnsType:5,
  /**盘点*/
  inventoryType:3,
  /**弹窗时间*/
  timers:2000,
  /**成功*/
  success:"success",
  /**失败*/
  error:"error",
    /**治疗*/
    projectTreatment:1,
    /**其他*/
    projectOther:2,
  /**计算页数*/
  getPageNumber:function (currentNum) {
    return parseInt( (parseInt(currentNum) + this.pageSize - 1)/this.pageSize);
  },  /**计算页数*/
  getPageIDisplayLength:function (currentNum) {
    return parseInt( (parseInt(currentNum) + this.iDisplayLength - 1)/this.iDisplayLength);
  },
}
