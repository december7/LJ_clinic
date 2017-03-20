<template>
  <div  >
    <div style="    width: 23%;height: 32px;  float: left;" class="input-group-btn">
      <button data-toggle="dropdown" style="width: 100%" class="form-control2 gray-bg     input_circular_corner   " type="button">{{suppliersItems[suppliersIndex].titleName}}<span class="goods_manage_tips_down caret"></span>
      </button>
      <ul class="dropdown-menu" style="width: 100%" >
        <li @click="selectSuppliersItem(index)" v-for="(titleItem, index) in suppliersItems">
          <a :class="{selected_item : suppliersIndex == index}" class="no-padding" style="text-align: center"  >{{titleItem.titleName}}</a>
        </li>

      </ul>
    </div>
    <!--搜索-->
    <div class="goods-search_background  " style="float: right; margin: 0px 16px 10px 0px">
      <span style="color: lightgray;margin-left: 3px " >|</span>
      <input type="text" :placeholder="placeholderData" class="serach_box" v-model="searchKeywords" id="search_patient_text">
      <span style="color: lightgray; margin-left: 25px">|</span>
      <button style="border: none; background-color: white"><img src="../../../static/img/set_manage_img/search.png" style="width: 25px;padding: 5px;" @click="searchList"></button>
    </div>

  </div>
</template>

<script>
  export  default{
    props: {
      suppliersItems:{
        default: []
      },
      suppliersIndex:{
        default: 0
      },
      placeholderData:{
        default:""
      }
    },
    data(){
      return {
        searchKeywords:"",
        searchIndex:0
      }
    },
    mounted: function(){
      var that=this;
      //回车绑定
      $("#search_patient_text").keydown(function(event){
        if(event.which == "13"){
          that.$parent.searchRequest(that.searchIndex,that.searchKeywords);
        }});
    },
    methods:{
      selectSuppliersItem:function (selectedIndex) {
        this.searchIndex = selectedIndex;
        this.$parent. searchRequest(selectedIndex,this.searchKeywords);
        console.log( this.searchIndex);
      },
      searchList:function () {
        this.$parent. searchRequest(this.searchIndex,this.searchKeywords);
      }
    }
  }
</script>
