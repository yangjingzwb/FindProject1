<template>
  <div style="position: absolue;height:56.25rem;">
    <!-- style="position: absolue;width:100%; height:31.25rem;top:0;" -->
    <scroll
        :data = "shopList" :stopPropagation="stopPropagation" :scrollY="scrollY" @scroll="scrollListen">
         <ul class="scr">
            <li class="good" v-for="item in shopList" @click="goDetail(item.url)">
              <div class="good-i">
                <div class="t-0"><img :src="item.imgUrl"></div>
                <div class="t-1" style="-webkit-box-orient: vertical;">{{item.name}}</div>
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
      stopPropagation: false,
      shopList: [
        {
          name: "西域美农 纸皮核桃 250g*2",
          price: "35.00 ",
          url:
            "https://mall.joypay.cn/cm-mall/goods/explosionThirtyOne.do?1=1",
          imgUrl: "/static/img/heyue2/1.jpg"
        },
        {
          name: "日本SANTEN-FX参天清凉滴眼液  银色NEO12ml",
          price: "69.00 ",
          url: "https://mall.joypay.cn/cm-mall/goods/explosionThirtyTwo.do?1=1",
          imgUrl: "/static/img/heyue2/2.jpg"
        },
        {
          name: "atreus 泰国VC爽肤水",
          price: "49.00 ",
          url: "https://mall.joypay.cn/cm-mall/goods/explosionThirtyThree.do?1=1",
          imgUrl: "/static/img/heyue2/3.jpg"
        },
        {
          name: " 佳佰 强力吸壁风筒架吸盘壁挂吹风机架免打孔 电吹风置物架浴室卫生间风筒收纳架",
          price: "9.90",
          url: "https://cmpay.jdcloud.com/jd/product/sku_view.jsp?skuId=4755653&",
          imgUrl: "/static/img/jingdong2/1.jpg"
        },
        {
          name: "佳佰 陶瓷水杯情侣杯办公咖啡杯花茶杯 时尚礼物马克杯",
          price: "9.90",
          url: "https://cmpay.jdcloud.com/jd/product/sku_view.jsp?skuId=5180963&",
          imgUrl: "/static/img/jingdong2/2.jpg"
        },
        {
          name: "佳佰 纯棉毛巾 素色子母纱全棉加厚柔软吸水面巾 青色34cm*74cm/120克/条",
          price: "9.90",
          url: "https://cmpay.jdcloud.com/jd/product/sku_view.jsp?skuId=7487700&",
          imgUrl: "/static/img/jingdong2/3.jpg"
        },
        {
          name: "中粮手撕风干牛肉干内蒙古特产休闲孕妇零食小吃肉干(原味)200g",
          price: "49.00",
          url: "https://dmp-data.vip.com/ndl?tra_from=tra%3Arh8ywhv7%3A%3A%3A%3A",
          imgUrl: "/static/img/wph2/1.jpg"
        },
        {
          name: "中粮时怡每日坚果B款30包组合装750g礼盒 混合坚果仁 孕妇儿童零食",
          price: "99.00 ",
          url: "https://dmp-data.vip.com/ndl?tra_from=tra%3A5s4lv491%3A%3A%3A%3A",
          imgUrl: "/static/img/wph2/2.jpg"
        },
        {
          name: "中粮时怡每日坚果混合什锦果仁大礼包孕妇零食干果儿童成人款礼盒1020/罐",
          price: "169.00 ",
          url: "https://dmp-data.vip.com/ndl?tra_from=tra%3Ah1bbsfhv%3A%3A%3A%3A",
          imgUrl: "/static/img/wph2/3.jpg"
        },
        {
          name: "雷瓦独立浮动三刀头电动剃须VT67",
          price: "119.00",
          url: "https://h.umfintech.com/mallweb/h5hb/goodsdetail/664/8001.htm?",
          imgUrl: "/static/img/juu2/1.png"
        },
        {
          name: "乐仕菲斯厨房工具五件套RS503T",
          price: "60.00 ",
          url: "https://h.umfintech.com/mallweb/h5hb/goodsdetail/541/8001.htm?",
          imgUrl: "/static/img/juu2/2.jpg"
        },
        {
          name: "国美电吹风家用型时尚风筒 GM172",
          price: "75.00 ",
          url: "https://h.umfintech.com/mallweb/h5hb/goodsdetail/003/8011.htm?",
          imgUrl: "/static/img/juu2/3.jpg"
        },
        // {
        //   name: "先锋(Singfun）FS40-11G大风量电风扇/落地扇",
        //   price: "99.00 ",
        //   url: "https://sn.51hive.com:7787/Repeater/GoodsDetail/160000000000000102364525?state=1",
        //   imgUrl: "/static/img/suning2/1.jpg"
        // },
        {
          name: "维达（Vinda） 卷纸 超韧四层180g*10卷卫生纸",
          price: "25.90 ",
          url: "https://sn.51hive.com:7787/Repeater/GoodsDetail/160000000000000104038134?state=1",
          imgUrl: "/static/img/suning2/2.jpg"
        },
        {
          name: "蓝月亮洗衣液套餐 2kg瓶*2+1kg袋*2 超值大包装",
          price: "79.90",
          url: "https://sn.51hive.com:7787/Repeater/GoodsDetail/160000000000000189562270?state=1",
          imgUrl: "/static/img/suning2/3.jpg"
        },
        {
          name: "苏宁易购-豆本豆 原味豆奶250ml6",
          price: "18.00",
          url: "https://sn.51hive.com:7787/Repeater/GoodsDetail/160000000000000623443666?state=1",
          imgUrl: "/static/img/suning2/4.jpg"
        },
        {
          name: "颈椎牵引器治疗器",
          price: "58.00 ",
          url: "https://h5shop.hhs16.com/HebaoLogin?page=detail&id=395",
          imgUrl: "/static/img/hhs2/1.jpg"
        },
        {
          name: "陈年无烟手工艾条批发49枚",
          price: "22.80 ",
          url: "https://h5shop.hhs16.com/HebaoLogin?page=detail&id=200",
          imgUrl: "/static/img/hhs2/2.jpg"
        },
        {
          name: "可孚血压计",
          price: "108.00 ",
          url: "https://h5shop.hhs16.com/HebaoLogin?page=detail&id=427",
          imgUrl: "/static/img/hhs2/3.jpg"
        },
        // {
        //   name: "双层纯棉面巾",
        //   price: "22.80",
        //   url: "https://huadupay.com/HebaoLogin?page=detail&id=278",
        //   imgUrl: "/static/img/dxa2/1.jpg"
        // },
        // {
        //   name: "千惠荞麦枕",
        //   price: "88.00",
        //   url: "https://huadupay.com/HebaoLogin?page=detail&id=263",
        //   imgUrl: "/static/img/dxa2/2.jpg"
        // },
        // {
        //   name: "全棉夏薄被",
        //   price: "228.00",
        //   url: "https://huadupay.com/HebaoLogin?page=detail&id=225",
        //   imgUrl: "/static/img/dxa2/3.jpg"
        // },
        {
          name: "钙尔奇维生素D钙软胶囊(促销装)",
          price: "79.00",
          url: "http://enjoy.changyuelife.com/app/index.php?i=4&c=entry&m=shop&do=mobile&r=goods.detail&id=335874",
          imgUrl: "/static/img/dsl2/1.jpg"
        },
        {
          name: "气血康口服液(云南白药)",
          price: "79.00",
          url: "http://enjoy.changyuelife.com/app/index.php?i=4&c=entry&m=shop&do=mobile&r=goods.detail&id=336518",
          imgUrl: "/static/img/dsl2/2.jpg"
        },
        {
          name: "舒适达专业修复牙膏",
          price: "39.00",
          url: "http://enjoy.changyuelife.com/app/index.php?i=4&c=entry&m=shop&do=mobile&r=goods.detail&id=336891",
          imgUrl: "/static/img/dsl2/3.jpg"
        },
        {
          name: "公牛 全球通用旅行插座转换器（有USB）",
          price: "70.00",
          url: "http://www.ylife.cn/mobile/item/12369.html?storeId=215",
          imgUrl: "/static/img/huazhu2/1.jpg"
        },
        {
          name: "拉芳 商旅洗护便携套装（柔顺系列）",
          price: "30.00",
          url: "http://www.ylife.cn/mobile/item/12725.html?storeId=215",
          imgUrl: "/static/img/huazhu2/2.jpg"
        },
        {
          name: "大润窑 休闲牛奶杯（酒店推荐）",
          price: "15.00",
          url: "http://www.ylife.cn/mobile/item/12061.html?storeId=215",
          imgUrl: "/static/img/huazhu2/3.jpg"
        },
        {
          name: "腾讯视频超级影视VIP月卡",
          price: "27.00",
          url: "https://www.cmpay.com/mkmweb/wap_produce_detail.xhtml?viewCode=html&PROD_NO=20180521145131",
          imgUrl: "/static/img/tencet/1.jpg"
        },
        {
          name: "腾讯视频超级影视VIP季卡",
          price: "76.50",
          url: "https://www.cmpay.com/mkmweb/wap_produce_detail.xhtml?viewCode=html&PROD_NO=20180521150919",
          imgUrl: "/static/img/tencet/1.jpg"
        },
        {
          name: "腾讯视频超级影视VIP年卡",
          price: "297.00",
          url: "https://www.cmpay.com/mkmweb/wap_produce_detail.xhtml?viewCode=html&PROD_NO=20180521151310",
          imgUrl: "/static/img/tencet/1.jpg"
        },
        // {
        //   name: "习近平用典 （第二辑）",
        //   price: "49.00",
        //   url: "https://hb.iredmall.com/HebaoLogin?page=detail&id=473",
        //   imgUrl: "/static/img/rmrb/1.jpg"
        // },
        // {
        //   name: "不忘初心 牢记使命：党的十九大精神党员学习工作笔记",
        //   price: "29.00",
        //   url: "https://hb.iredmall.com/HebaoLogin?page=detail&id=461",
        //   imgUrl: "/static/img/rmrb/2.jpg"
        // },
        // {
        //   name: " “中国梦·中国道路”丛书",
        //   price: "280.00",
        //   url: "https://hb.iredmall.com/HebaoLogin?page=detail&id=446",
        //   imgUrl: "/static/img/rmrb/3.jpg"
        // }
        // {
        //   name: "乳胶慢回弹记忆枕",
        //   price: "37.00",
        //   url: "https://web.juanpi.com/html/hebaologin.html?utm=2176175&go=84114345&",
        //   imgUrl: "/static/img/juanpi2/1.jpg"
        // },
        // {
        //   name: "夏装时尚休闲两件套女",
        //   price: "39.90",
        //   url: "https://web.juanpi.com/html/hebaologin.html?utm=2176175&go=85431727&",
        //   imgUrl: "/static/img/juanpi2/2.jpg"
        // },
        // {
        //   name: "夏装韩版时尚两件套女",
        //   price: "39.90",
        //   url: "https://web.juanpi.com/html/hebaologin.html?utm=2176175&go=82231887&",
        //   imgUrl: "/static/img/juanpi2/3.jpg"
        // }
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
    ...mapState(["token"])
  },

  mounted() {},
  created() {
    this.shopList = this.shopList.sort(() => {
      return Math.random() > 0.5 ? -1 : 1;
    });
  },

  components: {
    Scroll
  },

  // computed: {},

  methods: {
    scrollListen(pos) {
      console.log("goodThing");
      console.log(pos);
      // if(Math.abs(pos.y)<5){
      //   this.$emit('changeIscrollY',true)
      // }else{
      //   this.$emit('changeIscrollY',false)
      // }
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
            ? url.replace(
                /\?/,
                "?hebaosso=true&SOURCE=DISCOVER&HEADER_FLG=1&account=" +
                  this.token.productNo +
                  "&"
              )
            : url +
              "?hebaosso=true&SOURCE=DISCOVER&HEADER_FLG=1&account=" +
              this.token.productNo;
        console.log(url2);
        window.goActivity.goWeb(url2);
      } else {
        let url_2 =
          url.indexOf("?") > 0
            ? url.replace(
                /\?/,
                "?hebaosso=true&SOURCE=DISCOVER&HEADER_FLG=1&account=" +
                  this.token.productNo +
                  "&"
              )
            : url +
              "?hebaosso=true&SOURCE=DISCOVER&HEADER_FLG=1&account=" +
              this.token.productNo;
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
  padding-top: 0.5625rem;
  width: 33%;
  align-content: space-around;
}
.good-i {
  // width: 90%;
  margin-left: 0.4375rem;
  padding: 0.9375rem;
  border: 0.0625rem solid #e6e6e6;
  border-radius: 0.3125rem;
}
div.good-i {
  // margin-right:.4375rem;
}

.good:nth-of-type(3n + 3) .good-i {
  margin-right: 0.4375rem;
}
.t-0 {
  width: 100%;
  img {
    display: block;
    width: 100%;
    border-radius: 0.125rem;
    height: 5.4375rem;
    overflow: hidden;
    // padding: .625rem;
  }
}
.t-1 {
  white-space: normal!important;
  font-family: "PingFangSC-Regular";
  font-size: .75rem;
  margin: .5rem 0;
  overflow: hidden;
  display: -webkit-box;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  color: #333;
  
  line-height: 1.3;
}
.t-2 {
  font-family: "PingFangSC-Medium";
  font-size: 0.75rem;
  color: #e31b30;
  letter-spacing: -0.00625rem;
  line-height: 0.75rem;
  padding: 0.5rem 0rem;
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
