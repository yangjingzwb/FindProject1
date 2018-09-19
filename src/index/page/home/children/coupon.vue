<template>
  <div>
    <div class="nullHeight"></div>
    <ul v-for="(item,index) in couponList">
        <li class="left">
          <div class="c1">
            <span>¥ <i class="par">{{item.ISS_BILL_AMT}}</i></span>
          </div>
        </li>
        <li class="middle">
          <div class="c1">
            <span class="l">{{item.MKT_NM}}</span>
          </div>
          <div class="c2">
            <span class="m">满50元使用</span>
            <span  class="sl">可叠加</span>
          </div>
          <div class="c3">
            <span class="b" >每日可领用一张{{item.RECEIVE_RULES}}</span>
          </div>
        </li>
        <li class="right">
          <div class="c1">
            <div class="r"v-if="item.show" @click="receiveCoupon(item)">立即领取</div>
            <!-- <div class="r" v-else @click="goDetail($event,item,5)">去消费</div> -->
            <div class="r" v-else @click="goShop(item)">去消费</div>
          </div>
          <div class="c2">
            <div class="l" v-show="item.isLook" @click="goDetail($event,item,6)">查看详情</div>
          </div>
        </li>
    </ul>
    <alert-tip 
      v-if="showAlert" 
      :alertText="alertText"
      @closeTip="showAlert = false">
    </alert-tip>
    <!-- <ul v-if = "!couponList || couponList.length<=0 ">
      <li class="aa">加载中···</li>
    </ul> -->
    <div class="nullHeight2"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { fetchPoints, GetDistance } from "@@/service/util";
import axios from "@@/plugins/rsa/axios";
import Scroll from "@@/components/scroll/scroll.vue";
import AlertTip from "@@/components/common/alertTip";
import sa from'sa-sdk-javascript';
export default {
  data() {
    return {
      showAlert: false,
      isCoupon: [],
      shopLists: [],
      alertText: '',
      isLook: false,
      show: true
    };
  },
  props: {
    couponList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
    ...mapState(["token"])
  },

  mounted() {},
  created() {},

  components: {
    Scroll,
    AlertTip
  },
  methods: {
    // 领取优惠券
    receiveCoupon(data) {
      console.log(data);
      let param_ = {
        "mbl_no"  : this.token.productNo,                   //用户手机号
        // "mbl_no"  : "18390957487",                           // 用户手机号
        "merc_id" : data.MERC_ID,                            // 商户编号
        "mkt_id"  : data.MKT_ID,                             // 活动编号
        "prd_id"  : data.PRD_ID,                             // 券别编号
        "mamt"    : data.ISS_BILL_AMT,                       // 发券面额     
        "session" : this.token.session.replace(/\+/g, "%2B") // 单点登录返回session
      };
      // console.log(param_);
      let flag = 0;
      axios.post('receiveCoupon', param_).then(res => {
        let flag = 1;
        if(res.code === "000000") {
          let data = res.data
          this.isCoupon = data
          this.showAlert = true
          this.alertText = "领取成功"
          data.show = false
          // console.log(this.isCoupon)
        } else if(res.code === "900001") {
          this.showAlert = true
          data.isLook = true
          this.alertText = "领取数量已达上限"
          data.show = false         
        } else {
          this.showAlert = true
          data.isLook = true
          this.alertText = "领取失败"
          data.show = false         
        }
        setTimeout(() => {
              flag = 0;
            }, 5000);
      });
    },
    
    goShop(data) {
      console.log(555555,data);
      this.$router.push("/shop");
      axios
        .post("getShopInfo", {
          longitude: window.LONGITUDE,                          // 经度
          latitude: window.LATITUDE,                            // 维度
          stores_nm: "",                                        // 门店名称
          merc_abbr: "",                                        // 门店简称
          mblno: this.token.productNo,                          //用户手机号
          currentPage: this.CURRENTPAGE,
          pagNum: this.PAGNUM || 4,
          session: this.token.session.replace(/\+/g, "%2B"),
          map_type:window.isUseBaiDuLoc,
          merc_id : data.MERC_ID,                               // 商户编号
        })
        .then(res => {
          if (res.data && res.data.length > 0) {
            this.shopLists = this.filterObj(res.data);
            console.log(this.shopLists)
          }
        });
    },
    goDetail(event, obj, flag) {
      fetchPoints(
        "010000000000",        // 页面索引
        "010000000000K06",     // 事件标记
        this.token.productNo,
        "优惠券-" + obj.MKT_NM, // 事件名称
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
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
.nullHeight {
  height: 0.0625rem;
  background: #f6f7f8;
}
.nullHeight2 {
  height: 0.5625rem;
  background: #fff;
}
.s {
  position: relative;
  // margin-top: .625rem;
  // background: #ffffff;
}

ul {
  width: 20.625rem;
  height: 5.625rem;
  // padding-top: 0.875rem;
  position: relative;
  margin: 0.9375rem auto;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.10);
  border-radius: 6px;
}
// ul::after {
//   @include onepx1(#d8d8d8);
// }
ul:nth-last-child(1)::after {
  height: 0 !important;
}
.left {
  width: 5rem;
  height: 100%;
  float: left;
  // padding:15px;
  // min-width: 60%;
  // width: 72%;
  text-align: left;
  .c1 {
    padding-left: 0.9375rem;
    line-height: 5.625rem;
    color: #ED196C;
    font-weight: bold;
    font-size: 1rem;
    .par {
      font-size: 1.875rem;
    }
  }
}
.middle {
  // width: 5.1875rem;
  height: 100%;
  float: left;
  padding-top: 0.5625rem;
  // padding:15px;
  // min-width: 60%;
  // width: 72%;
  text-align: left;
  color: #13252E;
  .c1 {
    padding-left: 0;
    .l {
      font-size: 0.875rem;
      font-weight: bold;
      font-family: PingFangSC-Semibold;
    }
  }
  .c2 {
    height: 1.4375rem;
    .m {
      font-size: 0.8125rem;
      font-family: PingFangSC-Regular;
    }
    .sl {
      font-size: 0.75rem;
      padding: 0.15rem;
      color: #E11A2F;
      font-family: PingFangSC-Regular;
      background-color: #FFF0F1;
      border: 0.0063rem solid #E11A2F;
    }
  }
  .c3 {
    padding-top: 0.3125rem;
    .b {
      font-size: 0.6875rem;
      color: #7E7E7E;
      font-family: PingFangSC-Regular;
    }
  }
}
.right {
  width: 6.4375rem;
  height: 100%;
  // float: left;
  // padding:15px;
  // min-width: 60%;
  // width: 72%;
  text-align: left;
  padding-top: 1.875rem;
  padding-left: 1rem;
  padding-right: 0.625rem;
  border-left: 0.0625rem dashed #E6E6E6;
  .c1 {
    width: 4.5625rem;
    height: 1.875rem;
    background-image: linear-gradient(90deg, #E93357 0%, #F55B97 100%);
    border-radius: 30px;
    color: #fff;
    .r {
      font-size: .75rem;
      font-family: PingFangSC-Regular;
      color: #fff;
      text-align: center;
      line-height: 1.875rem;
    }
  }
  .c2 {
    .l {
      padding-top: 0.375rem;
      padding-left: 0.875rem;
      font-size: 0.6875rem;
      font-family: PingFangSC-Regular;
      color: #7E7E7E;
    }
  }
}
</style>