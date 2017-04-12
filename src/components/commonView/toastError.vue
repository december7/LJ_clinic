<template>
  <span class="is-danger toast-left"     >{{toastContent}}</span>
</template>
<script>
  export  default{
    props: {
      toastContent:{
        default: "请输入手机号码 !"
      },
    }

  }
</script>
<style >
  .is-danger{
    color:#f44f63;
    border-color: #f44f63 !important;
  }
  .is-danger:focus{
    border-color: #f44f63 !important;
  }
  .toast-left{
    float: left;
    margin-top: 10px;
  }
</style>
