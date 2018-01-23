<template>
    <div id='regist'>
        <h4>注册</h4>
        <el-form ref='registForm' :model='registForm' label-width='80px' status-icon>
            <el-form-item 
                label='账号'
                prop='account'
                :rules='[
                    {required: true, message: "请输入账号", trigger: "blur"}
                ]'>
                <el-input type='text' v-model='registForm.account'></el-input>
            </el-form-item>
            <el-form-item 
                label='密码'
                prop='password'
                :rules='[
                    {required: true, message: "请输入密码", trigger: "blur"}
                ]'>
                <el-input type='password' v-model='registForm.password'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='regist'>注册</el-button>
                <el-button @click='reset()'>重置</el-button>
                <el-button type='primary' @click='toLogin'>去登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {regist} from '@/assets/js/service'

export default {
    data () {
        return {
            registForm: {
                account: '',
                password: ''
            }
        }
    },
    methods: {
        regist () {
            let postData = this.registForm
            console.log(postData)
            this.$refs['registForm'].validate()
            .then((valid) => {
                console.log(valid)
                return regist(postData)
            })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                !err && console.log('请输入信息')
            })
            
        },
        reset () {
            this.$ref['registForm'].resetFields()
        },
        toLogin () {
            this.$router.replace({path: '/mongo/demo/login'})
        }
    }
}
</script>

<style lang='scss' scoped>
#regist {
    border: 1px solid #eee;
    border-radius: 5px;
    width: 500px;
    margin: 50px auto;
    padding: 20px 20px;
}
</style>
