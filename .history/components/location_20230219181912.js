export default {
    props: ["API_URL"],
    data(){
        return {
            location: "",
            places: [],
            location: "",
            responseAdd: "",
            locations: [],
            responseVisited: "",
            isvisited: "",
            name: ""
            
        };
    },
    template: `
    <div v-if="responseAdd.message" class="message">{{ responseAdd.message }}</div>
        <div class="location">
            <h2>{{location.name}}</h2>
            <p>{{location.created_at}}</p>
            <p>{{location.updated_at}}</p>
            <p>{{location.lat}}</p>
            <p>{{location.lng}}</p>
        </div>
        <div class="places" v-if="places.length">
            
            <div v-for="place in places" :key="place.updated_at">
                <input type="checkbox" name="visited" value="{{ place.id }}" id="place-input" v-bind:checked="place.visited === 1" v-model="isvisited" @click.prevent="updatePlace({'name': place.name, 'lat': place.lat, 'lng': place.lng, 'location_id': place.location_id })"/>
                <label for="place-input">{{ place.name }}</label>
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
            
            <button type="submit">Ajouter</button>
        </form>
    `,
    methods: {
        get(){
            fetch(`${this.API_URL}/locations/${this.$route.params.id}/places`, { method: "GET" })
            .then(response => response.json())
            .then(json => {
                this.location = json.location
                this.places = json.place
            })
        },
        create(){
            let data = {
                "name": this.name,
                "slug": this.name,
                "lat": parseFloat(this.lat),
                "lng": parseFloat(this.lng),
                "visited": 0,
                "location_id": this.$route.params.id
            }
            console.log(data);
            
            fetch(`${this.API_URL}/locations/${this.$route.params.id}/places`, { 
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
                    this.get()
                    this.initForm()
                    this.responseAdd = data
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        },
        updatePlace(a){
            let datas = {
                "visited": 1,
                "lat": a.lat,
                "lng": a.lng,
                "name": a.name,
                "location_id": a.location_id
                
            }
            
            fetch(`${this.API_URL}/places/${this.$route.params.id}`, { 
                method: "PUT",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(datas) 
            })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                    this.get()
                    this.responseVisited = data
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

        this.get()
    }
}