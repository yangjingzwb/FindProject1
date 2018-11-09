<template>
  <div >
    <!-- style="position: absolue;width:100%; height:31.25rem;top:0;" -->
    <scroll
        :data1 ="data1"
        :data = "shopList"
        :pullUpLoad= "pullUpLoad"
        :scrollbar="scrollbar"
        @scroll="scrollListen"
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp">
        <div class="t-2">
          <div class="t-1">
            <div class="t-3">超市</div>
            </div>
            <div class="hr-1"></div>
        </div>
        <ul v-for="(item,index) in shopList"  @click="goSeller(item)" >
          <!-- :key="item.TX_JRN" -->
            <li class="left">
                <img v-if="item.PIC_URL_1" :src="item.PIC_URL_1" :onerror = 'defaultIcon' alt="" >
                <img v-else :src="'/static/img/error.png'" alt="">
            </li>
            <li class="middle">
                <div class="c1">{{item.STORES_NM}}</div>
                <div class="c2">
                    <span class="l">{{item.BUS_ADDR}}</span>
                    <span class="r">{{item.distance}}km</span>
                    
                </div>
                <div class="c3" >
                    <span  v-for="item1 in item.ACT_INF" class="b" >{{item1.GME_ABBR}}</span>
                </div>
            </li>
            <li class="right">
                <div class="c4">
                    <span class="btn">立即消费</span>
                </div>
            </li>
            <li class="hr-1" :class="{height0:index == shopList.length-1}"></li>
        </ul>
        <ul v-if = "!shopList || shopList.length<=0 ">
          <loading></loading>
          <!-- <vue-loading v-if="showLoading" type='balls' color="#ed196c"></vue-loading> -->
          <li @click="aginEnter()" class="aa">{{loadText}}</li>
        </ul>
    </scroll>
    <router-view></router-view>
    <!-- <div class="null"></div> -->
    </div>
</template>

<script>
import {
  fetchPoints
  // GetDistance
  //   setLItem,
  //   getLItem,
  //   getCode
} from "@@/service/util";
import { mapState, mapMutations } from "vuex";
import Scroll from "@@/components/scroll/scroll.vue";
import Loading from "@@/components/loading/loading.vue";
import axios from "@@/plugins/rsa/axios";
// import vueLoading from 'vue-loading-template';
// import { baseUrl } from "@@/config/env"; // baseUrl
import sa from'sa-sdk-javascript';

export default {
  data() {
    return {
      loadText: "",
      pullUpLoad: false,
      pullUpLoad_near: true,
      scrollbar: false,
      data1: false,
      stopPropagation: false,
      shopList: [],
      totalInit: 0,
      defaultIcon: 'this.src="' + "/static/img/error.png" + '"',
      pullUpLoad: {
        threshold: -50
      }
    };
  },
  props: {
  },
  computed: {
    ...mapState([
      "token",
      "showLoading",
      "latitude",
      "longitude",
      "cityname",
    ])
  },

  mounted() {
    if (!window.LATITUDE) {
      // this.aginEnter();
    } else {
      this.init();
    }
  },
  created() {},

  components: {
    Scroll,
    Loading
  },

  methods: {
    ...mapMutations([
      "CITYNAME1",
      "SHOWLOADING"
    ]),
    scrollListen(pos) {
      console.log("near");
      console.log(pos);
      // if(Math.abs(pos.y)<5){
      //   this.$emit('changeIscrollY',true)
      // }else{
      //   this.$emit('changeIscrollY',false)
      // }
    },
    init2() {
      setTimeout(() => {
        this.loadText = "请点击刷新"
      }, 8000);
    },
    aginEnter() {
      this.$emit("aginEnter");
    },

    // GetDistance(a, b, c, d) {
    //   // alert(GetDistance(a, b, c, d))
    //   return GetDistance(a, b, c, d);
    // },
    goSeller(obj) {
      let params = {
        latitude: window.LATITUDE,
        longitude: window.LONGITUDE,
        mbl_no: this.token.productNo,
        merc_id: obj.MERC_ID,
        merc_latitude: obj.LATITUDE,
        merc_longitude: obj.LONGITUDE,
        session: this.token.session.replace(/\+/g, "%2B"),
        mercHl: obj.MERC_HOT_LIN 
      };
      console.log("~~~~~~~~~~~~",obj);
      console.log("~~~~~~~~~~~~",params);
      this.$router.push({
        path: "/shopDetail",
        query: {
            params: params
          }
      });
      // 神策
      sa.track('buttonClick', {
        topCategory: '发现',
        subCategory: '发现：附近页'
      });
      fetchPoints(
        "010000000000", // 页面索引
        "010000000000K07", //事件标记
        this.token.productNo,
        "立即消费按钮", // 事件名称
        this.token.session.replace(/\+/g, "%2B")
      )
    },
    goDetail(event, obj, flag) {
      // 神策
      // sa.track('clickShop', {
      //   currentPage: '更多',
      //   commodityName: '附近商户'
      // });
      sa.track('clickShop', {
        currentPage: '更多',
        commodityID:obj.MERC_ID,
        commodityName: obj.STORES_NM,
        commodityType:obj.MERC_TRD_DESC,
        is_FromSearch:false,
        keyword:''
      });
      fetchPoints(
        "020000000000", // 页面索引
        "020000000000K07", //事件标记
        this.token.productNo,
        "附近商户-" + obj.STORES_NM, // 事件名称
        this.token.session.replace(/\+/g, "%2B")
      );
      this.$emit("goDetail", event, obj, flag);
    },
    filterObj(obj) {
      for (let i = 0; i < obj.length; i++) {
        if (obj[i].PIC_URL_1) {
          obj[i].PIC_URL_1 = this.baseImg + obj[i].PIC_URL_1;
        }
      }
      return obj;
    },
    loadMore() {
      if (this.shopListFlag) {
        return;
      }
      this.CURRENTPAGE += 1;
      // console.log("*************", this.CURRENTPAGE);
      axios.post("getShopInfo", {
        longitude: window.LONGITUDE, // 经度
        latitude: window.LATITUDE, // 维度
        stores_nm: "", // 门店名称
        merc_abbr: "", // 商户简称
        mblno: this.token.productNo, //用户手机号
        // tixn_cnl: "ROYTEL", // 固定值
        currentPage: this.CURRENTPAGE,
        pagNum: this.PAGNUM || 4,
        session: this.token.session.replace(/\+/g, "%2B"),
        map_type: window.isUseBaiDuLoc ? 0 : 1,
        merc_trd_cls: 1505
        }).then(res => {
          // this.shopList = res.STORES_REC;
          // 合并数组
          this.shopList.push.apply(this.shopList, this.filterObj(res.data));
          if (res.data.length < this.PAGNUM) {
            this.shopListFlag = true;
            this.data1 = true;
            // 数组没有更多了
          } else {
            this.shopListFlag = false;
            this.data1 = false;
          }
          this.initScroll();
        })
        .catch(res => {
          this.initScroll();
        });
    },
    scrollTo() {
      this.$refs.scroll.scrollTo(
        this.scrollToX,
        this.scrollToY,
        this.scrollToTime,
        ease[this.scrollToEasing]
      );
    },
    onPullingDown() {
      this.init(true);
      // 模拟更新数据
      // setTimeout(() => {
      //   if (Math.random() > 0.5) {
      //     // 如果有新数据
      //     this.items.unshift(this.$i18n.t('normalScrollListPage.newDataTxt') + +new Date())
      //   } else {
      //     // 如果没有新数据
      //     this.$refs.scroll.forceUpdate()
      //   }
      // }, 2000)
    },
    onPullingUp() {
      // 更新数据
      // console.log('pulling up and load data')
      // setTimeout(() => {
      //   if (Math.random() > 0.5) {
      //     // 如果有新数据
      //     let newPage = []
      //     for (let i = 0; i < 10; i++) {
      //       newPage.push(this.$i18n.t('normalScrollListPage.previousTxt') + ++this.itemIndex + this.$i18n.t('normalScrollListPage.followingTxt'))
      //     }

      //     this.items = this.items.concat(newPage)
      //   } else {
      //     // 如果没有新数据
      //     this.$refs.scroll.forceUpdate()
      //   }
      // }, 1500)
      this.loadMore();
    },
    rebuildScroll() {
      this.nextTick(() => {
        this.$refs.scroll.destroy();
        this.$refs.scroll.initScroll();
      });
    },

    refresh() {
      this.init(true);
      // 下拉刷新
      // if (this.refTime) {
      //   // 移除定时器
      //   clearTimeout(this.refTime);
      //   this.init(true);
      //   // window.location = "http://211.138.236.219:9100/main.html?hebaosso=true&showtitle=false"
      // }
    },
    init(flag) {
      // this.CURRENTPAGE = 1;
      // this.SHOWLOADING(true);
      // if (history.length >= 3 && localStorage && getLItem("shopList", 60000)) {
      //   // if (history.length >= 3 && localStorage && localStorage.getItem("shopList")) {
      //   this.CURRENTPAGE = 1;
      //   this.SHOWLOADING(true);
      //   // this.shopList = JSON.parse(localStorage.getItem("shopList"));
      //   this.shopList = getLItem("shopList", 60000);
      //   this.initScroll();
      //   setTimeout(() => {
      //     this.SHOWLOADING(false);
      //   }, 300);
      //   // if (res.data.length < this.PAGNUM) {
      //   this.shopListFlag = true;
      //   return;
      // }

      this.CURRENTPAGE = 1;
      if (!flag) {
        this.SHOWLOADING(true);
      } else {
        this.SHOWLOADING(false);
      }

      // 单点登录
      // 请求banner1
      this.cityName1 = window.CITYNAME || "定位中";
      // this.cityName1 =
      //   window.CITYNAME ||
      //   (/iP(ad|hone|od)/.test(navigator.userAgent)
      //     ? window.LBSINFO.CityName || "定位中"
      //     : getCode(window.LBSINFO.CityName));

      if (!window.LONGITUDE) {
        this.SHOWLOADING(false);
        return;
      }
      axios.post("getShopInfo", {
        longitude: window.LONGITUDE, // 经度
        latitude: window.LATITUDE, // 维度
        stores_nm: "", // 门店名称
        merc_abbr: "", // 门店简称
        // tixn_cnl: "ROYTEL", // 固定值
        currentPage: this.CURRENTPAGE,
        mblno: this.token.productNo, //用户手机号
        pagNum: this.PAGNUM || 4,
        session: this.token.session.replace(/\+/g, "%2B"),
        map_type: window.isUseBaiDuLoc ? 0 : 1,
        merc_trd_cls: 1505
        }).then(res => {
          if (res.data && res.data.length > 0) {
            this.isError = true;
            this.shopList = this.filterObj(res.data);
            // if (flag) {
            //   this.home.finishPullDown();
            // } else {
            //   this.home.refresh();
            // }
            this.initScroll();
            setTimeout(() => {
              this.SHOWLOADING(false);
            }, 300);
          } else {
            this.isError = true;
            this.totalInit++;
            if (this.totalInit <= 5) {
              this.init();
            } else {
              // this.shopList = getLItem("shopList", 600000);
              this.shopList = [];
              // setTimeout(() => {
              this.SHOWLOADING(false);
              this.isError = false;
              if (flag) {
                this.initScroll();
              } else {
                this.initScroll();
              }
              // }, 300);
            }
            return;
          }

          // console.log(this.shopList);
          if (res.data.length < this.PAGNUM) {
            this.shopListFlag = true;
            this.data1 = true;
            //没有更多了
          } else {
            this.shopListFlag = false;
            this.data1 = false;
          }
          // setTimeout(() => {
          //   // this.foodsScroll.scrollTo(0, -42, 500);
          //   this.home.refresh();
          //   this._calcHeight();
          // }, 40);
          // alert(33)
        })
        .catch(res => {
          // alert(11)
          // setTimeout(()=>{
          this.SHOWLOADING(false);
          this.totalInit++;
          if (this.totalInit <= 5) {
            this.init();
          } else {
            this.initScroll();
          }

          // },300)
        });
      // 请求banner2
      // 请求品类
    },
    initScroll() {
      // if (!this.home) {
      // this.$nextTick(() => {
      // this.foodsScroll = this.home = new BScroll(this.$refs.home, {
      //   scrollY: true,
      //   // startY: -39,
      //   // scrollX: false,
      //   click: true,
      //   probeType: 1,
      //   bounce: true,
      //   scrollbar: {
      //     fade: true,
      //     interactive: false // 1.8.0 新增
      //   },
      //   //  pullUpLoad:{
      //   //                   threshold: -70, // 当上拉到超过底部 4.375rem 时，
      //   //               }
      //   // pullDownRefresh: {
      //   //   threshold: 70,
      //   //   stop: 50 // 在上拉到超过底部 1.25rem 时，触发 pullingUp 事件
      //   // },
      //   pullUpLoad: {
      //     threshold: 50 // 在上拉到超过底部 1.25rem 时，触发 pullingUp 事件
      //   }
      //   // momentumLimitDistance: 15
      // });
      // // this.foodsScroll.on("pullingDown", () => {
      // //   this.refresh(true);
      // // });
      // this.foodsScroll.on("pullingUp", pos => {
      //   this.loadMore();
      // });
      // });
      // this.foodsScroll.on('scrollEnd',(pos)=>{
      //   console.log("888888888")
      //   console.log(pos)
      // })
      // } else {
      // this.home.finishPullUp();
      // setTimeout(() => {
      // this.$refs.scroll.forceUpdate()
      // this.home.finishPullDown();
      // // }, 300);
      // this.home.finishPullUp();
      // this.home.refresh();
      // }
    },
    _calcHeight() {
      // if (this.residue > 0) {
      //   this.listHeight[this.listHeight.length - 1] += residue;
      // }
      // this.residueHeight = residue > 0 ? residue + "px" : "0rem"; //设置最后菜单的padding
      // 重置滚动区域
      // setTimeout(() => {
      //   this._initScroll();
      // }, 0);
    },
    goToApply() {},
    closeAlert() {},
    goBack() {
      this.$router.go(-1);
    }
  },
  activated(){
    console.log(2323)
    // alert()
    this.refreshNow = !this.refreshNow
  },
  watch:{
    latitude(curVal,oldVal){
      if(curVal&&curVal!="" && this.shopList.length<=0){
        // this.init()
      }
      
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
.t-2 {
  height: 2.5625rem;
  text-align: center;
  position: relative;
}
.t-2:after {
  @include onepx1(#d8d8d8);
}
.t-1 {
  height: 100%;
  line-height: 2.5625rem;
  width: 9.375rem;
  margin: 0 auto;
  background-image: url("/static/img/2-5.png");
  background-repeat: no-repeat;
  background-position: 100%;
}
.t-3 {
  height: 100%;
  line-height: 2.5625rem;
  width: 4.375rem;
  color: #888888;
  font-family: PingFangSC-Regular;
  font-size: 0.75rem;
  margin: 0 auto;
  background: #fff;
}
.nullHeight {
  height: 0.5625rem;
  background: #f6f7f8;
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
    height: 6.6875rem;
    padding-top: 1rem;
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
  .middle {
    float: left;
    padding-left: 0.5625rem;
    min-width: 50%;
    width: 50%;
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
    color: #999;
    padding-top: 0.5625rem;
    @include space();
    .l {
      width: 100%;
      @include space();
      display: inline-block;
      // max-width: 70%;
    } 
    
  }
  .c3 {
    font-size: 0.75rem;
    color: #e11a2f;
    padding-top: 0.5rem;
    letter-spacing: -0.00375rem;
    max-width: 80%;
    @include space();
    div {
      @include space();
    }
  }
  .r {
    position: absolute;
    top: 1rem;
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
  .right {
    float: left;
    position: absolute;
    top: 2.375rem;
    right: 0;
  }
  .c4 {
    position: relative;
    height: 1.875rem;
    color: #ed196c;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    text-align: center;
    z-index: 99;
    .btn {
      display: inline-block;
      width: 4.5625rem;
      height: 1.875rem;
      border: 0.0625rem solid #ed196c;
      border-radius: 0.9375rem;
      line-height: 1.875rem;
    }
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
  top: 3.4375rem;
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
  background-color: #e6e6e6;
  -webkit-transform-origin: 0, 0;
  transform-origin: 0, 0;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
  // &::after {
  //   @include onepx1(#d8d8d8);
  // }
}
.hr-1:nth-last-child(-1) {
  height: 0;
}
.null {
  height: 3rem;
  // padding-top: 1.2rem;
  // font-size: 0.6875rem;
  // color: #afadadc4;
}
</style>
