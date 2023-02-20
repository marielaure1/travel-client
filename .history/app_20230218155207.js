import { API_URL } from "./config.js";
import Locations from "./components/locations.js"
import Location from "./components/location.js"

const options = {
    data(){
        return {
        };
    },
    components:{
        Locations
    }
}

const routes = [
    { path: '/', component: Locations, props: {URL: API_URL} },
    { path: '/:sluglocation', component: Location, name: 'location' },
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = Vue.createApp(options)
app.use(router)
app.mount("#app")