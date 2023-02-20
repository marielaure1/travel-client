import { API_URL } from "./config.js";
import Locations from "./components/locations.js"
import Location from "./components/location.js"
import Places from "./components/places.js"

var locationId  = "";

const options = {
    data(){
        return {
            locationId: ""
        };
    },
    components:{
        Locations
    },
    methods:{
        getId(array){
            locationId = array.id
            console.log("get", locationId);
        }
    }
}

if(document.querySelectorAll("#location-id")){
    document.querySelectorAll("#location-id").addEventListener()
}

const routes = [
    { path: '/index.html', redirect: "/" },
    { path: '/', component: Locations, props: {API_URL: API_URL} },
    { path: '/:sluglocation', component: Location, name: 'location', props: {API_URL: API_URL, locationId: locationId} },
    { path: '/:sluglocation/places', component: Places, name: 'places', props: {API_URL: API_URL} }
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = Vue.createApp(options)
app.use(router)
app.mount("#app")