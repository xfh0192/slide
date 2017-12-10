<template>
    <div id='leftGallery'>
        <div class='sayHello'>
            <svg width='200px' height='100px' xmlns="http://www.w3.org/2000/svg">
                <path d='m40 20 q-10 30 -20 60 c13 -40 40 -40 30 -5
                    q0 2 -4 8 l45 -20 q-28 -28 -30 14 c10 10 20 10 30 -10z'/>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LeftGallery',
    data () {
        return {

        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../assets/css/style.scss';

#leftGallery{
    max-width: 300px;
    position: fixed;
    top: 50px;
    left: 50px;
    border: 1px solid;
    .sayHello {
        path {
            fill: transparent;
            stroke: $normal-blue;
            stroke-width: 1px;
            stroke-dashoffset: -354px;
            stroke-dasharray: 353px;
            animation: draw 3s ease infinite;
        }
    }
}

@keyframes draw{
    0%{
        stroke-dashoffset: -354px;
    }
    100%{
        stroke-dashoffset: -638px;
    }
}
</style>
