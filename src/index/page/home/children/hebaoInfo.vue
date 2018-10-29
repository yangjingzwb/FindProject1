<template>
  <div class="content-wrapper">
    <header class="s_1">
      <ul>
        <router-link tag="li" class="l t" to="/shopDetail"></router-link>
        <li class="l">
            <span>活动规则详情</span>
        </li>
      </ul>
      <div class="hr-1"></div>
    </header>
    <section class="s_4">
      <div class="title">
        <p>{{data.gmeNm}}</p>
        <div class="hr-2"></div>
      </div>
      <div class="content">
        <div class="content-info" @click="jumpInfo(this)">
          <div class="list-info">活动时间：{{data.effDt}}到{{data.expDt}}</div>
          <div class="list-info">参与时间：09:00到23:59</div>
          <div class="list-info" v-for="(item,index) in data.provRec">活动省份：{{item.provNm}}</div>
          <div class="list-info">参与用户范围：客户端新老用户</div>
          <div class="list-info">
            <span class="left">参与条件：</span>
            <ul class="right">
              <li>1. 中国移动用户</li>
              <li>2. 用户已绑定银行卡</li>
            </ul>
          </div>
          <div class="list-info">活动方式：满减</div>
          <table class="deal-menu" v-for="(item,index) in data.gmeRec">
            <tbody>
              <tr>
                  <th class="name">订单金额区间（元）</th>
                  <th class="price">满减</th>
                  <th class="amount">最高享受</th>
              </tr>
              <tr>
                  <td class="price">{{item.ruleAmtMin}}-{{item.ruleAmtMax}}</td>
                  <td class="amount"> 随机立减</td>
                  <td class="subtotal">{{item.drawAmtMax}}</td>
              </tr>
            </tbody>
          </table>
          <div class="list-info">注：活动具体规则由开展方制定，参与方式详询活动开展方</div>
        </div>
      </div>
    </section>
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
import axios from "@@/plugins/rsa/axios";
export default {
  data() {
    return {
      data: {}
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

  methods: {
    init() {
      let params = this.$route.query.params;
      // console.log(参数接收,params);
      axios.post("getRecInfoDetail", params).then(res => {
          if (res.code === "0") {
            this.data = res.data;
            console.log(this.data);
          }
      });
    },
    filterObj(obj) {
      for (let i = 0; i < obj.length; i++) {
        if (obj[i].PIC_URL_1) {
          obj[i].PIC_URL_1 = this.baseImg + obj[i].PIC_URL_1;
        }
      }
      return obj;
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";

.s_1 {
  @include wh(100%, 3rem);
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
.s_2,.s_3,.s_4 {
  padding: 0 0.9375rem;
  background: #fff;
}
ul {
  height: 100%;
  position: relative;
}
.content {
  .content-info {
    position: relative;
    padding-top: .5rem;
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
      .list-info {
        font-family: PingFangSC-Regular;
        font-size: 0.8125rem;
        color: #7e7e7e;
        line-height: 1.75rem;
        .left {
          float: left;
        }
        .right {
          float: left;
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
  font-size: 0.9375rem;
  color: #13252e;
  line-height: 2.5rem;
}
table{
    font-size: 0.8125rem;
    color: #888;
    border: 0.0625rem solid #888;
    margin: 0.3rem 0 0.3rem 0;
    text-align: center;
    border-collapse:collapse;
}
th, td{
    padding:0 0.5rem;
    border: 0.0625rem solid #888;
}
.deal-menu th{
    line-height: 2rem;
    font-weight: 400;
}
.deal-menu td{
    line-height: 2rem;
    font-weight: 400;
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
