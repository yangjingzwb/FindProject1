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
import { fetchPoints, GetDistance } from "@@/service/util";
import { mapState } from "vuex";
import axios from "@@/plugins/rsa/axios";
import sa from'sa-sdk-javascript';
export default {
  data() {
    return {
      data: []
    };
  },
  computed: {
    ...mapState(["token"])
  },

  mounted() {
    this.init();
  },
  created() {},

  components: {},

  methods: {
    init() {
      axios
        .post("queryMarketing", {
          position: "RECOMMEND",
          session: this.token.session.replace(/\+/g, "%2B") // 单点登录返回session
        })
        .then(res => {
          this.data = res.data;
          console.log(this.data);
        });
    },
    goDetail(event, obj, flag) {
      // 神策
      sa.track('ZoneClick', {
        contentName:'为您推荐',
        subCategory: '为您推荐',
        topCategory: '发现',
        locationOfZone: '商品-'+obj.marketingTitle
      });
      // 埋点-为你推荐
      fetchPoints(
        "010000000000", // 页面索引
        "010000000000K05", //事件标记
        this.token.productNo,
        "为你推荐-"+obj.marketingTitle, // 事件名称
        this.token.session.replace(/\+/g, "%2B")
      );
      this.$emit("goDetail", event, obj, flag);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
.goods-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  .title {
    height: 3.0625rem;
    line-height: 3.0625rem;
    text-align: center;
    font-size: 0.9375rem;
    color: #13252e;
    font-family: PingFangSC-Regular;
    background-image: url(/static/img/2-11.png);
    background-repeat: no-repeat;
    background-size: auto 30%;
    background-position: 38%;
    // padding-bottom: .25rem;
    overflow: hidden;
  }
  .u2 {
    overflow: hidden;
  }
  .u1 > li {
    height: 14.4rem;
    width: 50%;
    float: left;
    padding: 0 0.5rem 0 0.5rem;
    margin-bottom: 1.125rem;
    overflow: hidden;
  }
  .text {
    font-size: 0.8125rem;
    color: #13252e;
    font-family: PingFangSC-Light;
    white-space: normal !important;
    letter-spacing: 0.0625rem;
    line-height: 0.9375rem;
    display: -webkit-box;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-top: 0.625rem;
  }
  .price {
    font-size: 0.9375rem;
    color: #c11325;
    font-family: PingFangSC-Regular;
    margin-top: 0.3125rem;
  }
  li.icon {
    max-height: 9.75rem;
    min-height: 5.875rem;
    height: 9.75rem;
    display: block;
    overflow: hidden;
    position: relative;
    // border: 1px solid #D8D8D8;
  }
  img {
    width: 100%;
    max-height: 9.75rem;
    display: block;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    // border: 1px solid #D8D8D8;
  }
}
</style>
