import { API_URL } from "./config.js";
import Locations from "./components/locations.js"
import Location from "./components/location.js"

const options = {
    data(){
        return {
            API_URL: API_URL
        };
    },
    components:{
        Locations
    },
    mounted(){
        console.log(API_URL);
    }
}

const routes = [
    { path: '/', component: Locations },
    { path: '/:sluglocation', component: Location, name: 'location' },
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = Vue.createApp(options)
app.use(router)
app.mount("#app")