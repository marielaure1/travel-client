import { API_URL } from "./config.js";
import Locations from "./components/locations.js"
import Location from "./components/location.js"

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
        getId(id){
            this.locationId = id
            router.push({ path: '/:sluglocation', component: Location, name: 'location', props: {API_URL: API_URL, locationId: this.locationId}  })
        }
    }
}

const routes = [
    { path: '/index.html', redirect: "" },
    { path: '/', component: Locations, props: {API_URL: API_URL} },
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = Vue.createApp(options)
app.use(router)
app.mount("#app")