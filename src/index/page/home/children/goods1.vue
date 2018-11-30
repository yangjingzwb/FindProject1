<!--和悦商品接口-->
<template>
<div>
    <div v-for="(item, index) of dataList" :key="'good1_1_'+index">
      <div v-if="banner" class="banner" @click="goDetail($event,item,2)">
        <img v-lazy="item.tbConductConfig.marketingIcon"/>
      </div>
      <div class="goods">
        <scroll 
          :scrollX = true
          :scrollbar = false
          :data="item.goodsVO"
        >
        <ul class="u1">
          <li v-for="(itemson, index) of item.goodsVO" @click="goDetail($event,itemson,3)" :key="'good1_'+index">
            <ul class="u2">
              <li class="icon">
                <img v-lazy="itemson.pic"/>
              </li>
              <li class="text">
                {{itemson.name}}
              </li>
              <li class="sub">
                <span class="price">¥{{(itemson.price)}}</span>
                <span v-if="itemson.originalPrice.length" class="linePrice">¥{{(itemson.originalPrice)}}</span>
              </li>
            </ul>
          </li>
          <li v-if="item.goodsVO.length>2" class="sw-option sw-option-end"><a href="group1/M00/00/04/wKgBxVv_S_CAWYVEAACGyuL4HR8827.jpg">更多优惠</a></li>
        </ul>
        </scroll>
      </div>
      
    </div>
    <div v-if="showMore = middle.length>4 ? true : false" 
        @click="showAll = !showAll" 
        class="more">
      <span v-if="showAll==false" class="down">展开</span>
      <span v-else class="up">收起</span>
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
import Scroll from "@@/components/scroll/scroll-goods.vue";
import sa from'sa-sdk-javascript';
export default {
  data() {
    return {
      data: {},
      showAll: false,
      showMore: false
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
    },
    dataList() {
      if (this.showAll == false) {
        var dataList = [];
        if (this.middle.length > 4) {
          for (var i = 0; i < 4; i++) {
            dataList.push(this.middle[i])
          }
        } else {
          dataList = this.middle
        }
        return dataList;
      } else {
        return this.middle
      }
    }
  },

  mounted() {
    // alert(this.middle)
    // alert(this.banner)
    // this.init();
  },
  created() {},

  components: {
    Scroll
  },

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
          contentName: '专题位-banner',
          topCategory: '优惠',
          subCategory: obj.tbConductConfig.marketingTitle,
          locationOfZone: '主图'
        });
        fetchPoints(
          "010000000000", // 页面索引
          "010000000000K01", //事件标记
          this.token.productNo,
          "专题营销位", // 事件名称
          this.token.session.replace(/\+/g, "%2B")
        );
      }
      if(flag==3){
         // 神策
        sa.track('ZoneClick', {
          contentName: obj.name,
          topCategory: '优惠',
          subCategory:  '专题位商品',
          locationOfZone: '附图'
        });
        fetchPoints(
          "010000000000", // 页面索引
          "010000000000K02", //事件标记
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
      flex: 4;
      flex-direction: row;
      max-width: 24%;
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
      font-size: 0.75rem;
      color: #9b9b9b;
      font-family: PingFangSC-Regular;
      text-decoration: line-through;
      text-align: left;
    }
    .u2 {
      // padding-bottom: 1.4375rem;
    }
    .sub {
      text-indent: 0.3rem;
    }
  }
  .sw-option {
    height: 6.875rem;;
    line-height: 6.875rem;
    font-size: 0.75rem;
    text-align: center;
    background: #F55B97;
    border-radius: 0.5rem;
    flex: 0 1 auto;
    // float: left;
    a {
      color: #fff;
    }
    img {
      display: inline-block;
      height: 5.625rem;
      // padding-left: 15px;
    }
    .p2 {
      // padding-left: .4375rem;
    }
  }
  div.sw-option-end {
    margin: 0 auto;
    color: #aeafaf;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    width: 1.25rem;
    padding-top: 0.5rem;
    line-height: 0.9375rem;
    margin-right: 0.625rem;
    margin-left: 0.625rem;
  }
}
.more {
  float: right;
  height: 100%;
  font-size: 0.875rem;
  padding-bottom: .5rem;
  color: #7E7E7E;
  .down {
    display: inline-block;
    width: 4rem;
    color: #13252e;
    background: url(/static/img/down.png) no-repeat 60% 50%;
    background-size: auto 80%;
  }
  .up {
    display: inline-block;
    width: 4rem;
    color: #13252e;
    background: url(/static/img/up.png) no-repeat 60% 50%;
    background-size: auto 80%;
  }
}
.nullHeight {
    width: 100%;
    height: 0.5625rem;
    background: #F6F7F8;
}
</style>
