<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <slot>
      </slot>
    </div>
    <div v-if="showDot" class="dots" id="dots" ref="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots" @click="goToIndex(index)">
        {{item}}
      </span>
      <!-- <div class="hr-1"></div> -->
    </div>
  </div>
</template>

<script>
import { addClass } from "@@/components/common/js/dom";
import BScroll from "better-scroll";
import {mapState, mapMutations } from "vuex";

const COMPONENT_NAME = "slide";
//SLIDEINDEX


export default {
  name: COMPONENT_NAME,
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    },
    showDot: {
      type: Boolean,
      default: true
    },
    dots_: {
      type: Array,
      default() {
        return [];
      }
    },
    click: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0.3
    },
    speed: {
      type: Number,
      default: 400
    },
    openAndClose:{
      type: Boolean,
      default: true
    }
  },
   computed: {
    ...mapState([
      "slideIndex"
    ])
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0,
      preIndex: 0
    };
  },
  // watch: {
  //   currentPageIndex(curVal, oldVal) {
  //     alert(2)
  //     this.SLIDEINDEX(curVal)
  //     // console.log(curVal, oldVal);
  //   }
  // },
  mounted() {
    this.update();

    window.addEventListener("resize", () => {
      if (!this.slide || !this.slide.enabled) {
        return;
      }
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        if (this.slide.isInTransition) {
          this._onScrollEnd();
        } else {
          if (this.autoPlay) {
            this._play();
          }
        }
        this.refresh();
      }, 60);
    });
  },
  activated() {
    if (!this.slide) {
      return;
    }
    this.slide.enable();
    let pageIndex = this.slide.getCurrentPage().pageX;
    this.slide.goToPage(pageIndex, 0, 0);
    this.currentPageIndex = pageIndex;
    !this.autoPlay && this.SLIDEINDEX(pageIndex)
    if (this.autoPlay) {
      this._play();
    }
  },
  deactivated() {
    this.slide.disable();
    clearTimeout(this.timer);
  },
  beforeDestroy() {
    this.slide.disable();
    clearTimeout(this.timer);
  },
  methods: {
    ...mapMutations([
      'SLIDEINDEX'
    ]),
    goToIndex(index) {
      let aa = index - this.preIndex;
      this.slide.goToPage(this.currentPageIndex + aa);
      this.currentPageIndex += aa
      !this.autoPlay && this.SLIDEINDEX(this.currentPageIndex)
      this.preIndex = index;
      // // alert(aa)
      // switch(aa){
      //   case -1:
      //      this.slide.prev();
      //      break;
      //   case -2:
      //      this.slide.prev();
      //      this.slide.prev()
      //      break;
      //   case -3:
      //      this.slide.prev();
      //      this.slide.prev();
      //      this.slide.prev();
      //      break;
      //   case 1:
      //      this.slide.next();
      //      break;
      //   case 2:
      //      this.slide.next();
      //      this.slide.next();
      //      break;
      //   case 3:
      //      this.slide.next();
      //      this.slide.next();
      //      this.slide.next();
      //      break;
      // }

      // this.slide.next();
      // if(index)
      // alert(index)
      // this.currentPageIndex = index;
    },
    update() {
      if (this.slide) {
        this.slide.destroy();
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    refresh() {
      this._setSlideWidth(true);
      this.slide.refresh();
    },
    prev() {
      this.slide.prev();
    },
    next() {
      this.slide.next();
    },
    init() {
      clearTimeout(this.timer);
      // this.currentPageIndex = this.slideIndex;
      this.currentPageIndex = 0
      !this.autoPlay && this.SLIDEINDEX(0)
   
      this._setSlideWidth();
      if (this.showDot) {
        this._initDots();
      }
      this._initSlide();

      if (this.autoPlay) {
        this._play();
      }
      // if(this.currentPageIndex>0){
      //   this.slide.goToPage(this.slide.getCurrentPage()+this.currentPageIndex)
      // }
    },
    _setSlideWidth(isResize) {
      this.children = this.$refs.slideGroup.children;

      let width = 0;
      let slideWidth = this.$refs.slide.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slide-item");

        child.style.width = slideWidth + "px";
        width += slideWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * slideWidth;
      }
      this.$refs.slideGroup.style.width = width + "px";
    },
    _initSlide() {
      console.log(this.threshold);
      this.slide = new BScroll(this.$refs.slide, {
        scrollX: this.openAndClose,
        scrollY: false,
        // startX:400,
        // directionLockThreshold:30,
        // eventPassthrough:"vertical",
        momentum: false,
        // freeScroll:true,
        // probeType:2,
        snap: {
          loop: this.loop,
          threshold: this.threshold,
          speed: this.speed,
          // stepX: 100,
        },
        bounce: false,
        stopPropagation: false,
        click: true,
        tap: true
      });

      this.slide.on("scrollEnd", this._onScrollEnd);
      let width_ = document.body.offsetWidth / 1;
      this.slide.on("touchEnd", () => {
        if (this.autoPlay) {
          this._play();
        }
      });
      // this.slide.on('scroll',(pos)=>{
      //   Math.abs(pos.x)/width_
      //   console.log(pos)
      //   return
      // })
      this.slide.on("beforeScrollStart", pos => {
        console.log(pos);
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });
    },
    _onScrollEnd() {
      // this.SLIDEINDEX(this.slide.getCurrentPage().pageX)
      // alert(JSON.stringify(this.slide.getCurrentPage()))
      let pageIndex = this.slide.getCurrentPage().pageX;
      this.currentPageIndex = pageIndex;
      // setTimeout()
      !this.autoPlay && this.SLIDEINDEX(this.currentPageIndex)
      if (this.autoPlay) {
        this._play();
      }
    },
    _initDots() {
      // this.dots = new Array(this.children.length);
      if (this.dots_.length > 0) {
        this.dots = this.dots_;
      } else {
        this.dots = new Array(this.children.length);
      }
    },
    _play() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slide.next();
      }, this.interval);
    }
  },
  watch: {
    loop() {
      this.update();
    },
    autoPlay() {
      this.update();
    },
    speed() {
      this.update();
    },
    threshold() {
      this.update();
    },
    // openAndClose(){
    //   // this.refresh();
    //   this.update();
    // }

  }
};
</script>
<style  lang="scss" scoped>
.slide {
  min-height: 0.0625rem;
  .slide-group {
    // position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slide-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      position: relative;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0.75rem;
    transform: translateZ(0.0625rem);
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 0.25rem;
      width: 0.3125rem;
      height: 0.3125rem;
      border-radius: 50%;
      background: #ccc;
      &.active {
        width: 0.3125rem;
        border-radius: 0.3125rem;
        background: #ed1991;
      }
    }
  }
}
.tab-slider {
  position: relative;
  .slide-group {
    // padding: 0 0.9375rem;
  }
  .dots {
    height: 3rem !important;
    top: 0rem !important;
    background: white;
    line-height: 3rem;
    display: flex;
    &::after {
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
    .dot {
      flex: 1;
      height: 3rem;
      line-height: 3rem;
      background: #fff;
      font-family: PingFangSC-Regular;
      color: #13252e;
      font-size: 0.9375rem;
    }
    .dot.active {
      background: #fff;
      color: #ed1991;
      border-bottom: 0.125rem solid #ed1991;
      border-radius: 0;
    }
  }
  .slide-item {
    // padding-top: 3rem;
    top: 3rem;
    // background: red;
  }
  .slide-item {
    // position: relative!important;
  }
}
</style>