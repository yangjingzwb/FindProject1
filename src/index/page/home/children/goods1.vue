<template>
<div>
    <div class="banner">
      <img src="/static/img/11.jpg" >
    </div>
    <div class="goods">
      
    <ul class="u1">
      <li @click="goDetail($event,item,1)" v-for="item in data" :key="item.goodsId">
        <ul class="u2">
          <li class="icon">
            <img :src="item.picurl">
          </li>
          <li class="text">
            {{item.name}}
          </li>
          <li>
            <span class="price">¥{{fenToyuan(item.price)}}</span>
            <span class="linePrice">¥{{fenToyuan(item.marketPrice)}}</span>
          </li>
        </ul>
      </li>
    </ul>
      <div class="nullHeight"></div>
  </div>
</div>
   
</template>
<script>
import { GetDistance,fenToyuan } from "@@/service/util";
import { mapState } from "vuex";
import axios from "@@/plugins/rsa/axios";
export default {
  data() {
    return {
      data:{}
    };
  },
  computed: {
    ...mapState(["token"])
  },

  mounted() {
    this.init();
  },
  created() {},

  components: {},

  methods: {
    init(){
      axios.post('topiclist.do',{
        "channel":632,
        "requestId":"2a8da9eaa388324270885bdcfa6c9038cd01",
        "sign":"0DAF8FC523BB6C164C4D66ADA0F8E2E4"
      }).then((res)=>{
        let data =res.topiclist[0].goodslist.sort(() => {
          return Math.random() > 0.5 ? -1 : 1;
        });
        this.data = data.slice(0, 3) // 每个专题必须至少返回3个商品
      })
      
    },
    goDetail(event, obj, flag) {
      this.$emit("goDetail", event, obj, flag);
    },
    fenToyuan:fenToyuan
  }
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
      max-width: 34%;
    }

    li.icon {
      max-height: 110px;
      margin: 0 auto;
      // margin-top: 22px;
      // margin-bottom: 22px;
      text-align: center;
    }
    img {
      // width: 60px;
      // min-height: 66px;
      max-width: 105px;
      max-height: 105px;
    }
    .text {
      font-size: 12px;
      color: #13252e;
      font-family: PingFangSC-Light;
      text-align: center;
      // overflow: hidden;
      // display: -webkit-box;
      /* autoprefixer: ignore next */
      // -webkit-box-orient: vertical;
      // text-overflow: ellipsis;
      text-align: left;
      padding-left: 10px;
      @include space();
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
