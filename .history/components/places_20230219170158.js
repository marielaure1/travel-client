export default {
    props: ["API_URL"],
    data(){
        return {
            places: [],
            location: "",
            responseAdd: "",
            locations: [],
            responseVisited: "",
            idVisited: "",
            isvisited: ""
            

        }
    },
    template: `
        <div class="places" v-if="places.length">
            
                <div v-for="place in places" :key="place.updated_at">
                    <input type="checkbox" name="visited" value="{{ place.id }}" id="place-input"  v-bind:checked="place.visited === 1" v-model="isvisited" @click.prevent="visited"/>
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
        visited(){
            let data = {
                "visited": this.visited
                
            }
            console.log(data);
            
            fetch(`${this.API_URL}/locations/${idVisited}`, { 
                method: "PUT",
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


// <select name="location_id" v-model="location_id">
//                 <option value="location.id" v-for="location in locations">{{location.name}}</option>
//             </select>
//             <div v-if="responseAdd.location_id">
//                 <p v-for="response in responseAdd.location_id">{{response}}</p>
//             </div>