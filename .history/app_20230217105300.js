import Locations from "./components/locations.js"

const options = {
    data(){
        return {
        };
    },
    components:{
        Locations: Locations
    },
    
}

const routes = [
    { path: '/', component: Locations },
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = Vue.createApp(options)
app.use(router)
app.mount("#app")