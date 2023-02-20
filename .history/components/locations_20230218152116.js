export default {
    props: ["API_URL"],
    data(){
        return {
            locations: [],
            API_URL: this.API_URL

        }
    },
    template: `<div class="locations" v-if="locations.length">
        <router-link :to="{ name: 'location', params: { sluglocation : location.slug } }"  class="card" v-for="location in locations" :key="location.updated_at">
            <h3>{{ location.name }}</h3>
            <p>{{ location.place.length }} lieu à visiter</p>
        </router-link>
    </div>
    `, 
    mounted(){

        fetch(`${this.API_URL}/locations`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            console.log(this.API_URL);
            
           console.log(json);
           this.locations = json
        })

    }
}