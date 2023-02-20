// import Locations from "./components/locations.js"

const options = {
    data(){
        return {
            locations: []
        };
    }
    mounted(){

        fetch(`http://localhost:8000/api/locations`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            
           console.log(json);
        })

    }
}

const routes = [
    { path: '/', component: Locations },
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = Vue.createApp(options)
app.use(router)
app.mount("#app")