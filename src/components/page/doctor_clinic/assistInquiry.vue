<template>
  <div class="assist_inquiry_page col-sm-4" style="padding-left: 0">
    <div class="ibox float-e-margins">
      <div class="ibox-title no-top-border">
        <h5>辅助问诊</h5>
        <div class="ibox-tools">
          <a @click="btn_close" class="btn_close un_skip_link">&#10005</a>
        </div>
      </div>
      <div class="ibox-content no_top_padding" style="padding-left: 10px; padding-bottom: 10px;  height:1200px;  overflow: auto;">
        <div class="file-manager">
          <ul class="tag-list" style="padding: 0;">
            <li @click="selectHotSymptom(hotSymptom,index)" :class=" hotSymptom.selectStyle ? 'selectStyle' : 'defaultStyle' "  v-for="(hotSymptom,index) in hotSymptoms"><a>{{hotSymptom.name}}</a></li>
          </ul>
          <div v-for="(symptom ,index) in symptoms "  >


          <h5 class="tag-title" style="display: inline-block; width: 100%" @click="selectSymptom(symptom,index)" ><a>{{symptom.symptomName}}</a></h5>
          <ul class="tag-list" style="padding: 0; " >
            <li style="width: 100%;margin: 5px;">查体:</li>
            <li  @click="selectMatchSymptom($event,index)" class="defaultMatchStyle"   v-for="(matchSymptom,index) in symptom.matchSymptom.split(',')"><a>{{matchSymptom}}</a></li>

          </ul>
          <ul class="tag-list" style="padding: 0;  " >
            <li  style="width: 100%;margin: 5px;">表现:</li>
            <li  @click="selectManifestSymptom($event,index)" class="defaultManifestStyle" v-for="(manifestations,index) in symptom.manifestations.split(',')"    ><a>{{manifestations}}</a></li>

          </ul>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>{{showAssistInquiry}}
  </div>
</template>
<script>
  export  default{
    data(){
      return{
        hotSymptoms:[],
        symptoms:[],
        selectSymptoms:[],
      }
    },
    computed: {
      showAssistInquiry: function () {
        let isShow=this.$store.getters.getWeatherShowAssistInquiry;
        if (isShow){
          this.getListhotsymptom();
        }
        return "";
      },
    },
      methods:{
      /*关闭辅助问诊*/
      btn_close: function () {
        this.$store.dispatch('setWeatherShowAssistInquiry', false);
      },
        selectHotSymptom: function (hotSymptom,index) {

          let that=this;

          hotSymptom.selectStyle=!hotSymptom.selectStyle;
          this.$store.dispatch('set_chief_complaint', [hotSymptom.name,++index]);
          let manifestations='';
          let matchSymptom='';
        for (let i in that.hotSymptoms){
          if ( that.hotSymptoms[i].selectStyle){
            if (that.hotSymptoms[i].type==2){
            manifestations+= that.hotSymptoms[i].name+","
            }else if (that.hotSymptoms[i].type==1){
              matchSymptom+= that.hotSymptoms[i].name+","

            }
          }
        }

          this.getListDisease(manifestations,matchSymptom);
      },
        selectSymptom:function(symptom,index){
          this.$store.dispatch('set_preliminary_diagnosis', [symptom,index]);

        },

        selectMatchSymptom: function (e,index) {
          var event = $(e.currentTarget);
          this.$store.dispatch('set_chief_complaint', [$(event).text(),++index]);
          let  _prevClass= $(event).attr('class');
          if (_prevClass==="defaultMatchStyle"){
            $(event).addClass('selectManifestStyle');
            $(event).removeClass('defaultMatchStyle');
          }else if (_prevClass==="selectManifestStyle"){
            $(event).removeClass('selectManifestStyle');
            $(event).addClass('defaultMatchStyle');
          }
        },
        selectManifestSymptom: function (e,index) {
          var event = $(e.currentTarget);
          this.$store.dispatch('set_chief_complaint', [$(event).text(),++index]);
          let  _prevClass= $(event).attr('class');
          if (_prevClass==="defaultManifestStyle"){
            $(event).addClass('selectMatchStyle');
            $(event).removeClass('defaultManifestStyle');
          }else if (_prevClass==="selectMatchStyle"){
            $(event).removeClass('selectMatchStyle');
            $(event).addClass('defaultManifestStyle');
          }
        },
        getListhotsymptom:function () {
          let that = this;
          that.$api.get(that, that.$requestApi.listhotsymptom, "", function (data) {
            if (data.body.code == '00') {
             that.hotSymptoms= data.body.data;
            } else {
              console.log(data.body.msg);
            }

          }, function (err) {
            console.log(err);

          });
        },
        getListDisease:function (manifestations,matchSymptom) {
          if (typeof  manifestations !="undefined"&&manifestations!=""){
              manifestations=manifestations.substring(0,manifestations.length-1);
          }
          if (typeof  matchSymptom !="undefined"&&matchSymptom!=""){
            matchSymptom=matchSymptom.substring(0,matchSymptom.length-1);

          }
          let that = this;
          that.$api.get(that, that.$requestApi.listDisease, {manifestations:manifestations,matchSymptom:matchSymptom}, function (data) {
            if (data.body.code == '00') {
              that.symptoms=data.body.data;
            } else {
              console.log(data.body.msg);
            }

          }, function (err) {
            console.log(err);

          });
        }

    }
  }
</script>
<style>
  ::-webkit-scrollbar{width:2px;}
  ::-webkit-scrollbar-track{background-color:#bee1eb;}
  ::-webkit-scrollbar-thumb{background-color:#00aff0;}
  ::-webkit-scrollbar-thumb:hover {background-color:#9c3}
  ::-webkit-scrollbar-thumb:active {background-color:#00aff0}
  .selectStyle  a {
    background-color: #337ab7;
    color: white;
  }.selectMatchStyle  a {
    background-color: #337ab7;
    color: white;
  }.selectManifestStyle  a {
    background-color: #337ab7;
    color: white;
  }
  .defaultStyle  a {
    background-color: #f3f3f4;
    color: inherit;
  }
  .defaultMatchStyle  a {
    background-color: #f3f3f4;
    color: inherit;
  }
  .defaultManifestStyle  a {
    background-color: #f3f3f4;
    color: inherit;
  }
</style>
