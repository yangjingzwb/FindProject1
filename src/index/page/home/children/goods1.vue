<!--和悦商品接口-->
<template>
<div>
    <div class="banner" @click="goDetail($event,banner,2)">
      <img :src="banner.marketingIcon" >
    </div>
    <div class="goods">
      
    <ul class="u1">
      <li @click="goDetail($event,item,4)" v-for="item in data" :key="item.goodsId">
        <ul class="u2">
          <li class="icon">
            <img :src="item.picurl">
          </li>
          <li class="text">
            {{item.name}}
          </li>
          <li class="sub">
            <span class="price">¥{{fenToyuan(item.price)}}</span>
            <span class="linePrice">¥{{fenToyuan(item.marketPrice)}}</span>
          </li>
        </ul>
      </li>
    </ul>
     
  </div>
   <div class="nullHeight"></div>
</div>
   
</template>
<script>
import {
  fetchPoints,
  GetDistance,
  fenToyuan,
  getUUID,
  setMd5HY
} from "@@/service/util";
import { mapState } from "vuex";
import axios from "@@/plugins/rsa/axios";
export default {
  data() {
    return {
      data: {},
      banner: {}
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
      // 获取banner
      axios
        .post("queryMarketing", {
          position: "MIDDLE",
          session: this.token.session.replace(/\+/g, "%2B") // 单点登录返回session
        })
        .then(res => {
          this.banner = res.data.length >= 1 ? res.data[0] : res.data[0];
          // this.banner = res.data[0];
        });
      let param_ = {
        channel: 10197,
        requestId: getUUID()
      };
      param_.sign = setMd5HY(param_);
      // 和悦商品接口
      // 生产：https://mall.joypay.cn/cm-mall/outservice/hy/topiclist.do
      axios.post("topiclist.do", param_).then(res => {
        let data = res.topiclist[0].goodslist.sort(() => {
          return Math.random() > 0.5 ? -1 : 1;
        });
        this.data = data.slice(0, 3); // 每个专题必须至少返回3个商品
      });
    },
    goDetail(event, obj, flag) {
      if (flag == 2) {
        fetchPoints(
          "010000000000", // 页面索引
          "010000000000K04", //事件标记
          this.token.productNo,
          "和悦专题营销位", // 事件名称
          this.token.session.replace(/\+/g, "%2B")
        );
      }
      if(flag==4){
        fetchPoints(
          "010000000000", // 页面索引
          "010000000000K04", //事件标记
          this.token.productNo,
          "和悦专题营销位-"+obj.name, // 事件名称
          this.token.session.replace(/\+/g, "%2B")
        );
      }
      // alert(JSON.stringify(obj))
      this.$emit("goDetail", event, obj, flag);
    },
    fenToyuan: fenToyuan
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
.banner {
  width: 100%;
  // height: 8.3125rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
  img {
    width: 100%;
    // height: 100%;
  }
}
.goods {
  // height: 11.3125rem;
  padding-left: 0.6875rem;
  padding-right: 0.6875rem;
  .u2 {
    overflow: hidden;
  }
  .u1 {
    padding: 0 !important;
    display: flex;
    padding-top: 0.6875rem;
    & > li {
      flex: 3;
      flex-direction: row;
      max-width: 34%;
    }

    li.icon {
      max-height: 6.875rem;
      height: 6.875rem;
      position: relative;
      margin: 0 auto;
      // margin-top: 1.375rem;
      // margin-bottom: 1.375rem;
      text-align: center;
      overflow: hidden;
    }
    img {
      // width: 3.75rem;
      // min-height: 4.125rem;

      display: block;
      max-width: 6.5625rem;
      max-height: 6.5625rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      // border: 1px solid #D8D8D8;
    }
    .text {
      // text-indent: .3rem;
      font-size: 0.75rem;
      color: #13252e;
      font-family: PingFangSC-Light;
      text-align: center;
      // overflow: hidden;
      // display: -webkit-box;
      /* autoprefixer: ignore next */
      // -webkit-box-orient: vertical;
      // text-overflow: ellipsis;
      text-align: left;
      padding-right: 0.75rem;
      @include space();
    }
    .price {
      font-size: 0.75rem;
      color: #ed1991;
      font-family: PingFangSC-Medium;
      text-align: left;
      // padding-left: .625rem;
    }
    .linePrice {
      display: none;
      font-size: 0.75rem;
      color: #9b9b9b;
      font-family: PingFangSC-Regular;
      text-decoration: line-through;
      text-align: left;
    }
    .u2 {
      padding-bottom: 1.4375rem;
    }
    .sub {
      text-indent: 0.3rem;
    }
  }
}
</style>
