<template>
    <div id='index'>
        <div class='main'>
            <slide-header></slide-header>
            <div class='content'>
                <middle-slogan></middle-slogan>
                <slideBottom></slideBottom>
                <slider></slider>
            </div>
        </div>
        
    </div>
</template>

<script>
import slideHeader from './slideHeader'
import middleSlogan from './middleSlogan'
import slideBottom from './slideBottom'
import slider from './slider'

export default {
    name: 'index',
    data () {
        return {

        }
    },
    components:{
        slideHeader,
        middleSlogan,
        slideBottom,
        slider
    }
}
</script>

<style lang="scss" scoped>
#index{
    .main div.content{
        height: 100vh;
        overflow: hidden;
        position: relative;
    }
}
</style>
