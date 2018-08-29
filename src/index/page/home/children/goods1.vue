<!--和悦商品接口-->
<template>
<div>
    <div v-for="(item, index) of middle">
      <div v-if="banner" class="banner" @click="goDetail($event,item,2)">
        <img :src="item.tbConductConfig.marketingIcon" >
      </div>
      <div class="goods">
        <ul class="u1">
          <li v-for="(itemson, index) of item.goodsVO" @click="goDetail($event,itemson,3)">
            <ul class="u2">
              <li class="icon">
                <img :src="itemson.pic">
              </li>
              <li class="text">
                {{itemson.name}}
              </li>
              <li class="sub">
                <span class="price">¥{{(itemson.price)}}</span>
                <span class="linePrice">¥{{(itemson.originalPrice)}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="nullHeight"></div>
    </div>
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
import sa from'sa-sdk-javascript';
export default {
  data() {
    return {
      data: {},
      // banner: {}
    };
  },
  props: {
    middle: Array
  },
  computed: {
    ...mapState(["token"]),
    banner:function(){
      return this.middle && this.middle.length>=1 ? this.middle[0] : this.middle[0]
    }
  },

  mounted() {
    // alert(this.middle)
    // alert(this.banner)
    // this.init();
  },
  created() {},

  components: {},

  methods: {
    init() {
      // this.banner = this.middle.length>=1 ? this.middle[0] : this.middle[0]
      // 获取banner
      // axios
      //   .post("queryMarketing", {
      //     position: "MIDDLE",
      //     session: this.token.session.replace(/\+/g, "%2B") // 单点登录返回session
      //   })
      //   .then(res => {
      //     this.banner = res.data.length >= 1 ? res.data[0] : res.data[0];
      //     // this.banner = res.data[0];
      //   });
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
        // 神策
        sa.track('ZoneClick', {
          contentName:'专题营销',
          topCategory: '发现',
          locationOfZone: 'banner主图' + obj.tbConductConfig.marketingTitle
        });
        fetchPoints(
          "010000000000", // 页面索引
          "010000000000K04", //事件标记
          this.token.productNo,
          "专题营销位", // 事件名称
          this.token.session.replace(/\+/g, "%2B")
        );
      }
      if(flag==3){
         // 神策
        sa.track('ZoneClick', {
          contentName:'专题营销',
          topCategory: '发现',
          locationOfZone: '附图'+ obj.name
        });
        fetchPoints(
          "010000000000", // 页面索引
          "010000000000K04", //事件标记
          this.token.productNo,
          "专题营销位-"+obj.name, // 事件名称
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
