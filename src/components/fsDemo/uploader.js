
/**
 * 上传部分的函数移到这里
 */

import File from './file'
import {uploadBuffer} from '@/assets/js/service'

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

            await uploadBuffer(file.buffer, {'Content-Type': 'application/octet-stream'})
            
        },
        async showfile () {
            let input = document.querySelector('#uploader');    // v-model 不支持file，只能取dom
            let img = input.files[0] || {};                     // 文件

            let file = await new File(img);

            console.log(file);
        }
    }
}

export default mixin;

// 切割文件
function cutFile() {

}