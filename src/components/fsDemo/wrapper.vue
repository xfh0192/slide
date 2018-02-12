<template>
    <div id='fsDemo'>
        <!-- <div class='table'>
            <el-table
                :data='tableData'>
                <el-table-column
                    prop='index'
                    label='index'
                    width='80'>
                </el-table-column>
                <el-table-column
                    prop='fileName'
                    label='fileName'
                    width='180'>
                </el-table-column>
                <el-table-column
                    prop='updataTime'
                    label='updataTime'
                    width='150'>
                </el-table-column>
            </el-table>
        </div> -->

        <div class='edit'>
            <ul>
                <li>
                    <h2>文件名</h2>
                    <el-input
                        placeholder="请输入文件名"
                        v-model='fileName'
                        clearable>
                    </el-input>
                </li>
                <li>
                    <h2>文件内容</h2>
                    <el-input
                        type='textarea'
                        placeholder="请输入内容"
                        v-model='content'>
                    </el-input>
                </li>
                <li>
                    <el-button type='primary' @click='setFile'>保存</el-button>
                    <el-button>清空</el-button>
                </li>
                <li>
                    <el-button @click='getFile'>读取文件</el-button>
                    <el-button @click='removeFile'>删除文件</el-button>
                    <el-button @click='clearDir'>删除所有文件</el-button>
                </li>
            </ul>
        </div>

        <!-- http://element-cn.eleme.io/#/zh-CN/component/transfer -->
        <div class='transfer'>
            <el-transfer v-model='transferData' :data='tableData'></el-transfer>
        </div>

        <div class='edit'>
            <ul>
                <li>
                    <input id='uploader' type='file'/>
                </li>
                <li>
                    <el-button @click='uploadImg'>上传图片</el-button>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
import {setFile, getFile, getFileList, removeFile, clearDir} from '@/assets/js/service'
import mixin from './uploader'
import mediator from '../observerMode/mediator'

export default {
    data () {
        return {
            transferData: [],
            tableData: [],
            fileName: '',
            content: ''
        }
    },
    mixins: [mixin],
    methods: {
        async setFile () {
            let postData = {
                fileName: this.fileName,
                content: this.content
            }
            try {
                let data = await setFile(postData)
                this.tableData = data.rows || []
            } catch (err) {
                console.log(err)
            }
        },
        async getFile () {
            let data = {
                fileName: this.fileName
            }
            try {
                let res = await getFile(data);
                this.content = res.content || '';

                // 20180204 改为每次保存之后，返回文件列表

            } catch (err) {
                console.log(err)
            }
        },
        async getFileList () {
            await new Promise((resolve, reject) => {
                resolve(getFileList())
            })
            .then((data) => {
                console.log(data)
                this.tableData = data.rows|| []
            })
            .catch((err) => {
                console.log(err);
            })
        },
        async removeFile() {
            let data = await removeFile({fileName: this.fileName})
            this.tableData = data.rows || []
        },
        async clearDir() {
            let data = await clearDir()
            this.tableData = data.rows || []
        },
    
    },
    mounted () {
        this.getFileList()
        mediator.trigger('click')
    }
}
</script>

<style lang='scss' scoped>
#fsDemo {

}
.edit,
.transfer {
    margin: 50px;
    padding: 50px;
    border: 1px solid #eee;
    // float: left;
    width: 500px;
}
</style>
