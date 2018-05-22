<template>
  <div style="position: absoluex;width:100%; height:500px;top:0;">
    <scroll
        :data = "shopList">
         <ul class="scr">
            <li class="good">
                <div class="t-0"><img src="/static/img/banner.jpg"></div>
                <div class="t-1">上班经常饿？来点坚果补能量</div>
            </li>
            <li class="good">
                <div class="t-0"><img src="/static/img/banner.jpg"></div>
                <div class="t-1">上班经常饿？来点坚果补能量</div>
            </li>
            <li class="good">
                <div class="t-0"><img src="/static/img/banner.jpg"></div>
                <div class="t-1">上班经常饿？来点坚果补能量</div>
            </li>
        </ul>
         <div class="null"></div>
    </scroll>
 
</div>
</template>

<script>
import { GetDistance } from "@@/service/util";
import Scroll from "@@/components/scroll/scroll.vue";
export default {
  data() {
    return {
        shopList:[]
      //   defaultIcon: 'this.src="' + "/static/img/error.png" + '"'
    };
  },
  props: {
    
  },
  computed: {},

  mounted() {},
  created() {},

  components: {
      Scroll
  },

  computed: {},

  methods: {}
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
.good {
  margin: 0 20px;
  padding-top: 18px;
}
.good::after {
  @include onepx1(#d8d8d8);
}
.t-0 {
  width: 100%;
  img {
    display: block;
    width: 100%;
    border-radius: 2px;

  }
}
.t-1 {
    font-family: PingFangSC-Regular;
    font-size: 15px;
    color: #13252E;
    letter-spacing: 0;
    text-align: right;
    line-height: 15px;
    padding-bottom: 20px;
    padding-top: 8px;
    text-align: left;
}
.null{
    height: 50px;
}

</style>
