<template>
    <div id='scrollAni'>
        <div id="wrapper">
            <div id="clouds"></div>
            <div id="ground"></div>
        </div>
    </div>
</template>

<script>
import {TimelineMax, Linear} from 'gsap'

export default {
    mounted () {
        // 用了 TimelineMax
        // https://github.com/greensock/GreenSock-JS

        // wait until DOM is ready
        // document.addEventListener("DOMContentLoaded", function(event) {

            function ground() {

                var tl = new TimelineMax({
                    repeat: -1
                });

                tl.to("#ground", 20, {
                    backgroundPosition: "1301px 0px",
                    force3D:true,
                    rotation:0.01,
                    z:0.01,
                    autoRound:false,
                    ease: Linear.easeNone
                });

                return tl;
            }

            function clouds() {

                var tl = new TimelineMax({
                repeat: -1
                });

                tl.to("#clouds", 52, {
                    backgroundPosition: "-2247px bottom",
                    force3D:true,
                    rotation:0.01,
                    z:0.01,
                    //autoRound:false,
                    ease: Linear.easeNone
                });
                
                return tl;
            }

            var masterTL = new TimelineMax({
                repeat: -1
            });
            
            // window load event makes sure image is 
            // loaded before running animation
            // window.onload = function() {
            
                masterTL
                .add(ground(),0)
                .add(clouds(),0)
                .timeScale(0.7)
                .progress(1).progress(0)
                .play();

            // };
        
        // });
    }
}
</script>

<style scoped>
/* html {
  height:100%;
  background:#63D0FF;
}

body{
  margin:0;
  padding:0;
  background:#63D0FF;
  height:100%;
} */
#scrollAni{
    position: relative;
    height: 250px;
    width: 500px;
}
#wrapper {
  position:relative;
  width:100%;
  height:100%;
}

#clouds{
  background:url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/56901/bg-clouds2-tinypng.png") repeat-x 0 bottom #ACE6FF;
  width:100%;
  height:230px; /*190px*/
  min-height:230px;
  position:absolute;
  top:0;
  left:0;
  z-index:1;
  -webkit-transform:translate3d(0,0,0.01);
  transform:translate3d(0,0,0.01);
}

#ground {
  background:url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/56901/grass_tile-tinypng.png") repeat-x 0 0 transparent;    
  position: absolute;
  bottom: 0;
  left: 0;
  z-index:2;
  width: 100%;
  height: 192px;
  min-height:192px;
  border:0 none transparent;
  outline:0 none transparent;
  -webkit-transform:translate3d(0,0,0.01);
  transform:translate3d(0,0,0.01);
  will-change: transform;
}
</style>
