<template>
    <div id='observer'>
        <el-button @click="on1">订阅click1</el-button>
        <el-button @click="on2">订阅click2</el-button>
        <el-button type='primary' @click='triggerClick'>触发click</el-button>
    </div>
</template>

<script>
import mediator from './mediator'

export default {
    data () {
        return {

        }
    },
    methods: {
        on1 () {
            function click1() {
                console.log('click1')
            }
            mediator.once('click', click1, this);
        },
        on2 () {
            function click2() {
                console.log('click2')
            }
            mediator.on('click', click2);
        },
        triggerClick () {
            mediator.trigger('click');
        }
    }
}
</script>

<style>

</style>
