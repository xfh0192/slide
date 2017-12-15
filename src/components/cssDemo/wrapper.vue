<template>
    <div id='cssDemo'>
        <!-- http://www.css88.com/archives/8722 -->
        <!-- 这里还需要用 sass 混合器库 Bourbon -->
        <!-- http://bourbon.io/ -->
        <el-menu>
            <el-menu-item v-for='(row, $index) in menus' 
                :key='$index' 
                :index='row.name'
                @click='demoShow(row.param)'>
                <icon name='slide' scale='2'></icon>
                <a>{{row.name}}</a>
            </el-menu-item>
        </el-menu>
        {{demoName}}
        <div class='wrapper'>
            <component :is='demo'></component>
        </div>
    </div>
</template>

<script>
import mixBlendMode from './mixBlendMode'
import scrollAni from './scrollAni'
import skew from './skew'
import picChange from './picChange'
import gradient from './gradient'
import scrollText from './scrollText'
import scrollGradient from './scrollGradient'

export default {
    data () {
        return {
            demoName: '',
            demo: '',
            menus: [
                {name: 'mix-blend-mode', param: 'mixBlendMode'},
                {name: 'scroll-ani', param: 'scrollAni'},
                {name: 'skew', param: 'skew'},
                {name: 'pic-change', param: 'picChange'},
                {name: 'gradient', param: 'gradient'},
                {name: 'scrollText', param: 'scrollText'},
                {name: 'scrollGradient', param: 'scrollGradient'}
            ]
        }
    },
    components: {
        mixBlendMode,
        scrollAni,
        skew,
        picChange,
        gradient,
        scrollText,
        scrollGradient
    },
    methods: {
        async demoShow (param) {
            // this.demo = await import('./' + param)
            this.demo = param;
            console.log(this.demo)
            this.demoName = param
        }
    }
}
</script>

<style scoped>
.wrapper{
    height: 400px;
    position: relative;
}
</style>
