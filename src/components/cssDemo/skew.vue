<template>
    <div id='skew'>
        <div class="skewed-bg">
            <div class="content">
                <h1 class="title">Skewed background with CSS</h1>
            <p class="text">This is a quick example to show how to get skewed backgrounds with plain HTML & CSS.</p>
            </div>
        </div>

        <footer class="footer"></footer>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>

// -----------------------------------------------------------------------------

@import "../../assets/css/bourbon/bourbon";
// @import 'bourbon';

// VARS
$purple:  #955fad;
$orange: #da5b45;
$paper: #f6efe9;

@mixin transform($param){
    transform: $param;
}

// ANIMS
@include keyframes(colorSwapper){
  0% {
    @include linear-gradient($purple, $orange);
  }
  50% {
    @include linear-gradient($orange, $purple);
  }
  100% {
    @include linear-gradient($purple, $orange);
  }
}

@include keyframes(solidColor){
  0% {
    background-color: $purple;
  }
  50% {
    background-color: $orange;
  }
  100% {
    background-color: $purple;
  }
}

$main-color: #00B285;

//________________________________
// html,body{
//   height:100%;
// }

// body{
//   background: #222;
//   color: #FFF;
// }

.skewed-bg{
  background: $main-color;
  padding: 200px 0;
  @include transform(skew(0deg, -10deg));
//   margin-top: -200px;  
  
  .content{
    @include transform(skew(0deg, 10deg));
    text-align: center;
    
    .title{
      padding-top: 100px;
      font-weight: normal;
    }
    
    .text{
      width:60%;
      margin: 25px auto;      
      color: lighten($main-color, 55);
    }
    
  } 
}

.footer{
  padding-top: 300px;
  
  .credits{
    text-align: center;
    color: #666;
    
    .link{
      color: $main-color;
      text-decoration: none;
    }
    
  }
}
</style>
