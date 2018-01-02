<template>
    <div id='menu'>
        
        <!-- <ul>
            <li v-for='(row, $index) in menus' :key='$index'>
                <router-link :to='{name: row.to}'>{{row.name}}</router-link>
            </li>
        </ul> -->
        <el-menu>
            <el-menu-item v-for='(row, $index) in menus' :key='$index' :index='row.name'>
                <router-link :to='{name: row.to}'>
                    <!-- <i class="el-icon-menu"></i> -->
                    <icon name='slide' scale='2'></icon>
                    {{row.name}}
                </router-link>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'menu',
    data () {
        return {
            menus: [
                {name: '轮播图', to: 'sliderWrapper'},
                {name: '动画', to: 'animate'},
                {name: 'cssDemo', to: 'cssDemo'},
                {name: 'sqlDemo', to: 'sqlDemo'}
            ]
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../assets/css/mymixin.scss';

#menu{
    text-align: center;
    margin: 0 auto;
    padding: {
        top: 20px;
        bottom: 20px;
    }
    .el-menu{
        margin: 0 auto;
        border: 1px solid #eee;
        max-width: 400px;
        .el-menu-item{
            &>a{
                @include absolute;
            }
        }
    }
    
}

</style>
