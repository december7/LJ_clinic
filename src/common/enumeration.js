/**
 * Created by imac on 17/3/9.
 */
import  names from 'common/utils/names.js'
export  default {

    setEnumeration:function (data) {

        let that=this;
        let USER_NATION_ARR={};//民族
        let DOSAGE_FORM={};//剂型
        let USAGE_TYPE={};//药品用法
        let PROD_FREQUENCY={};//用药频次
        let PROD_UNIT={};//商品单位
        let CLINIC_TYPE={};//诊所类型
        let REGISTERED_TYPE={};//接诊类型
        let PROD_TYPE={};//商品类型
        let USER_SEX={};//性别类型
        let ALLERGY_THING={};//过敏源
        let ALLERGY_REACTION={};//过敏反应
        let ALLERGY_DEGREE={};//过敏程度
        for (let index in data){
            if (data[index].codeType==="USER_NATION"){
                USER_NATION_ARR[data[index].codeKey]=data[index].codeValue;
            }else if (data[index].codeType==="DOSAGE_FORM"){
                DOSAGE_FORM[data[index].codeKey]=data[index].codeValue;
            }else if (data[index].codeType==="USAGE_TYPE"){
                USAGE_TYPE[data[index].codeKey]=data[index].codeValue;
            }else if (data[index].codeType==="PROD_FREQUENCY"){
                PROD_FREQUENCY[data[index].codeKey]=data[index].codeValue;
            }else if (data[index].codeType==="PROD_UNIT"){
                PROD_UNIT[data[index].codeKey]=data[index].codeValue;
            }else if (data[index].codeType==="CLINIC_TYPE"){
                CLINIC_TYPE[data[index].codeKey]=data[index].codeValue;
            }else if (data[index].codeType==="REGISTERED_TYPE"){
                REGISTERED_TYPE[data[index].codeKey]=data[index].codeValue;
            }else if (data[index].codeType==="PROD_TYPE"){
                PROD_TYPE[data[index].codeKey]=data[index].codeValue;
            }else if (data[index].codeType==="USER_SEX"){
                USER_SEX[data[index].codeKey]=data[index].codeValue;
            }else if (data[index].codeType==="ALLERGY_THING"){
                ALLERGY_THING[data[index].codeKey]=data[index].codeValue;
            }else if (data[index].codeType==="ALLERGY_REACTION"){
                ALLERGY_REACTION[data[index].codeKey]=data[index].codeValue;
            }else if (data[index].codeType==="ALLERGY_DEGREE"){
                ALLERGY_DEGREE[data[index].codeKey]=data[index].codeValue;
            }

        }
        localStorage.setItem(names.USER_NATION_ARR,JSON.stringify(USER_NATION_ARR));
        localStorage.setItem(names.DOSAGE_FORM,JSON.stringify(DOSAGE_FORM));
        localStorage.setItem(names.USAGE_TYPE,JSON.stringify(USAGE_TYPE));
        localStorage.setItem(names.PROD_FREQUENCY,JSON.stringify(PROD_FREQUENCY));
        localStorage.setItem(names.PROD_UNIT,JSON.stringify(PROD_UNIT));
        localStorage.setItem(names.CLINIC_TYPE,JSON.stringify(CLINIC_TYPE));
        localStorage.setItem(names.REGISTERED_TYPE,JSON.stringify(REGISTERED_TYPE));
        localStorage.setItem(names.PROD_TYPE,JSON.stringify(PROD_TYPE));
        localStorage.setItem(names.USER_SEX,JSON.stringify(USER_SEX));
        localStorage.setItem(names.ALLERGY_THING,JSON.stringify(ALLERGY_THING));
        localStorage.setItem(names.ALLERGY_REACTION,JSON.stringify(ALLERGY_REACTION));
        localStorage.setItem(names.ALLERGY_DEGREE,JSON.stringify(ALLERGY_DEGREE));
        console.timeEnd("Array耗时");

    },
    /**民族*/
    getUSER_NATION_ARR:function () {
        return JSON.parse(localStorage.getItem(names.USER_NATION_ARR));
    },
    /**剂型*/
    getDOSAGE_FORM:function () {
        return JSON.parse(localStorage.getItem(names.DOSAGE_FORM));
    },
    /**药品用法*/
    getUSAGE_TYPE:function () {
        return JSON.parse(localStorage.getItem(names.USAGE_TYPE));
    },
    /**用药频次*/
    getPROD_FREQUENCY:function () {
        return JSON.parse(localStorage.getItem(names.PROD_FREQUENCY));
    },
    /**商品单位*/
    getPROD_UNITE:function () {
        return JSON.parse(localStorage.getItem(names.PROD_UNIT));
    },
    /**诊所类型*/
    getCLINIC_TYPE:function () {
        return JSON.parse(localStorage.getItem(names.CLINIC_TYPE));
    },
    /**接诊类型*/
    getREGISTERED_TYPE:function () {
        return JSON.parse(localStorage.getItem(names.REGISTERED_TYPE));
    },
    /**商品类型*/
    getPROD_TYPE:function () {
        return JSON.parse(localStorage.getItem(names.PROD_TYPE));
    },
    /**性别类型*/
    getUSER_SEX:function () {
        return JSON.parse(localStorage.getItem(names.USER_SEX));
    },
    /**过敏源*/
    getALLERGY_THING:function () {
        return JSON.parse(localStorage.getItem(names.ALLERGY_THING));
    },
    /**过敏反应*/
    getALLERGY_REACTION:function () {
        return JSON.parse(localStorage.getItem(names.ALLERGY_REACTION));
    },
    /**过敏程度*/
    getALLERGY_DEGREE:function () {

        return   JSON.parse(localStorage.getItem(names.ALLERGY_DEGREE));
    },

    getParseValue:function (data,index) {
        return data[index];
    },
    /**返回商品单位*/
    getProjectUnit:function ( unit) {
        if (typeof unit==='undefined'|| unit==0){
            return "";
        }else {
            let content= this.getPROD_UNITE()[unit]
            if (content.length>5){
                return  content.substring(0,5)+"...";
            }else {
                return  this.getPROD_UNITE()[unit];
            }
        }
    }, /**返回商品用法*/
     getUsageType:function ( unit) {
        if (typeof unit==='undefined'|| unit==0){
            return "";
        }else {
            let content= this.getUSAGE_TYPE()[unit]
            if (content.length>5){
                return  content.substring(0,5)+"...";
            }else {
                return  this.getUSAGE_TYPE()[unit];
            }
        }
    },/**返回商品用药频次*/
    getFrequency :function ( unit) {
        if (typeof unit==='undefined'|| unit==0){
            return "";
        }else {
            let content= this.getPROD_FREQUENCY()[unit]
            if (content.length>5){
                return  content.substring(0,5)+"...";
            }else {
                return  this.getPROD_FREQUENCY()[unit];
            }
        }
    },

    /**返回商品价格*/
    getGoodsPrice:function ( price) {
        if (price=="" ||typeof price=="undefined"){
            return ""
        }
       return  (price/100).toFixed(2);
    },  /**计算商品价格*/
    getComputePricet:function ( price) {
        if (price=="" ||typeof price=="undefined"){
            return ""
        }
        if (price>0){
            return  Number(price)*100;
        }
    },
    getCountMoney:function (retailPrice,count) {
        if (retailPrice==""||count=="" ||typeof retailPrice=="undefined"||typeof count=="undefined"){
            return ""
        }
            if (retailPrice>0&&count>0){
                return this.getGoodsPrice(retailPrice*count);
            }else {
                return "";
            }
    },
  //计算返回零
  getNumMoney:function (retailPrice,count) {
        if (retailPrice==""||count=="" ||typeof retailPrice=="undefined"||typeof count=="undefined"){
            return ""
        }
            if (retailPrice>0&&count>0){
                return this.getGoodsPrice(retailPrice*count);
            }else {
                return 0;
            }
    },
  /**计算状态*/
  getState:function ( state) {
    if (state=="0"){
       return "已删除"
    }else if (state=="1"){
      return "正常"
    }else if (state=="2"){
      return "待审核"
    }else if (state=="3"){
      return "拒绝"
    }
  },
}
