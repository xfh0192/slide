<template>
    <div id="loginDemo">
        <component :is="componentName"></component>
    </div>
</template>

<script>
import login from './login'
import regist from './regist'

export default {
    data () {
        return {
            // componentName: 
        }
    },
    components: {
        login,
        regist
    },
    computed: {
        componentName () {
            return this.$route.name || 'login'
        }
    },
    mounted () {
        console.log(this.$route.name)
    }
}
</script>

<style>

</style>
