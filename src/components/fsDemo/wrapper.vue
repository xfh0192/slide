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
                <il>
                    <h2>文件名</h2>
                    <el-input
                        placeholder="请输入文件名"
                        v-model='fileName'
                        clearable>
                    </el-input>
                </il>
                <li>
                    <h2>文件内容</h2>
                    <el-input
                        type='textarea'
                        placeholder="请输入内容"
                        v-model='content'>
                    </el-input>
                </li>
                <li>
                    <el-button type='primary'>保存</el-button>
                    <el-button>清空</el-button>
                </li>
            </ul>
        </div>

        <div class='transfer'>
            <el-transfer v-model='transferData' :data='tableData'></el-transfer>
        </div>
    </div>
</template>

<script>
import {setFile} from '@/assets/js/service'

export default {
    data () {
        return {
            transferData: [],
            tableData: []
        }
    },
    methods: {
        async saveFile () {
            let postData = {
                fileName: this.fileName,
                content: this.content
            }
            try {
                this.tableData = await this.setFile(postData)
            } catch (err) {
                conosle.log(err)
            }
        }
    },
    mounted () {

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
    float: left;
    width: 500px;
}
</style>
