<template>
  <!--顶部操作栏-->
  <div class="tab_title_container white-bg">
    <!--左侧切换标题栏-->
    <div class="tab_title_left_container">
      <ul>
        <li @click="title_select(index)" v-for="(title, index) in getTitles" :class="{selected_tab : title.selected}"><a>{{title.titleName}}  </a></li>
      </ul>
    </div>

 

  </div>
</template>
 
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
            this.$parent.request(index);
          },
         
          selectItem:function (selectedName, index) {
            this.$store.dispatch('setCurrentItem', index);
            this.selectedName = selectedName;
          }

        }
    }
</script>
