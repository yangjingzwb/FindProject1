<template>
  <div >
    <!-- <div > -->
    <!-- <alert-tip :alertTextFirst='alertTextFirst' :alertTextSecond='alertTextSecond' :btnText='btnText'  v-if="isShowAlert" @closeTip='closeAlert'/> -->
    <!-- <nav class="city_nav">
    </nav> -->
    <section v-if="!flag&!topCat" class="s_1">
      <ul>
        <li class="l t">
          {{cityName1}}
        </li>
        <li class="l i" @click="done()">
          <span class="icon"><img src="/static/img/1-20.png"></span>
            <button>搜一搜：请输入商户名称</button>
        </li>
      </ul>
    </section>
    <section v-show="topCat" class="s_1 animation_1">
      <ul class="cat_w">
        <li class="cat c1" :class="{'active':slideIndex==0}" @click="goToPage(0)">
          附近
        </li>
        <li class="cat c2" :class="{'active':slideIndex==1}" @click="goToPage(1)">
          推荐
        </li>
        <li class="cat c3" :class="{'active':slideIndex==2}" @click="goToPage(2)">
          好物
        </li>
        <!-- <li class="cat c3" :class="{'active':slideIndex==3}" @click="goToPage(3)">
          咨询
        </li> -->
      </ul>
    </section>
    <div class="home home1" >
      <scroll
        :data = "shopList"
        :scrollbar='scrollbar'
        :pullUpLoad='pullUpLoad'
        :bounce = "bounce"
        :click = "slider_middle_click"
        :scrollY = "scrollY"
        :startY = "startY"
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp"
        @scroll = "scrollListen">
        <div class="content">
          <section v-if="slider && slider.length>0" class="s_2 s foods-wrapper">
            <div class="scroll content slide-content">
              <div>
                  <div class="slider-wrapper">
                      <slider :click="slider_top_click" :autoPlay = "slider.length>1" :loop="slider.length>1">
                          <div v-for="item in slider">
                            <!-- :key="item.marketingId -->
                              <a  @click="goDetail($event,item,2)" >
                                  <img :src="item.marketingIcon">
                              </a>
                          </div>
                      </slider>
                  </div>
              </div>
            </div>
          </section>

          <section v-if="slider1 && slider1.length>0" class="s_3 s">
            <ul>
              <li v-for="item in slider1"  @click="goDetail($event,item)">
                <!-- :key="item.id" -->
                <img :src="item.marketingIcon" :onerror='defaultIcon'  class="icon" >
                <span class="text">{{item.marketingTitle}}</span>
              </li>
            </ul>
          </section>

          <div class="nullHeight"></div>

          
          <section class="s_5 s" >
              <div class=" content slide-content">
              <div>
                  <div class="slider-wrapper">
                      <slider :showDot = "showDot" :loopX = "loopX" :threshold="threshold" :sliderIndex = "sliderIndex" :click="slider_top_click" :autoPlay = "tabAutoPlay" :loop = "tabLoop" :dots_="dots" class="tab-slider">
                        <div style="position: relative;width:56.25rem;">
                          <near
                            :data1 = "data1"
                            :latitude = 'latitude'
                            :longitude = 'longitude'
                            :shopList="shopList"
                            :data = "shopList"
                            :scrollbar='tabScrollbar'
                            :pullDownRefresh='pullDownRefresh'
                            :pullUpLoad='pullUpLoad_near'
                            :scrollY = 'scrollYOther'
                            @aginEnter = "aginEnter"
                            @changeIscrollY="changeIscrollY"
                            @goDetail="goDetail"
                            @pullingDown="onPullingDown"
                            @pullingUp="onPullingUp">
                            >
                          </near>
                        </div>
                        <div style="position: relative;width:56.25rem;">
                          <recommended
                          :scrollY = 'scrollYOther'
                          @changeIscrollY="changeIscrollY"
                          ></recommended>
                        </div>
                        <div>
                          <goodThing
                            :scrollY = 'scrollYOther'
                            @changeIscrollY="changeIscrollY"
                          ></goodThing>
                        </div>
                        <!-- <div>
                          <consulting></consulting>
                        </div> -->
                      </slider>
                  </div>
              </div>
            </div>
          </section>
        </div>
      </scroll>
     </div>
  </div>
</template>

<script>
// import headTop from "@@/components/header/head";
// import footGuide from '@@/components/footer/footGuide'
// import SlideRender from '@@/components/page-render/slide-render'
import { mapState, mapMutations } from "vuex";

import Slider from "@@/components/base/slider";
// import Scroll from '@@/components/scroll/scroll.vue'
import axios from "@@/plugins/rsa/axios";
import {
  fetchPoints,
  GetDistance,
  setLItem,
  getLItem,
  getCode
} from "@@/service/util";
import BScroll from "better-scroll";
import Scroll from "@@/components/scroll/scroll.vue";
import { baseUrl } from "@@/config/env"; // baseUrl
import Near from "./near.vue"
import Recommended from "./recommended.vue"
// import Consulting from "./consulting.vue" // 咨询
import GoodThing from "./goodThing.vue" // 好物

// console.log(axios);
// import {cityGuess, hotcity, groupcity} from '../../service/getData'

export default {
  data() {
    return {
      pullUpLoad:false,
      pullUpLoad_near:true,
      data1:false,
      banner: "/static/mine_banner.png",
      icon: require("@@/images/mine/help_other-pressed.png"),
      product: [],
      listHeight: [],
      scrollY: true,
      topCat:false,
      scrollbar:false,
      slider_top_click:false,
      slider_middle_click:true,
      bounce:false,
      defaultIcon: 'this.src="' + "/static/img/error.png" + '"',
      tabAutoPlay:false,
      tabLoop:false,
      tabScrollbar:false,
      showDot:true,
      dots:['附近','推荐','好物'],//['附近','推荐','好物','咨询'],
      // autoPlay:,
      // defaultIcon: "",

      // slider:[],
      // slider1:[],
      // slider2:[],
      isError: true,
      loopX:true,
      shopList: [],
      limit: "",
      creditResult: "",
      isShowAlert: false,
      alertTextFirst: "",
      alertTextSecond: "",
      btnText: "",
      isAdmittance: false,
      home: "",
      foodsScroll: "",
      residue: 0,
      flag: false,
      shopListFlag: false,
      CURRENTPAGE: 0, // 页码
      PAGNUM: 4,
      refTime: "",
      baseImg: baseUrl.img,
      totalInit: 0,
      endX: 0,
      sliderIndex:1,
      startX: 0,
      scrollY:true,
      scrollYOther:true,
      startY:0,
      threshold:0.2,
      cityName1: window.CITYNAME || "定位中",
      pullDownRefresh: {
        threshold: 60,
        stop: 60
      }
    };
  },
  computed: {
  },

  mounted() {
    if (!window.LATITUDE) {
      this.aginEnter();
    } else {
      this.init();
    }
  },
  created() {
  },

  components: {
    Slider,
    Scroll,
    Near,
    Recommended,
    // Consulting,
    GoodThing
    // vueLoading
    // SlideRender
  },

  computed: {
    ...mapState([
      "slider",
      "slider1",
      "slider2",
      "products",
      "token",
      "latitude",
      "longitude",
      "cityname",
      "sliderScroll",
      "slideIndex",
      "openAndClose"
    ])
  },

  methods: {
    ...mapMutations([
      "SLIDER1", // 我的页面banner图
      "PRODUCTS",
      "SHOWLOADING",
      "CITYNAME1",
      "OPENANDCLOSE"
    ]),
    scrollListen(pos) {
      console.log('home')
      console.log(pos)
      // setTimeout(()=>{

      // })
      // 处理滑动
      // if(Math.abs(pos.y)>280){
      //   this.scrollYOther = true;
      //   this.scrollY = false
      //   // this.startY = pos.y
      // }else if(Math.abs(pos.y)>0){
      //   console.log(99999)
      //   this.scrollYOther = false;
      //   // this.scrollY = true
      // }
      if(Math.abs(pos.y)>320){
        // this.scrollY = false
        // this.scrollYOther = true;
        // this.startY = -321
        // this.OPENANDCLOSE(false)
        this.topCat = true;
        
      }else{
        this.topCat = false;
        // this.OPENANDCLOSE(true)
      }
    },
    changeIscrollY(flag){
      this.scrollY = flag;
    },
    goToPage(index){
      console.log("这是index----- ",index)
      this.sliderIndex = index;
    },
    aginEnter() {
      // alert(33)
      this.SHOWLOADING(true);
      this.initScroll();
      let that = this;
      if (this.cityName1 && this.cityName1 != "定位中" && window.LATITUDE) {
        this.init();
      } else {
        new BMap.Geolocation().getCurrentPosition(function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            // 判断状态
            let pt = r.point;
            console.log(r);

            new BMap.Geocoder().getLocation(pt, function(rs) {
              // if (this.getStatus() == BMAP_STATUS_SUCCESS) {
              if (rs.point) {
                let addComp = rs.addressComponents;
                window.LATITUDE = rs.point.lat;
                window.LONGITUDE = rs.point.lng;
                window.CITYNAME = addComp.city;
                that.cityName1 = addComp.city;
              } else {
                window.LATITUDE = r.point.lat;
                window.LONGITUDE = r.point.lng;
                window.CITYNAME = r.address.city;
                that.cityName1 = r.address.city;
              }
              that.init();
              // alert(addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
            });
          } else {
            this.SHOWLOADING(true);
          }
        });
      }
    },
    intervalCity() {
      this.cityName1 = window.CITYNAME || "定位中";
    },
    defaultIconF(i) {
      this.shopList[i].PIC_URL_1 = "/static/img/error.png";
    },
    GetDistance(a, b, c, d) {
      // alert(GetDistance(a, b, c, d))
      return GetDistance(a, b, c, d);
    },
    detail(url) {
      window.location = url;
    },
    gotoAddress(path) {
      this.$router.push(path);
    },
    done() {
      // 跳转到下一个页面
      this.$router.push("/mine");
    },
    touchStart(e) {
      let touch = e.changedTouches[0];
      this.startX = touch.pageX;
    },
    goDetail(event, obj, flag) {
      // 防止pc端触发两次点击
      // if (!event._constructed) {
      //   return;
      // }
      //埋点 parent_title, sub_title,phone,remark, session
      try {
        fetchPoints(
          "index",
          obj.marketingPosition || obj.STORES_NM,
          this.token.productNo,
          "发现页，点击",
          this.token.session.replace(/\+/g, "%2B")
        );
      } catch (e) {}

      let url = flag == 1 ? obj.MERC_URL : obj.marketingEventCotent;
      // if (flag == 1) {
      //   setLItem("shopList", JSON.stringify(this.shopList));
      //   // localStorage.setItem("shopList", JSON.stringify(this.shopList));
      //   //.replace(/www/, "uat")
      //   this.SHOWLOADING(true);
      //   // setTimeout(()=>{

      //   // },5000)
      //   // this.stopClick = 1
      //   window.location =
      //     url.indexOf("?") > 0
      //       ? url.replace(/\?/, "?showtitle=false&") +
      //         "&SOURCE=DISCOVER&" +
      //         window.location.href.split("?")[1].split("#")[0]
      //       : url +
      //         "?showtitle=false&SOURCE=DISCOVE&" +
      //         window.location.href.split("?")[1].split("#")[0];
      //   return;
      // }
      // alert(33)
      if (
        (/iP(ad|hone|od)/.test(navigator.userAgent) ? "ios" : "android") ==
        "android"
      ) {
        if (flag == 2) {
          let url2 =
            url.indexOf("?") > 0
              ? url.replace(/\?/, "?hebaosso=true&SOURCE=DISCOVER&account="+this.token.productNo+"&")
              : url + "?hebaosso=true&SOURCE=DISCOVER&account="+this.token.productNo;
          // console.log(url2);
          window.goActivity.goWeb(url2);
        } else {
          window.goActivity.goWeb(
            url.replace(/\?/, "?showtitle=false&hebaosso=true&SOURCE=DISCOVER&account="+this.token.productNo+"&")
          );
        }
      } else {
        if (flag == 2) {
          let url_2 =
            url.indexOf("?") > 0
              ? url.replace(/\?/, "?hebaosso=true&SOURCE=DISCOVER&account="+this.token.productNo+"&")
              : url + "?hebaosso=true&SOURCE=DISCOVER&account="+this.token.productNo;
          // console.log(url_2);
          window.location = "activity://goWeb?url=" + url_2;
        } else {
          // console.log(
          //   url.replace(/\?/, "?showtitle=false&hebaosso=true&SOURCE=DISCOVER&")
          // );
          window.location =
            "activity://goWeb?url=" +
            url.replace(
              /\?/,
              "?showtitle=false&hebaosso=true&SOURCE=DISCOVER&account="+this.token.productNo+"&"
            );
        }
      }
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
      axios
        .post("getShopInfo", {
          longitude: window.LONGITUDE, // 经度
          latitude: window.LATITUDE, // 维度
          stores_nm: "", // 门店名称
          merc_abbr: "", // 商户简称
          mblno:this.token.productNo,//用户手机号
          // tixn_cnl: "ROYTEL", // 固定值
          currentPage: this.CURRENTPAGE,
          pagNum: this.PAGNUM || 4,
          session: this.token.session.replace(/\+/g, "%2B")
        })
        .then(res => {
          // this.shopList = res.STORES_REC;
          // 合并数组
          this.shopList.push.apply(this.shopList, this.filterObj(res.data));
          if (res.data.length < this.PAGNUM) {
            this.shopListFlag = true;
            this.data1 = true
            // 数组没有更多了
          }else{
            this.shopListFlag = false;
            this.data1 = false
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
      this.CURRENTPAGE = 1;
      if (!flag) {
        this.SHOWLOADING(true);
      } else {
        this.SHOWLOADING(false);
      }

      // 单点登录
      // 请求banner1
      this.cityName1 = window.CITYNAME || "定位中";
      if (!window.LONGITUDE) {
        this.SHOWLOADING(false);
        return;
      }
      axios
        .post("getShopInfo", {
          longitude: window.LONGITUDE, // 经度
          latitude: window.LATITUDE, // 维度
          stores_nm: "", // 门店名称
          merc_abbr: "", // 门店简称
          mblno:this.token.productNo,//用户手机号
          // tixn_cnl: "ROYTEL", // 固定值
          currentPage: this.CURRENTPAGE,
          pagNum: this.PAGNUM || 4,
          session: this.token.session.replace(/\+/g, "%2B")
        })
        .then(res => {
          if (res.data && res.data.length > 0) {
            this.isError = true;
            this.shopList = this.filterObj(res.data);
          
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
          
          if (res.data.length < this.PAGNUM) {
            this.shopListFlag = true;
            this.data1 = true
            //没有更多了
          }else{
            this.shopListFlag = false;
            this.data1 = false
          }
        })
        .catch(res => {
        
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
    closeAlert() {}
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
// .home{
//   position: relative;
// }
.nullHeight {
  height: .5625rem;
  background: #f0f1f2;
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
.s_1,.s_5_1 {
  // @include wh(100%, 3rem);
  // // padding-top: 1.25rem;
  // background: #ffffff;
  // position: fixed;
  // z-index: 100000;
  @include wh(100%, 3rem);
  // padding-top: 1.25rem;
  background: #ffffff;
  position: sticky;
  z-index: 100000000;
  top: 0;
  left: 0;
  .cat_w{
      height: 3rem !important;
      top: 0rem !important;
      background: white;
      line-height: 3rem;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
  }
  .cat{
    width: 33%;
    text-align: center;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 3rem;
    line-height: 3rem;
    background: #fff;
    font-family: PingFangSC-Regular;
    color: #13252E;
    font-size: .9375rem;
  }
  .cat.active{
    background: #fff;
    color: #ED1991;
    border-bottom: .125rem solid #ED1991;
    border-radius: 0;
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
  // margin-top: 0.5625rem;
  margin-bottom: 1rem;
  height: 56.25rem;
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
    right: 0.9375rem;
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
  height: 56.25rem;
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
  font-size: .75rem;
  text-align: center;
}
.hr-1 {
  display: block;
  position: absolute;
  height: 0.0625rem;
  float: left;
  width: 100%;
  bottom: 0;
  background-color: #d8d8d8;
  -webkit-transform-origin: 0, 0;
  transform-origin: 0, 0;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
  // &::after {
  //   @include onepx1(#d8d8d8);
  // }
}
.animation_2::after,.animation_1::after{
  	content: "  ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 120%;
    height: .0625rem;
    background-color: #d8d8d8;
    /* 如果不用 background-color, 使用 border-top:.0625rem solid #f00; 效果是一样的*/
    -webkit-transform: scaleY(.5);
    transform:scaleY(.5);
}

</style>
