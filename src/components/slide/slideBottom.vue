<template>
    <div id='slide-bottom'>
        <div class='discover'>
            <span>
                <a>Discover</a>
            </span>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'slideBottom',
    data(){
        return {

        }
    }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/css/mymixin.scss';

#slide-bottom{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    text-align: center;
    padding-bottom: 45px;
    color: #fff;
    .discover{
        display: inline-block;
        position: relative;
        height: 70px;
        &::before{
            content: '';
            display: inline-block;
            height: 100%;
            vertical-align: middle;
        }
        &::after{
            content: '';
            @include absolute;
            background: #101010;
            border-radius: 50px;
            transform: scale(1);
            transition: transform 0.2s ease;
        }
        span{
            @include middleLine;
            position: relative;
            width: 180px;
            display: inline-block;
            overflow: hidden;
            z-index: 2;
            height: 100%;
            cursor: pointer;
            a{
                color: #fff;
                font-size: 2rem;
                font-weight: 600;
                vertical-align: middle;
            }
        }
        &:hover{
            &::after{
                transform: scale(1.2);
            }
        }
    }
}
</style>
