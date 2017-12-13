<template>
    <div id='header'>
        <header>
            <div class='fly'>
                <a>
                    <img src='../../assets/image/duck.jpeg'/>
                    <!-- <icon name="cart" scale="20"></icon> -->
                    <!-- <icon name='kvell' scale='20'></icon> -->
                </a>
            </div>
            <div class='top-button menu-button'>
                <router-link tag='button' :to='{name: "index"}'>
                    <span class='icon'>
                        <span class='fake-icon'></span>
                    </span>
                    <span class='title'>Menu</span>
                </router-link>
            </div>
            <div class='top-button cart-button'>
                <button @click='send'>
                    <span class='icon'>
                        <icon name='cart' scale='10'></icon>
                    </span>
                    <span class='title'>Cart</span>
                </button>
            </div>
        </header>
    </div>
</template>

<script>
// import axios from 'axios'
import {getApi} from '@/assets/js/service.js'

export default {
    name: 'slideHeader',
    data () {
        return {

        }
    },
    methods: {
        send () {
            // axios.get('/api').then((rsp) => console.log(rsp))
            getApi('/api', 'get')
            .then(rsp => console.log(rsp))
        }
    }
}
</script>

<style lang="scss" scoped>
#header{
    position: relative;
    z-index: 1000;
    header{
        transform: translateZ(0);
        .fly{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            text-align: center;
            transform: translate(0, -50%);
            pointer-events: none; // !!!!!
            a{
                transition: all .6s cubic-bezier(.4,0,0,1);
                display: inline-block;
                pointer-events: auto;
                &:hover{
                    transform: translateY(15%);
                }
            }
        }
        .top-button{
            position: fixed;
            top: 50px;
            button{
                border: 0;
                background: none transparent;
                position: relative;
                height: 70px;
                width: 150px;
                &:before{
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    display: block;
                    transition: opacity .3s ease, transform .4s ease;
                    background: rgba(66, 65, 65, 0.6);
                    opacity: 0;
                    transform: scale(0.5);
                    border-radius: 35px;
                }
                .icon{
                    position: absolute;
                    
                    z-index: 5;
                    text-align: center;
                    transition: all 0.3s ease;
                    background: #fff;
                    display: block;
                    height: 46px;
                    width: 46px;
                    border: 2px solid #ccc;
                    border-radius: 50%;
                    margin: 10px;
                    &:before{
                        display: inline-block;
                        height: 100%;
                        content: "";
                        vertical-align: middle;
                    }
                }
                .title{
                    position: relative;
                    display: inline-block;
                    left: 55px;
                    color: #fff;
                    font-weight: 600;
                    font-size: 17px;
                    transition: transform .3s ease, visibility .15s ease;
                    transform: translateX(0);
                    visibility: hidden;
                }
                &:hover{
                    .icon{
                        transform: rotate(90deg);
                    }
                    .title{
                        visibility: visible;
                        transform: translateX(20px);
                    }
                    &:before{
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            }
            &.menu-button{
                left: 100px;
                .icon{
                    left: 0;
                    top: 0;
                    span.fake-icon{
                        display: inline-block;
                        width: 18px;
                        height: 14px;
                        position: relative;
                        font-size: 1rem;
                        vertical-align: middle;
                        &:before, &:after{
                            content: '';
                            display: block;
                            width: 100%;
                            border-top: 3px solid #666;
                            position: absolute;
                        }
                        &:before{
                            top: 0;
                        }
                        &:after{
                            bottom: 0;
                        }
                    }
                }
            }
            &.cart-button{
                right: 100px;
                .icon{
                    top: 0;
                    right: 0;
                    svg{
                        vertical-align: middle;
                        /* transform: scale(0); */
                        height: 20px;
                        width: 20px;
                        text-align: center;
                    }
                }
                &:hover{
                    .icon{
                        transform: rotate(0);
                    }
                    .title{
                        visibility: visible;
                        transform: translateX(-20px);
                    }
                    &:before{
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            }
        }
        
    }

}
</style>
