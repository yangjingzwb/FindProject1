<template>
    <div class="goods-3">
              <div class="nullHeight"></div>
               <div class="title">
                <div class="t-text">资讯</div>
              </div>
              <ul class="u1">
                <li @click="goDetail($event,item,3)" v-for="item in data" :key="item.id">
                  <ul v-if="item.imageUrls.length == 1" class="u2">
                    <li class="icon">
                      <img :src="item.imageUrls[0]">
                    </li>
                    <li class="text">
                         {{item.title}}
                    </li>
                  </ul>
                  <ul v-else class="u2">
                    <li class="icon">
                      <ul>
                        <li class="left">
                          <img :src="item.imageUrls[0]">
                        </li>
                        <li class="right">
                          <img :src="item.imageUrls[1]">
                          <img class="i2" :src="item.imageUrls[2]">
                        </li>
                      </ul>
                      
                    </li>
                    <li class="text">
                        {{item.title}}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
</template>

<script>
import { GetDistance, setMd5 } from "@@/service/util";
import { mapState } from "vuex";
import axios from "@@/plugins/rsa/axios";
export default {
  data() {
    return {
      data: []
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
    init() {
      let params_ = {
        contentType: "GOODS",
        startIndex: 0,
        endIndex: 10
      };
      // 京东
      axios
        .post("http://yys-open.jd.com/content/getContent", params_, {
          headers: {
            "j-auth": setMd5(params_),
            "Content-Type": "application/json;encoding=utf-8"
          }
        })
        .then(res => {
          this.data = this.dealData(res.result);
        });
    },
    // 处理数据
    dealData(data){
      let res = []
      let obj={}
      for(let i=0;i<data.length;i++){
        obj  = data[i]
        obj.imageUrls = obj.imageUrls.replace(/,$/,'').split(',')
        res.push(obj)
      }
      console.log('99998888')
      console.log(res)
      return res
    },
    goDetail(event, obj, flag) {
      this.$emit("goDetail", event, obj, flag);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";

.goods-3 {
  clear: both;
  .title {
    height: 3.0625rem;
    line-height: 3.0625rem;
    text-align: center;
    background-image: url("/static/img/2-5.png");
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: 100% auto;
    margin: auto 1rem;
  }
  .t-text {
    width: 5rem;
    margin: 0 auto;
    background-color: #fff;
  }
  .icon {
    height: 12.5rem;
    padding-left: .75rem;
    padding-right: .75rem;
  }
  .left {
    width: 70%;
    float: left;
    img {
      height: 12.5rem;
      padding-right: 0;
    }
  }
  .right {
    width: 30%;
    float: right;
    img {
      height: 6.1875rem;
      padding-left: .125rem;
    }
    img.i2 {
      margin-top: .125rem;
    }
  }
  img {
    display: -webkit-box;
    width: 100%;
    height: 12.5rem;
    border-radius: .3125rem;
    box-sizing: border-box;
  }
  .text {
    color: #13252e;
    font-size: .9375rem;
    font-family: PingFangSC-Regular;
    padding-left: .75rem;
    margin-top: .3125rem;
    margin-bottom: .9375rem;
  }
}
</style>
