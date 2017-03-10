<template>
  <div class="text-center">
    <nav>
      <ul class="pagination">
        <li @click="previous" class="paginate_button previous"><a>&laquo;</a></li>
        <li @click="selectPage(n)" v-for="n in getPageCount" :class="{selected_page : n == activePage}" class="paginate_button"><a>{{n}}</a></li>
        <li @click="next" class="paginate_button next"><a>&raquo;</a></li>
      </ul>
    </nav>
  </div>
</template>
<style>
  .selected_page a {
    background-color: #337ab7 !important;
    border-color: #337ab7 !important;
    color: white !important;
  }
</style>
<script>
    export default{
        data(){
            return{
              activePage: 1,
            }
        },

      created(){
      },

      computed:{
        getPageCount:function () {
          let pageCount=this.$store.getters.getPageCount;
          console.log(pageCount);
          this.activePage=  pageCount===1? 1: this.activePage;
          return pageCount ;
        },
      },

      methods:{

        previous:function () {
          if (this.activePage > 1) {
            this.activePage --;
            this.$store.dispatch('setCurrentPageNo', this.activePage);
            this.$parent.request_list();
          }
        },

        next: function () {
          if (this.activePage < this.$store.getters.getPageCount) {
            this.activePage ++;
            this.$store.dispatch('setCurrentPageNo', this.activePage);
            this.$parent.request_list();
          }
        },

        selectPage:function (currentPage) {
          if (currentPage == this.activePage) {
            return;
          }
          this.activePage = currentPage;
          this.$store.dispatch('setCurrentPageNo', this.activePage);
          this.$parent.request_list();
        },

      },

    }
</script>
