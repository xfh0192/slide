<template>
    <div id='slider' 
        @mouseout.prevent='mouseout'>
        <div class='drag-box' 
            :style='dragBoxStyle'
            @mousedown.prevent='dragDown'
            @mousemove.prevent='dragMove'
            @mouseup.prevent='dragUp'
            @transitionend.prevent='slideEnd'>
            <div class='slider-item' 
                :style='itemStyle'
                v-for='(row, $index) in sliderArr' 
                :key='$index'>
                <img :src='row.url'/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    name: 'slider',
    data () {
        return {
            dragBox: {},
            dragging: false,        // 是否抓取了slider
            transiting: true,        // transition是否生效
            originX: 0,
            offsetX: 0,
            screenWidth: document.body.clientWidth,      // 给一个默认值（重要）
            resizeTimer: false      // 窗口改变的定时，控制频率
        }
    },
    computed: {
        ...mapGetters([
            'sliderIndex', 'sliderArr', 'sliderLength'
        ]),
        itemWidth () {
            // return this.dragBox.offsetWidth
            return this.screenWidth
        },
        dragBoxWidth () {
            return this.sliderArr.length * this.itemWidth
        },
        dragBoxTrans () {
            if(this.dragging){
                return 'translate(' + (this.sliderIndex * this.itemWidth * -1 + this.offsetX) + 'px, 0)'
            }else{
                return 'translate(' + this.sliderIndex * this.itemWidth * -1 + 'px, 0)'
            }
        },
        itemStyle () {
            return {
                width: this.itemWidth + 'px'
            }
        },
        dragBoxStyle () {
            return {
                width: this.dragBoxWidth + 'px',
                transform: this.dragBoxTrans,
                transition: !this.dragging && this.transiting &&  'transform .2s ease' || ''
            }
        }
    },
    watch: {
        // 'dragBox.offsetWidth': {
        //     handler(newVal, oldVal){
        //         console.log(newVal)
        //     },
        //     deep:true
        // }
        screenWidth (val) {
            // this.screenWidth = val
            if (!this.resizeTimer) {
                this.resizeTimer = true
                this.screenWidth = val
                console.log(val)
                setTimeout(() => {
                    this.resizeTimer = false
                }, 400)
            }
        }
    },
    methods: {
        ...mapMutations([
            'sliderPrev', 'sliderNext', 'resetSliderIndex'
        ]),
        dragDown ($event) {
            if(!this.dragging && this.transiting){
                this.dragging = true;
                this.originX = $event.clientX;
            }
        },
        dragMove ($event) {
            if (this.dragging) {
                let targetX = $event.clientX;
                this.offsetX = targetX - this.originX;
            }
        },
        mouseout ($event) {
            // console.log('out')
            this.dragging = false;
            this.dragUp();
        },
        dragUp () {
            if (this.offsetX > 300) {
                this.sliderPrev()
                
            }else if (this.offsetX < -300) {
                this.sliderNext()
            }
            this.dragging = false;
            this.originX = 0;
            this.offsetX = 0;
        },
        slideEnd () {
            this.dragging = false;
            this.transiting = false;
            this.resetSliderIndex();
            setTimeout(()=> {
                this.transiting = true;
            }, 50)
        }
    },
    mounted () {
        this.dragBox = this.$el;
        const _this = this
        window.onresize = () => {
            _this.screenWidth = document.body.clientWidth
            // return (() => {
            //     // window.screenWidth = document.body.clientWidth
            //     _this.screenWidth = document.body.clientWidth
            // })()
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../assets/css/mymixin.scss';

#slider{
    @include absolute;
    overflow: hidden;
    z-index: 10;
    .drag-box{
        height: 100%;
        pointer-events: auto;
        .slider-item{
            float: left;
            img{
                height: 100%;
                width: 100%;
            }
        }
    }
}
</style>
