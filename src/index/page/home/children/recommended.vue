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
        {
          name: "3种王牌暑惠，给“盛夏狂欢”打个样",
          url: "/static/img/recommended/7-1.jpg",
          goUrl:
            "https://mall.joypay.cn/cm-mall/activity/act_july.do"
        },
        // {
        //   name: "99元任选3件，还可领20元购物红包",
        //   url: "/static/img/recommended/4-2.png",
        //   goUrl:
        //     "https://dmp-data.vip.com/ndl?tra_from=tra%3A75gpn5yd%3A%3A%3A%3A"
        // },
        // {
        //   name: "激情一夏，唯品会助力世界杯百万好物爽看球",
        //   url: "/static/img/recommended/7-2.jpg",
        //   goUrl: "https://dmp-data.vip.com/ndl?tra_from=tra%3A6viye9gn%3A%3A%3A%3A"
        // },
        {
          name: "夏季爆款秒杀，和包专享特价购不停",
          url: "/static/img/recommended/7-3.jpg",
          goUrl:
            "https://cmpay.jdcloud.com/jd/hd/13.jsp"
        },
        {
          name: "卷皮限量快抢，精选好货，每日准时秒杀开抢",
          url: "/static/img/recommended/7-4.jpg",
          goUrl:
            "https://union.juanpi.com/cpsfollow/call_url?utm=2176175&target=https://web.juanpi.com/html/hebaologin.html?utm=2176175&go=act"
        },
        {
          name: "苏宁易购七月活动专场，助您清凉一夏",
          url: "/static/img/recommended/7-5.jpg",
          goUrl: "https://sn.51hive.com:7787/Repeater/ActApril"
        },
        {
          name: "夏季出游，购精选商品，给你美美夏日",
          url: "/static/img/recommended/7-6.jpg",
          goUrl: "http://h.umfintech.com/mallweb/h5hb/activitys/July.htm"
        },
        // {
        //   name: "享买一赠一  赏视听好剧",
        //   url: "/static/img/recommended/4-7.png",
        //   goUrl: "https://www.cmpay.com/mkmweb/wap_produce_detail.xhtml?viewCode=html&PROD_NO=20180521145131"
        // },
        {
          name: "人气商品低至七折，数量有限，售完为止",
          url: "/static/img/recommended/huazhu.jpg",
          goUrl:
            "http://www.ylife.cn/mobile/subject.htm?subjectId=169&storeId=215"
        },
        {
          name: "夏日养生之道，好护士为您精挑细选",
          url: "/static/img/recommended/7-8.jpg",
          goUrl: "https://h5shop.hhs16.com/HebaoLogin?page=special&ID=27"
        },
        {
          name: "超级影视VIP，九折优惠享好剧",
          url: "/static/img/recommended/7-9.jpg",
          goUrl: "https://www.cmpay.com/mkmweb/wap_produce_detail.xhtml?viewCode=html&PROD_NO=20180521145131"
        },
        {
          name: "反季“巨划算”，家纺2折疯抢，一起打造轻奢时尚",
          url: "/static/img/recommended/7-10.jpg",
          goUrl: "https://huadupay.com/HebaoLogin?page=special&ID=15"
        },
        {
          name: "领满120减15券，为爱疯狂Go",
          url: "/static/img/recommended/7-11.jpg",
          goUrl: "http://enjoy.changyuelife.com/app/index.php?i=4&c=entry&m=shop&do=mobile&r=diypage&id=9053"
        },
        {
          name: "党建宣传新阵地，中国故事，砥砺前行",
          url: "/static/img/recommended/7-12.jpg",
          goUrl: "https://hb.iredmall.com/HebaoLogin?page=special&id=25"
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
