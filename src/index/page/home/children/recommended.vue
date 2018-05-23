<template>
  <div style="position: absolue;height:56.25rem;">
     <!-- style="position: absolue;width:100%; height:31.25rem;top:0;" -->
    <scroll :scrollY="scrollY"  :data="goodList" :stopPropagation="stopPropagation" @scroll = "scrollListen">
        <!-- {{goodList}} -->
         <ul class="scr" >
            <li v-for="item in goodList" :key="item.url" class="good" @click="goDetail(item.goUrl)">
                <div class="t-0"><img :src="item.url"></div>
                <div class="t-1">{{item.name}}</div>
                <div class="hr-1"></div>
            </li>
            <!-- <li class="good">
                <div class="t-0"><img src="/static/img/banner.jpg"></div>
                <div class="t-1">全场五折起，超值尖货19.9包邮，真爱商品等你来撩</div>
            </li>
            <li class="good">
                <div class="t-0"><img src="/static/img/banner.jpg"></div>
                <div class="t-1">全场五折起，超值尖货19.9包邮，真爱商品等你来撩</div>
            </li> -->
        </ul>

        <div class="null">————&nbsp;&nbsp;亲，我是有底线的&nbsp;&nbsp;————</div>
    </scroll>
 
</div>
</template>

<script>
// import { GetDistance } from "@@/service/util";
import Scroll from "@@/components/scroll/scroll.vue";
import { mapState } from "vuex";
const COMPONENT_NAME = "recommended";

export default {
  name: COMPONENT_NAME,
  props: {
    scrollY: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stopPropagation: false,
      goodList: [
        {
          name: "全场五折起，超值尖货19.9包邮，真爱商品等你来撩",
          url: "/static/img/recommended/1.png",
          goUrl:
            "https://mall.joypay.cn/cm-mall/activity/forlove.do"
        },
        {
          name: "优惠倒计时，精明的人都在里面抢好货",
          url: "/static/img/recommended/2.png",
          goUrl:
            "https://dmp-data.vip.com/ndl?tra_from=tra%3Acfnzf3vm%3A%3A%3A%3A"
        },
        {
          name: "让你一次爱个购，爱用和包说出来",
          url: "/static/img/recommended/3.png",
          goUrl: "https://app.kuaitong.com/jd/hd/9.jsp"
        },
        {
          name: "月卡季卡随心购，独播热剧抢鲜看",
          url: "/static/img/recommended/4.png",
          goUrl:
            "https://www.cmpay.com/mkmweb/wap_produce_detail.xhtml?viewCode=html&PROD_NO=20160401004618&HEADER_FLG=1"
        },
        {
          name: "炎炎夏日，大额红包为你带来一波清凉",
          url: "/static/img/recommended/5.png",
          goUrl:
            "https://h.umfintech.com/mallweb/h5hb/activitys/may.htm?channelid=H5"
        },
        {
          name: "居家、餐厨、数码、饮食，总有你的倾心之选",
          url: "/static/img/recommended/13.jpg",
          goUrl: "https://sn.51hive.com:7787/Repeater/ActApril"
        },
        {
          name: "精选口碑好货，约惠最美的你",
          url: "/static/img/recommended/7.png",
          goUrl: "https://mact.juanpi.com/bbjwag"
        },
        {
          name: "好护士表孝心，关爱家人从健康做起",
          url: "/static/img/recommended/8.png",
          goUrl: "https://h5shop.hhs16.com/index.html#/special?ID=23"
        },
        {
          name: "五星商旅同款，浓情五月有买有赠、五折起购",
          url: "/static/img/recommended/9.png",
          goUrl:
            "http://www.ylife.cn/mobile/subject.htm?subjectId=169&storeId=215"
        },
        {
          name: "给家一点新意，尽享倾心生活",
          url: "/static/img/recommended/10.png",
          goUrl: "https://huadupay.com/index.html#/special?ID=11"
        }
        // ,
        // {
        //   name: "摩拜单车优惠券9折促销活动",
        //   url: "/static/img/recommended/14.png",
        //   goUrl:
        //     "http://develop.huahaikeji.cn/public/mobike/activity/index?activityCode=act000001"
        // }
      ]
    };
  },

  mounted() {},
  created() {},

  components: {
    Scroll
  },

  computed: {
    ...mapState(["token"])
  },

  methods: {
    scrollListen(pos) {
      console.log("recommended");
      console.log(pos);
    },
    goDetail(url) {
      if (
        (/iP(ad|hone|od)/.test(navigator.userAgent) ? "ios" : "android") ==
        "android"
      ) {
        let url2 =
          url.indexOf("?") > 0
            ? url.replace(
                /\?/,
                "?hebaosso=true&SOURCE=DISCOVERaccount=" +
                  this.token.phone +
                  "&"
              )
            : url +
              "?hebaosso=true&SOURCE=DISCOVER&account=" +
              this.token.phone;
        console.log(url2);
        window.goActivity.goWeb(url2);
      } else {
        let url_2 =
          url.indexOf("?") > 0
            ? url.replace(
                /\?/,
                "?hebaosso=true&SOURCE=DISCOVER&account=" +
                  this.token.phone +
                  "&"
              )
            : url +
              "?hebaosso=true&SOURCE=DISCOVER&account=" +
              this.token.phone;
        window.location = "activity://goWeb?url=" + url_2;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
.good {
  margin: 0 1.25rem;
  padding-top: 1.125rem;
  position: relative;
}
// .good::after {
//   @include onepx1(#d8d8d8);
// }
.t-0 {
  width: 100%;
  img {
    display: block;
    width: 100%;
    border-radius: 0.5rem;
  }
}
.t-1 {
  //   font-family: PingFangSC-Regular;
  font-size: 0.8125rem;
  color: #13252e;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 0.5rem;
  padding-bottom: 1.25rem;
  text-align: left;
}
.null {
  height: 13rem;
  padding-top: 1.2rem;
  font-size: 0.6875rem;
  color: #afadadc4;
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
</style>
