<template>
    <div class="modal fade" role="dialog" id="layer">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                    <div class="modal-title">
                        <div class="gray-bg" style="width: 40%;border-radius: 4px;padding-left: 10px">
                            <input @input="showSearchResult()" type="text" class="modal_search_input" placeholder="请输入关键字进行搜索">
                            <div style="width: 14%; display: inline-block; text-align: center;border-left: 1px solid white;">
                                <span>&times;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body no-padding" style="overflow: auto; height: 200px">
                    <div>
                        <ul class="template_list">
                            <li :class="{'template_list_selected' : cure_template_currentIndex == index} " @click="select_cure_temp(index)" v-for="(item, index) in cure_template_list"><small>{{item.templateName}}</small><small v-show="cure_template_currentIndex == index" class="pull-right">&#10003</small></li :class>
                        </ul>
                    </div>
                    <div v-show="cure_template_list.length == 0" style="padding-left: 15px">
                        无
                    </div>

                </div>
                <div id="dialog-body" class="text-center m-b">
                    <button @click="setTableData()" class="btn btn-primary btn-w-m" data-dismiss="modal">{{indexChoose}}保存</button>
                    <button class="btn btn-default btn-w-m" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export  default{
        data(){
            return{
                cure_template_list:[],
                indexChoose:0
            }
        },
        computed : {
            indexChoose(){
              this.indexChoose=  this .showSearchResult(this.$store.getters.getCurrentIndex);
                return "";
            }

        },

        methods:{
            /*模板数据搜索结果*/
            showSearchResult:function () {
                var that=this;
                var url = '';
                if (that.indexChoose == 1) {//治疗
                    url = this.$requestApi.cureTemplate;
                } else if (that.indexChoose == 2 && that.prescription_type == 0) {//西药
                    url = this.$requestApi.westernMedicineTemplate;
                } else if (that.indexChoose == 2 && that.prescription_type == 1) {//中药
                    url = this.$requestApi.chinesePrescriptionTemplate;
                } else if (that.indexChoose = 3) {//其他收费
                    url = this.$requestApi.otherChargeTemplate;
                }
                this.$api.get(this, url,"",function  (data) {
                    if(data.status=='200'){
                        that.cure_template_list = data.body.data;
                    }else{
                        console.log(data.body.msg);
                    }

                },function (err) {
                    console.log(err);

                });
            },
            setTableData:function () {
                if (this.cure_template_currentIndex == -100) {
                    return;
                }

                if (this.indexChoose == 1) {//治疗
                    this.cure_items.push(this.cure_template_list[this.cure_template_currentIndex]);
                    console.log(this.cure_items);
                } else if (this.indexChoose == 2 && this.prescription_type == 0) {//西药
                    this.western_prescription_items.push(this.cure_template_list[this.cure_template_currentIndex]);
                } else if (this.indexChoose == 2 && this.prescription_type == 1) {//中药
                    this.chinese_prescription_items.push(this.cure_template_list[this.cure_template_currentIndex]);
                } else if (this.indexChoose = 3) {//其他收费
                    this.other_charge_items.push(this.cure_template_list[this.cure_template_currentIndex]);
                }
            },



        }
    }

</script>