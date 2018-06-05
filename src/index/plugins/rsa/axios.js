/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
// import util from '@@/plugins/rsa/util'
import store from '@@/store/'
import { objPlan, getFreeSign,SessionkeyVarify,setMd5 } from '@@/service/util'
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
// setMd5()
// console.log(222)
// http请求拦截器 --加密等
axios.interceptors.request.use(config => {

    //拼接请求参数
    if(config.url == "queryAccount"){
        config.url = urlObj.api + config.url+"?"+window.location.href.split('?')[1].replace(/SIGN_DATA/g,'sign_data').replace(/CREDTENTIAL/g,'credtential')
    }else if(config.url.indexOf('getContent')>0){
        // 更换头部
        axios.defaults.headers.post['Content-Type'] = 'application/json;encoding=utf-8';
        // axios.defaults.headers.post['User-Agent'] = 'jd';
        // alert(setMd5(config.data))
        axios.defaults.headers.post['j-auth'] = setMd5(config.data)
    }else{
        config.url = urlObj.api + config.url +"?"+objPlan(config.data,1)
    }
    

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