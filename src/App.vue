<template>
    <router-view ></router-view>

</template>

<script>
    import enumeration from 'common/enumeration.js';
export  default{
    created() {
        if (!enumeration.getUSER_NATION_ARR()){
        this.getDataList();
        }
        console.log("check"+this.$store.state.account.login.success);
    },
    methods:{

    getDataList:function () {
        let that=this;


        that.$api.get(that,that.$requestApi.staticData,{},function  (response) {
                    if(response.body.code=='00'){
//            worker.postMessage(JSON.stringify(response.body.data));
                        console.time("Array耗时");
                         enumeration.setEnumeration(response.body.data)
                        console.log("enumeration"+  enumeration.getParseValue(  enumeration.getALLERGY_DEGREE (),1));
                        console.timeEnd("Array耗时");
                    }else{
                        console.log(response.body.msg);
                    }

                },function (err) {
                    console.log(err);

                }
        );
    },
}
}


</script>

    <style >

</style>
