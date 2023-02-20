export default {
    props: ["API_URL"],
    data(){
        return {
            places: [],
            location: "",
            responseAdd: "",
            locations: []
            

        }
    },
    template: `
        <div class="places" v-if="places.length">
            
                <div v-for="place in places" :key="place.updated_at">
                    <input type="checkbox" name="visited" value="{{ place.id }}" id="place-input"/>
                    <label for="place-input">
                        <router-link :to="{ name: 'place', params: { slugplace: place.slug, id : place.id }}">{{ place.name }}</router-link>
                    </label>
                    

                </div>
            
        </div>
        <form @submit.prevent="create">
            <input type="text" name="name" placeholder="Nom du lieu/ville" v-model="name">
            <div v-if="responseAdd.name">
                <p v-for="response in responseAdd.name">{{response}}</p>
            </div>
            <input type="text" name="lat" placeholder="Latitude" v-model="lat">
            <div v-if="responseAdd.lat">
                <p v-for="response in responseAdd.lat">{{response}}</p>
            </div>
            <input type="text" name="lng" placeholder="Longitude" v-model="lng">
            <div v-if="responseAdd.lng">
                <p v-for="response in responseAdd.lng">{{response}}</p>
            </div>
            <select name="location_id" v-model="location_id">
                <option value="" v-for="location in locations">{{location.name}}</option>
            </select>
            <div v-if="responseAdd.location_id">
                <p v-for="response in responseAdd.location_id">{{response}}</p>
            </div>
            <button type="submit">Ajouter</button>
        </form>
    `, 
    methods:{
        get(){
            fetch(`${this.API_URL}/locations`, { method: "GET" })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                    this.locations = data
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        },
    },
    mounted(){
        console.log(`${this.API_URL}/locations/${this.$route.params.id}/places`);
        fetch(`${this.API_URL}/locations/${this.$route.params.id}/places`, { method: "GET" })
        .then(response => response.json())
        .then(json => {
           this.location = json.location
           this.places = json.place
           console.log(json);
        })

    }
}