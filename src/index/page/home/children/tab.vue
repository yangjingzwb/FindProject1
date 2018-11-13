<template>
  <div>
      <section v-if="slider1 && slider1.length>0" class="s_3 s">
        <ul>
          <li v-for="item in slider1"  @click="goDetail(item)">
            <!-- :key="item.id" -->
            <img :src="item.marketingIcon" :onerror='defaultIcon' class="icon" >
            <span class="text">{{item.marketingTitle}}</span>
          </li>
        </ul>
      </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import sa from "sa-sdk-javascript";
import {
  fetchPoints,
  formatDate_1
} from "@@/service/util";
import { baseUrl } from "@@/config/env"; // baseUrl
// import Scroll from "@@/components/scroll/scroll.vue";
import Near1 from "./near1.vue";
import Near2 from "./near2.vue";
import Near3 from "./near3.vue";
import Near4 from "./near4.vue";
import Near5 from "./near5.vue";
export default {
  data() {
    return {
      defaultIcon: 'this.src="' + "/static/img/error.png" + '"',
    }
  },
  computed: {
    ...mapState([
      "slider1"
    ])
  },

  methods: {
    ...mapMutations([
      "SLIDER1" // 分类icon
    ]),
    goDetail(obj) {
      console.log(obj.mercTrdCls);
      if(obj.mercTrdCls == "1300") {
        this.$router.push("/home1/near1");
      } else if(obj.mercTrdCls == "1505") {
        this.$router.push("/home1/near2");
      } else if(obj.mercTrdCls == "1818") {
        this.$router.push("/home1/near3");
      } else if(obj.mercTrdCls == "1515") {
        this.$router.push("/home1/near4");
      }else {
        this.$router.push("/home1/near5");
      }
    }
  }

};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
.nullHeight {
  height: 0.5625rem;
  background: #f6f7f8;
}
.s {
  position: relative;
  // margin-top: .625rem;
  // background: #ffffff;
}
.s_2 {
  @include wh(100%, 10.625rem);
  overflow: hidden;
  background-color: #fff;
  ul,
  li {
    height: 100%;
    width: 100%;
  }
  img {
    width: 100%;
  }
}

.s_3 {
  @include wh(100%, 4.875rem);
  text-align: center;
  background-color: #fff;
  .icon {
    height: 1.75rem;
    width: auto;
    display: inline-block;
    padding: 0.84375rem 0 0.25rem 0;
  }
  .text {
    display: block;
    color: #13252e;
    font-size: 0.75rem;
  }

  ul {
    display: flex;
    height: 100%;
    li {
      height: 100%;
      flex: 1;
    }
  }
}

.slider-wrapper {
  width: 100%;
  position: relative;
  overflow: hidden;
  a {
    display: inline-block;
    height: 100%;
  }
  img {
    max-height: 10.625rem;
  }
}
.end {
  text-align: center;
  font-size: 0.6875rem;
  color: #999999;
  padding-top: 0.3125rem;
}
.aa {
  position: relative;
  // width: 4rem;
  padding: 0.3125rem 0.625rem;
  top: 0.75rem;
  background: #fff;
  z-index: 10;
  color: #444444;
  font-size: 0.75rem;
  text-align: center;
}
.hr-1 {
  display: block;
  position: absolute;
  height: 0.0625rem;
  float: left;
  width: 100%;
  bottom: 0;
  background-color: #d8d8d8;
  -webkit-transform-origin: 0, 0;
  transform-origin: 0, 0;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
  // &::after {
  //   @include onepx1(#d8d8d8);
  // }
}
.animation_2::after,
.animation_1::after {
  content: "  ";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 120%;
  height: 0.0625rem;
  background-color: #d8d8d8;
  /* 如果不用 background-color, 使用 border-top:.0625rem solid #f00; 效果是一样的*/
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
</style>
