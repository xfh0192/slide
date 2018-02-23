
/**
 * 上传部分的函数移到这里
 */

import File from './file'
import {uploadBuffer} from '@/assets/js/service'
import base from '../../assets/js/base';

// 20180211 利用blob类型，尝试做分片上传处理
let mixin = {
    methods: {
        // 上传图片
        async uploadImg () {
            let input = document.querySelector('#uploader');    // v-model 不支持file，只能取dom
            let img = input.files[0] || {};                     // 文件
            // let type = img.type || '';                          // 文件类型
            // let isImg = /image\/(jp?eg|png|gif)/i.test(type);   // 检查是否图片
            let file = await new File(img);
            console.log(`uploadImg:`, file)

            // 检查文件类型
            if (!file.type) {
                alert('请上传 jpeg/jpg/png/gif 类型的文件');
                return;
            }

            // await uploadBuffer(file.buffer, {'Content-Type': 'application/octet-stream'})
            
        },
        async showfile () {
            let input = document.querySelector('#uploader');    // v-model 不支持file，只能取dom
            let img = input.files[0] || {};                     // 文件

            let file = await new File(img);

            console.log(file);

            // let base64 = await compressFile(file.file);
            let dataUrl = await previewFile(file.file)
            // console.log(dataUrl)

            convertBase64UrlToBlob(dataUrl)
        }
    }
}

export default mixin;

// 切割文件
function cutFile() {

}

// 压缩文件(图片转base64，再转为二进制blob文件流)
// https://www.zhihu.com/question/30692677

// 文件转base64 / blob
function compressFile (file) {
    let reader = new FileReader()

    if (window.URL || window.webkitURL) {
        let base64 = window.URL.createObjectURL(file);
        console.log(base64)
        // let show = document.querySelector('#showImg')    // blob 格式，可以显示
        // show.src = base64;

        return Promise.resolve(base64)
    } else {

        return new Promise((resolve, reject) => {
            reader.onload = function () {
                console.log(reader.result)      
    
                let base64 = reader.result;
                // let show = document.querySelector('#showImg')   // base64格式，也可以显示
                // show.src = base64;
    
                resolve(base64)
            }
    
            reader.onerror = function () {
                console.log(reader.error);
                reject(reader.error)
            }
    
            reader.readAsDataURL(file)
        })
        
    }
}

// 处理base64数据通过canvas（toDataURL）进行压缩绘制，然后输出压缩后的base64图片数据
async function previewFile(file) {
    let code = await compressFile(file);

    // let cvs = document.createElement('canvas');
    let cvs = document.querySelector('#cvs')
    let img = document.createElement('img')
    
    return new Promise((resolve, reject) => {
        img.src = code
        img.onload = function () {
            cvs.width = img.width
            cvs.height = img.height

            cvs.getContext('2d').drawImage(img, 0, 0)       // 在canvas上预览出来

            let dataUrl = cvs.toDataURL();      // 利用canvas的方法，返回一个包含图片展示的 data URI（base64）
            resolve(dataUrl)
        }
    })
    
}


// atob, btoa 是base64与ASCII码（二进制码）之间互相转换

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
// ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
// Uint8Array 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素。
// 一个TypedArray 对象描述一个底层的二进制数据缓存区的一个类似数组(array-like)视图。

// base64数据转成blob文件流 (该部分目前默认前面步骤全部是base64)
const convertBase64UrlToBlob = (base64, mineType) => {
    let bytes = window.atob(base64.split(',')[1])       // 对 base64 编码过的字符串进行解码。(btoa: ASCII => base64)
    console.log(bytes)

    let ab = new ArrayBuffer(bytes.length);     // 要创建的 ArrayBuffer 的大小，单位为字节。
    let ia = new Uint8Array(ab);                // 每个元素为1字节（8位）

    for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt[i]             // charCodeAt() 方法返回0到65535之间的整数，表示给定索引处的UTF-16代码单元
    }

    let _blob = new Blob([ab], {type: mineType})
    console.log(_blob)
    // return _blob
}