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
    { path: '/', component: Locations, props: {API_URL: API_URL} },
    { path: '/:sluglocation', component: Location, name: 'location', props: route => ({ query: route.query.slug }) },
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = Vue.createApp(options)
app.use(router)
app.mount("#app")