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
  outputType:3,
  /**退货*/
  returnsType:4,
  /**盘点*/
  inventoryType:5,
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
    /**用法*/
    usageTypeItems: [
        {titleName: '口服'},
        {titleName: '直肠用药'},
        {titleName: '舌下用药'},
        {titleName: '注射用药'},
        {titleName: '皮下注射'},
        {titleName: '皮内注射'},
        {titleName: '肌肉注射'},
        {titleName: '静脉滴注'},
        {titleName: '吸入用药'},
        {titleName: '局部用药'},
        {titleName: '椎管内用药'},
        {titleName: '关节腔内用药'},
        {titleName: '胸膜腔用药'},
        {titleName: '腹腔用药'},
        {titleName: '阴道用药'},
        {titleName: '气管内用药'},
        {titleName: '滴眼'},
        {titleName: '滴鼻'},
        {titleName: '喷喉'},
        {titleName: '含化'},
        {titleName: '敷伤口'},
        {titleName: '擦皮肤'},
        {titleName: '其他局部用药途径'},
        {titleName: '其他用药途径'},
    ],
    /**频次*/

    frequencyItems: [
        {titleName:'每天一次(qd)'},
        {titleName:'每天二次(bid)'},
        {titleName:'每天三次(tid)'},
        {titleName:'每天四次(qid)'},
        {titleName:'每天五次(Quingid)'},
        {titleName:'每周一次(qw)'},
        {titleName:'每周二次(biw)'},
        {titleName:'每周三次(tiw)'},
        {titleName:'每半小时一次(q1/2h)'},
        {titleName:'每小时一次(qh)'},
        {titleName:'每2时一次(q2h)'},
        {titleName:'每3时一次(q3h)'},
        {titleName:'每4时一次(q4h)'},
        {titleName:'每5时一次(q5h)'},
        {titleName:'每6时一次(q6h)'},
        {titleName:'每8时一次(q8h)'},
        {titleName:'每12时一次(q12h)'},
        {titleName:'每晚一次(qn)'},
        {titleName:'隔天一次(qod)'},
        {titleName:'五天一次(q5d)'},
        {titleName:'十天一次(q10d)'},
        {titleName:'每三天一次(q3d)'},
        {titleName:'每二周一次(2w)'},
        {titleName:'12小时维持'},
        {titleName:'24小时维持'},
        {titleName:'立即(st)'},
        {titleName:'必要时使用(prn)'},
        {titleName:'其他'},
        {titleName:'Q4D(一次/4 天)'},
        {titleName:'Q90M(1 个半小时一次'},
        {titleName:'QID7(7 次/日。6:00-9:00)'},
        {titleName:'QMON(每月 1 次)'},
        {titleName:'QOD/BID(2 次/隔日 8-4)'},
        {titleName:'QOD/TID(3 次/隔日 8-12-4)'},
        {titleName:'QW(3)BID(每周 3 天每日 2 次)'},
        {titleName:'W5D(周一～～周五 8am)'},
        {titleName:'W6D(周一～～周六 8am)'},
    ],
    /**单位**/
    splitUnitItems: [
        {titleName: '袋'},
        {titleName: '片'},
        {titleName: '支'},
        {titleName: '粒'},
        {titleName: '瓶'},
        {titleName: 'mg'},
        {titleName: 'ml'},
        {titleName: 'l'},
        {titleName: 'ug'},
        {titleName: 'IU'},
        {titleName: 'U'},
        {titleName: '包'},
        {titleName: '盒'},
        {titleName: '枚'},
        {titleName: '丸'},
        {titleName: '喷'},
        {titleName: '颗'},
        {titleName: '滴'},
        {titleName: 'cm'},
        {titleName: '少许'},
        {titleName: '适量'},
        {titleName: '对'},
        {titleName: '个'},
        {titleName: '条'},
        {titleName: '条'},
        {titleName: '板'},
        {titleName: '件'},
        {titleName: '套'},
        {titleName: '卷'},
        {titleName: '副'},
        {titleName: '只'},
        {titleName: '根'},
        {titleName: '箱'},
        {titleName: '台'},
        {titleName: '贴'},
        {titleName: '万单位'},
    ],
  /**计算页数*/
  getPageNumber:function (currentNum) {
    return parseInt( (parseInt(currentNum) + this.pageSize - 1)/this.pageSize);
  },
}
