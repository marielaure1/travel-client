export default {
    data(){
        return {
            locations: []
        };
    },
    template: `
        <div class="locations" v-if=locations.length>
            <router-link to="/{locations.slug }">User
            </router-link>
            <a href="/{{ locations.slug }}" class="card" v-for="location in locations" :key="location.updated_at">
               
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