import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sliderIndex: 1,
        sliderArr: [
            {url: require('@/assets/slider-1.jpg')},
            {url: require('@/assets/slider-2.jpg')},
            {url: require('@/assets/slider-3.jpg')}
        ]
    },
    getters: {
        sliderIndex: state => state.sliderIndex,
        sliderArrResources: state => state.sliderArr,
        sliderArr: state => {
            let arr = [...state.sliderArr];
            // let len = arr.length;
            arr = [arr[arr.length - 1], ...arr, arr[0]];
            return arr;
        },
        sliderLength: state => state.sliderArr.length
    },
    mutations: {
        sliderPrev: (state) => {
            state.sliderIndex--
            
        },
        sliderNext: (state) => {state.sliderIndex++},
        resetSliderIndex: (state) => {
            let index = state.sliderIndex;
            if (index <= 0) {
                state.sliderIndex = state.sliderArr.length;
            }else if (index >= state.sliderArr.length + 1) {
                state.sliderIndex = 1;
            }
        }
    },
    actions: {

    }
})