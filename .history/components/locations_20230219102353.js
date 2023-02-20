export default {
    props: ["API_URL"],
    data(){
        return {
            locations: [],
            name: "",
            lat: "",
            lng: ""

        }
    },
    template: `<div class="locations" v-if="locations.length">
        <router-link :to="{ name: 'location', params: { sluglocation : location.slug, id : location.id }}" class="card" v-for="location in locations" :key="location.updated_at">
            <div>
                <h3>{{ location.name }}</h3>
                <p>{{ location.place.length }} lieu à visiter</p>
            </div>
        </router-link>
    </div>
    <form @submit.prevent="create">
        <input type="text" name="name" placeholder="Nom du lieu/ville" v-model="name">
        <input type="text" name="lat" placeholder="Latitude" v-model="lat">
        <input type="text" name="lng" placeholder="Longitude" v-model="lng">
        <button type="submit">Ajouter</button>
    </form>
    `, 
    methods: {
        create(){
            let data = {
                "name": this.name,
                "slug": this.name,
                "lat": this.lat,
                "lng": this.lng,
                
            }
            
            fetch(`${this.API_URL}/locations`, { 
                method: "POST",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        }
    },
    mounted(){
        fetch(`${this.API_URL}/locations`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.locations = json
        })

    }
}