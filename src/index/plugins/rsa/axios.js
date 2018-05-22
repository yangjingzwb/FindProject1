/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
// import util from '@@/plugins/rsa/util'
import store from '@@/store/'
import { objPlan, getFreeSign,SessionkeyVarify } from '@@/service/util'
// import {geUUID} from '@@/service/util';
import {baseUrl} from '@@/config/env' // baseUrl


// 环境
let urlObj = baseUrl

// 超时时间
axios.defaults.timeout = 60000
// 请求头
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.responseType = 'json'
// axios.defaults.headers.common['Authorization'] = "Basic " + App.getSessionKey();
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// axios.defaults.dataType = 'JSON'
// axios.defaults.headers['Authorization'] = "Basic " + App.getSessionKey();

// http请求拦截器 --加密等
axios.interceptors.request.use(config => {

    // let encrypt = config.data.encrypt;
    // let platform = config.data.platform || 'api' // 平台 old为老平台
    // let config_data = config.data


    // let certificateFront = '' // 身份证人脸面
    // let certificateBack = '' // 身份证国徽面
    // let sign = ''

    // // 删除加密标记和平台标记
    // try {
    //     delete config_data.encrypt
    //     delete config_data.platform
    // } catch (e) {

    // }

    // // 授信信息采集接口 -- 图片字段剔除加密放入外层
    // if (config.url == 'userInfoSYJCollection') {
    //     certificateFront = config_data.certificateFront
    //     certificateBack = config_data.certificateBack
    //     delete config_data.certificateFront
    //     delete config_data.certificateBack
    // }
    // // 数据加密  
    // if (encrypt) {
    //     config.data = config.data ? util.setRSA(config_data) : config.data
    // } else {
    
    //     if (platform=='oldPersonalClient'||platform == 'oldCreditFront') {
            
    //         config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    //         config.headers['Authorization'] = "Basic " + App.getSessionKey();

    //         sign = getFreeSign(config_data, store.state.token)
    //         config.data = objPlan(config_data) + 'sign=' + sign

    //     }else if(platform == 'oldFront'){
    //         config.data = config_data
    //     }else{
    //         config.data = config_data
    //     }
    // }

    // // 授信信息采集接口
    // if (config.url == 'userInfoSYJCollection') {
    //     config.data.certificateFront = certificateFront
    //     config.data.certificateBack = certificateBack
    // }

    //拼接请求参数
    if(config.url == "queryAccount"){
        config.url = urlObj.api + config.url+"?"+window.location.href.split('?')[1].replace(/SIGN_DATA/g,'sign_data').replace(/CREDTENTIAL/g,'credtential')
    }else{
        config.url = urlObj.api + config.url +"?"+objPlan(config.data,1)
    }
    

    // config.headers = ''
    return config
}, error => {
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => { // 响应成功关闭loading
    return data.data
}, error => {
    return Promise.reject(error)
})

export default axios