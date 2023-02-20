import { API_URL } from "./config.js";
import Locations from "./components/locations.js"
import Location from "./components/location.js"

const routes = [
    { path: '/index.html', redirect: "/" },
    { path: '/', component: Locations, props: {API_URL: API_URL} }
    
]


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
            
        }
    },
    mounted(){
        this.router.push({ path: '/:sluglocation', component: Location, name: 'location', props: {API_URL: API_URL}  })
    }
}

console.log(options);
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        

const app = Vue.createApp(options)
app.use(router)
app.mount("#app")