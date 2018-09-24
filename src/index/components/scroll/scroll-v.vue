<template>
  <div ref="wrapper" class="list-wrapper">
    <div class="scroll-content">
      <div class="aa" ref="listWrapper">
        <slot>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
// import Loading from "@@/components/loading/loading.vue";
// import Bubble from "@@/components/bubble/bubble.vue";
import { getRect } from "@@/components/common/js/dom";

const COMPONENT_NAME = "scroll";
const DIRECTION_H = "horizontal";
const DIRECTION_V = "vertical";

export default {
  name: COMPONENT_NAME,
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },
  methods: {
    initSetWidth(){
      this.children = this.$refs.listWrapper.children[0].children;
      let width = 0;

      let size = this.data.length<=2 ? 2 :this.data.length;
      console.log(size);
      for (let i = 0; i < size; i++) {
        // let child = this.children[i];
        width += 150;
      }

      // this.$refs.listWrapper.children[0].style.width=width+'px'
      // this.$refs.listWrapper.style.width=width+'px'
      if(size>2){
        width+=60
        width+='px';
      }else{
        width='100%'
      }
      this.$refs.wrapper.children[0].style.width = width;
    },
    initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.initSetWidth()

      let options = {
        probeType: 0,
        click: true,
        scrollY: false,
        scrollX: true,
        momentum: false,
        scrollbar: false,
        eventPassthrough: "vertical",
        startX: 0,
        bounce: true,
        stopPropagation: true, // this.stopPropagation
        preventDefault: true
      };
      console.log('99999')
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, options);
      } else {
        this.scroll.refresh();
      }
    }
  },
  watch: {
    data(){
      this.initScroll()
    }
  }
};
</script>

<style lang="scss">
.list-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  background: #fff;

  .scroll-content {
    position: relative;
    z-index: 1;
  }
  .list-content {
    position: relative;
    z-index: 10;
    background: #fff;
    .list-item {
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      padding-left: 20px;
      border-bottom: 1px solid #e5e5e5;
    }
  }
}
</style>
