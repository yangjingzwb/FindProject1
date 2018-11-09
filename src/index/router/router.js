import App from '@@/App'
// import axios from "@@/plugins/rsa/axios";
// tab
// const tab = r => require.ensure([], () => r(require('../page/home/tab')), 'tab')
// 首页
// const home = r => require.ensure([], () => r(require('../page/home/children/home')), 'home')
const home = require('../page/home/children/home')

const home1 = r => require.ensure([], () => r(require('../page/home/children/home1')), 'home1')
// 贷款超市
// const shop = r => require.ensure([], () => r(require('../page/home/children/shop')), 'shop')
// 我的
const mine = r => require.ensure([], () => r(require('../page/home/children/mine')), 'mine')
const shopList = r => require.ensure([], () => r(require('../page/home/children/shopList')), 'shopList')
const shopDetail = r => require.ensure([], () => r(require('../page/home/children/shopDetail')), 'shopDetail')
const hebaoInfo = r => require.ensure([], () => r(require('../page/home/children/hebaoInfo')), 'hebaoInfo')
const near1 = r => require.ensure([], () => r(require('../page/home/children/near1')), 'near1')
const near2 = r => require.ensure([], () => r(require('../page/home/children/near2')), 'near2')
const near3 = r => require.ensure([], () => r(require('../page/home/children/near3')), 'near3')
const near4 = r => require.ensure([], () => r(require('../page/home/children/near4')), 'near4')
const near5 = r => require.ensure([], () => r(require('../page/home/children/near5')), 'near5')

export default [{
    path: '/',
    component: App, //顶层路由，对应main.html
    children: [ //二级路由。对应App.vue
        // 地址为空时跳转home页面
        {
            path: '',
            component: home,
            meta:{
                keepAlive: true
            }
        },
        {
            path: 'home',
            component: home,
            meta:{
                keepAlive: true
            }
            // beforeEnter: (to, from, next) => {
            //     // 请求banner1
            //     axios.post('queryMarketing',{
            //         "position":"TOP",
            //         "session":"" // 单点登录返回session
            //     }).then((res)=>{
            //         console.log(res)
            //         next()
            //         // this.bannerTop = res.data
            //     }).catch((res)=>{

            //     })
            // },
        },
        {
            path: 'home1',
            component: home1,
            redirect: 'home1/near1',
            children: [
                {path: 'near1', component: near1},
                {path: 'near2', component: near2},
                {path: 'near3', component: near3},
                {path: 'near4', component: near4},
                {path: 'near5', component: near5}
            ],
            meta:{
                keepAlive: true
            }
            // beforeEnter: (to, from, next) => {
            //     // 请求banner1
            //     axios.post('queryMarketing',{
            //         "position":"TOP",
            //         "session":"" // 单点登录返回session
            //     }).then((res)=>{
            //         console.log(res)
            //         next()
            //         // this.bannerTop = res.data
            //     }).catch((res)=>{

            //     })
            // },
        },
       {
            path: 'mine', 
            component: mine,
            meta:{
                keepAlive: true
            }
        },
        {
             path: 'shopList', 
             component: shopList,
             meta:{
                 keepAlive: false
             }
         },
         {
              path: 'shopDetail', 
              component: shopDetail,
              meta:{
                  keepAlive: false
              }
          },
          {
               path: 'hebaoInfo', 
               component: hebaoInfo,
               meta:{
                   keepAlive: false
               }
           }
       
        //常见问题模块
    ]
}]