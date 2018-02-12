

import axios from 'axios'
import {baseUrl} from './env'
import h from './base'

export default async (url = '', method = 'get', data = {}, options = {}) => {
    console.log(method + ":" + url)
    // 拼装基本路径
    url = baseUrl + url

    // get方法,query拼接
    if (method == 'get') {
        let dataStr = ''
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + encodeURIComponent(data[key]) + '&';
        })

        if (dataStr) {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
            url = url + '?' + dataStr
        }
    }

    // 检查是否有fetch方法
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
    if (window.fetch) {
        console.log('fetch is working')
        let requestConfig = Object.assign({
            // 带上cookie 
            credentials: 'include',

            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors'
            // cache: 'force-cache'
        }, options)

        if (method == 'post') {
            // Object.defineProperty(requestConfig, 'body', {
            //     value: JSON.stringify(data)
            // })
            requestConfig.body = JSON.stringify(data)
        }

        // fetch 接口（有polyfill）
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
        try {
            const response = await fetch(url, requestConfig)
            console.log(response)
            let responseJson = await response.json();

            if (!responseJson.errors) {
                return Promise.resolve(responseJson);
            } else {
                return Promise.reject(responseJson.errors[0] || responseJson.errors)
            }
            // return responseJson;
            // const responseJson = await response.json()
            // console.log(responseJson)
            // return responseJson
        } catch (e) {
            throw new Error(e);
        }
    } else {
        return new Promise( (resolve, reject) => {
            let requestObj;
            // 新版浏览器
            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest()
            }
            // ie 
            else {
                requestObj = new ActiveXObject();
            }

            /* 
             *   method：请求的类型；GET 或 POST
             *   url：文件在服务器上的位置
             *   async：true（异步）或 false（同步）
            */
            requestObj.open(method, url, true)
            requestObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

            requestObj.onreadystatechange = () => {
                if (requestObj.readystate == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj)
                        }
                        resolve(obj)
                    } else {
                        reject(requestObj)
                    }
                }
            }
        })
    }

    // return axios[method](uri, data)
}