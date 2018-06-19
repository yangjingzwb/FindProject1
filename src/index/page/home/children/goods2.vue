<template>
    <div class="goods-2">
              <div class="title">
                为你推荐
              </div>
              <ul class="u1">
                <li>
                  <ul class="u2">
                    <li class="icon">
                      <img src="/static/img/1-1.png">
                    </li>
                    <li class="text">
                      佳佰 汤锅珐琅铸铁22cm双耳汤锅(电磁炉明火
                    </li>
                    <li class="price">
                      ¥219.00
                    </li>
                  </ul>
                </li>
                 <li>
                  <ul class="u2">
                    <li class="icon">
                      <img src="/static/img/1-1.png">
                    </li>
                    <li class="text">
                      佳佰 汤锅珐琅铸铁22cm双耳汤锅(电磁炉明火
                    </li>
                    <li class="price">
                      ¥219.00
                    </li>
                  </ul>
                </li>

                 <li>
                  <ul class="u2">
                    <li class="icon">
                      <img src="/static/img/1-1.png">
                    </li>
                    <li class="text">
                      佳佰 汤锅珐琅铸铁22cm双耳汤锅(电磁炉明火
                    </li>
                    <li class="price">
                      ¥219.00
                    </li>
                  </ul>
                </li>

                 <li>
                  <ul class="u2">
                    <li class="icon">
                      <img src="/static/img/1-1.png">
                    </li>
                    <li class="text">
                      佳佰 汤锅珐琅铸铁22cm双耳汤锅(电磁炉明火
                    </li>
                    <li class="price">
                      ¥219.00
                    </li>
                  </ul>
                </li>

                <li>
                  <ul class="u2">
                    <li class="icon">
                      <img src="/static/img/1-1.png">
                    </li>
                    <li class="text">
                      佳佰 汤锅珐琅铸铁22cm双耳汤锅(电磁炉明火
                    </li>
                    <li class="price">
                      ¥219.00
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
</template>

<script>
import { GetDistance } from "@@/service/util";
import { mapState } from "vuex";
export default {
  data() {
    return {
     
    };
  },
  computed: {
    ...mapState(["token"])
  },

  mounted() {},
  created() {
    
  },

  components: {
  },

  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
@import "~@@/style/mixin";
.goods-2 {
  padding-left: 8px;
  padding-right: 8px;
  .title {
    height: 49px;
    line-height: 49px;
    text-align: center;
    font-size: 15px;
    color: #13252e;
    font-family: PingFangSC-Regular;
  }
  .u1 > li {
    height: 210px;
    width: 50%;
    float: left;
    // flex: 2;
    // flex-direction: row;
    padding-left: 8px;
    padding-right: 8px;
  }
  .text {
    font-size: 13px;
    color: #13252e;
    font-family: PingFangSC-Light;
    white-space: normal !important;
    letter-spacing: 1px;
    line-height: 15px;
    display: -webkit-box;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .price {
    font-size: 15px;
    color: #c11325;
    font-family: PingFangSC-Regular;
  }
  li.icon {
    max-height: 156px;
    min-height: 94px;
    display: block;
  }
  img {
    max-height: 100%;
    max-width: 100%;
  }
}

</style>
