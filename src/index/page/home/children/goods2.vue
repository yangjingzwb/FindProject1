<template>
    <div class="goods-2">
              <div class="title">
                为你推荐
              </div>
              <ul class="u1">
                <li v-for="item in data" :key="item.url" @click="goDetail($event,item,2)" >
                  <ul class="u2">
                    <li class="icon">
                      <img :src="item.marketingIcon">
                    </li>
                    <li class="text">
                      {{item.marketingTitle}}
                    </li>
                    <li class="price">
                      ¥{{item.commodityPrice.toFixed(2)}}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
</template>

<script>
import { GetDistance } from "@@/service/util";
import { mapState } from "vuex";
import axios from "@@/plugins/rsa/axios";
export default {
  data() {
    return {
     data:[]
    };
  },
  computed: {
    ...mapState(["token"])
  },

  mounted() {
    this.init()
  },
  created() {
    
  },

  components: {
  },

  methods: {
    init(){
      axios.post('queryMarketing',{
        "position": "RECOMMEND",
        "session": this.token.session.replace(/\+/g, "%2B") // 单点登录返回session
      }).then((res)=>{
        this.data = res.data
      })
    },
    goDetail(event, obj, flag) {
      this.$emit("goDetail", event, obj, flag);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
.goods-2 {
  padding-left: 8px;
  padding-right: 8px;
  .title {
    height: 49px;
    line-height: 49px;
    text-align: center;
    font-size: 15px;
    color: #13252e;
    font-family: PingFangSC-Regular;
    background-image: url(/static/img/2-11.png);
    background-repeat: no-repeat;
    background-size: auto 30%;
    background-position: 38%;
    // padding-bottom: 4px;
    overflow: hidden;
  }
  .u2{
     overflow: hidden;
  }
  .u1 > li {
    height: 210px;
    width: 50%;
    float: left;
    padding:0 8px 0 8px;
    margin-bottom: 18px;
    overflow: hidden;
  }
  .text {
    font-size: 13px;
    color: #13252e;
    font-family: PingFangSC-Light;
    white-space: normal !important;
    letter-spacing: 1px;
    line-height: 15px;
    display: -webkit-box;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding-top: 10px;
  }
  .price {
    font-size: 15px;
    color: #c11325;
    font-family: PingFangSC-Regular;
    padding-top: 5px;
  }
  li.icon {
    max-height: 156px;
    min-height: 94px;
    height: 156px;
    display: block;
    overflow: hidden;
    position: relative;
  }
  img {
    max-width: 100%;
    max-height: 156px;
    display: block;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%,-50%);
  }
}
</style>
