<template>
  <div>
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
      <section class="s_2">
        <div class="seller">
          <!-- 门店名称 -->
          <ul>
            <li class="left">
              <div class="seller-name">千惠便利店（湘春路店）</div>
              <div class="seller-time">营业时间: 9:00-22:00</div>
            </li>
            <li class="right">
              <button class="go-buy-btn" @click="payKHD()">去买单</button>
            </li>
            <li class="hr-2"></li>
          </ul>
        </div>
        <div class="address">
          <div class="address-info" @click="jumpMap()">
            <div class="left">
              <img src="/static/img/seller_address_icon.png"/>
              <a>湖南省长沙市湘江中路一段160号</a>
            </div>
            <div class="right">
              <img src="/static/img/seller_phone_button.png"/>
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
          <p>优惠活动</p>
          <div class="hr-2"></div>
        </div>
        <div class="address">
          <div class="address-info" @click="jumpInfo(this)">
            <div class="left">
              <span class="list-flg">
                <span>满减</span>
              </span>
              <a class="activity">和包风暴随机立减活动</a>
            </div>
            <div class="right">
              <img class="special" src="/static/img/more_button.png"/>
            </div>
          </div>
        </div>

        <div class="seller_info">
            <h2>商家简介</h2>
            <span class="seller-time">预包装食品、乳制品、熟食、粮油、烟草制品、广告制作服务</span>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";

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
.s_2,.s_3 {
  margin: 0 0.9375rem;
}
ul {
  height: 100%;
  position: relative;
}
.seller {
  height: 5.3125rem;
  // border: 1px solid red;
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
        color: #13252e;
        line-height: 2.8125rem;
      }
      .list-flg {
        display: inline-block;
        width: 2.125rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background: #fff0f1;
        border: 0 solid #e11a2f;
        border-radius: 0.125rem;
        span {
          display: inline-block;
          font-family: PingFangSC-Regular;
          font-size: 0.75rem;
          color: #e11a2f;
          line-height: 0.75rem;
        }
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
.title {
  position: relative;
  height: 2.5rem;
  font-family: PingFangSC-Regular;
  font-size: 0.875rem;
  color: #13252e;
  line-height: 2.5rem;
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
