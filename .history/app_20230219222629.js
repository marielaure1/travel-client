import { API_URL } from "./config.js";
import Locations from "./components/locations.js"
import Location from "./components/location.js"
import Place from "./components/place.js"

const options = {
    data(){
        return {
            locationId: ""
        };
    },
    mounted(){

        
          
        setInterval(getRandomImage, 60000);
    }
}

const routes = [
    { path: '/index.html', redirect: "/" },
    { path: '/', component: Locations, props: {API_URL: API_URL} },
    { path: '/:sluglocation/:id(\\d+)', component: Location, name: 'location', props: {API_URL: API_URL}},
    { path: '/places/:slugplace/:id(\\d+)', component: Place, props: {API_URL: API_URL} , name: "place"},
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = Vue.createApp(options)
app.use(router)
app.mount("#app")