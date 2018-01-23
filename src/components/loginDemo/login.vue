<template>
    <div id="login">
        <h4>登录</h4>
        <el-form ref='loginForm' :model='loginForm' label-width='80px' status-icon>
            <el-form-item
                label='登录账号'
                prop='account'
                :rules='[
                    {required: true, message: "请输入登录账号", trigger: "blur"}
                ]'>
                <el-input type='text' v-model='loginForm.account'></el-input>
            </el-form-item>
            <el-form-item
                label='登录密码'
                prop='password'
                :rules='[
                    {required: true, message: "请输入登录密码", trigger: "blur"}
                ]'>
                <el-input type='password' v-model='loginForm.password'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='login'>登录</el-button>
                <el-button @click='reset'>重置</el-button>
                <el-button @click='toRegist'>去注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {login} from '@/assets/js/service'

export default {
    data () {
        return {
            loginForm: {}
        }
    },
    methods: {
        async login () {
            let postData = this.loginForm
            console.log(postData)
            this.$refs['loginForm'].validate()
            .then(() => {

            })
            .catch((err) => {
                !err && console.log('请输入信息')
            })
        },
        reset () {
            this.$refs['loginForm'].resetFields();
        },
        toRegist () {
            this.$router.replace({path: '/mongo/demo/regist'})
        }
    }
}
</script>

<style lang='scss' scoped>
#login {
    border: 1px solid #eee;
    border-radius: 5px;
    width: 500px;
    margin: 50px auto;
    padding: 20px 20px;
}
</style>
