/**
 * Created by imac on 17/1/4.
 * 请求地址api
 */
export  default {
  login: "sec/login/user/1", //登录
  operatorPrivs: "sec/login/operatorPrivs",//tab查询
  //注册和忘记密码
  sendCode: "sec/sms/sendRandomCode", //发送验证码
  findPwd: "sec/login/findPwd", //找回密码
  sendFindPwdCode: "sec/sms/sendPwdRandomCode", //发送找回密码的验证码
  resetPwd: "sec/login/resetPwd", //重置密码
  updatePwd: "sec/oper/updateOperPwd", //更换员工密码
  sendPhoneCode: "sec/sms/updateBillIdRandomCode", //更换手机号发的验证码
  resetPhone: "sec/oper/updateBillId", //更换手机号
  registClinic: "sec/register/registerSecHospital", //注册诊所
  checkRegistedPhone: "sec/oper/queryBillId/", //检查该手机号是否注册
  //
  auth: "sec/priv/bPriv",//登录鉴权
  staticData: "base/staticData/list",//获取枚举值
  registeredList: "order/registeredList",
  todayPatient: "order/todayPatients",//查询今日患者
  historyPatients: "order/historyPatients",//查询历史患者
  orderDoctorRreat: "order/doctorRreat/",//确认接诊今日患者
  //设置管理接口
  clinicInfo: "sec/hospital/queryHospital", //诊所信息
  roleManage: "sec/role/queryRoles", //查询全部角色
  addNewRole: "sec/role/addRole", //新增角色
  updateRole: "sec/role/updateRole", //编辑角色
  queryRolePower: "sec/rolePriv/queryRolePrivs", //查询角色的权限
  saveRolePower: "sec/rolePriv/saveRolePriv", //保存角色的权限
  staffManage: "sec/oper/queryOpers", //查询全部员工
  addNewStaff: "sec/oper/addOper", //新增员工
  stopStaff: "sec/oper/stopOper", //停用员工
  startStaff: "sec/oper/startOper", //启用员工
  updateStaff: "sec/oper/updateOper", //编辑员工
  costSetList: "usr/usrDoctor/list", //查询挂号设置列表
  costDocList: "usr/usrDoctor/listSecOper", //可挂号医生的下拉框列表
  costDepList: "base/depart/list", //查询科室列表
  addNewCost: "usr/usrDoctor/create/", //新增挂号设置
  editCost: "usr/usrDoctor/edit/", //编辑挂号设置
  itemManageList: "prod/project/search/", //查询项目设置列表
  notStopProList: "prod/project/search/normal/", //查询未停用的项目设置列表
  // searchProdsList: "prod/inventory/list/stock",//查询未停用的商品列表（有库存的）
  addNewItem : "prod/project/create/", //新增治疗项目或者其他收费
  editItem: "prod/project/update/", //编辑治疗项目或其他收费
  stopItem: "prod/project/disable/", //停用治疗项目或其他收费
  startItem: "prod/project/enable/", //启用治疗项目或其他收费
  deleteItem: "prod/project/delete/", //删除治疗项目或其他收费
  searchTemplateList: "prod/template/search/", //查询项目模板列表
  userinfo: "sec/oper/queryOper", //查询个人信息
  searchbyname: "usr/usrUser/searchbyname", //患者根据姓名模糊查询
  changePhone: "sec/oper/updateBillId", //修改手机号
  changePassword: "sec/oper/updateOperPwd", //修改密码
  addNewCureTemp: "prod/template/create/cure", //新增治疗模板
  searchTemp: "prod/template/viewProjects/", //查询模板项目(查项目的数量)
  changeCureTemp: "prod/template/update/cure/", //修改治疗模板
  changeProdTemp: "prod/template/update/prescription/", //修改处方模板
  startTemplate: "prod/template/enable/", //启用项目模板
  stopTemplate: "prod/template/disable/", //停用项目模板
  deleteTemplate: "prod/template/delete/", //删除项目模板
  searchProdsList: "prod/goods/search", //查询商品列表（不管有没有库存）
  addNewWCTemplate: "prod/template/create/prescription/", //新增西成药或中药模板
  orderProjectInfo: 'order/projectInfo/',//治疗，其他收费项目查询
  //发药
  waitMediList: "order/registereds/waitMedicine", //待发药列表
  dispensingDetails: "order/medicines/needWait/", //待发药详情
  sendMedicines: "order/medicines/finish/", //发药
  hasMediList: "order/registereds/hasMedicine", //已发药列表
  hasMediDetails: "order/medicines/hasFinish/", //已发药详情
  //治疗
  waitTreatList: "order/registereds/waitTreat", //待治疗列表
  waitTreatDetail: "order/treatments/needWait/", //待治疗详情
  hasTreatList: "order/registereds/hasTreat", //已治疗列表
  hasTreatDetail: "order/treatments/hasFinish/", //已治疗详情
  finishTreat: "order/treatments/finish/", //点击完成治疗

  orderProdInfo: 'order/prodInfo/',//中西药处方查询
  treatProject:'order/treatProject/',//保存治疗项目
  otherChargesStrs:'order/otherCharges/',//保存其他收费项目
    westMedicine:'order/westMedicine/',//保存西药处方
    tradMedicine:'order/tradMedicine/',//保存中药处方
    queryOperList:'sec/oper/queryList/',//查询操作员
  listdiseaseName:'base/disease/listdiseaseName',//查询疾病
  listhotsymptom:'base/disease/listhotsymptom',//获取热门查体和表现
  listDisease:'base/disease/listdisease',//获取热门查体和表现
  treatmentDetails: 'treatment_details',
  showMedical: 'order/showMedical/',//查看病历信息
  orderMedical: 'order/medical/',//保存病历信息
  historyMedical: 'order/historyMedical/',//查看历史病例详情
  doctorSuggest: 'order/doctorSuggest/',//增加建议
  historyMedicals: 'order/historyMedicals/',//查看历史病例
  cureTemplate: 'cure_template',
  searchTemplate: 'prod/template/search/',//模板查询
  otherChargeTemplate: 'other_charge_template',
  chinesePrescriptionTemplate: 'chinese_prescription_template',
  westernMedicineTemplate: 'western_medicine_template',
  getStockManage:"inventoryManagement",
  showPhysique:"order/showPhysique/",
  showPatientInfo:"usr/usrUser/view/",
  addPatient:'order/addPatient',//新增患者
  receivePatient:'order/receivePatient/',//新增已有患者

  //供应商
  suppliers:"suppliers",
  //商品查询
  getGoods:"getGoods",
  //库存预警
  inventory:"inventory",
  //效期预警
  effective:"effective",
 //采购单查询
  procurement:"procurement",
 //入库单查询
  procurementStorage:"procurementStorage",
  createSuppliers:"prod/supplier/create",//创建供应商
  supplierSearch: "prod/supplier/search",//供应商查询
  supplierEnable: "prod/supplier/disable/",//供应商停用
  supplierDisable: "prod/supplier/enable/",//供应商启用
  supplierView: "prod/supplier/view/",//单个查询
  supplierUpdate: "prod/supplier/update/",//修改供应商

  //科室列表查询
  registerDepartList: "usr/usrDoctor/list/depart",
  registerDoctorList: "usr/usrDoctor/list/",
  registerRequest: "order/registered",
  perfectRequest: "usr/usrUser/edit",
  perfectPhysical: "order/physique/",

  //枚举
  staticDataList: "base/staticData/list",
  //省份
  provinceList: "base/district/province",
  //城市
  cityList: "base/district/city",
  //患者管理列表
  patientManageList: "usr/usrUser/list",
  //新增患者
  patientsAdd: "usr/usrUser/create",

  /***********************商品************************************/
  createGoods:"prod/goods/create",//创建商品
  goodsSearch: "prod/goods/history",//供应商品
  goodHistory: "prod/goods/history",//商品查询
  goodsHistory: "prod/inventory/list/stock",//查询库存的商品
  goodsEnable: "prod/goods/disable/",//商品停用
  goodsDisable: "prod/goods/enable/",//商品启用
  goodsView: "prod/goods/view/",//单个查询
  goodsUpdate: "prod/goods/update/",//修改商品
  goodsSupplierQuery: "prod/supplier/query",//查询供应商
  /********1:采购，2:入库，3:出库，4:退货，5:盘点***************************************************/
  stockSearch:"prod/stock/search/",
  stockDelete:"prod/stock/delete/",
  stockCreate:"prod/stock/create/inbound",
  //查询未审核库存单
  stockCheck: "prod/stock/search/audit/",
  stockViewDetail: "prod/stock/view/",
  //审核库存单
  stockCheckDetail: "prod/stock/audit/",
  listInventory: "prod/inventory/list/inventory",//库存列表
  stockDetails: "prod/inventory/list/stockDetails",//批号维护
  listStock: "prod/warning/list/stock",//库存预警
  listPeriod: "prod/warning/list/period",//效期预警

  //收费
  chargeOrderWait: "order/registereds/waitPay",
  chargeOrderList: "order/registereds/hasPay",
  chargeWaitConfirm: "order/feeDetails/waitPay/",
  chargeListConfirm: "order/feeDetails/hasPay/",
  chargeOrderDetail: "order/feeDetails/hasPay/",
  chargeSendPayRequest: "order/registered/pay/",
  patientReception: "order/receivePatient/",


  stockView:"prod/stock/view/",
  createPurchase:"prod/stock/create/purchase",//新建采购单
  createCancel:"prod/stock/create/cancel",//新建退货单
  createCheck:"prod/stock/create/check",//新建盘点单
  createOutbound:"prod/stock/create/outbound",//新建出库单
  updatePurchase:"prod/stock/update/purchase/",//修改采购单
  updateCancel:"prod/stock/update/cancel/",//修改退货单
  updateCheck:"prod/stock/update/check/",//修改盘点单
  updateOutbound:"prod/stock/update/outbound/",//修改出库单
  stockUpdateInbound:"prod/stock/update/inbound/",//修改入库单

  //根据姓名模糊查询患者信息
  historyPatientNameRequest: "usr/usrUser/searchbyname",

};
