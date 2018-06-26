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
                    <li class="text" style="-webkit-box-orient: vertical;">
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
  padding-left: .5rem;
  padding-right: .5rem;
  .title {
    height: 3.0625rem;
    line-height: 3.0625rem;
    text-align: center;
    font-size: .9375rem;
    color: #13252e;
    font-family: PingFangSC-Regular;
    background-image: url(/static/img/2-11.png);
    background-repeat: no-repeat;
    background-size: auto 30%;
    background-position: 38%;
    // padding-bottom: .25rem;
    overflow: hidden;
  }
  .u2{
     overflow: hidden;
  }
  .u1 > li {
    height: 14.4rem;
    width: 50%;
    float: left;
    padding:0 .5rem 0 .5rem;
    margin-bottom: 1.125rem;
    overflow: hidden;
  }
  .text {
    font-size: .8125rem;
    color: #13252e;
    font-family: PingFangSC-Light;
    white-space: normal !important;
    letter-spacing: .0625rem;
    line-height: .9375rem;
    display: -webkit-box;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-top: .625rem;
  }
  .price {
    font-size: .9375rem;
    color: #c11325;
    font-family: PingFangSC-Regular;
    margin-top: .3125rem;
  }
  li.icon {
    max-height: 9.75rem;
    min-height: 5.875rem;
    height: 9.75rem;
    display: block;
    overflow: hidden;
    position: relative;
  }
  img {
    max-width: 100%;
    max-height: 9.75rem;
    display: block;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%,-50%);
  }
}
</style>
