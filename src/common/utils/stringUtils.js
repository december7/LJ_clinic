/**
 * Created by imac on 17/3/1.
 */
import moment from 'moment';

export  default {
  //时间格式化
  dateFormat:function (date) {
    return  moment(Number(date)).format('YYYY/MM/DD');
  }, //获取前几天的时间
  dayFormat:function (dayCount) {
    let dd = new Date();
    dd.setDate(dd.getDate()+dayCount);
    return  moment(Number(dd.getTime())).format('YYYY/MM/DD');
  },//获取当前的时间
  nowFormat:function () {
    let dd = new Date();
    return  moment(Number(dd.getTime())).format('YYYY/MM/DD');
  },//年龄计算
  dateAge:function (date) {
    let d=new Date();
    console.log(d.getFullYear() +"===="+moment(Number(date)).format('YYYY'));
   return Number(d.getFullYear ())- moment(Number(date)).format('YYYY')+1;
  },//男女计算
  dateSex:function (userSex) {
   return userSex=="1"?"男": userSex=="2"?"女":"未知";
  },//接诊计算
  registeredType:function (type) {
   return type == 1 ? '初诊' : '复诊';
  },//接诊计算
  registeredState:function (state) {
   return state == 1 ? '待接诊' : '已接诊';
  },//接诊计算
  buttonState:function (state) {
   return state == 1 ? '立即接诊' : '接诊详情';
  },
  alertErr:function (that,treatProjectStrs) {
    if (treatProjectStrs.length===0){
      return  swal({   title: "数据未修改",   text: "", type:that.$enumerationType.error,  timer: that.$enumerationType.timers,   showConfirmButton: false });
    }
  }

}
