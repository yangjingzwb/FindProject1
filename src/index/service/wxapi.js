/**
 *  微信js-sdk官方文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
import wx from 'weixin-js-sdk'
import Axios from 'axios'
const wxApi = {
  /**
  * [wxRegister 微信Api初始化]
  * @param  {Function} callback [ready回调函数]
  */
  wxRegister (callback) {
    console.log("wxapi 成功")
    Axios.get('getJsApiTicket?URL=' + window.location.href).then((res) => {
      wx.config({
        debug: false,
        appId: res.data.appid,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonceStr,
        signature: res.data.signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ]
      })
    }).catch((error) => {
      console.log(error)
    })
    wx.ready((res) => {
      // 如果需要定制ready回调方法
      if (callback) {
        callback()
      }
    })
  },
  /**
  * [ShareTimeline 微信分享到朋友圈]
  * @param {[type]} option [分享信息]
  * @param {[type]} success [成功回调]
  * @param {[type]} error   [失败回调]
  */
  ShareTimeline (option) {
    wx.onMenuShareTimeline({
      title: option.title,
      link: option.link,
      imgUrl: option.imgUrl,
      success () {
        option.success()
      },
      cancel () {
        option.error()
      }
    })
  },
  /**
  * [ShareAppMessage 微信分享给朋友]
  * @param {[type]} option [分享信息]
  * @param {[type]} success [成功回调]
  * @param {[type]} error   [失败回调]
  */
  ShareAppMessage (option) {
    wx.onMenuShareAppMessage({
      title: option.title,
      desc: option.desc,
      link: option.link,
      imgUrl: option.imgUrl,
      success () {
        option.success()
      },
      cancel () {
        option.error()
      }
    })
  }
}
export default wxApi