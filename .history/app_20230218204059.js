import { API_URL } from "./config.js";
import Locations from "./components/locations.js"
import Location from "./components/location.js"
import Places from "./components/places.js"

const options = {
    data(){
        return {
            locationId: ""
        };
    },
    components:{
        Locations
    },
    // methods:{
    //     getId(array){
    //         locationId = array.id
    //     }
    // }
}

const routes = [
    { path: '/index.html', redirect: "/" },
    { path: '/', component: Locations, props: {API_URL: API_URL} },
    { path: '/:sluglocation/:id(\\d+)', 
    props: {API_URL: API_URL}, 
    children:[
        { path: '/', component: Location, name: 'location'},
        { path: '/places', component: Places, name: 'places'}
    ]}]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = Vue.createApp(options)
app.use(router)
app.mount("#app")