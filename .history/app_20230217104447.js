

const options = {
    data(){
        return {
            locations: []
        };
    },
    template: `
        <div class="locations" v-if=locations.length>
            <a href="/{{ locations.slug }}" class="card" v-for="location in locations" :key="location.updated_at">
                <h3>{{ location.name }}</h3>
                <p>{{ location.place.length }} lieu à visiter</p>
            </a>
            
        </div>
    `,
    mounted(){

        fetch(`http://localhost:8000/api/locations`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            
           console.log(json);
           this.locations = json

        })

    }
}

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', redirect: "Contact" },
    { path: '/contactez-nous', name: "Contact", component: Contact },
    { path: '/users/:id(\\d+)', component: User },
    { path: '/admin', component: Admin },
    { path: '/login', component: Login },
    { path: '/:pathMatch(.*)*', name: "Not Found", component: NotFound },
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
  })

Vue.createApp(options).mount("#app")