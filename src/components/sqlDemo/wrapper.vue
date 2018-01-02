<template>
    <div id='sqlDemo'>
        <div>
            <button @click='getUsers'>getSql</button>
        </div>
        <div>
            <button @click='setUser'>setSql</button>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
import {getUsers, setUser} from '@/assets/js/service'

export default {
    data() {
        return {

        }
    },
    methods: {
        getUsers: async () => {
            let res = await getUsers();
            let data = await res.json();
            console.log(data)
        },
        setUser: async () => {
            let postData = {
                // id: 4,
                name: 'd'
            }
            let res = await setUser(postData)
            let data = await res.json()
            console.log(data)
        }
    }
}
</script>

<style lang='scss' scoped>
.sqlDemo {

}
</style>
