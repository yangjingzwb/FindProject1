<template>
  <div style="position: absolue;height:56.25rem;">
     <!-- style="position: absolue;width:100%; height:31.25rem;top:0;" -->
    <scroll :scrollY="scrollY"  :data="goodList" :stopPropagation="stopPropagation" @scroll = "scrollListen">
        <!-- {{goodList}} -->
         <ul class="scr" >
            <li v-for="item in goodList" :key="item.name" class="good" @click="goDetail(item.goUrl)">
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
        // {
        //   name: "99元任选3件，还可领20元购物红包",
        //   url: "/static/img/recommended/4-2.png",
        //   goUrl:
        //     "https://dmp-data.vip.com/ndl?tra_from=tra%3A75gpn5yd%3A%3A%3A%3A"
        // },
        {
          name: "开学季钜惠，全场好货低至1元，再享50元购物红包",
          url: "/static/img/recommended/wph8.png",
          goUrl: "https://dmp-data.vip.com/ndl?tra_from=tra%3Ae1b6o3y7%3A%3A%3A%3A"
        },
        {
          name: "爱很复杂，家却可以很简单，生活好物5折起",
          url: "/static/img/recommended/hy8.png",
          goUrl:
            "https://mall.joypay.cn/cm-mall/activity/724act.do"
        },
        // {
        //   name: "夏季爆款秒杀，和包专享特价购不停",
        //   url: "/static/img/recommended/7-3.jpg",
        //   goUrl:
        //     "https://cmpay.jdcloud.com/jd/hd/13.jsp"
        // },
        // {
        //   name: "卷皮限量快抢，精选好货，每日准时秒杀开抢",
        //   url: "/static/img/recommended/7-4.jpg",
        //   goUrl:
        //     "https://union.juanpi.com/cpsfollow/call_url?utm=2176175&target=https://web.juanpi.com/html/hebaologin.html?utm=2176175&go=act"
        // },
        {
          name: "苏宁易购八月活动专场，盛夏狂欢",
          url: "/static/img/recommended/suning83.png",
          goUrl: "https://sn.51hive.com:7787/Repeater/ActApril"
        },
        // {
        //   name: "享买一赠一  赏视听好剧",
        //   url: "/static/img/recommended/4-7.png",
        //   goUrl: "https://www.cmpay.com/mkmweb/wap_produce_detail.xhtml?viewCode=html&PROD_NO=20180521145131"
        // },
        {
          name: "人气商品，低至七折，数量有限，售完为止",
          url: "/static/img/recommended/hz8.jpg",
          goUrl:
            "http://www.ylife.cn/mobile/subject.htm?subjectId=169&storeId=215"
        },
        {
          name: "超级影视VIP，九折优惠享好剧",
          url: "/static/img/recommended/tencent8.png",
          goUrl: "https://www.cmpay.com/mkmweb/wap_produce_detail.xhtml?viewCode=html&PROD_NO=20180521145131"
        },
        {
          name: "夏日养生之道，好护士为您精挑细选",
          url: "/static/img/recommended/hhs8.png",
          goUrl: "https://h5shop.hhs16.com/HebaoLogin?page=special&ID=30"
        },
        {
          name: "多喜爱夏凉新品上市，优惠大放送",
          url: "/static/img/recommended/dxa8.png",
          goUrl: "https://huadupay.com/HebaoLogin?page=special&ID=16"
        },
        {
          name: "邂逅大参林，立秋盛惠，全场满108立减10元",
          url: "/static/img/recommended/dsl8.jpg",
          goUrl: "http://enjoy.changyuelife.com/app/index.php?i=4&c=entry&m=shop&do=mobile&r=diypage&id=9056"
        },
        {
          name: "冰爽一夏，乐享暑价",
          url: "/static/img/recommended/juh8.png",
          goUrl: "http://h.umfintech.com/mallweb/h5hb/activitys/July.htm"
        },
        {
          name: "以书为礼：庆祝中国人民解放军建军91周年",
          url: "/static/img/recommended/rmrb8.jpg",
          goUrl: "https://hb.iredmall.com/HebaoLogin?page=special&ID=26"
        }
        // ,
        // {
        //   name: "爱宝贝、爱家人；爱在端午， 尖货秒杀季",
        //   url: "/static/img/recommended/4-13.png",
        //   goUrl: "https://sale.baobeigezi.com/2018/3/1/index.html"
        // }
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
      // if(Math.abs(pos.y)<20){
      //   console.log(888888)
      //   this.$emit('changeIscrollY',true)
      // }else{
      //   this.$emit('changeIscrollY',false)
      // }
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
                  this.token.productNo +
                  "&"
              )
            : url +
              "?hebaosso=true&SOURCE=DISCOVER&account=" +
              this.token.productNo;
        console.log(url2);
        window.goActivity.goWeb(url2);
      } else {
        let url_2 =
          url.indexOf("?") > 0
            ? url.replace(
                /\?/,
                "?hebaosso=true&SOURCE=DISCOVER&account=" +
                  this.token.productNo +
                  "&"
              )
            : url +
              "?hebaosso=true&SOURCE=DISCOVER&account=" +
              this.token.productNo;
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
