<template>
  <div class="content-wrapper">
    <header class="s_1">
      <ul>
        <router-link tag="li" class="l t" to="/home1"></router-link>
        <li class="l">
            <span>商家信息</span>
        </li>
      </ul>
      <div class="hr-1"></div>
    </header>

    <article>
      <!--商家详情-->
      <scroll
        :scrollY = "scrollYOther"
        :scrollbar ='tabScrollbar'
        :pullDownRefresh ='pullDownRefresh'
        :refreshNow = 'refreshNow'
        :pullUpLoad= "pullUpLoad_near"
        >
      <section class="s_2">
        <div class="seller">
          <ul>
            <li class="left">
              <div class="seller-name">{{data.mercAbbr}}</div>
              <div class="seller-time">营业时间: 9:00-22:00{{data.businessHour}}</div>
            </li>
            <li class="right">
              <button class="go-buy-btn" @click="payKHD()">去买单</button>
            </li>
            <li class="hr-2"></li>
          </ul>
        </div>
        <div class="address">
          <div class="address-info">
            <div class="left" @click="jumpMap()">
              <img src="/static/img/seller_address_icon.png"/>
              <a>{{data.busAddr}}</a>
            </div>
            <div class="right">
              <a href="tel:18774882955"><img src="/static/img/seller_phone_button.png"/></a>
            </div>
            <div class="hr-2"></div>
          </div>

          <div class="address-info" @click="usableEta()">
            <div class="left">
              <img src="/static/img/seller_voucher_icon.png"/>
              <a>支持本店消费的和包券</a>
            </div>
            <div class="right">
              <img class="special" src="/static/img/more_button.png"/>
            </div>
          </div>
        </div>
      </section>
      <div class="nullHeight"></div>
      <section class="s_3">
        <div class="title">
          <p>商铺优惠券</p>
          <div class="hr-2"></div>
        </div>
        <div class="seller-coupon">
          <ul v-for="(item,index) in data">
            <li class="left">
              <div class="c1">
                <span>¥ <i class="par">20</i></span>
              </div>
            </li>
            <li class="middle">
              <div class="c1">
                <span class="m">满50元使用</span>
                <span  class="sl">可叠加</span>
              </div>
              <div class="c2">
                <span class="b" >有效期至：2018-10-31</span>
              </div>
            </li>
            <li class="right">
              <div class="c1">
                <button class="r" @click="receiveCoupon(item)">立即领取</button>
                <button class="r" @click="goDetail($event,item,6)">查看详情</button>
              </div>
              <div class="c3">
                <div class="bgIcon"></div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      <div class="nullHeight"></div>
      <section class="s_4">
        <div class="title">
          <p>优惠活动</p>
          <div class="hr-2"></div>
        </div>
        <div class="address" v-for="(item, index) of data.rec">
          <div class="address-info" @click="jumpInfo(this)">
            <div class="left">
              <span class="list-flg">满减</span>
              <span class="activity">和包风暴折减活动: {{item.GME_NM}}</span>
            </div>
            <div class="right">
              <img class="special" src="/static/img/more_button.png"/>
            </div>
          </div>
        </div>
      </section>
      <div class="nullHeight"></div>
      <section class="s_5">
        <div class="title">
            <p>商家简介</p>
             <div class="hr-2"></div>
        </div>
        <div class="seller-info">
          <div>预包装食品、乳制品、熟食、粮油、烟草制品、广告制作服务{{data.mercBriefDesc}}</div>
        </div>
      </section>
      <div class="nullHeight"></div>
      </scroll>
    </article>
  </div>
</template>

<script>
import {
  fetchPoints,
  AppFlag
} from "@@/service/util";
import { mapState, mapMutations } from "vuex";
import Scroll from "@@/components/scroll/scroll.vue";
import axios from "@@/plugins/rsa/axios";
import sa from'sa-sdk-javascript';
export default {
  data() {
    return {
      data: [{}],
      tabScrollbar: false,
      scrollYOther: true,
      startY: 0,
      threshold: 0.2,
      refreshNow:true,
      pullUpLoad: false,
      pullUpLoad_near: true,
      pullDownRefresh: {
        threshold: 120,
        stop: 60
      }
    };
  },
  props: {

  },
  computed: {
    ...mapState(["token"])
  },

  mounted() {
    this.init();
    // 隐藏进度条
    document.getElementById("pg").style.display="none";
  },
  created() {},
  components: {
    Scroll
  },
  methods: {
    init() {
      let params = this.$route.query.params;
      // console.log(参数接收,params);
      axios.post("getShopInfoDetail", params).then(res => {
          if (res.code === "0") {
            this.data = res.data;
            console.log(this.data);
          }
      });
    },
    payKHD() {
      event.stopPropagation();
      // 客户端 跳转链接
      if (AppFlag() === '1') {
          window.location.href = "activity://GTF";
      } else if (AppFlag() === '0' && typeof(goActivity) !== 'undefined' && typeof(goActivity.goTopSpeed) === 'function') {
          window.goActivity.goTopSpeed();
      }
    },
    usableEta(obj) {
      window.location.href = "/mkmweb/query_nearmerc_bon.xhtml" + '?ACTID=arrondMerc&MERC_ID=' + this.merc_id + '&showtitle=false';
    },
    jumpMap(){
      let sName = '', // 出发地名
          dName = '', // 目的地名
          city = '',  // 城市
          LONGITUDE = this.longitude, // 出发地经度
          LATITUDE = this.latitude, // 出发地纬度
          MERC_LONGITUDE = this.LONGITUDE, // 目的地经度
          MERC_LATITUDE = this.LATITUDE; // 目的地纬度
      let BUS_ADDR = "长沙市湘江中路" || item.busAddr;
      // 客户端 跳转链接  安卓 0  苹果 1
      console.log(LONGITUDE,MERC_LONGITUDE,MERC_LATITUDE,BUS_ADDR)
      if (AppFlag() === '1' && typeof(CmpOpenMapLocation) !== 'undefined' && typeof(CmpOpenMapLocation) === 'function') {
          CmpOpenMapLocation(sName, dName, LATITUDE, LONGITUDE, MERC_LATITUDE, MERC_LONGITUDE);
      } else if (AppFlag() === '0' && typeof(goActivity) !== 'undefined' && typeof(goActivity.openNavigation) === 'function') {
          window.goActivity.openNavigation('', LATITUDE, LONGITUDE, BUS_ADDR, MERC_LATITUDE, MERC_LONGITUDE, city);
      } else {
          // 非客户端 
      }
    },
    jumpInfo(obj) {
      let params = {
        gmeId: "18092605",
        latitude: this.latitude,
        longitude: this.longitude,
        mbl_no: this.token.productNo,
        merc_id: obj.MERC_ID,
        session: this.token.session.replace(/\+/g, "%2B"),
        merc_latitude: obj.LATITUDE,
        merc_longitude: obj.LONGITUDE
      };
      console.log(params);
      this.$router.push({
        path: "/hebaoInfo",
        query: {
            params: params
          }
      });
      // 神策
      sa.track('buttonClick', {
        topCategory: '发现',
        subCategory: '商户满减活动'
      });
      fetchPoints(
        "010000000000", // 页面索引
        "010000000000K07", //事件标记
        this.token.productNo,
        "和包满减活动", // 事件名称
        this.token.session.replace(/\+/g, "%2B")
      )
    },
    filterObj(obj) {
      for (let i = 0; i < obj.length; i++) {
        if (obj[i].PIC_URL_1) {
          obj[i].PIC_URL_1 = this.baseImg + obj[i].PIC_URL_1;
        }
      }
      return obj;
    },
  },
  
  activated(){
    console.log(2323)
    // alert()
    this.refreshNow = !this.refreshNow
  },
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";

.content-wrapper {
  background: #F6F7F8;
  z-index: 99999;
}
.s_1 {
  @include wh(100%, 3rem);
  background: #ffffff;
  position: sticky;
  z-index: 100000000;
  top: 0;
  left: 0;
  .l {
    height: 100%;
    line-height: 3rem;
    font-size: 1.125rem;
    font-family: PingFangSC-Regular;
    color: #13252e;
    padding-right: 3.5rem;
    text-align: center;
  }
  .t {
    color: #6c6c6c;
    font-size: 0.9375rem;
    height: 3rem;
    position: relative;
    float: left;
    text-align: left;
    background-image: url(/static/img/back.png);
    background-repeat: no-repeat;
    background-position: 0.375rem 50%;
    background-size: 1.1rem;
    // padding-right: 0.6rem;
    @include space();
  }
}
.s_2,.s_3,.s_4,.s_5 {
  padding: 0 0.9375rem;
  background: #fff;
}
ul {
  height: 100%;
  position: relative;
}
.seller {
  height: 5.3125rem;
  .left {
    float: left;
    height: 100%;
    padding: 1.25rem 0 1.25rem 0;
    .seller-name {
      font-family: PingFangSC-Semibold;
      font-size: 1rem;
      font-weight: bold;
      color: #13252e;
      line-height: 1.25rem;
      padding-bottom: 0.625rem;
    }
    .seller-time {
      font-family: PingFangSC-Regular;
      font-size: 0.8125rem;
      color: #7e7e7e;
      line-height: 0.9375rem;
    }
  }
  .right {
    float: left;
    width: 4.5625rem;
    height: 1.875rem;
  }
  button {
    position: absolute;
    top: 1.5625rem;
    right: 0;
    width: 4.5625rem;
    height: 1.875rem;
    background-image: linear-gradient(90deg, #E93357 0%, #F55B97 100%);
    border-radius: 0.9375rem;
    font-family: PingFangSC-Regular;
    font-size: 0.75rem;
    color: #fff;
    text-align: center;
    line-height: 0.75rem;
  }
}
.address {
  .address-info {
    position: relative;
    height: 2.8125rem;
    .left {
      height: 100%;
      position: relative;
      img {
        width: 1.375rem;
        height: 1.375rem;
        position: absolute;
        top: .7rem;
      }
      a {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        padding-left: 2rem;
        color: #13252e;
        line-height: 2.8125rem;
      }
      .activity {
        font-family: PingFangSC-Regular;
        font-size: 0.875rem;
        padding-left: 0.25rem;
        color: #13252e;
        line-height: 2.8125rem;
      }
      .list-flg {
        font-family: PingFangSC-Regular;
        font-size: 0.75rem;
        margin-left: 0.3125rem;
        padding: 0 0.2rem;
        color: #e11a2f;
        background-color: #fff0f1;
        border: 0.0063rem solid #e11a2f;
        border-radius: 0.125rem;
      }
    }
    .right {
      width: 1.5rem;
      height: 100%;
      position: relative;
      img {
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        top: .6rem;
      }
      .special {
        position: absolute;
        top: .85rem;
        right: 0;
        width: 0.9375rem;
        height: 0.9375rem;
      }
    }
  }
}
.seller-coupon {
  margin: 0.9375rem auto;
  ul {
    height: 5rem;
    position: relative;
    background: #fff3F4;
    border: 0.0625rem solid #f992bb;
    box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.1);
    border-radius: 0.1875rem;
  }
  ul:nth-last-child(1)::after {
    height: 0 !important;
  }
  .left {
    width: 5rem;
    height: 100%;
    float: left;
    text-align: left;
    .c1 {
      padding-left: 0.625rem;
      line-height: 4.5rem;
      color: #ed196c;
      font-weight: bold;
      font-size: 1rem;
      .par {
        font-size: 1.875rem;
        font-family: PingFangSC-Semibold;
      }
    }
  }
  .middle {
    height: 100%;
    float: left;
    padding-top: 0.9375rem;
    text-align: left;
    color: #13252e;
    font-family: PingFangSC-Regular;
    .c1 {
      height: 1.4375rem;
      .m {
        font-size: 0.875rem;
      }
      .sl {
        font-size: 0.75rem;
        margin-left: 0.3125rem;
        padding: 0 0.2rem;
        color: #e11a2f;
        background-color: #fff0f1;
      }
    }
    .c2 {
      .b {
        font-size: 0.6875rem;
        color: #7e7e7e;
      }
    }
  }
  .right {
    width: 6.4375rem;
    height: 100%;
    text-align: left;
    position: relative;
    padding-top: 1.5625rem;
    padding-left: 1rem;
    padding-right: 0.625rem;
    .c1 {
      width: 4.5625rem;
      height: 1.875rem;
      border-radius: 0.9375rem;
      color: #fff;
      position: relative;
      z-index: 99;
      .r {
        width: 4.5625rem;
        background-image: linear-gradient(90deg, #e93357 0%, #f55b97 100%);
        font-size: 0.75rem;
        font-family: PingFangSC-Regular;
        color: #fff;
        text-align: center;
        line-height: 1.875rem;
      }
    }
    .c2 {
      .l {
        padding-top: 0.375rem;
        padding-left: 1rem;
        font-size: 0.625rem;
        font-family: PingFangSC-Regular;
        color: #7e7e7e;
      }
    }
    .c3 {
      width: 3.75rem;
      height: 3.4375rem;
      position: absolute;
      top: 0;
      right: 0;
      .bgIcon {
        width: 100%;
        height: 100%;
        background: url(/static/img/receive.png) no-repeat 100% 0;
        background-size: 3.75rem 3.4375rem;
        z-index: 9;
      }
    }
  }
}
.title {
  position: relative;
  height: 2.5rem;
  font-family: PingFangSC-Regular;
  font-size: 0.875rem;
  color: #13252e;
  line-height: 2.5rem;
}
.seller-info {
  font-family: PingFangSC-Regular;
  font-size: 0.875rem;
  color: #13252e;
  padding: 1.0625rem 0 1.0625rem 0;
  line-height: 0.9375rem;
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
.hr-2 {
  display: block;
  position: absolute;
  height: 0.0625rem;
  float: left;
  width: 100%;
  bottom: 0;
  background-color: #e6e6e6;
  -webkit-transform-origin: 0, 0;
  -ms-transform-origin: 0, 0;
  transform-origin: 0, 0;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>
