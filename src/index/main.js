// import 'babel-polyfill'
import Vue from 'vue'
// import Es6Promise from 'es6-promise'

// require('es6-promise').polyfill()

// Es6Promise.polyfill()

// import Vue from 'vue'
// import App from './App'
import VueRouter from 'vue-router'
// import VueLazyload from 'vue-lazyload'
import routes from './router/router'
// import bestpay from '@@/service/bestpay'
// import { getProduct, getSessionKey, system, setTopRightBar } from '@@/service/bestpay_'
// import { getUUID,animationProgress } from '@@/service/util'

import store from './store/'
import { routerMode } from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import axios from "@@/plugins/rsa/axios";
// import AlertTip from '@@/components/common/alertTip'
import {checkUtil, animationProgress,formatDate_1 } from "@@/service/util"
// 神策
import sa from'sa-sdk-javascript';

sa.init({
    sdk_url: 'https://static.sensorsdata.cn/sdk/1.10.9/sensorsdata.min.js',
    heatmap_url: 'https://static.sensorsdata.cn/sdk/1.10.9/heatmap.min.js',
    name: 'sa',
    //配置打通 App 与 H5 的参数
    use_app_track: true,
    use_client_time: true,
    is_single_page: true,
    web_url: 'https://hebaopay.cloud.sensorsdata.cn/',
    server_url: 'https://hebaopay.cloud.sensorsdata.cn:4006/sa?token=e852cbf8dc40a8d1',
    heatmap: {
       //是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
       clickmap:'not_collect',
       //是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
       scroll_notice_map:'not_collect'
    }
  });
sa.login('100422801839');
sa.quick('autoTrack', {
    platForm:'h5'
});

// Vue.use(VueLazyload)
// Vue.use(VueLazyload, {
//     preLoad: 1.3,
//     error: require('@@/images/error.png'),
//     // loading: require('@@/images/error.png'),
//     attempt: 1,
//     // listenEvents: [ 'animationend' ]
// })

// 延迟点击
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
// let isIPhone = /iP(ad|hone|od)/.test(navigator.userAgent)
// ios 防止select焦点跳动
if (/iP(ad|hone|od)/.test(navigator.userAgent)) {
    document.body.addEventListener('touchend', function (event) {
        console.log('touchend event caught and default prevented', event.target.tagName);
        if (event.target.tagName.toLowerCase() == 'input') {
            event.target.click();
        }
    })
}

//注册全局组件 弹窗
// Vue.component('alert-tip', AlertTip)

Vue.use(VueRouter)
// Vue.use(bestpay)

const router = new VueRouter({
    routes,
    mode: routerMode,
    strict: process.env.NODE_ENV !== 'production',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return { x: 0, y: to.meta.savedPosition || 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    animationProgress(to, from, next)
    if (store.state.flag) {
        next()
        return
    }
    let slider = 0;
    let slider1 = 0;
    let slider2 = 0;

    // 单点登录
    //?SERVICE=user_ssoservice&VERSION=1.0&PARTNER=80010003&SIGN_TYPE=MD5&CREDTENTIAL=1593305,1502335609,1502336209,1502335609,218.77.2.82,client.cmpay.com&SIGN_DATA=08229a7a638c243bb7ab0a0e67e6d81c&viewCode=html 
    // 测试临时添加
    // store.commit('TOKEN', {"session":"TESTSSION","productNo":'13795442667'})
    // let userId = '';
    let startTime = new Date();
    axios.post('queryAccount', {
    }).then((res) => {
        // userId = res.data.usrNo
        //神策
        let endTime = new Date();
            sa.track('loadDelay',{
            currentBusinessLine:'发现频道',
            currentActivity: '调用高阳queryAccount接口',
            currentURL: window.location.href,
            currentURL: window.location.href,
            delayTime: endTime - startTime,
            offsetTime: 0,
            endTime: formatDate_1(endTime.getTime()),
            startTime: formatDate_1(startTime.getTime())
        })   
        store.commit('TOKEN', res.data || {})
        if (!res.data || res.data.length <= 0) {
            
        } else {
            
        }
        
        // 请求banner1
        axios.post('queryMarketing', {
            "position": "TOP",
            "session": store.state.token.session.replace(/\+/g, '%2B') // 单点登录返回session
        }).then((res) => {
            store.commit('SLIDER', (res.data ? res.data : []))
            slider += 1
            // console.log(store.state.slider)
            checkUtil(slider, slider1, slider2, next)
        }).catch((res) => {
            // window.location.reload()
        })
        axios.post('queryMarketing', {
            "position": "CATALOG",
            "session": store.state.token.session.replace(/\+/g, '%2B') // 单点登录返回session
        }).then((res) => {
            store.commit('SLIDER1', (res.data ? res.data : []))
            slider1 += 1
            checkUtil(slider, slider1, slider2, next)
        }).catch(() => {
            // window.location.reload()
        })
        // 运营banner
        axios.post('queryMarketing', {
            "position": "OPERATION",
            "session": store.state.token.session.replace(/\+/g,'%2B') // 单点登录返回session
        }).then((res) => {
            store.commit('SLIDER2', (res.data ? res.data : []))
            slider2 += 1
            checkUtil(slider, slider1, slider2, next)
        }).catch(() => {
            // window.location.reload()
        })
    }).catch((res) => {
        
    // }).then(() => {
        // sa.login('userId');
    })
})
new Vue({
    router,
    store,
}).$mount('#app')