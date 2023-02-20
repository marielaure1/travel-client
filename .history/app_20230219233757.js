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
    methods:{
        getRandomImage(){
            const bgImage = document.getElementById('bg-image');
            fetch('https://api.unsplash.com/photos/random?query=travel&orientation=landscape&client_id=jleEsR1LG-cvURkHBm8yQMFo1JceNzlMNbz3_iStBV4')
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                bgImage.style.backgroundImage = `url(${data.urls.regular})`;
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
    mounted(){

         if(document.querySelectorAll(".createLocation")){
            document.querySelectorAll(".createLocation")
         }
          
        setInterval(this.getRandomImage(), 60000);
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