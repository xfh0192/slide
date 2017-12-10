<template>
    <h1 class='title'>
        <button>
            <span>这只是个菜单</span>
                <svg height="60" width="200" xmlns="http://www.w3.org/2000/svg">
                    <path class='shape' height='60' width='200'
                        d='M200,60v-60H0v60H200'/>
                </svg>
        </button>
    </h1>
</template>

<script>
export default {
    name: 'indexHeader',
    data () {
        return {

        }
    }
}
</script>

<style lang='scss' scoped>
.title{
    button{
        text-align: center;
        position: relative;
        cursor: pointer;
        span{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        .shape{
            fill: transparent;
            // stroke-dasharray: 0;
            stroke-dashoffset: 520px;
            stroke-dasharray: 520px;
            stroke-width: 2px;
            stroke: #ccc;
            transform-origin: 50%;
            animation: draw 1.4s ease infinite;
        }
    }
}
@keyframes draw {
    0% {
        stroke-dashoffset: 520px;
    }
    100% {
        stroke-dashoffset: 0px;
    }
}
</style>
