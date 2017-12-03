<template>
    <div id='middle-slogan'>
        <p :class='{start: start}'>
            <span>Proudly</span>
            <span>designed</span>
            <span>for</span>
            <span>everyday</span>
            <span>living.</span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'middleSlogan',
    data(){
        return {
            start: false
        }
    },
    mounted() {
        setTimeout(() => {
            this.start = true;
        }, 500)
    }
}
</script>

<style lang='scss' scoped>
#middle-slogan{
    display: none;

    height: 100%;
    text-align: center;
    position: relative;
    z-index: 5;
    &::before{
        display: inline-block;
        height: 100%;
        content: "";
        vertical-align: middle;
    }
    p{
        display: inline-block;
        font-size: 4rem;
        max-width: 50rem;
        transform: translate(0,100vh,0);
        transition: transform .9s cubic-bezier(.4,0,0,1) .2s;
        &.start{
            transform: translateY(0);
            span{
                transform: translateY(0);
                &:nth-child(1){transition-delay: .2s;}
                &:nth-child(2){transition-delay: .35s;}
                &:nth-child(3){transition-delay: .5s;}
                &:nth-child(4){transition-delay: .65s;}
                &:nth-child(5){transition-delay: .8s;}
            }
        }
        span{
            position: relative;
            display: inline-block;
            transition: transform .6s cubic-bezier(.4,0,0,1);
            transform: translateY(100vh);
        }
    }
}
</style>
