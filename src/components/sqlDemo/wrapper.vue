<template>
    <div id='sqlDemo'>

        <div class='regist'>
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
                    <el-button @click='reset("registForm")'>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <div class='user-data'>
            <template>
                <el-table
                    :data='userData'>
                    <el-table-column
                        prop='id'
                        label='id'
                        width='80'>
                    </el-table-column>
                    <el-table-column
                        prop='name'
                        label='name'
                        width='100'>
                    </el-table-column>
                    <el-table-column
                        prop='account'
                        label='account'
                        width='100'>
                    </el-table-column>
                    <el-table-column
                        prop='password'
                        label='password'
                        width='100'>
                    </el-table-column>
                    <el-table-column
                        prop='createdAt'
                        label='创建时间'
                        width='150'>
                    </el-table-column>
                </el-table>
            </template>
        </div>

        <div class='login'>
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
                    <el-button @click='reset("loginForm")'>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
            
        <div>
            <button @click='getUsers'>getSql</button>
        </div>
        <div>
            <button @click='setUser'>setSql</button>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
import {getUsers, setUser, loginUser} from '@/assets/js/service'

export default {
    data() {
        return {
            registForm: {
                account: '',
                password: ''
            },
            loginForm: {
                account: '',
                password: ''
            },
            userData: []
        }
    },
    methods: {
        regist() {
            this.$refs['registForm'].validate((valid) => {
                if(valid){
                    console.log('start regist')
                    let data = {
                        account: this.registForm.account,
                        password: this.registForm.password
                    }
                    this.setUser(data)
                } else {
                    console.log('submit error!')
                    return false;
                }
            })
        },
        async login() {
            // this.$refs['loginForm'].validate((valid) => {
            //     if (!valid) {
            //         console.log('login error')
            //         return false;
            //     }
            //     alert('login success')
            // })

            // await 后面的 promise 不跟catch，就不会继续执行
            let validateResult = await this.$refs['loginForm'].validate()
            console.log(validateResult)
            // 校验成功的话，将账号密码传到后台，判断登录是否成功
            let loginResult = await loginUser(this.loginForm)

            console.log(loginResult);
        },
        reset(formName) {
            this.$refs[formName].resetFields();
        },
        async getUsers() {
            let res = await getUsers();
            // let data = await res.json();
            console.log(res)
            this.userData = res || []
        },
        async setUser(registData) {
            let postData = {
                name: 'default',
                account: registData.account,
                password: registData.password
            }
            let res = await setUser(postData)
            // let data = await res.json()
            console.log(res)
            
            // 注册之后返回所有用户数据，
            this.userData = res;
        }
    },
    mounted: async function () {
        await this.getUsers();
    }
}
</script>

<style lang='scss' scoped>
.sqlDemo {
    
}
.regist,
.login {
    width: 300px;
    margin: 50px;
    padding: 30px 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    float: left;
}
.user-data {
    float: left;
    max-width: 800px;
    margin: 50px 50px;
    padding: 30px 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>
