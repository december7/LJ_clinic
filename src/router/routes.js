import  names from  "common/utils/names.js"

// 引入登陆页面
import Login from 'components/login/Login.vue'
// 引入路由文件首页
import Home from 'components/main/Home.vue'

import doctor_wrokbench from 'components/page/doctor_clinic/doctor_reception_workbench.vue'
import today_patient from 'components/page/doctor_clinic/today_patient.vue'
import history_patient from 'components/page/doctor_clinic/history_patient.vue'
//平台运营
import platform_home from 'components/page/platform/platform_home.vue'

//新增挂号
import registered_add from 'components/page/doctor_registered/registered_add.vue'
//挂号列表
import registered_list from 'components/page/doctor_registered/registered_list.vue'

//-----药房-----// 
//待发药
import wait_dispensing from 'components/page/drugstore/wait_dispensing.vue'
//发药列表
import dispensing_list from 'components/page/drugstore/dispensing_list.vue'
//发药详情
import dispensing_details from 'components/page/drugstore/dispensing_details.vue'
//待发药详情
import wait_dispensing_details from 'components/page/drugstore/wait_dispensing_details.vue'

//-----设置管理-----// 
//诊所信息 
import set_clinic_setting from 'components/page/settingManage/set_clinic_setting.vue'
//角色管理 
import set_role_manage from 'components/page/settingManage/set_role_manage.vue'
//员工管理 
import set_staff_manage from 'components/page/settingManage/set_staff_manage.vue'
//科室管理 
import set_department_manage from 'components/page/settingManage/set_department_manage.vue'
//挂号设置 
import set_cost_setting from 'components/page/settingManage/set_cost_setting.vue'
//项目管理
import set_item_manage from 'components/page/settingManage/set_item_manage.vue'
//项目模板设置
import set_item_template from 'components/page/settingManage/set_item_template.vue'
//-----患者管理-----// 
import patients_manage from 'components/page/patients_manage/patients_manage.vue'

//历史病例
import history_case from 'components/page/doctor_clinic/history_case.vue'

//待治疗
import waiting_treatment from 'components/page/treatment_room/waiting_treatment.vue'

//治疗列表
import treatment_list from 'components/page/treatment_room/treatment_list.vue'

//治疗室详情
import treatment_details from 'components/page/treatment_room/treatment_details.vue'

//个人信息
import user_info from 'components/main/user_info.vue'


//药品进销存
import  stock_manage from "components/page/medicine/stockManage.vue";
//入库
import  procurement_storage from "components/page/medicine/procurementStorage.vue";
//新增入库
import  add_procurement_storage from "components/page/medicine/popup/addProcurementStorage.vue";
//审核
import  audit from "components/page/medicine/audit.vue";
//商品管理
import  goods_manage from "components/page/medicine/goodsManage.vue";
//商品添加
import  add_goods from "components/page/medicine/popup/addGoods.vue";
//供应商管理
import  suppliers_manage from "components/page/medicine/suppliersManage.vue";
//添加供应商
import  add_suppliers from "components/page/medicine/popup/addSuppliers.vue";
//预警
import  early_warning from "components/page/medicine/earlyWarning.vue";
//采购
import  procurement from "components/page/medicine/procurement.vue";
//新增采购
import  add_procurement from "components/page/medicine/popup/addProcurement.vue";
//出库
import  warehouse from "components/page/medicine/warehouse.vue";//出库
//添加出库
import  add_warehouse from "components/page/medicine/popup/addWarehouse.vue";
//退货
import  returned_goods from "components/page/medicine/returnedGoods.vue";
//添加退货单
import  add_returned_goods from "components/page/medicine/popup/addReturnedGoods.vue";
//盘点
import  inventory from "components/page/medicine/inventory.vue";
//添加盘点单
import  add_inventory from "components/page/medicine/popup/addInventory.vue";
//审核表单详细
import  compile_audit from "components/page/medicine/popup/compileAuditTable.vue";
//收费
import doctor_charge_wait from "components/page/doctor_charge/doctor_charge_wait.vue";
import doctor_charge_list from "components/page/doctor_charge/doctor_charge_list.vue";
import doctor_charge_confirm from "components/page/doctor_charge/doctor_charge_confirm.vue";

//添加患者modal
import add_patient_modal from "components/page/doctor_clinic/add_patient_modal";

//病例
import case_report from "components/page/doctor_clinic/case_report_template";

//病例界面
import case_report_page from "components/page/doctor_clinic/case_report_page";

// 配置路由
export default [
  {
    path: '/',
    component: Home,
    meta: {requiresAuth: true},
  },
  {
    path: '/login',
    component: Login,
    meta: {requiresAuth: false},
  },
  {
    path: '/doctor_clinic/today_patient',
    component: today_patient,
    meta: {requiresAuth: true},
  },

  {
    path: '/doctor_clinic/history_patient',
    component: history_patient,
    meta: {requiresAuth: true},
  },

  {
    path: '/doctor_clinic/doctor_workbench',
    component: doctor_wrokbench,
    meta: {requiresAuth: true},
  },

  {
    path: '/platform/platform_home',
    component: platform_home,
    meta: {requiresAuth: true},
  },

  {
    path: '/doctor_registered/registered_add',
    component: registered_add,
    meta: {requiresAuth: true},
  },

  {
    path: '/doctor_registered/registered_list',
    component: registered_list,
    meta: {requiresAuth: true},
  },

  {
    path: '/drugstore/wait_dispensing',
    component: wait_dispensing,
    meta: {requiresAuth: true},
  },

  {
    path: '/drugstore/dispensing_list',
    component: dispensing_list,
    meta: {requiresAuth: true},
  },

  {
    path: '/drugstore/dispensing_details',
    component: dispensing_details,
    meta: {requiresAuth: true},
  },

  {
    path: '/drugstore/wait_dispensing_details',
    component: wait_dispensing_details,
    meta: {requiresAuth: true},
  },

  {
    path: '/settingManage/set_clinic_setting',
    component: set_clinic_setting,
    meta: {requiresAuth: true},
  },

  {
    path: '/settingManage/set_role_manage',
    component: set_role_manage,
    meta: {requiresAuth: true},
  },

  {
    path: '/settingManage/set_staff_manage',
    component: set_staff_manage,
    meta: {requiresAuth: true},
  },

  {
    path: '/settingManage/set_department_manage',
    component: set_department_manage,
    meta: {requiresAuth: true},
  },

  {
    path: '/settingManage/set_cost_setting',
    component: set_cost_setting,
    meta: {requiresAuth: true},
  },

  {
    path: '/settingManage/set_item_manage',
    component: set_item_manage,
    meta: {requiresAuth: true},
  },

  {
    path: '/settingManage/set_item_template',
    component: set_item_template,
    meta: {requiresAuth: true},
  },

  {
    path: '/patients_manage/patients_manage',
    component: patients_manage,
    meta: {requiresAuth: true},
  },

  {
    path: '/doctor_clinic/history_case',
    component: history_case,
    meta: {requiresAuth: true},
  },

  {
    path: '/treatment_room/waiting_treatment',
    component: waiting_treatment,
    meta: {requiresAuth: true},
  },

  {
    path: '/treatment_room/treatment_list',
    component: treatment_list,
    meat: {requiresAuth: true},
  },

  {
    path: '/main/user_info',
    component: user_info,
    meta: {requiresAuth: true},
  },

  {
    path: '/treatment_room/treatment_details',
    component: treatment_details,
    meta: {requiresAuth: true},
  },
  {
    path: '/medicine/stock_manage',
    component: stock_manage,
    meta: {requiresAuth: true},
  },
  {
    path: '/medicine/procurement_storage',
    component: procurement_storage,
    meta: {requiresAuth: true},
  }, {
    path: '/medicine/procurement_storage/add_procurement_storage',
    component: add_procurement_storage,
    meta: {requiresAuth: true},
  }, {
    path: '/medicine/audit',
    component: audit,
    meta: {requiresAuth: true},
  },
  {
    path: '/medicine/audit/compile_audit',
    component: compile_audit,
    meta: {requiresAuth: true},
  },
  {
    path: '/doctor_charge/doctor_charge_wait',
    component: doctor_charge_wait,
    meta: {requiresAuth: true},
  },
  {
    path: '/doctor_charge/doctor_charge_list',
    component: doctor_charge_list,
    meta: {requiresAuth: true},
  },
  {
    path: '/doctor_charge/doctor_charge_confirm',
    component: doctor_charge_confirm,
    meta: {requiresAuth: true},
  },
  {
    path: '/medicine/goods_manage',
    component: goods_manage,

    meta: {requiresAuth: true},
  }, {
    path: '/medicine/goods_manage/add_goods',
    name: names.add_goods,
    component: add_goods,
    meta: {requiresAuth: true},
  },
  {
    path: '/medicine/suppliers_manage',
    component: suppliers_manage,
    meta: {requiresAuth: true},
  }, {
    path: '/medicine/suppliers_manage/add_suppliers',
    component: add_suppliers,
    meta: {requiresAuth: true},
  }, {
    path: '/medicine/early_warning',
    component: early_warning,
    meta: {requiresAuth: true},
  }, {
    path: '/medicine/procurement',
    component: procurement,
    meta: {requiresAuth: true},
  }, {
    path: '/medicine/procurement/add_procurement',
    component: add_procurement,
    meta: {requiresAuth: true},
  }, {
    path: '/medicine/warehouse',
    component: warehouse,
    meta: {requiresAuth: true},
  }, {
    path: '/medicine/warehouse/add_warehouse',
    component: add_warehouse,
    meta: {requiresAuth: true},
  }, {
    path: '/medicine/returned_goods',
    component: returned_goods,
    meta: {requiresAuth: true},
  }, {
    path: '/medicine/returned_goods/add_returned_goods',
    component: add_returned_goods,
    meta: {requiresAuth: true},
  },
  {
    path: '/medicine/inventory',
    component: inventory,
    meta: {requiresAuth: true},
  },
  {
    path: '/medicine/inventory/add_inventory',
    component: add_inventory,
    meta: {requiresAuth: true},
  },

  {
    path: '/doctor_clinic/add_patient_modal',
    component: add_patient_modal,
    meta: {requiresAuth: true},
  },

  {
    path:'/doctor_clinic/case_report',
    component: case_report,
    meta: {requiresAuth: true},
  },

  {
    path: '/doctor_clinic/case_report_page',
    component: case_report_page,
    meta: {requiresAuth: true},
  }

]
