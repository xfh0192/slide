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
                <!-- <div :style='{backGroundImage: "url(" + row.url + ")"}'></div> -->
                <div :data-label='row.url' :style='{backgroundImage: "url(" + row.url + ")"}'></div>
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
            canDrag: true,          // 是否可以抓取
            transitionOn: true,        // transition是否生效
            transitionIng: false,      // 是否正在执行过渡
            originX: 0,
            offsetX: 0,
            screenWidth: document.body.clientWidth,      // 给一个默认值（重要）
            resizeTimer: false,      // 窗口改变的定时，控制频率
            timer: null       // 定时滚动
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
                transition: this.transitionOn &&  'transform .9s ease' || '',
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
        'screenWidth' (val) {
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
            if(!this.dragging && this.canDrag && this.transitionOn && !this.transitionIng){
                this.dragging = true;
                this.canDrag = false;
                this.transitionOn = false;
                this.originX = $event.clientX;
                this.autoSlide()
            }
        },
        dragMove ($event) {
            if (this.dragging) {
                let targetX = $event.clientX;
                this.offsetX = targetX - this.originX;
            }
        },
        mouseout ($event) {
            if (this.dragging){
                this.dragUp();
            }
        },
        dragUp () {
            if (this.dragging){
                if (this.offsetX > this.itemWidth*0.2) {
                    this.sliderPrev()
                    this.transitionIng = true;
                    
                }else if (this.offsetX < -this.itemWidth*0.2) {
                    this.sliderNext()
                    this.transitionIng = true;
                }else{
                    this.transitionIng = false;
                }
                this.dragging = false;
                this.canDrag = true;
                this.transitionOn = true;
                this.originX = 0;
                this.offsetX = 0;
            }
        },
        slideEnd () {
            // console.log('end')
            this.dragging = false;
            this.canDrag = true;
            this.transitionOn = false;
            this.transitionIng = false;
            this.resetSliderIndex();
            this.autoSlide(true)
            setTimeout(()=> {
                this.transitionOn = true;
            }, 50)
        },
        autoSlide (setOn) {
            clearInterval(this.timer)
            this.timer = null
            if (setOn) {
                this.timer = setInterval(()=>{
                    this.transitionIng = true;
                    this.sliderNext()
                },3000)
            }
        }
    },
    mounted () {
        // console.log(this.$route)
        this.dragBox = this.$el;
        const _this = this
        window.onresize = () => {
            _this.screenWidth = document.body.clientWidth
            // return (() => {
            //     // window.screenWidth = document.body.clientWidth
            //     _this.screenWidth = document.body.clientWidth
            // })()
        }
        this.autoSlide(true)
    },
    beforeDestroy () {
        // console.log('beforeDes');
        this.autoSlide()
    },
    // 下面三个router的钩子函数生效不了
    // 因为这个组件没有在router实例上面注册
    beforeRouteEnter(to, from, next){
        console.log('beforeRouteEnter');
        next();
    },
    beforeRouteUpdate(to, from, next){
        console.log('beforeRouteUpdate');
        next();
    },
    beforeRouteLeave(to, from, next){
        console.log('beforeRouteLeave');
        next();
    }
}
</script>

<style lang='scss' scoped>
@import '../../assets/css/mymixin.scss';

#slider{
    @include absolute;
    overflow: hidden;
    z-index: 10;
    .drag-box{
        height: 100%;
        pointer-events: auto;
        .slider-item{
            float: left;
            position: relative;
            height: 100%;
            div{
                @include absolute;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
            }
        }
    }
}
</style>
