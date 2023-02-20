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
            responseDelete: "",
            isvisited: "",
            name: "",
            lat: "",
            lng: "",
            showname: "",
            showlat: "",
            showlng: "",
            show: ""
            
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
                <div>
                <button type="button" @click="deletePlace(place.id)">Supprimer</button>
                <button type="button" @click="showPlace(place.id)">Update</button>
            </div>
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
            fetch(`${this.API_URL}/locations/${this.$route.params.id}/places`)
            .then(response => response.json())
            .then(json => {
                this.location = json.location
                this.places = json.place
            })
        },
        initForm(){
            this.name = ""
            this.lat = ""
            this.lng = ""
        },
        create(idCreate){
            let data = {
                "name": this.name,
                "slug": this.name,
                "lat": parseFloat(this.lat),
                "lng": parseFloat(this.lng),
                "visited": 0,
                "location_id": parseInt(this.$route.params.id)
            }
            console.log(data);
            
            fetch(`${this.API_URL}/locations/${parseInt(this.$route.params.id)}/places`, { 
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
        showPlace(idLocation){
            console.log(idLocation);
            fetch(`${this.API_URL}/locations/${idLocation}`, { method: "GET" })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                    this.show = data
                    this.showname = data.name
                    this.showlat = data.lat
                    this.showlng = data.lat
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        },
        deleteLocation(idDelete){
            console.log(idDelete);
            fetch(`${this.API_URL}/places/${idDelete}`, { method: "DELETE" })
            let id = {
                "id": idDelete 
            }
            console.log(id.id);
            
            fetch(`${this.API_URL}/locations`, { 
                method: "DELETE",
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(id.id) 
            })
            .then((response) => {
                response
                  .json()
                  .then((data) => {
                    console.log(data);
                    this.responseDelete = data
                    this.get()
                    
                    console.log(responseDelete);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
            })
            .catch((e) => {
                console.log(e);
            });
        }
        // updatePlace(a){
        //     let datas = {
        //         "visited": 1,
        //         "lat": a.lat,
        //         "lng": a.lng,
        //         "name": a.name,
        //         "location_id": a.location_id
                
        //     }
            
        //     fetch(`${this.API_URL}/places/${this.$route.params.id}`, { 
        //         method: "PUT",
        //         headers: {
        //         'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(datas) 
        //     })
        //     .then((response) => {
        //         response
        //           .json()
        //           .then((data) => {
        //             console.log(data);
        //             this.get()
        //             this.responseVisited = data
        //           })
        //           .catch((e) => {
        //             console.log(e);
        //           });
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
        // }
    },
    mounted(){

        this.get()
    }
}