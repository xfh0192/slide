<template>
    <div id='index'>
        <el-container>
            <el-header>
                <index-header/>
            </el-header>
            <el-main>
                <menus/>
            </el-main>
        </el-container>
        <left-gallery/>
    </div>
</template>

<script>
import indexHeader from './index/indexHeader.vue'
import Menus from './index/menus.vue'
import leftGallery from './index/leftGallery.vue'

export default {
    name: 'index',
    data () {
        return {

        }
    },
    components:{
        indexHeader,
        Menus,
        leftGallery
    }
}
</script>

<style lang="scss" scoped>
#index{
    .el-container{
        text-align: center;
        margin: 30px auto;
        .el-header{

        }
    }
}

</style>
