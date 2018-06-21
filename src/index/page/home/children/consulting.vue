<template>
  <div style="position: absoluex;width:100%; height:31.25rem;top:0;">
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
import { GetDistance ,setMd5} from "@@/service/util";
import Scroll from "@@/components/scroll/scroll.vue";
import axios from "@@/plugins/rsa/axios";
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

  mounted() {
    this.init()
  },
  created() {},

  components: {
      Scroll
  },

  computed: {}, 

  methods: {
    init(){
      // alert(111)
      // 请求接口
      let params_ = {
          "contentType": "GOODS",
          "startIndex":0,
          "endIndex":10
      }
      axios.post('http://yys-open.jd.com/content/getContent',params_, {headers: {
            "j-auth": setMd5(params_),
            "User-Agent":"jd",
            "Content-Type":"application/json;encoding=utf-8"
        }}).then((res)=>{
        // alert(JSON.stringify(res))
      })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
.good {
  margin: 0 1.25rem;
  padding-top: 1.125rem;
}
.good::after {
  @include onepx1(#d8d8d8);
}
.t-0 {
  width: 100%;
  img {
    display: block;
    width: 100%;
    border-radius: .125rem;

  }
}
.t-1 {
    font-family: PingFangSC-Regular;
    font-size: .9375rem;
    color: #13252E;
    letter-spacing: 0;
    text-align: right;
    line-height: .9375rem;
    padding-bottom: 1.25rem;
    padding-top: .5rem;
    text-align: left;
}
.null{
    height: 3.125rem;
}

</style>
