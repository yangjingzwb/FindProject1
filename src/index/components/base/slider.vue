<template>
	<div class="swiper">
		<swiper :options="swiperOption">
			<swiper-slide><img src="http://img1.qunarzz.com/piao/fusion/1811/7c/8e5c4ab8ee8b7402.jpg_750x200_dd7a38dd.jpg" /></swiper-slide>
			<swiper-slide><img src="http://img1.qunarzz.com/piao/fusion/1706/b8/a8e8ff02b094c802.jpg_750x200_ddaec8e5.jpg" /></swiper-slide>
			<!-- <swiper-slide v-for="item in slider2"><img :src="item.marketingIcon"></swiper-slide> -->
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default{
data(){
	return {
		swiperOption: {
			debugger: true,  
			loop: true,
			autoplay: {
				delay:2000,
				stopOnLastSlide: false, // 切换到最后一个时不停止
				disableOnInteraction: false, //用户操作swiper之后 不停止autoplay
			},
			pagination: {
				el: '.swiper-pagination',
			},
			slidesPerView: "auto",
			centeredSlides: true
			}
	}
},
	components: {
		swiper,
		swiperSlide
	},

  computed: {
    ...mapState([
      "slider2",
    ])
  }
}
</script>

<style lang="scss" scoped>
.swiper {
	margin: 10px auto;
  width: 100%;
  height: 8.9rem;
  overflow: hidden;
}
.swiper-slide {
	width: 85%;
	height: 8.9rem;
	.swiper-slide-active {
		img {
			margin-top: 0;
			width: 100%;
			height: 100%;
		}
	}
}
img {
	display: block;
	margin: 0 auto;
	margin-top: 3.5%;
	width: 90.625%;
	height: 90.625%;
	vertical-align: middle;
	-webkit-transition: all .5s ease 0s;
	-moz-transition: all 1s ease 0s;
	-ms-transition: all 1s ease 0s;
	-o-transition: all 1s ease 0s;
	transition: all .5s ease 0s;
}
</style>