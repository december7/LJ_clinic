<template>
  <div class="ibox col-sm-12">
    <div style="margin-top:18px">
      <button class="message_button" type="button">全部标为已读</button>
      <button class="message_button" type="button">删除已读信息</button>
    </div>
    <div class="col-sm-3 list_title">
      <ul style="margin-left:-15px">
        <a v-for="(data_item, index) in data_items" @click="didSelectIndex(index)">
          <li style="padding:10px 0px 10px 8px">
            <span style="color:#ED6777; margin-top:-5px"> ● </span>
            <span style="color:#A5A5A5"> {{data_item.time}} </span> 
            <span style="color:#3B3B3B"> {{data_item.title.length > 12 ? data_item.title.substring(0,12)+"...":data_item.title}} </span>
          </li>
        </a>
      </ul>
    </div>
    <div class="col-sm-8 content_text">
      <h3 style="text-align:center; margin-top:20px">{{data_items[selectIndex].title}}</h3>
      <p style="margin:20px 20px 20px 20px">{{data_items[selectIndex].content}}</p>
    </div>
  </div>
</template>
<style>
  li {
    list-style-type:none;
  }

  .message_button{
    background-color: #1E2B44;
    color: #FAFAFA;
    width: 130px;
    height: 30px;
    margin-left: 20px;
    border: 1px solid #000029;
    border-radius: 5px;
  }

  .list_title{
    margin: 15px 0px 0px 20px; 
    background-color: white;
    padding-right: 0px;
  }
  
  .content_text{
    background-color:white; 
    margin-top:15px; 
    height:500px;
    border: 1px solid lightgray;
  }
</style>
<script>
  export default{
    data(){
      return {
        selectIndex: 0,
        data_items: [
          {
            time: '2017/03/22',
            title: '邻家好医诊所管理系统V1.0上线啦',
            content: '这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文'+
            '这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文'+
            '这个是消息正文这个是消息正文',
          },
          {
            time: '2017/03/22',
            title: '邻家好医诊所管理系统V2.0上线啦',
            content: '这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文'+
            '这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文'+
            '这个是消息正文这个是消息正文',
          },
          {
            time: '2017/03/22',
            title: '邻家好医诊所管理系统V3.0上线啦',
            content: '这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文'+
            '这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文'+
            '这个是消息正文这个是消息正文',
          },
          {
            time: '2017/03/22',
            title: '邻家好医诊所管理系统V4.0上线啦',
            content: '这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文'+
            '这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文'+
            '这个是消息正文这个是消息正文',
          },
          {
            time: '2017/03/22',
            title: '邻家好医诊所管理系统V5.0上线啦',
            content: '这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文'+
            '这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文这个是消息正文'+
            '这个是消息正文这个是消息正文', 
          },
        ],
      }
    },
    created(){

    },
    methods: {
      didSelectIndex: function (index) {
        this.selectIndex = index;
      },
    },
  }
</script>