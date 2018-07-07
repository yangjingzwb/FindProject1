<!--卷皮专题营销位-->
<template>
  <div>
      <div class="banner" @click="goDetail($event,banner,2)">
        <img :src="banner.marketingIcon" >
      </div>
      <div class="goods">
        <ul class="u1">
          <li @click="goDetail($event,item,4)" v-for="item in data" :key="item.actid">
            <ul class="u2">
              <li class="icon">
                <img :src="item.picurl">
              </li>
              <li class="text">
                {{item.title}}
              </li>
              <li>
                <span class="price">¥{{(item.cprice)}}</span>
                <span class="linePrice">¥{{(item.oprice)}}</span>
              </li>
            </ul>
          </li>
        </ul>
     </div>
     <div class="nullHeight"></div>
  </div>
</template>
<script>
import { GetDistance,getUUID,setMd5HY,encodeJson } from "@@/service/util";
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


  methods: {
    init(){
      // 获取banner
      axios.post('queryMarketing',{
        "position": "TOP",
        "session": this.token.session.replace(/\+/g, "%2B") // 单点登录返回session
      }).then((res)=>{
        this.banner = res.data[0]
      })

      let param_ = {
        "channel":10197,
        "requestId":getUUID(),
      }
      
      param_.sign = setMd5HY(param_)
      // +encodeJson(param_)
      // 卷皮商品接口
     axios.get("https://muser.juanpi.com/hebao/getactgoods?from=hebao&baseUrl=0")
     .then(res => {
        let data = res.goods.sort(() => {
          return Math.random() > 0.5 ? -1 : 1;
        });
        this.data = data.slice(0, 3); // 每个专题必须至少返回3个商品
      });
      
    },
    goDetail(event, obj, flag) {
      // alert(JSON.stringify(obj))
      this.$emit("goDetail", event, obj, flag);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
.banner {
  width: 100%;
  overflow: hidden;
  margin-bottom: .5rem;
  img {
    width: 100%;
  }
}
.goods {
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
      height: 6.875rem;
      position: relative;
      margin: 0 auto;
      text-align: center;
      overflow: hidden;
    }
    img {
      display: block;
      max-width: 6.5625rem;
      max-height: 6.5625rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      // border: 1px solid #D8D8D8;
    }
    .text {
      font-size: .75rem;
      color: #13252e;
      font-family: PingFangSC-Light;
      text-align: center;
      text-align: left;
      padding-right: .75rem;
      @include space();
    }
    .price {
      font-size: .75rem;
      color: #ed1991;
      font-family: PingFangSC-Medium;
      text-align: left;
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
