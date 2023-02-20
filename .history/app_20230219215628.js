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

        // const bgImage = document.getElementById('bg-image');
        //     axios.get('https://api.unsplash.com/photos/random', {
        //       headers: {
        //         Authorization: 'Bearer VOTRE_CLÉ_API_UNSPLASH',
        //       },
        //       params: {
        //         query: 'travel',
        //         orientation: 'landscape',
        //       },
        //     })
        //       .then(response => {
        //         bgImage.style.backgroundImage = `url(${response.data.urls.regular})`;
        //       })
        //       .catch(error => {
        //         console.log(error);
        //       });
          
        //   setInterval(getRandomImage, 60000);
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