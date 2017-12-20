<template>
    <div id='move'>
        <div class='box'>box</div>
        <p>
            <button @click='move'>move-box</button>
        </p>
    </div>
</template>

<script>
import {animate} from '@/assets/js/util'
export default {
    data () {
        return {

        }
    },
    methods: {
        move () {
            console.log('click')
            let box = document.querySelector('.box')
            animate(box, {left: '400px'}, 400, 'ease-out', () => {
                console.log(box.style)
            })
        }
    }
}
</script>

<style lang='scss' scoped>
#move{
    .box{
        height: 50px;
        width: 50px;
        background: #39c;
        position: relative;
        left: 0;
    }
    button{
        display: block;
    }
}
</style>
