<template>
  <div class="loading">
    <img width="50" height="50" src="./loading.gif">
    <div style="font-size:12px" class="desc">{{title}}</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '加载中'
      }
    }
  }
</script>
<style lang="scss">
  .loading{
    width: 100%;
    text-align: center;
    desc{
      line-height: 16px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
</style>
