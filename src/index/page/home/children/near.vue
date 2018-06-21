<template>
  <div >
    <!-- style="position: absolue;width:100%; height:31.25rem;top:0;" -->
    <!-- <scroll
        :data1 ="data1"
        :data = "shopList"
        :scrollbar='tabScrollbar'
        :pullDownRefresh='pullDownRefresh'
        :stopPropagation="stopPropagation"
        :scrollY = "scrollY"
        :pullUpLoad= "pullUpLoad"
        @scroll="scrollListen"
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp"> -->
        <div class="t-2">
          <div class="t-1">
            <div class="t-3">附近优惠</div>
            </div>
            <div class="hr-1"></div>
        </div>
        <ul v-for="item in shopList"  @click="goDetail($event,item,1)" >
          <!-- :key="item.TX_JRN" -->
            <li class="left">
                <img v-if="item.PIC_URL_1" :src="item.PIC_URL_1" :onerror = 'defaultIcon' alt="" >
                <img v-else :src="'/static/img/error.png'" alt="">
            </li>
            <li class="right">
                <div class="c1">{{item.STORES_NM}}</div>
                <div class="c2">
                    <span class="l">{{item.BUS_ADDR}}</span>
                    <span class="r">{{GetDistance(latitude,longitude,item.LATITUDE,item.LONGITUDE)}}km</span>
                </div>
                <div class="c3" >
                    <span  v-for="item1 in item.ACT_INF" class="b" >{{item1.GME_NM}}</span>
                </div>
            </li>
            <li class="hr-1"></li>
        </ul>
        <ul v-if = "!shopList || shopList.length<=0 ">
          <li @click="aginEnter()" class="aa">请点击刷新试试</li>
        </ul>
    <!-- </scroll> -->
    <!-- <div class="null"></div> -->
    </div>
</template>

<script>
import {
  //   fetchPoints,
  GetDistance
  //   setLItem,
  //   getLItem,
  //   getCode
} from "@@/service/util";
import Scroll from "@@/components/scroll/scroll.vue";
// import { baseUrl } from "@@/config/env"; // baseUrl

export default {
  data() {
    return {
      stopPropagation: false,
      defaultIcon: 'this.src="' + "/static/img/error.png" + '"',
      pullUpLoad: {
        threshold: -50
      }
    };
  },
  props: {
    latitude: {
      type: String,
      default: false
    },
    data1: {
      type: Boolean,
      default: false
    },
    scrollY: {
      type: Boolean,
      default: false
    },
    longitude: {
      type: String,
      default: false
    },
    shopList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tabScrollbar: {
      type: Boolean,
      default: false
    },
    pullDownRefresh: {
      type: null,
      default: true
    }
    // pullUpLoad: {
    //   type: Boolean,
    //   default: false
    // }
  },
  computed: {},

  mounted() {},
  created() {},

  components: {
    Scroll
  },

  computed: {},

  methods: {
    scrollListen(pos) {
      console.log("near");
      console.log(pos);
      // if(Math.abs(pos.y)<5){
      //   this.$emit('changeIscrollY',true)
      // }else{
      //   this.$emit('changeIscrollY',false)
      // }
    },
    aginEnter() {
      this.$emit("aginEnter");
    },

    GetDistance(a, b, c, d) {
      // alert(GetDistance(a, b, c, d))
      return GetDistance(a, b, c, d);
    },

    goDetail(event, obj, flag) {
      this.$emit("goDetail", event, obj, flag);
    },

    onPullingDown() {
      this.$emit("pullingDown");
    },
    onPullingUp() {
      this.$emit("pullingUp");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
.t-2{
  height: 2.5625rem;
  text-align: center;
  position: relative;
}
.t-2:after {
  @include onepx1(#d8d8d8);
}
.t-1{
  height: 100%;
  line-height: 2.5625rem;
  width: 9.375rem;
  margin: 0 auto;
  background-image:url('/static/img/2-5.png');
  background-repeat: no-repeat;
  background-position: 100%;
}
.t-3{
  height: 100%;
  line-height: 2.5625rem;
  width: 4.375rem;
  color:#888888;
  font-family: PingFangSC-Regular;
  font-size: .75rem;
  margin: 0 auto;
  background:#fff;
}
.nullHeight {
  height: 0.5625rem;
  background: #F6F7F8;
}
.refresh {
  text-align: center;
  padding: 1.25rem 0;
  color: #999999;
  background-image: url("/static/img/refresh.gif");
  background-size: 40%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  padding-top: 6.875rem;
  position: absolute;
  top: 3.125rem;
  width: 100%;
  height: 3.125rem;
}
.home {
  // transition: all 0.3s;
  // -webkit-transition: all 0.3s;
  // transform: translateZ(0);
  // -webkit-transform: translateZ(0);
  position: absolute;
  z-index: 1;
  top: 3rem;
  left: 0;
  width: 100%;
  // position: relative;
  height: 100%;
  // background: #f0f1f2;
  overflow: hidden;
}
.home1 {
  // margin-top: 4.25rem;
  height: 100%;
  overflow: hidden;
  // z-index: 19;
}
.content {
  // height: auto;
}
.s {
  position: relative;
  // margin-top: .625rem;
  // background: #ffffff;
}
.s_8 {
  @include wh(100%, 3rem);
  // padding-top: 1.25rem;
}
.s_1 {
  @include wh(100%, 3rem);
  // padding-top: 1.25rem;
  background: #ffffff;
  position: fixed;
  z-index: 21;
  .title {
    position: relative;
    height: 1.5625rem;
    text-align: center;
  }
  .title:after {
    @include onepx1(#d8d8d8);
  }
  .text {
    position: relative;
    width: 4rem;
    padding: 0.3125rem 0.625rem;
    top: 0.75rem;
    background: #fff;
    z-index: 10;
    color: #444444;
    font-size: 0.875rem;
  }
  ul {
    width: 100%;
    height: 100%;
  }
  .l {
    height: 100%;
    line-height: 3rem;
  }
  .t {
    color: #6c6c6c;
    font-size: 0.9375rem;
    width: 4.1875rem;
    position: relative;
    float: left;
    text-align: left;
    padding-left: 0.9375rem;
    // padding-right: 0.6rem;
    @include space();
  }
  // .t::after {
  //   content: " ";
  //   width: 0.625rem;
  //   height: 0.625rem;
  //   display: block;
  //   position: absolute;
  //   background-image: url(/static/img/1-13.png);
  //   background-repeat: no-repeat;
  //   background-position: 50%;
  //   background-size: 0.625rem auto;
  //   top: 1.05rem;
  //   right: 0.4375rem;
  // }
  .icon {
    display: block;
    width: 1rem;
    height: 1rem;
    position: absolute;
    z-index: 2;
    left: 0.25rem;
    top: 0.125rem;
    img {
      width: 100%;
    }
  }
  .i {
    width: auto;
    margin-left: 4.1875rem;
    display: block;
    margin-right: 1.25rem;
    position: relative;
    button {
      display: block;
      height: 1.9375rem;
      width: 100%;
      position: relative;
      top: 0.5rem;
      text-indent: 2em;
      line-height: 1.9375rem;
      text-align: left;
      color: #a7a7a7;
      background: #f0f1f2;
      border-radius: 0.25rem;
      font-size: 0.8125rem;
    }
  }
}
.s_2 {
  @include wh(100%, 10.625rem);
  overflow: hidden;
  background-color: #fff;
  ul,
  li {
    height: 100%;
    width: 100%;
  }
  img {
    width: 100%;
  }
  // background-image:url('/static/img/banner.jpg');
  // background-repeat: no-repeat;
  // background-position: 50%;
  // background-size: 100% auto;
}

.s_3 {
  @include wh(100%, 4.875rem);
  text-align: center;
  background-color: #fff;
  .icon {
    height: 1.75rem;
    width: auto;
    display: inline-block;
    padding: 0.84375rem 0 0.25rem 0;
  }
  .text {
    display: block;
    color: #13252e;
    font-size: 0.75rem;
  }

  ul {
    display: flex;
    height: 100%;
    li {
      height: 100%;
      flex: 1;
    }
  }
}
.s_4 {
  @include wh(100%, 7.125rem);
  padding-top: 0.25rem;
  padding-bottom: 0.625rem;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    max-height: 6.125rem;
  }
}

.s_5 {
  // padding: 0 0.9375rem;
  // background: #fff;
  margin-top: 0.5625rem;
  margin-bottom: 1rem;
  ul {
    height: 7.5rem;
    padding-top: 1.625rem;
    position: relative;
    margin: 0 0.9375rem;
  }
  // ul::after {
  //   @include onepx1(#d8d8d8);
  // }
  ul:nth-last-child(1)::after {
    height: 0 !important;
  }
  .title {
    position: relative;
    height: 1.5625rem;
    text-align: center;
    background-color: #fff;
  }
  .title:after {
    @include onepx1(#d8d8d8);
  }
  .text {
    position: relative;
    width: 4rem;
    padding: 0.3125rem 0.625rem;
    top: 0.75rem;
    background: #fff;
    z-index: 10;
    color: #444444;
    font-size: 0.875rem;
  }
  .left {
    width: 5.1875rem;
    height: auto;
    float: left;
    max-height: 5rem;
    overflow: hidden;
    img {
      width: 100%;
      max-height: 5rem;
      min-height: 4.5625rem;
    }
  }
  .right {
    float: left;
    padding-left: 0.5625rem;
    min-width: 60%;
    width: 75%;
    text-align: left;
  }
  .c1 {
    font-size: 0.8125rem;
    color: #13252e;
    max-width: 100%;
    @include space();
  }
  .c2 {
    font-size: 0.6875rem;
    color: #999999;
    padding-top: 0.5625rem;
    max-width: 90%;
    @include space();
    .l {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      max-width: 70%;
    }
  }
  .c3 {
    font-size: 0.75rem;
    color: #e11a2f;
    padding-top: 0.5625rem;
    letter-spacing: -0.00375rem;
    max-width: 70%;
    @include space();
    div {
      @include space();
    }
  }
  .r {
    position: absolute;
    right: 0;
  }
  .b {
    display: inline-block;
    background: #fff0f1;
    border: thin solid rgba(224, 24, 45, 0.2);
    border-radius: 0.125rem;
    padding: 0.05rem 0.225rem;
    margin-right: 0.1875rem;
  }
}

.s_6 {
  padding: 0 0.9375rem;
  background: #fff;
  margin-top: 0.5625rem;
  ul {
    // height: 7.5rem;
    // padding-top: 1.625rem;
  }
  ul:nth-of-type(1) {
    padding-top: 1.625rem;
  }
  .title {
    position: relative;
    height: 1.5625rem;
    text-align: center;
  }
  .title:after {
    @include onepx1(#d8d8d8);
  }
  .text {
    position: relative;
    width: 4rem;
    padding: 0.3125rem 0.5rem;
    top: 0.75rem;
    background: #fff;
    z-index: 10;
    color: #444444;
    font-size: 0.875rem;
  }
  img {
    width: 100%;
    height: auto;
  }
  .c-t {
    color: #13252e;
    font-size: 0.9375rem;
    padding-bottom: 0.9375rem;
  }
}
.slider-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
  a {
    display: inline-block;
    height: 100%;
  }
  img {
    max-height: 10.625rem;
  }
}
.scroll {
  height: 10.625rem;
}
.slide-content {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  position: relative;
  // margin: 0 .625rem .625rem;
}
.slider-item {
  height: 100% !important;
}
.food-wrapper-banner {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100% - 2.75rem);
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}
.foods-wrapper {
  width: 100%;
  // padding-left: 0.9375rem;
  // padding-right: 0.9375rem;
  .title {
    height: 2.8125rem;
    font-size: 0.9375rem;
    color: #929292;
    position: relative;
    line-height: 2.8125rem;
    padding-left: 0.95rem;
    padding-right: 0.16rem;
  }
  .icon {
    height: 1.0625rem;
    width: 1.0625rem;
    vertical-align: middle;
    position: absolute;
    //left: -.3125rem;
    left: 0;
    top: 0.9375rem;
  }
  .content {
    // padding-top:.875rem;
    // padding-left: .625rem;
  }
  .title:before {
    content: " ";
    position: absolute;
    left: 0.125rem;
    top: 50%;
    transform: translateY(-51%);
    width: 0.25rem;
    height: 0.9375rem;
    background: #ff4b4b;
  }
  .foods-item {
    height: 4.625rem;
    padding-top: 0.875rem;
    padding-left: 0.625rem;
    position: relative;
  }
  .food-top {
    height: 1.0625rem;
    // margin-top: .9375rem;
    padding-left: 1.5rem;
    //padding-right: 0.5rem;
    //position: relative;
    .left {
      float: left;
      color: #272727;
      font-size: 1rem;
      line-height: 1.15rem;
    }
    .right {
      float: right;
      color: #ff4b4b;
      font-size: 0.625rem;
    }
  }
  .flag {
    height: 1.2rem;
    display: inline-block;
    padding: 0rem 0.4rem;
    color: #ff4b4b;
    font-size: 0.625rem;
    background: rgba(255, 75, 75, 0.1);
    border-radius: 1rem;
    border: 0.125rem solid #fff;
    vertical-align: middle;
    line-height: 1.2rem;
    // margin-left: .375rem;
  }
  .food-bottom {
    height: 0.8125rem;
    font-size: 0.8125rem;
    color: #929292;
    margin-top: 0.5rem;
    padding-left: 1.5rem;
    padding-right: 0.5rem;
  }
  .foods-item:after {
    @include onepx_top(#e9e9e9);
  }
}
.end {
  text-align: center;
  font-size: 0.6875rem;
  color: #999999;
  padding-top: 0.3125rem;
}
.aa {
  position: relative;
  // width: 4rem;
  padding: 0.3125rem 0.625rem;
  top: 0.75rem;
  background: #fff;
  z-index: 10;
  color: #444444;
  font-size: 0.75rem;
  text-align: center;
}
.hr-1 {
  display: block;
  position: absolute;
  height: 0.0625rem;
  float: left;
  width: 100%;
  bottom: 0;
  background-color: #E6E6E6;
  -webkit-transform-origin: 0, 0;
  transform-origin: 0, 0;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
  // &::after {
  //   @include onepx1(#d8d8d8);
  // }
}
.null {
  height: 3rem;
  // padding-top: 1.2rem;
  // font-size: 0.6875rem;
  // color: #afadadc4;
}
</style>
