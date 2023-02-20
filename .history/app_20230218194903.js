import { API_URL } from "./config.js";
import Locations from "./components/locations.js"
import Location from "./components/location.js"
import Places from "./components/places.js"

const options = {
    data(){
        return {
            locationId: "1"
        };
    },
    components:{
        Locations
    },
    methods:{
        getId(array){
            this.locationId = array.id
            console.log(this.locationId);
            routes.push({ path: '/:sluglocation', component: Location, name: 'location', props: {API_URL: API_URL, locationId: this.locationId}, replace: true  })
        }
    }
}

const routes = [
    { path: '/index.html', redirect: "/" },
    { path: '/', component: Locations, props: {API_URL: API_URL} },
    { path: '/:sluglocation', component: Location, name: 'location', props: {API_URL: API_URL} },
    { path: '/:sluglocation/places', component: Places, name: 'places', props: {API_URL: API_URL} }
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = Vue.createApp(options)
app.use(router)
app.mount("#app")