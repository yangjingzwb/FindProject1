<template>
  <div style="position: absolue;height:56.25rem;">
    <!-- style="position: absolue;width:100%; height:31.25rem;top:0;" -->
    <scroll
        :data = "shopList" :stopPropagation="stopPropagation" :scrollY="scrollY" @scroll="scrollListen">
         <ul class="scr">
            <li class="good" v-for="item in shopList" @click="goDetail(item.url)">
              <div class="good-i">
                <div class="t-0"><img :src="item.imgUrl"></div>
                <div class="t-1">{{item.name}}</div>
                <div class="t-2">¥{{item.price}}</div>
              </div>
            </li>
            
            
        </ul>
         <!-- <ul class="scr">
            <li class="good">
              <div class="good-i">
                <div class="t-0"><img src="/static/img/1-17.png"></div>
                <div class="t-1">上班经常饿</div>
                <div class="t-2">¥1.1</div>
              </div>
            </li>
            <li class="good">
              <div class="good-i">
                <div class="t-0"><img src="/static/img/1-17.png"></div>
                <div class="t-1">上班经常饿</div>
                <div class="t-2">¥1.1</div>
              </div>
            </li>
            <li class="good">
              <div class="good-i">
                <div class="t-0"><img src="/static/img/1-17.png"></div>
                <div class="t-1">上班经常饿</div>
                <div class="t-2">¥1.1</div>
              </div>
            </li>
        </ul>
         <ul class="scr">
            <li class="good">
              <div class="good-i">
                <div class="t-0"><img src="/static/img/1-17.png"></div>
                <div class="t-1">上班经常饿</div>
                <div class="t-2">¥1.1</div>
              </div>
            </li>
            <li class="good">
              <div class="good-i">
                <div class="t-0"><img src="/static/img/1-17.png"></div>
                <div class="t-1">上班经常饿</div>
                <div class="t-2">¥1.1</div>
              </div>
            </li>
            <li class="good">
              <div class="good-i">
                <div class="t-0"><img src="/static/img/1-17.png"></div>
                <div class="t-1">上班经常饿</div>
                <div class="t-2">¥1.1</div>
              </div>
            </li>
        </ul> -->
         <div class="null">————&nbsp;&nbsp;亲，我是有底线的&nbsp;&nbsp;————</div>
    </scroll>
</div>
</template>

<script>
import { GetDistance } from "@@/service/util";
import Scroll from "@@/components/scroll/scroll.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      stopPropagation:false,
       shopList: [
        {
          name: "慕纯24卷纸",
          price: "45",
          url: "https://mall.joypay.cn/cm-mall/goods/explosionFive.do?1=1",
          imgUrl: "/static/img/heyue/1.jpg"
        },
        {
          name: "双人休闲帐篷",
          price: "79",
          url: "https://mall.joypay.cn/cm-mall/goods/explosionEight.do?1=1",
          imgUrl: "/static/img/heyue/2.jpg"
        },
        {
          name: "Cmon遮阳伞",
          price: "50",
          url: "https://mall.joypay.cn/cm-mall/goods/explosionNine.do?1=1",
          imgUrl: "/static/img/heyue/3.jpg"
        },
        {
          name: "本色卫生纸",
          price: "14.9",
          url:
            "https://union.juanpi.com/cpsfollow/call_url?utm=2176175&target=https://web.juanpi.com/html/hebaologin.html?utm=2176175&go=75363918",
          imgUrl: "/static/img/juanzhi/1.png"
        },
        {
          name: "玻尿酸面膜",
          price: "19.9",
          url:
            "https://union.juanpi.com/cpsfollow/call_url?utm=2176175&target=https://web.juanpi.com/html/hebaologin.html?utm=2176175&go=63630555",
          imgUrl: "/static/img/juanzhi/2.png"
        },
        {
          name: "电动剃须刀",
          price: "119",
          url: "https://h.umfintech.com/mallweb/h5hb/goodsdetail/664/8001.htm?",
          imgUrl: "/static/img/u/1.png"
        },
        {
          name: "真空保温杯",
          price: "79",
          url: "https://h.umfintech.com/mallweb/h5hb/goodsdetail/329/8001.htm?",
          imgUrl: "/static/img/u/2.png"
        },
        {
          name: "原木金抽纸",
          price: "66",
          url: "https://h.umfintech.com/mallweb/h5hb/goodsdetail/041/8005.htm?",
          imgUrl: "/static/img/u/3.png"
        },
        {
          name: "手撕牛肉干",
          price: "79",
          url:
            "https://dmp-data.vip.com/ndl?tra_from=tra%3A6eo6kpcf%3A%3A%3A%3A",
          imgUrl: "/static/img/wp/1.png"
        },
        {
          name: "综合果仁",
          price: "80",
          url:
            "https://dmp-data.vip.com/ndl?tra_from=tra%3A3oav53zg%3A%3A%3A%3A",
          imgUrl: "/static/img/wp/2.jpg"
        },
        {
          name: "混合坚果仁",
          price: "148",
          url:
            "https://dmp-data.vip.com/ndl?tra_from=tra%3A7v1wd0kz%3A%3A%3A%3A",
          imgUrl: "/static/img/wp/3.jpg"
        },
        {
          name: "进口啤酒",
          price: "108",
          url: "https://app.kuaitong.com/jd/product/sku_view.jsp?skuId=1278901",
          imgUrl: "/static/img/jd/1.jpg"
        },
        {
          name: "奥利奥饼干",
          price: " 32.25 ",
          url: "https://app.kuaitong.com/jd/product/sku_view.jsp?skuId=6119586",
          imgUrl: "/static/img/jd/2.jpg"
        },
        {
          name: "饮用天然水",
          price: " 95.00 ",
          url: "https://app.kuaitong.com/jd/product/sku_view.jsp?skuId=1359359",
          imgUrl: "/static/img/jd/3.jpg"
        },
        {
          name: "创盈多维片",
          price: "79",
          url:
            "http://enjoy.changyuelife.com/app/index.php?i=4&c=entry&m=shop&do=mobile&r=goods.detail&id=335759",
          imgUrl: "/static/img/dsl/1.jpg"
        },
        {
          name: "维生素片",
          price: "118",
          url:
            "http://enjoy.changyuelife.com/app/index.php?i=4&c=entry&m=shop&do=mobile&r=goods.detail&id=336361",
          imgUrl: "/static/img/dsl/2.jpg"
        },
        {
          name: "IQIYI半年卡",
          price: "75.6",
          url:
            "https://www.cmpay.com/mkmweb/wap_produce_detail.xhtml?viewCode=html&PROD_NO=88110003",
          imgUrl: "/static/img/aqy/1.jpg"
        },
        {
          name: "IQIYI月卡",
          price: "14",
          url:
            "https://www.cmpay.com/mkmweb/wap_produce_detail.xhtml?viewCode=html&PROD_NO=20160401004618&HEADER_FLG=1",
          imgUrl: "/static/img/aqy/2.jpg"
        },
        {
          name: "血压计值套餐",
          price: "228",
          url: "https://h5shop.hhs16.com/index.html#/detail?id=420",
          imgUrl: "/static/img/hhs/2.jpg"
        },
        {
          name: "颈椎牵引器",
          price: "68",
          url: "https://h5shop.hhs16.com/index.html#/detail?id=398",
          imgUrl: "/static/img/hhs/1.jpg"
        },
        {
          name: "牛角刮痧板",
          price: "42.8",
          url: "https://h5shop.hhs16.com/index.html#/detail?id=320",
          imgUrl: "/static/img/hhs/3.jpg"
        },
        {
          name: "全涤套件",
          price: "238",
          url: "https://huadupay.com/index.html#/detail?id=256",
          imgUrl: "/static/img/dxa/1.jpg"
        },
        {
          name: "舒适腰枕",
          price: "99",
          url: "https://huadupay.com/index.html#/detail?id=213",
          imgUrl: "/static/img/dxa/2.jpg"
        },
        {
          name: "纯棉T恤",
          price: "39",
          url: "https://huadupay.com/index.html#/detail?id=186",
          imgUrl: "/static/img/dxa/3.jpg"
        },
        {
          name: "柔软舒适枕",
          price: "35",
          url: "http://www.ylife.cn/mobile/item/12075.html?storeId=215",
          imgUrl: "/static/img/hz/1.jpg"
        },
        {
          name: "柔软面巾",
          price: "48",
          url: "http://www.ylife.cn/mobile/item/12381.html?storeId=215",
          imgUrl: "/static/img/hz/2.jpg"
        },
        {
          name: "收纳箱",
          price: "80",
          url: "http://www.ylife.cn/mobile/item/12301.html?storeId=215",
          imgUrl: "/static/img/hz/3.jpg"
        },
        {
          name: "洁柔卫生纸",
          price: "35.90 ",
          url:
            "https://sn.51hive.com:7787/Repeater/GoodsDetail/160000000000000157314718?account=18627806792",
          imgUrl: "/static/img/sn/1.png"
        },
        {
          name: "洗衣液套餐",
          price: "79.90 ",
          url:
            "https://sn.51hive.com:7787/Repeater/GoodsDetail/160000000000000189562270?account=18627806792",
          imgUrl: "/static/img/sn/2.png"
        },
        {
          name: "珍珠香米",
          price: "29.60 ",
          url:
            "https://sn.51hive.com:7787/Repeater/GoodsDetail/160000000000000153059121?account=18627806792",
          imgUrl: "/static/img/sn/3.png"
        }
      ]
      //   defaultIcon: 'this.src="' + "/static/img/error.png" + '"'
    };
  },
  props: {
    scrollY: {
      type: Boolean,
      default: false
    }
  },
  computed: {
     ...mapState([
      "token"
    ])
  },

  mounted() {},
  created() {
    this.shopList = this.shopList.sort(()=>{
      return Math.random() > 0.5 ? -1 : 1;
    })
  },

  components: {
    Scroll
  },

  // computed: {},

  methods: {
    scrollListen(pos) {
      console.log('goodThing')
      console.log(pos)
      // if(Math.abs(pos.y)>320){
      //   this.OPENANDCLOSE(false)
      //   this.topCat = true;
      // }else{
      //   this.topCat = false;
      //   this.OPENANDCLOSE(true)
      // }
    },
    goDetail(url) {
      // alert(url)
      if (
        (/iP(ad|hone|od)/.test(navigator.userAgent) ? "ios" : "android") ==
        "android"
      ) {
          let url2 =
            url.indexOf("?") > 0
              ? url.replace(/\?/, "?hebaosso=true&SOURCE=DISCOVER&account="+this.token.phone+"&")
              : url + "?hebaosso=true&SOURCE=DISCOVER&account="+this.token.phone;
          console.log(url2);
          window.goActivity.goWeb(url2);
       
      } else {
          let url_2 =
            url.indexOf("?") > 0
              ? url.replace(/\?/, "?hebaosso=true&SOURCE=DISCOVER&account="+this.token.phone+"&")
              : url + "?hebaosso=true&SOURCE=DISCOVER&account="+this.token.phone;
          window.location = "activity://goWeb?url=" + url_2;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";

.scr {
  display: -webkit-flex;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap; /* Safari 6.1+ */
  width: 100%;
}
.good {
  // margin: 0 1.25rem;
  // flex: 1;
  padding-top: .5625rem;
  width: 33%;
  align-content: space-around;
}
.good-i {
  // width: 90%;
  margin-left: .4375rem;
  padding: .9375rem;
  border: .0625rem solid #e6e6e6;
  border-radius: .3125rem;
}
div.good-i {
  // margin-right:.4375rem;
}

.good:nth-of-type(3n+3) .good-i {
  margin-right: .4375rem;
}
.t-0 {
  width: 100%;
  img {
    display: block;
    width: 100%;
    border-radius: .125rem;
    height: 5.4375rem;
    overflow: hidden;
    // padding: .625rem;
  }
}
.t-1 {
  font-family: PingFangSC-Regular;
  font-size: .75rem;
  color: #13252e;
  letter-spacing: -.003125rem;
  line-height: .75rem;

  // padding-bottom: 1.25rem;
  // padding-top: .5rem;
  text-align: center;
  padding: .5rem 0rem;
}
.t-2 {
  font-family: PingFangSC-Medium;
  font-size: .75rem;
  color: #e31b30;
  letter-spacing: -.00625rem;
  line-height: .75rem;
  padding: .5rem 0rem;
}
.null {
  height: 12rem;
  padding-top: 1.2rem;
  font-size: 0.6875rem;
  color: #afadadc4;
}
// .list-wrapper{
//   margin-right: .4375rem;
// }
</style>
