/**
 * Created by imac on 17/3/1.
 */
import moment from 'moment';

export default {
  layDateUi: function (elemId, option) {
    var defOption = {
      elem: elemId,
      istime: false,
      format: 'YYYY/MM/DD',
      min: '1900-01-01 00:00:00',
      max: '2099-12-31 23:59:59',
    };
    for (var key in option) {
      defOption[key] = option[key];
    }
    laydate(defOption);
  },
  //时间格式化
  dateFormat: function (date) {
    if(date==""){
      return "";
    }
    return moment(Number(date)).format('YYYY/MM/DD');
  }, //获取前几天的时间
  dayFormat: function (dayCount) {
    let dd = new Date();
    dd.setDate(dd.getDate() + dayCount);
    return moment(Number(dd.getTime())).format('YYYY/MM/DD');
  },//获取当前的时间
  nowFormat: function () {
    let dd = new Date();
    return moment(Number(dd.getTime())).format('YYYY/MM/DD');
  },//年龄计算
  dateAge: function (date) {
    let d = new Date();
    console.log(d.getFullYear() + "====" + moment(Number(date)).format('YYYY'));
    return Number(d.getFullYear()) - moment(Number(date)).format('YYYY') + 1;
  },//男女计算
  dateSex: function (userSex) {
    return userSex == "1" ? "男" : userSex == "2" ? "女" : "未知";
  },//接诊计算
  registeredType: function (type) {
    return type == 1 ? '初诊' : '复诊';
  },//接诊计算
  registeredState: function (state) {
    return state == 1 ? '待接诊' : '已接诊';
  },//接诊计算
  registeredHistoryType: function (state) {
    return state == 1 ? '已过期' : '已接诊';
  },//接诊计算
  buttonState: function (state) {
    return state == 1 ? '立即接诊' : '接诊详情';
  },
  alertErr: function (that, treatProjectStrs) {
    if (treatProjectStrs.length === 0) {
      return swal({
        title: "数据未修改",
        text: "",
        type: that.$enumerationType.error,
        timer: that.$enumerationType.timers,
        showConfirmButton: false
      });
    }
  },
  checkLegalCard: function (certificateNo) {
    if (certificateNo.length != 18) {
      return false;
    } else {
      var address = certificateNo.substring(0, 6);//6位，地区代码
      var birthday = certificateNo.substring(6, 14);//8位，出生日期
      var sequenceCode = certificateNo.substring(14, 17);//3位，顺序码：奇为男，偶为女
      var checkCode = certificateNo.substring(17);//1位，校验码：检验位
      console.log("身份证号码:" + certificateNo + "、地区代码:" + address + "、出生日期:" + birthday + "、顺序码:" + sequenceCode + "、校验码:" + checkCode);
      var province = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
      };
      var year = birthday.substring(0, 4);
      var month = birthday.substring(4, 6);
      var day = birthday.substring(6);
      var tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day));
      if (province[parseInt(address.substr(0, 2))] == null || (tempDate.getFullYear() != parseFloat(year) || tempDate.getMonth() != parseFloat(month) - 1 || tempDate.getDate() != parseFloat(day))) {//这里用getFullYear()获取年份，避免千年虫问题
        return false;
      } else {
        var weightedFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];//加权因子
        var valideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];// 身份证验证位值，其中10代表X
        var certificateNoArray = certificateNo.split("");// 得到身份证数组
        var sum = 0;// 声明加权求和变量
        if (certificateNoArray[17].toLowerCase() == 'x') {
          certificateNoArray[17] = 10;// 将最后位为x的验证码替换为10
        }
        for (var i = 0; i < 17; i++) {
          sum += weightedFactors[i] * certificateNoArray[i];// 加权求和
        }
        var valCodePosition = sum % 11;// 得到验证码所在位置
        if (certificateNoArray[17] == valideCode[valCodePosition]) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  checkPhone: function (phone) {
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      return false;
    } else {
      return true;
    }
  },
  checkMoney: function (money) {
    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    if (reg.test(money)) {
      return false;
    } else {
      return true;
    }
  },
  checkDate: function (date){
    var reg = /^(d{4})-(d{2})-(d{2})$/;
    if(reg.test(date)){
      return false;
    }else {
      return true;
    }
  },
 checkPhoneLength: function (dataLength){

    if(dataLength==""){
      return false;
    }else {
      return !this.checkPhone(dataLength);
    }
  }, checkIDCardLength: function (dataLength){

    if(dataLength==""){
      return false;
    }else {
      return !this.checkLegalCard(dataLength);
    }
  },

  dateFormatData: {
    elem: '#id', //需显示日期的元素选择器
    event: 'click', //触发事件
    format: 'YYYY-MM-DD hh:mm:ss', //日期格式
    istime: false, //是否开启时间选择
    isclear: true, //是否显示清空
    istoday: true, //是否显示今天
    issure: true, //是否显示确认
    festival: true,//是否显示节日
    min: '1900-01-01 00:00:00', //最小日期
    max: '2099-12-31 23:59:59', //最大日期
    start: '2014-6-15 23:00:00',    //开始日期
    fixed: false, //是否固定在可视区域
    zIndex: 99999999, //css z-index
    choose: function (dates) { //选择好日期的回调
    }
  },


}
