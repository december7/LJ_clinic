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
                            <input @input="showSearchResult()" @focus="showSearchResult()" type="text" class="modal_search_input" v-model="searchKey" placeholder="请输入关键字进行搜索">
                            <div style="width: 14%; display: inline-block; text-align: center;border-left: 1px solid white;">
                                <span>&times;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body no-padding" style="overflow: auto; height: 200px">
                    <div>
                        <ul class="template_list">
                            <li :class="{'template_list_selected' : cure_template_currentIndex == index} " @click="select_cure_temp(index)" v-for="(item, index) in cure_template_list"><small>{{item.templateName}}</small><small v-show="cure_template_currentIndex==index"   class="pull-right">&#10003</small></li>
                        </ul>
                    </div>
                    <div v-show=" cure_template_list.length == 0" style="padding-left: 15px">
                        无
                    </div>

                </div>
                <div id="dialog-body" class="text-center m-b">
                    <button @click="setTableData()" class="btn btn-primary btn-w-m" data-dismiss="modal">{{indexTemplate}}保存</button>
                    <button class="btn btn-default btn-w-m" data-dismiss="modal">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export  default{
        props: {
            prescription_type:{
                default: 1
            },  cure_template_currentIndex:{
                default: 1
            },
        },
        data(){
            return{
                cure_template_list:[],
                indexChoose:0,
                searchKey:"",
            }
        },
        computed : {
            indexTemplate(){
              this.indexChoose=this.$store.getters.getCurrentIndex;
                return "";
            }

        },

        methods:{
            /*模板数据搜索结果*/
            showSearchResult:function () {
                let that=this;
                let url="";
                console.log("that.indexChoose===that.prescription_type"+that.indexChoose+"==="+that.prescription_type);
                if (that.indexChoose == 1) {//治疗
                    url=that.$requestApi.searchTemplate+that.indexChoose;
                }else if (that.indexChoose == 2&&that.prescription_type==1){//处方西药
                    url=that.$requestApi.searchTemplate+"2";
                }else if (that.indexChoose == 2&&that.prescription_type==2){//处方中药
                    url=that.$requestApi.searchTemplate+"3";
                }else if (that.indexChoose == 3){//其他收费项目

                }
                that.$api.get(that, url,{templateName:that.searchKey,iDisplayLength:that.$enumerationType.iDisplayLength},function  (data) {
                    if(data.body.code=='00'){
                        that.cure_template_list=data.body.data;
                    }else{
                        console.log(data.body.msg);
                    }

                },function (err) {
                    console.log(err);

                });
            },

            select_cure_temp:function (index) {
                this.$parent.cure_template_currentIndex = index;
            },
            setTableData:function () {
                let that=this;
                if (this.cure_template_currentIndex == -100) {
                    return;
                }

                that.$api.get(that, that.$requestApi.searchTemp+this.cure_template_list[this.cure_template_currentIndex].templateId,"",function  (data) {
                    if(data.body.code=='00'){
                      that.setTemplate(data.body.templateItems);
                    }else{
                        console.log(data.body.msg);
                    }

                },function (err) {
                    console.log(err);

                });


            },
          setTemplate:function (templateItems) {
            this.$store.dispatch('setTemplateContent', templateItems);
            if (this.indexChoose == 1) {//治疗
              this.$store.dispatch('setTemplateContentType', 1);
            } else if (this.indexChoose == 2 && this.prescription_type == 1) {//西药
              this.$store.dispatch('setTemplateContentType', 2);
            } else if (this.indexChoose == 2 && this.prescription_type == 2) {//中药
              this.$store.dispatch('setTemplateContentType', 3);
            } else if (this.indexChoose = 3) {//其他收费
              this.$store.dispatch('setTemplateContentType', 4);
            }
            this.cure_template_list=[];

          }

        }
    }

</script>
