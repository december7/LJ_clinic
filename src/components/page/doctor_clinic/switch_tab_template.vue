<template>
  <!--顶部操作栏-->
  <div>
  <div class="tab_title_container white-bg fixed-div">
    <!--左侧切换标题栏-->
    <div class="tab_title_left_container">
      <ul>
        <li @click="title_select(index)" v-for="(title, index) in getTitles" :class="{selected_tab : title.selected}"><a>{{title.titleName}}  </a></li>
      </ul>
    </div>

    <!--右侧搜索栏-->
    <div v-show="right_show" class="tab_title_right_container" style="padding: 0 10px;">

      <div class="search_patient_container">
        <input id="search_patient_text" type="text" placeholder="请输入患者姓名" v-model="resultName"  >
        <!--<span style="padding-left: 2px">&#10005	</span>-->
        <a> <img style="width: 15px; height: 15px" src="../../../../static/img/set_manage_img/search.png"  @click="searchResult"></a>
      </div>
    </div>

  </div>
  <div class="common-height-40f9" ></div>
  </div>
</template>
<style>
  .tab_title_container {
    width: 100%;
    height: 40px;
  }

  .tab_title_left_container {
    display: inline-block;
    margin-left: 10px;
  }

  .tab_title_left_container ul {
    margin-bottom: 0;
  }

  .caret {
    margin-left: 10px !important;
  }

  .tab_title_left_container ul li {
    display: inline-block;
    margin:0 10px !important;
    padding: 0 10px !important;
    line-height: 39px !important;
  }

  .tab_title_right_container {
    float: right;
    line-height: 20px;
    text-align: center;
    margin-right: 40px !important;
    border-left: 1px solid #f4f4f4;
    border-right: 1px solid #f4f4f4;
    margin-top: 10px;
    margin-bottom: 10px;
    right: 0 !important;
    width: auto !important;
  }


  .search_patient_container {
    display: inline;
  }

  .selected_tab {
    border-bottom: 1px solid #314268;
  }

  .selected_item {
    background-color: #00a2d4;
    color: white !important;
  }

  .selected_item:hover {
    background-color: #00a2d4 !important;
    color: white !important;
  }
</style>
<script>

  export default{
    data(){
      return{
        selects:[],
        selectedName:'',
        indexSelected: 0,
        right_show: false,
        resultName: "",
      }
    },

    created(){
      this.selects = this.$store.getters.getSelectStates;
      this.right_show = this.$store.getters.weatherShowRight;
      this.selectedName = this.selects[0].selectName;
    },

    computed:{
      getSelectedItem:function () {
        return this.$store.getters.getCurrentItem;
      },

      getTitles: function () {
        return this.$store.getters.getSwitchTabs;
      },

    },
    mounted: function(){
      var that=this;
      //回车绑定
      $("#search_patient_text").keydown(function(event){
        if(event.which == "13"){
          that.searchResult();
        }});
    },

    methods:{
      title_select(index){
        if(this.indexSelected == index) {
          return;
        }
        this.$store.dispatch('changeTabState', index);
        this.indexSelected = index;
            this.$parent.request_list(index);
      },
      searchResult:function () {
        this.$parent.screenSearchResult(this.resultName );
      },
      selectItem:function (selectedName, index) {
        this.$store.dispatch('setCurrentItem', index);
        this.selectedName = selectedName;
      }

    }
  }
</script>
