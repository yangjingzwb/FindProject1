<template>
<div>
  <div class="banner">
              <img src="/static/img/11.jpg" :onerror='defaultIcon'>
            </div>
<div class="goods">
      
              <ul class="u1">
                <li>
                  <ul class="u2">
                    <li class="icon">
                      <img src="/static/img/1-1.png">
                    </li>
                    <li class="text">
                      黑凤梨20寸全铝
                    </li>
                    <li>
                      <span class="price">¥329.00</span>
                      <span class="linePrice">¥449.00</span>
                    </li>
                  </ul>
                </li>

                <li>
                  <ul class="u2">
                    <li class="icon">
                      <img src="/static/img/1-1.png">
                    </li>
                    <li class="text">
                      黑凤梨20寸全铝
                    </li>
                    <li>
                      <span class="price">¥329.00</span>
                      <span class="linePrice">¥449.00</span>
                    </li>
                  </ul>
                </li>

                <li>
                  <ul class="u2">
                    <li class="icon">
                      <img src="/static/img/1-1.png">
                    </li>
                    <li class="text">
                      黑凤梨20寸全铝
                    </li>
                    <li>
                      <span class="price">¥329.00</span>
                      <span class="linePrice">¥449.00</span>
                    </li>
                  </ul>
                </li>
              </ul>
               <div class="nullHeight"></div>
            </div>
</div>
   
</template>

<script>
import { GetDistance } from "@@/service/util";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["token"])
  },

  mounted() {},
  created() {},

  components: {},

  methods: {}
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
.banner {
  width: 100%;
  height: 8.3125rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.goods {
  // height: 181px;
  .u1 {
    padding: 0 !important;
    display: flex;
    & > li {
      flex: 3;
      flex-direction: row;
    }

    li.icon {
      height: 66px;
      margin: 0 auto;
      margin-top: 22px;
      margin-bottom: 22px;
      text-align: center;
    }
    img {
      width: 60px;
      min-height: 66px;
      max-height: 70px;
    }
    .text {
      font-size: 12px;
      color: #13252e;
      font-family: PingFangSC-Light;
      text-align: center;
      overflow: hidden;
      display: -webkit-box;
      /* autoprefixer: ignore next */
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      text-align: left;
      padding-left: 10px;
    }
    .price {
      font-size: 12px;
      color: #ed1991;
      font-family: PingFangSC-Medium;
      text-align: left;
      padding-left: 10px;
    }
    .linePrice {
      font-size: 12px;
      color: #9b9b9b;
      font-family: PingFangSC-Regular;
      text-decoration: line-through;
      text-align: left;
    }
    .u2 {
      padding-bottom: 8px;
    }
  }
}
</style>
