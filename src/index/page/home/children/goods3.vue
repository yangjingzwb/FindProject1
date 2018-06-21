<template>
    <div class="goods-3">
              <div class="nullHeight"></div>
               <div class="title">
                <div class="t-text">咨询</div>
              </div>
              <ul class="u1">
                <li @click="goDetail($event,item,1)">
                  <ul class="u2">
                    <li class="icon">
                      <img src="/static/img/1-1.png">
                    </li>
                    <li class="text">
                        上班经常饿？来点坚果补能量
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
</template>

<script>
import { GetDistance } from "@@/service/util";
import { mapState } from "vuex";
export default {
  data() {
    return {
     
    };
  },
  computed: {
    ...mapState(["token"])
  },

  mounted() {},
  created() {
    
  },

  components: {
  },

  methods: {
    goDetail(event, obj, flag) {
      this.$emit("goDetail", event, obj, flag);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";

.goods-3 {
  clear: both;
  .title{
    height: 49px;
    line-height: 49px;
    text-align: center;
    background-image:url('/static/img/2-5.png');
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: 100% auto; 
    margin: auto 16px;
  }
  .t-text{
    width: 80px;
    margin: 0 auto;
    background-color: #fff;
  }
  .icon {
    height: 200px;
  }
  img {
    display: -webkit-box;
    width: 100%;
    height: 200px;
    padding-left: 12px;
    padding-right: 12px;
    box-sizing: border-box;
  }
  .text {
    color: #13252e;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    padding-left: 12px;
    margin-top:5px;
    margin-bottom: 10px; 
  }
}
</style>
