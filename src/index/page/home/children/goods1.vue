<template>
<div>
    <div class="banner" @click="goDetail($event,banner,2)">
      <img :src="banner.marketingIcon" >
    </div>
    <div class="goods">
      
    <ul class="u1">
      <li @click="goDetail($event,item,2)" v-for="item in data" :key="item.goodsId">
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
     
  </div>
   <div class="nullHeight"></div>
</div>
   
</template>
<script>
import { GetDistance,fenToyuan,getUUID,setMd5HY } from "@@/service/util";
import { mapState } from "vuex";
import axios from "@@/plugins/rsa/axios";
export default {
  data() {
    return {
      data:{},
      banner:{}
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
      // 获取banner
       axios.post('queryMarketing',{
        "position": "MIDDLE",
        "session": this.token.session.replace(/\+/g, "%2B") // 单点登录返回session
      }).then((res)=>{
        this.banner = res.data[0]
      })
      let param_ = {
        "channel":10197,
        "requestId":getUUID(),
      }
      param_.sign = setMd5HY(param_)
      // 和悦商品接口
      // 生产：https://mall.joypay.cn/cm-mall/outservice/hy/topiclist.do
        axios.post('topiclist.do',param_).then((res)=>{
        let data =res.topiclist[0].goodslist.sort(() => {
          return Math.random() > 0.5 ? -1 : 1;
        });
        this.data = data.slice(0, 3) // 每个专题必须至少返回3个商品
      })
      
    },
    goDetail(event, obj, flag) {
      // alert(JSON.stringify(obj))
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
  // height: 8.3125rem;
  overflow: hidden;
  margin-bottom: .5rem;
  img {
    width: 100%;
    // height: 100%;
  }
}
.goods {
  // height: 11.3125rem;
  padding-left: .6875rem;
  padding-right: .6875rem;
  .u2{
    overflow: hidden;
    
  }
  .u1 {
    padding: 0 !important;
    display: flex;
    padding-top: .6875rem;
    & > li {
      flex: 3;
      flex-direction: row;
      max-width: 34%;
    }

    li.icon {
      max-height: 6.875rem;
      margin: 0 auto;
      // margin-top: 1.375rem;
      // margin-bottom: 1.375rem;
      text-align: center;
      overflow: hidden;
    }
    img {
      // width: 3.75rem;
      // min-height: 4.125rem;
      max-width: 6.5625rem;
      max-height: 6.5625rem;
    }
    .text {
      font-size: .75rem;
      color: #13252e;
      font-family: PingFangSC-Light;
      text-align: center;
      // overflow: hidden;
      // display: -webkit-box;
      /* autoprefixer: ignore next */
      // -webkit-box-orient: vertical;
      // text-overflow: ellipsis;
      text-align: left;
      padding-right: .75rem;
      @include space();
    }
    .price {
      font-size: .75rem;
      color: #ed1991;
      font-family: PingFangSC-Medium;
      text-align: left;
      // padding-left: .625rem;
    }
    .linePrice {
      font-size: .75rem;
      color: #9b9b9b;
      font-family: PingFangSC-Regular;
      text-decoration: line-through;
      text-align: left;
    }
    .u2 {
        padding-bottom: 1.4375rem;
    }
  }
}
</style>
