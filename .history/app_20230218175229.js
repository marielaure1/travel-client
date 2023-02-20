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
        }
    }
}

console.log(options);


const app = Vue.createApp(options)
app.use(router)
app.mount("#app")